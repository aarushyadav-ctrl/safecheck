import { useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useT } from '../i18n/index.js';
import { readQrFromFile } from '../lib/qr.js';
import { looksLikeLink } from '../lib/linkInspector.js';

/**
 * "Scan a QR code": the person picks or takes a photo of the code.
 * It is read in the browser with jsQR. The link inside is shown as plain
 * text and is never opened.
 */
export default function QrField({ errorId, formError }) {
  const { check, updateCheck, announce } = useApp();
  const t = useT();
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);

  async function readFile(file) {
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const found = await readQrFromFile(file);
      if (looksLikeLink(found)) {
        updateCheck({ input: 'qr', link: found, linkSource: 'qr', sampleId: null, result: null });
        announce(t('qr.foundLink', { link: found }));
      } else {
        // Some QR codes hold plain text, not a link. Check it as a message instead.
        updateCheck({ input: 'message', text: found, link: '', sampleId: null, result: null });
        announce(t('qr.foundText'));
      }
    } catch (err) {
      setError(t(`qr.errors.${err.code || 'notFound'}`));
    } finally {
      setBusy(false);
    }
  }

  const found = check.linkSource === 'qr' && check.link;
  const describedBy = ['qr-hint', formError ? errorId : null, error ? 'qr-error' : null]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="field" role="group" aria-labelledby="qr-label">
      <span className="field__label" id="qr-label">
        {t('qr.label')}
      </span>
      <p id="qr-hint" className="field__hint">
        {t('qr.hint')}
      </p>

      {/* capture lets phones open the camera straight away */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="visually-hidden"
        tabIndex={-1}
        aria-hidden="true"
        onChange={(e) => {
          readFile(e.target.files?.[0]);
          e.target.value = '';
        }}
      />

      <div
        className={`dropzone dropzone--compact${dragging ? ' is-dragging' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          readFile(e.dataTransfer.files?.[0]);
        }}
      >
        <div className="dropzone__empty">
          <button
            type="button"
            className="btn btn--secondary"
            onClick={() => inputRef.current?.click()}
            aria-describedby={describedBy}
            disabled={busy}
          >
            <Icon name="qr" />
            {busy ? t('qr.reading') : found ? t('qr.chooseAgain') : t('qr.choose')}
          </button>
          <p className="dropzone__drag-hint">{t('screenshot.drag')}</p>
        </div>
      </div>

      {found && (
        <div className="qr-found">
          <p className="qr-found__label">{t('qr.foundTitle')}</p>
          {/* Plain text on purpose: the link is never made clickable. */}
          <p className="qr-found__link message-text">{check.link}</p>
          <p className="field__hint">{t('qr.neverOpened')}</p>
        </div>
      )}

      {error && (
        <p id="qr-error" className="field__error" role="alert">
          <Icon name="alert" />
          {error}
        </p>
      )}
      {formError && (
        <p id={errorId} className="field__error" role="alert">
          <Icon name="alert" />
          {formError}
        </p>
      )}
    </div>
  );
}
