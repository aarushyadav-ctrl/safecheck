import { SAMPLES } from './samples.js';

// Pre-written answers for the example messages. Used when no API key is set
// or when the AI provider fails, so a live demo never breaks.
// Each one has exactly the same shape the AI is asked to return.
export const DEMO_RESULTS = {
  bank: {
    verdict: 'scam',
    confidence: 'high',
    summary: 'This message pretends to be your bank so it can steal your login.',
    scamType: 'bank',
    extractedText: '',
    redFlags: [
      {
        quote: 'Your account has been LOCKED due to unusual activity',
        explanation: "Scary news is used to make you panic. Banks don't lock your account by text.",
      },
      {
        quote: 'within 24 hours or your account will be permanently closed',
        explanation: "A short deadline rushes you so you don't stop and think.",
      },
      {
        quote: 'http://heritagefed-secure-verify.co/login',
        explanation: "This link is not your bank's real website. It is made to steal your password.",
      },
    ],
    nextSteps: [
      "Don't tap the link.",
      'Call your bank using the number on the back of your card.',
      'Delete the message.',
    ],
  },
  package: {
    verdict: 'scam',
    confidence: 'high',
    summary: 'This is a fake delivery text that wants your card details.',
    scamType: 'delivery',
    extractedText: '',
    redFlags: [
      {
        quote: 'pay a $1.99 redelivery fee',
        explanation:
          "The post office doesn't text you for fees. A tiny fee is a trick to get your card number.",
      },
      {
        quote: 'within 12 hours',
        explanation: 'A deadline is used to rush you.',
      },
      {
        quote: 'https://usps-redelivery-help.com/track',
        explanation: 'This is not the real post office website. The real one is usps.com.',
      },
    ],
    nextSteps: [
      "Don't tap the link or pay anything.",
      'Track packages by typing usps.com yourself.',
      'Forward the text to 7726, then delete it.',
    ],
  },
  grandchild: {
    verdict: 'scam',
    confidence: 'high',
    summary: 'This looks like the "grandchild in trouble" scam. It asks for money in gift cards.',
    scamType: 'family-emergency',
    extractedText: '',
    redFlags: [
      {
        quote: 'I need $2,000 for bail right away',
        explanation: 'Asking for a lot of money, fast, is a big warning sign.',
      },
      {
        quote: "Please don't tell Mom and Dad",
        explanation: 'Scammers ask you to keep it secret so nobody can warn you.',
      },
      {
        quote: 'Google Play gift cards',
        explanation: 'Real emergencies are never paid with gift cards. Only scammers ask for them.',
      },
      {
        quote: "this is my friend's phone",
        explanation: 'A new number is a way to hide who is really texting you.',
      },
    ],
    nextSteps: [
      "Don't buy gift cards or send money.",
      'Call your grandchild or their parents on the number you already have.',
    ],
  },
  appointment: {
    verdict: 'safe',
    confidence: 'medium',
    summary: 'This looks like a normal appointment reminder.',
    scamType: 'none',
    extractedText: '',
    redFlags: [],
    nextSteps: [
      "If you're not sure, call the office using the number on your appointment card.",
    ],
  },
};

const normalize = (s) => String(s || '').replace(/\s+/g, ' ').trim().toLowerCase();

/** Finds the demo answer for an example message, by its id or its exact text. */
export function findDemoResult({ sampleId, text }) {
  if (sampleId && DEMO_RESULTS[sampleId]) return DEMO_RESULTS[sampleId];
  const wanted = normalize(text);
  if (!wanted) return null;
  const match = SAMPLES.find((s) => normalize(s.text) === wanted);
  return match ? DEMO_RESULTS[match.id] : null;
}
