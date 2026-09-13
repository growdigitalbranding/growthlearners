'use client';

import { useEffect, useState } from 'react';
import Wordmark from './ui/Wordmark';
import WhatsAppCta from './ui/WhatsAppCta';

const NAV = [
  { href: '#the-month', label: 'The month' },
  { href: '#curriculum', label: 'All 20 sessions' },
  { href: '#stack', label: 'Stack' },
  { href: '#fee', label: 'Fee' },
  { href: '#faq', label: 'FAQ' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-line bg-bg/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-4">
        <a href="#top" className="flex items-center" aria-label="Growthlearners — back to top">
          <Wordmark className="text-[1.75rem]" />
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-2 text-sm text-muted transition-colors hover:text-ink
                         after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left
                         after:scale-x-0 after:bg-accent after:transition-transform after:duration-300
                         hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <WhatsAppCta
          location="header"
          label="Enquire"
          className="btn-accent hidden !min-h-[2.75rem] !px-5 !py-2 text-sm sm:inline-flex"
          magnetic={false}
          iconSize={16}
        />
      </div>
    </header>
  );
}
