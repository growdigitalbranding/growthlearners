'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import WhatsAppCta from './WhatsAppCta';
import { SITE, telLink } from '@/lib/site';
import { track } from '@/lib/analytics';

/**
 * Mobile-only sticky bar, appearing once the hero has scrolled past and hiding
 * again over the final CTA, where a full-width WhatsApp button already sits.
 */
export default function StickyCta() {
  const [show, setShow] = useState(false);

  const [pastHero, setPastHero] = useState(false);
  const [atFinal, setAtFinal] = useState(false);

  // Two observers instead of a scroll listener that measured the final CTA with
  // getBoundingClientRect() on every frame. The bar shows once the hero is
  // behind you and hides again over the final CTA, where a full-width WhatsApp
  // button already sits.
  useEffect(() => {
    const hero = document.getElementById('top');
    const finalCta = document.getElementById('enquire');

    const observers: IntersectionObserver[] = [];

    if (hero) {
      const heroObserver = new IntersectionObserver(
        ([entry]) => setPastHero(!entry.isIntersecting),
        { threshold: 0 },
      );
      heroObserver.observe(hero);
      observers.push(heroObserver);
    }

    if (finalCta) {
      const finalObserver = new IntersectionObserver(
        ([entry]) =>
          // Hide once the final CTA is reached and keep it hidden below that.
          // isIntersecting alone goes false again when the CTA scrolls above
          // the viewport, which would pop the bar back up over the footer —
          // on top of the links a keyboard user is tabbing through down there.
          setAtFinal(entry.isIntersecting || entry.boundingClientRect.top < 0),
        { threshold: 0 },
      );
      finalObserver.observe(finalCta);
      observers.push(finalObserver);
    }

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  useEffect(() => {
    setShow(pastHero && !atFinal);
  }, [pastHero, atFinal]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          exit={{ y: '110%' }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-bg/95 backdrop-blur-md
                     pb-[env(safe-area-inset-bottom)] lg:hidden"
        >
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.8125rem] font-medium text-ink">
                {SITE.seats} seats · {SITE.feeDisplay}
              </p>
              <p className="truncate text-xs text-muted">In person in {SITE.city}</p>
            </div>
            <a
              href={telLink}
              onClick={() => track({ event: 'phone_click', location: 'sticky' })}
              aria-label={`Call ${SITE.phoneDisplay}`}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink"
            >
              <Phone size={18} strokeWidth={2} aria-hidden />
            </a>
            <WhatsAppCta
              location="sticky"
              label="WhatsApp"
              className="btn-accent shrink-0 !px-5"
              magnetic={false}
              iconSize={17}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
