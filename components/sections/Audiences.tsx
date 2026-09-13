'use client';

import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { AUDIENCES } from '@/lib/content';
import { reveal, stagger, VIEWPORT } from '@/lib/motion';

export default function Audiences() {
  return (
    <section id="who" className="shell py-section">
      <SectionHeading
        title="Who this is for"
        lead="Six kinds of people take this course, and they want different things out of it. It is worth knowing which one you are before you enrol."
      />

      <motion.ul
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {AUDIENCES.map((audience) => (
          <motion.li key={audience.who} variants={reveal} className="bezel">
            <div className="bezel-core h-full p-7">
              <h3 className="font-serif text-h3">{audience.who}</h3>
              <p className="mt-3 leading-relaxed text-muted">{audience.why}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
