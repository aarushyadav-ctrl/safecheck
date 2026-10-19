import { useCallback, useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

export const speechSupported =
  typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;

// Prefer a clear, natural-sounding US English voice when the device has one.
function pickVoice() {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === 'en-US' && /natural|google|samantha|aria|jenny/i.test(v.name)) ||
    voices.find((v) => v.lang === 'en-US') ||
    voices.find((v) => v.lang?.startsWith('en')) ||
    null
  );
}

/**
 * Reads text out loud with the browser's built-in voice (Web Speech API).
 * Speed comes from the settings panel. Reading stops when the screen changes.
 */
export function useSpeech() {
  const { settings } = useApp();
  const [speaking, setSpeaking] = useState(false);
  const runId = useRef(0);

  const stop = useCallback(() => {
    if (!speechSupported) return;
    runId.current += 1;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const speak = useCallback(
    (text) => {
      if (!speechSupported || !text) return;
      window.speechSynthesis.cancel();
      const id = ++runId.current;
      const voice = pickVoice();
      // Some browsers stop long speech after about 15 seconds,
      // so read one sentence at a time.
      const sentences = (text.match(/[^.!?\n]+[.!?]*/g) || [text])
        .map((s) => s.trim())
        .filter(Boolean);

      setSpeaking(true);
      sentences.forEach((sentence, i) => {
        const u = new SpeechSynthesisUtterance(sentence);
        u.lang = 'en-US';
        u.rate = settings.readSpeed;
        if (voice) u.voice = voice;
        if (i === sentences.length - 1) {
          u.onend = u.onerror = () => {
            if (runId.current === id) setSpeaking(false);
          };
        }
        window.speechSynthesis.speak(u);
      });
    },
    [settings.readSpeed],
  );

  useEffect(() => stop, [stop]);

  return { speaking, speak, stop };
}
