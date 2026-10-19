import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Page from '../components/Page.jsx';
import Icon from '../components/Icon.jsx';
import CopyButton from '../components/CopyButton.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useT } from '../i18n/index.js';
import { slide } from './NextSteps.jsx';

const RULES = ['both', 'callBack', 'askCode'];
const MAX_CONTACTS = 5;
const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

/**
 * Family safety plan: explains AI voice-cloning scams and helps a family
 * pick a code word, trusted contacts, and a rule. Ends with a printable card
 * and a text summary. Everything stays on this device; nothing is sent or saved.
 */
export default function FamilyPlan() {
  const { announce } = useApp();
  const t = useT();
  const [step, setStep] = useState(0); // 0 = intro, 1-3 = setup, 4 = card
  const [dir, setDir] = useState(1);
  const [codeWord, setCodeWord] = useState('');
  const [codeError, setCodeError] = useState('');
  const [contacts, setContacts] = useState([{ name: '', phone: '' }]);
  const [rule, setRule] = useState('both');
  const [includeCode, setIncludeCode] = useState(false);
  const headingRef = useRef(null);
  const codeRef = useRef(null);
  const moved = useRef(false);

  useEffect(() => {
    if (!moved.current) return;
    const id = setTimeout(() => headingRef.current?.focus(), 220);
    return () => clearTimeout(id);
  }, [step]);

  function go(next) {
    if (step === 1 && next > 1 && codeWord.trim().length < 3) {
      setCodeError(t('plan.code.error'));
      codeRef.current?.focus();
      return;
    }
    setCodeError('');
    moved.current = true;
    setDir(next > step ? 1 : -1);
    setStep(next);
  }

  function suggest() {
    const words = t('plan.code.words');
    const pick = (list) => list[Math.floor(Math.random() * list.length)];
    const word = `${pick(words.first)} ${pick(words.second)}`;
    setCodeWord(word);
    setCodeError('');
    announce(t('plan.code.suggested', { word }));
  }

  const filledContacts = contacts.filter((c) => c.name.trim() || c.phone.trim());
  const ruleText = t(`plan.rule.options.${rule}.card`);

  const shareText = [
    t('plan.share.title'),
    '',
    t('plan.share.intro'),
    `${t('plan.card.ruleLabel')}: ${ruleText}`,
    includeCode ? `${t('plan.card.codeLabel')}: ${codeWord.trim()}` : t('plan.share.codeInPerson'),
    ...(filledContacts.length
      ? ['', `${t('plan.card.contactsLabel')}:`, ...filledContacts.map((c) => `- ${c.name.trim()} ${c.phone.trim()}`)]
      : []),
    '',
    t('plan.share.footer'),
  ].join('\n');

  const progress = step >= 1 && step <= 3;

  return (
    <Page title={t('plan.pageTitle')} className="plan">
      <h1>{t('plan.title')}</h1>
      <p className="lead">{t('plan.lead')}</p>

      {progress && (
        <div className="progress" aria-hidden="true">
          <div className="progress__fill" style={{ transform: `scaleX(${step / 4})` }} />
        </div>
      )}

      <AnimatePresence mode="wait" custom={dir} initial={false}>
        <motion.section
          key={step}
          className={`step-card${step === 4 ? ' step-card--plain' : ''}`}
          custom={dir}
          variants={slide}
          initial="enter"
          animate="center"
          exit="exit"
          aria-labelledby="plan-step-title"
        >
          {step === 0 && (
            <>
              <h2 id="plan-step-title" ref={headingRef} tabIndex={-1} className="step-card__title">
                {t('plan.intro.title')}
              </h2>
              {t('plan.intro.body').map((p) => (
                <p key={p}>{p}</p>
              ))}
              <h3 className="plan__sub">{t('plan.intro.planTitle')}</h3>
              <ul className="plain-list">
                {t('plan.intro.planItems').map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className="field__note">
                <Icon name="lock" />
                <span>{t('plan.privacy')}</span>
              </p>
            </>
          )}

          {step === 1 && (
            <>
              <h2 id="plan-step-title" ref={headingRef} tabIndex={-1} className="step-card__title">
                <span className="step-card__count">{t('steps.count', { n: 1, total: 3 })}</span>{' '}
                {t('plan.code.title')}
              </h2>
              <div className="field">
                <label htmlFor="code-word" className="field__label">
                  {t('plan.code.label')}
                </label>
                <p id="code-hint" className="field__hint">
                  {t('plan.code.hint')}
                </p>
                <input
                  id="code-word"
                  ref={codeRef}
                  className="field__input"
                  autoComplete="off"
                  value={codeWord}
                  onChange={(e) => {
                    setCodeWord(e.target.value);
                    setCodeError('');
                  }}
                  aria-describedby={`code-hint${codeError ? ' code-error' : ''}`}
                  aria-invalid={codeError ? 'true' : undefined}
                />
                {codeError && (
                  <p id="code-error" className="field__error" role="alert">
                    <Icon name="alert" />
                    {codeError}
                  </p>
                )}
              </div>
              <button type="button" className="btn btn--secondary btn--small" onClick={suggest}>
                <Icon name="refresh" />
                {t('plan.code.suggest')}
              </button>
              <h3 className="plan__sub">{t('plan.code.tipsTitle')}</h3>
              <ul className="plain-list">
                {t('plan.code.tips').map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </>
          )}

          {step === 2 && (
            <>
              <h2 id="plan-step-title" ref={headingRef} tabIndex={-1} className="step-card__title">
                <span className="step-card__count">{t('steps.count', { n: 2, total: 3 })}</span>{' '}
                {t('plan.contacts.title')}
              </h2>
              <p>{t('plan.contacts.lead')}</p>
              {contacts.map((c, i) => (
                <fieldset key={i} className="contact-row">
                  <legend>{t('plan.contacts.person', { n: i + 1 })}</legend>
                  <div className="contact-row__fields">
                    <div className="field">
                      <label htmlFor={`contact-name-${i}`} className="field__label field__label--small">
                        {t('plan.contacts.name')}
                      </label>
                      <input
                        id={`contact-name-${i}`}
                        className="field__input"
                        autoComplete="off"
                        value={c.name}
                        onChange={(e) =>
                          setContacts((all) => all.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))
                        }
                      />
                    </div>
                    <div className="field">
                      <label htmlFor={`contact-phone-${i}`} className="field__label field__label--small">
                        {t('plan.contacts.phone')}
                      </label>
                      <input
                        id={`contact-phone-${i}`}
                        type="tel"
                        className="field__input"
                        autoComplete="off"
                        value={c.phone}
                        onChange={(e) =>
                          setContacts((all) => all.map((x, j) => (j === i ? { ...x, phone: e.target.value } : x)))
                        }
                      />
                    </div>
                  </div>
                  {contacts.length > 1 && (
                    <button
                      type="button"
                      className="btn btn--quiet btn--small"
                      onClick={() => {
                        setContacts((all) => all.filter((_, j) => j !== i));
                        announce(t('plan.contacts.removed', { n: i + 1 }));
                      }}
                    >
                      <Icon name="trash" />
                      {t('plan.contacts.remove', { n: i + 1 })}
                    </button>
                  )}
                </fieldset>
              ))}
              {contacts.length < MAX_CONTACTS && (
                <button
                  type="button"
                  className="btn btn--secondary btn--small"
                  onClick={() => {
                    setContacts((all) => [...all, { name: '', phone: '' }]);
                    setTimeout(() => document.getElementById(`contact-name-${contacts.length}`)?.focus(), 50);
                  }}
                >
                  <Icon name="plus" />
                  {t('plan.contacts.add')}
                </button>
              )}
            </>
          )}

          {step === 3 && (
            <>
              <h2 id="plan-step-title" ref={headingRef} tabIndex={-1} className="step-card__title">
                <span className="step-card__count">{t('steps.count', { n: 3, total: 3 })}</span>{' '}
                {t('plan.rule.title')}
              </h2>
              <fieldset className="rule-options">
                <legend className="visually-hidden">{t('plan.rule.title')}</legend>
                {RULES.map((r) => (
                  <label key={r} className="rule-option">
                    <input type="radio" name="rule" value={r} checked={rule === r} onChange={() => setRule(r)} />
                    <span>
                      <span className="rule-option__title">{t(`plan.rule.options.${r}.title`)}</span>
                      <span className="rule-option__body">{t(`plan.rule.options.${r}.body`)}</span>
                    </span>
                  </label>
                ))}
              </fieldset>
            </>
          )}

          {step === 4 && (
            <>
              <h2 id="plan-step-title" ref={headingRef} tabIndex={-1} className="step-card__title">
                {t('plan.card.ready')}
              </h2>
              <p>{t('plan.card.readyBody')}</p>

              <article className="print-card" aria-label={t('plan.card.title')}>
                <p className="print-card__eyebrow">SafeCheck</p>
                <h3 className="print-card__title">{t('plan.card.title')}</h3>
                <p className="print-card__label">{t('plan.card.codeLabel')}</p>
                <p className="print-card__code">{codeWord.trim()}</p>
                <p className="print-card__label">{t('plan.card.ruleLabel')}</p>
                <p className="print-card__rule">{ruleText}</p>
                {filledContacts.length > 0 && (
                  <>
                    <p className="print-card__label">{t('plan.card.contactsLabel')}</p>
                    <ul className="print-card__contacts">
                      {filledContacts.map((c, i) => (
                        <li key={i}>
                          <strong>{c.name.trim()}</strong> {c.phone.trim()}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                <p className="print-card__label">{t('plan.card.rememberLabel')}</p>
                <ul className="print-card__tips">
                  {t('plan.card.remember').map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </article>

              <div className="button-row">
                <button type="button" className="btn btn--primary" onClick={() => window.print()}>
                  <Icon name="printer" />
                  {t('plan.card.print')}
                </button>
              </div>

              <h3 className="plan__sub">{t('plan.share.heading')}</h3>
              <div className="toggle">
                <input
                  id="include-code"
                  type="checkbox"
                  role="switch"
                  className="toggle__input"
                  checked={includeCode}
                  onChange={(e) => setIncludeCode(e.target.checked)}
                  aria-describedby="include-code-hint"
                />
                <label htmlFor="include-code" className="toggle__label">
                  <span className="toggle__text">{t('plan.share.includeCode')}</span>
                  <span className="toggle__track" aria-hidden="true">
                    <span className="toggle__knob" />
                  </span>
                  <span className="toggle__state" aria-hidden="true">
                    {includeCode ? t('settings.on') : t('settings.off')}
                  </span>
                </label>
                <p id="include-code-hint" className="settings__hint">
                  {t('plan.share.includeCodeHint')}
                </p>
              </div>
              <pre className="plan__share-text">{shareText}</pre>
              <div className="button-row">
                {canShare && (
                  <button
                    type="button"
                    className="btn btn--secondary"
                    onClick={() => navigator.share({ title: t('plan.share.title'), text: shareText }).catch(() => {})}
                  >
                    <Icon name="share" />
                    {t('ask.share')}
                  </button>
                )}
                <CopyButton label={t('plan.share.copy')} getText={() => shareText} />
              </div>
            </>
          )}
        </motion.section>
      </AnimatePresence>

      <div className="step-nav">
        {step > 0 ? (
          <button type="button" className="btn btn--secondary" onClick={() => go(step - 1)}>
            <Icon name="arrowLeft" />
            {step === 4 ? t('plan.edit') : t('common.back')}
          </button>
        ) : (
          <span />
        )}
        {step < 4 && (
          <button type="button" className="btn btn--primary" onClick={() => go(step + 1)}>
            {step === 0 ? t('plan.start') : step === 3 ? t('plan.makeCard') : t('common.nextStep')}
            <Icon name="arrowRight" />
          </button>
        )}
      </div>
    </Page>
  );
}
