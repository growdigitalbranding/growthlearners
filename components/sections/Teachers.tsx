'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { TEACHERS } from '@/lib/content';
import SampleBadge from '../ui/SampleBadge';
import { reveal, stagger, VIEWPORT } from '@/lib/motion';
import { SITE } from '@/lib/site';

/**
 * Who actually teaches this.
 *
 * Sits between the honest outcomes and the fee, which is where a reader has
 * just been told what will and will not be promised and is deciding whether to
 * believe it. A name and a checkable credential is what turns that corner.
 *
 * Renders nothing until lib/content.ts has a real person in it. An invented
 * trainer on a page about a room you physically sit in would be found out in
 * one phone call.
 */
export default function Teachers() {
  if (TEACHERS.length === 0) return null;

  const single = TEACHERS.length === 1;

  return (
    <section id="teachers" className="shell py-section">
      <SectionHeading
        title="Who teaches it"
        lead={
          single
            ? `The person who runs campaigns for paying clients out of ${SITE.city}, and who takes every one of the ${SITE.sessions} sessions. You will be in a room with them, not watching a screen.`
            : `The same people who run campaigns for paying clients out of ${SITE.city}. You will be in a room with them for ${SITE.sessions} evenings, not watching them on a screen.`
        }
      />

      {TEACHERS.some((teacher) => teacher.placeholder) && (
        <div className="mt-8">
          <SampleBadge />
        </div>
      )}

      {/* One trainer, so no grid and no card. A single bordered box floating
          in a wide column looks like a grid missing its other two cells. Name
          and role hold the left, the credential and the thing that proves it
          hold the right. */}
      <motion.ul
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className={single ? 'mt-14' : 'mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3'}
      >
        {TEACHERS.map((teacher) => (
          <motion.li
            key={teacher.name}
            variants={reveal}
            className={
              single
                ? 'grid gap-8 border-t-2 border-ink pt-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-14'
                : 'bezel'
            }
          >
            <div className={single ? '' : 'bezel-core flex h-full flex-col p-7 sm:p-8'}>
              {teacher.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={teacher.photo}
                  alt={`${teacher.name}, ${teacher.role}`}
                  width={96}
                  height={96}
                  loading="lazy"
                  className="mb-6 h-24 w-24 rounded-2xl object-cover"
                />
              ) : null}

              <h3 className={single ? 'font-serif text-h2 text-ink' : 'font-serif text-h3'}>
                {teacher.name}
              </h3>
              <p className="mt-2 text-[1.0625rem] text-muted">{teacher.role}</p>

              {single ? null : (
                <>
                  <p className="mt-5 leading-relaxed text-ink">{teacher.credential}</p>
                  {teacher.linkedin ? (
                    <a
                      href={teacher.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 self-start py-3 text-[0.9375rem]
                                 font-medium text-accent-deep underline decoration-accent/40
                                 underline-offset-4 transition-colors duration-150
                                 hover:decoration-accent focus-visible:decoration-accent"
                    >
                      Check this profile
                      <ArrowUpRight size={15} strokeWidth={2.2} aria-hidden />
                      <span className="sr-only">on LinkedIn (opens in a new tab)</span>
                    </a>
                  ) : null}
                  <p className="mt-auto border-l-2 border-accent pl-4 pt-6 text-[0.9375rem] text-muted">
                    <span className="font-medium text-ink">Takes:</span> {teacher.teaches}
                  </p>
                </>
              )}
            </div>

            {single ? (
              <div>
                <p className="text-[1.125rem] leading-relaxed text-ink">{teacher.credential}</p>

                {teacher.linkedin ? (
                  <a
                    href={teacher.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 py-3 text-[0.9375rem] font-medium
                               text-accent-deep underline decoration-accent/40 underline-offset-4
                               transition-colors duration-150 hover:decoration-accent
                               focus-visible:decoration-accent"
                  >
                    Check this profile
                    <ArrowUpRight size={15} strokeWidth={2.2} aria-hidden />
                    <span className="sr-only">on LinkedIn (opens in a new tab)</span>
                  </a>
                ) : null}

                <p className="mt-6 border-l-2 border-accent pl-4 text-[0.9375rem] text-muted">
                  <span className="font-medium text-ink">Takes:</span> {teacher.teaches}
                </p>
              </div>
            ) : null}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
