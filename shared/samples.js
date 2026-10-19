// Example messages for demos and for people who want to see how SafeCheck works.
// Shared by the website (to fill the form) and the server (for demo-mode answers).
// The names, numbers and links are made up.
// audience: who usually gets this kind of message ('older' | 'younger' | 'everyone').
// The button labels are translated in src/i18n (samples.<id>).
export const SAMPLES = [
  {
    id: 'bank',
    label: 'Bank alert',
    audience: 'older',
    claimedSender: 'My bank',
    text:
      'Heritage Federal Bank ALERT: Your account has been LOCKED due to unusual activity. ' +
      'Verify your identity within 24 hours or your account will be permanently closed. ' +
      'Log in now: http://heritagefed-secure-verify.co/login',
  },
  {
    id: 'job',
    label: 'Remote job offer',
    audience: 'younger',
    claimedSender: 'A company on a job site',
    text:
      "Hi! We saw your profile on a job site and you're hired as a Remote Data Entry Assistant, " +
      "$35/hr, no interview needed. Before you start, buy your work laptop from our approved " +
      "vendor ($450) and we'll pay you back on your first paycheck. Also send a photo of your " +
      "driver's license and your Social Security number for payroll.",
  },
  {
    id: 'package',
    label: 'Package delivery',
    audience: 'everyone',
    claimedSender: 'A delivery company',
    text:
      'USPS: Your package could not be delivered due to an incomplete address. ' +
      'To avoid it being returned, update your details and pay a $1.99 redelivery fee ' +
      'within 12 hours: https://usps-redelivery-help.com/track',
  },
  {
    id: 'payment',
    label: 'Money sent by mistake',
    audience: 'younger',
    claimedSender: 'A stranger',
    text:
      'Hey sorry!! I accidentally sent you $200 on Cash App, it was meant for my landlord. ' +
      'Can you please send it back to $mike_rent22? Please hurry, my rent is due today.',
  },
  {
    id: 'grandchild',
    label: 'Grandchild in trouble',
    audience: 'older',
    claimedSender: 'My grandchild',
    text:
      "Grandma it's me. I'm in trouble. I was in a car accident and I'm at the police station. " +
      "I need $2,000 for bail right away. Please don't tell Mom and Dad, I'm so embarrassed. " +
      'Can you buy Google Play gift cards and text me the numbers on the back? ' +
      "My phone broke so this is my friend's phone.",
  },
  {
    id: 'marketplace',
    label: 'Marketplace buyer',
    audience: 'younger',
    claimedSender: 'A buyer on an online marketplace',
    text:
      "Hi, is the couch still available? I'll pay $50 extra for your trouble. I'm out of town " +
      'so my courier will pick it up. I already sent the money with Zelle, but you need to ' +
      'upgrade to a business account to receive it. Just pay the $150 upgrade fee and it gets refunded.',
  },
  {
    id: 'gaming',
    label: 'Gaming account warning',
    audience: 'younger',
    claimedSender: 'A Discord moderator',
    text:
      "Hey it's Jake from the server mod team. Your account was reported for scamming and will " +
      'be banned in 1 hour. To appeal, verify your account here: discord-appeals-verify.com and ' +
      "log in with your Discord. Don't share this with anyone, appeals are private.",
  },
  {
    id: 'influencer',
    label: 'Brand collab DM',
    audience: 'younger',
    claimedSender: 'A brand on social media',
    text:
      "Congrats! You've been chosen for our Summer Collab with GlowSkin! You get $500 + free " +
      'products. To claim, pay $29.99 shipping for your welcome kit at glowskin-collab.shop/claim ' +
      'within 24 hours!',
  },
  {
    id: 'crypto',
    label: 'Crypto investment',
    audience: 'everyone',
    claimedSender: 'Someone I met online',
    text:
      'Hi friend, I made $8,000 last month with my crypto trading mentor. He guarantees you will ' +
      'double your money in 2 weeks. Start with just $250 in Bitcoin and I will send you the wallet address.',
  },
  {
    id: 'sextortion',
    label: 'Threat to share photos',
    audience: 'younger',
    claimedSender: "An account I don't know",
    text:
      'I have private photos of you. Pay $500 in gift cards in the next 2 hours or I will send ' +
      "them to all your followers and family. Don't tell anyone or I'll post them.",
  },
  {
    id: 'appointment',
    label: 'Appointment reminder',
    audience: 'older',
    claimedSender: "My doctor's office",
    text:
      "Hi Margaret, this is Dr. Patel's office reminding you of your appointment on " +
      'Thursday at 10:30 AM. If you need to change it, please call us at the number on ' +
      'your appointment card. See you soon!',
  },
  {
    id: 'link',
    label: 'Suspicious link',
    audience: 'everyone',
    kind: 'link',
    claimedSender: '',
    link: 'http://paypa1.com-secure-login.xyz/account/verify?id=88213',
  },
];

export function findSample(id) {
  return SAMPLES.find((s) => s.id === id) || null;
}
