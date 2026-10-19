import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Page from '../components/Page.jsx';
import Icon from '../components/Icon.jsx';
import ScreenshotField from '../components/ScreenshotField.jsx';
import Analyzing from '../components/Analyzing.jsx';
import { useApp } from '../context/AppContext.jsx';
import { SAMPLES } from '../../shared/samples.js';
import { prepareScreenshot } from '../lib/image.js';
import { analyzeMessage } from '../lib/analyze.js';

const MIN_WAIT_MS = 1600; // long enough to read "Checking…", never a flash

const HEADINGS = {
  idle: 'Check a message',
  loading: 'Checking your message…',
  error: "We couldn't check that message",
};

const swap = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15 } },
};

export default function Check() {
  const [params] = useSearchParams();
  const screenshotFirst = params.get('mode') === 'screenshot';
  const navigate = useNavigate();
  const { check, updateCheck, announce } = useApp();

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'error'
  const [formError, setFormError] = useState('');
  const [checkError, setCheckError] = useState('');
  const textRef = useRef(null);
  const headingRef = useRef(null);
  const abortRef = useRef(null);
  const shownStatus = useRef(status);

  // Stop any check that is still running if the person leaves this page.
  useEffect(() => () => abortRef.current?.abort(), []);

  // When the view changes (form, checking, problem), move focus to match.
  useEffect(() => {
    if (shownStatus.current === status) return;
    shownStatus.current = status;
    const target = status === 'idle' ? textRef.current : headingRef.current;
    setTimeout(() => target?.focus(), 200);
  }, [status]);

  function loadSample(sample) {
    updateCheck({
      text: sample.text,
      claimedSender: sample.claimedSender,
      image: null,
      sampleId: sample.id,
      result: null,
    });
    setFormError('');
    textRef.current?.focus();
    announce(`Example loaded: ${sample.label}. Press "Check this message" when you're ready.`);
  }

  // A picture pasted straight into the text box becomes the screenshot.
  async function handlePaste(e) {
    const file = [...(e.clipboardData?.files || [])].find((f) => f.type.startsWith('image/'));
    if (!file) return;
    e.preventDefault();
    try {
      updateCheck({ image: await prepareScreenshot(file), sampleId: null, result: null });
      setFormError('');
      announce('Picture added as your screenshot.');
    } catch (err) {
      announce(err.message);
    }
  }

  async function runCheck() {
    const controller = new AbortController();
    abortRef.current = controller;
    setStatus('loading');
    announce('Checking your message. This usually takes a few seconds.');

    try {
      const [result] = await Promise.all([
        analyzeMessage(check, { signal: controller.signal }),
        new Promise((r) => setTimeout(r, MIN_WAIT_MS)),
      ]);
      if (controller.signal.aborted) return;
      updateCheck({ result });
      navigate('/results');
    } catch (err) {
      if (controller.signal.aborted) return;
      setCheckError(err.message);
      setStatus('error');
    }
  }

  function stopChecking() {
    abortRef.current?.abort();
    setStatus('idle');
    announce('Stopped checking. Your message is still here.');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!check.text.trim() && !check.image) {
      setFormError('Please paste the message or add a screenshot first.');
      textRef.current?.focus();
      return;
    }
    setFormError('');
    runCheck();
  }

  const messageField = (
    <div className="field" key="message">
      <label htmlFor="message" className="field__label">
        The message
      </label>
      <p id="message-hint" className="field__hint">
        Copy the words from your text or email, then paste them here.
      </p>
      <textarea
        id="message"
        ref={textRef}
        className="field__input field__input--message message-text"
        rows={7}
        value={check.text}
        onChange={(e) => {
          updateCheck({ text: e.target.value, sampleId: null, result: null });
          if (formError) setFormError('');
        }}
        onPaste={handlePaste}
        placeholder="For example: Your account is locked. Click this link to unlock it…"
        aria-describedby={`message-hint${formError ? ' form-error' : ''}`}
        aria-invalid={formError ? 'true' : undefined}
      />
      {formError && (
        <p id="form-error" className="field__error" role="alert">
          <Icon name="alert" />
          {formError}
        </p>
      )}
    </div>
  );

  const screenshotField = (
    <ScreenshotField
      key="screenshot"
      image={check.image}
      onChange={(image) => {
        updateCheck({ image, sampleId: null, result: null });
        if (image) setFormError('');
      }}
    />
  );

  return (
    <Page title={HEADINGS[status]} className="check">
      <h1 ref={headingRef} tabIndex={-1}>
        {HEADINGS[status]}
      </h1>

      <AnimatePresence mode="wait" initial={false}>
        {status === 'loading' && (
          <motion.div key="loading" {...swap}>
            <Analyzing hasImage={Boolean(check.image)} onCancel={stopChecking} />
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div key="error" {...swap}>
            <div className="error-panel" role="alert">
              <Icon name="alert" size="1.5rem" />
              <p>{checkError}</p>
            </div>
            <div className="button-row">
              <button type="button" className="btn btn--primary" onClick={runCheck}>
                <Icon name="refresh" />
                Try again
              </button>
              <button type="button" className="btn btn--secondary" onClick={() => setStatus('idle')}>
                Change the message
              </button>
            </div>
          </motion.div>
        )}

        {status === 'idle' && (
          <motion.div key="form" {...swap}>
            <p className="lead">Paste the message, add a screenshot, or both.</p>

            <form className="check-form" onSubmit={handleSubmit} noValidate>
              {screenshotFirst ? [screenshotField, messageField] : [messageField, screenshotField]}

              <div className="field">
                <label htmlFor="sender" className="field__label">
                  Who does it say it's from? <span className="field__optional">(optional)</span>
                </label>
                <p id="sender-hint" className="field__hint">
                  For example: my bank, a delivery company, or my grandchild.
                </p>
                <input
                  id="sender"
                  type="text"
                  className="field__input"
                  autoComplete="off"
                  value={check.claimedSender}
                  onChange={(e) => updateCheck({ claimedSender: e.target.value, result: null })}
                  aria-describedby="sender-hint"
                />
              </div>

              <button type="submit" className="btn btn--primary btn--wide">
                Check this message
                <Icon name="arrowRight" />
              </button>
            </form>

            <section className="examples" aria-labelledby="examples-title">
              <h2 id="examples-title" className="examples__title">
                Want to see how it works first?
              </h2>
              <p className="field__hint">Try one of these example messages.</p>
              <ul className="examples__list" role="list">
                {SAMPLES.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      className="chip"
                      onClick={() => loadSample(s)}
                      aria-pressed={check.sampleId === s.id}
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </Page>
  );
}
