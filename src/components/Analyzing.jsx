import { useEffect, useState } from 'react';
import { useT } from '../i18n/index.js';

/**
 * The "checking" view: a message card with a gold line slowly reading down it.
 * Screen readers hear one calm announcement (sent when the check starts),
 * not every changing phrase, so the phrases below are hidden from them.
 */
export default function Analyzing({ hasImage, isLink, onCancel, compact = false }) {
  const t = useT();
  const [phase, setPhase] = useState(0);
  const phases = isLink ? t('analyzing.linkPhases') : t('analyzing.phases');

  useEffect(() => {
    const id = setInterval(() => setPhase((p) => p + 1), 1500);
    return () => clearInterval(id);
  }, []);

  const text =
    hasImage && phase === 0 ? t('analyzing.screenshot') : phases[phase % phases.length];

  return (
    <div className={`analyzing${compact ? ' analyzing--compact' : ''}`}>
      <div className="scan-card" aria-hidden="true">
        <span className="scan-card__line" style={{ width: '92%' }} />
        <span className="scan-card__line" style={{ width: '78%' }} />
        {!compact && <span className="scan-card__line" style={{ width: '85%' }} />}
        {!compact && <span className="scan-card__line" style={{ width: '54%' }} />}
        <span className="scan-card__beam" />
      </div>

      <div>
        <p className="analyzing__phase" aria-hidden="true" key={phase}>
          {text}
        </p>
        <p className="analyzing__note">{t('analyzing.note')}</p>
        <button type="button" className="btn btn--quiet" onClick={onCancel}>
          {t('analyzing.stop')}
        </button>
      </div>
    </div>
  );
}
