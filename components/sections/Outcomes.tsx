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
            className={`bezel ${outcome.tone === 'accent' ? '!border-accent/30 !bg-accent/[0.07]' : ''}`}
          >
            <div className="bezel-core flex h-full flex-col p-7 sm:p-8">
              <h3 className="text-balance font-serif text-h3">{outcome.title}</h3>
              <p className="mt-4 leading-relaxed text-muted">{outcome.body}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
