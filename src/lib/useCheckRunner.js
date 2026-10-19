import { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { useT } from '../i18n/index.js';
import { analyzeMessage } from './analyze.js';
import { inspectLink, mergeWithReport, resultFromReport } from './linkInspector.js';
import { redact } from './redact.js';
import { findDemoResult } from '../../shared/demoResults.js';
import { describeResult } from './describe.js';

/**
 * The one place a check is run, shared by Simple mode and Quick mode:
 * 1. hides private details (messages) or inspects the link locally (links),
 * 2. asks the server for the AI answer (or a demo answer),
 * 3. saves the result in the shared state and announces it.
 * Links always get the local checks, even with no API key or if the AI fails.
 */
export function useCheckRunner() {
  const { check, updateCheck, announce, settings, demoMode } = useApp();
  const t = useT();
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'error'
  const [error, setError] = useState('');
  const abortRef = useRef(null);

  // Stop a check that is still running if the screen goes away.
  useEffect(() => () => abortRef.current?.abort(), []);

  const isLink = check.input !== 'message';

  /** Returns a translated problem with the input, or '' if it's ready to check. */
  function validate() {
    if (!isLink) return !check.text.trim() && !check.image ? t('check.errors.empty') : '';
    if (!check.link.trim()) {
      return check.input === 'qr' ? t('check.errors.emptyQr') : t('check.errors.emptyLink');
    }
    const report = inspectLink(check.link);
    return report.ok ? '' : t(`link.errors.${report.error}`);
  }

  async function run({ minWait = 1600 } = {}) {
    const controller = new AbortController();
    abortRef.current?.abort();
    abortRef.current = controller;
    setStatus('loading');
    setError('');
    announce(t('check.announceChecking'));

    const language = settings.language;
    const wait = new Promise((r) => setTimeout(r, minWait));

    try {
      let patch;
      let work;
      if (isLink) {
        const report = inspectLink(check.link);
        patch = { linkReport: report, sentText: '', redactions: [] };
        work = checkLink(report, { language, signal: controller.signal });
      } else {
        const { text, items } = redact(check.text, (type) => t(`redact.placeholder.${type}`));
        patch = { linkReport: null, sentText: text, redactions: items };
        work = analyzeMessage(
          { text, image: check.image, claimedSender: check.claimedSender, sampleId: check.sampleId, language },
          { signal: controller.signal },
        );
      }
      const [result] = await Promise.all([work, wait]);
      if (controller.signal.aborted) return null;

      updateCheck({ ...patch, result });
      setStatus('idle');
      announce(describeResult(result, patch.linkReport, t));
      return result;
    } catch (err) {
      if (controller.signal.aborted) return null;
      setError(err.code && t.has(`errors.${err.code}`) ? t(`errors.${err.code}`) : t('errors.provider_down'));
      setStatus('error');
      return null;
    }
  }

  // Local checks always work; the AI adds its explanation when it can.
  async function checkLink(report, { language, signal }) {
    const demo = findDemoResult({ sampleId: check.sampleId, link: check.link });
    if (demoMode) return demo ? { ...demo, demo: true } : resultFromReport(report);
    try {
      const ai = await analyzeMessage(
        { link: report.href, claimedSender: check.claimedSender, sampleId: check.sampleId, language },
        { signal },
      );
      return mergeWithReport(ai, report);
    } catch (err) {
      if (signal.aborted) throw err;
      return resultFromReport(report);
    }
  }

  function stop() {
    abortRef.current?.abort();
    setStatus('idle');
    announce(t('check.announceStopped'));
  }

  return { status, setStatus, error, run, stop, validate };
}
