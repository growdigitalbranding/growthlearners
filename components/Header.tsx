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
  const [active, setActive] = useState('');

  // Which section you are in. On a page this long the nav is the only
  // orientation you get, and without this it never tells you where you are.
  useEffect(() => {
    const targets = NAV
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => Boolean(el));
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      // Band across the upper-middle of the viewport, so the active link
      // changes when a section genuinely takes over the screen.
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5] },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Both of these used to run off a scroll listener that called
  // getBoundingClientRect() on every frame — a forced layout per scroll event,
  // on the thread a mid-range Android can least afford it. IntersectionObserver
  // does the same work off the main thread and only fires on a real transition.
  useEffect(() => {
    // `scrolled`: a zero-height sentinel at the very top. Once it leaves the
    // viewport the page has been scrolled.
    const sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:24px;left:0;width:1px;height:1px;pointer-events:none;';
    document.body.appendChild(sentinel);

    const scrolledObserver = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    scrolledObserver.observe(sentinel);

    return () => {
      scrolledObserver.disconnect();
      sentinel.remove();
    };
  }, []);

  useEffect(() => {
    // `inverted`: shrink the observer root to just the band the header occupies,
    // so "intersecting" means "this dark section is under the header right now".
    const darkSections = document.querySelectorAll('[data-dark-section]');
    if (darkSections.length === 0) return;

    let observer: IntersectionObserver | null = null;
    const overlapping = new Set<Element>();

    const build = () => {
      observer?.disconnect();
      overlapping.clear();
      const headerHeight = 72;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) overlapping.add(entry.target);
            else overlapping.delete(entry.target);
          });
          setInverted(overlapping.size > 0);
        },
        { rootMargin: `0px 0px -${Math.max(0, window.innerHeight - headerHeight)}px 0px`, threshold: 0 },
      );
      darkSections.forEach((el) => observer!.observe(el));
    };

    build();
    // rootMargin is computed from viewport height, so it has to be rebuilt when
    // that changes (rotation, or mobile browser chrome collapsing).
    window.addEventListener('resize', build);
    return () => {
      window.removeEventListener('resize', build);
      observer?.disconnect();
    };
  }, []);

  // No bottom rule. The boundary is drawn as a short gradient below the bar
  // (.scroll-edge), so content reads as passing underneath the material rather
  // than stopping at a line. data-* drive both that edge and the
  // reduced-transparency / raised-contrast fallbacks in globals.css.
  const shellTone = inverted
    ? 'bg-accent-2/85 backdrop-blur-md'
    : scrolled
      ? 'bg-bg/85 backdrop-blur-md'
      : 'bg-transparent';

  return (
    <header
      data-scrolled={scrolled || inverted}
      data-inverted={inverted}
      className={`glass-surface scroll-edge fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${shellTone}`}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-4">
        <a
          href="#top"
          className="-ml-1 flex min-h-[3rem] items-center px-1"
          aria-label="Growthlearners, back to top"
        >
          <Wordmark className="text-[1.75rem]" tone={inverted ? 'dark' : 'light'} />
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'true' : undefined}
                className={`relative py-2 text-sm font-medium transition-colors
                            after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left
                            after:bg-accent after:transition-transform after:duration-300
                            ${isActive ? 'after:scale-x-100' : 'after:scale-x-0'}
                            ${
                              inverted
                                ? isActive
                                  ? 'text-bg'
                                  : 'text-bg/65 hover:text-bg'
                                : isActive
                                  ? 'text-ink'
                                  : 'text-muted hover:text-ink'
                            }`}
              >
                {item.label}
              </a>
            );
          })}
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
