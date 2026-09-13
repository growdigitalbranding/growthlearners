'use client';

import { motion } from 'framer-motion';
import { reveal, stagger, VIEWPORT } from '@/lib/motion';

type Props = {
  eyebrow: string;
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
      <motion.p
        variants={reveal}
        className={`eyebrow mb-5 flex items-center gap-3 ${tone === 'dark' ? 'text-bg/65' : ''}`}
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
        {eyebrow}
      </motion.p>
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
