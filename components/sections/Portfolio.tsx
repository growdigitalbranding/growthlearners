'use client';

import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { PORTFOLIO } from '@/lib/content';
import { reveal, stagger, VIEWPORT_TALL } from '@/lib/motion';

/**
 * What is in the folder on day 31. Numbered as a list of artefacts rather than
 * a grid of cards, because the count is the argument.
 */
export default function Portfolio() {
  return (
    <section id="portfolio" className="shell py-section">
      <SectionHeading
        title={
          <>
            You don&rsquo;t finish with a certificate.{' '}
            <span className="text-muted">You finish with proof.</span>
          </>
        }
      />

      <motion.ol
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_TALL}
        className="mt-14 border-t border-line"
      >
        {PORTFOLIO.map((project) => (
          <motion.li
            key={project.n}
            variants={reveal}
            className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 border-b border-line py-6
                       sm:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1.1fr)] sm:gap-x-8 sm:py-7"
          >
            <span className="font-sans text-sm tabular text-accent-deep">
              {String(project.n).padStart(2, '0')}
            </span>
            <h3 className="font-serif text-[1.375rem] leading-snug sm:text-[1.75rem]">
              {project.title}
            </h3>
            <p className="col-start-2 mt-2 leading-relaxed text-muted sm:col-start-3 sm:mt-0">
              {project.note}
            </p>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
