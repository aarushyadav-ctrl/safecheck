import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import dotenv from 'dotenv';
import { findDemoResult } from '../shared/demoResults.js';

const here = path.dirname(fileURLToPath(import.meta.url));

// The API key is read here, on the server only. It is never sent to the browser.
dotenv.config({ path: path.join(here, '.env'), quiet: true });

const app = express();
const PORT = Number(process.env.API_PORT) || 3001;
const MAX_TEXT = 8000;

// Screenshots arrive as base64, so allow a larger body than the default.
app.use(express.json({ limit: '12mb' }));

const hasKey = () => Boolean(process.env.AI_API_KEY);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, demoMode: !hasKey() });
});

app.post('/api/analyze', async (req, res) => {
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

  const demo = findDemoResult({ sampleId, text });

  // Live AI checking is added in the next build step. Until then, and whenever
  // no key is set, the example messages get their pre-written answers.
  if (demo) return res.json({ ...demo, demo: true });

  return res.status(503).json({
    code: 'not_configured',
    message: "Live checking isn't turned on yet, so only the example messages work right now.",
  });
});

// In production (`npm run build` then `npm start`) serve the built site too.
const dist = path.join(here, '..', 'dist');
app.use(express.static(dist));
app.get(/^(?!\/api).*/, (_req, res, next) => {
  res.sendFile(path.join(dist, 'index.html'), (err) => err && next());
});

app.listen(PORT, () => {
  console.log(`SafeCheck server ready on http://localhost:${PORT}`);
  if (!hasKey()) console.log('No AI_API_KEY found: running in demo mode (examples only).');
});
