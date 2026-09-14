'use client';

import { useEffect, useRef } from 'react';
import SectionHeading from './SectionHeading';
import { WEEKS } from '@/lib/content';

/**
 * The narrative. Four stages, what changes in each, and what you leave with.
 * The full session list is the curriculum accordion's job, not this one's.
 *
 * The centrepiece. On desktop, ScrollTrigger pins the section and the four week
 * cards advance horizontally while a progress rail fills in accent.
 *
 * Below 768px — and under reduced motion at any width — the pin is dropped
 * entirely and the same markup renders as a vertical stepper. That is not a
 * degraded fallback bolted on afterwards: the cards are laid out with flex
 * either way, and only the transform and the pin are added on top.
 */
export default function TheMonth() {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const rail = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    // GSAP and ScrollTrigger are ~45kB and nothing above the fold needs them,
    // so they are fetched after hydration rather than shipped in the entry
    // chunk. The markup is server-rendered either way.
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);

      // Lenis drives the scroll position; ScrollTrigger needs telling when it moves.
      const lenis = window.__lenis;
      const onLenisScroll = () => ScrollTrigger.update();
      lenis?.on('scroll', onLenisScroll);

      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const sectionEl = section.current;
        const viewportEl = viewport.current;
        const trackEl = track.current;
        const railEl = rail.current;
        if (!sectionEl || !viewportEl || !trackEl || !railEl) return;

        // Distance the track must travel for its last card to sit flush right.
        // The track is width:max-content, so its own scrollWidth and clientWidth
        // are identical — the overflow only exists relative to the viewport
        // element that clips it, which is what this measures against.
        const travel = () => Math.max(0, trackEl.scrollWidth - viewportEl.clientWidth);

        const tween = gsap.to(trackEl, {
          x: () => -travel(),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top top',
            // Scroll distance is deliberately longer than the travel itself,
            // so the cards advance at a readable pace instead of snapping
            // across in half a flick of the wheel.
            end: () => `+=${travel() + window.innerHeight * 0.5}`,
            pin: true,
            anticipatePin: 1,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              railEl.style.transform = `scaleX(${self.progress})`;
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          railEl.style.transform = '';
        };
      });

      // Fonts land after first paint and change the track width.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      cleanup = () => {
        lenis?.off('scroll', onLenisScroll);
        mm.revert();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <section
      ref={section}
      id="the-month"
      className="relative overflow-hidden bg-bg py-section md:flex md:h-[100svh] md:flex-col md:justify-center md:py-0"
    >
      <div className="shell w-full">
        <SectionHeading
          title="30 days. 4 stages. One transformation."
          className="md:max-w-2xl"
        />

        {/* Progress rail. Static on mobile, filled by the scrub on desktop. */}
        <div className="mt-10 hidden h-px w-full bg-line md:block" aria-hidden>
          <span ref={rail} className="block h-px origin-left scale-x-0 bg-accent" />
        </div>
      </div>

      <div ref={viewport} className="mt-10 md:mt-12 md:overflow-hidden">
        <ol
          ref={track}
          className="flex flex-col gap-6 px-5 sm:px-8 md:w-max md:flex-row md:gap-8 md:px-12"
        >
          {WEEKS.map((week) => (
            <li
              key={week.n}
              className="flex flex-col rounded-2xl border border-line bg-ink/[0.015] p-7 sm:p-8
                         md:w-[min(28rem,62vw)] md:shrink-0 lg:w-[min(32rem,42vw)]"
            >
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
                <span className="eyebrow text-accent-deep">{week.label}</span>
                <span className="font-sans text-sm tabular text-muted">
                  {String(week.sessions[0].n).padStart(2, '0')}–
                  {String(week.sessions[week.sessions.length - 1].n).padStart(2, '0')}
                </span>
              </div>

              <h3 className="mt-5 text-balance font-serif text-h3">{week.title}</h3>

              {/* Deliberately the summary, not the session list. The full list
                  lives in the curriculum accordion below, and printing all
                  twenty titles in both places made the reader read the same
                  thing twice. */}
              <p className="mt-6 leading-relaxed text-muted">{week.summary}</p>

              <p className="mt-auto flex flex-wrap gap-x-2 border-l-2 border-accent pl-4 pt-6 text-[0.875rem] text-muted">
                <span className="font-medium text-ink">You leave with:</span>
                {week.checkpoint}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
