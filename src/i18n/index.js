import { useMemo } from 'react';
import { useApp } from '../context/AppContext.jsx';
import en from './en.js';
import es from './es.js';

/*
  Simple translation files: one object per language, grouped by screen.
  A value can be:
  - a string,
  - a function that fills in details, e.g. ({ count }) => `${count} signs`,
  - or structured content (arrays/objects) such as guided steps.
  Anything missing in a language falls back to English.
*/
export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];

const DICTS = { en, es };

const lookup = (dict, key) => key.split('.').reduce((o, k) => (o == null ? o : o[k]), dict);

export function translate(lang, key, vars) {
  let value = lookup(DICTS[lang] || en, key);
  if (value === undefined) value = lookup(en, key);
  if (value === undefined) {
    if (import.meta.env?.DEV) console.warn(`[i18n] missing text: ${key}`);
    return key;
  }
  return typeof value === 'function' ? value(vars || {}) : value;
}

export function hasText(lang, key) {
  return lookup(DICTS[lang] || en, key) !== undefined || lookup(en, key) !== undefined;
}

/**
 * Returns t(key, vars) for the language chosen in settings.
 * t.has(key) says whether a text exists; t.lang is the language code.
 */
export function useT() {
  const { settings } = useApp();
  const lang = settings.language;
  return useMemo(() => {
    const t = (key, vars) => translate(lang, key, vars);
    t.has = (key) => hasText(lang, key);
    t.lang = lang;
    return t;
  }, [lang]);
}
