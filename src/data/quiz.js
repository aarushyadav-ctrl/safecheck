// "Spot the Scam" practice messages, for both older and younger people.
// Each has an English and a Spanish version. Names, numbers and links are made up.
export const QUIZ = [
  {
    id: 'medicare',
    answer: 'scam',
    en: {
      from: 'Text from +1 (888) 555-0137',
      text: 'Medicare: Your card will be cancelled TODAY. Call 1-888-555-0137 now to confirm your Medicare number and keep your benefits.',
      flags: [
        'A same-day deadline is meant to rush you.',
        'Medicare already has your number. It never texts to ask for it.',
      ],
    },
    es: {
      from: 'Mensaje de +1 (888) 555-0137',
      text: 'Medicare: Su tarjeta será cancelada HOY. Llame ahora al 1-888-555-0137 para confirmar su número de Medicare y mantener sus beneficios.',
      flags: [
        'Una fecha límite para hoy busca apurarle.',
        'Medicare ya tiene su número. Nunca lo pide por mensaje de texto.',
      ],
    },
  },
  {
    id: 'restaurant',
    answer: 'safe',
    en: {
      from: "Text from Rosa's Kitchen",
      text: "Hi! Your table for 4 at Rosa's Kitchen is confirmed for Friday at 7 PM. Reply C to cancel. See you then!",
      flags: [
        'It matches something you did (you booked a table).',
        'It asks for no money, no passwords, and has no link.',
      ],
    },
    es: {
      from: 'Mensaje de Rosa’s Kitchen',
      text: '¡Hola! Su mesa para 4 en Rosa’s Kitchen está confirmada para el viernes a las 7 PM. Responda C para cancelar. ¡Nos vemos!',
      flags: [
        'Coincide con algo que usted hizo (reservó una mesa).',
        'No pide dinero ni contraseñas, y no tiene enlace.',
      ],
    },
  },
  {
    id: 'steam',
    answer: 'scam',
    en: {
      from: 'Direct message from "Steam Support"',
      text: 'Your Steam account will be deleted in 24 hours for suspicious trades. Verify now: steamcommunlty-login.com',
      flags: [
        'Look closely: "communlty" uses an L instead of an i. It is a fake website.',
        'Real support does not threaten to delete your account in a DM.',
      ],
    },
    es: {
      from: 'Mensaje directo de "Soporte de Steam"',
      text: 'Tu cuenta de Steam será eliminada en 24 horas por intercambios sospechosos. Verifícala ahora: steamcommunlty-login.com',
      flags: [
        'Mira bien: "communlty" usa una L en lugar de una i. Es un sitio falso.',
        'El soporte real no amenaza con borrar tu cuenta por mensaje directo.',
      ],
    },
  },
  {
    id: 'tasks',
    answer: 'scam',
    en: {
      from: 'Text from a "recruiter"',
      text: "Hi! I'm a recruiter. Earn $500 a day just liking videos online. Pay a small $50 starter fee to unlock your tasks. Reply YES to begin!",
      flags: [
        'Huge pay for very easy work is a classic trick.',
        'Real jobs never charge you a fee to start.',
      ],
    },
    es: {
      from: 'Mensaje de un "reclutador"',
      text: '¡Hola! Soy reclutador. Gana $500 al día solo dando "me gusta" a videos. Paga una pequeña cuota de $50 para desbloquear tus tareas. ¡Responde SÍ para empezar!',
      flags: [
        'Mucho dinero por un trabajo muy fácil es un truco clásico.',
        'Los trabajos reales nunca te cobran para empezar.',
      ],
    },
  },
  {
    id: 'code',
    answer: 'safe',
    en: {
      from: 'Text from 32665, right after you signed in',
      text: "Your verification code is 482913. Don't share this code with anyone. If you didn't ask for it, you can ignore this message.",
      flags: [
        'It came right after you signed in yourself.',
        'It tells you NOT to share the code. The danger is when someone asks you for it.',
      ],
    },
    es: {
      from: 'Mensaje de 32665, justo después de que usted inició sesión',
      text: 'Su código de verificación es 482913. No comparta este código con nadie. Si no lo pidió, puede ignorar este mensaje.',
      flags: [
        'Llegó justo después de que usted mismo inició sesión.',
        'Le dice que NO comparta el código. El peligro es cuando alguien se lo pide.',
      ],
    },
  },
  {
    id: 'grandpa',
    answer: 'scam',
    en: {
      from: 'Text from an unknown number',
      text: "Hi Grandpa, it's Emma! I lost my phone so this is my new number. Can you send $300 by Zelle for a bus ticket home? Please don't tell Mom.",
      flags: [
        'A "new number" is how scammers pretend to be family.',
        '"Don\'t tell Mom" keeps you from checking. Call Emma on her old number.',
      ],
    },
    es: {
      from: 'Mensaje de un número desconocido',
      text: '¡Hola abuelo, soy Emma! Perdí mi teléfono y este es mi número nuevo. ¿Me puedes mandar $300 por Zelle para el boleto de autobús? Por favor no le digas a mamá.',
      flags: [
        'Un "número nuevo" es la forma en que los estafadores se hacen pasar por familia.',
        '"No le digas a mamá" evita que usted lo compruebe. Llame a Emma a su número de siempre.',
      ],
    },
  },
  {
    id: 'video',
    answer: 'scam',
    en: {
      from: 'Direct message from a friend\'s account',
      text: 'OMG is this you in this video?? instagram-video-check.com/watch',
      flags: [
        'Shock and curiosity get you to tap without thinking.',
        'The link is not instagram.com. It is a fake login page. Your friend\'s account may have been hacked.',
      ],
    },
    es: {
      from: 'Mensaje directo de la cuenta de un amigo',
      text: '¿¿Eres tú en este video?? instagram-video-check.com/watch',
      flags: [
        'La sorpresa y la curiosidad te hacen tocar sin pensar.',
        'El enlace no es instagram.com. Es una página falsa para robar tu cuenta. Quizás hackearon la cuenta de tu amigo.',
      ],
    },
  },
  {
    id: 'library',
    answer: 'safe',
    en: {
      from: 'Email from Lincoln Public Library',
      text: 'Reminder: "The Thursday Murder Club" is due back on Monday. You can renew at the front desk or in your library account.',
      flags: [
        'It is about something you really borrowed.',
        'It asks for nothing and does not rush you.',
      ],
    },
    es: {
      from: 'Correo de la Biblioteca Pública Lincoln',
      text: 'Recordatorio: "El Club del Crimen de los Jueves" se debe devolver el lunes. Puede renovarlo en el mostrador o en su cuenta de la biblioteca.',
      flags: [
        'Se trata de algo que usted de verdad pidió prestado.',
        'No le pide nada y no le apura.',
      ],
    },
  },
  {
    id: 'bike',
    answer: 'scam',
    en: {
      from: 'Message from a marketplace buyer',
      text: "I'll buy your bike for full price plus $100 for your trouble. I'll mail a check for $900. Just send the extra $500 back to my mover.",
      flags: [
        'Paying too much and asking for the extra back is the overpayment trick. The check will bounce.',
        'Never send money to a buyer or their "mover".',
      ],
    },
    es: {
      from: 'Mensaje de un comprador en un mercado en línea',
      text: 'Te compro la bici al precio completo más $100 por la molestia. Te envío un cheque de $900. Solo devuelve los $500 extra a mi transportista.',
      flags: [
        'Pagar de más y pedir que devuelvas el extra es el truco del sobrepago. El cheque será falso.',
        'Nunca envíes dinero a un comprador ni a su "transportista".',
      ],
    },
  },
  {
    id: 'soccer',
    answer: 'safe',
    en: {
      from: 'Text from Sam (saved in your contacts)',
      text: 'Hey, running about 10 minutes late to practice tomorrow. Can you save me a spot on the bench?',
      flags: [
        'It comes from a number you already know.',
        'It is an ordinary request with no money, link, or pressure.',
      ],
    },
    es: {
      from: 'Mensaje de Sam (guardado en tus contactos)',
      text: 'Oye, mañana llego unos 10 minutos tarde a la práctica. ¿Me guardas un lugar en la banca?',
      flags: [
        'Viene de un número que ya conoces.',
        'Es un pedido normal, sin dinero, sin enlace y sin presión.',
      ],
    },
  },
];
