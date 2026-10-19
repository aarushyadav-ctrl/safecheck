// Turns a result into words: for the screen, for screen-reader announcements,
// for "Read this to me", and for the "Copy summary" button.
// Shared by Simple mode and Quick mode.
import { countByType } from './redact.js';

export const VERDICT_ICONS = { scam: 'shieldAlert', caution: 'triangle', safe: 'shieldCheck' };

export const verdictLabel = (result, t) => t(`verdict.${result.verdict}`) || t('verdict.caution');

/** The one-sentence reason. Local link results use translated text. */
export function summaryText(result, t) {
  return result.summaryKey ? t(result.summaryKey, result.summaryVars) : result.summary;
}

export function confidenceNote(result, t) {
  if (result.verdict === 'safe') {
    return result.confidence === 'high' ? t('confidence.safeHigh') : t('confidence.safeOther');
  }
  if (result.confidence === 'high') return t('confidence.high');
  if (result.confidence === 'low') return t('confidence.low');
  return t('confidence.medium');
}

/** Everything that counts as a warning sign: link findings first, then the AI's. */
export function warningSigns(result, linkReport, t) {
  const fromLink = (linkReport?.findings || [])
    .filter((f) => f.level !== 'good')
    .map((f) => t(`link.findings.${f.id}.title`, f.vars));
  const fromAi = result.localOnly ? [] : (result.redFlags || []).map((f) => f.explanation);
  return [...fromLink, ...fromAi];
}

/** A short sentence for screen readers when a result appears. */
export function describeResult(result, linkReport, t) {
  const count = warningSigns(result, linkReport, t).length;
  return [
    t('results.announce', { verdict: verdictLabel(result, t) }),
    summaryText(result, t),
    t('results.signsFound', { count }),
  ].join(' ');
}

/** What "Read this to me" says. */
export function readAloudText(result, linkReport, t) {
  const signs = warningSigns(result, linkReport, t);
  const parts = [
    `${t('results.ourAnswer')}: ${verdictLabel(result, t)}.`,
    summaryText(result, t),
    confidenceNote(result, t),
  ];
  if (linkReport) parts.push(t('link.readAloudDomain', { domain: linkReport.domain }));
  if (signs.length) {
    parts.push(t('results.signsFound', { count: signs.length }));
    signs.forEach((s, i) => parts.push(`${t('results.signNumber', { n: i + 1 })}. ${s}`));
  }
  parts.push(t('results.mistakes'));
  return parts.join(' ');
}

/** The text copied by "Copy summary" in Quick mode. */
export function buildSummary({ result, linkReport, steps }, t) {
  const lines = [`SafeCheck: ${verdictLabel(result, t)}`, summaryText(result, t)];
  if (linkReport) lines.push(t('link.realDestination', { domain: linkReport.domain }));
  const signs = warningSigns(result, linkReport, t);
  if (signs.length) {
    lines.push('', `${t('summary.warningSigns')}:`);
    signs.forEach((s) => lines.push(`- ${s}`));
  }
  if (steps?.length) {
    lines.push('', `${t('summary.whatToDo')}:`);
    steps.forEach((s) => lines.push(`- ${s.title}`));
  }
  lines.push('', t('results.mistakes'));
  return lines.join('\n');
}

/** "We hid 2 items before checking: a card number and a code." */
export function redactionSentence(items, t) {
  const counts = countByType(items);
  if (!counts.length) return '';
  const total = items.length;
  const names = counts.map(({ type, count }) => t(`redact.names.${type}`, { count }));
  return t('redact.summary', { total, list: t('list.and', { items: names }) });
}
