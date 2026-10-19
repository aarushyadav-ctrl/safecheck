import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import dotenv from 'dotenv';

const here = path.dirname(fileURLToPath(import.meta.url));

// The API key is read here, on the server only. It is never sent to the browser.
dotenv.config({ path: path.join(here, '.env'), quiet: true });

const app = express();
const PORT = Number(process.env.API_PORT) || 3001;

// Screenshots arrive as base64, so allow a larger body than the default.
app.use(express.json({ limit: '12mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, demoMode: !process.env.AI_API_KEY });
});

// In production (`npm run build` then `npm start`) serve the built site too.
const dist = path.join(here, '..', 'dist');
app.use(express.static(dist));
app.get(/^(?!\/api).*/, (_req, res, next) => {
  res.sendFile(path.join(dist, 'index.html'), (err) => err && next());
});

app.listen(PORT, () => {
  console.log(`SafeCheck server ready on http://localhost:${PORT}`);
});
