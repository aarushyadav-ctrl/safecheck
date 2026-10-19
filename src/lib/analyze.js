import { findDemoResult } from '../../shared/demoResults.js';

const TIMEOUT_MS = 45000;

/** An error with a code the screen turns into plain words (errors.<code>). */
export class CheckError extends Error {
  constructor(code, message = '') {
    super(message || code);
    this.code = code;
  }
}

/**
 * Sends a message (text and/or screenshot) or a link to our own server,
 * never straight to the AI provider.
 * If the server can't be reached but this is an example, the pre-written
 * answer is used so a demo always works.
 */
export async function analyzeMessage(
  { text = '', image = null, link = '', claimedSender = '', sampleId = null, language = 'en' },
  { signal } = {},
) {
  const timeout = AbortSignal.timeout(TIMEOUT_MS);
  const combined = signal ? AbortSignal.any([signal, timeout]) : timeout;
  const fallback = () => {
    const demo = findDemoResult({ sampleId, text, link });
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
        link,
        claimedSender,
        sampleId,
        language,
      }),
      signal: combined,
    });
  } catch (err) {
    if (signal?.aborted) throw err; // the person pressed "Stop checking"
    const demo = fallback();
    if (demo) return demo;
    throw new CheckError(timeout.aborted ? 'timeout' : 'network');
  }

  const data = await res.json().catch(() => null);
  if (!res.ok || !data) {
    const demo = fallback();
    if (demo) return demo;
    throw new CheckError(data?.code || 'provider_down', data?.message);
  }
  return data;
}
