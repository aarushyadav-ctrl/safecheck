import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Page from '../components/Page.jsx';
import Icon from '../components/Icon.jsx';
import Analyzing from '../components/Analyzing.jsx';
import CopyButton from '../components/CopyButton.jsx';
import ReadAloudButton from '../components/ReadAloudButton.jsx';
import CheckInputs, { ExampleChips, useLoadSample } from '../components/CheckInputs.jsx';
import {
  ConfidenceLine,
  FlagsView,
  LinkReportView,
  RedactionNotice,
  ResultNotes,
  StepsChecklist,
  VerdictCard,
} from '../components/ResultParts.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useT } from '../i18n/index.js';
import { useCheckRunner } from '../lib/useCheckRunner.js';
import { getSteps } from '../lib/steps.js';
import { buildSummary, readAloudText } from '../lib/describe.js';

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent);

const TOOLS = [
  { to: '/call', icon: 'phone', id: 'call' },
  { to: '/practice', icon: 'award', id: 'practice' },
  { to: '/family-plan', icon: 'key', id: 'plan' },
];

/**
 * Quick mode: everything on one screen. Input at the top, and the verdict,
 * warning signs and next steps appear below without changing pages.
 * Uses the same check runner, state and result parts as Simple mode.
 */
export default function Quick() {
  const { check, mode, setMode, settings } = useApp();
  const t = useT();
  const runner = useCheckRunner();
  const loadSample = useLoadSample();
  const [formError, setFormError] = useState('');
  const fieldRef = useRef(null);
  const resultRef = useRef(null);

  // Opening /quick directly counts as choosing Quick mode.
  useEffect(() => {
    if (mode === null) setMode('quick');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submit(e) {
    e?.preventDefault();
    const problem = runner.validate();
    if (problem) {
      setFormError(problem);
      fieldRef.current?.focus();
      return;
    }
    setFormError('');
    const result = await runner.run({ minWait: 500 });
    if (result) {
      const reduce = settings.reduceMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      resultRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }
  }

  // Ctrl+Enter (Cmd+Enter on Mac) checks from anywhere on this screen.
  const submitRef = useRef(submit);
  submitRef.current = submit;
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && !document.querySelector('dialog[open]')) {
        e.preventDefault();
        submitRef.current();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const result = check.result;
  const isLink = check.input !== 'message';

  return (
    <Page title={t('quick.title')} className="quick">
      <h1>{t('quick.title')}</h1>
      <p className="lead">{t('quick.lead')}</p>

      <form className="quick-form" onSubmit={submit} noValidate>
        <CheckInputs
          ref={fieldRef}
          compact
          formError={formError}
          onEdit={() => formError && setFormError('')}
        />
        <div className="quick-form__submit">
          <button type="submit" className="btn btn--primary" disabled={runner.status === 'loading'}>
            {isLink ? t('check.submitLink') : t('check.submit')}
            <Icon name="arrowRight" />
          </button>
          <p className="shortcut-hint" id="shortcut-hint">
            {t('quick.shortcut')} <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd> + <kbd>Enter</kbd>
          </p>
        </div>
      </form>

      <ExampleChips compact headingLevel="h2" onLoad={(s) => loadSample(s, fieldRef)} />

      <nav className="quick-tools" aria-label={t('quick.toolsLabel')}>
        {TOOLS.map((tool) => (
          <Link key={tool.id} to={tool.to} className="quick-tools__link">
            <Icon name={tool.icon} />
            {t(`quick.tools.${tool.id}`)}
          </Link>
        ))}
      </nav>

      <section ref={resultRef} className="quick-result" aria-labelledby="quick-result-title">
        <h2 id="quick-result-title" className="visually-hidden">
          {t('quick.resultTitle')}
        </h2>
        <AnimatePresence mode="wait" initial={false}>
          {runner.status === 'loading' && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Analyzing compact hasImage={Boolean(check.image) && !isLink} isLink={isLink} onCancel={runner.stop} />
            </motion.div>
          )}
          {runner.status === 'error' && (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="error-panel" role="alert">
                <Icon name="alert" size="1.5rem" />
                <p>{runner.error}</p>
              </div>
              <div className="button-row">
                <button type="button" className="btn btn--primary" onClick={submit}>
                  <Icon name="refresh" />
                  {t('check.tryAgain')}
                </button>
              </div>
            </motion.div>
          )}
          {runner.status !== 'loading' && runner.status !== 'error' && result && (
            <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <QuickResult check={check} />
            </motion.div>
          )}
          {runner.status === 'idle' && !result && (
            <motion.p key="empty" className="quick-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {t('quick.empty')}
            </motion.p>
          )}
        </AnimatePresence>
      </section>
    </Page>
  );
}

function QuickResult({ check }) {
  const t = useT();
  const { result, linkReport } = check;
  const isLink = Boolean(linkReport);
  const steps = getSteps(result, 'main', t, { isLink });
  const recovery = getSteps(result, 'clicked', t);
  const text = check.sentText || check.text.trim() || result.extractedText || '';
  const fromScreenshot = !check.text.trim() && Boolean(result.extractedText);

  return (
    <div className="quick-result__body">
      <VerdictCard result={result} headingLevel="h2" compact />
      <ConfidenceLine result={result} />
      <ResultNotes result={result} />
      <RedactionNotice items={check.redactions} sentText={check.sentText} />

      <div className="button-row">
        <CopyButton
          className="btn btn--primary"
          label={t('quick.copy')}
          copiedMessage={t('quick.copied')}
          getText={() => buildSummary({ result, linkReport, steps }, t)}
        />
        <ReadAloudButton getText={() => readAloudText(result, linkReport, t)} />
        <Link to="/ask-family" className="btn btn--secondary">
          <Icon name="users" />
          {t('results.askSomeone')}
        </Link>
      </div>

      {isLink ? (
        <LinkReportView report={linkReport} result={result} headingLevel="h3" />
      ) : (
        <FlagsView result={result} text={text} fromScreenshot={fromScreenshot} headingLevel="h3" />
      )}

      <section className="quick-steps" aria-labelledby="quick-steps-title">
        <h3 id="quick-steps-title">{t('quick.whatToDo')}</h3>
        <StepsChecklist steps={steps} />
      </section>

      {result.verdict !== 'safe' && (
        <details className="quick-recovery">
          <summary>
            <Icon name="pointer" />
            {t('results.alreadyClicked')}
          </summary>
          <StepsChecklist steps={recovery} />
        </details>
      )}
    </div>
  );
}
