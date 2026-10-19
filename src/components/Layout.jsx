import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo.jsx';
import Icon from './Icon.jsx';
import SettingsDialog from './SettingsDialog.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function Layout({ children }) {
  const { announcement, demoMode, openSettings } = useApp();

  return (
    <div className="shell">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <header className="site-header">
        <div className="site-header__inner">
          <Link to="/" className="brand">
            <Logo />
            <span className="brand__name">SafeCheck</span>
          </Link>

          <nav aria-label="Main" className="site-nav">
            <NavLink to="/how-it-works" className="site-nav__link">
              How it works
            </NavLink>
            <button type="button" className="site-nav__link" onClick={openSettings}>
              <Icon name="sliders" />
              Settings
            </button>
          </nav>
        </div>
        {demoMode && (
          <p className="demo-banner">
            <strong>Demo mode.</strong> Live checking is off, so the example messages show
            pre-written results.
          </p>
        )}
      </header>

      <main id="main" tabIndex={-1} className="site-main">
        {children}
      </main>

      <footer className="site-footer">
        <p>SafeCheck does not save your messages.</p>
        <p>It can make mistakes. If you are unsure, ask someone you trust.</p>
      </footer>

      <SettingsDialog />

      <div className="visually-hidden" role="status" aria-live="polite">
        <span key={announcement.n}>{announcement.text}</span>
      </div>
    </div>
  );
}
