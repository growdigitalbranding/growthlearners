'use client';

import { motion } from 'framer-motion';
import { reveal, stagger, VIEWPORT } from '@/lib/motion';

type Props = {
  /**
   * Optional, and deliberately rare. An eyebrow above every section headline
   * produces a templated rhythm that reads as machine-built, and mostly repeats
   * what the headline already says. Only sections whose label carries real
   * information the headline does not (what the product is, when the batch
   * starts) get one.
   */
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
  id?: string;
};

/** Shared eyebrow + h2 + lead block, so every section opens the same way. */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = 'light',
  className = '',
  id,
}: Props) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={className}
    >
      {eyebrow ? (
        <motion.p
          variants={reveal}
          className={`eyebrow mb-5 ${tone === 'dark' ? 'text-bg/65' : ''}`}
        >
          {eyebrow}
        </motion.p>
      ) : null}
      <motion.h2
        variants={reveal}
        id={id}
        className={`max-w-[22ch] text-balance font-serif text-h2 ${tone === 'dark' ? 'text-bg' : 'text-ink'}`}
      >
        {title}
      </motion.h2>
      {lead ? (
        <motion.p
          variants={reveal}
          className={`mt-6 max-w-2xl text-lead ${tone === 'dark' ? 'text-bg/70' : 'text-muted'}`}
        >
          {lead}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
