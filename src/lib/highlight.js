const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Finds a quote inside the message, ignoring capital letters and extra spaces.
function locate(text, quote) {
  const q = String(quote || '')
    .trim()
    .replace(/^["'“‘]+|["'”’]+$/g, ''); // the AI sometimes wraps quotes in quote marks
  if (!q) return null;
  const pattern = q.split(/\s+/).map(escapeRegExp).join('\\s+');
  const match = new RegExp(pattern, 'i').exec(text);
  return match ? { start: match.index, end: match.index + match[0].length } : null;
}

/**
 * Turns a message and its red flags into:
 * - segments: pieces of the message, some marked with a warning-sign number
 * - items: the numbered explanations, in the same order as they appear in the message
 * Flags that can't be found in the text (or overlap another) are still listed,
 * just not marked.
 */
export function buildHighlights(text, redFlags = []) {
  const located = redFlags.map((flag) => ({ flag, pos: locate(text, flag.quote) }));

  const shown = [];
  located
    .filter((l) => l.pos)
    .sort((a, b) => a.pos.start - b.pos.start)
    .forEach((l) => {
      const prev = shown[shown.length - 1];
      if (!prev || l.pos.start >= prev.pos.end) shown.push(l);
    });
  const notShown = located.filter((l) => !shown.includes(l));

  const items = [
    ...shown.map((l, i) => ({ num: i + 1, ...l.flag, shown: true })),
    ...notShown.map((l, i) => ({ num: shown.length + i + 1, ...l.flag, shown: false })),
  ];

  const segments = [];
  let cursor = 0;
  shown.forEach((l, i) => {
    if (l.pos.start > cursor) segments.push({ text: text.slice(cursor, l.pos.start) });
    segments.push({ text: text.slice(l.pos.start, l.pos.end), num: i + 1 });
    cursor = l.pos.end;
  });
  if (cursor < text.length) segments.push({ text: text.slice(cursor) });

  return { segments, items };
}
