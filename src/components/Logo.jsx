// A magnifying glass with a check mark: "we look closely, then tell you".
// Decorative, because the word "SafeCheck" always sits next to it.
export default function Logo({ size = 36 }) {
  return (
    <svg
      className="logo"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="32" height="32" rx="9" fill="var(--accent)" />
      <circle cx="14" cy="14" r="7.5" fill="none" stroke="var(--on-accent)" strokeWidth="2.6" />
      <path d="M19.5 19.5 25 25" stroke="var(--on-accent)" strokeWidth="2.6" strokeLinecap="round" />
      <path
        d="m10.6 14.2 2.4 2.4 4.4-4.6"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
