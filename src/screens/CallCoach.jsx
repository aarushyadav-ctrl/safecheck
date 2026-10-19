import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Page from '../components/Page.jsx';
import Icon from '../components/Icon.jsx';
import ReadAloudButton from '../components/ReadAloudButton.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useT } from '../i18n/index.js';

/**
 * "Someone is on the phone with me right now."
 * Works entirely without AI, so it is instant and always available.
 * The person taps everything the caller is asking for; the answer, a polite
 * script to end the call, and what to do afterwards update right away.
 */
export default function CallCoach() {
  const { announce } = useApp();
  const t = useT();
  const [selected, setSelected] = useState([]);
  const firstRun = useRef(true);

  const options = t('call.options');
  const chosen = options.filter((o) => selected.includes(o.id));
  const warnings = chosen.filter((o) => o.warning);
  const state = selected.length === 0 ? 'none' : warnings.length ? 'scam' : 'ok';

  // Tell screen readers the new answer after each change (a short pause
  // avoids talking over someone tapping several choices quickly).
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const id = setTimeout(() => {
      if (state === 'scam') announce(t('call.announceScam', { count: warnings.length }));
      else if (state === 'ok') announce(t('call.announceOk'));
      else announce(t('call.announceNone'));
    }, 500);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const toggle = (id) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const extras = warnings
    .filter((w) => t.has(`call.after.extra.${w.id}`))
    .map((w) => t(`call.after.extra.${w.id}`));
  const afterSteps = state === 'scam' ? [...new Set([...extras, ...t('call.after.base')])] : t('call.after.ok');
  const script = state === 'scam' ? t('call.script') : t('call.scriptOk');

  const readText = () =>
    [
      state === 'scam' ? t('call.scamTitle') : t('call.okTitle'),
      state === 'scam' ? warnings.map((w) => w.why).join(' ') : t('call.okBody'),
      t('call.scriptTitle'),
      script,
    ].join(' ');

  return (
    <Page title={t('call.pageTitle')} className="call">
      <h1>{t('call.title')}</h1>
      <p className="lead">{t('call.lead')}</p>

      <fieldset className="call-options">
        <legend className="call-options__legend">{t('call.question')}</legend>
        <p className="field__hint" id="call-hint">
          {t('call.hint')}
        </p>
        <ul className="call-options__list" role="list">
          {options.map((o) => (
            <li key={o.id}>
              <label className="call-option">
                <input
                  type="checkbox"
                  checked={selected.includes(o.id)}
                  onChange={() => toggle(o.id)}
                  aria-describedby="call-hint"
                />
                <span className="call-option__box" aria-hidden="true">
                  <Icon name="check" />
                </span>
                <span className="call-option__label">{o.label}</span>
              </label>
            </li>
          ))}
        </ul>
        {selected.length > 0 && (
          <button type="button" className="btn btn--quiet btn--small" onClick={() => setSelected([])}>
            <Icon name="x" />
            {t('call.clear')}
          </button>
        )}
      </fieldset>

      <section className="call-result" aria-labelledby="call-result-title">
        <AnimatePresence mode="wait" initial={false}>
          {state === 'none' ? (
            <motion.div key="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 id="call-result-title" className="call-result__prompt-title">
                {t('call.resultTitle')}
              </h2>
              <p className="call-result__prompt">{t('call.pickPrompt')}</p>
              <p className="call-result__prompt">
                <strong>{t('call.anytime')}</strong>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={state}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className={`verdict verdict--${state === 'scam' ? 'scam' : 'caution'}`}>
                <span className="verdict__icon">
                  <Icon name={state === 'scam' ? 'shieldAlert' : 'info'} size="2.25rem" />
                </span>
                <div>
                  <p className="verdict__eyebrow">{t('call.answerLabel')}</p>
                  <h2 id="call-result-title" className="verdict__title">
                    {state === 'scam' ? t('call.scamTitle') : t('call.okTitle')}
                  </h2>
                  <p className="verdict__summary">
                    {state === 'scam' ? t('call.scamBody') : t('call.okBody')}
                  </p>
                </div>
              </div>

              {state === 'scam' && (
                <>
                  <h3 className="call-result__sub">{t('call.whyTitle')}</h3>
                  <ul className="finding-list" role="list">
                    {warnings.map((w) => (
                      <li key={w.id} className="finding finding--danger">
                        <Icon name="shieldAlert" size="1.4rem" />
                        <div>
                          <p className="finding__level">{t('link.levels.danger')}</p>
                          <p className="finding__title">{w.label}</p>
                          <p className="finding__body">{w.why}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="script">
                <h3 className="script__title">
                  <Icon name="phone" />
                  {t('call.scriptTitle')}
                </h3>
                <blockquote className="script__text">
                  <p>{script}</p>
                </blockquote>
              </div>

              <ReadAloudButton getText={readText} />

              <h3 className="call-result__sub">{t('call.afterTitle')}</h3>
              <ol className="plain-list call-after">
                {afterSteps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <p>
                <a href="https://reportfraud.ftc.gov/" target="_blank" rel="noopener noreferrer" className="text-link">
                  {t('call.reportLink')}
                  <Icon name="external" />
                  <span className="visually-hidden"> {t('common.newTab')}</span>
                </a>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </Page>
  );
}
