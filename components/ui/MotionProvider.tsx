'use client';

import { MotionConfig } from 'framer-motion';

/**
 * One place where reduced motion is honoured for every Framer Motion animation
 * on the page. `reducedMotion="user"` strips transform and layout animation from
 * every variant while leaving opacity alone — so each `reveal` collapses to a
 * plain fade without a single per-section conditional.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
