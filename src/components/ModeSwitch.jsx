import { useLocation, useNavigate } from 'react-router-dom';
import Icon from './Icon.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useT } from '../i18n/index.js';

const MODES = [
  { id: 'simple', icon: 'list' },
  { id: 'quick', icon: 'zap' },
];

// Screens that belong to one mode's way of checking a message.
const SIMPLE_CHECK_SCREENS = ['/', '/check', '/results', '/next-steps'];

/**
 * "Simple | Quick" switch, in the header on every screen.
 * Switching keeps the message and its result, because both modes share them.
 */
export default function ModeSwitch() {
  const { mode, setMode, check, announce } = useApp();
  const t = useT();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const current = mode; // null until the person chooses: neither button is pressed yet

  function choose(next) {
    if (next === current) return;
    setMode(next);
    announce(t('mode.switched', { mode: t(`mode.${next}.name`) }));
    if (next === 'quick' && SIMPLE_CHECK_SCREENS.includes(pathname)) {
      navigate('/quick');
    } else if (next === 'simple' && pathname === '/quick') {
      const hasInput = check.text.trim() || check.image || check.link.trim();
      navigate(check.result ? '/results' : hasInput ? '/check' : '/');
    }
  }

  return (
    <div className="mode-switch" role="group" aria-label={t('mode.switchLabel')}>
      {MODES.map((m) => (
        <button
          key={m.id}
          type="button"
          className="mode-switch__btn"
          aria-pressed={current === m.id}
          onClick={() => choose(m.id)}
        >
          <Icon name={m.icon} />
          {t(`mode.${m.id}.name`)}
        </button>
      ))}
    </div>
  );
}
