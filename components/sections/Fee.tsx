'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import SectionHeading from './SectionHeading';
import WhatsAppCta from '../ui/WhatsAppCta';
import { FEE_INCLUDES } from '@/lib/content';
import { reveal, stagger, VIEWPORT } from '@/lib/motion';
import { SITE, batchStartDisplay } from '@/lib/site';

export default function Fee() {
  return (
    <section id="fee" className="shell py-section">
      <SectionHeading eyebrow="Fee" title="One number. Everything in it." />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="bezel mt-12"
      >
        <div className="bezel-core grid overflow-hidden md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <motion.div variants={reveal} className="border-b border-line p-8 sm:p-10 md:border-b-0 md:border-r">
            <p className="eyebrow">Course fee</p>
            <p className="mt-5 font-serif text-[clamp(3.25rem,2rem+6vw,5.5rem)] leading-none tabular">
              {SITE.feeDisplay}
            </p>
            <p className="mt-4 text-[0.9375rem] text-muted">
              All {SITE.sessions} sessions · {SITE.durationWeeks} weeks · in person in {SITE.city}
            </p>

            <div className="mt-8 space-y-2 border-t border-line pt-6 text-[0.9375rem]">
              <p className="text-ink">
                No hidden module fees. No mid-course upsell.
              </p>
              <p className="text-muted">
                The price on this page is the price. Nothing is unlocked later for extra, and there is
                no &ldquo;advanced&rdquo; tier we will try to sell you in week three.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppCta
                location="fee"
                label="Ask about this batch"
                message={`Hi Growthlearners, I'd like to enrol in the AI Digital Marketing Course starting ${batchStartDisplay}. Could you confirm the fee and whether a seat is still open?`}
              />
            </div>
          </motion.div>

          <motion.div variants={reveal} className="p-8 sm:p-10">
            <p className="eyebrow mb-6">What the fee covers</p>
            <ul className="space-y-3.5">
              {FEE_INCLUDES.map((item) => (
                <li key={item} className="flex gap-3.5 text-[1.0625rem] leading-relaxed">
                  <Check size={19} strokeWidth={2.4} className="mt-1 shrink-0 text-accent" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
