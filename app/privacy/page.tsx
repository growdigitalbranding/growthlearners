import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Wordmark from '@/components/ui/Wordmark';
import { SITE } from '@/lib/site';

export const metadata = {
  title: `Privacy | ${SITE.name}`,
  description: `What ${SITE.name} collects when you enquire about the AI Digital Marketing Course, and what happens to it.`,
  alternates: { canonical: '/privacy' },
};

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  NOT LEGAL ADVICE — HAVE THIS REVIEWED BEFORE LAUNCH
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every statement below describes what this codebase actually does: the three
 *  fields the form posts, the route that receives them, the webhook they are
 *  forwarded to, and the tags GTM loads. Nothing here is boilerplate.
 *
 *  What it cannot know, and what you must confirm before publishing:
 *    - how long the team actually retains enquiries once they reach the CRM
 *    - who inside and outside the organisation can see them
 *    - your grievance officer's name and contact, which India's DPDP Act 2023
 *      requires a data fiduciary to publish
 *    - whether you need a consent banner before GTM loads, which depends on
 *      the rules you are operating under and on legal advice, not on this file
 *
 *  The analytics section is written on the assumption that GTM loads on page
 *  load, which is what app/layout.tsx currently does.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const SECTIONS = [
  {
    heading: 'What we collect',
    body: [
      'If you use the callback form, we collect the three things it asks for: your name, your mobile number, and optionally your college or company. There are no other fields, and nothing is collected silently alongside them.',
      'If you contact us on WhatsApp instead, we see whatever WhatsApp shows us — your number and your profile name. That conversation is held inside WhatsApp and governed by their terms as well as ours.',
    ],
  },
  {
    heading: 'What we do with it',
    body: [
      'We use it to call or message you back about the course. That is the only reason we ask for it.',
      'Form submissions are passed to the tool our team uses to track enquiries. We do not sell enquiry data, and we do not pass it to other training providers or list brokers.',
    ],
  },
  {
    heading: 'Analytics and advertising',
    body: [
      'This site loads Google Tag Manager, which in turn loads Google Analytics 4 and the Meta Pixel. These record how the page is used — which sections are opened, which buttons are clicked, and whether a visit came from an advertisement.',
      'They set cookies and may let Google and Meta recognise a browser across sites. That is how the advertising for this course is measured. Your browser settings, and the ad-preference controls Google and Meta each provide, let you limit this.',
      'If you have asked your browser or phone to reduce motion, this page respects that too — that preference is read in the browser and never sent anywhere.',
    ],
  },
  {
    heading: 'Your choices',
    body: [
      'You can ask us what we hold about you, ask us to correct it, or ask us to delete it. Message the number below and we will do it.',
      'Asking us to stop contacting you is enough — you do not have to give a reason, and it will not affect a course you have already enrolled in.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden">
      <div className="grid-lines pointer-events-none absolute inset-0 -z-10" aria-hidden />

      <div className="shell max-w-3xl py-16 sm:py-24">
        <Link href="/" className="inline-flex min-h-[3rem] items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
          <ArrowLeft size={16} strokeWidth={2} aria-hidden />
          Back to the course
        </Link>

        <Wordmark className="mt-10 block text-[1.75rem]" />

        <h1 className="mt-8 text-balance font-serif text-h2">Privacy</h1>
        <p className="mt-6 text-lead text-muted">
          Short version: we ask for your name and number so we can call you back about the course,
          and we measure our own advertising. We do not sell your details to anyone.
        </p>

        <div className="mt-14 space-y-12">
          {SECTIONS.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-h3">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <section>
            <h2 className="font-serif text-h3">Getting in touch</h2>
            <p className="mt-4 leading-relaxed text-muted">
              For anything on this page, including a request to delete what we hold, contact us on{' '}
              <a href={`tel:+${SITE.whatsapp}`} className="text-ink underline decoration-accent decoration-2 underline-offset-4">
                {SITE.phoneDisplay}
              </a>{' '}
              or at{' '}
              <a href={`mailto:${SITE.email}`} className="text-ink underline decoration-accent decoration-2 underline-offset-4">
                {SITE.email}
              </a>
              . We are based in {SITE.city}, {SITE.region}.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
