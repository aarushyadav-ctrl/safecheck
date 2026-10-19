const VERDICT_WORDS = {
  scam: 'Likely a scam',
  caution: 'Be careful',
  safe: 'Looks safe',
};

// Changes web addresses a little (example.com -> example[.]com) so nobody
// taps a scam link by accident when the note is shared.
const ADDRESS = /\b(?:https?:\/\/)?(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s"')]*)?/gi;
export function defangLinks(text) {
  return String(text || '').replace(ADDRESS, (m) =>
    m.replace(/^http/i, 'hxxp').replace(/\./g, '[.]'),
  );
}

const MAX_MESSAGE = 600;

/** The short note a person can send to someone they trust. */
export function buildShareNote({ result, text, claimedSender }) {
  const message = (text || result.extractedText || '').trim();
  const shortMessage =
    message.length > MAX_MESSAGE ? `${message.slice(0, MAX_MESSAGE).trimEnd()}…` : message;

  const lines = [
    'Hi, can you help me check a message I got?',
    '',
    `SafeCheck says: ${verdictLabel(result.verdict)}.`,
    result.summary,
  ];

  if (result.redFlags?.length) {
    lines.push('', 'Warning signs it found:');
    result.redFlags.forEach((f) => {
      lines.push(f.quote ? `- "${defangLinks(f.quote)}": ${f.explanation}` : `- ${f.explanation}`);
    });
  }
  if (claimedSender?.trim()) lines.push('', `It says it is from: ${claimedSender.trim()}`);
  if (shortMessage) lines.push('', 'The message:', `"${defangLinks(shortMessage)}"`);
  lines.push('', 'Could you call me when you see this? Thank you!');

  return lines.join('\n');
}

function verdictLabel(verdict) {
  return VERDICT_WORDS[verdict] || VERDICT_WORDS.caution;
}
