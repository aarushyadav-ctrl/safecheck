import { forwardRef } from 'react';
import Icon from './Icon.jsx';
import ScreenshotField from './ScreenshotField.jsx';
import QrField from './QrField.jsx';
import { EMPTY_CHECK, useApp } from '../context/AppContext.jsx';
import { useT } from '../i18n/index.js';
import { SAMPLES } from '../../shared/samples.js';
import { prepareScreenshot } from '../lib/image.js';

const INPUTS = [
  { id: 'message', icon: 'message' },
  { id: 'link', icon: 'link' },
  { id: 'qr', icon: 'qr' },
];

/**
 * The shared check form fields, used by Simple mode (Check screen) and
 * Quick mode. One choice decides what is being checked:
 * a message (words and/or a screenshot), a link, or a QR code.
 */
const CheckInputs = forwardRef(function CheckInputs(
  { compact = false, screenshotFirst = false, formError = '', onEdit },
  firstFieldRef,
) {
  const { check, updateCheck, announce } = useApp();
  const t = useT();
  const errorId = 'form-error';

  const edit = (patch) => {
    updateCheck({ ...patch, result: null });
    onEdit?.();
  };

  // A picture pasted straight into the message box becomes the screenshot.
  async function handlePaste(e) {
    const file = [...(e.clipboardData?.files || [])].find((f) => f.type.startsWith('image/'));
    if (!file) return;
    e.preventDefault();
    try {
      edit({ image: await prepareScreenshot(file), sampleId: null });
      announce(t('check.pastedPicture'));
    } catch (err) {
      announce(t(`image.errors.${err.code || 'cantOpen'}`));
    }
  }

  const error = formError ? (
    <p id={errorId} className="field__error" role="alert">
      <Icon name="alert" />
      {formError}
    </p>
  ) : null;

  const messageField = (
    <div className="field" key="message">
      <label htmlFor="message" className="field__label">
        {t('inputs.message.label')}
      </label>
      <p id="message-hint" className="field__hint">
        {t('inputs.message.hint')}
      </p>
      <textarea
        id="message"
        ref={check.input === 'message' ? firstFieldRef : undefined}
        className="field__input field__input--message message-text"
        rows={compact ? 5 : 7}
        value={check.text}
        onChange={(e) => edit({ text: e.target.value, sampleId: null })}
        onPaste={handlePaste}
        placeholder={t('inputs.message.placeholder')}
        aria-describedby={`message-hint${formError ? ` ${errorId}` : ''}`}
        aria-invalid={formError ? 'true' : undefined}
      />
      {error}
    </div>
  );

  const screenshotField = (
    <ScreenshotField
      key="screenshot"
      compact={compact}
      image={check.image}
      onChange={(image) => edit({ image, sampleId: null })}
    />
  );

  const senderField = (
    <div className="field" key="sender">
      <label htmlFor="sender" className="field__label">
        {t('inputs.sender.label')} <span className="field__optional">{t('inputs.optional')}</span>
      </label>
      <p id="sender-hint" className="field__hint">
        {t('inputs.sender.hint')}
      </p>
      <input
        id="sender"
        type="text"
        className="field__input"
        autoComplete="off"
        value={check.claimedSender}
        onChange={(e) => edit({ claimedSender: e.target.value })}
        aria-describedby="sender-hint"
      />
    </div>
  );

  const linkField = (
    <div className="field" key="link">
      <label htmlFor="link" className="field__label">
        {t('inputs.link.label')}
      </label>
      <p id="link-hint" className="field__hint">
        {t('inputs.link.hint')}
      </p>
      <input
        id="link"
        ref={check.input === 'link' ? firstFieldRef : undefined}
        type="url"
        inputMode="url"
        className="field__input message-text"
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck="false"
        placeholder={t('inputs.link.placeholder')}
        value={check.link}
        onChange={(e) => edit({ link: e.target.value, linkSource: 'typed', sampleId: null })}
        aria-describedby={`link-hint${formError ? ` ${errorId}` : ''}`}
        aria-invalid={formError ? 'true' : undefined}
      />
      {error}
    </div>
  );

  return (
    <div className={`check-inputs${compact ? ' check-inputs--compact' : ''}`}>
      <fieldset className="input-picker">
        <legend className="input-picker__legend">{t('inputs.what')}</legend>
        <div className="input-picker__options">
          {INPUTS.map((opt) => (
            <label key={opt.id} className="input-picker__option">
              <input
                type="radio"
                name="input-kind"
                value={opt.id}
                checked={check.input === opt.id}
                onChange={() => edit({ input: opt.id })}
              />
              <Icon name={opt.icon} />
              <span>{t(`inputs.kinds.${opt.id}`)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {check.input === 'message' &&
        (screenshotFirst
          ? [screenshotField, messageField, senderField]
          : [messageField, screenshotField, senderField])}
      {check.input === 'link' && linkField}
      {check.input === 'qr' && <QrField errorId={errorId} formError={formError} />}
    </div>
  );
});

export default CheckInputs;

/** Loads an example into the shared check, ready to be checked. */
export function useLoadSample() {
  const { updateCheck, announce } = useApp();
  const t = useT();
  return (sample, focusTarget) => {
    updateCheck({
      ...EMPTY_CHECK,
      input: sample.kind === 'link' ? 'link' : 'message',
      text: sample.text || '',
      link: sample.link || '',
      linkSource: sample.link ? 'typed' : null,
      claimedSender: sample.claimedSender || '',
      sampleId: sample.id,
    });
    setTimeout(() => focusTarget?.current?.focus(), 50);
    announce(t('check.exampleLoaded', { label: t(`samples.${sample.id}`) }));
  };
}

/** "Try an example" buttons: a mix of messages older and younger people get. */
export function ExampleChips({ onLoad, headingLevel = 'h2', compact = false }) {
  const { check } = useApp();
  const t = useT();
  const Heading = headingLevel;
  return (
    <section
      className={`examples${compact ? ' examples--compact' : ''}`}
      aria-labelledby="examples-title"
    >
      <Heading id="examples-title" className="examples__title">
        {compact ? t('examples.titleShort') : t('examples.title')}
      </Heading>
      {!compact && <p className="field__hint">{t('examples.hint')}</p>}
      <ul className="examples__list" role="list">
        {SAMPLES.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              className="chip"
              onClick={() => onLoad(s)}
              aria-pressed={check.sampleId === s.id}
            >
              {s.kind === 'link' && <Icon name="link" />}
              {t(`samples.${s.id}`)}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
