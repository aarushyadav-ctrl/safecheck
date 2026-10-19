import { useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Page from '../components/Page.jsx';
import Icon from '../components/Icon.jsx';
import ScreenshotField from '../components/ScreenshotField.jsx';
import { useApp } from '../context/AppContext.jsx';
import { SAMPLES } from '../../shared/samples.js';
import { prepareScreenshot } from '../lib/image.js';

export default function Check() {
  const [params] = useSearchParams();
  const screenshotFirst = params.get('mode') === 'screenshot';
  const navigate = useNavigate();
  const { check, updateCheck, announce } = useApp();

  const [formError, setFormError] = useState('');
  const textRef = useRef(null);

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

  function handleSubmit(e) {
    e.preventDefault();
    if (!check.text.trim() && !check.image) {
      setFormError('Please paste the message or add a screenshot first.');
      textRef.current?.focus();
      return;
    }
    setFormError('');
    // Step 3 adds the "checking" state and the real analysis here.
    updateCheck({ result: null });
    navigate('/results');
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
    <Page title="Check a message" className="check">
      <h1>Check a message</h1>
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
    </Page>
  );
}
