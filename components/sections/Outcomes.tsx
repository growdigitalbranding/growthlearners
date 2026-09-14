'use client';

import { motion } from 'framer-motion';
import { OUTCOMES } from '@/lib/content';
import { reveal, stagger, VIEWPORT } from '@/lib/motion';

/**
 * The section where trust is won or lost. Plain language, no hedging, and the
 * uncomfortable thing said first.
 *
 * Composed against the grain of the rest of the page on purpose. Everywhere
 * else the headline sits hard left with content stacked beneath it; here it is
 * centred, and the three promises are set as full-width statements with a rule
 * between them rather than three bordered cards side by side.
 *
 * The cards were the problem. A bold promise inside a box reads as a spec,
 * which is the opposite of what this section is for. Three sentences with air
 * around them read as someone saying them out loud.
 */
export default function Outcomes() {
  return (
    <section id="outcomes" className="shell py-section">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="mx-auto max-w-3xl text-center"
      >
        <motion.h2 variants={reveal} className="text-balance font-serif text-h2 text-ink">
          What we will and will not promise you
        </motion.h2>
        <motion.p variants={reveal} className="mx-auto mt-6 max-w-[52ch] text-lead text-muted">
          Read this part carefully, and compare it with what you are told elsewhere. If a course
          guarantees you a job for a month&rsquo;s fee, ask them to put the guarantee in writing.
        </motion.p>
      </motion.div>

      <motion.ul
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="mx-auto mt-16 max-w-4xl"
      >
        {OUTCOMES.map((outcome, i) => (
          <motion.li
            key={outcome.title}
            variants={reveal}
            className={`py-10 text-center ${i > 0 ? 'border-t border-line' : ''}`}
          >
            <h3
              className={`mx-auto max-w-[22ch] text-balance font-serif text-h3
                          ${outcome.tone === 'accent' ? 'text-accent-deep' : 'text-ink'}`}
            >
              {outcome.title}
            </h3>
            <p className="mx-auto mt-5 max-w-[58ch] text-[1.0625rem] leading-relaxed text-muted">
              {outcome.body}
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
