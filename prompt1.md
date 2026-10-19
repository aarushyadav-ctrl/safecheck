# Project Brief: SafeCheck (working name)

HyperBloom October UI/UX & Web Design Hackathon. Build time: about one day.

## The problem
Older adults are the most targeted group for text, email, and phone scams, and often lack a quick, trustworthy way to check a suspicious message. Existing tools are technical, cluttered, or assume tech confidence.

## The user
Primary persona: an adult aged 65+, moderately comfortable with a smartphone, who receives a suspicious text or email and wants a clear answer and a clear next step, without feeling embarrassed or overwhelmed.
Secondary persona: a trusted family member who helps them double-check.

## One-sentence pitch
SafeCheck lets older adults paste or screenshot a suspicious message and instantly get a plain-language verdict, the exact red flags highlighted, and a calm step-by-step plan for what to do next.

## Tech stack
- Vite + React (JavaScript)
- A tiny Node/Express server (proxied through Vite in development) that calls the AI provider. The browser never talks to the AI provider directly.
- Web Speech API for read-aloud.
- No database, no accounts, no login.

## AI provider and API key setup (Groq / Grok)
The AI integration must be provider-configurable so the user can plug in their own free API key. Groq (console.groq.com) and xAI Grok (console.x.ai) both use OpenAI-compatible chat completion APIs, so build one integration that works with either by changing settings.

- Create `server/.env` (git-ignored) with:
  ```
  AI_API_KEY=paste_your_key_here
  AI_BASE_URL=https://api.groq.com/openai/v1
  AI_MODEL=paste_model_name_here
  AI_VISION_MODEL=paste_vision_model_name_here
  ```
  (For xAI Grok, set `AI_BASE_URL=https://api.x.ai/v1` and the matching model names.)
- Commit a `server/.env.example` with these same keys and comments explaining where to get a free key and where to find current model names in the provider's docs.
- Add `.env` to `.gitignore`. The key must only ever be read on the server and never be sent to or shown in the browser.
- Put all AI calls in one file (`server/ai.js`) with a single function, e.g. `analyzeMessage({ text, imageBase64, claimedSender })`, so the provider can be swapped in one place.
- Rate-limit the endpoint lightly and handle provider errors (invalid key, rate limit, timeout) with plain-language messages.
- In the README, include a short "Add your API key" section with step-by-step instructions.

## Screens and features

### 1. Home / Start screen
- One clear purpose statement: "Not sure if a message is a scam? Let's check it together."
- Two primary actions: "Paste a message" and "Upload a screenshot."
- A short reassurance line about privacy: messages are not stored.
- Link to "How it works" and to the accessibility settings.

### 2. Check a message (input)
- Large text area for pasting a message, with a clear label and example placeholder.
- Screenshot upload (image file input, plus drag-and-drop on desktop) with a preview and the option to remove/replace it.
- Optional field: "Who does it claim to be from?" (e.g., my bank, a delivery company, a grandchild).
- A single "Check this message" button.
- "Try an example" buttons that load 3–4 realistic sample messages (fake bank alert, package delivery, grandparent emergency scam, and one legitimate message) for demos.

### 3. Analyzing state
- Loading state with a clear text status that is announced to screen readers.
- Graceful error handling with plain-language messages and a retry option.

### 4. Results screen
- Verdict in plain language with one of three levels: "Likely a scam," "Be careful," or "Looks safe," plus a one-sentence reason. Never use jargon.
- Highlighted red flags: the original message is shown with suspicious phrases marked, and each one is explained in simple words (e.g., urgency pressure, mismatched link, request for gift cards, unusual sender). Each highlight is linked to its explanation with labels or numbered markers.
- A plain-language confidence note and a reminder that the tool can make mistakes.
- "Read this to me" button that reads the verdict and explanations aloud.
- Clear next action: "What should I do now?"

### 5. "What should I do now?" guided steps
- A short, one-step-at-a-time flow tailored to the scam type, for example: don't reply or click links; don't send money or gift cards; block the sender; contact the real organization using a number you already trust (from your card or statement); report it (FTC at reportfraud.ftc.gov; forward scam texts to 7726).
- Progress indicator ("Step 2 of 4"), back/next controls, and a "Done" summary.
- Separate path if the person already clicked a link or shared information (e.g., change passwords, call your bank, monitor accounts).

### 6. Ask a family member
- Button: "Ask someone I trust."
- Generates a short plain-language summary of the message, the verdict, and red flags.
- Share options: copy to clipboard, the device share sheet (Web Share API) where supported, and prefilled SMS/email links. No backend required.

### 7. Accessibility settings panel
- Text size control (at least 3 sizes) that scales the whole interface.
- High-contrast mode toggle.
- Reduce motion toggle (also respect `prefers-reduced-motion`).
- Read-aloud speed control.
- Settings persist for the session and are reachable from every screen.

### 8. How it works / About
- Plain-language explanation of what SafeCheck checks and its limits.
- Privacy statement: messages are sent only for analysis and are not saved.
- Common scam warning signs as a short learning section.

## AI analysis requirements
- Server endpoint `POST /api/analyze` accepts text and/or an image (base64) plus an optional "claimed sender."
- Use the text model for text and the vision model when a screenshot is included.
- Instruct the model to return ONLY JSON with: `verdict` (scam | caution | safe), `summary` (one plain-language sentence), `scamType`, `extractedText` (for screenshots), `redFlags` (array of { `quote` exact text from the message, `explanation` in simple words }), `nextSteps` (array of short steps).
- Parse safely; strip code fences; validate fields; fall back gracefully on bad responses.
- Demo mode: if no API key is configured or the request fails, the sample messages return pre-written results so the live demo never breaks. Show an indicator when demo mode is active.

## Accessibility requirements (judging criterion — treat as mandatory)
- Target WCAG 2.2 AA.
- Semantic HTML landmarks, a single logical heading hierarchy, and labels on every input.
- Full keyboard navigation with visible focus states and a "skip to main content" link.
- Screen-reader announcements (aria-live) for loading, results, and errors.
- Meaning never conveyed by color alone.
- Large touch targets (minimum 44×44px), and layouts that work at 200% zoom and on mobile widths.
- Plain language everywhere: short sentences, no jargon, reading level around grade 6.
- Images and icons have appropriate alt text or are marked decorative.

## User flows to support
1. Paste message → check → results → guided next steps → done.
2. Upload screenshot → check → results → ask a family member → share.
3. "I already clicked the link" → recovery steps.
4. Adjust accessibility settings from any screen without losing progress.

## Out of scope
- User accounts, saved history, databases, payments.
- Real phone/email integration beyond share and prefilled links.

## Build order
1. Project setup (Vite + React + Express server), folder structure, routing between screens.
2. Home and input screens with sample messages.
3. Results screen and guided steps using demo-mode data.
4. API key setup (`.env`, `.env.example`, `server/ai.js`) and live AI analysis, including screenshots.
5. Family share, read-aloud, and accessibility settings.
6. Accessibility pass (keyboard, screen reader, zoom) and error states.
7. README with setup steps, "Add your API key" instructions, persona, problem statement, and user flows for the submission.

Work one step at a time, explain what you changed in simple terms, and check in after each step.
