import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Page from '../components/Page.jsx';
import Icon from '../components/Icon.jsx';
import ReadAloudButton from '../components/ReadAloudButton.jsx';
import {
  ConfidenceLine,
  FlagsView,
  LinkReportView,
  RedactionNotice,
  ResultNotes,
  VerdictCard,
} from '../components/ResultParts.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useT } from '../i18n/index.js';
import { readAloudText, verdictLabel } from '../lib/describe.js';

export default function Results() {
  const { check } = useApp();
  // Keep showing the last result while this page fades out after
  // "Check another message" clears it.
  const last = useRef(check);
  if (check.result) last.current = check;

  if (!last.current.result) return <NoResult />;
  return <ResultView check={last.current} />;
}

function ResultView({ check }) {
  const t = useT();
  const { result, linkReport } = check;
  const text = check.sentText || check.text.trim() || result.extractedText || '';
  const fromScreenshot = !check.text.trim() && Boolean(result.extractedText);

  return (
    <Page title={verdictLabel(result, t)} className="results">
      <VerdictCard result={result} headingLevel="h1" />
      <ConfidenceLine result={result} />
      <ReadAloudButton
        className="results__read"
        getText={() => readAloudText(result, linkReport, t)}
      />
      <ResultNotes result={result} />
      <RedactionNotice items={check.redactions} sentText={check.sentText} />

      <div className="results__actions">
        <Link to="/next-steps" className="btn btn--primary">
          {t('results.whatNow')}
          <Icon name="arrowRight" />
        </Link>
        {result.verdict !== 'safe' && (
          <Link to="/next-steps?path=clicked" className="btn btn--secondary">
            <Icon name="pointer" />
            {t('results.alreadyClicked')}
          </Link>
        )}
      </div>

      {linkReport ? (
        <LinkReportView report={linkReport} result={result} />
      ) : (
        <FlagsView result={result} text={text} fromScreenshot={fromScreenshot} />
      )}

      {!result.localOnly && result.nextSteps?.length > 0 && (
        <section className="in-short" aria-labelledby="in-short-title">
          <h2 id="in-short-title">{t('results.inShort')}</h2>
          <ul>
            {result.nextSteps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      )}

      <nav className="results__more" aria-label={t('results.moreOptions')}>
        <Link to="/ask-family" className="btn btn--secondary">
          <Icon name="users" />
          {t('results.askSomeone')}
        </Link>
        <CheckAnother />
      </nav>
    </Page>
  );
}

export function CheckAnother({ to = '/check' }) {
  const { resetCheck } = useApp();
  const t = useT();
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="btn btn--quiet"
      onClick={() => {
        resetCheck();
        navigate(to);
      }}
    >
      {t('results.checkAnother')}
    </button>
  );
}

function NoResult() {
  const t = useT();
  return (
    <Page title={t('results.noneTitle')}>
      <h1>{t('results.noneTitle')}</h1>
      <p>{t('results.noneBody')}</p>
      <Link className="btn btn--primary" to="/check">
        {t('results.noneAction')}
        <Icon name="arrowRight" />
      </Link>
    </Page>
  );
}
