import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { SAMPLES } from '../../shared/samples.js';
import { DEMO_RESULTS } from '../../shared/demoResults.js';

const SETTINGS_KEY = 'safecheck-settings';

export const DEFAULT_SETTINGS = {
  textSize: 'standard', // 'standard' | 'large' | 'largest'
  highContrast: false,
  reduceMotion: false,
  readSpeed: 0.9, // speech rate, slightly slower than normal by default
};

const EMPTY_CHECK = {
  text: '',
  image: null, // { dataUrl, name } once a screenshot is added
  claimedSender: '',
  sampleId: null, // set when an example message was loaded
  result: null,
};

// Settings last for this browser session only, as the brief asks.
function loadSettings() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(SETTINGS_KEY));
    return { ...DEFAULT_SETTINGS, ...saved };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

// Development only: open any page with ?preview=bank (or package, grandchild,
// appointment) to jump straight in with that example already checked.
// Removed from the production build.
function devPreviewCheck() {
  if (!import.meta.env.DEV) return EMPTY_CHECK;
  const id = new URLSearchParams(window.location.search).get('preview');
  const sample = SAMPLES.find((s) => s.id === id);
  if (!sample) return EMPTY_CHECK;
  return {
    ...EMPTY_CHECK,
    text: sample.text,
    claimedSender: sample.claimedSender,
    sampleId: sample.id,
    result: { ...DEMO_RESULTS[sample.id], demo: true },
  };
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings);
  const [check, setCheck] = useState(devPreviewCheck);
  // Polite screen-reader messages, e.g. "Example loaded". The count makes
  // repeating the same sentence still get read out.
  const [announcement, setAnnouncement] = useState({ text: '', n: 0 });
  // Demo mode: no API key on the server (or the server can't be reached).
  const [demoMode, setDemoMode] = useState(false);
  // The settings panel opens over any screen, so nothing typed is ever lost.
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    fetch('/api/health')
      .then((r) => r.json())
      .then((d) => setDemoMode(Boolean(d.demoMode)))
      .catch(() => setDemoMode(true));
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      // Private mode or blocked storage: settings still work for this page view.
    }
    const root = document.documentElement;
    root.dataset.textSize = settings.textSize;
    root.dataset.contrast = settings.highContrast ? 'high' : 'normal';
    root.dataset.motion = settings.reduceMotion ? 'reduce' : 'full';
  }, [settings]);

  const value = useMemo(
    () => ({
      settings,
      updateSettings: (patch) => setSettings((s) => ({ ...s, ...patch })),
      resetSettings: () => setSettings(DEFAULT_SETTINGS),
      check,
      updateCheck: (patch) => setCheck((c) => ({ ...c, ...patch })),
      resetCheck: () => setCheck(EMPTY_CHECK),
      announcement,
      announce: (text) => setAnnouncement((a) => ({ text, n: a.n + 1 })),
      demoMode,
      setDemoMode,
      settingsOpen,
      openSettings: () => setSettingsOpen(true),
      closeSettings: () => setSettingsOpen(false),
    }),
    [settings, check, announcement, demoMode, settingsOpen],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
