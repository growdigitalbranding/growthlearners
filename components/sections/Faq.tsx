'use client';

import Disclosure from '../ui/Disclosure';
import SectionHeading from './SectionHeading';
import { FAQS } from '@/lib/content';
import { buildFaqSchema } from '@/lib/schema';
import { track } from '@/lib/analytics';

export default function Faq() {
  return (
    <section id="faq" className="shell py-section">
      {/* FAQPage markup sits with the content it describes. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema([...FAQS])) }}
      />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <SectionHeading
          eyebrow="Questions"
          title="The things people actually ask"
          lead="If your question is not here, send it on WhatsApp — you will get a straight answer from someone who teaches the course."
          className="lg:sticky lg:top-28 lg:self-start"
        />

        <div className="border-t border-line">
          {FAQS.map((faq) => (
            <Disclosure
              key={faq.q}
              onOpen={() => track({ event: 'faq_open', question: faq.q })}
              summary={<span className="font-serif text-[1.1875rem] leading-snug sm:text-[1.375rem]">{faq.q}</span>}
            >
              <p className="max-w-2xl leading-relaxed text-muted">{faq.a}</p>
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
}
