import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo.jsx';
import Icon from './Icon.jsx';
import ModeSwitch from './ModeSwitch.jsx';
import SettingsDialog from './SettingsDialog.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useT } from '../i18n/index.js';

export default function Layout({ children }) {
  const { announcement, demoMode, openSettings } = useApp();
  const t = useT();
  const navigate = useNavigate();

  // The logo always goes to the home page as a fresh visit, even from the
  // home page itself, so its entrance animations play again.
  function goHome(e) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // let "open in new tab" work
    e.preventDefault();
    navigate('/', { state: { replay: Date.now() } });
  }

  return (
    <div className="shell">
      <a className="skip-link" href="#main">
        {t('layout.skip')}
      </a>

      <header className="site-header">
        <div className="site-header__inner">
          <Link to="/" className="brand" onClick={goHome}>
            <Logo />
            <span className="brand__name">SafeCheck</span>
          </Link>

          <div className="site-header__tools">
            <ModeSwitch />
            <nav aria-label={t('layout.navLabel')} className="site-nav">
              <NavLink to="/how-it-works" className="site-nav__link">
                {t('layout.howItWorks')}
              </NavLink>
              <button type="button" className="site-nav__link" onClick={openSettings}>
                <Icon name="sliders" />
                {t('layout.settings')}
              </button>
            </nav>
          </div>
        </div>
        {demoMode && (
          <p className="demo-banner">
            <strong>{t('layout.demoTitle')}</strong> {t('layout.demoBody')}
          </p>
        )}
      </header>

      <main id="main" tabIndex={-1} className="site-main">
        {children}
      </main>

      <footer className="site-footer">
        <p>{t('layout.footerPrivacy')}</p>
        <p>{t('layout.footerMistakes')}</p>
      </footer>

      <SettingsDialog />

      <div className="visually-hidden" role="status" aria-live="polite">
        <span key={announcement.n}>{announcement.text}</span>
      </div>
    </div>
  );
}
