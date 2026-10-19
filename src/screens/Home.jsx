import { Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Page from '../components/Page.jsx';
import Icon from '../components/Icon.jsx';
import ModeChooser from '../components/ModeChooser.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useT } from '../i18n/index.js';

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 + i * 0.06, duration: 0.42, ease: [0.22, 1, 0.36, 1] },
  }),
};

const START_OPTIONS = [
  { to: '/check?mode=paste', icon: 'message', id: 'paste' },
  { to: '/check?mode=screenshot', icon: 'image', id: 'screenshot' },
  { to: '/check?mode=link', icon: 'link', id: 'link' },
  { to: '/check?mode=qr', icon: 'qr', id: 'qr' },
];

const TOOLS = [
  { to: '/practice', icon: 'award', id: 'practice' },
  { to: '/family-plan', icon: 'key', id: 'plan' },
  { to: '/how-it-works', icon: 'book', id: 'how' },
];

/** The start screen: first-visit choice, Quick mode, or the Simple home. */
export default function Home() {
  const { mode } = useApp();
  if (mode === null) return <ModeChooser />;
  if (mode === 'quick') return <Navigate to="/quick" replace />;
  return <SimpleHome />;
}

function SimpleHome() {
  const { openSettings } = useApp();
  const t = useT();
  return (
    <Page title={t('home.pageTitle')} className="home">
      <h1 className="home__title">
        {t('home.title')} <span className="home__title-soft">{t('home.titleSoft')}</span>
      </h1>
      <p className="lead">{t('home.lead')}</p>

      <h2 className="visually-hidden">{t('home.startHeading')}</h2>
      <ul className="start-options" role="list">
        {START_OPTIONS.map((opt, i) => (
          <motion.li key={opt.to} custom={i} variants={rise} initial="hidden" animate="show">
            <Link to={opt.to} className="start-option">
              <span className="start-option__icon">
                <Icon name={opt.icon} size="1.6rem" />
              </span>
              <span className="start-option__text">
                <span className="start-option__title">{t(`home.options.${opt.id}.title`)}</span>
                <span className="start-option__hint">{t(`home.options.${opt.id}.hint`)}</span>
              </span>
              <Icon name="arrowRight" className="start-option__arrow" />
            </Link>
          </motion.li>
        ))}
      </ul>

      <motion.div custom={4} variants={rise} initial="hidden" animate="show">
        <Link to="/call" className="call-cta">
          <span className="call-cta__icon">
            <Icon name="phone" size="1.6rem" />
          </span>
          <span className="start-option__text">
            <span className="start-option__title">{t('home.call.title')}</span>
            <span className="start-option__hint">{t('home.call.hint')}</span>
          </span>
          <Icon name="arrowRight" className="start-option__arrow" />
        </Link>
      </motion.div>

      <p className="privacy-note">
        <Icon name="lock" />
        <span>{t('home.privacy')}</span>
      </p>

      <ExampleResult />

      <section aria-labelledby="tools-title" className="tools">
        <h2 id="tools-title" className="tools__title">
          {t('home.toolsTitle')}
        </h2>
        <ul className="tools__list" role="list">
          {TOOLS.map((tool) => (
            <li key={tool.id}>
              <Link to={tool.to} className="tool-link">
                <Icon name={tool.icon} size="1.4rem" />
                <span>
                  <span className="tool-link__title">{t(`home.tools.${tool.id}.title`)}</span>
                  <span className="tool-link__hint">{t(`home.tools.${tool.id}.hint`)}</span>
                </span>
              </Link>
            </li>
          ))}
          <li>
            <button type="button" className="tool-link" onClick={openSettings}>
              <Icon name="sliders" size="1.4rem" />
              <span>
                <span className="tool-link__title">{t('home.tools.settings.title')}</span>
                <span className="tool-link__hint">{t('home.tools.settings.hint')}</span>
              </span>
            </button>
          </li>
        </ul>
      </section>
    </Page>
  );
}

/*
  A small preview of what a result looks like: a real scam text with its
  warning signs marked by a highlighter, numbered, and explained.
*/
function ExampleResult() {
  const t = useT();
  return (
    <figure className="example-result">
      <figcaption className="example-result__caption">{t('home.example.caption')}</figcaption>

      <div className="sms">
        <p className="sms__from">{t('home.example.from')}</p>
        <p className="sms__body message-text" lang="en">
          USPS: Your package is on hold.{' '}
          <mark className="flag" style={{ '--i': 0 }}>
            Pay a $1.99 fee
            <span className="flag__num" aria-hidden="true">
              1
            </span>
            <span className="visually-hidden"> ({t('results.signNumber', { n: 1 })})</span>
          </mark>{' '}
          to release it:{' '}
          <mark className="flag" style={{ '--i': 1 }}>
            usps-redelivery.co
            <span className="flag__num" aria-hidden="true">
              2
            </span>
            <span className="visually-hidden"> ({t('results.signNumber', { n: 2 })})</span>
          </mark>
        </p>
      </div>

      <ol className="flag-list">
        <li style={{ '--i': 0 }}>
          <span className="flag-list__num" aria-hidden="true">
            1
          </span>
          <span>
            <strong>{t('home.example.sign1Title')}</strong> {t('home.example.sign1Body')}
          </span>
        </li>
        <li style={{ '--i': 1 }}>
          <span className="flag-list__num" aria-hidden="true">
            2
          </span>
          <span>
            <strong>{t('home.example.sign2Title')}</strong> {t('home.example.sign2Body')}
          </span>
        </li>
      </ol>
    </figure>
  );
}
