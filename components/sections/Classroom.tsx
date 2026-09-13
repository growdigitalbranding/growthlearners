'use client';

import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { CLASSROOM } from '@/lib/content';
import { reveal, stagger, VIEWPORT } from '@/lib/motion';
import { SITE } from '@/lib/site';

/**
 * The room, argued as an advantage rather than apologised for. This is where
 * the seat count stops being a scarcity tactic and becomes the reason the
 * format works.
 */
export default function Classroom() {
  return (
    <section id="classroom" className="shell py-section">
      <SectionHeading
        title={
          <>
            AI is digital.{' '}
            <span className="text-muted">Learning it doesn&rsquo;t have to be.</span>
          </>
        }
        lead={`${SITE.seats} people, one room in ${SITE.city}, five evenings a week. Everything below is a thing that only works in person, which is the whole reason this course is not a video library.`}
      />

      <motion.ul
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {CLASSROOM.map((item) => (
          <motion.li key={item.title} variants={reveal} className="border-t-2 border-ink pt-5">
            <h3 className="font-serif text-h3">{item.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
