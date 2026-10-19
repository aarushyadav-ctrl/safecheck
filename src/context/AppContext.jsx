import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { SAMPLES } from '../../shared/samples.js';
import { DEMO_RESULTS } from '../../shared/demoResults.js';
import { inspectLink } from '../lib/linkInspector.js';

const SETTINGS_KEY = 'safecheck-settings';
const MODE_KEY = 'safecheck-mode';

export const DEFAULT_SETTINGS = {
  textSize: 'standard', // 'standard' | 'large' | 'largest'
  highContrast: false,
  reduceMotion: false,
  readSpeed: 0.9, // speech rate, slightly slower than normal by default
  language: 'en', // 'en' | 'es'
};

// One shared "current check" used by both Simple and Quick mode, so switching
// modes never loses the message or its result.
export const EMPTY_CHECK = {
  input: 'message', // 'message' (text and/or screenshot) | 'link' (typed) | 'qr' (link from a QR photo)
  text: '',
  image: null, // { dataUrl, name } once a screenshot is added
  link: '',
  linkSource: null, // 'typed' | 'qr'
  claimedSender: '',
  sampleId: null, // set when an example message was loaded
  result: null,
  linkReport: null, // local link inspection, made in the browser
  sentText: '', // the text actually sent, after private details were hidden
  redactions: [], // [{ type }] for each hidden item
};

// Settings and the chosen mode last for this browser session only.
function loadSettings() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(SETTINGS_KEY));
    return { ...DEFAULT_SETTINGS, ...saved };
  } catch {
    return DEFAULT_SETTINGS;
  }
}
function loadMode() {
  try {
    const saved = sessionStorage.getItem(MODE_KEY);
    return saved === 'simple' || saved === 'quick' ? saved : null;
  } catch {
    return null;
  }
}

// Development only: open any page with ?preview=bank (or any example id)
// to jump straight in with that example already checked.
// Removed from the production build.
function devPreviewCheck() {
  if (!import.meta.env.DEV) return EMPTY_CHECK;
  const id = new URLSearchParams(window.location.search).get('preview');
  const sample = SAMPLES.find((s) => s.id === id);
  if (!sample) return EMPTY_CHECK;
  return {
    ...EMPTY_CHECK,
    input: sample.kind === 'link' ? 'link' : 'message',
    text: sample.text || '',
    link: sample.link || '',
    linkSource: sample.link ? 'typed' : null,
    claimedSender: sample.claimedSender || '',
    sampleId: sample.id,
    sentText: sample.text || '',
    linkReport: sample.link ? inspectLink(sample.link) : null,
    result: { ...DEMO_RESULTS[sample.id], demo: true },
  };
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings);
  const [mode, setModeState] = useState(loadMode); // null until the person chooses
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
    // Screen readers use this to pronounce the page in the right language.
    root.lang = settings.language;
  }, [settings]);

  const value = useMemo(
    () => ({
      settings,
      updateSettings: (patch) => setSettings((s) => ({ ...s, ...patch })),
      // "Reset to normal" keeps the chosen language.
      resetSettings: () => setSettings((s) => ({ ...DEFAULT_SETTINGS, language: s.language })),
      mode,
      setMode: (m) => {
        setModeState(m);
        try {
          sessionStorage.setItem(MODE_KEY, m);
        } catch {
          // Storage blocked: the choice still lasts for this page view.
        }
      },
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
    [settings, mode, check, announcement, demoMode, settingsOpen],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
