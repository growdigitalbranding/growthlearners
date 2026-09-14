'use client';

import { ArrowUpRight } from 'lucide-react';
import type { WorkItem } from '@/lib/content';

/**
 * A gallery tile for work whose proof is that it is live.
 *
 * A screenshot of a landing page proves it was designed. A link proves it
 * shipped — which is the deliverable the course actually promises ("live, on a
 * domain in your name"), and the one tile on this page a sceptical reader can
 * verify for themselves rather than take on trust. So this renders the address
 * rather than a picture of it, and the whole tile is the link.
 */
export default function WorkLink({ item }: { item: WorkItem }) {
  const host = item.href ? item.href.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';
  const [name, ...rest] = host.split('.');

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="grid h-full w-full grid-rows-[auto_1fr_auto] gap-4 bg-gradient-to-br
                 from-white/[0.06] to-transparent p-6 transition-colors duration-200
                 hover:from-white/[0.10] focus-visible:from-white/[0.10] sm:p-7"
    >
      <span className="eyebrow flex items-center gap-2 text-accent">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
        Live site
      </span>

      <span className="self-center break-words font-serif text-[1.75rem] leading-tight text-bg sm:text-[2rem]">
        {name}
        <span className="text-bg/45">.{rest.join('.')}</span>
      </span>

      <span className="flex items-center gap-2 font-sans text-[0.9375rem] text-bg/70">
        Open the page
        <ArrowUpRight
          size={17}
          strokeWidth={2}
          aria-hidden
          className="transition-transform duration-150 ease-editorial
                     [@media(hover:hover)and(pointer:fine)]:group-hover:translate-x-0.5
                     [@media(hover:hover)and(pointer:fine)]:group-hover:-translate-y-px"
        />
        {/* Sighted users get the arrow; this says the same thing to a screen
            reader, which otherwise has no way to know the tab will change. */}
        <span className="sr-only">(opens in a new tab)</span>
      </span>
    </a>
  );
}
