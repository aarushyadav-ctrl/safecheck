// Texto en español para SafeCheck. Agrupado por pantalla.
// Lenguaje sencillo: frases cortas, nivel de lectura de sexto grado. Se usa "usted".

const plural = (n, one, many) => (n === 1 ? one : many);
const FTC = { href: 'https://reportfraud.ftc.gov/', label: 'Repórtelo a la FTC en reportfraud.ftc.gov' };

export default {
  common: {
    back: 'Atrás',
    backToResult: 'Volver a mi resultado',
    backToStart: 'Volver al inicio',
    done: 'Listo',
    nextStep: 'Siguiente paso',
    newTab: '(se abre en una pestaña nueva)',
    copied: 'Copiado. Puede pegarlo donde quiera.',
    copiedShort: 'Copiado',
  },

  list: {
    and: ({ items }) =>
      items.length <= 1 ? items[0] || '' : `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}`,
  },

  layout: {
    skip: 'Saltar al contenido principal',
    navLabel: 'Principal',
    howItWorks: 'Cómo funciona',
    settings: 'Ajustes',
    demoTitle: 'Modo de demostración.',
    demoBody: 'La revisión en vivo está apagada, así que los ejemplos muestran resultados ya escritos. La revisión de enlaces sí funciona.',
    footerPrivacy: 'SafeCheck no guarda sus mensajes.',
    footerMistakes: 'Puede equivocarse. Si tiene dudas, pregúntele a alguien de confianza.',
  },

  mode: {
    switchLabel: 'Elegir una vista',
    switched: ({ mode }) => `Modo ${mode} activado.`,
    simple: {
      name: 'Sencillo',
      desc: 'Un paso a la vez, con botones grandes y guía.',
      bestFor: 'Bueno si prefiere ir con calma.',
    },
    quick: {
      name: 'Rápido',
      desc: 'Todo en una pantalla. Pegue, revise, listo.',
      bestFor: 'Bueno si quiere una respuesta rápida.',
    },
  },

  chooser: {
    title: '¿Cómo quiere usar SafeCheck?',
    lead: 'Las dos formas revisan los mensajes igual. Elija la que le resulte más cómoda.',
    note: 'Puede cambiar cuando quiera con "Sencillo" y "Rápido" en la parte de arriba.',
  },

  home: {
    pageTitle: 'Revisar un mensaje',
    title: '¿No está seguro si un mensaje es una estafa?',
    titleSoft: 'Revisémoslo juntos.',
    lead: 'Muéstrenos el mensaje. Le diremos con palabras sencillas si parece una estafa y qué hacer después.',
    startHeading: '¿Qué quiere revisar?',
    options: {
      paste: { title: 'Pegar un mensaje', hint: 'Copie las palabras de un texto o correo.' },
      screenshot: { title: 'Subir una captura', hint: 'Use una foto del mensaje.' },
      link: { title: 'Revisar un enlace', hint: 'Vea a dónde lleva de verdad una dirección web.' },
      qr: { title: 'Escanear un código QR', hint: 'Use una foto del código.' },
    },
    call: {
      title: 'Alguien está hablando conmigo por teléfono ahora',
      hint: 'Reciba ayuda durante la llamada. No tiene que escribir nada.',
    },
    privacy: 'Su mensaje solo se usa para revisarlo. No lo guardamos.',
    toolsTitle: 'Más formas de protegerse',
    tools: {
      practice: { title: 'Practique cómo detectar estafas', hint: 'Una prueba corta con 10 mensajes.' },
      plan: { title: 'Haga un plan de seguridad familiar', hint: 'Elija una palabra clave para emergencias reales.' },
      how: { title: 'Cómo funciona', hint: 'Qué revisa SafeCheck y sus límites.' },
      settings: { title: 'Tamaño de letra y pantalla', hint: 'Letra más grande, alto contraste, idioma.' },
    },
    example: {
      caption: 'Esto es lo que verá: las señales de alerta, marcadas y explicadas.',
      from: 'Mensaje de +1 (202) 555-0147',
      sign1Title: 'Pide dinero.',
      sign1Body: 'El correo postal real no le manda mensajes para cobrarle.',
      sign2Title: 'Sitio web falso.',
      sign2Body: 'El real es usps.com, no este.',
    },
  },

  quick: {
    title: 'Revisión rápida',
    lead: 'Pegue un mensaje, agregue una captura o revise un enlace. La respuesta aparece aquí mismo.',
    shortcut: 'Atajo:',
    toolsLabel: 'Otras herramientas',
    tools: {
      call: '¿Está en una llamada ahora?',
      practice: 'Prueba de práctica',
      plan: 'Plan de seguridad familiar',
    },
    resultTitle: 'Resultado',
    empty: 'Su resultado aparecerá aquí.',
    copy: 'Copiar resumen',
    copied: 'Resumen copiado. Puede pegarlo donde quiera.',
    whatToDo: 'Qué hacer',
  },

  inputs: {
    what: '¿Qué quiere revisar?',
    kinds: { message: 'Un mensaje', link: 'Un enlace', qr: 'Un código QR' },
    optional: '(opcional)',
    message: {
      label: 'El mensaje',
      hint: 'Copie las palabras de su texto, correo o mensaje directo y péguelas aquí.',
      placeholder: 'Por ejemplo: Su cuenta está bloqueada. Toque este enlace para desbloquearla…',
    },
    sender: {
      label: '¿De quién dice que es?',
      hint: 'Por ejemplo: mi banco, una empresa de envíos, un reclutador o mi nieto.',
    },
    link: {
      label: 'El enlace',
      hint: 'Pegue la dirección web. SafeCheck nunca la abre.',
      placeholder: 'ejemplo.com/pagina',
    },
  },

  screenshot: {
    label: 'Captura de pantalla',
    optional: '(opcional si pegó las palabras)',
    hint: 'Una foto del mensaje desde su teléfono o computadora.',
    choose: 'Elegir una captura',
    adding: 'Agregando la captura…',
    drag: 'o arrastre una imagen aquí',
    replace: 'Cambiar la captura',
    remove: 'Quitar la captura',
    previewAlt: 'Su captura de pantalla',
    added: 'Captura agregada.',
    removed: 'Captura quitada.',
    privacy:
      'Su captura se envía para revisarla y no se guarda. No podemos ocultar datos privados dentro de las imágenes, así que recórtelos primero si puede.',
  },

  image: {
    errors: {
      notImage: 'Ese archivo no es una imagen. Elija una captura o una foto.',
      tooBig: 'Esa imagen es muy grande. Elija una de menos de 15 MB.',
      cantOpen: 'No pudimos abrir esa imagen. Pruebe con otra.',
    },
  },

  qr: {
    label: 'Foto del código QR',
    hint: 'Tome o elija una foto del código QR. Lo leemos en su dispositivo y nunca abrimos el enlace.',
    choose: 'Tomar o elegir una foto',
    chooseAgain: 'Usar otra foto',
    reading: 'Leyendo el código…',
    foundTitle: 'Encontramos este enlace en el código QR:',
    neverOpened: 'No lo hemos abierto. Toque "Revisar este enlace" para ver si es seguro.',
    foundLink: ({ link }) => `Código QR leído. Lleva a ${link}. Ahora toque "Revisar este enlace".`,
    foundText: 'Este código QR tiene palabras, no un enlace. Pusimos las palabras en el cuadro del mensaje.',
    errors: {
      notFound:
        'No encontramos un código QR en esa foto. Inténtelo de nuevo con el código llenando casi toda la foto, con buena luz y el teléfono quieto.',
      notImage: 'Ese archivo no es una imagen. Elija una foto del código QR.',
      tooBig: 'Esa foto es muy grande. Elija una de menos de 15 MB.',
      cantOpen: 'No pudimos abrir esa foto. Pruebe con otra.',
    },
  },

  examples: {
    title: '¿Quiere ver cómo funciona primero?',
    titleShort: 'Pruebe un ejemplo',
    hint: 'Pruebe uno de estos mensajes de ejemplo. Algunos son estafas que reciben los adultos mayores y otros, las personas jóvenes.',
  },

  samples: {
    bank: 'Alerta del banco',
    job: 'Oferta de trabajo remoto',
    package: 'Entrega de paquete',
    payment: 'Dinero enviado por error',
    grandchild: 'Nieto en problemas',
    marketplace: 'Comprador en línea',
    gaming: 'Aviso de cuenta de juegos',
    influencer: 'Mensaje de una marca',
    crypto: 'Inversión en cripto',
    sextortion: 'Amenaza con fotos',
    appointment: 'Recordatorio de cita',
    link: 'Enlace sospechoso',
  },

  check: {
    lead: 'Pegue el mensaje, agregue una captura o revise un enlace.',
    headings: {
      idle: 'Revisar un mensaje',
      loading: 'Revisando…',
      error: 'No pudimos terminar la revisión',
    },
    submit: 'Revisar este mensaje',
    submitLink: 'Revisar este enlace',
    tryAgain: 'Intentar de nuevo',
    change: 'Cambiar lo que envié',
    exampleLoaded: ({ label }) => `Ejemplo cargado: ${label}. Toque "Revisar" cuando esté listo.`,
    pastedPicture: 'Imagen agregada como su captura.',
    announceChecking: 'Revisando. Esto suele tardar unos segundos.',
    announceStopped: 'Revisión detenida. Lo que escribió sigue aquí.',
    errors: {
      empty: 'Primero pegue el mensaje o agregue una captura.',
      emptyLink: 'Primero pegue el enlace.',
      emptyQr: 'Primero agregue una foto del código QR.',
    },
  },

  analyzing: {
    phases: [
      'Mirando los enlaces…',
      'Buscando presión para actuar rápido…',
      'Buscando pedidos de dinero…',
      'Comparándolo con estafas comunes…',
    ],
    linkPhases: [
      'Buscando a dónde lleva de verdad el enlace…',
      'Buscando nombres parecidos…',
      'Comparándolo con sitios reales…',
    ],
    screenshot: 'Leyendo su captura…',
    note: 'Esto suele tardar unos segundos.',
    stop: 'Detener la revisión',
  },

  errors: {
    network: 'No pudimos conectar con SafeCheck. Revise su conexión a internet e inténtelo de nuevo.',
    timeout: 'La revisión tardó demasiado. Inténtelo de nuevo.',
    not_configured: 'La revisión en vivo aún no está activada, así que por ahora solo funcionan los ejemplos y la revisión de enlaces.',
    no_vision: 'La revisión de capturas aún no está lista. Pegue las palabras del mensaje en su lugar.',
    invalid_key: 'La revisión en vivo no funciona ahora. La persona que instaló SafeCheck debe revisar la clave de IA.',
    bad_model: 'La revisión en vivo no está bien configurada. La persona que instaló SafeCheck debe corregir el nombre del modelo de IA.',
    rate_limited: 'Se están revisando muchos mensajes ahora. Espere un minuto e inténtelo de nuevo.',
    too_many: 'Revisó muchos mensajes en poco tiempo. Espere un minuto e inténtelo de nuevo.',
    too_large: 'Esa captura es demasiado grande. Pruebe con una imagen más pequeña o pegue las palabras.',
    provider_down: 'El servicio de revisión no responde ahora. Inténtelo de nuevo en unos minutos.',
    bad_request: 'Algo salió mal al revisar. Inténtelo de nuevo.',
    bad_response: 'Recibimos una respuesta que no pudimos entender. Inténtelo de nuevo.',
    bad_input: 'Algo estaba mal con el mensaje. Inténtelo de nuevo.',
    empty: 'Primero pegue el mensaje, agregue una captura o escriba un enlace.',
    too_long: 'Ese mensaje es muy largo. Pegue solo la parte que le parece sospechosa.',
    link_too_long: 'Ese enlace es demasiado largo para revisarlo.',
    bad_image: 'No pudimos leer esa imagen. Pruebe con otra captura.',
  },

  verdict: {
    scam: 'Probablemente es una estafa',
    caution: 'Tenga cuidado',
    safe: 'Parece seguro',
  },

  confidence: {
    high: 'Estamos bastante seguros. Tiene señales que usan los estafadores.',
    medium: 'Estamos casi seguros, pero no del todo.',
    low: 'No estamos seguros. Tenga mucho cuidado.',
    safeHigh: 'No encontramos ninguna señal de alerta.',
    safeOther: 'No encontramos señales claras de alerta, pero algunas estafas parecen normales.',
  },

  results: {
    ourAnswer: 'Nuestra respuesta',
    announce: ({ verdict }) => `Resultado: ${verdict}.`,
    signsFound: ({ count }) =>
      count === 0
        ? 'No se encontraron señales de alerta.'
        : `Se ${plural(count, 'encontró', 'encontraron')} ${count} ${plural(count, 'señal', 'señales')} de alerta.`,
    signNumber: ({ n }) => `señal de alerta ${n}`,
    signsHeading: ({ count }) =>
      `${count} ${plural(count, 'señal', 'señales')} de alerta que ${plural(count, 'encontramos', 'encontramos')}`,
    signsHeadingNone: 'Señales de alerta',
    captionMessage: 'Su mensaje',
    captionScreenshot: 'Las palabras que leímos de su captura',
    captionMarked: ', con las señales de alerta marcadas',
    noSigns: 'No encontramos señales de alerta en este mensaje.',
    mistakes: 'SafeCheck puede equivocarse. Si algo le parece raro, confíe en esa sensación.',
    demoLabel: 'Resultado de demostración:',
    demoNote: 'esta respuesta se escribió con anticipación para este ejemplo (en inglés).',
    localLabel: 'Revisado en su dispositivo:',
    localNote: 'no se usó la IA en vivo, así que esta respuesta viene solo de nuestra revisión del enlace.',
    whatNow: '¿Qué debo hacer ahora?',
    alreadyClicked: 'Ya toqué un enlace o respondí',
    inShort: 'En resumen',
    moreOptions: 'Más opciones',
    askSomeone: 'Preguntarle a alguien de confianza',
    checkAnother: 'Revisar otro mensaje',
    noneTitle: 'Todavía no se ha revisado ningún mensaje',
    noneBody: 'Pegue un mensaje, agregue una captura o escriba un enlace, y lo revisaremos.',
    noneAction: 'Revisar un mensaje',
  },

  redact: {
    placeholder: {
      card: '[número de tarjeta oculto]',
      ssn: '[número de Seguro Social oculto]',
      routing: '[número de ruta oculto]',
      account: '[número de cuenta oculto]',
      code: '[código oculto]',
      password: '[contraseña oculta]',
    },
    names: {
      card: ({ count }) => (count === 1 ? 'un número de tarjeta' : `${count} números de tarjeta`),
      ssn: ({ count }) => (count === 1 ? 'un número de Seguro Social' : `${count} números de Seguro Social`),
      routing: ({ count }) => (count === 1 ? 'un número de ruta' : `${count} números de ruta`),
      account: ({ count }) => (count === 1 ? 'un número de cuenta' : `${count} números de cuenta`),
      code: ({ count }) => (count === 1 ? 'un código' : `${count} códigos`),
      password: ({ count }) => (count === 1 ? 'una contraseña o PIN' : `${count} contraseñas o PIN`),
    },
    summary: ({ total, list }) =>
      `Ocultamos ${total} ${plural(total, 'dato', 'datos')} antes de revisar: ${list}.`,
    show: 'Ver lo que enviamos',
    hide: 'Ocultar lo que enviamos',
  },

  link: {
    reportTitle: 'A dónde lleva de verdad este enlace',
    goesTo: 'Este enlace lleva al sitio web:',
    fullAddress: 'Dirección completa',
    explainParts: ({ sub, domain }) =>
      `La parte del principio ("${sub}") es solo una etiqueta. El sitio real es el nombre justo antes del final: ${domain}.`,
    neverOpened: 'SafeCheck nunca abre, carga ni muestra el enlace.',
    findingsTitle: 'Lo que notamos',
    noFindings: 'No encontramos señales de alerta en la dirección. Eso no prueba que el sitio sea seguro.',
    aiTitle: 'Lo que notó nuestra IA',
    realDestination: ({ domain }) => `El enlace lleva de verdad a: ${domain}`,
    readAloudDomain: ({ domain }) => `El enlace lleva de verdad a ${domain}.`,
    levels: { danger: 'Señal de alerta', warning: 'Tenga cuidado', good: 'Buena señal' },
    summary: {
      scam: ({ brand }) =>
        brand
          ? `Este enlace parece de ${brand}, pero lleva a otro sitio web.`
          : 'Este enlace tiene señales de alerta fuertes. No lo abra.',
      caution: 'Este enlace tiene algunas señales de alerta. No lo abra a menos que esté seguro de quién lo envió.',
      safe: ({ brand }) =>
        brand
          ? `Este enlace lleva al sitio real de ${brand}.`
          : 'No encontramos señales de alerta en este enlace. Ábralo solo si confía en quien lo envió.',
    },
    errors: {
      empty: 'Primero pegue el enlace.',
      invalid: 'Eso no parece una dirección web. Revise que copió el enlace completo.',
      notWeb: 'Eso no es un enlace a un sitio web. SafeCheck revisa enlaces que empiezan con http, https o el nombre de un sitio.',
    },
    findings: {
      atTrick: {
        title: 'El principio del enlace es un truco',
        body: ({ fake, real }) =>
          `Todo lo que está antes de la "@" se ignora. Muestra "${fake}", pero el enlace lleva de verdad a ${real}.`,
      },
      ip: {
        title: 'Números en lugar del nombre de un sitio',
        body: 'Las empresas reales usan nombres, no una fila de números. Esto oculta quién maneja el sitio.',
      },
      punycode: {
        title: 'Letras de otro alfabeto',
        body: ({ shown }) =>
          `Esta dirección se ve como "${shown}", pero algunas letras son de otro alfabeto. Se ven iguales pero llevan a otro sitio.`,
      },
      brandInFront: {
        title: ({ brand }) => `Usa "${brand}" como etiqueta al principio`,
        body: ({ brand, real, official }) =>
          `Esto no es ${brand}. El sitio real es ${real}. El sitio real de ${brand} es ${official}.`,
      },
      brandWords: {
        title: ({ brand }) => `Usa "${brand}" en un sitio que no es de ${brand}`,
        body: ({ brand, real, official }) =>
          `Los estafadores agregan palabras al nombre de una marca para engañarle. ${real} no es ${brand}. El real es ${official}.`,
      },
      lookalike: {
        title: ({ brand }) => `Parece "${brand}", pero tiene letras cambiadas`,
        body: ({ brand, official }) =>
          `Se cambiaron letras o números (como "1" por "l" o "0" por "o") para parecerse a ${brand}. El real es ${official}.`,
      },
      shortener: {
        title: 'Un enlace acortado oculta a dónde lleva',
        body: ({ domain }) =>
          `${domain} acorta los enlaces, así que no puede ver el sitio real antes de tocarlo.`,
      },
      http: {
        title: 'No es un enlace seguro',
        body: 'Empieza con "http://" sin la "s". Otras personas podrían ver lo que escriba.',
      },
      riskyTld: {
        title: ({ tld }) => `Terminación poco común: ${tld}`,
        body: 'Esta terminación es barata y la usan mucho los sitios de estafa. Las empresas reales casi no la usan.',
      },
      port: {
        title: 'Un número poco común en la dirección',
        body: ({ port }) => `El ":${port}" es raro en sitios web normales.`,
      },
      confusing: {
        title: 'Una dirección muy larga o confusa',
        body: 'Las direcciones largas con muchos puntos o guiones suelen hacerse para ocultar el sitio real.',
      },
      official: {
        title: ({ brand }) => `Este es el sitio real de ${brand}`,
        body: 'La dirección coincide con el sitio real. Aun así, tenga cuidado con lo que le pida hacer.',
      },
    },
  },

  summary: {
    warningSigns: 'Señales de alerta',
    whatToDo: 'Qué hacer',
  },

  speech: {
    read: 'Léamelo en voz alta',
    readStep: 'Léame este paso',
    stop: 'Dejar de leer',
    stopShort: 'Detener',
    loading: 'Preparando la voz…',
  },

  steps: {
    count: ({ n, total }) => `Paso ${n} de ${total}`,
    dontReply: {
      title: 'No responda ni toque ningún enlace',
      body: 'Responder le dice a los estafadores que su número funciona. Los enlaces pueden abrir sitios falsos que roban su información.',
    },
    noMoney: {
      title: 'No envíe dinero ni datos personales',
      body: 'Nunca comparta contraseñas, números de tarjeta ni códigos que le lleguen al teléfono. No pague con tarjetas de regalo, transferencias ni cripto.',
    },
    noGiftCards: {
      title: 'No compre tarjetas de regalo ni envíe dinero',
      body: 'Las emergencias familiares reales nunca se pagan con tarjetas de regalo. Solo los estafadores las piden.',
    },
    contact: {
      bank: {
        title: 'Llame usted mismo a su banco',
        body: 'Use el número que está detrás de su tarjeta o en su estado de cuenta. No use ningún número ni enlace del mensaje.',
      },
      delivery: {
        title: 'Revise su paquete de forma segura',
        body: 'Si espera un paquete, escriba usted mismo el sitio de la empresa, como usps.com, o llámelos. No use el enlace del mensaje.',
      },
      'family-emergency': {
        title: 'Llame usted mismo a su familiar',
        body: 'Llame a su nieto, o a sus padres, al número que ya tiene. También puede hacer una pregunta que solo la persona real sabría.',
      },
      government: {
        title: 'Comuníquese usted mismo con la agencia',
        body: 'Oficinas como el Seguro Social, Medicare y el IRS no piden dinero por texto ni correo. Llame al número de una carta que le hayan enviado.',
      },
      'tech-support': {
        title: 'No deje que nadie entre a su computadora',
        body: 'Las empresas reales no le contactan por problemas de su computadora. Si le preocupa, pídale a alguien de confianza que la revise.',
      },
      default: {
        title: 'Comuníquese usted mismo con la empresa real',
        body: 'Use un número en el que ya confía, como el de su tarjeta, factura o estado de cuenta. No use el número del mensaje.',
      },
    },
    block: {
      title: 'Bloquéelo y repórtelo',
      body: 'Reenvíe los textos de estafa al 7726 (SPAM en inglés). Reporte la estafa a la FTC. Luego bloquee al remitente y borre el mensaje.',
      links: [FTC],
    },
    link: [
      {
        title: 'No abra el enlace',
        body: 'No lo toque. Si ya lo abrió, no escriba contraseñas ni números de tarjeta en esa página.',
      },
      {
        title: 'Vaya usted mismo al sitio real',
        body: 'Escriba el nombre del sitio que conoce o use la aplicación oficial. Nunca use un enlace de un mensaje para iniciar sesión.',
      },
      {
        title: 'Bloquéelo y repórtelo',
        body: 'Reenvíe los textos de estafa al 7726 (SPAM en inglés). Reporte la estafa a la FTC y luego borre el mensaje.',
        links: [FTC],
      },
    ],
    byType: {
      job: [
        {
          title: 'No pague para empezar un trabajo',
          body: 'Los empleadores reales nunca le piden pagar equipo, capacitación ni "kits de inicio". Ellos le envían lo que necesita.',
        },
        {
          title: 'No envíe su identificación, datos bancarios ni Seguro Social',
          body: 'Compártalos solo después de comprobar que la empresa es real, normalmente después de una entrevista de verdad.',
        },
        {
          title: 'Revise usted mismo la empresa',
          body: 'Busque el sitio web propio de la empresa y contáctela ahí. Los reclutadores reales usan correos de la empresa.',
        },
        {
          title: 'Reporte la oferta',
          body: 'Repórtela en el sitio o la aplicación de empleo donde la vio, y a la FTC.',
          links: [FTC],
        },
      ],
      'payment-app': [
        {
          title: 'No devuelva el dinero usted mismo',
          body: 'El pago puede ser robado o falso y pueden quitárselo después. Entonces el dinero que usted envió se pierde.',
        },
        {
          title: 'Revise su saldo en la aplicación',
          body: 'Abra usted mismo la aplicación. Nunca confíe en una captura o un correo que dice que le pagaron.',
        },
        {
          title: 'Contacte al soporte de la aplicación',
          body: 'Si de verdad le llegó un pago, use la Ayuda dentro de la aplicación. Ellos pueden revertirlo de la forma correcta.',
        },
        {
          title: 'Bloquee y reporte la cuenta',
          body: 'Use el botón de reportar en la aplicación y repórtelo a la FTC.',
          links: [FTC],
        },
      ],
      marketplace: [
        {
          title: 'Cobre solo dentro de la aplicación, o en efectivo en persona',
          body: 'Nunca acepte cheques, "cuotas de mejora" ni pagos que digan que primero debe hacer algo.',
        },
        {
          title: 'Nunca pague una cuota para recibir dinero',
          body: 'Las aplicaciones de pago no cobran a los vendedores para "desbloquear" o "mejorar" un pago.',
        },
        {
          title: 'No use el transportista ni la etiqueta del comprador',
          body: 'Los transportistas y etiquetas falsos permiten que los estafadores se lleven su artículo sin pagar.',
        },
        {
          title: 'Reporte y bloquee al comprador',
          body: 'Use el botón de reportar en la aplicación del mercado.',
          links: [FTC],
        },
      ],
      gaming: [
        {
          title: 'No inicie sesión desde el enlace',
          body: 'Los moderadores y el soporte reales nunca le piden "verificar" su cuenta por mensaje directo.',
        },
        {
          title: 'Si ya inició sesión, cambie su contraseña ahora',
          body: 'Abra usted mismo la aplicación o el sitio oficial. Cambie su contraseña y active el inicio de sesión en 2 pasos.',
        },
        {
          title: 'No intercambie artículos ni comparta códigos',
          body: 'Nunca comparta códigos de acceso ni intercambie artículos para "probar" que su cuenta es segura.',
        },
        {
          title: 'Reporte la cuenta',
          body: 'Use el botón de reportar en el juego o en Discord, y luego bloquee la cuenta.',
        },
      ],
      influencer: [
        {
          title: 'No pague para ganar ni para trabajar con una marca',
          body: 'Las marcas reales le pagan a usted. Nunca le piden pagar el envío ni una cuota.',
        },
        {
          title: 'Revise la cuenta real de la marca',
          body: 'Busque usted mismo la marca. Las colaboraciones reales vienen de cuentas verificadas o correos de la empresa.',
        },
        {
          title: 'No comparta sus datos',
          body: 'Nunca envíe su dirección, identificación ni número de tarjeta para reclamar un "premio" o un trato.',
        },
        {
          title: 'Reporte y bloquee la cuenta',
          body: 'Use el botón de reportar en la aplicación.',
        },
      ],
      crypto: [
        {
          title: 'No envíe cripto ni dinero',
          body: 'Los pagos en cripto casi nunca se pueden recuperar una vez enviados.',
        },
        {
          title: 'Deje de responder',
          body: 'Nadie puede prometer ganancias grandes, rápidas o seguras. Esa promesa es la estafa.',
        },
        {
          title: 'Si ya envió dinero, actúe ahora',
          body: 'Contacte de inmediato a la aplicación o plataforma que usó. Guarde capturas de todo.',
        },
        {
          title: 'Repórtelo',
          body: 'Repórtelo a la FTC y al FBI en ic3.gov.',
          links: [FTC, { href: 'https://www.ic3.gov/', label: 'Repórtelo al FBI en ic3.gov' }],
        },
      ],
      sextortion: [
        {
          title: 'Usted no está en problemas',
          body: 'Esto le pasa a muchas personas. Quien le escribe quiere asustarle. Hizo lo correcto al revisarlo.',
        },
        {
          title: 'No pague ni envíe nada',
          body: 'Pagar casi nunca hace que se detenga. Normalmente piden más.',
        },
        {
          title: 'Guarde los mensajes y luego bloquee',
          body: 'Tome capturas de los mensajes y del nombre de la cuenta. No los borre, ayudan con los reportes. Luego bloquee la cuenta.',
        },
        {
          title: 'Cuénteselo a un adulto de confianza',
          body: 'Un padre o madre, un familiar, un maestro o un consejero puede ayudarle. No tiene que enfrentar esto solo.',
        },
        {
          title: 'Repórtelo',
          body: 'Take It Down puede ayudar a quitar imágenes de personas menores de 18 años. La CyberTipline también recibe reportes. Si tiene 18 años o más, también puede reportarlo al FBI.',
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
        title: 'Parece bien leerlo',
        body: 'No encontramos señales de alerta. Puede tratarlo como un mensaje normal.',
      },
      {
        title: 'Manténgase alerta',
        body: 'Si después le pide dinero, contraseñas o un código, deténgase y revíselo de nuevo.',
      },
      {
        title: 'Si tiene dudas, compruébelo usted mismo',
        body: 'Llame a la persona o a la empresa a un número que ya tenga.',
      },
    ],
    recovery: [
      {
        title: 'Deténgase. No comparta nada más',
        body: 'Cierre el sitio web. No responda el mensaje ni conteste llamadas sobre esto.',
      },
      {
        title: 'Cambie sus contraseñas',
        body: 'Si escribió una contraseña, cámbiela ahora. Empiece por su correo y su banco. Use una contraseña nueva que no use en ningún otro lugar.',
      },
      {
        title: 'Llame a su banco',
        body: 'Si compartió datos de su tarjeta o banco, o envió dinero, llame a su banco ahora. Use el número de su tarjeta. Pídales detener los pagos o enviarle una tarjeta nueva.',
      },
      {
        title: 'Vigile sus cuentas',
        body: 'Durante las próximas semanas, revise los estados de cuenta de su banco y su tarjeta. Avísele a su banco de cualquier cargo que no reconozca.',
      },
      {
        title: 'Repórtelo',
        body: 'Reporte la estafa a la FTC. Si compartió su número de Seguro Social, IdentityTheft.gov le dará un plan de recuperación paso a paso.',
        links: [FTC, { href: 'https://www.identitytheft.gov/', label: 'Obtenga un plan de recuperación en IdentityTheft.gov' }],
      },
    ],
  },

  nextSteps: {
    title: '¿Qué debo hacer ahora?',
    titleClicked: 'Si ya tocó un enlace o respondió',
    lead: 'Vamos paso a paso. Tómese el tiempo que necesite.',
    leadClicked: 'No se preocupe. Actuar rápido ayuda mucho. Vamos paso a paso.',
    switchClicked: 'Ya toqué un enlace, respondí o compartí información',
    notClicked: 'No toqué ni respondí nada',
    doneTitle: 'Ya terminó',
    doneBody: 'Hizo lo correcto al revisar primero. Esto es lo que hizo:',
    again: 'Repasar los pasos otra vez',
  },

  ask: {
    title: 'Preguntarle a alguien de confianza',
    lead: 'Siempre está bien pedir una segunda opinión. Escribimos una nota corta para un familiar o amigo. Puede cambiar las palabras primero.',
    noResult: 'Primero revise un mensaje. Después escribiremos una nota corta para enviarla a un familiar o amigo.',
    noteLabel: 'Su nota',
    noteHint: 'Las direcciones web se cambian un poco, como ejemplo[.]com, para que nadie toque un enlace de estafa por accidente.',
    how: '¿Cómo quiere enviarla?',
    share: 'Compartir',
    sms: 'Enviar como mensaje de texto',
    email: 'Enviar como correo',
    copy: 'Copiar la nota',
    copied: 'Nota copiada. Puede pegarla en un mensaje de texto o un correo.',
    call: 'También puede simplemente llamarles y leerles el mensaje.',
    subject: '¿Me ayudas a revisar un mensaje?',
  },

  share: {
    note: {
      hello: 'Hola, ¿me ayudas a revisar un mensaje que recibí?',
      says: ({ verdict }) => `SafeCheck dice: ${verdict}.`,
      signs: 'Señales de alerta que encontró:',
      from: ({ sender }) => `Dice que es de: ${sender}`,
      message: 'El mensaje:',
      link: 'El enlace:',
      linkGoesTo: ({ domain }) => `En realidad lleva a: ${domain}`,
      callMe: '¿Me llamas cuando veas esto? ¡Gracias!',
    },
  },

  settings: {
    title: 'Ajustes',
    close: 'Cerrar ajustes',
    intro: 'Los cambios se aplican de inmediato y se mantienen mientras esta ventana esté abierta.',
    language: 'Idioma',
    languageChanged: 'Idioma: español.',
    textSize: 'Tamaño de letra',
    sizes: { standard: 'Normal', large: 'Grande', largest: 'Muy grande' },
    textSizeChanged: ({ size }) => `Tamaño de letra: ${size}.`,
    contrast: 'Alto contraste',
    contrastHint: 'Texto negro sobre blanco con líneas más marcadas.',
    motion: 'Reducir movimiento',
    motionHint: 'Apaga los efectos de movimiento y deslizamiento.',
    motionDevice: 'Su dispositivo ya pide menos movimiento, así que SafeCheck también usa menos.',
    on: 'Sí',
    off: 'No',
    voice: 'Voz',
    voices: { hannah: 'Hannah (natural, en inglés)', troy: 'Troy (natural, en inglés)', device: 'La voz de este dispositivo' },
    voiceHint:
      'Las voces naturales suenan como una persona real. Necesitan internet, y las palabras que se leen se envían a nuestro servicio de voz. No se guarda nada.',
    voiceSpanish: 'Las voces naturales solo hablan inglés, así que en español se usa la voz de este dispositivo.',
    voiceUnavailable: 'Las voces naturales no están disponibles ahora, así que SafeCheck usa la voz de este dispositivo.',
    speed: 'Velocidad de lectura',
    speedHint: 'Qué tan rápido habla "Léamelo en voz alta".',
    speeds: { slow: 'Lenta', normal: 'Normal', fast: 'Rápida' },
    hearSample: 'Escuchar un ejemplo',
    sampleSpeech: 'Así de rápido le leerá SafeCheck.',
    done: 'Listo',
    reset: 'Volver a lo normal',
    resetDone: 'Ajustes restablecidos.',
  },

  call: {
    pageTitle: 'Ayuda durante una llamada',
    title: 'Alguien está hablando conmigo por teléfono ahora',
    lead: 'Toque todo lo que la persona le está pidiendo o diciendo. Recibirá una respuesta al instante. No tiene que escribir nada.',
    question: '¿Qué le está pidiendo o diciendo la persona?',
    hint: 'Elija todas las que correspondan.',
    clear: 'Borrar mis opciones',
    options: [
      {
        id: 'giftCards',
        warning: true,
        label: 'Comprar tarjetas de regalo o criptomonedas',
        why: 'Ninguna empresa real, oficina de gobierno ni familiar pide que le paguen con tarjetas de regalo o cripto.',
      },
      {
        id: 'wire',
        warning: true,
        label: 'Enviar dinero por transferencia o una aplicación de pago',
        why: 'Este dinero es muy difícil de recuperar. Por eso lo piden los estafadores.',
      },
      {
        id: 'code',
        warning: true,
        label: 'Leerles un código que me llegó al teléfono',
        why: 'Ese código es la llave de su cuenta. Las empresas reales nunca le piden que se lo lea.',
      },
      {
        id: 'remote',
        warning: true,
        label: 'Dejarles entrar a mi computadora o instalar una aplicación',
        why: 'Una vez dentro, pueden ver sus cuentas y contraseñas.',
      },
      {
        id: 'secret',
        warning: true,
        label: 'Que lo mantenga en secreto o que no cuelgue',
        why: 'Los estafadores le quieren solo para que nadie le advierta. Siempre está bien colgar y preguntarle a alguien.',
      },
      {
        id: 'arrest',
        warning: true,
        label: 'Que debo dinero y me van a arrestar o multar',
        why: 'La policía y las oficinas de gobierno no llaman para exigir pagos ni amenazar con arrestos.',
      },
      {
        id: 'family',
        warning: true,
        label: 'Un familiar está en problemas y necesita dinero',
        why: 'Los estafadores se hacen pasar por familiares e incluso pueden copiar voces con IA. Llame a su familiar al número que conoce.',
      },
      {
        id: 'moveMoney',
        warning: true,
        label: 'Hackearon mi cuenta y debo mover mi dinero',
        why: 'Su banco nunca le pedirá mover dinero a una "cuenta segura". Esa cuenta es del estafador.',
      },
      {
        id: 'prize',
        warning: true,
        label: 'Gané un premio pero debo pagar para recibirlo',
        why: 'Los premios reales son gratis. Si tiene que pagar, no es un premio.',
      },
      {
        id: 'appointment',
        warning: false,
        label: 'Confirmar una cita o entrega que yo esperaba',
        why: '',
      },
      {
        id: 'survey',
        warning: false,
        label: 'Hacer preguntas de una encuesta, sin pedir dinero ni datos',
        why: '',
      },
    ],
    resultTitle: 'Su respuesta',
    pickPrompt: 'Elija lo que la persona le está pidiendo y su respuesta aparecerá aquí.',
    anytime: 'Siempre puede colgar. Nunca es de mala educación protegerse.',
    answerLabel: 'Nuestra respuesta',
    scamTitle: 'Cuelgue. Casi seguro es una estafa.',
    scamBody: 'Las empresas reales, las oficinas de gobierno y los familiares no piden esto por teléfono.',
    okTitle: 'Nada de lo que eligió es una señal común de estafa',
    okBody: 'Es una buena señal. Pero si algo le parece raro, igual puede colgar y devolver la llamada a un número en el que confía.',
    whyTitle: 'Por qué son señales de alerta',
    scriptTitle: 'Diga esto y luego cuelgue',
    script: 'Yo no hago esto por teléfono. Voy a colgar y llamaré al número oficial. Adiós.',
    scriptOk: 'Prefiero devolverle la llamada. Usaré el número de su sitio web o de mi estado de cuenta. Gracias.',
    afterTitle: 'Después de colgar',
    after: {
      base: [
        'Devuelva la llamada a un número en el que confía: el de su tarjeta, un estado de cuenta o el sitio real de la empresa. Nunca al número que le dieron.',
        'Cuéntele a alguien de confianza lo que pasó.',
        'Reporte la llamada a la FTC.',
      ],
      ok: [
        'Si quiere estar seguro, devuelva la llamada a un número que ya tenga.',
        'No dé códigos, contraseñas ni números de tarjeta, aunque la llamada parezca normal.',
      ],
      extra: {
        giftCards: 'Si ya compró tarjetas de regalo, llame de inmediato a la empresa que aparece en la tarjeta y guarde el recibo.',
        wire: 'Si ya envió dinero, llame de inmediato a su banco o a la aplicación de pago.',
        code: 'Si les dio un código, entre usted mismo a esa cuenta ahora y cambie su contraseña.',
        remote: 'Si entraron a su computadora, apáguela y pídale ayuda a alguien de confianza antes de volver a usarla.',
        family: 'Llame a su familiar al número que ya tiene.',
        moveMoney: 'Llame a su banco al número de su tarjeta y cuénteles sobre la llamada.',
      },
    },
    reportLink: 'Reporte la llamada en reportfraud.ftc.gov',
    announceScam: ({ count }) =>
      `Respuesta: cuelgue, casi seguro es una estafa. ${count} ${plural(count, 'señal', 'señales')} de alerta.`,
    announceOk: 'Respuesta: nada de lo que eligió es una señal común de estafa.',
    announceNone: 'Opciones borradas.',
  },

  practice: {
    pageTitle: 'Practique cómo detectar estafas',
    title: 'Detecte la estafa',
    lead: 'Mire cada mensaje y decida: ¿estafa o seguro? Luego vea qué lo delata.',
    scoreShort: ({ score, total }) => `Puntos: ${score} de ${total}`,
    streakShort: ({ streak }) => `Racha: ${streak}`,
    count: ({ n, total }) => `Mensaje ${n} de ${total}`,
    question: '¿Es una estafa o es seguro?',
    answerLabel: 'Su respuesta',
    choose: { scam: 'Estafa', safe: 'Seguro' },
    right: '¡Correcto!',
    wrong: 'No exactamente.',
    itWas: { scam: 'Este mensaje es una estafa.', safe: 'Este mensaje es seguro.' },
    redFlags: 'Lo que lo delata:',
    whySafe: 'Por qué parece seguro:',
    scoreLine: ({ score, total, streak }) => `Puntos: ${score} de ${total}. Racha: ${streak}.`,
    next: 'Siguiente mensaje',
    seeScore: 'Ver mis puntos',
    final: ({ score, total }) => `Acertó ${score} de ${total}`,
    great: '¡Muy bien! Usted sabe qué buscar.',
    good: 'Buen trabajo. Algunos trucos se colaron, y ahora ya los conoce.',
    keepGoing: 'Las estafas son engañosas. Inténtelo de nuevo y cada vez detectará más.',
    bestStreak: ({ best }) => `Su mejor racha: ${best} seguidas.`,
    share: 'Compartir mis puntos',
    copyScore: 'Copiar mis puntos',
    shareText: ({ score, total }) =>
      `Acerté ${score} de ${total} en la práctica "Detecte la estafa" de SafeCheck. ¿Puedes superarme?`,
    again: 'Intentar de nuevo',
  },

  plan: {
    pageTitle: 'Plan de seguridad familiar',
    title: 'Haga un plan de seguridad familiar',
    lead: 'Unos minutos ahora pueden evitar una estafa después. Nada de lo que escriba aquí se envía ni se guarda.',
    privacy: 'Todo se queda en este dispositivo. Nada se envía ni se guarda.',
    start: 'Empezar',
    makeCard: 'Hacer mi tarjeta',
    edit: 'Cambiar mi plan',
    intro: {
      title: '¿Qué es una estafa con voz clonada?',
      body: [
        'Ahora los estafadores pueden copiar una voz con IA usando unos segundos de audio de un video o un mensaje de voz.',
        'Llaman haciéndose pasar por un nieto, un hijo o un amigo en problemas, y suenan reales. Piden dinero rápido y le dicen que lo mantenga en secreto.',
        'Una palabra clave familiar es una forma sencilla de saber que de verdad son ellos.',
      ],
      planTitle: 'Su plan tendrá:',
      planItems: [
        'Una palabra clave secreta que solo su familia conoce',
        'Los nombres y números de las personas a quienes devolver la llamada',
        'Una regla sencilla que todos siguen',
      ],
    },
    code: {
      title: 'Elija una palabra clave',
      label: 'Su palabra clave familiar',
      hint: 'Una palabra o frase corta. Quien llame por una emergencia debe decirla.',
      error: 'Elija una palabra clave de al menos 3 letras.',
      suggest: 'Sugerir una palabra clave',
      suggested: ({ word }) => `Palabra clave sugerida: ${word}.`,
      tipsTitle: 'Consejos para una buena palabra clave',
      tips: [
        'Que no sea fácil de adivinar, como el nombre de una mascota o un cumpleaños.',
        'Que no la haya publicado en internet.',
        'Fácil de recordar para toda la familia.',
        'Dígasela a la familia en persona o por teléfono, no en un chat de grupo.',
      ],
      words: {
        first: ['panqueque', 'jirafa', 'tetera', 'faro', 'pepino', 'banjo', 'morsa', 'cactus', 'cometa', 'mango'],
        second: ['morado', 'dormilón', 'feliz', 'plateado', 'chiquito', 'valiente', 'helado', 'dorado', 'tranquilo', 'suertudo'],
      },
    },
    contacts: {
      title: '¿A quién debe devolver la llamada?',
      lead: 'Agregue a las personas a quienes llamar a un número que ya conoce. Puede dejar esto vacío.',
      person: ({ n }) => `Persona ${n}`,
      name: 'Nombre',
      phone: 'Número de teléfono',
      add: 'Agregar otra persona',
      remove: ({ n }) => `Quitar a la persona ${n}`,
      removed: ({ n }) => `Persona ${n} quitada.`,
    },
    rule: {
      title: 'Elija la regla de su familia',
      options: {
        both: {
          title: 'Pedir la palabra clave y luego devolver la llamada',
          body: 'La opción más segura. Pida la palabra clave, luego cuelgue y llame a un número que conoce.',
          card: 'Pedir la palabra clave. Luego colgar y llamar a un número que conocemos.',
        },
        callBack: {
          title: 'Siempre colgar y devolver la llamada',
          body: 'No importa a quién se parezca la voz: cuelgue y llámele a un número que ya tiene.',
          card: 'Siempre colgar y llamar a un número que conocemos.',
        },
        askCode: {
          title: 'Siempre pedir la palabra clave',
          body: 'Si no puede decir la palabra clave, no es esa persona.',
          card: 'Siempre pedir la palabra clave. Si no la sabe, colgar.',
        },
      },
    },
    card: {
      ready: 'Su tarjeta de seguridad está lista',
      readyBody: 'Imprímala y guárdela en un lugar privado, como su cartera. Haga una para cada familiar.',
      title: 'Nuestro plan de seguridad familiar',
      codeLabel: 'Palabra clave',
      ruleLabel: 'Nuestra regla',
      contactsLabel: 'Personas a quienes devolver la llamada',
      rememberLabel: 'Recuerde',
      remember: [
        'Las emergencias reales pueden esperar 2 minutos a que usted lo compruebe.',
        'Nunca pague con tarjetas de regalo, cripto ni transferencias.',
        'Mantenga esta tarjeta en privado. Nunca publique la palabra clave.',
      ],
      print: 'Imprimir mi tarjeta',
    },
    share: {
      heading: 'Compartir el plan con la familia',
      includeCode: 'Incluir la palabra clave',
      includeCodeHint: 'Lo más seguro: déjelo apagado y dígale la palabra clave a su familia en persona o por teléfono.',
      title: 'Nuestro plan de seguridad familiar',
      intro: 'Si alguien llama o escribe por una emergencia y pide dinero:',
      codeInPerson: 'Palabra clave: te la digo en persona.',
      footer: 'Hecho con SafeCheck. Las emergencias reales pueden esperar 2 minutos a que lo compruebes.',
      copy: 'Copiar el plan',
    },
  },

  how: {
    pageTitle: 'Cómo funciona',
    title: 'Cómo funciona SafeCheck',
    lead: 'SafeCheck le ayuda a decidir si un mensaje, un enlace o una llamada es una estafa, y le dice qué hacer después.',
    stepsTitle: 'Tres pasos sencillos',
    steps: [
      {
        title: 'Usted nos muestra el mensaje',
        body: 'Pegue las palabras, agregue una captura, pegue un enlace o use una foto de un código QR.',
      },
      {
        title: 'Buscamos señales de alerta',
        body: 'SafeCheck usa IA para leer los mensajes y revisa los enlaces en su dispositivo. Busca los trucos que más usan los estafadores.',
      },
      {
        title: 'Recibe una respuesta clara',
        body: 'Verá "Probablemente es una estafa", "Tenga cuidado" o "Parece seguro", las señales de alerta marcadas y qué hacer después.',
      },
    ],
    modesTitle: 'Dos formas de usarlo',
    modesNote: 'Puede cambiar cuando quiera con "Sencillo" y "Rápido" en la parte de arriba. Su mensaje se queda.',
    limitsTitle: 'Lo que SafeCheck no puede hacer',
    limits: [
      'Puede equivocarse. Una estafa puede parecer normal y un mensaje real puede parecer raro.',
      'No puede ver quién envió de verdad un mensaje. Nunca abre los enlaces, así que no puede ver la página detrás.',
      'No puede detener una estafa ni recuperar dinero. Los pasos que le damos pueden ayudar con eso.',
    ],
    trustFeeling: 'Si algo le parece raro, confíe en esa sensación.',
    trustFeelingBody: 'Pregúntele a alguien de confianza o llame a la empresa a un número que ya tenga.',
    privacyTitle: 'Su privacidad',
    privacyBody:
      'Su mensaje se envía solo para revisarlo. No lo guardamos, no hay historial y no hay cuenta. Cuando cierra esta ventana, desaparece.',
    privacyRedact:
      'Antes de enviar un mensaje, SafeCheck oculta números de tarjeta, de Seguro Social, de banco, códigos y contraseñas. Los enlaces y los números de teléfono se quedan, porque ayudan a detectar estafas. Con una voz natural, las palabras que se leen en voz alta se envían a nuestro servicio de voz y no se guardan.',
    signsTitle: 'Señales de alerta comunes',
    signsLead: 'Las estafas cambian, pero la mayoría usa los mismos trucos. Esté atento a esto:',
    signs: [
      {
        title: 'Prisa o amenazas',
        body: '"Actúe ahora", "en 24 horas" o "su cuenta será cerrada". Los estafadores le apuran para que no se detenga a pensar.',
      },
      {
        title: 'Piden tarjetas de regalo, transferencias o cripto',
        body: 'Las empresas reales, las oficinas de gobierno y la familia nunca le piden pagar así.',
      },
      {
        title: 'Piden contraseñas, códigos o datos personales',
        body: 'Nunca comparta un código que le llegó al teléfono, el acceso a su banco ni su número de Seguro Social o de Medicare.',
      },
      {
        title: 'Un enlace que parece casi correcto',
        body: 'Como "paypa1.com" o "usps-redelivery-help.com". Mejor escriba usted mismo el sitio real.',
      },
      {
        title: '"No le digas a nadie"',
        body: 'Los estafadores le piden guardar el secreto para que nadie le advierta.',
      },
      {
        title: 'Una emergencia familiar desde un número nuevo',
        body: 'Llame a su familiar al número que ya tiene. Las voces se pueden falsificar con IA.',
      },
      {
        title: 'Trabajos, tratos o premios que cuestan dinero',
        body: 'Si tiene que pagar para recibir un trabajo, un premio o un trato con una marca, no es real.',
      },
      {
        title: '"Te envié dinero por error"',
        body: 'No lo devuelva usted mismo. Contacte al soporte dentro de la aplicación de pago.',
      },
    ],
    helpTitle: 'Dónde pedir ayuda',
    help: [
      { label: 'Reportar una estafa:', before: '', href: 'https://reportfraud.ftc.gov/', linkText: 'reportfraud.ftc.gov', after: '' },
      { label: 'Textos de estafa:', before: 'reenvíelos al 7726 (SPAM en inglés).', after: '' },
      {
        label: 'Hablar con alguien:',
        before: 'la línea gratuita de AARP Fraud Watch Network (en inglés), ',
        href: 'tel:+18779083360',
        linkText: '877-908-3360',
        after: '.',
      },
      {
        label: 'Si compartió datos personales:',
        before: '',
        href: 'https://www.identitytheft.gov/',
        linkText: 'IdentityTheft.gov',
        after: ' le da un plan de recuperación paso a paso.',
      },
      {
        label: 'Amenazas de compartir fotos privadas:',
        before: 'usted no está en problemas. ',
        href: 'https://takeitdown.ncmec.org/',
        linkText: 'Take It Down',
        after: ' ayuda a quitar imágenes de personas menores de 18 años.',
      },
    ],
  },

  notFound: {
    title: 'No encontramos esa página',
    body: 'El enlace puede ser viejo o estar mal escrito.',
  },
};
