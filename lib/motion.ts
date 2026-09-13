import type { Transition, Variants } from 'framer-motion';

/**
 * The whole page's motion vocabulary lives here. Sections import these — they
 * never define their own timings. Consistency is what separates "animated"
 * from "busy".
 *
 * Reduced motion is handled in two places:
 *  - <MotionConfig reducedMotion="user"> in app/layout.tsx strips transform and
 *    layout animation from every variant below, leaving opacity. So `reveal`
 *    degrades to a plain fade with no extra code per section.
 *  - Anything driven imperatively (GSAP, Lenis, magnetic, counters) checks
 *    `prefersReducedMotion()` or the useReducedMotion() hook directly.
 */

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  fast: 0.28,
  base: 0.6,
  slow: 0.9,
} as const;

/** 0.08s between children in any group. */
export const STAGGER = 0.08;

/** Reveal once at 20% of the viewport, and never re-trigger on scroll up. */
export const VIEWPORT = { once: true, amount: 0.2 } as const;

/** Looser trigger for tall blocks that never reach 20% in a short viewport. */
export const VIEWPORT_TALL = { once: true, amount: 0.08 } as const;

export const transition: Transition = {
  duration: DURATION.base,
  ease: EASE_OUT,
};

/** `reveal` — rise 24px + fade in, 0.6s, easeOut. */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition },
};

/** `stagger` — parent for any group of revealing children. */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER, delayChildren: 0.05 },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

/**
 * Hero headline words. Deliberately transform-only — no opacity — so the
 * headline is painted at full contrast in the first frame and LCP is never
 * gated behind an animation. It animates emphasis, not existence.
 */
export const headlineWord: Variants = {
  hidden: { y: '0.4em' },
  visible: {
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

export const headlineGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055 } },
};

/** `underline` — accent line draws left-to-right as the phrase enters. */
export const underline: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.7, ease: EASE_OUT, delay: 0.35 },
  },
};

/** Columns entering from opposite sides (problem/agitation section). */
export const slideFrom = (direction: 'left' | 'right'): Variants => ({
  hidden: { opacity: 0, x: direction === 'left' ? -40 : 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT } },
});

/** Accordion row open/close. Height is animated, so this one is layout-safe. */
export const accordionPanel: Variants = {
  collapsed: { height: 0, opacity: 0 },
  open: {
    height: 'auto',
    opacity: 1,
    transition: { height: { duration: 0.34, ease: EASE_OUT }, opacity: { duration: 0.22, delay: 0.06 } },
  },
};

/** Cheap SSR-safe check for imperative animation (GSAP, counters, magnetic). */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Magnetic and parallax are desktop-only — disabled below 768px. */
export const DESKTOP_QUERY = '(min-width: 768px)';
