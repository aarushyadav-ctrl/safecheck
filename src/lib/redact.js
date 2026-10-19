/*
  Hides private details in the browser, before a message is sent to be checked:
  card numbers (checked with the Luhn formula), Social Security numbers, bank
  account and routing numbers, one-time codes, and passwords or PINs.
  Links, sender names, and phone numbers are kept, because they are needed to
  spot a scam.
*/

export const REDACTION_TYPES = ['card', 'ssn', 'routing', 'account', 'code', 'password'];

// Luhn check: real card numbers pass it, random digit runs usually don't.
export function passesLuhn(digits) {
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = Number(digits[i]);
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }
  return sum % 10 === 0;
}

/**
 * @param text the message
 * @param placeholder (type) => the words to put in its place, e.g. "[card number hidden]"
 * @returns {{ text: string, items: { type: string }[] }}
 */
export function redact(text, placeholder) {
  const items = [];
  const hide = (type) => {
    items.push({ type });
    return placeholder(type);
  };
  // Set web addresses aside first, so nothing inside a link is ever changed.
  const links = [];
  let out = String(text || '').replace(
    /\b(?:https?:\/\/|www\.)\S+|\b[a-z0-9-]+(?:\.[a-z0-9-]+)+\/\S*/gi,
    (m) => `\u0000${links.push(m) - 1}\u0000`,
  );

  // Card numbers: 13 to 19 digits, with optional spaces or dashes, that pass Luhn.
  out = out.replace(/\b(?:\d[ -]?){12,18}\d\b/g, (m) => {
    const digits = m.replace(/\D/g, '');
    return digits.length >= 13 && digits.length <= 19 && passesLuhn(digits) ? hide('card') : m;
  });

  // Social Security numbers: 123-45-6789 or 123 45 6789, or 9 digits after the words.
  out = out.replace(/\b\d{3}[- ]\d{2}[- ]\d{4}\b/g, () => hide('ssn'));
  out = out.replace(
    /\b(SSN|social security(?: number| no\.?)?|seguro social)(\D{0,15}?)(\d{9})\b/gi,
    (m, word, between) => `${word}${between}${hide('ssn')}`,
  );

  // Routing numbers (9 digits) and account numbers (6 to 17 digits) after those words.
  out = out.replace(
    /\b(routing(?: number| no\.?| #)?|ABA|n[uú]mero de ruta)(\D{0,15}?)(\d{9})\b/gi,
    (m, word, between) => `${word}${between}${hide('routing')}`,
  );
  out = out.replace(
    /\b(account(?: number| no\.?| #)?|acct\.?(?: #)?|cuenta)(\D{0,15}?)(\d{6,17})\b/gi,
    (m, word, between) => `${word}${between}${hide('account')}`,
  );

  // One-time codes: "code: 482913", "verification code is 4829", "482913 is your code".
  out = out.replace(
    /\b(code|passcode|OTP|c[oó]digo)(\D{0,25}?)(\d{4,8})\b/gi,
    (m, word, between) => `${word}${between}${hide('code')}`,
  );
  out = out.replace(
    /\b(\d{4,8})(?=\s+(?:is|es)\s+(?:your|tu|su)\b[^.\n]{0,25}\b(?:code|c[oó]digo))/gi,
    () => hide('code'),
  );

  // Passwords and PINs: "password: hunter2", "my PIN is 4821".
  // Without "is" or ":" the value must contain a digit, so "pin the map" is left alone.
  out = out.replace(
    /\b(password|passcode|pwd|PIN|contrase[nñ]a|clave)(\s*(?:is|es|:|=)\s*|\s+)([^\s,.;!?]{3,})/gi,
    (m, word, sep, value) => {
      const explicit = /is|es|:|=/i.test(sep);
      if (!explicit && !/\d/.test(value)) return m;
      if (value.startsWith('[')) return m; // already hidden
      return `${word}${sep}${hide('password')}`;
    },
  );

  out = out.replace(/\u0000(\d+)\u0000/g, (m, i) => links[Number(i)]);
  return { text: out, items };
}

/** Counts hidden items by type, in a fixed order: [{ type, count }]. */
export function countByType(items) {
  return REDACTION_TYPES.map((type) => ({
    type,
    count: items.filter((i) => i.type === type).length,
  })).filter((c) => c.count > 0);
}
