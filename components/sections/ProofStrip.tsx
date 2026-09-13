'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { DELIVERABLES } from '@/lib/content';

/**
 * Eight deliverables, not eight logos — the things a student walks out owning.
 * The track is duplicated and translated -50%, so the loop is seamless.
 *
 * Motion that starts on its own and runs for more than five seconds needs a way
 * to stop it (WCAG 2.2.2, level A). Hover-pause does not satisfy that: most of
 * this page's audience is on Android, where there is no hover at all. So the
 * play state is owned by React and driven by three things:
 *
 *   - an explicit button, which is the accessible mechanism
 *   - an IntersectionObserver, so the strip stops compositing when it is
 *     scrolled out of view instead of animating forever on a mid-range phone
 *   - reduced motion, which stops it outright
 *
 * Pausing also unlocks horizontal scrolling, so stopping the strip lets you
 * read the rest of it rather than freezing half the list out of sight.
 */
export default function ProofStrip() {
  const track = [...DELIVERABLES, ...DELIVERABLES];
  const section = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  // useReducedMotion() reads the media query as soon as the module loads, so on
  // a reduced-motion client its very first render already disagrees with the
  // server's `false` — and this component branches on it, which is a hydration
  // mismatch (React #418). Holding it until after mount makes the first client
  // render match the server, then the effect applies the real preference.
  useEffect(() => setMounted(true), []);
  const reducedActive = mounted && reduced;

  useEffect(() => {
    const el = section.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '120px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const running = !paused && inView && !reducedActive;
  // Pausing, or asking for reduced motion, turns the strip into a plain
  // scrollable row so the full list stays reachable.
  const scrollable = paused || reducedActive;

  return (
    <section
      ref={section}
      aria-labelledby="proof-heading"
      className="hairline group relative border-b border-line bg-bg py-6 sm:py-8"
    >
      <h2 id="proof-heading" className="sr-only">
        What you walk out owning
      </h2>

      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-bg to-transparent sm:w-24" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-bg to-transparent sm:w-28" />

      <div className={scrollable ? 'overflow-x-auto pb-1' : 'overflow-hidden'}>
        <ul
          style={{ animationPlayState: running ? 'running' : 'paused' }}
          className="flex w-max animate-marquee items-center [--marquee-duration:46s]
                     [@media(hover:hover)and(pointer:fine)]:group-hover:[animation-play-state:paused]"
        >
          {track.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="flex shrink-0 items-center"
              // The second copy exists only to make the loop seamless.
              aria-hidden={index >= DELIVERABLES.length}
            >
              <span className="whitespace-nowrap px-5 font-serif text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] sm:px-8">
                {item}
              </span>
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            </li>
          ))}
        </ul>
      </div>

      {/* Nothing to pause once reduced motion has stopped it. */}
      {!reducedActive && (
        <button
          type="button"
          onClick={() => setPaused((wasPaused) => !wasPaused)}
          aria-pressed={paused}
          aria-label={paused ? 'Resume the scrolling list' : 'Pause the scrolling list'}
          className="absolute right-2 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center
                     justify-center rounded-full border border-line-strong bg-bg text-muted
                     transition-colors hover:border-ink hover:text-ink sm:right-4"
        >
          {paused ? <Play size={16} strokeWidth={2.2} aria-hidden /> : <Pause size={16} strokeWidth={2.2} aria-hidden />}
        </button>
      )}
    </section>
  );
}
