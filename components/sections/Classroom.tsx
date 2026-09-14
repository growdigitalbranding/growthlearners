'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { CLASSROOM, CLASSROOM_PHOTO } from '@/lib/content';
import { reveal, stagger, VIEWPORT } from '@/lib/motion';
import { SITE } from '@/lib/site';

/**
 * The room, argued as an advantage rather than apologised for. This is where
 * the seat count stops being a scarcity tactic and becomes the reason the
 * format works.
 *
 * The photograph is the section now, and the six statements read as captions
 * to it rather than as a grid of features. That is the point: "in person" is
 * the one claim here a video library cannot copy, and it was being made
 * entirely in prose. A reader can argue with a sentence about a room. It is
 * harder to argue with the room.
 *
 * The frame is 4:5 because the photograph is 4:5, so nothing is cropped away.
 * The alternative was a wide band running edge to edge, which is the more
 * fashionable layout and would have thrown out the ceiling, the lights and
 * the sign on the back wall — most of what makes it read as a real place
 * rather than a stock interior.
 *
 * Still renders without the photo, as six statements in a grid. A section
 * that collapses when an asset is missing is a section that will one day
 * ship broken.
 */
export default function Classroom() {
  return (
    <section id="classroom" className="shell py-section">
      <SectionHeading
        title={
          <>
            AI is digital.{' '}
            <span className="text-muted">Learning it doesn&rsquo;t have to be.</span>
          </>
        }
        lead={`${SITE.seats} people, one room in ${SITE.city}, five evenings a week. Everything below is a thing that only works in person, which is the whole reason this course is not a video library.`}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12"
      >
        {CLASSROOM_PHOTO ? (
          <motion.figure variants={reveal} className="lg:col-span-5">
            {/* Capped below lg so a 4:5 portrait at full shell width does not
                become an 875px wall on a tablet. On lg it takes the column. */}
            <div className="mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink/5">
                <Image
                  src={CLASSROOM_PHOTO.src}
                  alt={CLASSROOM_PHOTO.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 92vw"
                  // No `priority`. This sits well below the fold, and a preload
                  // down here competes with the hero for the first bytes — the
                  // exact trade that cost 0.5s of LCP on the hero cluster.
                  loading="lazy"
                  className="object-cover"
                  style={{ objectPosition: CLASSROOM_PHOTO.position ?? 'center' }}
                />
              </div>
              {/* Deliberately no seat count here. The number is already stated
                  four times on this page, and printing it under a photograph
                  where a reader can count chairs invites them to check it. */}
              <figcaption className="mt-4 text-[0.9375rem] text-muted">
                The room in {SITE.city}.
              </figcaption>
            </div>
          </motion.figure>
        ) : null}

        <motion.ul
          variants={stagger}
          className={`grid gap-x-10 gap-y-8 sm:grid-cols-2 ${
            CLASSROOM_PHOTO ? 'lg:col-span-7 lg:grid-cols-1 lg:gap-y-7' : 'lg:col-span-12 lg:grid-cols-3'
          }`}
        >
          {CLASSROOM.map((item) => (
            <motion.li key={item.title} variants={reveal} className="border-t-2 border-ink pt-5">
              <h3 className="font-serif text-h3">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
