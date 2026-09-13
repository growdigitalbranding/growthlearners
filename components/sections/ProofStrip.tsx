'use client';

import { DELIVERABLES } from '@/lib/content';

/**
 * Eight deliverables, not eight logos — the things a student walks out owning.
 * The track is duplicated and translated -50%, so the loop is seamless.
 * Hovering pauses it; reduced motion stops it outright (see globals.css) and
 * the row becomes a plain scrollable list.
 */
export default function ProofStrip() {
  const track = [...DELIVERABLES, ...DELIVERABLES];

  return (
    <section
      aria-labelledby="proof-heading"
      className="hairline group relative overflow-hidden border-b border-line bg-bg py-6 sm:py-8"
    >
      <h2 id="proof-heading" className="sr-only">
        What you walk out owning
      </h2>

      {/* Fades at both edges so items enter and leave rather than cutting off. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-bg to-transparent sm:w-24"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-bg to-transparent sm:w-24"
      />

      <div className="flex w-max animate-marquee items-center [--marquee-duration:46s] group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:overflow-x-auto motion-reduce:pb-2">
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex shrink-0 items-center"
            // The second copy exists only to make the loop seamless.
            aria-hidden={index >= DELIVERABLES.length}
          >
            <span className="whitespace-nowrap px-5 font-serif text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] sm:px-8">
              {item}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
          </span>
        ))}
      </div>
    </section>
  );
}
