import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Page from '../components/Page.jsx';
import Icon from '../components/Icon.jsx';

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 + i * 0.07, duration: 0.42, ease: [0.22, 1, 0.36, 1] },
  }),
};

const START_OPTIONS = [
  {
    to: '/check?mode=paste',
    icon: 'message',
    title: 'Paste a message',
    hint: 'Copy the words from a text or email.',
  },
  {
    to: '/check?mode=screenshot',
    icon: 'image',
    title: 'Upload a screenshot',
    hint: 'Use a picture of the message.',
  },
];

export default function Home() {
  return (
    <Page title="Check a message" className="home">
      <h1 className="home__title">
        Not sure if a message is a scam?{' '}
        <span className="home__title-soft">Let's check it together.</span>
      </h1>
      <p className="lead">
        Show us the message. We'll tell you in plain words if it looks like a scam, and what to
        do next.
      </p>

      <ul className="start-options" role="list">
        {START_OPTIONS.map((opt, i) => (
          <motion.li key={opt.to} custom={i} variants={rise} initial="hidden" animate="show">
            <Link to={opt.to} className="start-option">
              <span className="start-option__icon">
                <Icon name={opt.icon} size="1.6rem" />
              </span>
              <span className="start-option__text">
                <span className="start-option__title">{opt.title}</span>
                <span className="start-option__hint">{opt.hint}</span>
              </span>
              <Icon name="arrowRight" className="start-option__arrow" />
            </Link>
          </motion.li>
        ))}
      </ul>

      <p className="privacy-note">
        <Icon name="lock" />
        <span>Your message is only used to check it. We don't save it.</span>
      </p>

      <ExampleResult />

      <nav aria-label="More help" className="home__links">
        <Link to="/how-it-works" className="text-link">
          <Icon name="book" />
          How it works
        </Link>
      </nav>
    </Page>
  );
}

/*
  A small preview of what a result looks like: a real scam text with its
  warning signs marked by a highlighter, numbered, and explained.
*/
function ExampleResult() {
  return (
    <figure className="example-result">
      <figcaption className="example-result__caption">
        Here's what you'll see: the warning signs, marked and explained.
      </figcaption>

      <div className="sms">
        <p className="sms__from">Text from +1 (202) 555-0147</p>
        <p className="sms__body message-text">
          USPS: Your package is on hold.{' '}
          <mark className="flag" style={{ '--i': 0 }}>
            Pay a $1.99 fee
            <span className="flag__num" aria-hidden="true">1</span>
            <span className="visually-hidden"> (warning sign 1)</span>
          </mark>{' '}
          to release it:{' '}
          <mark className="flag" style={{ '--i': 1 }}>
            usps-redelivery.co
            <span className="flag__num" aria-hidden="true">2</span>
            <span className="visually-hidden"> (warning sign 2)</span>
          </mark>
        </p>
      </div>

      <ol className="flag-list">
        <li style={{ '--i': 0 }}>
          <span className="flag-list__num" aria-hidden="true">1</span>
          <span>
            <strong>Asks for money.</strong> The real post office does not text you for fees.
          </span>
        </li>
        <li style={{ '--i': 1 }}>
          <span className="flag-list__num" aria-hidden="true">2</span>
          <span>
            <strong>Fake website.</strong> The real one is usps.com, not this.
          </span>
        </li>
      </ol>
    </figure>
  );
}
