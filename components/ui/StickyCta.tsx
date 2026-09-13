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

  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.9;
      const finalCta = document.getElementById('enquire');
      const atFinal = finalCta ? finalCta.getBoundingClientRect().top < window.innerHeight : false;
      setShow(pastHero && !atFinal);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

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
