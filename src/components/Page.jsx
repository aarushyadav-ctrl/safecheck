import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';

const enter = { duration: 0.34, ease: [0.22, 1, 0.36, 1] };
const leave = { duration: 0.18, ease: [0.4, 0, 1, 1] };

/**
 * Wraps every screen. It:
 * - sets the browser tab title,
 * - moves keyboard and screen-reader focus to the new page heading after navigation,
 * - fades the page in and out gently (turned off by the reduce-motion settings).
 */
export default function Page({ title, children, className = '' }) {
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => {
    document.title = title ? `${title} · SafeCheck` : 'SafeCheck';
  }, [title]);

  useEffect(() => {
    // "default" is the first page the person opened. Leave focus alone there,
    // so the "Skip to main content" link is still the first thing they reach.
    if (location.key === 'default') return;
    window.scrollTo(0, 0);
    const heading = ref.current?.querySelector('h1');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  }, [location.key]);

  return (
    <motion.div
      ref={ref}
      className={`page ${className}`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0, transition: enter }}
      exit={{ opacity: 0, y: -8, transition: leave }}
    >
      {children}
    </motion.div>
  );
}
