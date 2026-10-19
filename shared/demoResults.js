import { SAMPLES } from './samples.js';

// Pre-written answers for the example messages. Used when no API key is set
// or when the AI provider fails, so a live demo never breaks.
// Each one has exactly the same shape the AI is asked to return.
// (Demo answers are written in English.)
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
  job: {
    verdict: 'scam',
    confidence: 'high',
    summary: 'This is a fake job offer. It wants your money and your private details.',
    scamType: 'job',
    extractedText: '',
    redFlags: [
      {
        quote: 'no interview needed',
        explanation: 'Real jobs talk to you before they hire you.',
      },
      {
        quote: 'buy your work laptop from our approved vendor ($450)',
        explanation: 'Real employers send you equipment. They never ask you to pay for it first.',
      },
      {
        quote: 'your Social Security number',
        explanation:
          'Scammers use this to steal your identity. Only share it after you have checked the company is real.',
      },
    ],
    nextSteps: [
      "Don't pay for equipment or training.",
      "Don't send your ID or Social Security number.",
      'Look up the company on its own website.',
      'Report the post to the job site.',
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
  payment: {
    verdict: 'scam',
    confidence: 'high',
    summary: 'This is a common payment app trick to get you to send your own money.',
    scamType: 'payment-app',
    extractedText: '',
    redFlags: [
      {
        quote: 'I accidentally sent you $200 on Cash App',
        explanation:
          'The money is often stolen. The payment can be taken back later, and you lose what you sent.',
      },
      {
        quote: 'send it back to $mike_rent22',
        explanation: 'They want you to send money to a different account, not undo the payment.',
      },
      {
        quote: 'Please hurry',
        explanation: 'Rushing you is a common scam trick.',
      },
    ],
    nextSteps: [
      "Don't send any money back yourself.",
      'Check your balance in the app, not through a message.',
      "If a payment did arrive, contact the app's support inside the app.",
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
  marketplace: {
    verdict: 'scam',
    confidence: 'high',
    summary: 'This fake buyer wants you to pay a made-up fee before you get paid.',
    scamType: 'marketplace',
    extractedText: '',
    redFlags: [
      {
        quote: "I'll pay $50 extra for your trouble",
        explanation: 'Offering more than you asked for is a common way to lower your guard.',
      },
      {
        quote: 'my courier will pick it up',
        explanation: 'Scammers use fake "couriers" so they never meet you in person.',
      },
      {
        quote: 'pay the $150 upgrade fee',
        explanation: 'Zelle has no "business upgrade" fee. A real buyer never asks the seller to pay.',
      },
    ],
    nextSteps: [
      "Don't pay any fee to receive money.",
      'Only accept payment inside the marketplace app, or cash in person.',
      'Report and block the buyer.',
    ],
  },
  gaming: {
    verdict: 'scam',
    confidence: 'high',
    summary: 'A fake moderator is trying to steal your gaming account.',
    scamType: 'gaming',
    extractedText: '',
    redFlags: [
      {
        quote: 'will be banned in 1 hour',
        explanation: 'A scary deadline rushes you into acting without thinking.',
      },
      {
        quote: 'discord-appeals-verify.com',
        explanation: "This is not Discord's real website. It is made to steal your login.",
      },
      {
        quote: "Don't share this with anyone",
        explanation: 'Real moderators never ask you to keep things secret.',
      },
    ],
    nextSteps: [
      "Don't log in through the link.",
      'If you did, change your password and turn on 2-step login.',
      'Report the account to the platform.',
    ],
  },
  influencer: {
    verdict: 'scam',
    confidence: 'high',
    summary: 'This fake brand deal wants you to pay to "win".',
    scamType: 'influencer',
    extractedText: '',
    redFlags: [
      {
        quote: "You've been chosen",
        explanation: 'Surprise prizes and deals you did not apply for are a common trick.',
      },
      {
        quote: 'pay $29.99 shipping for your welcome kit',
        explanation: 'Real brands pay you. They never charge you to work with them.',
      },
      {
        quote: 'glowskin-collab.shop/claim',
        explanation: "This is not the brand's official website.",
      },
    ],
    nextSteps: [
      "Don't pay for shipping or a kit.",
      "Check the brand's verified account yourself.",
      'Report and block the account.',
    ],
  },
  crypto: {
    verdict: 'scam',
    confidence: 'high',
    summary: 'This is a crypto investment scam. Nobody can promise you will double your money.',
    scamType: 'crypto',
    extractedText: '',
    redFlags: [
      {
        quote: 'He guarantees you will double your money in 2 weeks',
        explanation: 'Real investments never promise big, fast, sure profits.',
      },
      {
        quote: '$250 in Bitcoin',
        explanation: 'Crypto payments are very hard to get back once sent.',
      },
      {
        quote: 'I made $8,000 last month',
        explanation: 'Stories of easy money are bait to get you to send yours.',
      },
    ],
    nextSteps: [
      "Don't send any crypto or money.",
      'Stop replying to this person.',
      'Report it at reportfraud.ftc.gov.',
    ],
  },
  sextortion: {
    verdict: 'scam',
    confidence: 'high',
    summary: 'This is a threat to scare you into paying. You are not in trouble, and help is available.',
    scamType: 'sextortion',
    extractedText: '',
    redFlags: [
      {
        quote: 'Pay $500 in gift cards',
        explanation: 'Paying almost never makes it stop. They usually ask for more.',
      },
      {
        quote: 'in the next 2 hours',
        explanation: 'A short deadline is meant to scare you into acting fast.',
      },
      {
        quote: "Don't tell anyone",
        explanation: 'They want you to feel alone. Telling someone you trust is the right thing to do.',
      },
    ],
    nextSteps: [
      "Don't pay or send anything.",
      'Save screenshots, then block the account.',
      'Tell an adult you trust.',
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
  link: {
    verdict: 'scam',
    confidence: 'high',
    summary: 'This link pretends to be PayPal, but it goes to a different website.',
    scamType: 'other',
    extractedText: '',
    redFlags: [
      {
        quote: 'paypa1',
        explanation: 'The letter "l" is swapped for the number "1" so it looks like PayPal.',
      },
      {
        quote: 'com-secure-login.xyz',
        explanation: 'The website this really goes to is com-secure-login.xyz, not paypal.com.',
      },
      {
        quote: 'http://',
        explanation: 'The link is not secure.',
      },
    ],
    nextSteps: [
      "Don't open the link.",
      'Go to paypal.com by typing it yourself, or use the PayPal app.',
    ],
  },
};

const normalize = (s) => String(s || '').replace(/\s+/g, ' ').trim().toLowerCase();

/** Finds the demo answer for an example, by its id, its exact text, or its exact link. */
export function findDemoResult({ sampleId, text, link }) {
  if (sampleId && DEMO_RESULTS[sampleId]) return DEMO_RESULTS[sampleId];
  const wantedText = normalize(text);
  const wantedLink = normalize(link);
  const match = SAMPLES.find(
    (s) =>
      (wantedText && s.text && normalize(s.text) === wantedText) ||
      (wantedLink && s.link && normalize(s.link) === wantedLink),
  );
  return match ? DEMO_RESULTS[match.id] : null;
}
