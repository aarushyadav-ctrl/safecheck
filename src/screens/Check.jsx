import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Page from '../components/Page.jsx';
import Icon from '../components/Icon.jsx';
import Analyzing from '../components/Analyzing.jsx';
import CheckInputs, { ExampleChips, useLoadSample } from '../components/CheckInputs.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useT } from '../i18n/index.js';
import { useCheckRunner } from '../lib/useCheckRunner.js';

const START_INPUT = { paste: 'message', screenshot: 'message', link: 'link', qr: 'qr' };

const swap = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15 } },
};

/** Simple mode: one task on this screen — show us the message, then check it. */
export default function Check() {
  const [params] = useSearchParams();
  const startMode = params.get('mode');
  const navigate = useNavigate();
  const { check, updateCheck } = useApp();
  const t = useT();
  const runner = useCheckRunner();
  const loadSample = useLoadSample();

  const [formError, setFormError] = useState('');
  const fieldRef = useRef(null);
  const headingRef = useRef(null);
  const shownStatus = useRef(runner.status);

  // Coming from a start card ("Check a link", "Scan a QR code"...): open that input.
  useEffect(() => {
    const input = START_INPUT[startMode];
    if (input && input !== check.input) updateCheck({ input, result: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startMode]);

  // When the view changes (form, checking, problem), move focus to match.
  useEffect(() => {
    if (shownStatus.current === runner.status) return;
    shownStatus.current = runner.status;
    const target = runner.status === 'idle' ? fieldRef.current : headingRef.current;
    setTimeout(() => target?.focus(), 200);
  }, [runner.status]);

  async function handleSubmit(e) {
    e?.preventDefault();
    const problem = runner.validate();
    if (problem) {
      setFormError(problem);
      fieldRef.current?.focus();
      return;
    }
    setFormError('');
    const result = await runner.run();
    if (result) navigate('/results');
  }

  const heading = t(`check.headings.${runner.status}`);

  return (
    <Page title={heading} className="check">
      <h1 ref={headingRef} tabIndex={-1}>
        {heading}
      </h1>

      <AnimatePresence mode="wait" initial={false}>
        {runner.status === 'loading' && (
          <motion.div key="loading" {...swap}>
            <Analyzing
              hasImage={Boolean(check.image) && check.input === 'message'}
              isLink={check.input !== 'message'}
              onCancel={runner.stop}
            />
          </motion.div>
        )}

        {runner.status === 'error' && (
          <motion.div key="error" {...swap}>
            <div className="error-panel" role="alert">
              <Icon name="alert" size="1.5rem" />
              <p>{runner.error}</p>
            </div>
            <div className="button-row">
              <button type="button" className="btn btn--primary" onClick={handleSubmit}>
                <Icon name="refresh" />
                {t('check.tryAgain')}
              </button>
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => runner.setStatus('idle')}
              >
                {t('check.change')}
              </button>
            </div>
          </motion.div>
        )}

        {runner.status === 'idle' && (
          <motion.div key="form" {...swap}>
            <p className="lead">{t('check.lead')}</p>

            <form className="check-form" onSubmit={handleSubmit} noValidate>
              <CheckInputs
                ref={fieldRef}
                screenshotFirst={startMode === 'screenshot'}
                formError={formError}
                onEdit={() => formError && setFormError('')}
              />
              <button type="submit" className="btn btn--primary btn--wide">
                {check.input === 'message' ? t('check.submit') : t('check.submitLink')}
                <Icon name="arrowRight" />
              </button>
            </form>

            <ExampleChips onLoad={(s) => loadSample(s, fieldRef)} />
          </motion.div>
        )}
      </AnimatePresence>
    </Page>
  );
}
