import { BRANDS, MULTI_PART_SUFFIXES, RISKY_TLDS, SHORTENERS } from '../data/brands.js';
import { toUnicode } from './punycode.js';

/*
  Checks a web address entirely in the browser. It never opens, loads, or
  previews the link. Findings carry an id and details; the words people see
  come from the translation files (link.findings.<id>), so they follow the
  chosen language.
  Levels: 'danger' (warning sign), 'warning' (be careful), 'good' (good sign).
*/

const LOOKALIKE = { 0: 'o', 1: 'l', 3: 'e', 4: 'a', 5: 's', 7: 't', 8: 'b', $: 's', '@': 'a', '!': 'i', '|': 'l' };
const IPV4 = /^\d{1,3}(\.\d{1,3}){3}$/;

const swapBack = (s) => s.replace(/rn/g, 'm').replace(/vv/g, 'w').replace(/[0134578$@!|]/g, (c) => LOOKALIKE[c] || c);

function editDistance(a, b) {
  if (Math.abs(a.length - b.length) > 1) return 2;
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
  }
  return dp[a.length][b.length];
}

function splitHost(host) {
  const labels = host.split('.');
  const lastTwo = labels.slice(-2).join('.');
  const take = MULTI_PART_SUFFIXES.includes(lastTwo) ? 3 : 2;
  return {
    domain: labels.slice(-take).join('.'),
    subdomain: labels.slice(0, -take).join('.'),
    tld: labels[labels.length - 1],
  };
}

// Brand words that are also everyday words only count as whole words.
const EVERYDAY_WORDS = ['target', 'chase', 'apple', 'steam', 'google'];

// Does this piece of the address use a brand's name?
// Returns 'exact' (the name itself), 'lookalike' (letters swapped), or null.
function brandUse(text, keyword) {
  const words = text.split(/[.\-_]/).filter(Boolean);
  // Long, unusual brand names also count when joined to other words (paypalsecure).
  const loose = keyword.length >= 6 && !EVERYDAY_WORDS.includes(keyword);
  const uses = (ws) => ws.includes(keyword) || (loose && ws.join('').includes(keyword));
  if (uses(words)) return 'exact';
  const swapped = words.map(swapBack);
  if (swapped.join('.') !== words.join('.') && uses(swapped)) return 'lookalike';
  if (loose && words.some((w) => editDistance(w, keyword) === 1)) return 'lookalike';
  return null;
}

export function looksLikeLink(text) {
  const s = String(text || '').trim();
  return /^(https?:\/\/)?[^\s/]+\.[^\s/]{2,}(\/\S*)?$/i.test(s);
}

/**
 * @returns {{ ok: false, error: 'empty'|'invalid'|'notWeb' } |
 *   { ok: true, href, scheme, explicitScheme, host, hostShown, subdomain, domain, rest,
 *     tld, brand, official, findings: [{ id, level, vars }], verdict }}
 */
export function inspectLink(raw) {
  const input = String(raw || '').trim();
  if (!input) return { ok: false, error: 'empty' };

  const schemeMatch = input.match(/^([a-z][a-z0-9+.-]*):/i);
  const explicitScheme = schemeMatch && /^[a-z][a-z0-9+.-]*:\/\//i.test(input) ? schemeMatch[1].toLowerCase() : null;
  if (schemeMatch && !explicitScheme && !/^[^:]+:\d/.test(input)) return { ok: false, error: 'notWeb' };
  if (explicitScheme && explicitScheme !== 'http' && explicitScheme !== 'https') {
    return { ok: false, error: 'notWeb' };
  }

  let url;
  try {
    url = new URL(explicitScheme ? input : `https://${input}`);
  } catch {
    return { ok: false, error: 'invalid' };
  }

  const host = url.hostname.toLowerCase().replace(/\.$/, '');
  const isIPv6 = host.startsWith('[');
  const isIP = isIPv6 || IPV4.test(host);
  if (!isIP && !host.includes('.')) return { ok: false, error: 'invalid' };

  const hostShown = isIP ? host : toUnicode(host);
  const { domain, subdomain, tld } = isIP ? { domain: host, subdomain: '', tld: '' } : splitHost(host);
  const domainShown = isIP ? host : toUnicode(domain);
  const subdomainShown = subdomain ? toUnicode(subdomain) : '';
  const rest = `${url.port ? `:${url.port}` : ''}${url.pathname === '/' ? '' : url.pathname}${url.search}${url.hash}`;

  const findings = [];
  const add = (id, level, vars = {}) => findings.push({ id, level, vars });

  // 1. "user@" trick: https://paypal.com@evil.example goes to evil.example
  if (url.username || url.password) {
    add('atTrick', 'danger', { fake: decodeURIComponent(url.username), real: domainShown });
  }

  // 2. A raw number address instead of a name
  if (isIP) add('ip', 'danger', { ip: host });

  // 3. Lookalike letters from other alphabets
  if (!isIP && host.split('.').some((l) => l.startsWith('xn--'))) {
    add('punycode', 'danger', { shown: hostShown, encoded: host });
  }

  // 4. Brand checks
  let brand = null;
  let official = false;
  if (!isIP) {
    const officialBrand = BRANDS.find((b) =>
      b.domains.some((d) => host === d || host.endsWith(`.${d}`)),
    );
    if (officialBrand) {
      brand = officialBrand.name;
      official = true;
    } else {
      const label = domain.slice(0, domain.length - tld.length - 1).replace(/\.(co|com|org|net|gov|ac)$/, '');
      for (const b of BRANDS) {
        for (const keyword of b.keywords) {
          const inSub = subdomain ? brandUse(subdomain, keyword) : null;
          const inDomain = brandUse(label, keyword);
          if (!inSub && !inDomain) continue;
          brand = b.name;
          const vars = { brand: b.name, real: domainShown, official: b.domains[0] };
          if (inSub) add('brandInFront', 'danger', vars);
          if (inDomain === 'exact') add('brandWords', 'danger', vars);
          if (inSub === 'lookalike' || inDomain === 'lookalike') add('lookalike', 'danger', vars);
          break;
        }
        if (brand) break;
      }
    }
  }

  // 5. Link shorteners hide where you'll end up
  if (SHORTENERS.includes(domain) && !official) add('shortener', 'warning', { domain });

  // 6. Not secure
  if (explicitScheme === 'http') add('http', 'warning');

  // 7. Unusual ending
  if (!isIP && RISKY_TLDS.includes(tld)) add('riskyTld', 'warning', { tld: `.${tld}` });

  // 8. Unusual port number
  if (url.port && url.port !== '80' && url.port !== '443') add('port', 'warning', { port: url.port });

  // 9. Very long or confusing
  const hyphens = (domain.match(/-/g) || []).length;
  const depth = subdomain ? subdomain.split('.').length : 0;
  if (input.length > 100 || depth >= 3 || hyphens >= 3) add('confusing', 'warning');

  if (official && !findings.some((f) => f.level !== 'good')) add('official', 'good', { brand });

  const verdict = findings.some((f) => f.level === 'danger')
    ? 'scam'
    : findings.some((f) => f.level === 'warning')
      ? 'caution'
      : 'safe';

  return {
    ok: true,
    href: url.href,
    scheme: explicitScheme,
    host,
    hostShown,
    subdomain: subdomainShown,
    domain: domainShown,
    rest,
    tld,
    brand,
    official,
    findings,
    verdict,
  };
}

/** A result in the same shape as the AI's, built only from the local checks. */
export function resultFromReport(report) {
  const signs = report.findings.filter((f) => f.level !== 'good');
  return {
    verdict: report.verdict,
    confidence: report.verdict === 'safe' ? 'low' : signs.some((f) => f.level === 'danger') ? 'high' : 'medium',
    summary: '',
    summaryKey: `link.summary.${report.verdict}`,
    summaryVars: { domain: report.domain, brand: report.brand || '' },
    scamType: 'other',
    extractedText: '',
    redFlags: [],
    nextSteps: [],
    localOnly: true,
  };
}

const SEVERITY = { safe: 0, caution: 1, scam: 2 };

/** The AI's answer, made at least as cautious as the local link checks. */
export function mergeWithReport(aiResult, report) {
  if (SEVERITY[report.verdict] <= SEVERITY[aiResult.verdict]) return aiResult;
  return {
    ...aiResult,
    verdict: report.verdict,
    summaryKey: `link.summary.${report.verdict}`,
    summaryVars: { domain: report.domain, brand: report.brand || '' },
  };
}
