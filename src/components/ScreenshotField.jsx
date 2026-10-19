import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Icon from './Icon.jsx';
import { useApp } from '../context/AppContext.jsx';
import { prepareScreenshot } from '../lib/image.js';

/**
 * Screenshot picker with preview. Drag-and-drop works on desktop, but the
 * "Choose a screenshot" button always works too (keyboard, touch, mouse).
 */
export default function ScreenshotField({ image, onChange }) {
  const { announce } = useApp();
  const inputRef = useRef(null);
  const chooseRef = useRef(null);
  const replaceRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function addFile(file) {
    if (!file) return;
    setError('');
    setBusy(true);
    try {
      const prepared = await prepareScreenshot(file);
      onChange(prepared);
      announce('Screenshot added.');
      // The choose button is replaced by the preview, so move focus onto it.
      setTimeout(() => replaceRef.current?.focus(), 200);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  function remove() {
    onChange(null);
    setError('');
    announce('Screenshot removed.');
    // The preview disappears, so put focus somewhere sensible.
    requestAnimationFrame(() => chooseRef.current?.focus());
  }

  function onDrop(e) {
    e.preventDefault();
    setDragging(false);
    addFile(e.dataTransfer.files?.[0]);
  }

  return (
    <div className="field" role="group" aria-labelledby="shot-label">
      <span className="field__label" id="shot-label">
        Screenshot <span className="field__optional">(optional if you pasted the words)</span>
      </span>
      <p id="shot-hint" className="field__hint">
        A picture of the message from your phone or computer.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="visually-hidden"
        tabIndex={-1}
        aria-hidden="true"
        onChange={(e) => {
          addFile(e.target.files?.[0]);
          e.target.value = ''; // lets the same file be chosen again
        }}
      />

      <div
        className={`dropzone${dragging ? ' is-dragging' : ''}${image ? ' has-image' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        <AnimatePresence mode="wait" initial={false}>
          {image ? (
            <motion.figure
              key="preview"
              className="shot-preview"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.12 } }}
            >
              <img src={image.dataUrl} alt="Your screenshot" className="shot-preview__img" />
              <figcaption className="shot-preview__name">{image.name}</figcaption>
              <div className="shot-preview__actions">
                <button
                  type="button"
                  ref={replaceRef}
                  className="btn btn--secondary btn--small"
                  onClick={() => inputRef.current?.click()}
                  disabled={busy}
                >
                  <Icon name="refresh" />
                  Replace screenshot
                </button>
                <button type="button" className="btn btn--quiet btn--small" onClick={remove}>
                  <Icon name="x" />
                  Remove screenshot
                </button>
              </div>
            </motion.figure>
          ) : (
            <motion.div
              key="empty"
              className="dropzone__empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
            >
              <Icon name="upload" size="2rem" className="dropzone__icon" />
              <button
                ref={chooseRef}
                type="button"
                className="btn btn--secondary"
                onClick={() => inputRef.current?.click()}
                aria-describedby="shot-hint"
                disabled={busy}
              >
                <Icon name="image" />
                {busy ? 'Adding screenshot…' : 'Choose a screenshot'}
              </button>
              <p className="dropzone__drag-hint">or drag a picture here</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <p className="field__error" role="alert">
          <Icon name="alert" />
          {error}
        </p>
      )}
    </div>
  );
}
