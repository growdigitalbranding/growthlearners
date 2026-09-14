'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import SectionHeading from './SectionHeading';
import { PIPELINE } from '@/lib/content';
import { reveal, stagger, VIEWPORT_TALL } from '@/lib/motion';

/**
 * The positioning that separates this from a prompt course: the machine does
 * the production, the student does the directing. Shown as the actual pipeline,
 * with each step marked as yours or directed, so the split is visible rather
 * than claimed.
 */
export default function CreativeDirector() {
  return (
    <section
      id="director"
      data-dark-section
      className="relative overflow-hidden bg-accent-2 py-section text-bg"
    >
      <div className="grid-lines-dark pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      <div className="shell relative">
        <SectionHeading
          tone="dark"
          title={
            <>
              AI is the production engine.{' '}
              <span className="text-accent">You are the director.</span>
            </>
          }
          lead="Anyone can generate an image. The job is knowing what the image has to do, and being able to say why the third version is the right one."
        />

        <div className="mt-16 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
        <motion.ol
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_TALL}
          className="grid gap-x-8 gap-y-3 md:grid-cols-[auto_1fr]"
        >
          {PIPELINE.map((stage, index) => {
            const last = index === PIPELINE.length - 1;
            return (
              <motion.li
                key={stage.step}
                variants={reveal}
                className="contents"
              >
                <div className="flex items-center gap-5 md:col-span-2">
                  <span className="w-10 shrink-0 font-sans text-sm tabular text-bg/50">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span
                    className={`flex-1 border-b pb-4 pt-1 font-serif text-[1.375rem] leading-snug sm:text-[1.75rem]
                                ${last ? 'border-accent text-accent' : 'border-white/10 text-bg'}`}
                  >
                    {stage.step}
                  </span>

                  <span className="w-24 shrink-0 text-right font-sans text-[0.8125rem] uppercase tracking-[0.14em] text-bg/50">
                    {stage.note}
                  </span>

                  {!last && (
                    <ArrowDown
                      size={14}
                      strokeWidth={2}
                      aria-hidden
                      className="hidden shrink-0 text-bg/30 md:block"
                    />
                  )}
                </div>
              </motion.li>
            );
          })}
        </motion.ol>

          {/* The output of the exact pipeline listed to the left, so the
              section shows the thing it is describing instead of only naming
              the steps. Lazy, below lg it would only push the list down. */}
          <motion.figure
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_TALL}
            className="hidden lg:block"
          >
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/work/film-pringles.jpg"
                alt=""
                fill
                loading="lazy"
                sizes="20rem"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 text-[0.9375rem] leading-relaxed text-bg/55">
              A frame from a student brand film, built through exactly these seven steps.
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
