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
  const [inverted, setInverted] = useState(false);

  useEffect(() => {
    // The header is fixed and light. Over the inverted sections that reads as a
    // pale band laid across the design, so the bar takes their colour instead.
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const band = 36; // the header's own midline
      const overDark = Array.from(document.querySelectorAll('[data-dark-section]')).some((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top <= band && rect.bottom >= band;
      });
      setInverted(overDark);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const shellTone = inverted
    ? 'border-white/10 bg-accent-2/85 backdrop-blur-md'
    : scrolled
      ? 'border-line bg-bg/85 backdrop-blur-md'
      : 'border-transparent';

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${shellTone}`}>
      <div className="shell flex h-[4.5rem] items-center justify-between gap-4">
        <a
          href="#top"
          className="-ml-1 flex min-h-[3rem] items-center px-1"
          aria-label="Growthlearners — back to top"
        >
          <Wordmark className="text-[1.75rem]" tone={inverted ? 'dark' : 'light'} />
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`relative py-2 text-sm transition-colors
                          after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left
                          after:scale-x-0 after:bg-accent after:transition-transform after:duration-300
                          hover:after:scale-x-100 ${
                            inverted ? 'text-bg/65 hover:text-bg' : 'text-muted hover:text-ink'
                          }`}
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
