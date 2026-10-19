import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';
import Icon from '../components/Icon.jsx';

const HOW = [
  {
    title: 'You show us the message',
    body: 'Paste the words, or add a screenshot. You can also tell us who it says it is from.',
  },
  {
    title: 'We look for warning signs',
    body: 'SafeCheck uses AI to read the message. It looks for the tricks scammers use most.',
  },
  {
    title: 'You get a clear answer',
    body: 'You see "Likely a scam", "Be careful", or "Looks safe", the warning signs marked in your message, and what to do next.',
  },
];

const WARNING_SIGNS = [
  {
    title: 'A rush or a threat',
    body: '"Act now", "within 24 hours", or "your account will be closed". Scammers rush you so you don\'t stop to think.',
  },
  {
    title: 'Asking for gift cards, wire transfers, or crypto',
    body: 'Real companies, government offices, and family never ask you to pay this way.',
  },
  {
    title: 'Asking for passwords, codes, or personal details',
    body: 'Never share a code sent to your phone, your bank login, or your Social Security or Medicare number.',
  },
  {
    title: 'A link that looks almost right',
    body: 'Like "usps-redelivery-help.com" instead of "usps.com". Type the real website yourself instead.',
  },
  {
    title: '"Don\'t tell anyone"',
    body: 'Scammers ask you to keep it secret so nobody can warn you.',
  },
  {
    title: 'A family emergency from a new number',
    body: 'Call your family member on the number you already have before you do anything.',
  },
  {
    title: 'A prize you never entered',
    body: 'If you have to pay a fee to get a prize, it is not a prize.',
  },
];

export default function HowItWorks() {
  return (
    <Page title="How it works" className="how">
      <h1>How SafeCheck works</h1>
      <p className="lead">
        SafeCheck helps you decide if a text or email is a scam, and tells you what to do next.
      </p>

      <section aria-labelledby="how-steps">
        <h2 id="how-steps">Three simple steps</h2>
        <ol className="how-steps" role="list">
          {HOW.map((s, i) => (
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

      <section aria-labelledby="how-limits" className="how__section">
        <h2 id="how-limits">What SafeCheck can't do</h2>
        <ul className="plain-list">
          <li>It can make mistakes. A scam can look normal, and a real message can look strange.</li>
          <li>It can't see where a link really goes, or who really sent the message.</li>
          <li>It can't stop a scam or get money back. The steps we give you can help with that.</li>
        </ul>
        <p>
          <strong>If something feels wrong, trust that feeling.</strong> Ask someone you trust, or
          call the company using a number you already have.
        </p>
      </section>

      <section aria-labelledby="how-privacy" className="how__section how__privacy">
        <Icon name="lock" size="1.75rem" />
        <div>
          <h2 id="how-privacy">Your privacy</h2>
          <p>
            Your message is sent only to check it. We don't save it, we don't keep a history, and
            there is no account to sign up for. When you close this window, it's gone.
          </p>
        </div>
      </section>

      <section aria-labelledby="how-signs" className="how__section">
        <h2 id="how-signs">Common warning signs</h2>
        <p>Scams change, but most use the same few tricks. Watch for these:</p>
        <ul className="sign-list" role="list">
          {WARNING_SIGNS.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how-help" className="how__section">
        <h2 id="how-help">Where to get help</h2>
        <ul className="plain-list">
          <li>
            <strong>Report a scam:</strong>{' '}
            <a href="https://reportfraud.ftc.gov/" target="_blank" rel="noopener noreferrer">
              reportfraud.ftc.gov
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <strong>Scam texts:</strong> forward them to 7726 (it spells SPAM).
          </li>
          <li>
            <strong>Talk to someone:</strong> the free AARP Fraud Watch Network Helpline,{' '}
            <a href="tel:+18779083360">877-908-3360</a>.
          </li>
          <li>
            <strong>If you shared personal details:</strong>{' '}
            <a href="https://www.identitytheft.gov/" target="_blank" rel="noopener noreferrer">
              IdentityTheft.gov
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>{' '}
            gives you a step-by-step recovery plan.
          </li>
        </ul>
      </section>

      <Link to="/check" className="btn btn--primary">
        Check a message
        <Icon name="arrowRight" />
      </Link>
    </Page>
  );
}
