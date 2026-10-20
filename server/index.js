import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { analyzeMessage, LANGUAGES, synthesizeSpeech, ttsConfigured, TTS_MAX_CHARS } from './ai.js';
import { findDemoResult } from '../shared/demoResults.js';

const here = path.dirname(fileURLToPath(import.meta.url));

// The API key is read here, on the server only. It is never sent to the browser.
dotenv.config({ path: path.join(here, '.env'), quiet: true });

const app = express();
const PORT = Number(process.env.API_PORT) || 3001;
const MAX_TEXT = 8000;
const MAX_LINK = 2048;
const IMAGE_DATA_URL = /^data:image\/(png|jpe?g|webp|gif);base64,[A-Za-z0-9+/=]+$/;

// Screenshots arrive as base64, so allow a larger body than the default.
app.use(express.json({ limit: '12mb' }));

const hasKey = () => Boolean(process.env.AI_API_KEY);

// Plain-language messages for everything that can go wrong with the AI provider.
const ERRORS = {
  not_configured: [503, "Live checking isn't turned on yet, so only the example messages work right now."],
  no_vision: [503, "Checking screenshots isn't set up yet. Please paste the words of the message instead."],
  invalid_key: [503, "Live checking isn't working because the AI key was not accepted. The person who set up SafeCheck needs to check the key."],
  bad_model: [503, "Live checking isn't set up correctly. The AI model name wasn't found. The person who set up SafeCheck needs to fix it."],
  rate_limited: [503, 'A lot of messages are being checked right now. Please wait a minute and try again.'],
  too_large: [413, 'That screenshot is too big to check. Please try a smaller picture, or paste the words instead.'],
  timeout: [504, 'Checking took too long. Please try again.'],
  provider_down: [502, "The checking service isn't answering right now. Please try again in a few minutes."],
  bad_request: [502, 'Something went wrong while checking. Please try again.'],
  bad_response: [502, "We got an answer we couldn't understand. Please try again."],
  // Problems with what was sent (the website shows these in the chosen language).
  bad_input: [400, 'Something was wrong with the message. Please try again.'],
  empty: [400, 'Please paste the message, add a screenshot, or enter a link first.'],
  too_long: [400, 'That message is very long. Please paste only the part that seems suspicious.'],
  link_too_long: [400, 'That link is too long to check.'],
  bad_image: [400, "We couldn't read that picture. Please try a different screenshot."],
};

// Light rate limit, so one person (or a script) can't use up the free API key.
const analyzeLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 8,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: (_req, res) =>
    res.status(429).json({
      code: 'too_many',
      message: "You've checked a lot of messages in a short time. Please wait one minute, then try again.",
    }),
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, demoMode: !hasKey(), naturalVoice: ttsConfigured() });
});

// Natural voice for "Read this to me". Pieces are short, so allow more of them.
const speakLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 90,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: (_req, res) => res.status(429).json({ code: 'too_many' }),
});
let warnedAboutTerms = false;

app.post('/api/speak', speakLimiter, async (req, res) => {
  const { text = '', voice = '' } = req.body || {};
  if (typeof text !== 'string' || !text.trim() || text.length > TTS_MAX_CHARS) {
    return res.status(400).json({ code: 'bad_input' });
  }
  if (!ttsConfigured()) return res.status(503).json({ code: 'not_configured' });
  try {
    const { audio, type } = await synthesizeSpeech({ text: text.trim(), voice });
    res.set('Content-Type', type);
    res.set('Cache-Control', 'no-store'); // spoken words are never stored
    return res.send(Buffer.from(audio));
  } catch (err) {
    if (err.code === 'tts_terms' && !warnedAboutTerms) {
      warnedAboutTerms = true;
      console.warn(
        `[speak] The natural voice needs one-time approval. Open ${process.env.AI_BASE_URL?.includes('groq') ? 'https://console.groq.com/playground?model=' + encodeURIComponent(process.env.AI_TTS_MODEL) : 'your provider console'} and accept the terms. Until then, the device voice is used.`,
      );
    } else if (err.code !== 'tts_terms') {
      console.warn(`[speak] ${err.code || 'error'}: ${String(err.message).slice(0, 160)}`);
    }
    const status = err.code === 'rate_limited' ? 429 : 503;
    return res.status(status).json({ code: err.code || 'provider_down' });
  }
});

app.post('/api/analyze', analyzeLimiter, async (req, res) => {
  const {
    text = '',
    imageBase64 = null,
    link = '',
    claimedSender = '',
    sampleId = null,
    language = 'en',
  } = req.body || {};
  const fail = (code, status = 400) => {
    const [, message] = ERRORS[code] || [status, ERRORS.bad_input[1]];
    return res.status(status).json({ code, message });
  };

  if (typeof text !== 'string' || typeof claimedSender !== 'string' || typeof link !== 'string') {
    return fail('bad_input');
  }
  if (!text.trim() && !imageBase64 && !link.trim()) return fail('empty');
  if (text.length > MAX_TEXT) return fail('too_long');
  if (link.length > MAX_LINK) return fail('link_too_long');
  if (imageBase64 && (typeof imageBase64 !== 'string' || !IMAGE_DATA_URL.test(imageBase64))) {
    return fail('bad_image');
  }
  const lang = LANGUAGES[language] ? language : 'en';

  const demo = findDemoResult({ sampleId, text, link });

  if (!hasKey()) {
    if (demo) return res.json({ ...demo, demo: true });
    return fail('not_configured', ERRORS.not_configured[0]);
  }

  try {
    const result = await analyzeMessage({
      text: text.trim(),
      imageBase64,
      link: link.trim(),
      claimedSender: claimedSender.trim().slice(0, 200),
      language: lang,
    });
    return res.json(result);
  } catch (err) {
    // Log the kind of problem only. Message contents are never logged or saved.
    console.warn(`[analyze] ${err.code || 'error'}: ${String(err.message).slice(0, 200)}`);
    if (demo) return res.json({ ...demo, demo: true });
    const [status, message] = ERRORS[err.code] || ERRORS.provider_down;
    return res.status(status).json({ code: err.code || 'provider_down', message });
  }
});

// In production (`npm run build` then `npm start`) serve the built site too.
const dist = path.join(here, '..', 'dist');
app.use(express.static(dist));
app.get(/^(?!\/api).*/, (_req, res, next) => {
  res.sendFile(path.join(dist, 'index.html'), (err) => err && next());
});

app.listen(PORT, () => {
  console.log(`SafeCheck server ready on http://localhost:${PORT}`);
  if (!hasKey()) console.log('No AI_API_KEY found in server/.env: running in demo mode (examples only).');
  else console.log(`Live checking on: ${process.env.AI_BASE_URL} (${process.env.AI_MODEL})`);
  if (ttsConfigured()) console.log(`Natural voice on: ${process.env.AI_TTS_MODEL}`);
});
