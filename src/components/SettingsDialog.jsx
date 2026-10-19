import { useEffect, useRef } from 'react';
import Icon from './Icon.jsx';
import { useApp } from '../context/AppContext.jsx';
import { speechSupported, useSpeech } from '../lib/speech.js';

const TEXT_SIZES = [
  { value: 'standard', label: 'Standard' },
  { value: 'large', label: 'Large' },
  { value: 'largest', label: 'Largest' },
];

const SPEEDS = [
  { value: 0.7, label: 'Slow' },
  { value: 0.9, label: 'Normal' },
  { value: 1.1, label: 'Fast' },
];

const deviceReducesMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Text size, high contrast, reduce motion, and reading speed.
 * A native <dialog> keeps keyboard focus inside while open, closes with Esc,
 * and returns focus to the button that opened it. Changes apply right away.
 */
export default function SettingsDialog() {
  const { settings, updateSettings, resetSettings, settingsOpen, closeSettings, announce } =
    useApp();
  const ref = useRef(null);
  const opener = useRef(null);
  const { speak, stop, speaking } = useSpeech();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (settingsOpen && !dialog.open) {
      opener.current = document.activeElement;
      dialog.showModal();
    } else if (!settingsOpen && dialog.open) {
      dialog.close();
    }
  }, [settingsOpen]);

  function handleClose() {
    stop();
    closeSettings();
    opener.current?.focus?.();
  }

  return (
    <dialog
      ref={ref}
      className="settings"
      aria-labelledby="settings-title"
      onClose={handleClose}
      // A click on the dimmed area outside the panel closes it.
      onClick={(e) => e.target === ref.current && ref.current.close()}
    >
      <div className="settings__inner">
        <div className="settings__head">
          <h2 id="settings-title">Text size and display</h2>
          <button
            type="button"
            className="icon-btn"
            onClick={() => ref.current.close()}
            aria-label="Close settings"
          >
            <Icon name="x" size="1.5rem" />
          </button>
        </div>
        <p className="settings__intro">Changes happen right away and stay while this window is open.</p>

        <fieldset className="settings__group">
          <legend>Text size</legend>
          <div className="size-options">
            {TEXT_SIZES.map((s) => (
              <label key={s.value} className={`size-option size-option--${s.value}`}>
                <input
                  type="radio"
                  name="text-size"
                  value={s.value}
                  checked={settings.textSize === s.value}
                  onChange={() => {
                    updateSettings({ textSize: s.value });
                    announce(`Text size: ${s.label}.`);
                  }}
                />
                <span className="size-option__sample" aria-hidden="true">
                  Aa
                </span>
                <span className="size-option__label">{s.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="settings__group">
          <Toggle
            label="High contrast"
            hint="Black text on white with stronger lines."
            checked={settings.highContrast}
            onChange={(on) => updateSettings({ highContrast: on })}
          />
          <Toggle
            label="Reduce motion"
            hint={
              deviceReducesMotion()
                ? 'Your device already asks for less motion, so SafeCheck uses less motion too.'
                : 'Turns off moving and sliding effects.'
            }
            checked={settings.reduceMotion}
            onChange={(on) => updateSettings({ reduceMotion: on })}
          />
        </div>

        {speechSupported && (
          <fieldset className="settings__group">
            <legend>Reading speed</legend>
            <p className="settings__hint">How fast "Read this to me" talks.</p>
            <div className="speed-options">
              {SPEEDS.map((s) => (
                <label key={s.value} className="speed-option">
                  <input
                    type="radio"
                    name="read-speed"
                    value={s.value}
                    checked={settings.readSpeed === s.value}
                    onChange={() => updateSettings({ readSpeed: s.value })}
                  />
                  <span>{s.label}</span>
                </label>
              ))}
            </div>
            <button
              type="button"
              className="btn btn--secondary btn--small"
              onClick={() =>
                speaking ? stop() : speak('This is how fast SafeCheck will read to you.')
              }
            >
              <Icon name={speaking ? 'stop' : 'speaker'} />
              {speaking ? 'Stop' : 'Hear a sample'}
            </button>
          </fieldset>
        )}

        <div className="settings__actions">
          <button type="button" className="btn btn--primary" onClick={() => ref.current.close()}>
            Done
          </button>
          <button
            type="button"
            className="btn btn--quiet"
            onClick={() => {
              resetSettings();
              announce('Settings reset.');
            }}
          >
            Reset to normal
          </button>
        </div>
      </div>
    </dialog>
  );
}

function Toggle({ label, hint, checked, onChange }) {
  const id = `toggle-${label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div className="toggle">
      <input
        id={id}
        type="checkbox"
        role="switch"
        className="toggle__input"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-describedby={`${id}-hint`}
      />
      <label htmlFor={id} className="toggle__label">
        <span className="toggle__text">{label}</span>
        <span className="toggle__track" aria-hidden="true">
          <span className="toggle__knob" />
        </span>
        <span className="toggle__state" aria-hidden="true">
          {checked ? 'On' : 'Off'}
        </span>
      </label>
      <p id={`${id}-hint`} className="settings__hint">
        {hint}
      </p>
    </div>
  );
}
