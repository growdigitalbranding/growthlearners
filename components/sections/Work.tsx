'use client';

import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { WORK } from '@/lib/content';
import SampleBadge from '../ui/SampleBadge';
import { reveal, stagger, VIEWPORT_TALL } from '@/lib/motion';

/**
 * The cinematic gallery of student work.
 *
 * This is the section the whole direction rests on: the product is sold by
 * showing what people can create, and the student outputs are meant to be the
 * visual identity of the page.
 *
 * It renders nothing until there is real work in lib/content.ts. That is not a
 * placeholder waiting to be filled with stock; on a page whose entire claim is
 * "look what students made", an image no student made is the one lie the page
 * cannot survive.
 */
export default function Work() {
  if (WORK.length === 0) return null;

  return (
    <section
      id="work"
      data-dark-section
      className="relative overflow-hidden bg-accent-2 py-section text-bg"
    >
      <div className="shell relative">
        <SectionHeading
          tone="dark"
          title="Look what you'll create"
          lead="Every piece below was made by a student during the month, from their own brief."
        />
        {WORK.some((item) => item.placeholder) && (
          <div className="mt-8">
            <SampleBadge tone="dark" />
          </div>
        )}
      </div>

      <motion.ul
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_TALL}
        className="shell mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4"
      >
        {WORK.map((item) => (
          <motion.li
            key={item.title}
            variants={reveal}
            className="group relative break-inside-avoid overflow-hidden rounded-xl
                       border border-white/10 bg-white/[0.03]"
          >
            <div style={{ aspectRatio: item.ratio ?? '4/5' }} className="w-full overflow-hidden">
              {item.type === 'video' ? (
                <video
                  src={item.src}
                  poster={item.poster}
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-label={`${item.kind} by ${item.student}`}
                  className="h-full w-full object-cover"
                  onMouseEnter={(event) => void event.currentTarget.play()}
                  onMouseLeave={(event) => event.currentTarget.pause()}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.src}
                  alt={`${item.title}. ${item.kind}, made by ${item.student}.`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-editorial
                             [@media(hover:hover)and(pointer:fine)]:group-hover:scale-[1.03]"
                />
              )}
            </div>

            <figcaption className="flex items-baseline justify-between gap-4 px-4 py-3.5">
              <span className="min-w-0 truncate text-[0.9375rem] text-bg">{item.title}</span>
              <span className="shrink-0 text-[0.8125rem] text-bg/55">{item.student}</span>
            </figcaption>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
