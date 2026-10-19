import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { analyzeMessage } from './ai.js';
import { findDemoResult } from '../shared/demoResults.js';

const here = path.dirname(fileURLToPath(import.meta.url));

// The API key is read here, on the server only. It is never sent to the browser.
dotenv.config({ path: path.join(here, '.env'), quiet: true });

const app = express();
const PORT = Number(process.env.API_PORT) || 3001;
const MAX_TEXT = 8000;
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
  res.json({ ok: true, demoMode: !hasKey() });
});

app.post('/api/analyze', analyzeLimiter, async (req, res) => {
  const { text = '', imageBase64 = null, claimedSender = '', sampleId = null } = req.body || {};

  if (typeof text !== 'string' || typeof claimedSender !== 'string') {
    return res.status(400).json({ message: 'Something was wrong with the message. Please try again.' });
  }
  if (!text.trim() && !imageBase64) {
    return res.status(400).json({ message: 'Please paste the message or add a screenshot first.' });
  }
  if (text.length > MAX_TEXT) {
    return res.status(400).json({
      message: 'That message is very long. Please paste only the part that seems suspicious.',
    });
  }
  if (imageBase64 && (typeof imageBase64 !== 'string' || !IMAGE_DATA_URL.test(imageBase64))) {
    return res.status(400).json({
      message: "We couldn't read that picture. Please try a different screenshot.",
    });
  }

  const demo = findDemoResult({ sampleId, text });

  if (!hasKey()) {
    if (demo) return res.json({ ...demo, demo: true });
    const [status, message] = ERRORS.not_configured;
    return res.status(status).json({ code: 'not_configured', message });
  }

  try {
    const result = await analyzeMessage({
      text: text.trim(),
      imageBase64,
      claimedSender: claimedSender.trim().slice(0, 200),
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
});
