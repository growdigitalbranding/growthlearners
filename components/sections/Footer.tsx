import { MapPin, Phone, Mail, Instagram, Linkedin, Youtube } from 'lucide-react';
import Wordmark from '../ui/Wordmark';
import { SITE, batchStartDisplay } from '@/lib/site';
import { WEEKS, TOTAL_SESSIONS } from '@/lib/content';

/**
 * Static by design — no motion down here, and the course links are real anchors
 * so the week titles are crawlable text rather than script-generated.
 */
export default function Footer() {
  return (
    <footer className="hairline bg-bg">
      <div className="shell grid gap-12 py-16 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-10">
        <div>
          <Wordmark className="text-[2rem]" />
          <p className="mt-3 max-w-[30ch] text-[0.9375rem] leading-relaxed text-muted">
            Build today for a brighter tomorrow.
          </p>
          <address className="mt-7 space-y-3 not-italic text-[0.9375rem] text-muted">
            <a
              href={SITE.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[2.75rem] items-start gap-3 py-1 transition-colors hover:text-ink"
            >
              <MapPin size={17} strokeWidth={2} className="mt-0.5 shrink-0 text-accent" aria-hidden />
              <span>
                {SITE.streetAddress}
                <br />
                {SITE.city}, {SITE.region} {SITE.postalCode}
              </span>
            </a>
            <a
              href={`tel:+${SITE.whatsapp}`}
              className="flex min-h-[2.75rem] items-center gap-3 py-1 transition-colors hover:text-ink"
            >
              <Phone size={17} strokeWidth={2} className="shrink-0 text-accent" aria-hidden />
              {SITE.phoneDisplay}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex min-h-[2.75rem] items-center gap-3 py-1 transition-colors hover:text-ink"
            >
              <Mail size={17} strokeWidth={2} className="shrink-0 text-accent" aria-hidden />
              {SITE.email}
            </a>
          </address>
        </div>

        <nav aria-labelledby="footer-course">
          <h2 id="footer-course" className="eyebrow mb-5">
            The course
          </h2>
          <ul className="space-y-2 text-[0.9375rem] text-muted">
            {[
              { href: '#the-month', label: 'The month, week by week' },
              { href: '#curriculum', label: `All ${TOTAL_SESSIONS} sessions` },
              { href: '#stack', label: 'Tools you learn' },
              { href: '#outcomes', label: 'Outcomes and placement' },
              { href: '#fee', label: 'Fee and what it covers' },
              { href: '#faq', label: 'Frequently asked questions' },
            ].map((link) => (
              <li key={link.href}>
                <a href={link.href} className="block min-h-[2.75rem] py-2.5 transition-colors hover:text-ink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-weeks">
          <h2 id="footer-weeks" className="eyebrow mb-5">
            What you learn
          </h2>
          <ul className="space-y-2 text-[0.9375rem] text-muted">
            {WEEKS.map((week) => (
              <li key={week.n}>
                <a
                  href="#curriculum"
                  className="block min-h-[2.75rem] py-2.5 transition-colors hover:text-ink"
                >
                  <span className="text-ink">{week.label}:</span> {week.title}
                </a>
              </li>
            ))}
          </ul>

          <h2 className="eyebrow mb-4 mt-8">Follow</h2>
          <ul className="flex gap-2">
            {[
              { href: SITE.social.instagram, label: 'Instagram', Icon: Instagram },
              { href: SITE.social.linkedin, label: 'LinkedIn', Icon: Linkedin },
              { href: SITE.social.youtube, label: 'YouTube', Icon: Youtube },
            ].map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-line
                             text-muted transition-colors hover:border-ink hover:text-ink"
                >
                  <Icon size={18} strokeWidth={2} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="hairline">
        <div className="shell flex flex-col gap-2 py-6 text-[0.8125rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            AI Digital Marketing Course in {SITE.city} · Next batch {batchStartDisplay}
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a href="/privacy" className="inline-block min-h-[2.75rem] py-3 transition-colors hover:text-ink">
              Privacy
            </a>
            <span>
              © {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
