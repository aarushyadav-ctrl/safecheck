// Turns "xn--" web addresses back into the letters people actually see,
// so lookalike letters (like a Cyrillic "а" posing as a Latin "a") can be shown.
// Decoder from RFC 3492 (Punycode).

const BASE = 36;
const T_MIN = 1;
const T_MAX = 26;
const SKEW = 38;
const DAMP = 700;
const INITIAL_BIAS = 72;
const INITIAL_N = 128;

function adapt(delta, numPoints, firstTime) {
  let d = firstTime ? Math.floor(delta / DAMP) : delta >> 1;
  d += Math.floor(d / numPoints);
  let k = 0;
  while (d > ((BASE - T_MIN) * T_MAX) >> 1) {
    d = Math.floor(d / (BASE - T_MIN));
    k += BASE;
  }
  return k + Math.floor(((BASE - T_MIN + 1) * d) / (d + SKEW));
}

function digitOf(cp) {
  if (cp >= 0x30 && cp <= 0x39) return cp - 0x30 + 26; // 0-9
  if (cp >= 0x41 && cp <= 0x5a) return cp - 0x41; // A-Z
  if (cp >= 0x61 && cp <= 0x7a) return cp - 0x61; // a-z
  return BASE;
}

export function decodeLabel(input) {
  const output = [];
  let n = INITIAL_N;
  let bias = INITIAL_BIAS;
  let i = 0;
  const basic = Math.max(0, input.lastIndexOf('-'));
  for (let j = 0; j < basic; j++) output.push(input.charCodeAt(j));

  for (let index = basic > 0 ? basic + 1 : 0; index < input.length; ) {
    const oldI = i;
    for (let w = 1, k = BASE; ; k += BASE) {
      if (index >= input.length) throw new Error('Invalid punycode');
      const digit = digitOf(input.charCodeAt(index++));
      if (digit >= BASE) throw new Error('Invalid punycode');
      i += digit * w;
      const t = k <= bias ? T_MIN : k >= bias + T_MAX ? T_MAX : k - bias;
      if (digit < t) break;
      w *= BASE - t;
    }
    const length = output.length + 1;
    bias = adapt(i - oldI, length, oldI === 0);
    n += Math.floor(i / length);
    i %= length;
    output.splice(i++, 0, n);
  }
  return String.fromCodePoint(...output);
}

/** "xn--80ak6aa92e.com" -> "аррӏе.com". Labels that can't be decoded stay as they are. */
export function toUnicode(host) {
  return host
    .split('.')
    .map((label) => {
      if (!label.toLowerCase().startsWith('xn--')) return label;
      try {
        return decodeLabel(label.slice(4));
      } catch {
        return label;
      }
    })
    .join('.');
}
