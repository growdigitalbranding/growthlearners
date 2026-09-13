'use client';

import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { CAREERS, SERVICES } from '@/lib/content';
import { reveal, stagger, VIEWPORT_TALL } from '@/lib/motion';

/**
 * Four doors, then the services you could actually sell.
 *
 * Deliberately no income figures. "Students earn ₹50,000 a month" is the claim
 * every course in this category makes and none of them can evidence. Naming the
 * work is honest and, for someone deciding, more useful than a number.
 */
export default function Careers() {
  return (
    <section
      id="careers"
      data-dark-section
      className="relative overflow-hidden bg-accent-2 py-section text-bg"
    >
      <div className="grid-lines-dark pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      <div className="shell relative">
        <SectionHeading tone="dark" title="Where this goes next" />

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_TALL}
          className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2"
        >
          {CAREERS.map((career) => (
            <motion.li key={career.door} variants={reveal} className="bg-accent-2 p-7 sm:p-9">
              <h3 className="eyebrow text-accent">{career.door}</h3>
              <ul className="mt-6 space-y-2.5">
                {career.roles.map((role) => (
                  <li key={role} className="font-serif text-[1.25rem] leading-snug text-bg sm:text-[1.4375rem]">
                    {role}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_TALL}
          className="mt-16 border-t border-white/10 pt-10"
        >
          <h3 className="max-w-[24ch] text-balance font-serif text-h3 text-bg">
            Turn your AI skills into services you can price.
          </h3>
          <p className="mt-4 max-w-2xl leading-relaxed text-bg/65">
            Session 20 covers how to package, price, pitch and deliver each of these. We will not
            tell you what you will earn, because nobody honestly can. We will tell you what the
            work is worth and how to ask for it.
          </p>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {SERVICES.map((service) => (
              <li
                key={service}
                className="rounded-full border border-white/20 bg-white/[0.05] px-4 py-2 font-sans text-[0.9375rem] text-bg/90"
              >
                {service}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
