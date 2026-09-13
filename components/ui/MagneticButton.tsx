'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useIsDesktop } from '@/lib/hooks';

type Props = {
  children: React.ReactNode;
  href: string;
  className?: string;
  /** Max pull toward the cursor, px. */
  strength?: number;
  target?: string;
  rel?: string;
  onClick?: () => void;
  'aria-label'?: string;
  'data-gtm'?: string;
};

/**
 * The `magnetic` token — primary CTAs pull slightly toward the cursor.
 * Desktop only (disabled below 768px) and off under reduced motion.
 */
export default function MagneticButton({
  children,
  href,
  className = '',
  strength = 8,
  ...rest
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const isDesktop = useIsDesktop();
  const reduced = useReducedMotion();
  const active = isDesktop && !reduced;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 22, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 260, damping: 22, mass: 0.4 });

  const onMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    rawX.set(Math.max(-strength, Math.min(strength, (dx / rect.width) * strength * 2)));
    rawY.set(Math.max(-strength, Math.min(strength, (dy / rect.height) * strength * 2)));
  };

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={active ? { x, y } : undefined}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onBlur={reset}
      className={className}
      {...rest}
    >
      {children}
    </motion.a>
  );
}
