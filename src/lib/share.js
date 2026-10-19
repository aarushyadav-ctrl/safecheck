import { summaryText, verdictLabel, warningSigns } from './describe.js';

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
export function buildShareNote({ result, text, claimedSender, linkReport, link }, t) {
  const message = (text || result.extractedText || '').trim();
  const shortMessage =
    message.length > MAX_MESSAGE ? `${message.slice(0, MAX_MESSAGE).trimEnd()}…` : message;

  const lines = [
    t('share.note.hello'),
    '',
    t('share.note.says', { verdict: verdictLabel(result, t) }),
    summaryText(result, t),
  ];

  const signs = warningSigns(result, linkReport, t);
  if (signs.length) {
    lines.push('', t('share.note.signs'));
    signs.forEach((s) => lines.push(`- ${defangLinks(s)}`));
  }
  if (claimedSender?.trim()) lines.push('', t('share.note.from', { sender: claimedSender.trim() }));
  if (linkReport) {
    lines.push('', t('share.note.link'), defangLinks(link || linkReport.href));
    lines.push(t('share.note.linkGoesTo', { domain: defangLinks(linkReport.domain) }));
  } else if (shortMessage) {
    lines.push('', t('share.note.message'), `"${defangLinks(shortMessage)}"`);
  }
  lines.push('', t('share.note.callMe'));

  return lines.join('\n');
}
