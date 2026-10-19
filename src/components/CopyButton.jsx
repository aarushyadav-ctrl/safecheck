import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useT } from '../i18n/index.js';

/** Copies text, shows "Copied" for a few seconds, and tells screen readers. */
export default function CopyButton({ getText, label, copiedMessage, className = 'btn btn--secondary' }) {
  const { announce } = useApp();
  const t = useT();
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    const text = getText();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Older browsers: copy through a hidden text box.
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.append(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    setCopied(true);
    announce(copiedMessage || t('common.copied'));
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 4000);
  }

  return (
    <button type="button" className={className} onClick={copy}>
      <Icon name={copied ? 'check' : 'copy'} />
      {copied ? t('common.copiedShort') : label}
    </button>
  );
}
