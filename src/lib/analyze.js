import { findDemoResult } from '../../shared/demoResults.js';

const TIMEOUT_MS = 45000;

/**
 * Sends the message to our own server (never straight to the AI provider).
 * If the server can't be reached but this is an example message, the
 * pre-written answer is used so a demo always works.
 * Throws an Error with a plain-language message otherwise.
 */
export async function analyzeMessage({ text, image, claimedSender, sampleId }, { signal } = {}) {
  const timeout = AbortSignal.timeout(TIMEOUT_MS);
  const combined = signal ? AbortSignal.any([signal, timeout]) : timeout;
  const fallback = () => {
    const demo = findDemoResult({ sampleId, text });
    return demo ? { ...demo, demo: true } : null;
  };

  let res;
  try {
    res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        imageBase64: image?.dataUrl || null,
        claimedSender,
        sampleId,
      }),
      signal: combined,
    });
  } catch (err) {
    if (signal?.aborted) throw err; // the person pressed "Stop checking"
    const demo = fallback();
    if (demo) return demo;
    throw new Error(
      timeout.aborted
        ? 'Checking took too long. Please try again in a minute.'
        : "We couldn't reach SafeCheck. Please check your internet connection and try again.",
    );
  }

  const data = await res.json().catch(() => null);
  if (!res.ok || !data) {
    const demo = fallback();
    if (demo) return demo;
    throw new Error(data?.message || 'Something went wrong while checking. Please try again.');
  }
  return data;
}
