import { useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Page from '../components/Page.jsx';
import Icon from '../components/Icon.jsx';
import { useApp } from '../context/AppContext.jsx';
import { buildHighlights } from '../lib/highlight.js';

export const VERDICTS = {
  scam: { label: 'Likely a scam', icon: 'shieldAlert' },
  caution: { label: 'Be careful', icon: 'triangle' },
  safe: { label: 'Looks safe', icon: 'shieldCheck' },
};

export function confidenceNote(result) {
  if (result.verdict === 'safe') {
    return result.confidence === 'high'
      ? "We didn't find any warning signs."
      : "We didn't find clear warning signs, but some scams look normal.";
  }
  if (result.confidence === 'high') return "We're quite sure. It has signs scammers often use.";
  if (result.confidence === 'low') return "We're not sure. Please be extra careful.";
  return "We're fairly sure, but not certain.";
}

export default function Results() {
  const { check } = useApp();
  // Keep showing the last result while this page fades out after
  // "Check another message" clears it.
  const last = useRef({ result: check.result, text: check.text });
  if (check.result) last.current = { result: check.result, text: check.text };

  if (!last.current.result) return <NoResult />;
  return <ResultView result={last.current.result} text={last.current.text} />;
}

function ResultView({ result, text }) {
  const { announce } = useApp();
  const verdict = VERDICTS[result.verdict] || VERDICTS.caution;
  const messageText = text.trim() || result.extractedText || '';
  const fromScreenshot = !text.trim() && Boolean(result.extractedText);

  const { segments, items } = useMemo(
    () => buildHighlights(messageText, result.redFlags),
    [messageText, result.redFlags],
  );

  useEffect(() => {
    const count = items.length;
    const signs = count === 0 ? 'No warning signs found.' : `${count} warning sign${count > 1 ? 's' : ''} found.`;
    const id = setTimeout(() => announce(`${result.summary} ${signs}`), 700);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return (
    <Page title={verdict.label} className="results">
      <motion.section
        className={`verdict verdict--${result.verdict}`}
        aria-labelledby="verdict-title"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      >
        <span className="verdict__icon">
          <Icon name={verdict.icon} size="2.25rem" />
        </span>
        <div>
          <p className="verdict__eyebrow">Our answer</p>
          <h1 id="verdict-title" className="verdict__title">
            {verdict.label}
          </h1>
          <p className="verdict__summary">{result.summary}</p>
        </div>
      </motion.section>

      <div className="confidence">
        <Icon name="info" />
        <p>
          {confidenceNote(result)} SafeCheck can make mistakes. If something feels wrong, trust
          that feeling.
        </p>
      </div>

      {result.demo && (
        <p className="demo-note">
          <strong>Demo result:</strong> this answer was written ahead of time for this example.
        </p>
      )}

      <div className="results__actions">
        <Link to="/next-steps" className="btn btn--primary">
          What should I do now?
          <Icon name="arrowRight" />
        </Link>
        {result.verdict !== 'safe' && (
          <Link to="/next-steps?path=clicked" className="btn btn--secondary">
            <Icon name="pointer" />
            I already tapped a link or replied
          </Link>
        )}
      </div>

      <section className="flags" aria-labelledby="flags-title">
        <h2 id="flags-title">
          {items.length === 0
            ? 'Warning signs'
            : `${items.length} warning sign${items.length > 1 ? 's' : ''} we found`}
        </h2>

        {messageText && (
          <figure className="flags__message">
            <figcaption className="flags__caption">
              {fromScreenshot ? 'The words we read from your screenshot' : 'Your message'}
              {items.some((i) => i.shown) && ', with warning signs marked'}
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
                    <span className="visually-hidden"> (warning sign {seg.num})</span>
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
                  <span className="visually-hidden">Warning sign {item.num}: </span>
                  {!item.shown && <q className="flag-list__quote">{item.quote}</q>}{' '}
                  {item.explanation}
                </span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="flags__none">
            <Icon name="check" />
            We didn't find any warning signs in this message.
          </p>
        )}
      </section>

      {result.nextSteps?.length > 0 && (
        <section className="in-short" aria-labelledby="in-short-title">
          <h2 id="in-short-title">In short</h2>
          <ul>
            {result.nextSteps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      )}

      <nav className="results__more" aria-label="More options">
        <Link to="/ask-family" className="btn btn--secondary">
          <Icon name="users" />
          Ask someone I trust
        </Link>
        <CheckAnother />
      </nav>
    </Page>
  );
}

function splitLastWord(text) {
  const at = text.trimEnd().lastIndexOf(' ') + 1;
  return [text.slice(0, at), text.slice(at)];
}

function CheckAnother() {
  const { resetCheck } = useApp();
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="btn btn--quiet"
      onClick={() => {
        resetCheck();
        navigate('/check');
      }}
    >
      Check another message
    </button>
  );
}

function NoResult() {
  return (
    <Page title="No result yet">
      <h1>No message checked yet</h1>
      <p>Paste a message or add a screenshot, and we'll check it for you.</p>
      <Link className="btn btn--primary" to="/check">
        Check a message
        <Icon name="arrowRight" />
      </Link>
    </Page>
  );
}
