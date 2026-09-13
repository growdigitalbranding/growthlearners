'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

type Props = {
  to: number;
  duration?: number;
  className?: string;
};

/**
 * The `counter` token — counts up from 0 once, when scrolled into view.
 * Reduced motion renders the final number immediately. The final value is also
 * what server-renders, so the real number is in the HTML for crawlers.
 */
export default function CountUp({ to, duration = 1.4, className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(to);
  const started = useRef(false);

  useEffect(() => {
    // Only drop to 0 once we know JS is live and motion is welcome, so no-JS
    // and reduced-motion visitors never see a 0.
    if (reduced) return;
    if (!started.current) setValue(0);
  }, [reduced]);

  useEffect(() => {
    if (!inView || reduced || started.current) return;
    started.current = true;

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      // easeOutExpo — fast out of the gate, settles on the number.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(eased * to));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, to, duration]);

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {value}
    </span>
  );
}
