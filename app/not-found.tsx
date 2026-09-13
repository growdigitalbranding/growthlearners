import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Wordmark from '@/components/ui/Wordmark';
import { SITE, whatsappLink } from '@/lib/site';
import { TOTAL_SESSIONS } from '@/lib/content';

export const metadata = {
  title: `Page not found | ${SITE.name}`,
  robots: { index: false, follow: true },
};

/**
 * A 404 that still does a job: it says where you are, and gives the two routes
 * someone who mistyped a URL actually wants — the course, or a person.
 */
export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="grid-lines pointer-events-none absolute inset-0 -z-10" aria-hidden />

      <div className="shell flex flex-1 flex-col justify-center py-16">
        <Wordmark className="mb-12 text-[1.75rem]" />

        <h1 className="max-w-[16ch] text-balance font-serif text-h2">
          That page isn&rsquo;t here.
        </h1>

        <p className="mt-6 max-w-xl text-lead text-muted">
          The link may be out of date, or the address mistyped. The course itself is one
          page. All {TOTAL_SESSIONS} sessions, the fee and the batch dates are on it.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link href="/" className="btn-accent">
            <ArrowLeft size={17} strokeWidth={2} aria-hidden />
            Back to the course
          </Link>
          <a
            href={whatsappLink(`Hi Growthlearners, I was looking for something on your site and hit a 404. Could you point me the right way?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Ask us on WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
