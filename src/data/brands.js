// Brands scammers often pretend to be, and their real web addresses.
// "keywords" are the words a fake address might use to look like the brand.
// Short keywords (under 5 letters) only match whole words, to avoid false alarms
// (for example "ups" inside "groups").
export const BRANDS = [
  // Banks
  { name: 'Chase', keywords: ['chase'], domains: ['chase.com'] },
  { name: 'Bank of America', keywords: ['bankofamerica', 'bofa'], domains: ['bankofamerica.com', 'bofa.com'] },
  { name: 'Wells Fargo', keywords: ['wellsfargo'], domains: ['wellsfargo.com'] },
  { name: 'Citi', keywords: ['citibank', 'citi'], domains: ['citi.com', 'citibank.com'] },
  { name: 'Capital One', keywords: ['capitalone'], domains: ['capitalone.com'] },
  { name: 'US Bank', keywords: ['usbank'], domains: ['usbank.com'] },
  // Payment apps
  { name: 'PayPal', keywords: ['paypal'], domains: ['paypal.com', 'paypal.me'] },
  { name: 'Venmo', keywords: ['venmo'], domains: ['venmo.com'] },
  { name: 'Cash App', keywords: ['cashapp'], domains: ['cash.app', 'cashapp.com', 'squareup.com'] },
  { name: 'Zelle', keywords: ['zelle', 'zellepay'], domains: ['zellepay.com'] },
  { name: 'Coinbase', keywords: ['coinbase'], domains: ['coinbase.com'] },
  // Delivery
  { name: 'USPS', keywords: ['usps'], domains: ['usps.com'] },
  { name: 'UPS', keywords: ['ups'], domains: ['ups.com'] },
  { name: 'FedEx', keywords: ['fedex'], domains: ['fedex.com'] },
  { name: 'DHL', keywords: ['dhl'], domains: ['dhl.com'] },
  // Shopping
  { name: 'Amazon', keywords: ['amazon', 'amzn'], domains: ['amazon.com', 'amzn.to', 'amazon.co.uk', 'amazon.ca'] },
  { name: 'Walmart', keywords: ['walmart'], domains: ['walmart.com'] },
  { name: 'Target', keywords: ['target'], domains: ['target.com'] },
  { name: 'eBay', keywords: ['ebay'], domains: ['ebay.com'] },
  { name: 'Apple', keywords: ['apple', 'icloud', 'itunes'], domains: ['apple.com', 'icloud.com'] },
  // Streaming
  { name: 'Netflix', keywords: ['netflix'], domains: ['netflix.com'] },
  { name: 'Disney+', keywords: ['disneyplus'], domains: ['disneyplus.com'] },
  { name: 'Spotify', keywords: ['spotify'], domains: ['spotify.com'] },
  { name: 'Hulu', keywords: ['hulu'], domains: ['hulu.com'] },
  // Gaming and social
  { name: 'Steam', keywords: ['steam', 'steampowered', 'steamcommunity'], domains: ['steampowered.com', 'steamcommunity.com'] },
  { name: 'Discord', keywords: ['discord'], domains: ['discord.com', 'discord.gg', 'discordapp.com'] },
  { name: 'Roblox', keywords: ['roblox'], domains: ['roblox.com'] },
  { name: 'Epic Games', keywords: ['epicgames', 'fortnite'], domains: ['epicgames.com', 'fortnite.com'] },
  { name: 'Xbox', keywords: ['xbox'], domains: ['xbox.com'] },
  { name: 'PlayStation', keywords: ['playstation'], domains: ['playstation.com'] },
  { name: 'Instagram', keywords: ['instagram'], domains: ['instagram.com'] },
  { name: 'Facebook', keywords: ['facebook'], domains: ['facebook.com', 'fb.com'] },
  { name: 'TikTok', keywords: ['tiktok'], domains: ['tiktok.com'] },
  // Tech
  { name: 'Microsoft', keywords: ['microsoft', 'outlook', 'office365'], domains: ['microsoft.com', 'live.com', 'outlook.com', 'office.com'] },
  { name: 'Google', keywords: ['google', 'gmail'], domains: ['google.com', 'gmail.com', 'youtube.com'] },
  // Government
  { name: 'Social Security', keywords: ['socialsecurity', 'ssa'], domains: ['ssa.gov'] },
  { name: 'IRS', keywords: ['irs'], domains: ['irs.gov'] },
  { name: 'Medicare', keywords: ['medicare'], domains: ['medicare.gov'] },
];

// Services that hide where a link really goes.
export const SHORTENERS = [
  'bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'is.gd', 'buff.ly', 'rebrand.ly',
  'cutt.ly', 'shorturl.at', 'rb.gy', 't.ly', 's.id', 'tiny.cc', 'lnkd.in', 'shorturl.gg',
  'bl.ink', 'v.gd', 'qrco.de', 'qr.codes', 'linktr.ee',
];

// Endings often used by scam sites because they are cheap or unusual.
export const RISKY_TLDS = [
  'xyz', 'top', 'click', 'link', 'live', 'shop', 'online', 'site', 'buzz', 'rest', 'icu',
  'cfd', 'sbs', 'loan', 'work', 'support', 'zip', 'mov', 'country', 'gq', 'tk', 'ml',
  'cf', 'ga', 'cam', 'monster', 'quest', 'bond', 'win', 'vip', 'lol', 'store',
];

// Two-part endings where the real name is the part before them (example.co.uk).
export const MULTI_PART_SUFFIXES = [
  'co.uk', 'org.uk', 'gov.uk', 'ac.uk', 'com.au', 'net.au', 'org.au', 'co.nz', 'co.jp',
  'com.br', 'com.mx', 'co.in', 'co.za', 'com.ar', 'com.co', 'com.es',
];
