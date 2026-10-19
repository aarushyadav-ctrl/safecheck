import { useEffect, useState } from 'react';

const PHASES = [
  'Looking at the links…',
  'Checking for pressure to act fast…',
  'Looking for requests for money…',
  'Comparing it with common scams…',
];

/**
 * The "checking" view: a message card with a gold line slowly reading down it.
 * Screen readers hear one calm announcement (sent by the Check screen),
 * not every changing phrase, so the phrases below are hidden from them.
 */
export default function Analyzing({ hasImage, onCancel }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 1) % PHASES.length), 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="analyzing">
      <div className="scan-card" aria-hidden="true">
        <span className="scan-card__line" style={{ width: '92%' }} />
        <span className="scan-card__line" style={{ width: '78%' }} />
        <span className="scan-card__line" style={{ width: '85%' }} />
        <span className="scan-card__line" style={{ width: '54%' }} />
        <span className="scan-card__beam" />
      </div>

      <p className="analyzing__phase" aria-hidden="true" key={phase}>
        {hasImage && phase === 0 ? 'Reading your screenshot…' : PHASES[phase]}
      </p>
      <p className="analyzing__note">This usually takes a few seconds.</p>

      <button type="button" className="btn btn--quiet" onClick={onCancel}>
        Stop checking
      </button>
    </div>
  );
}
