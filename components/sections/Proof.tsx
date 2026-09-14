'use client';

import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { TESTIMONIALS } from '@/lib/content';
import SampleBadge from '../ui/SampleBadge';
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
        title="What people who finished it say"
        lead="Unedited, and each one names the batch they were in."
      />

      {TESTIMONIALS.some((item) => item.placeholder) && (
        <div className="mt-8">
          <SampleBadge />
        </div>
      )}

      {/* Asymmetric on purpose. Three equal quote cards side by side is both
          the banned three-column feature row and the same grid this page uses
          everywhere else; leading with one quote at size and stacking the rest
          beside it gives the section its own shape. No card chrome: a quote in
          a bordered box reads as a specimen rather than something someone
          said. */}
      <motion.ul
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className={`mt-14 grid gap-x-12 gap-y-10 ${single ? 'max-w-3xl' : 'lg:grid-cols-12'}`}
      >
        {TESTIMONIALS.map((testimonial, i) => {
          const lead = !single && i === 0;
          return (
            <motion.li
              key={`${testimonial.name}-${testimonial.batch}`}
              variants={reveal}
              className={
                single
                  ? ''
                  : lead
                    ? 'lg:col-span-7 lg:row-span-2'
                    : 'border-t border-line pt-8 lg:col-span-5 lg:border-t-0 lg:pt-0'
              }
            >
              <blockquote
                className={
                  lead
                    ? 'font-serif text-[1.75rem] leading-snug text-ink sm:text-[2.125rem]'
                    : 'font-serif text-[1.25rem] leading-snug text-ink sm:text-[1.375rem]'
                }
              >
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {testimonial.result ? (
                <p className="mt-5 border-l-2 border-accent pl-4 text-[0.9375rem] text-muted">
                  {testimonial.result}
                </p>
              ) : null}

              <footer className="mt-6 flex flex-wrap items-baseline gap-x-3 text-[0.9375rem]">
                <span className="font-medium text-ink">{testimonial.name}</span>
                <span className="text-muted">{testimonial.role}</span>
                <span className="text-[0.8125rem] text-muted">{testimonial.batch}</span>
              </footer>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}
