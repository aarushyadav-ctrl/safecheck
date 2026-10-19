import { useNavigate } from 'react-router-dom';
import Page from './Page.jsx';
import Icon from './Icon.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useT } from '../i18n/index.js';

const MODES = [
  { id: 'simple', icon: 'list' },
  { id: 'quick', icon: 'zap' },
];

/** First visit: "How would you like to use SafeCheck?" */
export default function ModeChooser() {
  const { setMode, announce } = useApp();
  const t = useT();
  const navigate = useNavigate();

  function choose(mode) {
    setMode(mode);
    announce(t('mode.switched', { mode: t(`mode.${mode}.name`) }));
    if (mode === 'quick') {
      navigate('/quick');
    } else {
      // Same address, new content: move focus to the new heading.
      setTimeout(() => {
        const h1 = document.querySelector('main h1');
        h1?.setAttribute('tabindex', '-1');
        h1?.focus();
      }, 450);
    }
  }

  return (
    <Page title={t('chooser.title')} className="chooser">
      <h1>{t('chooser.title')}</h1>
      <p className="lead">{t('chooser.lead')}</p>

      <ul className="mode-options" role="list">
        {MODES.map((m) => (
          <li key={m.id}>
            <button type="button" className="mode-option" onClick={() => choose(m.id)}>
              <span className="mode-option__icon">
                <Icon name={m.icon} size="1.75rem" />
              </span>
              <span className="mode-option__name">{t(`mode.${m.id}.name`)}</span>
              <span className="mode-option__desc">{t(`mode.${m.id}.desc`)}</span>
              <span className="mode-option__best">{t(`mode.${m.id}.bestFor`)}</span>
            </button>
          </li>
        ))}
      </ul>

      <p className="chooser__note">
        <Icon name="info" />
        <span>{t('chooser.note')}</span>
      </p>
    </Page>
  );
}
