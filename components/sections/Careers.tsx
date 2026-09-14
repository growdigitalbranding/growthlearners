'use client';

import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { CAREERS, SERVICES } from '@/lib/content';
import { reveal, stagger, VIEWPORT_TALL } from '@/lib/motion';

/**
 * Four doors, then the services you could actually sell.
 *
 * This is also the page's only "is this for me" moment, which is why it sits
 * near the top: the `who` line on each door is the persona grid that used to be
 * a separate section twenty screens further down. The reader sorts once.
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
        <SectionHeading
          tone="dark"
          title="Who this is for, and where it goes"
          lead="Four kinds of people take this course, and they want different things out of it. The four weeks are the same for all of them; what they walk out and do with it is not. It is worth knowing which one you are before you enrol."
        />

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
              <p className="mt-5 font-serif text-[1.375rem] leading-snug text-bg sm:text-[1.5rem]">
                {career.who}
              </p>
              <p className="mt-3 leading-relaxed text-bg/65">{career.why}</p>

              {/* A column rather than a separated inline run: four items at most,
                  and a wrapped inline list strands its separator at a line end. */}
              <ul className="mt-7 space-y-1.5 border-t border-white/10 pt-6">
                {career.roles.map((role) => (
                  <li key={role} className="font-sans text-[0.9375rem] text-bg/75">
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
            The last session of the course covers how to package, price, pitch and deliver each of
            these. We will not tell you what you will earn, because nobody honestly can. We will
            tell you what the work is worth and how to ask for it.
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
