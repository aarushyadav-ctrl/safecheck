import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';
import Icon from '../components/Icon.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useT } from '../i18n/index.js';

export default function HowItWorks() {
  const { mode } = useApp();
  const t = useT();
  const steps = t('how.steps');
  const limits = t('how.limits');
  const signs = t('how.signs');
  const help = t('how.help');

  return (
    <Page title={t('how.pageTitle')} className="how">
      <h1>{t('how.title')}</h1>
      <p className="lead">{t('how.lead')}</p>

      <section aria-labelledby="how-steps">
        <h2 id="how-steps">{t('how.stepsTitle')}</h2>
        <ol className="how-steps" role="list">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="how-steps__num" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="how-modes" className="how__section">
        <h2 id="how-modes">{t('how.modesTitle')}</h2>
        <ul className="plain-list">
          <li>
            <strong>{t('mode.simple.name')}:</strong> {t('mode.simple.desc')}
          </li>
          <li>
            <strong>{t('mode.quick.name')}:</strong> {t('mode.quick.desc')}
          </li>
        </ul>
        <p>{t('how.modesNote')}</p>
      </section>

      <section aria-labelledby="how-limits" className="how__section">
        <h2 id="how-limits">{t('how.limitsTitle')}</h2>
        <ul className="plain-list">
          {limits.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <p>
          <strong>{t('how.trustFeeling')}</strong> {t('how.trustFeelingBody')}
        </p>
      </section>

      <section aria-labelledby="how-privacy" className="how__section how__privacy">
        <Icon name="lock" size="1.75rem" />
        <div>
          <h2 id="how-privacy">{t('how.privacyTitle')}</h2>
          <p>{t('how.privacyBody')}</p>
          <p>{t('how.privacyRedact')}</p>
        </div>
      </section>

      <section aria-labelledby="how-signs" className="how__section">
        <h2 id="how-signs">{t('how.signsTitle')}</h2>
        <p>{t('how.signsLead')}</p>
        <ul className="sign-list" role="list">
          {signs.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how-help" className="how__section">
        <h2 id="how-help">{t('how.helpTitle')}</h2>
        <ul className="plain-list">
          {help.map((h) => {
            const external = h.href?.startsWith('http');
            return (
              <li key={h.label}>
                <strong>{h.label}</strong> {h.before}
                {h.href && (
                  <a href={h.href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {h.linkText}
                    {external && <span className="visually-hidden"> {t('common.newTab')}</span>}
                  </a>
                )}
                {h.after}
              </li>
            );
          })}
        </ul>
      </section>

      <Link to={mode === 'quick' ? '/quick' : '/check'} className="btn btn--primary">
        {t('results.noneAction')}
        <Icon name="arrowRight" />
      </Link>
    </Page>
  );
}
