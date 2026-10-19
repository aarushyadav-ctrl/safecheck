# Project Brief, Phase 2: SafeCheck Upgrades

The original SafeCheck app is already built (home, input, results, guided steps, family share, accessibility settings, About, demo mode, and AI analysis through `server/ai.js` with the Groq/Grok key in `server/.env`). This phase adds new features on top of it.

Before starting, review the existing codebase and summarize its structure for me. Reuse existing components, the existing `/api/analyze` endpoint, and the existing accessibility settings. Do not break existing features or flows, and keep demo mode working for every new feature.

## Goal of this phase
Make SafeCheck useful for younger users as well as older adults, without making it harder for older adults to use. The app becomes one shared engine with two interfaces designed for two different people.

## New persona
Secondary persona added: a teen or young adult (16–30), comfortable with technology and fast-moving, who gets scams through texts, DMs, job sites, gaming platforms, payment apps, and online marketplaces. They want a quick answer with minimal steps.

The original older-adult persona and the trusted family member persona remain.

## CORE FEATURES (build these, in this order)

### 1. Two experience modes
- **Simple mode**: the existing step-by-step experience (one task per screen, guided flows, read-aloud).
- **Quick mode**: a single-screen experience. Input (paste text, upload screenshot, or paste a link) at the top, with the verdict, red flags, and next steps appearing inline on the same screen without page changes. Include keyboard shortcuts (e.g., Ctrl/Cmd+Enter to check) and a "Copy summary" button.
- On first visit, ask: "How would you like to use SafeCheck?" with a short description of each mode. Remember the choice for the session.
- A mode switch is reachable from every screen and keeps the current message and results when switching.
- Both modes share the same analysis logic, state, and data. Do not duplicate logic.
- Keyboard navigation, screen-reader announcements, and all accessibility settings must work fully in both modes.

### 2. Link and QR code inspector
- New input option: "Check a link" (paste a URL) and "Scan a QR code" (upload a photo of a QR code). Available in both modes.
- Decode QR codes in the browser using the `jsqr` library. If no QR code is found, explain that in plain language and suggest retaking the photo.
- Analyze the link locally, and show results in plain language:
  - The real domain the link goes to, displayed clearly and separated from the rest of the URL.
  - Lookalike domains (character swaps like `paypa1`, `amaz0n`; extra words like `amazon-support-help.net`; brand names in subdomains like `paypal.com.secure-login.xyz`).
  - Punycode/unicode lookalike characters (decode `xn--` domains and flag them).
  - Link shorteners (flag that the real destination is hidden).
  - Insecure `http://` links, raw IP addresses, unusual top-level domains, and very long or confusing URLs.
- Keep a small list of commonly impersonated brands (banks, delivery companies, payment apps, retailers, streaming services, gaming platforms) and their real domains in a data file for comparison.
- Also send the link to `/api/analyze` for an AI explanation when a key is configured; local checks must work without it.
- Never open, load, or preview the inspected link.

### 3. Scam types for younger users
Add these as sample messages ("Try an example"), recognized scam types in the AI prompt, and tailored guided next steps:
- Fake job or internship offers (asking for payment, equipment purchases, or personal details).
- Payment app scams ("I sent you money by mistake, please send it back").
- Online marketplace scams (overpayment, fake shipping labels, "use my courier").
- Gaming and Discord account takeover ("free skins," "verify your account," fake moderators).
- Fake brand or influencer DMs (giveaways, collaborations).
- Crypto and investment offers.
- Sextortion threats. Next steps must be calm and non-judgmental: you are not in trouble; do not pay; do not delete the messages; block the account after saving evidence; tell a trusted adult; report through NCMEC's Take It Down (takeitdown.ncmec.org) and the CyberTipline (report.cybertip.org). Do not include any sample message containing explicit content; keep the sample brief and non-graphic.

Keep the existing older-adult scam types. Make sure the "Try an example" list includes a mix for both personas in both modes.

### 4. Phone call coach
- New entry point: "Someone is on the phone with me right now." Prominent in Simple mode, available in Quick mode.
- Works entirely without AI so it is instant and reliable.
- Shows large, tappable choices of what the caller is asking for or saying, for example: gift cards or cryptocurrency, wire transfer or payment app, a verification code sent to your phone, remote access to your computer, keep this a secret, you owe money or will be arrested, a family member is in trouble, your account is compromised and money must be moved, a prize you must pay to claim. Multiple selections allowed.
- Instantly shows a plain-language verdict, why it is a warning sign, and a short polite script to end the call (e.g., "I'm going to hang up and call you back on the official number."), plus what to do after hanging up.
- Include "Read this to me" for the verdict and script.
- If nothing selected is a warning sign, give balanced guidance: it is still safe to hang up and call back using a trusted number.

## STRETCH FEATURES (only after all core features work and pass the accessibility checks)

### 5. Spot the Scam practice mode
- A short quiz of 8–10 realistic messages for a mix of both personas. The user chooses "Scam" or "Safe," then sees the red flags explained.
- Score, streak counter, and a final summary with a "Share my score" option (copy text / Web Share API).
- Fully keyboard and screen-reader accessible.

### 6. Family safety plan
- A guided setup that explains AI voice-cloning scams in simple language and helps a family create a code word to verify real emergencies.
- Steps: choose a code word (with tips: not guessable, not posted online), add trusted contact names and numbers, choose the rule (e.g., "always hang up and call back").
- Produces a printable card (print-friendly page) and a shareable text summary. Nothing is stored on a server.

### 7. Auto-redact private information
- Before any text is sent to `/api/analyze`, mask sensitive data in the browser: card numbers (validate with the Luhn check), Social Security numbers, bank account and routing numbers, one-time verification codes, and passwords that appear after words like "password" or "PIN."
- Show the user exactly what was hidden ("We hid 2 items before checking: a card number and a code.") with an option to view the redacted text.
- Do not redact links, sender names, or phone numbers, since they are needed for analysis.
- For screenshots, explain that the image is sent for analysis and is not saved.

### 8. Language support
- A language selector (at least English and Spanish) in settings.
- Translate interface text through a simple translation file structure.
- Ask the AI to write its results in the selected language. Guided steps and call coach content must be available in both languages.
- Update the page `lang` attribute when the language changes so screen readers pronounce text correctly.

## AI prompt updates
- Add the new scam types to the analysis prompt.
- Add support for link-only input.
- Add an optional `language` parameter.
- Keep the existing JSON response format, and add `scamType` values for the new types.
- Add pre-written demo-mode results for every new sample message and a link example.

## Accessibility requirements (apply to every new feature)
- WCAG 2.2 AA.
- Semantic HTML, a logical heading hierarchy, and labels on every input.
- Full keyboard navigation and visible focus.
- aria-live announcements for verdicts, results, quiz feedback, and errors.
- Warning levels and red flags always identified with text labels.
- Minimum 44×44px touch targets; works at 200% zoom and on mobile widths.
- Plain language, around a grade 6 reading level, in both modes.

## User flows to support
1. Quick mode: paste message → inline verdict and red flags → copy summary.
2. Simple mode: phone call in progress → call coach → script → after-call steps.
3. Either mode: scan QR code → link inspection → verdict → next steps.
4. Younger user: fake job offer sample → results → tailored next steps.
5. Switch modes mid-task without losing the message or results.
6. Stretch: practice quiz → score → share; family safety plan → printable card.

## Build order
1. Review the existing codebase and summarize it.
2. Two experience modes (shared state, first-visit choice, mode switch).
3. Link and QR code inspector.
4. Younger-user scam types, samples, demo results, and guided steps.
5. Phone call coach.
6. Accessibility pass on all new features in both modes; fix any regressions.
7. Stretch features in order: practice mode, family safety plan, auto-redaction, language support.
8. Update the README: new persona, both modes, new features, user flows, and setup steps.

Work one step at a time, explain what you changed in simple terms, and check in with me after each step before continuing.
