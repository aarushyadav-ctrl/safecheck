// The "What should I do now?" steps. They are chosen by the verdict, the kind
// of scam, and whether it was a link, so advice always matches the message.
// The words live in the translation files (steps.*). Each step:
// { title, body, links?: [{ href, label }] }.

export function getSteps(result, path, t, { isLink = false } = {}) {
  if (path === 'clicked') return t('steps.recovery');
  if (result?.verdict === 'safe') return t('steps.safe');

  const type = result?.scamType;
  // Scam types with their own complete set of steps (jobs, payment apps,
  // marketplaces, gaming, brand DMs, crypto, sextortion).
  if (type && t.has(`steps.byType.${type}`)) return t(`steps.byType.${type}`);
  if (isLink) return t('steps.link');

  const contact = t.has(`steps.contact.${type}`) ? `steps.contact.${type}` : 'steps.contact.default';
  return [
    t('steps.dontReply'),
    type === 'family-emergency' ? t('steps.noGiftCards') : t('steps.noMoney'),
    t(contact),
    t('steps.block'),
  ];
}
