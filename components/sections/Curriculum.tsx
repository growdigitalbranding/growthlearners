'use client';

import { motion } from 'framer-motion';
import Disclosure from '../ui/Disclosure';
import SectionHeading from './SectionHeading';
import { WEEKS, TOTAL_SESSIONS } from '@/lib/content';
import { reveal, stagger, VIEWPORT_TALL } from '@/lib/motion';
import { track } from '@/lib/analytics';

/**
 * The reference, not the narrative. The journey section above carries what
 * changes in each stage and what you leave with; this one carries the detail
 * nobody else does: every session, its objective and its tools. Printing the
 * stage summaries in both places made the reader read the same paragraph twice.
 *
 * Complete and boring on purpose. This is the section a parent reads and a
 * serious applicant scrolls twice, so nothing is summarised away: every one of
 * the 20 sessions is here with its objective and the tools it uses.
 */
export default function Curriculum() {
  return (
    <section id="curriculum" className="shell py-section">
      <SectionHeading
        title={
          <>
            The whole syllabus. <span className="text-muted">Nothing held back.</span>
          </>
        }
        lead="Open any session to see what you will be able to do by the end of it and the tools you will do it with. There is no bonus module and no locked content. This is the entire course."
      />

      <div className="mt-14 space-y-14">
        {WEEKS.map((week) => (
          <motion.div
            key={week.n}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_TALL}
          >
            <motion.div
              variants={reveal}
              className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b-2 border-ink pb-4"
            >
              <span className="eyebrow text-accent-deep">{week.label}</span>
              <h3 className="font-serif text-h3">{week.title}</h3>
              <span className="ml-auto font-sans text-sm tabular text-muted">
                Sessions {week.sessions[0].n}-{week.sessions[week.sessions.length - 1].n}
              </span>
            </motion.div>

            <motion.div variants={reveal} className="mt-7">
              {week.sessions.map((session) => (
                <Disclosure
                  key={session.n}
                  onOpen={() => track({ event: 'curriculum_open', session: session.n, title: session.title })}
                  summary={
                    <span className="flex items-baseline gap-4 sm:gap-6">
                      <span className="w-7 shrink-0 font-sans text-sm tabular text-accent-deep sm:w-9">
                        {String(session.n).padStart(2, '0')}
                      </span>
                      <span className="font-serif text-[1.25rem] leading-snug sm:text-[1.5rem]">
                        {session.title}
                      </span>
                    </span>
                  }
                >
                  <div className="pl-11 sm:pl-[3.75rem]">
                    <p className="max-w-2xl leading-relaxed text-muted">{session.objective}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {session.tools.map((tool) => (
                        <li
                          key={tool}
                          className="rounded-full border border-line-strong px-3 py-1 font-sans text-xs text-muted"
                        >
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Disclosure>
              ))}
            </motion.div>

          </motion.div>
        ))}
      </div>
    </section>
  );
}
