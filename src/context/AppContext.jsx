import { createContext, useContext, useEffect, useMemo, useState } from 'react';

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

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings);
  const [check, setCheck] = useState(EMPTY_CHECK);
  // Polite screen-reader messages, e.g. "Example loaded". The count makes
  // repeating the same sentence still get read out.
  const [announcement, setAnnouncement] = useState({ text: '', n: 0 });

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
    }),
    [settings, check, announcement],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
