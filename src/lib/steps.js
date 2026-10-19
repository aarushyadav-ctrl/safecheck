// The "What should I do now?" steps, written in plain words.
// They are chosen by the verdict and the kind of scam, so advice always
// matches the message. Each step: { title, body, links? }.

const REPORT_LINK = {
  href: 'https://reportfraud.ftc.gov/',
  label: 'Report it to the FTC at reportfraud.ftc.gov',
};

const CONTACT_STEP = {
  bank: {
    title: 'Call your bank yourself',
    body: "Use the phone number on the back of your bank card or on your statement. Don't use any number or link from the message.",
  },
  delivery: {
    title: 'Check your package the safe way',
    body: "If you're expecting a package, type the company's website yourself, like usps.com, or call them. Don't use the link in the message.",
  },
  'family-emergency': {
    title: 'Call your family member yourself',
    body: 'Call your grandchild, or their parents, on the number you already have. You can also ask a question only the real person would know.',
  },
  government: {
    title: 'Contact the agency yourself',
    body: "Offices like Social Security, Medicare, and the IRS don't text or email asking for money. Call the number on a letter they mailed you.",
  },
  'tech-support': {
    title: "Don't let anyone into your computer",
    body: "Real companies don't contact you about computer problems. If you're worried, ask someone you trust to look at it.",
  },
  default: {
    title: 'Contact the real company yourself',
    body: "Use a phone number you already trust, like one on your card, bill, or statement. Don't use the number in the message.",
  },
};

function scamSteps(scamType) {
  const isFamily = scamType === 'family-emergency';
  return [
    {
      title: "Don't reply or tap any links",
      body: "Replying tells scammers your number works. Links can open fake websites that steal your information.",
    },
    isFamily
      ? {
          title: "Don't buy gift cards or send money",
          body: 'Real family emergencies are never paid with gift cards. Only scammers ask for them.',
        }
      : {
          title: "Don't send money or personal details",
          body: "Never share passwords, card numbers, or codes sent to your phone. Don't pay with gift cards, wire transfers, or crypto.",
        },
    CONTACT_STEP[scamType] || CONTACT_STEP.default,
    {
      title: 'Block it and report it',
      body: 'Forward scam texts to 7726 (it spells SPAM). Report the scam to the FTC. Then block the sender and delete the message.',
      links: [REPORT_LINK],
    },
  ];
}

const SAFE_STEPS = [
  {
    title: 'It looks fine to read',
    body: 'We did not find warning signs. You can treat it like a normal message.',
  },
  {
    title: 'Stay alert',
    body: 'If it later asks for money, passwords, or a code, stop and check it again.',
  },
  {
    title: 'When in doubt, check yourself',
    body: 'Call the person or company using a number you already have.',
  },
];

// For people who already tapped a link, replied, paid, or shared details.
const RECOVERY_STEPS = [
  {
    title: "Stop. Don't share anything else",
    body: "Close the website. Don't reply to the message or answer calls about it.",
  },
  {
    title: 'Change your passwords',
    body: 'If you typed a password, change it now. Start with your email and your bank. Use a new password you have not used anywhere else.',
  },
  {
    title: 'Call your bank',
    body: 'If you shared card or bank details, or sent money, call your bank now. Use the number on your card. Ask them to stop payments or send you a new card.',
  },
  {
    title: 'Watch your accounts',
    body: "For the next few weeks, check your bank and card statements. Tell your bank about any charge you don't know.",
  },
  {
    title: 'Report it',
    body: 'Report the scam to the FTC. If you shared your Social Security number, IdentityTheft.gov will give you a step-by-step recovery plan.',
    links: [
      REPORT_LINK,
      { href: 'https://www.identitytheft.gov/', label: 'Get a recovery plan at IdentityTheft.gov' },
    ],
  },
];

export function getSteps(result, path) {
  if (path === 'clicked') return RECOVERY_STEPS;
  if (result?.verdict === 'safe') return SAFE_STEPS;
  return scamSteps(result?.scamType);
}
