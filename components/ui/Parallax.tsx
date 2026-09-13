'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useIsDesktop } from '@/lib/hooks';

type Props = {
  children: React.ReactNode;
  /** 0.85 for background layers, 1.05 for foreground. */
  speed?: number;
  className?: string;
};

/**
 * The `parallax` token. Desktop only, and off under reduced motion — on mobile
 * we keep reveal and stagger and nothing else.
 */
export default function Parallax({ children, speed = 0.85, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const reduced = useReducedMotion();
  const active = isDesktop && !reduced;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // A layer at 0.85x scroll speed drifts 15% of the travelled distance.
  const drift = (1 - speed) * 180;
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={active ? { y } : undefined} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
