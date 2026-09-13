'use client';

import { useEffect, useRef } from 'react';
import SectionHeading from './SectionHeading';
import { STACK, STACK_COUNT } from '@/lib/content';

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
      className="relative overflow-hidden bg-accent-2 py-section text-bg"
    >
      <div className="grid-lines-dark pointer-events-none absolute inset-0 opacity-70" aria-hidden />

      <div className="shell relative">
        <SectionHeading
          eyebrow="The stack"
          tone="dark"
          title={
            <>
              {STACK_COUNT} tools. <span className="text-bg/55">All of them yours on day 31.</span>
            </>
          }
        />

        <div ref={root} className="mt-14 space-y-10">
          {STACK.map((group) => (
            <div
              key={group.group}
              className="grid gap-4 border-t border-white/10 pt-6 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-8"
            >
              <h3 className="eyebrow text-bg/65">{group.group}</h3>
              <ul className="flex flex-wrap gap-2.5">
                {group.tools.map((tool) => (
                  <li
                    key={tool}
                    data-chip
                    className="rounded-full border border-white/20 bg-white/[0.05] px-4 py-2
                               font-sans text-[0.9375rem] text-bg/90"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-14 max-w-2xl text-lead text-bg/70">
          Every tool here is one you keep after day 30.{' '}
          <span className="text-bg">Nothing expires with your enrolment.</span> You leave with the
          logins, the accounts and the work inside them — not a viewing pass that lapses when the
          batch ends.
        </p>
      </div>
    </section>
  );
}
