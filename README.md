# SafeCheck

SafeCheck lets older adults paste or screenshot a suspicious message and instantly get a
plain-language verdict, the exact red flags highlighted, and a calm step-by-step plan for
what to do next.

Built for the HyperBloom October UI/UX & Web Design Hackathon.

## Run it

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:5173. This starts the website (Vite) and the small API server
(Express) together.

Without an API key, SafeCheck runs in **demo mode**: the four example messages show
pre-written results, and a banner says demo mode is on.

## Add your API key

SafeCheck works with a free key from **Groq**, or with a key from **xAI (Grok)**. Both use
the same kind of API, so you only change settings, not code.

1. **Get a key.**
   - Groq (free): go to https://console.groq.com/keys, sign in, and click **Create API Key**.
   - xAI Grok: go to https://console.x.ai and open **API Keys**.
2. **Make your settings file.** In the `server` folder, copy `.env.example` and name the
   copy `.env`:
   ```bash
   cp server/.env.example server/.env
   ```
   (On Windows without Git Bash: `copy server\.env.example server\.env`)
3. **Paste your key** after `AI_API_KEY=` in `server/.env`. For Groq, the other lines are
   already filled in. For Grok, use the "Option B" lines instead.
4. **Check the model names.** Providers change model names from time to time. If checking
   fails with "model name wasn't found", look up the current names
   ([Groq models](https://console.groq.com/docs/models),
   [Groq vision models](https://console.groq.com/docs/vision),
   [xAI models](https://docs.x.ai/docs/models)) and update `AI_MODEL` (for text) and
   `AI_VISION_MODEL` (for screenshots). Your key may not have every model; this lists
   the ones it can use:
   `curl https://api.groq.com/openai/v1/models -H "Authorization: Bearer YOUR_KEY"`
5. **Restart** `npm run dev`. The terminal says `Live checking on`, and the demo banner
   disappears.

Your key stays safe: `server/.env` is git-ignored, and only the server reads it. The
browser only talks to SafeCheck's own `/api/analyze`, never to the AI provider.

## Privacy

Messages are sent to the AI provider only to check them. SafeCheck has no database and
does not save or log message contents.
