import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import Icon from './Icon.jsx';
import { useT } from '../i18n/index.js';
import { buildHighlights } from '../lib/highlight.js';
import {
  VERDICT_ICONS,
  confidenceNote,
  redactionSentence,
  summaryText,
  verdictLabel,
} from '../lib/describe.js';

// Building blocks for showing a result. Simple mode's Results screen and
// Quick mode both use these, so the two always say the same thing.

export function VerdictCard({ result, headingLevel = 'h1', compact = false }) {
  const t = useT();
  const Heading = headingLevel;
  return (
    <motion.section
      className={`verdict verdict--${result.verdict}${compact ? ' verdict--compact' : ''}`}
      aria-labelledby="verdict-title"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
    >
      <span className="verdict__icon">
        <Icon name={VERDICT_ICONS[result.verdict] || 'triangle'} size={compact ? '1.75rem' : '2.25rem'} />
      </span>
      <div>
        <p className="verdict__eyebrow">{t('results.ourAnswer')}</p>
        <Heading id="verdict-title" className="verdict__title">
          {verdictLabel(result, t)}
        </Heading>
        <p className="verdict__summary">{summaryText(result, t)}</p>
      </div>
    </motion.section>
  );
}

export function ConfidenceLine({ result }) {
  const t = useT();
  return (
    <div className="confidence">
      <Icon name="info" />
      <p>
        {confidenceNote(result, t)} {t('results.mistakes')}
      </p>
    </div>
  );
}

export function ResultNotes({ result }) {
  const t = useT();
  return (
    <>
      {result.demo && (
        <p className="demo-note">
          <strong>{t('results.demoLabel')}</strong> {t('results.demoNote')}
        </p>
      )}
      {result.localOnly && (
        <p className="demo-note">
          <strong>{t('results.localLabel')}</strong> {t('results.localNote')}
        </p>
      )}
    </>
  );
}

/** "We hid 2 items before checking: a card number and a code." */
export function RedactionNotice({ items, sentText }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  if (!items?.length) return null;
  return (
    <div className="redaction">
      <p className="redaction__text">
        <Icon name="lock" />
        <span>{redactionSentence(items, t)}</span>
      </p>
      <button
        type="button"
        className="btn btn--quiet btn--small"
        aria-expanded={open}
        aria-controls="redacted-text"
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name="eye" />
        {open ? t('redact.hide') : t('redact.show')}
      </button>
      {open && (
        <pre id="redacted-text" className="redaction__sent message-text">
          {sentText}
        </pre>
      )}
    </div>
  );
}

// Keeps a warning-sign number on the same line as the word before it,
// unless that word is very long (like a web address), which must be free to wrap.
function splitLastWord(text) {
  const at = text.trimEnd().lastIndexOf(' ') + 1;
  const tail = text.slice(at);
  return tail.length > 14 ? [text, ''] : [text.slice(0, at), tail];
}

/** The message with each warning sign highlighted and numbered, plus the explanations. */
export function FlagsView({ result, text, fromScreenshot, headingLevel = 'h2' }) {
  const t = useT();
  const Heading = headingLevel;
  const { segments, items } = useMemo(
    () => buildHighlights(text, result.redFlags),
    [text, result.redFlags],
  );

  return (
    <section className="flags" aria-labelledby="flags-title">
      <Heading id="flags-title">
        {items.length === 0 ? t('results.signsHeadingNone') : t('results.signsHeading', { count: items.length })}
      </Heading>

      {text && (
        <figure className="flags__message">
          <figcaption className="flags__caption">
            {fromScreenshot ? t('results.captionScreenshot') : t('results.captionMessage')}
            {items.some((i) => i.shown) && t('results.captionMarked')}
          </figcaption>
          <p className="message-text flags__text">
            {segments.map((seg, i) =>
              seg.num ? (
                <mark key={i} className="flag" style={{ '--i': seg.num - 1 }}>
                  {splitLastWord(seg.text)[0]}
                  {/* The last word and its number never get split across lines. */}
                  <span className="nowrap">
                    {splitLastWord(seg.text)[1]}
                    <span className="flag__num" aria-hidden="true">
                      {seg.num}
                    </span>
                  </span>
                  <span className="visually-hidden"> ({t('results.signNumber', { n: seg.num })})</span>
                </mark>
              ) : (
                <span key={i}>{seg.text}</span>
              ),
            )}
          </p>
        </figure>
      )}

      {items.length > 0 ? (
        <ol className="flag-list flag-list--results" role="list">
          {items.map((item) => (
            <li key={item.num} style={{ '--i': item.num - 1 }}>
              <span className="flag-list__num" aria-hidden="true">
                {item.num}
              </span>
              <span>
                <span className="visually-hidden">{t('results.signNumber', { n: item.num })}: </span>
                {!item.shown && item.quote && <q className="flag-list__quote">{item.quote}</q>}{' '}
                {item.explanation}
              </span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="flags__none">
          <Icon name="check" />
          {t('results.noSigns')}
        </p>
      )}
    </section>
  );
}

const LEVEL_ICON = { danger: 'shieldAlert', warning: 'triangle', good: 'shieldCheck' };

/**
 * Where a link really goes, and what's wrong with it. The link is shown as
 * plain text in pieces and is never opened or made clickable.
 */
export function LinkReportView({ report, result, headingLevel = 'h2' }) {
  const t = useT();
  const Heading = headingLevel;
  const Sub = headingLevel === 'h2' ? 'h3' : 'h4';
  const signs = report.findings;
  const aiFlags = result && !result.localOnly ? result.redFlags || [] : [];

  return (
    <section className="link-report" aria-labelledby="link-report-title">
      <Heading id="link-report-title">{t('link.reportTitle')}</Heading>

      <div className="link-dest">
        <p className="link-dest__label">{t('link.goesTo')}</p>
        <p className="link-dest__domain">
          {report.domain}
        </p>
        <p className="link-dest__full message-text">
          <span className="visually-hidden">{t('link.fullAddress')}: </span>
          <span className="link-dest__muted">{report.scheme ? `${report.scheme}://` : ''}</span>
          {report.subdomain && <span className="link-dest__muted">{report.subdomain}.</span>}
          <strong className="link-dest__main">{report.domain}</strong>
          <span className="link-dest__muted">{report.rest}</span>
        </p>
        {report.subdomain && (
          <p className="link-dest__explain">{t('link.explainParts', { sub: report.subdomain, domain: report.domain })}</p>
        )}
        <p className="field__note">
          <Icon name="lock" />
          <span>{t('link.neverOpened')}</span>
        </p>
      </div>

      <Sub className="link-report__sub">{t('link.findingsTitle')}</Sub>
      {signs.length ? (
        <ul className="finding-list" role="list">
          {signs.map((f, i) => (
            <li key={`${f.id}-${i}`} className={`finding finding--${f.level}`}>
              <Icon name={LEVEL_ICON[f.level]} size="1.4rem" />
              <div>
                <p className="finding__level">{t(`link.levels.${f.level}`)}</p>
                <p className="finding__title">{t(`link.findings.${f.id}.title`, f.vars)}</p>
                <p className="finding__body">{t(`link.findings.${f.id}.body`, f.vars)}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="flags__none flags__none--neutral">
          <Icon name="info" />
          {t('link.noFindings')}
        </p>
      )}

      {aiFlags.length > 0 && (
        <>
          <Sub className="link-report__sub">{t('link.aiTitle')}</Sub>
          <ul className="plain-list">
            {aiFlags.map((f, i) => (
              <li key={i}>{f.explanation}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

/** A compact numbered list of steps (Quick mode and the "done" summaries). */
export function StepsChecklist({ steps }) {
  const t = useT();
  return (
    <ol className="steps-checklist" role="list">
      {steps.map((s, i) => (
        <li key={s.title}>
          <span className="steps-checklist__num" aria-hidden="true">
            {i + 1}
          </span>
          <div>
            <p className="steps-checklist__title">{s.title}</p>
            <p className="steps-checklist__body">{s.body}</p>
            {s.links?.map((l) => (
              <p key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-link">
                  {l.label}
                  <Icon name="external" />
                  <span className="visually-hidden"> {t('common.newTab')}</span>
                </a>
              </p>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}
