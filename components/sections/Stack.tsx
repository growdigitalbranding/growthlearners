'use client';

import { useEffect, useRef } from 'react';
import SectionHeading from './SectionHeading';
import { TOOL_STRIP } from '@/lib/content';

/**
 * The one inverted section — it gives the scroll a spine, and it is the direct
 * counter to a platform-access pitch: every tool here outlives the enrolment.
 *
 * The chips are rendered visible. The hidden start state is applied by GSAP at
 * runtime, so the list still reads with JavaScript off instead of staying at
 * opacity 0 forever.
 */
export default function Stack() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    // Fetched after hydration, like the pinned sequence — nothing above the
    // fold needs GSAP, so it stays out of the entry chunk.
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const chips = root.current?.querySelectorAll<HTMLElement>('[data-chip]');
        if (!chips || chips.length === 0) return;

        gsap.set(chips, { opacity: 0, y: 18 });

        const tween = gsap.to(chips, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          // Auto-detected grid gives a diagonal sweep rather than a flat wave.
          stagger: { each: 0.025, from: 'start', grid: 'auto' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top 75%',
            // Reveal once, stay revealed — re-triggering on scroll up feels broken.
            once: true,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(chips, { clearProps: 'opacity,transform' });
        };
      });

      cleanup = () => mm.revert();
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <section
      id="stack"
      data-dark-section
      className="relative overflow-hidden bg-accent-2 py-section-tight text-bg"
    >
      <div className="grid-lines-dark pointer-events-none absolute inset-0 opacity-70" aria-hidden />

      <div className="shell relative">
        <SectionHeading
          tone="dark"
          title={
            <>
              The tools are replaceable.{' '}
              <span className="text-accent">The workflow isn&rsquo;t.</span>
            </>
          }
          lead="Half of these did not exist two years ago and some will be gone in two more. What does not change is knowing what you are trying to make, and being able to tell when the machine has got it wrong."
        />

        <div ref={root} className="mt-14 flex flex-wrap gap-2.5">
          {TOOL_STRIP.map((tool) => (
            <span
              key={tool}
              data-chip
              className="rounded-full border border-white/20 bg-white/[0.05] px-4 py-2
                         font-sans text-[0.9375rem] text-bg/90"
            >
              {tool}
            </span>
          ))}
        </div>

        <p className="mt-12 max-w-2xl text-lead text-bg/70">
          You keep every account you open during the month.{' '}
          <span className="text-bg">Nothing expires with your enrolment.</span>
        </p>

      </div>
    </section>
  );
}
