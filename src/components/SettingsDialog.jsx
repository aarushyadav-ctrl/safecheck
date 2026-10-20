import { useEffect, useRef } from 'react';
import Icon from './Icon.jsx';
import { useApp } from '../context/AppContext.jsx';
import { LANGUAGES, translate, useT } from '../i18n/index.js';
import { NATURAL_VOICES, SPEEDS, speechSupported, useSpeech } from '../lib/speech.js';

const TEXT_SIZES = ['standard', 'large', 'largest'];

const deviceReducesMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Language, text size, high contrast, reduce motion, and reading speed.
 * A native <dialog> keeps keyboard focus inside while open, closes with Esc,
 * and returns focus to the button that opened it. Changes apply right away.
 */
export default function SettingsDialog() {
  const { settings, updateSettings, resetSettings, settingsOpen, closeSettings, announce, naturalVoice } =
    useApp();
  const t = useT();
  const ref = useRef(null);
  const opener = useRef(null);
  const { speak, stop, speaking, status } = useSpeech();
  const voiceNote = !naturalVoice
    ? t('settings.voiceUnavailable')
    : settings.language !== 'en'
      ? t('settings.voiceSpanish')
      : t('settings.voiceHint');

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
          <h2 id="settings-title">{t('settings.title')}</h2>
          <button
            type="button"
            className="icon-btn"
            onClick={() => ref.current.close()}
            aria-label={t('settings.close')}
          >
            <Icon name="x" size="1.5rem" />
          </button>
        </div>
        <p className="settings__intro">{t('settings.intro')}</p>

        <fieldset className="settings__group">
          <legend>{t('settings.language')}</legend>
          <div className="speed-options">
            {LANGUAGES.map((l) => (
              <label key={l.code} className="speed-option" lang={l.code}>
                <input
                  type="radio"
                  name="language"
                  value={l.code}
                  checked={settings.language === l.code}
                  onChange={() => {
                    updateSettings({ language: l.code });
                    announce(translate(l.code, 'settings.languageChanged'));
                  }}
                />
                <span>{l.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="settings__group">
          <legend>{t('settings.textSize')}</legend>
          <div className="size-options">
            {TEXT_SIZES.map((size) => (
              <label key={size} className={`size-option size-option--${size}`}>
                <input
                  type="radio"
                  name="text-size"
                  value={size}
                  checked={settings.textSize === size}
                  onChange={() => {
                    updateSettings({ textSize: size });
                    announce(t('settings.textSizeChanged', { size: t(`settings.sizes.${size}`) }));
                  }}
                />
                <span className="size-option__sample" aria-hidden="true">
                  Aa
                </span>
                <span className="size-option__label">{t(`settings.sizes.${size}`)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="settings__group">
          <Toggle
            id="high-contrast"
            label={t('settings.contrast')}
            hint={t('settings.contrastHint')}
            checked={settings.highContrast}
            onChange={(on) => updateSettings({ highContrast: on })}
          />
          <Toggle
            id="reduce-motion"
            label={t('settings.motion')}
            hint={deviceReducesMotion() ? t('settings.motionDevice') : t('settings.motionHint')}
            checked={settings.reduceMotion}
            onChange={(on) => updateSettings({ reduceMotion: on })}
          />
        </div>

        {speechSupported && (
          <fieldset className="settings__group">
            <legend>{t('settings.voice')}</legend>
            <p className="settings__hint" id="voice-note">
              {voiceNote}
            </p>
            <div className="speed-options">
              {[...NATURAL_VOICES, 'device'].map((v) => (
                <label key={v} className="speed-option">
                  <input
                    type="radio"
                    name="voice"
                    value={v}
                    checked={settings.voice === v}
                    disabled={v !== 'device' && !naturalVoice}
                    onChange={() => {
                      stop();
                      updateSettings({ voice: v });
                    }}
                    aria-describedby="voice-note"
                  />
                  <span>{t(`settings.voices.${v}`)}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {speechSupported && (
          <fieldset className="settings__group">
            <legend>{t('settings.speed')}</legend>
            <p className="settings__hint">{t('settings.speedHint')}</p>
            <div className="speed-options">
              {SPEEDS.map((s) => (
                <label key={s.value} className="speed-option">
                  <input
                    type="radio"
                    name="read-speed"
                    value={s.value}
                    checked={settings.readSpeed === s.value}
                    onChange={() => {
                      stop();
                      updateSettings({ readSpeed: s.value });
                    }}
                  />
                  <span>{t(`settings.speeds.${s.id}`)}</span>
                </label>
              ))}
            </div>
            <button
              type="button"
              className="btn btn--secondary btn--small"
              onClick={() => (speaking ? stop() : speak(t('settings.sampleSpeech')))}
            >
              <Icon name={speaking ? 'stop' : 'speaker'} />
              {status === 'loading' ? t('speech.loading') : speaking ? t('speech.stopShort') : t('settings.hearSample')}
            </button>
          </fieldset>
        )}

        <div className="settings__actions">
          <button type="button" className="btn btn--primary" onClick={() => ref.current.close()}>
            {t('settings.done')}
          </button>
          <button
            type="button"
            className="btn btn--quiet"
            onClick={() => {
              resetSettings();
              announce(t('settings.resetDone'));
            }}
          >
            {t('settings.reset')}
          </button>
        </div>
      </div>
    </dialog>
  );
}

function Toggle({ id, label, hint, checked, onChange }) {
  const t = useT();
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
          {checked ? t('settings.on') : t('settings.off')}
        </span>
      </label>
      <p id={`${id}-hint`} className="settings__hint">
        {hint}
      </p>
    </div>
  );
}
