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
 *    useReducedMotion(), or is created inside a gsap.matchMedia() query that
 *    excludes reduced motion, so it never exists in the first place.
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

/**
 * Hero body copy. Transform-only, for the same reason as the headline: the
 * sub-headline is the largest text block above the fold and therefore the LCP
 * element, so it must be painted at full contrast in the first frame rather
 * than fading in once React has hydrated. Nothing above the fold is allowed to
 * animate its existence — only its arrival.
 */
export const heroRise: Variants = {
  hidden: { y: 18 },
  visible: { y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
};

export const heroGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER, delayChildren: 0.1 } },
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

/**
 * Magnetic and parallax are desktop-only. Width alone is the wrong test — an
 * 800px Android tablet is wide but has no cursor to be magnetic toward, and
 * touch fires a false hover on tap. Pointer type has to be part of the query.
 */
export const DESKTOP_QUERY = '(min-width: 768px) and (hover: hover) and (pointer: fine)';
