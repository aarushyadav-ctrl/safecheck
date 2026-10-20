// English text for SafeCheck. Grouped by screen.
// Plain language: short sentences, about a 6th-grade reading level.

const plural = (n, one, many) => (n === 1 ? one : many);
const FTC = { href: 'https://reportfraud.ftc.gov/', label: 'Report it to the FTC at reportfraud.ftc.gov' };

export default {
  common: {
    back: 'Back',
    backToResult: 'Back to my result',
    backToStart: 'Back to start',
    done: 'Done',
    nextStep: 'Next step',
    newTab: '(opens in a new tab)',
    copied: 'Copied. You can paste it anywhere.',
    copiedShort: 'Copied',
  },

  list: {
    and: ({ items }) =>
      items.length <= 1 ? items[0] || '' : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`,
  },

  layout: {
    skip: 'Skip to main content',
    navLabel: 'Main',
    howItWorks: 'How it works',
    settings: 'Settings',
    demoTitle: 'Demo mode.',
    demoBody: 'Live checking is off, so the example messages show pre-written results. Link checks still work.',
    footerPrivacy: 'SafeCheck does not save your messages.',
    footerMistakes: 'It can make mistakes. If you are unsure, ask someone you trust.',
  },

  mode: {
    switchLabel: 'Choose a view',
    switched: ({ mode }) => `${mode} mode is on.`,
    simple: {
      name: 'Simple',
      desc: 'One step at a time, with big buttons and guidance.',
      bestFor: 'Good if you like to take it slowly.',
    },
    quick: {
      name: 'Quick',
      desc: 'Everything on one screen. Paste, check, done.',
      bestFor: 'Good if you want a fast answer.',
    },
  },

  chooser: {
    title: 'How would you like to use SafeCheck?',
    lead: 'Both ways check messages the same way. Pick the one that feels right.',
    note: 'You can switch any time with "Simple" and "Quick" at the top of the page.',
  },

  home: {
    pageTitle: 'Check a message',
    title: 'Not sure if a message is a scam?',
    titleSoft: "Let's check it together.",
    lead: "Show us the message. We'll tell you in plain words if it looks like a scam, and what to do next.",
    startHeading: 'What do you want to check?',
    options: {
      paste: { title: 'Paste a message', hint: 'Copy the words from a text or email.' },
      screenshot: { title: 'Upload a screenshot', hint: 'Use a picture of the message.' },
      link: { title: 'Check a link', hint: 'See where a web address really goes.' },
      qr: { title: 'Scan a QR code', hint: 'Use a photo of the code.' },
    },
    call: {
      title: 'Someone is on the phone with me right now',
      hint: 'Get help during the call. No typing needed.',
    },
    privacy: "Your message is only used to check it. We don't save it.",
    toolsTitle: 'More ways to stay safe',
    tools: {
      practice: { title: 'Practice spotting scams', hint: 'A short quiz with 10 messages.' },
      plan: { title: 'Make a family safety plan', hint: 'Pick a code word for real emergencies.' },
      how: { title: 'How it works', hint: 'What SafeCheck checks, and its limits.' },
      settings: { title: 'Text size and display settings', hint: 'Bigger text, high contrast, language.' },
    },
    example: {
      caption: "Here's what you'll see: the warning signs, marked and explained.",
      from: 'Text from +1 (202) 555-0147',
      sign1Title: 'Asks for money.',
      sign1Body: 'The real post office does not text you for fees.',
      sign2Title: 'Fake website.',
      sign2Body: 'The real one is usps.com, not this.',
    },
  },

  quick: {
    title: 'Quick check',
    lead: 'Paste a message, add a screenshot, or check a link. The answer shows up right here.',
    shortcut: 'Shortcut:',
    toolsLabel: 'Other tools',
    tools: {
      call: 'On a call right now?',
      practice: 'Practice quiz',
      plan: 'Family safety plan',
    },
    resultTitle: 'Result',
    empty: 'Your result will appear here.',
    copy: 'Copy summary',
    copied: 'Summary copied. You can paste it anywhere.',
    whatToDo: 'What to do',
  },

  inputs: {
    what: 'What do you want to check?',
    kinds: { message: 'A message', link: 'A link', qr: 'A QR code' },
    optional: '(optional)',
    message: {
      label: 'The message',
      hint: 'Copy the words from your text, email, or DM, then paste them here.',
      placeholder: 'For example: Your account is locked. Tap this link to unlock it…',
    },
    sender: {
      label: "Who does it say it's from?",
      hint: 'For example: my bank, a delivery company, a recruiter, or my grandchild.',
    },
    link: {
      label: 'The link',
      hint: 'Paste the web address. SafeCheck never opens it.',
      placeholder: 'example.com/page',
    },
  },

  screenshot: {
    label: 'Screenshot',
    optional: '(optional if you pasted the words)',
    hint: 'A picture of the message from your phone or computer.',
    choose: 'Choose a screenshot',
    adding: 'Adding screenshot…',
    drag: 'or drag a picture here',
    replace: 'Replace screenshot',
    remove: 'Remove screenshot',
    previewAlt: 'Your screenshot',
    added: 'Screenshot added.',
    removed: 'Screenshot removed.',
    privacy:
      "Your screenshot is sent to be checked and isn't saved. We can't hide private details inside pictures, so crop them out first if you can.",
  },

  image: {
    errors: {
      notImage: 'That file is not a picture. Please choose a screenshot or photo.',
      tooBig: 'That picture is too large. Please choose one under 15 MB.',
      cantOpen: "We couldn't open that picture. Please try a different one.",
    },
  },

  qr: {
    label: 'Photo of the QR code',
    hint: "Take or choose a photo of the QR code. We read it on your device and never open the link.",
    choose: 'Take or choose a photo',
    chooseAgain: 'Use a different photo',
    reading: 'Reading the code…',
    foundTitle: 'We found this link in the QR code:',
    neverOpened: 'We have not opened it. Press "Check this link" to see if it is safe.',
    foundLink: ({ link }) => `QR code read. It links to ${link}. Press "Check this link" next.`,
    foundText: 'This QR code has words, not a link. We put the words in the message box.',
    errors: {
      notFound:
        "We couldn't find a QR code in that photo. Try again with the code filling most of the photo, in good light, and the phone held still.",
      notImage: 'That file is not a picture. Please choose a photo of the QR code.',
      tooBig: 'That photo is too large. Please choose one under 15 MB.',
      cantOpen: "We couldn't open that photo. Please try a different one.",
    },
  },

  examples: {
    title: 'Want to see how it works first?',
    titleShort: 'Try an example',
    hint: 'Try one of these example messages. Some are scams older adults get, some younger people get.',
  },

  samples: {
    bank: 'Bank alert',
    job: 'Remote job offer',
    package: 'Package delivery',
    payment: 'Money sent by mistake',
    grandchild: 'Grandchild in trouble',
    marketplace: 'Marketplace buyer',
    gaming: 'Gaming account warning',
    influencer: 'Brand collab DM',
    crypto: 'Crypto investment',
    sextortion: 'Threat to share photos',
    appointment: 'Appointment reminder',
    link: 'Suspicious link',
  },

  check: {
    lead: 'Paste the message, add a screenshot, or check a link.',
    headings: {
      idle: 'Check a message',
      loading: 'Checking…',
      error: "We couldn't finish the check",
    },
    submit: 'Check this message',
    submitLink: 'Check this link',
    tryAgain: 'Try again',
    change: 'Change what I sent',
    exampleLoaded: ({ label }) => `Example loaded: ${label}. Press "Check" when you're ready.`,
    pastedPicture: 'Picture added as your screenshot.',
    announceChecking: 'Checking. This usually takes a few seconds.',
    announceStopped: 'Stopped checking. What you entered is still here.',
    errors: {
      empty: 'Please paste the message or add a screenshot first.',
      emptyLink: 'Please paste the link first.',
      emptyQr: 'Please add a photo of the QR code first.',
    },
  },

  analyzing: {
    phases: [
      'Looking at the links…',
      'Checking for pressure to act fast…',
      'Looking for requests for money…',
      'Comparing it with common scams…',
    ],
    linkPhases: [
      'Finding where the link really goes…',
      'Looking for lookalike names…',
      'Comparing it with real websites…',
    ],
    screenshot: 'Reading your screenshot…',
    note: 'This usually takes a few seconds.',
    stop: 'Stop checking',
  },

  errors: {
    network: "We couldn't reach SafeCheck. Please check your internet connection and try again.",
    timeout: 'Checking took too long. Please try again.',
    not_configured: "Live checking isn't turned on yet, so only the examples and link checks work right now.",
    no_vision: "Checking screenshots isn't set up yet. Please paste the words of the message instead.",
    invalid_key: "Live checking isn't working right now. The person who set up SafeCheck needs to check the AI key.",
    bad_model: "Live checking isn't set up correctly right now. The person who set up SafeCheck needs to fix the AI model name.",
    rate_limited: 'A lot of messages are being checked right now. Please wait a minute and try again.',
    too_many: "You've checked a lot of messages in a short time. Please wait one minute, then try again.",
    too_large: 'That screenshot is too big to check. Please try a smaller picture, or paste the words instead.',
    provider_down: "The checking service isn't answering right now. Please try again in a few minutes.",
    bad_request: 'Something went wrong while checking. Please try again.',
    bad_response: "We got an answer we couldn't understand. Please try again.",
    bad_input: 'Something was wrong with the message. Please try again.',
    empty: 'Please paste the message, add a screenshot, or enter a link first.',
    too_long: 'That message is very long. Please paste only the part that seems suspicious.',
    link_too_long: 'That link is too long to check.',
    bad_image: "We couldn't read that picture. Please try a different screenshot.",
  },

  verdict: {
    scam: 'Likely a scam',
    caution: 'Be careful',
    safe: 'Looks safe',
  },

  confidence: {
    high: "We're quite sure. It has signs scammers often use.",
    medium: "We're fairly sure, but not certain.",
    low: "We're not sure. Please be extra careful.",
    safeHigh: "We didn't find any warning signs.",
    safeOther: "We didn't find clear warning signs, but some scams look normal.",
  },

  results: {
    ourAnswer: 'Our answer',
    announce: ({ verdict }) => `Result: ${verdict}.`,
    signsFound: ({ count }) =>
      count === 0 ? 'No warning signs found.' : `${count} warning ${plural(count, 'sign', 'signs')} found.`,
    signNumber: ({ n }) => `warning sign ${n}`,
    signsHeading: ({ count }) => `${count} warning ${plural(count, 'sign', 'signs')} we found`,
    signsHeadingNone: 'Warning signs',
    captionMessage: 'Your message',
    captionScreenshot: 'The words we read from your screenshot',
    captionMarked: ', with warning signs marked',
    noSigns: "We didn't find any warning signs in this message.",
    mistakes: 'SafeCheck can make mistakes. If something feels wrong, trust that feeling.',
    demoLabel: 'Demo result:',
    demoNote: 'this answer was written ahead of time for this example (in English).',
    localLabel: 'Checked on your device:',
    localNote: 'live AI checking was not used, so this answer comes from our link checks only.',
    whatNow: 'What should I do now?',
    alreadyClicked: 'I already tapped a link or replied',
    inShort: 'In short',
    moreOptions: 'More options',
    askSomeone: 'Ask someone I trust',
    checkAnother: 'Check another message',
    noneTitle: 'No message checked yet',
    noneBody: "Paste a message, add a screenshot, or enter a link, and we'll check it for you.",
    noneAction: 'Check a message',
  },

  redact: {
    placeholder: {
      card: '[card number hidden]',
      ssn: '[Social Security number hidden]',
      routing: '[routing number hidden]',
      account: '[account number hidden]',
      code: '[code hidden]',
      password: '[password hidden]',
    },
    names: {
      card: ({ count }) => (count === 1 ? 'a card number' : `${count} card numbers`),
      ssn: ({ count }) => (count === 1 ? 'a Social Security number' : `${count} Social Security numbers`),
      routing: ({ count }) => (count === 1 ? 'a routing number' : `${count} routing numbers`),
      account: ({ count }) => (count === 1 ? 'an account number' : `${count} account numbers`),
      code: ({ count }) => (count === 1 ? 'a code' : `${count} codes`),
      password: ({ count }) => (count === 1 ? 'a password or PIN' : `${count} passwords or PINs`),
    },
    summary: ({ total, list }) => `We hid ${total} ${plural(total, 'item', 'items')} before checking: ${list}.`,
    show: 'Show what we sent',
    hide: 'Hide what we sent',
  },

  link: {
    reportTitle: 'Where this link really goes',
    goesTo: 'This link goes to the website:',
    fullAddress: 'Full address',
    explainParts: ({ sub, domain }) =>
      `The part at the start ("${sub}") is just a label. The real website is the name just before the ending: ${domain}.`,
    neverOpened: 'SafeCheck never opens, loads, or previews the link.',
    findingsTitle: 'What we noticed',
    noFindings: "We didn't find warning signs in the address. That doesn't prove the website is safe.",
    aiTitle: 'What our AI noticed',
    realDestination: ({ domain }) => `The link really goes to: ${domain}`,
    readAloudDomain: ({ domain }) => `The link really goes to ${domain}.`,
    levels: { danger: 'Warning sign', warning: 'Be careful', good: 'Good sign' },
    summary: {
      scam: ({ brand }) =>
        brand
          ? `This link looks like ${brand}, but it goes to a different website.`
          : 'This link has strong warning signs. Do not open it.',
      caution: "This link has some warning signs. Don't open it unless you're sure who sent it.",
      safe: ({ brand }) =>
        brand
          ? `This link goes to ${brand}'s real website.`
          : "We didn't find warning signs in this link. Only open it if you trust who sent it.",
    },
    errors: {
      empty: 'Please paste the link first.',
      invalid: "That doesn't look like a web address. Check that you copied the whole link.",
      notWeb: "That isn't a website link. SafeCheck checks links that start with http, https, or a website name.",
    },
    findings: {
      atTrick: {
        title: 'The start of the link is a trick',
        body: ({ fake, real }) =>
          `Everything before the "@" is ignored. It shows "${fake}", but the link really goes to ${real}.`,
      },
      ip: {
        title: 'Numbers instead of a website name',
        body: 'Real companies use names, not a string of numbers. This hides who runs the site.',
      },
      punycode: {
        title: 'Letters from another alphabet',
        body: ({ shown }) =>
          `This address shows as "${shown}", but some letters are from another alphabet. They look the same but go to a different website.`,
      },
      brandInFront: {
        title: ({ brand }) => `"${brand}" is used as a label in front`,
        body: ({ brand, real, official }) =>
          `This is not ${brand}. The real website is ${real}. ${brand}'s real website is ${official}.`,
      },
      brandWords: {
        title: ({ brand }) => `Uses "${brand}" in a website that isn't ${brand}`,
        body: ({ brand, real, official }) =>
          `Scammers add words to a brand name to fool you. ${real} is not ${brand}. The real one is ${official}.`,
      },
      lookalike: {
        title: ({ brand }) => `Looks like "${brand}", but the letters are swapped`,
        body: ({ brand, official }) =>
          `Letters or numbers are switched (like "1" for "l" or "0" for "o") to look like ${brand}. The real one is ${official}.`,
      },
      shortener: {
        title: 'A shortened link hides where it goes',
        body: ({ domain }) =>
          `${domain} makes links short, so you can't see the real website before you tap.`,
      },
      http: {
        title: 'Not a secure link',
        body: 'It starts with "http://" without an "s". Information you type could be seen by others.',
      },
      riskyTld: {
        title: ({ tld }) => `Unusual ending: ${tld}`,
        body: 'This ending is cheap and often used by scam websites. Real companies rarely use it.',
      },
      port: {
        title: 'An unusual number in the address',
        body: ({ port }) => `The ":${port}" is rare for normal websites.`,
      },
      confusing: {
        title: 'A very long or confusing address',
        body: 'Long addresses with many dots or dashes are often made to hide the real website.',
      },
      official: {
        title: ({ brand }) => `This is ${brand}'s real website`,
        body: 'The address matches the real website. Still be careful about what it asks you to do.',
      },
    },
  },

  summary: {
    warningSigns: 'Warning signs',
    whatToDo: 'What to do',
  },

  speech: {
    read: 'Read this to me',
    readStep: 'Read this step to me',
    stop: 'Stop reading',
    stopShort: 'Stop',
    loading: 'Getting the voice ready…',
  },

  steps: {
    count: ({ n, total }) => `Step ${n} of ${total}`,
    dontReply: {
      title: "Don't reply or tap any links",
      body: 'Replying tells scammers your number works. Links can open fake websites that steal your information.',
    },
    noMoney: {
      title: "Don't send money or personal details",
      body: "Never share passwords, card numbers, or codes sent to your phone. Don't pay with gift cards, wire transfers, or crypto.",
    },
    noGiftCards: {
      title: "Don't buy gift cards or send money",
      body: 'Real family emergencies are never paid with gift cards. Only scammers ask for them.',
    },
    contact: {
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
    },
    block: {
      title: 'Block it and report it',
      body: 'Forward scam texts to 7726 (it spells SPAM). Report the scam to the FTC. Then block the sender and delete the message.',
      links: [FTC],
    },
    link: [
      {
        title: "Don't open the link",
        body: "Don't tap it, and don't type any passwords or card numbers into the page if you already did.",
      },
      {
        title: 'Go to the real website yourself',
        body: 'Type the website name you know, or use the official app. Never use a link from a message to log in.',
      },
      {
        title: 'Block it and report it',
        body: 'Forward scam texts to 7726 (it spells SPAM). Report the scam to the FTC, then delete the message.',
        links: [FTC],
      },
    ],
    byType: {
      job: [
        {
          title: "Don't pay to start a job",
          body: 'Real employers never ask you to pay for equipment, training, or "starter kits". They send you what you need.',
        },
        {
          title: "Don't send ID, bank, or Social Security details",
          body: 'Only share these after you have checked the company is real, usually after a real interview.',
        },
        {
          title: 'Check the company yourself',
          body: "Look up the company's own website and contact them there. Real recruiters use company email addresses.",
        },
        {
          title: 'Report the job post',
          body: 'Report it on the job site or app where you saw it, and to the FTC.',
          links: [FTC],
        },
      ],
      'payment-app': [
        {
          title: "Don't send the money back yourself",
          body: 'The payment may be stolen or fake and can be taken back later. Then the money you sent is gone.',
        },
        {
          title: 'Check your balance in the app',
          body: 'Open the app yourself. Never trust a screenshot or email that says you got paid.',
        },
        {
          title: "Contact the app's support",
          body: "If a payment really arrived, use Help inside the app. They can reverse it the right way.",
        },
        {
          title: 'Block and report the account',
          body: 'Use the report button in the app, and report it to the FTC.',
          links: [FTC],
        },
      ],
      marketplace: [
        {
          title: 'Only get paid inside the app, or in cash in person',
          body: 'Never accept checks, "upgrade fees", or payments that say you must do something first.',
        },
        {
          title: 'Never pay a fee to receive money',
          body: 'Payment apps do not charge sellers to "unlock" or "upgrade" a payment.',
        },
        {
          title: "Don't use the buyer's courier or shipping label",
          body: 'Fake couriers and labels let scammers take your item without paying.',
        },
        {
          title: 'Report and block the buyer',
          body: 'Use the report button in the marketplace app.',
          links: [FTC],
        },
      ],
      gaming: [
        {
          title: "Don't log in through the link",
          body: 'Real moderators and support never ask you to "verify" your account through a DM.',
        },
        {
          title: 'If you logged in, change your password now',
          body: 'Open the official app or website yourself. Change your password and turn on 2-step login.',
        },
        {
          title: "Don't trade items or share codes",
          body: 'Never share login codes or trade items to "prove" your account is safe.',
        },
        {
          title: 'Report the account',
          body: 'Use the report button in the game or on Discord, then block the account.',
        },
      ],
      influencer: [
        {
          title: "Don't pay to win or to work with a brand",
          body: 'Real brands pay you. They never ask you to pay shipping or a fee.',
        },
        {
          title: "Check the brand's real account",
          body: 'Find the brand yourself. Real collabs come from verified accounts or company email.',
        },
        {
          title: "Don't share your details",
          body: 'Never send your address, ID, or card number to claim a "prize" or deal.',
        },
        {
          title: 'Report and block the account',
          body: 'Use the report button in the app.',
        },
      ],
      crypto: [
        {
          title: "Don't send any crypto or money",
          body: 'Crypto payments are almost impossible to get back once sent.',
        },
        {
          title: 'Stop replying',
          body: 'No one can promise big, fast, or sure profits. That promise is the scam.',
        },
        {
          title: 'If you already sent money, act now',
          body: 'Contact the app or exchange you used right away. Keep screenshots of everything.',
        },
        {
          title: 'Report it',
          body: 'Report it to the FTC and to the FBI at ic3.gov.',
          links: [FTC, { href: 'https://www.ic3.gov/', label: 'Report it to the FBI at ic3.gov' }],
        },
      ],
      sextortion: [
        {
          title: 'You are not in trouble',
          body: 'This happens to many people. The person is trying to scare you. You did the right thing by checking.',
        },
        {
          title: "Don't pay or send anything",
          body: 'Paying almost never makes it stop. They usually ask for more.',
        },
        {
          title: "Save the messages, then block",
          body: "Take screenshots of the messages and the account name. Don't delete them. They help with reports. Then block the account.",
        },
        {
          title: 'Tell a trusted adult',
          body: "A parent, family member, teacher, or counselor can help. You don't have to handle this alone.",
        },
        {
          title: 'Report it',
          body: 'Take It Down can help remove images of people under 18. The CyberTipline takes reports too. If you are 18 or older, you can also report it to the FBI.',
          links: [
            { href: 'https://takeitdown.ncmec.org/', label: 'Take It Down: takeitdown.ncmec.org' },
            { href: 'https://report.cybertip.org/', label: 'CyberTipline: report.cybertip.org' },
            { href: 'https://www.ic3.gov/', label: 'FBI: ic3.gov' },
          ],
        },
      ],
    },
    safe: [
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
    ],
    recovery: [
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
        links: [FTC, { href: 'https://www.identitytheft.gov/', label: 'Get a recovery plan at IdentityTheft.gov' }],
      },
    ],
  },

  nextSteps: {
    title: 'What should I do now?',
    titleClicked: 'If you already tapped a link or replied',
    lead: "Let's go one step at a time. Take as long as you need.",
    leadClicked: "Don't worry. Acting quickly helps a lot. Let's go one step at a time.",
    switchClicked: 'I already tapped a link, replied, or shared information',
    notClicked: "I didn't tap or reply to anything",
    doneTitle: "You're all done",
    doneBody: 'You did the right thing by checking first. Here is what you did:',
    again: 'Go over the steps again',
  },

  ask: {
    title: 'Ask someone you trust',
    lead: "It's always fine to get a second opinion. We wrote a short note for a family member or friend. You can change the words first.",
    noResult: "Check a message first. Then we'll write a short note you can send to family or a friend.",
    noteLabel: 'Your note',
    noteHint: 'Web addresses are changed a little, like example[.]com, so nobody taps a scam link by accident.',
    how: 'How do you want to send it?',
    share: 'Share',
    sms: 'Send as a text message',
    email: 'Send as an email',
    copy: 'Copy the note',
    copied: 'Note copied. You can paste it into a text message or email.',
    call: 'You can also just call them and read them the message.',
    subject: 'Can you help me check a message?',
  },

  share: {
    note: {
      hello: 'Hi, can you help me check a message I got?',
      says: ({ verdict }) => `SafeCheck says: ${verdict}.`,
      signs: 'Warning signs it found:',
      from: ({ sender }) => `It says it is from: ${sender}`,
      message: 'The message:',
      link: 'The link:',
      linkGoesTo: ({ domain }) => `It really goes to: ${domain}`,
      callMe: 'Could you call me when you see this? Thank you!',
    },
  },

  settings: {
    title: 'Settings',
    close: 'Close settings',
    intro: 'Changes happen right away and stay while this window is open.',
    language: 'Language',
    languageChanged: 'Language: English.',
    textSize: 'Text size',
    sizes: { standard: 'Standard', large: 'Large', largest: 'Largest' },
    textSizeChanged: ({ size }) => `Text size: ${size}.`,
    contrast: 'High contrast',
    contrastHint: 'Black text on white with stronger lines.',
    motion: 'Reduce motion',
    motionHint: 'Turns off moving and sliding effects.',
    motionDevice: 'Your device already asks for less motion, so SafeCheck uses less motion too.',
    on: 'On',
    off: 'Off',
    voice: 'Voice',
    voices: { hannah: 'Hannah (natural)', troy: 'Troy (natural)', device: "This device's voice" },
    voiceHint:
      'Natural voices sound like a real person. They need the internet, and the words being read are sent to our voice service. Nothing is saved.',
    voiceSpanish: "Natural voices speak English only, so Spanish uses this device's voice.",
    voiceUnavailable: "Natural voices aren't available right now, so SafeCheck uses this device's voice.",
    speed: 'Reading speed',
    speedHint: 'How fast "Read this to me" talks.',
    speeds: { slow: 'Slow', normal: 'Normal', fast: 'Fast' },
    hearSample: 'Hear a sample',
    sampleSpeech: 'This is how fast SafeCheck will read to you.',
    done: 'Done',
    reset: 'Reset to normal',
    resetDone: 'Settings reset.',
  },

  call: {
    pageTitle: 'Phone call help',
    title: 'Someone is on the phone with me right now',
    lead: "Tap everything the caller is asking for or saying. You'll get an answer right away. You don't need to type anything.",
    question: 'What is the caller asking for or saying?',
    hint: 'Choose all that apply.',
    clear: 'Clear my choices',
    options: [
      {
        id: 'giftCards',
        warning: true,
        label: 'Buy gift cards or cryptocurrency',
        why: 'No real company, government office, or family member asks to be paid in gift cards or crypto.',
      },
      {
        id: 'wire',
        warning: true,
        label: 'Send money by wire transfer or a payment app',
        why: 'This money is very hard to get back. Scammers ask for it for that reason.',
      },
      {
        id: 'code',
        warning: true,
        label: 'Read them a code sent to my phone',
        why: 'That code is the key to your account. Real companies never ask you to read it to them.',
      },
      {
        id: 'remote',
        warning: true,
        label: 'Let them into my computer, or install an app',
        why: 'Once they are in, they can see your accounts and passwords.',
      },
      {
        id: 'secret',
        warning: true,
        label: 'Keep this a secret, or stay on the line',
        why: "Scammers want you alone so nobody can warn you. It's always OK to hang up and ask someone.",
      },
      {
        id: 'arrest',
        warning: true,
        label: "I owe money and will be arrested or fined",
        why: 'Police and government offices do not call to demand payment or threaten arrest.',
      },
      {
        id: 'family',
        warning: true,
        label: 'A family member is in trouble and needs money',
        why: 'Scammers pretend to be family, and can even copy voices with AI. Call your family member on the number you know.',
      },
      {
        id: 'moveMoney',
        warning: true,
        label: 'My account was hacked and I must move my money',
        why: 'Your bank will never ask you to move money to a "safe account". That account belongs to the scammer.',
      },
      {
        id: 'prize',
        warning: true,
        label: 'I won a prize but must pay to get it',
        why: 'Real prizes are free. If you have to pay, it is not a prize.',
      },
      {
        id: 'appointment',
        warning: false,
        label: 'Confirming an appointment or delivery I expected',
        why: '',
      },
      {
        id: 'survey',
        warning: false,
        label: 'Asking survey questions, with no money or details',
        why: '',
      },
    ],
    resultTitle: 'Your answer',
    pickPrompt: 'Choose what the caller is asking for, and your answer will show here.',
    anytime: 'You can always hang up. It is never rude to protect yourself.',
    answerLabel: 'Our answer',
    scamTitle: 'Hang up. This is almost certainly a scam.',
    scamBody: 'Real companies, government offices, and family do not ask for this on the phone.',
    okTitle: 'Nothing you picked is a common scam sign',
    okBody: "That's a good sign. But if anything feels off, it is still safe to hang up and call back on a number you trust.",
    whyTitle: 'Why these are warning signs',
    scriptTitle: 'Say this, then hang up',
    script: "I don't do this over the phone. I'm going to hang up and call back on the official number. Goodbye.",
    scriptOk: "I'd like to call you back. I'll use the number on your website or my statement. Thank you.",
    afterTitle: 'After you hang up',
    after: {
      base: [
        "Call back on a number you trust, from your card, a statement, or the company's real website. Never the number they gave you.",
        'Tell someone you trust what happened.',
        'Report the call to the FTC.',
      ],
      ok: [
        'If you want to be sure, call back using a number you already have.',
        "Don't give out codes, passwords, or card numbers, even if the call seemed normal.",
      ],
      extra: {
        giftCards: 'If you already bought gift cards, call the company on the back of the card right away and keep the receipt.',
        wire: 'If you already sent money, call your bank or the payment app right away.',
        code: 'If you gave them a code, sign in to that account yourself now and change your password.',
        remote: 'If they got into your computer, turn it off and ask someone you trust for help before using it again.',
        family: 'Call your family member on the number you already have.',
        moveMoney: 'Call your bank on the number on your card and tell them about the call.',
      },
    },
    reportLink: 'Report the call at reportfraud.ftc.gov',
    announceScam: ({ count }) =>
      `Answer: hang up, this is almost certainly a scam. ${count} warning ${plural(count, 'sign', 'signs')}.`,
    announceOk: 'Answer: nothing you picked is a common scam sign.',
    announceNone: 'Choices cleared.',
  },

  practice: {
    pageTitle: 'Practice spotting scams',
    title: 'Spot the scam',
    lead: 'Look at each message and decide: scam or safe? Then see what gives it away.',
    scoreShort: ({ score, total }) => `Score: ${score} of ${total}`,
    streakShort: ({ streak }) => `Streak: ${streak}`,
    count: ({ n, total }) => `Message ${n} of ${total}`,
    question: 'Is this a scam, or is it safe?',
    answerLabel: 'Your answer',
    choose: { scam: 'Scam', safe: 'Safe' },
    right: 'Correct!',
    wrong: 'Not quite.',
    itWas: { scam: 'This message is a scam.', safe: 'This message is safe.' },
    redFlags: 'What gives it away:',
    whySafe: 'Why it looks safe:',
    scoreLine: ({ score, total, streak }) => `Score ${score} of ${total}. Streak ${streak}.`,
    next: 'Next message',
    seeScore: 'See my score',
    final: ({ score, total }) => `You got ${score} out of ${total}`,
    great: 'Great job! You know what to look for.',
    good: 'Good work. A few tricks got through, and now you know them.',
    keepGoing: 'Scams are tricky. Try again, and you will spot more each time.',
    bestStreak: ({ best }) => `Your best streak: ${best} in a row.`,
    share: 'Share my score',
    copyScore: 'Copy my score',
    shareText: ({ score, total }) =>
      `I scored ${score} out of ${total} on SafeCheck's "Spot the scam" practice. Can you beat me?`,
    again: 'Try again',
  },

  plan: {
    pageTitle: 'Family safety plan',
    title: 'Make a family safety plan',
    lead: 'A few minutes now can stop a scam later. Nothing you type here is sent or saved.',
    privacy: 'Everything stays on this device. Nothing is sent or saved.',
    start: 'Start',
    makeCard: 'Make my card',
    edit: 'Change my plan',
    intro: {
      title: 'What is a voice-cloning scam?',
      body: [
        'Scammers can now copy a voice using AI and a few seconds of audio from a video or voicemail.',
        'They call pretending to be a grandchild, child, or friend in trouble, and they sound real. They ask for money fast and tell you to keep it secret.',
        'A family code word is a simple way to know it is really them.',
      ],
      planTitle: 'Your plan will have:',
      planItems: [
        'A secret code word only your family knows',
        'The names and numbers of people to call back',
        'One simple rule everyone follows',
      ],
    },
    code: {
      title: 'Choose a code word',
      label: 'Your family code word',
      hint: 'A word or short phrase. Anyone calling about an emergency must say it.',
      error: 'Please choose a code word with at least 3 letters.',
      suggest: 'Suggest a code word',
      suggested: ({ word }) => `Suggested code word: ${word}.`,
      tipsTitle: 'Tips for a good code word',
      tips: [
        "Not something easy to guess, like a pet's name or birthday.",
        'Not something you have posted online.',
        'Easy for everyone in the family to remember.',
        'Tell family in person or on a call, not in a group chat.',
      ],
      words: {
        first: ['purple', 'sleepy', 'happy', 'silver', 'tiny', 'brave', 'frosty', 'golden', 'quiet', 'lucky'],
        second: ['pancake', 'giraffe', 'teapot', 'lighthouse', 'pickle', 'banjo', 'walrus', 'cactus', 'muffin', 'comet'],
      },
    },
    contacts: {
      title: 'Who should you call back?',
      lead: 'Add the people to call on a number you already know. You can leave these empty.',
      person: ({ n }) => `Person ${n}`,
      name: 'Name',
      phone: 'Phone number',
      add: 'Add another person',
      remove: ({ n }) => `Remove person ${n}`,
      removed: ({ n }) => `Person ${n} removed.`,
    },
    rule: {
      title: 'Choose your family rule',
      options: {
        both: {
          title: 'Ask for the code word, then call back',
          body: 'The safest choice. Ask for the code word, then hang up and call back on a number you know.',
          card: 'Ask for the code word. Then hang up and call back on a number we know.',
        },
        callBack: {
          title: 'Always hang up and call back',
          body: 'No matter who it sounds like, hang up and call them on a number you already have.',
          card: 'Always hang up and call back on a number we know.',
        },
        askCode: {
          title: 'Always ask for the code word',
          body: 'If they can\'t say the code word, it is not them.',
          card: "Always ask for the code word. If they can't say it, hang up.",
        },
      },
    },
    card: {
      ready: 'Your safety card is ready',
      readyBody: 'Print it and keep it somewhere private, like your wallet. Make one for each family member.',
      title: 'Our family safety plan',
      codeLabel: 'Code word',
      ruleLabel: 'Our rule',
      contactsLabel: 'People to call back',
      rememberLabel: 'Remember',
      remember: [
        "Real emergencies can wait 2 minutes for you to check.",
        'Never pay with gift cards, crypto, or wire transfers.',
        'Keep this card private. Never post the code word.',
      ],
      print: 'Print my card',
    },
    share: {
      heading: 'Share the plan with family',
      includeCode: 'Include the code word',
      includeCodeHint: 'Safest: leave this off and tell family the code word in person or on a call.',
      title: 'Our family safety plan',
      intro: 'If someone calls or texts about an emergency and asks for money:',
      codeInPerson: "Code word: I'll tell you in person.",
      footer: 'Made with SafeCheck. Real emergencies can wait 2 minutes for you to check.',
      copy: 'Copy the plan',
    },
  },

  how: {
    pageTitle: 'How it works',
    title: 'How SafeCheck works',
    lead: 'SafeCheck helps you decide if a message, link, or phone call is a scam, and tells you what to do next.',
    stepsTitle: 'Three simple steps',
    steps: [
      {
        title: 'You show us the message',
        body: 'Paste the words, add a screenshot, paste a link, or use a photo of a QR code.',
      },
      {
        title: 'We look for warning signs',
        body: 'SafeCheck uses AI to read messages, and checks links on your device. It looks for the tricks scammers use most.',
      },
      {
        title: 'You get a clear answer',
        body: 'You see "Likely a scam", "Be careful", or "Looks safe", the warning signs marked, and what to do next.',
      },
    ],
    modesTitle: 'Two ways to use it',
    modesNote: 'You can switch any time with "Simple" and "Quick" at the top of the page. Your message stays.',
    limitsTitle: "What SafeCheck can't do",
    limits: [
      'It can make mistakes. A scam can look normal, and a real message can look strange.',
      "It can't see who really sent a message. It never opens links, so it can't see the page behind one.",
      "It can't stop a scam or get money back. The steps we give you can help with that.",
    ],
    trustFeeling: 'If something feels wrong, trust that feeling.',
    trustFeelingBody: 'Ask someone you trust, or call the company using a number you already have.',
    privacyTitle: 'Your privacy',
    privacyBody:
      "Your message is sent only to check it. We don't save it, we don't keep a history, and there is no account. When you close this window, it's gone.",
    privacyRedact:
      'Before a message is sent, SafeCheck hides card numbers, Social Security numbers, bank numbers, codes, and passwords. Links and phone numbers stay, because they help spot scams. With a natural voice, the words being read aloud are sent to our voice service and not saved.',
    signsTitle: 'Common warning signs',
    signsLead: 'Scams change, but most use the same few tricks. Watch for these:',
    signs: [
      {
        title: 'A rush or a threat',
        body: '"Act now", "within 24 hours", or "your account will be closed". Scammers rush you so you don\'t stop to think.',
      },
      {
        title: 'Asking for gift cards, wire transfers, or crypto',
        body: 'Real companies, government offices, and family never ask you to pay this way.',
      },
      {
        title: 'Asking for passwords, codes, or personal details',
        body: 'Never share a code sent to your phone, your bank login, or your Social Security or Medicare number.',
      },
      {
        title: 'A link that looks almost right',
        body: 'Like "paypa1.com" or "usps-redelivery-help.com". Type the real website yourself instead.',
      },
      {
        title: '"Don\'t tell anyone"',
        body: 'Scammers ask you to keep it secret so nobody can warn you.',
      },
      {
        title: 'A family emergency from a new number',
        body: 'Call your family member on the number you already have. Voices can be faked with AI.',
      },
      {
        title: 'Jobs, deals, or prizes that cost money',
        body: "If you have to pay to get a job, a prize, or a brand deal, it isn't real.",
      },
      {
        title: '"I sent you money by mistake"',
        body: "Don't send it back yourself. Contact the payment app's support inside the app.",
      },
    ],
    helpTitle: 'Where to get help',
    help: [
      { label: 'Report a scam:', before: '', href: 'https://reportfraud.ftc.gov/', linkText: 'reportfraud.ftc.gov', after: '' },
      { label: 'Scam texts:', before: 'forward them to 7726 (it spells SPAM).', after: '' },
      {
        label: 'Talk to someone:',
        before: 'the free AARP Fraud Watch Network Helpline, ',
        href: 'tel:+18779083360',
        linkText: '877-908-3360',
        after: '.',
      },
      {
        label: 'If you shared personal details:',
        before: '',
        href: 'https://www.identitytheft.gov/',
        linkText: 'IdentityTheft.gov',
        after: ' gives you a step-by-step recovery plan.',
      },
      {
        label: 'Threats to share private photos:',
        before: 'you are not in trouble. ',
        href: 'https://takeitdown.ncmec.org/',
        linkText: 'Take It Down',
        after: ' helps remove images of people under 18.',
      },
    ],
  },

  notFound: {
    title: "We can't find that page",
    body: 'The link may be old or typed wrong.',
  },
};
