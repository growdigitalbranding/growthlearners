'use client';

import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { PILLARS } from '@/lib/content';
import { reveal, stagger, VIEWPORT } from '@/lib/motion';

/**
 * The argument the whole page rests on, stated once and early: this is not a
 * tool list, it is a different way of doing the job. Six cards because there
 * are six things you will actually do, not because six fills a grid.
 */
export default function Pillars() {
  return (
    <section id="why-ai" className="shell py-section">
      <SectionHeading
        title={
          <>
            AI isn&rsquo;t another tool to add to your resume.{' '}
            <span className="text-muted">It&rsquo;s a new way of doing marketing.</span>
          </>
        }
      />

      <motion.ul
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
      >
        {PILLARS.map((pillar, index) => (
          <motion.li key={pillar.title} variants={reveal} className="bg-bg p-7 sm:p-9">
            <span className="font-sans text-sm tabular text-accent-deep">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-4 font-serif text-h3">{pillar.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{pillar.body}</p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
