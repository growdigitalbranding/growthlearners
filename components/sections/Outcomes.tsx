'use client';

import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { OUTCOMES } from '@/lib/content';
import { reveal, stagger, VIEWPORT } from '@/lib/motion';

/**
 * The section where trust is won or lost. Plain language, no hedging, and the
 * uncomfortable thing said first.
 */
export default function Outcomes() {
  return (
    <section id="outcomes" className="shell py-section">
      <SectionHeading
        eyebrow="Outcomes"
        title="What we will and will not promise you"
        lead="Read this part carefully, and compare it with what you are told elsewhere. If a course guarantees you a job for a month's fee, ask them to put the guarantee in writing."
      />

      <motion.ul
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="mt-14 grid gap-6 md:grid-cols-3"
      >
        {OUTCOMES.map((outcome) => (
          <motion.li
            key={outcome.title}
            variants={reveal}
            className={`flex flex-col rounded-2xl border p-7 sm:p-8 ${
              outcome.tone === 'accent'
                ? 'border-accent/35 bg-accent/[0.05]'
                : 'border-line bg-ink/[0.015]'
            }`}
          >
            <h3 className="text-balance font-serif text-h3">{outcome.title}</h3>
            <p className="mt-4 leading-relaxed text-muted">{outcome.body}</p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
