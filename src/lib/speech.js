import { useCallback, useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

/*
  "Read this to me".
  - English uses a natural, human-sounding voice (Groq Orpheus, through our own
    server) when it is set up. The next piece is prepared while the current one
    plays, so there are no gaps.
  - Spanish, or when the natural voice isn't available, uses the most natural
    voice installed on the device (Web Speech API).
  Speed comes from the settings panel and works the same for both.
*/

const hasDeviceVoice =
  typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
const hasAudio = typeof window !== 'undefined' && typeof Audio !== 'undefined';
export const speechSupported = hasDeviceVoice || hasAudio;

export const NATURAL_VOICES = ['hannah', 'troy'];
export const SPEEDS = [
  { value: 0.8, id: 'slow' },
  { value: 1, id: 'normal' },
  { value: 1.2, id: 'fast' },
];
const SPEECH_LANG = { en: 'en-US', es: 'es-US' };
const NATURAL_MAX = 200; // the natural voice takes up to 200 characters at a time
const DEVICE_MAX = 220;

/**
 * Splits text into pieces that end at real sentence ends. A dot inside
 * "usps.com" or "$1.99" is not a sentence end, so it no longer causes a pause.
 */
export function chunkText(text, max) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (!clean) return [];
  const sentences = clean.split(/(?<=[.!?…])\s+/);
  const pieces = [];
  for (const sentence of sentences) {
    if (sentence.length <= max) {
      pieces.push(sentence);
      continue;
    }
    // A very long sentence: split at commas, then at spaces.
    let rest = sentence;
    while (rest.length > max) {
      const part = rest.slice(0, max);
      const at = Math.max(part.lastIndexOf(', '), part.lastIndexOf('; '), part.lastIndexOf(': '));
      const cut = at > max * 0.4 ? at + 1 : part.lastIndexOf(' ') > 0 ? part.lastIndexOf(' ') : max;
      pieces.push(rest.slice(0, cut).trim());
      rest = rest.slice(cut).trim();
    }
    if (rest) pieces.push(rest);
  }
  // Join short sentences together so speech flows instead of stopping after each one.
  const chunks = [];
  for (const piece of pieces) {
    const last = chunks[chunks.length - 1];
    if (last && last.length + 1 + piece.length <= max) chunks[chunks.length - 1] = `${last} ${piece}`;
    else chunks.push(piece);
  }
  return chunks;
}

// ---------- Device voice ----------
// Novelty voices that sound robotic or silly.
const NOVELTY = /albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|fred|junior|ralph|kathy|grandma|grandpa/i;

function scoreVoice(v, lang) {
  if (NOVELTY.test(v.name)) return -100;
  const vLang = (v.lang || '').replace('_', '-').toLowerCase();
  let score = 0;
  if (vLang === lang.toLowerCase()) score += 3;
  else if (vLang.startsWith(lang.slice(0, 2))) score += 1;
  else return -50;
  if (/natural|neural/i.test(v.name)) score += 6; // Edge and Windows natural voices
  if (/premium|enhanced/i.test(v.name)) score += 5; // Apple's higher-quality voices
  if (/google/i.test(v.name)) score += 4;
  if (/online/i.test(v.name)) score += 2;
  if (/samantha|ava|allison|aria|jenny|guy|michelle|zoe|evan|nathan|paulina|monica|sabina|jorge|dalia|elvira|alvaro/i.test(v.name)) score += 2;
  return score;
}

// Voices load a moment after the page opens in some browsers.
function loadVoices() {
  const now = window.speechSynthesis.getVoices();
  if (now.length) return Promise.resolve(now);
  return new Promise((resolve) => {
    const done = () => resolve(window.speechSynthesis.getVoices());
    window.speechSynthesis.addEventListener('voiceschanged', done, { once: true });
    setTimeout(done, 1000);
  });
}

async function bestDeviceVoice(language) {
  const lang = SPEECH_LANG[language] || 'en-US';
  const voices = await loadVoices();
  const ranked = voices
    .map((v) => ({ v, score: scoreVoice(v, lang) }))
    .filter((x) => x.score > -50)
    .sort((a, b) => b.score - a.score);
  return ranked[0]?.v || null;
}

function speakWithDevice(chunks, { language, rate, isCurrent }) {
  return new Promise((resolve) => {
    if (!hasDeviceVoice || !chunks.length) return resolve();
    bestDeviceVoice(language).then((voice) => {
      if (!isCurrent()) return resolve();
      window.speechSynthesis.cancel();
      chunks.forEach((chunk, i) => {
        const u = new SpeechSynthesisUtterance(chunk);
        u.lang = SPEECH_LANG[language] || 'en-US';
        u.rate = rate;
        if (voice) u.voice = voice;
        if (i === chunks.length - 1) u.onend = u.onerror = () => resolve();
        window.speechSynthesis.speak(u);
      });
    });
  });
}

// ---------- Natural voice ----------
const audioCache = new Map(); // recent pieces, so "Read this to me" again starts instantly
const PERMANENT_FAILURES = ['tts_terms', 'not_configured', 'invalid_key', 'bad_model'];

async function fetchSpeech(text, voice, signal) {
  const key = `${voice}|${text}`;
  if (audioCache.has(key)) return audioCache.get(key);
  const res = await fetch('/api/speak', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, voice }),
    signal,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw Object.assign(new Error(data.code || 'provider_down'), { code: data.code || 'provider_down' });
  }
  const url = URL.createObjectURL(await res.blob());
  audioCache.set(key, url);
  if (audioCache.size > 40) {
    const [oldKey, oldUrl] = audioCache.entries().next().value;
    audioCache.delete(oldKey);
    URL.revokeObjectURL(oldUrl);
  }
  return url;
}

function playUrl(url, rate, setAudio) {
  return new Promise((resolve, reject) => {
    const audio = new Audio(url);
    audio.preservesPitch = true; // faster or slower, never squeaky or deep
    audio.playbackRate = rate;
    audio.onended = () => resolve();
    audio.onerror = () => reject(Object.assign(new Error('play_failed'), { code: 'play_failed' }));
    setAudio(audio);
    audio.play().catch(reject);
  });
}

// Only one thing reads at a time across the whole app.
let activeStop = null;

/**
 * @returns {{ status: 'idle'|'loading'|'speaking', speaking: boolean, speak(text), stop() }}
 */
export function useSpeech() {
  const { settings, naturalVoice, setNaturalVoice } = useApp();
  const [status, setStatus] = useState('idle');
  const run = useRef(0);
  const audioRef = useRef(null);
  const abortRef = useRef(null);

  const stop = useCallback(() => {
    run.current += 1;
    abortRef.current?.abort();
    audioRef.current?.pause();
    audioRef.current = null;
    if (hasDeviceVoice) window.speechSynthesis.cancel();
    setStatus('idle');
  }, []);

  const speak = useCallback(
    async (text) => {
      if (!text) return;
      activeStop?.();
      activeStop = stop;
      const id = ++run.current;
      const isCurrent = () => run.current === id;
      const rate = settings.readSpeed;
      const language = settings.language;
      const useNatural =
        hasAudio && naturalVoice && language === 'en' && NATURAL_VOICES.includes(settings.voice);

      if (!useNatural) {
        setStatus('speaking');
        await speakWithDevice(chunkText(text, DEVICE_MAX), { language, rate, isCurrent });
        if (isCurrent()) setStatus('idle');
        return;
      }

      const chunks = chunkText(text, NATURAL_MAX);
      const controller = new AbortController();
      abortRef.current = controller;
      setStatus('loading');
      let i = 0;
      try {
        let next = fetchSpeech(chunks[0], settings.voice, controller.signal);
        for (; i < chunks.length; i++) {
          const url = await next;
          if (!isCurrent()) return;
          // Prepare the next piece while this one plays.
          next = i + 1 < chunks.length ? fetchSpeech(chunks[i + 1], settings.voice, controller.signal) : null;
          next?.catch(() => {});
          setStatus('speaking');
          await playUrl(url, rate, (a) => (audioRef.current = a));
          if (!isCurrent()) return;
        }
        setStatus('idle');
      } catch (err) {
        if (!isCurrent() || err.name === 'AbortError') return;
        // Natural voice not available: stop trying it for this visit.
        if (PERMANENT_FAILURES.includes(err.code)) setNaturalVoice(false);
        // Read whatever is left with the device's own voice.
        setStatus('speaking');
        await speakWithDevice(chunkText(chunks.slice(i).join(' '), DEVICE_MAX), { language, rate, isCurrent });
        if (isCurrent()) setStatus('idle');
      }
    },
    [settings.readSpeed, settings.language, settings.voice, naturalVoice, setNaturalVoice, stop],
  );

  // Stop reading when the screen changes.
  useEffect(
    () => () => {
      if (activeStop === stop) activeStop = null;
      stop();
    },
    [stop],
  );

  return { status, speaking: status !== 'idle', speak, stop };
}
