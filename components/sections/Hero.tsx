'use client';

import { motion } from 'framer-motion';
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
  ['One', 'month.'],
  ['Twenty', 'sessions.'],
  ['Real', 'campaigns'],
  ['you', 'ran.'],
];

export default function Hero() {
  return (
    <section
      id="top"
      className="paper-noise relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-[4.5rem]"
    >
      {/* Background grid, drifting slower than the page. */}
      <Parallax speed={0.85} className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="grid-lines absolute -inset-y-32 inset-x-0" />
      </Parallax>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/3 -z-10 h-[26rem] w-[26rem]
                   rounded-full bg-accent/[0.07] blur-3xl"
      />

      <div className="hero-body shell flex flex-1 flex-col justify-center py-10 sm:py-12">
        <motion.p
          variants={heroRise}
          initial="hidden"
          animate="visible"
          className="eyebrow mb-7 flex flex-wrap items-center gap-x-3 gap-y-1"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          AI Digital Marketing Course
          <span className="hidden text-line-strong sm:inline" aria-hidden>/</span>
          <span>In person in {SITE.city}</span>
        </motion.p>

        <h1 className="hero-title max-w-[18ch] font-serif text-display">
          <motion.span variants={headlineGroup} initial="hidden" animate="visible" className="block">
            {HEADLINE.map((line, lineIndex) => (
              <span key={lineIndex} className="block overflow-hidden pb-[0.08em]">
                {line.map((word) => {
                  const isAccent = word === 'you' || word === 'ran.';
                  return (
                    <motion.span
                      key={word}
                      variants={headlineWord}
                      className="mr-[0.22em] inline-block last:mr-0"
                    >
                      {isAccent ? (
                        <span className="relative inline-block">
                          {word}
                          {word === 'ran.' && (
                            <motion.span
                              aria-hidden
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
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
            For final-year students and fresh graduates in {SITE.city}. You finish with a live
            website, live Google and Meta campaigns, an AI video ad, a CRM and an automation —
            <span className="text-ink"> all of it yours to keep.</span>
          </motion.p>

          <motion.div variants={heroRise} className="mt-8 flex flex-wrap items-center gap-3">
            <WhatsAppCta location="hero" label="WhatsApp us" />
            <a href="#curriculum" className="btn-ghost">
              See the {TOTAL_SESSIONS} sessions
              <ArrowDown size={17} strokeWidth={2} aria-hidden />
            </a>
          </motion.div>
        </motion.div>
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
          <span className="text-ink">Next batch {batchStartDisplay}</span>
          <span className="whitespace-nowrap">
            <span className="text-line-strong" aria-hidden>
              ·{' '}
            </span>
            {SITE.seats} seats
          </span>
          <span className="whitespace-nowrap tabular">
            <span className="text-line-strong" aria-hidden>
              ·{' '}
            </span>
            {SITE.feeDisplay}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
