'use client';

import { motion } from 'framer-motion';
import { underline, VIEWPORT } from '@/lib/motion';

type Props = {
  children: React.ReactNode;
  /** Thickness in px. Heavier for display type. */
  weight?: number;
  className?: string;
  /** Set when an ancestor already drives hidden/visible variants. */
  inherit?: boolean;
};

/**
 * The `underline` token — an accent rule that draws left-to-right beneath a
 * key phrase as it enters. Reduced motion leaves the line drawn, not absent:
 * MotionConfig strips the scaleX transform so it simply appears.
 */
export default function DrawUnderline({ children, weight = 3, className = '', inherit = false }: Props) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.span
        aria-hidden
        variants={underline}
        {...(inherit ? {} : { initial: 'hidden' as const, whileInView: 'visible' as const, viewport: VIEWPORT })}
        style={{ height: weight, transformOrigin: 'left center' }}
        className="absolute -bottom-[0.06em] left-0 right-0 block rounded-full bg-accent"
      />
    </span>
  );
}
