// Example messages for demos and for people who want to see how SafeCheck works.
// Shared by the website (to fill the form) and the server (for demo-mode answers).
// The names and links are made up.
export const SAMPLES = [
  {
    id: 'bank',
    label: 'Bank alert',
    claimedSender: 'My bank',
    text:
      'Heritage Federal Bank ALERT: Your account has been LOCKED due to unusual activity. ' +
      'Verify your identity within 24 hours or your account will be permanently closed. ' +
      'Log in now: http://heritagefed-secure-verify.co/login',
  },
  {
    id: 'package',
    label: 'Package delivery',
    claimedSender: 'A delivery company',
    text:
      'USPS: Your package could not be delivered due to an incomplete address. ' +
      'To avoid it being returned, update your details and pay a $1.99 redelivery fee ' +
      'within 12 hours: https://usps-redelivery-help.com/track',
  },
  {
    id: 'grandchild',
    label: 'Grandchild in trouble',
    claimedSender: 'My grandchild',
    text:
      "Grandma it's me. I'm in trouble. I was in a car accident and I'm at the police station. " +
      "I need $2,000 for bail right away. Please don't tell Mom and Dad, I'm so embarrassed. " +
      "Can you buy Google Play gift cards and text me the numbers on the back? " +
      "My phone broke so this is my friend's phone.",
  },
  {
    id: 'appointment',
    label: 'Appointment reminder',
    claimedSender: "My doctor's office",
    text:
      "Hi Margaret, this is Dr. Patel's office reminding you of your appointment on " +
      'Thursday at 10:30 AM. If you need to change it, please call us at the number on ' +
      'your appointment card. See you soon!',
  },
];

export function findSample(id) {
  return SAMPLES.find((s) => s.id === id) || null;
}
