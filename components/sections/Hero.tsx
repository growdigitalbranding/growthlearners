'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import Parallax from '../ui/Parallax';
import WhatsAppCta from '../ui/WhatsAppCta';
import { headlineGroup, headlineWord, heroGroup, heroRise } from '@/lib/motion';
import { SITE, batchStartDisplay } from '@/lib/site';
import { TOTAL_SESSIONS } from '@/lib/content';

/**
 * The headline animates transform only — never opacity — so it is painted at
 * full contrast in the first frame and LCP is not gated behind the animation.
 * Each word sits in an overflow-hidden line box and rises into place: emphasis,
 * not existence.
 */
const HEADLINE: string[][] = [
  ['What', 'if', 'you', 'could'],
  ['build', 'an', 'entire'],
  ['marketing', 'campaign'],
  ['with', 'AI?'],
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-[4.5rem]"
    >
      {/* Background grid, drifting slower than the page. */}
      <Parallax speed={0.85} className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="grid-lines absolute -inset-y-32 inset-x-0" />
      </Parallax>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/3 -z-10 h-[26rem] w-[26rem]
                   rounded-full bg-accent/[0.07] blur-3xl lg:opacity-60"
      />

      <div className="hero-body shell flex flex-1 items-center py-10 sm:py-12">
        <div
          className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14
                        xl:grid-cols-[minmax(0,1fr)_26rem]"
        >
          <div className="min-w-0">
            <motion.p
              variants={heroRise}
              initial="hidden"
              animate="visible"
              className="eyebrow mb-7 flex flex-wrap items-center gap-x-3 gap-y-1"
            >
              AI Digital Marketing
              <span className="hidden text-line-strong sm:inline" aria-hidden>
                /
              </span>
              <span>{SITE.city}</span>
            </motion.p>

            <h1 className="hero-title max-w-[18ch] font-serif text-display">
              <motion.span
                variants={headlineGroup}
                initial="hidden"
                animate="visible"
                className="block"
              >
                {HEADLINE.map((line, lineIndex) => (
                  <span key={lineIndex} className="block overflow-hidden pb-[0.08em]">
                    {line.map((word) => {
                      const isAccent = word === 'with' || word === 'AI?';
                      return (
                        <motion.span
                          key={word}
                          variants={headlineWord}
                          className="mr-[0.22em] inline-block last:mr-0"
                        >
                          {isAccent ? (
                            <span className="relative inline-block">
                              {word}
                              {word === 'AI?' && (
                                <motion.span
                                  aria-hidden
                                  initial={{ scaleX: 0 }}
                                  animate={{ scaleX: 1 }}
                                  transition={{
                                    duration: 0.75,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: 0.85,
                                  }}
                                  style={{ transformOrigin: 'left center' }}
                                  className="absolute -bottom-[0.02em] left-0 right-0 block h-[0.07em]
                                         rounded-full bg-accent"
                                />
                              )}
                            </span>
                          ) : (
                            word
                          )}
                        </motion.span>
                      );
                    })}
                  </span>
                ))}
              </motion.span>
            </h1>

            {/* The underline spans both words, so it is drawn once across the phrase. */}
            <motion.div
              variants={heroGroup}
              initial="hidden"
              animate="visible"
              className="mt-7 max-w-2xl sm:mt-8"
            >
              <motion.p variants={heroRise} className="text-lead text-muted">
                Learn to research, strategize, create, automate and launch real digital campaigns
                <span className="text-ink"> in 30 days.</span>
              </motion.p>

              <motion.div variants={heroRise} className="mt-8 flex flex-wrap items-center gap-3">
                <WhatsAppCta location="hero" label="Join the next batch" />
                <a href="#portfolio" className="btn-ghost group">
                  See what you will make
                  <span className="btn-icon-ghost">
                    <ArrowDown size={15} strokeWidth={2} aria-hidden />
                  </span>
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* The work, in the hero rather than eight screens below it.
            The brief's own conclusion was that the student outputs are the
            visual identity, and a hero of text over a gradient wash is a
            placeholder however well the type is set.

            Hidden below lg on purpose. The mobile hero already fills 100svh
            exactly, and pushing the CTA below the fold to fit a picture is a
            worse trade than a text-first hero on a phone. Phones meet the work
            one screen later, in the marquee and the gallery. */}
          <div aria-hidden className="relative hidden h-[min(30rem,46vh)] lg:block xl:h-[min(34rem,52vh)]">
            <motion.div
              variants={heroRise}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.24 }}
              className="absolute right-0 top-0 h-full w-[64%] overflow-hidden rounded-2xl
                       border border-line bg-surface shadow-[0_30px_80px_-40px_rgba(14,14,14,0.45)]"
            >
              {/* No `priority` on either image. next/image emits a preload from
                  the document head whether or not the element renders, and these
                  are hidden below lg, so on a phone it preloaded an image nobody
                  sees in competition with the real LCP element: 2.71s became
                  3.23s. Decoration at a breakpoint the mobile profile never
                  reaches loads lazily like everything else. */}
              <Image
                src="/work/realestate-aurelia.webp"
                alt=""
                fill
                loading="lazy"
                sizes="(min-width: 1280px) 19rem, 16rem"
                className="object-cover"
              />
            </motion.div>

            <motion.div
              variants={heroRise}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.38 }}
              className="absolute bottom-4 left-0 aspect-square w-[50%] overflow-hidden rounded-2xl
                       border border-line bg-surface shadow-[0_30px_80px_-40px_rgba(14,14,14,0.5)]"
            >
              <Image
                src="/work/fashion-social-post.webp"
                alt=""
                fill
                sizes="(min-width: 1280px) 15rem, 13rem"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Live status, sitting on the fold edge. */}
      <motion.div
        variants={heroRise}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
        className="hairline"
      >
        <div className="shell flex flex-wrap items-center gap-x-3 gap-y-1 py-4 font-sans text-[0.8125rem] text-muted sm:py-5">
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {/* Each separator travels with the item that follows it, so a wrap
              never strands a lone middot at the end of a line. */}
          <span className="text-ink">{SITE.seats} seats</span>
          <span className="whitespace-nowrap">
            <span className="text-line-strong" aria-hidden>
              ·{' '}
            </span>
            {TOTAL_SESSIONS} live sessions
          </span>
          <span className="whitespace-nowrap">
            <span className="text-line-strong" aria-hidden>
              ·{' '}
            </span>
            Offline classroom
          </span>
          <span className="whitespace-nowrap tabular text-ink">
            <span className="text-line-strong" aria-hidden>
              ·{' '}
            </span>
            {SITE.feeDisplay}
          </span>
          <span className="whitespace-nowrap tabular">
            <span className="text-line-strong" aria-hidden>
              ·{' '}
            </span>
            Next batch {batchStartDisplay}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
