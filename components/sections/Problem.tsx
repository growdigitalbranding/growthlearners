'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import DrawUnderline from '../ui/DrawUnderline';
import { PROBLEM } from '@/lib/content';
import { slideFrom, stagger, VIEWPORT } from '@/lib/motion';

/**
 * Two columns, entering from opposite sides. The right column's text settles
 * heavier as it arrives — the weight shift is the point of the section, so it
 * is the one thing that carries emphasis.
 */
export default function Problem() {
  const reduced = useReducedMotion();

  return (
    <section id="why" className="shell py-section-tight">
      <h2 className="sr-only">Why this course is built the way it is</h2>

      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
        <motion.div
          variants={slideFrom('left')}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="bg-bg p-7 sm:p-10"
        >
          <h3 className="eyebrow mb-7">{PROBLEM.left.eyebrow}</h3>
          <motion.ul variants={stagger} className="space-y-5">
            {PROBLEM.left.items.map((item) => (
              <motion.li
                key={item}
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                className="flex gap-3.5 text-[1.0625rem] leading-relaxed text-muted"
              >
                <X size={19} strokeWidth={2.2} className="mt-1 shrink-0 text-muted/45" aria-hidden />
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          variants={slideFrom('right')}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="relative bg-bg p-7 sm:p-10"
        >
          <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-accent md:inset-y-0 md:left-0 md:right-auto md:h-auto md:w-0.5" />
          <h3 className="eyebrow mb-7 text-ink">{PROBLEM.right.eyebrow}</h3>
          <motion.ul variants={stagger} className="space-y-5">
            {PROBLEM.right.items.map((item) => (
              <motion.li
                key={item}
                variants={{
                  hidden: { opacity: 0, y: 12, fontWeight: 400 },
                  // Inter ships as a variable font, so the weight interpolates
                  // rather than snapping. Held flat under reduced motion.
                  visible: reduced
                    ? { opacity: 1, y: 0, fontWeight: 500 }
                    : { opacity: 1, y: 0, fontWeight: 500, transition: { fontWeight: { duration: 0.9, delay: 0.25 } } },
                }}
                className="flex gap-3.5 text-[1.0625rem] leading-relaxed text-ink"
              >
                <Check size={19} strokeWidth={2.4} className="mt-1 shrink-0 text-accent" aria-hidden />
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      <p className="mt-8 max-w-3xl text-lead text-muted">
        Every session in this course is built backwards from{' '}
        <DrawUnderline weight={2} className="text-ink">
          that second column
        </DrawUnderline>
        .
      </p>
    </section>
  );
}
