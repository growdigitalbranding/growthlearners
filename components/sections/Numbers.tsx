'use client';

import { motion } from 'framer-motion';
import CountUp from '../ui/CountUp';
import { reveal, stagger, VIEWPORT } from '@/lib/motion';
import { SITE } from '@/lib/site';
import { TOTAL_SESSIONS } from '@/lib/content';

// Ordered so the two 8s are not neighbours. Seats and deliverables are both
// 8, and at this size two identical numerals side by side read as a rendering
// fault rather than two facts. Putting the sessions count between them fixes
// it, and the sequence earns its keep anyway: what you leave with, how long it
// takes, why the room is small.
const STATS = [
  { value: SITE.deliverables, label: 'things you build', note: 'Every one of them yours, with the logins.' },
  { value: TOTAL_SESSIONS, label: 'sessions', note: 'Five evenings a week, for four weeks.' },
  { value: SITE.seats, label: 'seats', note: 'So someone can sit with you when your campaign is live.' },
];

/**
 * The page's one moment of real scale.
 *
 * Every other section on this page is a headline at the same size, in the same
 * place, above content in the same container. Read end to end that regularity
 * is the thing that makes a careful page feel like a template. This section
 * breaks the container entirely: the numerals run edge to edge at roughly a
 * seventh of the viewport width, with nothing else competing.
 *
 * Deliberately still on the light ground rather than another dark block. There
 * are already five dark sections, and a sixth would make dark ordinary; scale
 * is the surprise here, not colour.
 */
export default function Numbers() {
  return (
    <section aria-labelledby="numbers-heading" className="overflow-hidden py-section">
      <h2 id="numbers-heading" className="sr-only">
        The course in three numbers
      </h2>

      <motion.dl
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="grid gap-14 px-5 sm:grid-cols-3 sm:gap-6 sm:px-8 lg:gap-10 lg:px-12"
      >
        {STATS.map((stat) => (
          <motion.div key={stat.label} variants={reveal} className="min-w-0">
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              {/* Optically aligned to the left edge of the numeral rather than
                  its bearing, so the three read as one baseline row. */}
              <span className="block font-serif leading-[0.82] tracking-[-0.03em] text-ink
                               text-[clamp(5.5rem,15vw,13rem)]">
                <CountUp to={stat.value} />
              </span>

              {/* The <dt> above already carries this label. Without aria-hidden a
                  screen reader announces it twice: "sessions, 20, sessions". */}
              <span
                aria-hidden
                className="mt-6 block border-t-2 border-accent pt-4 font-sans text-[1.0625rem]
                           font-medium text-ink"
              >
                {stat.label}
              </span>

              <span className="mt-3 block max-w-[30ch] text-[0.9375rem] leading-relaxed text-muted">
                {stat.note}
              </span>
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  );
}
