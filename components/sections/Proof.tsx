'use client';

import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { TESTIMONIALS } from '@/lib/content';
import { reveal, stagger, VIEWPORT } from '@/lib/motion';

/**
 * Social proof, sitting between the honest outcomes and the price — which is
 * where every course landing-page pattern puts it, and where a reader is
 * deciding whether to believe the preceding section.
 *
 * Renders nothing until lib/content.ts has at least one real testimonial, so
 * the page never ships an empty or invented proof section. See the note above
 * TESTIMONIALS for what is worth collecting.
 */
export default function Proof() {
  if (TESTIMONIALS.length === 0) return null;

  const single = TESTIMONIALS.length < 3;

  return (
    <section id="proof" className="shell py-section">
      <SectionHeading
        eyebrow="From the last batch"
        title="What people who finished it say"
        lead="Unedited, and each one names the batch they were in."
      />

      <motion.ul
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className={`mt-14 grid gap-6 ${single ? 'max-w-3xl' : 'md:grid-cols-3'}`}
      >
        {TESTIMONIALS.map((testimonial) => (
          <motion.li
            key={`${testimonial.name}-${testimonial.batch}`}
            variants={reveal}
            className="flex flex-col rounded-2xl border border-line bg-ink/[0.015] p-7 sm:p-8"
          >
            <blockquote className="font-serif text-[1.375rem] leading-snug sm:text-[1.5rem]">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            {testimonial.result ? (
              <p className="mt-5 border-l-2 border-accent pl-4 text-[0.9375rem] text-muted">
                {testimonial.result}
              </p>
            ) : null}

            <footer className="mt-auto pt-6 text-[0.9375rem]">
              <p className="font-medium text-ink">{testimonial.name}</p>
              <p className="text-muted">{testimonial.role}</p>
              <p className="mt-1 text-[0.8125rem] text-muted">{testimonial.batch}</p>
            </footer>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
