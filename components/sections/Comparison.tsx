'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { COMPARISON } from '@/lib/content';
import { slideFrom, stagger, VIEWPORT } from '@/lib/motion';

/**
 * The same five steps, twice, in the same shape. The contrast does the work,
 * so neither column needs an adjective: one ends in "Forget", the other ends
 * in "Launch".
 */
function Column({
  label,
  steps,
  tone,
  from,
}: {
  label: string;
  steps: readonly string[];
  tone: 'them' | 'us';
  from: 'left' | 'right';
}) {
  const us = tone === 'us';
  return (
    <motion.div
      variants={slideFrom(from)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={`relative p-7 sm:p-10 ${us ? 'bg-accent-2 text-bg' : 'bg-bg'}`}
    >
      <h3 className={`eyebrow ${us ? 'text-accent' : 'text-muted'}`}>{label}</h3>

      <motion.ol variants={stagger} className="mt-8 space-y-1">
        {steps.map((step, index) => (
          <motion.li
            key={step}
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            className="flex items-center gap-4"
          >
            <span
              className={`w-6 shrink-0 font-sans text-sm tabular
                          ${us ? 'text-bg/40' : 'text-muted/60'}`}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className={`font-serif text-[1.5rem] leading-[1.6] sm:text-[1.875rem]
                          ${us ? 'text-bg' : 'text-muted'}`}
            >
              {step}
            </span>
            {index === steps.length - 1 && (
              <ArrowRight
                size={18}
                strokeWidth={2}
                aria-hidden
                className={`ml-auto shrink-0 ${us ? 'text-accent' : 'text-muted/30'}`}
              />
            )}
          </motion.li>
        ))}
      </motion.ol>
    </motion.div>
  );
}

export default function Comparison() {
  return (
    <section id="why" className="shell py-section">
      <h2 className="sr-only">How this course differs from most AI courses</h2>

      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
        <Column label={COMPARISON.them.label} steps={COMPARISON.them.steps} tone="them" from="left" />
        <Column label={COMPARISON.us.label} steps={COMPARISON.us.steps} tone="us" from="right" />
      </div>
    </section>
  );
}
