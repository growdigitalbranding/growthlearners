'use client';

import { motion } from 'framer-motion';
import CountUp from '../ui/CountUp';
import { underline, reveal, stagger, VIEWPORT } from '@/lib/motion';
import { SITE } from '@/lib/site';
import { TOTAL_SESSIONS } from '@/lib/content';

const STATS = [
  { value: TOTAL_SESSIONS, label: 'sessions', note: 'Five evenings a week, for four weeks.' },
  { value: SITE.seats, label: 'seats', note: 'So someone can sit with you when your campaign is live.' },
  { value: SITE.deliverables, label: 'things you build', note: 'Every one of them yours, with the logins.' },
];

export default function Numbers() {
  return (
    <section aria-labelledby="numbers-heading" className="shell py-section">
      <h2 id="numbers-heading" className="sr-only">
        The course in three numbers
      </h2>

      <motion.dl
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="grid gap-12 sm:grid-cols-3 sm:gap-8"
      >
        {STATS.map((stat) => (
          <motion.div key={stat.label} variants={reveal}>
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <span className="block font-serif text-[clamp(4rem,2.5rem+7vw,8rem)] leading-none">
                <CountUp to={stat.value} />
              </span>
              <span className="relative mt-4 inline-block pb-2 font-sans text-lg text-ink">
                {stat.label}
                <motion.span
                  aria-hidden
                  variants={underline}
                  style={{ transformOrigin: 'left center' }}
                  className="absolute bottom-0 left-0 right-0 block h-[3px] rounded-full bg-accent"
                />
              </span>
              <span className="mt-4 block max-w-[26ch] text-[0.9375rem] leading-relaxed text-muted">
                {stat.note}
              </span>
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  );
}
