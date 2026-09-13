import { SITE, batchStartDisplay, batchEndISO } from './site';
import { TOTAL_SESSIONS, WEEKS } from './content';

/**
 * LocalBusiness + Course JSON-LD, both pinned to Coimbatore.
 *
 * The address and geo coordinates come from lib/site.ts and are placeholders
 * until the real ones are filled in — structured data that disagrees with the
 * Google Business Profile is worse than no structured data, so this must be
 * corrected before launch.
 */
export function buildSchema() {
  const orgId = `${SITE.url}/#organisation`;

  const localBusiness = {
    '@type': ['LocalBusiness', 'EducationalOrganization'],
    '@id': orgId,
    name: SITE.name,
    url: SITE.url,
    telephone: `+${SITE.whatsapp}`,
    email: SITE.email,
    image: `${SITE.url}/opengraph-image`,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.streetAddress,
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      postalCode: SITE.postalCode,
      addressCountry: SITE.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    areaServed: {
      '@type': 'City',
      name: SITE.city,
    },
    sameAs: [SITE.social.instagram, SITE.social.linkedin, SITE.social.youtube],
  };

  const course = {
    '@type': 'Course',
    '@id': `${SITE.url}/#course`,
    name: `${SITE.courseName} in ${SITE.city}`,
    description: `A four-week, ${TOTAL_SESSIONS}-session in-person AI digital marketing course in ${SITE.city}. Students finish owning a live website, live Google and Meta campaigns, an AI video ad, a CRM and a working automation.`,
    url: SITE.url,
    provider: { '@id': orgId },
    inLanguage: 'en-IN',
    educationalLevel: 'Beginner',
    teaches: WEEKS.flatMap((week) => week.sessions.map((session) => session.title)),
    numberOfCredits: TOTAL_SESSIONS,
    coursePrerequisites: 'No prior marketing or coding experience required.',
    offers: {
      '@type': 'Offer',
      price: SITE.fee,
      priceCurrency: 'INR',
      category: 'Paid',
      availability: 'https://schema.org/LimitedAvailability',
      url: SITE.url,
      validFrom: new Date().toISOString().slice(0, 10),
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      name: `${SITE.courseName} — batch starting ${batchStartDisplay}`,
      courseMode: 'Onsite',
      courseWorkload: 'P4W',
      startDate: SITE.batchStartISO,
      endDate: batchEndISO,
      maximumAttendeeCapacity: SITE.seats,
      inLanguage: 'en-IN',
      location: {
        '@type': 'Place',
        name: `${SITE.name}, ${SITE.city}`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE.streetAddress,
          addressLocality: SITE.city,
          addressRegion: SITE.region,
          postalCode: SITE.postalCode,
          addressCountry: SITE.country,
        },
      },
      offers: {
        '@type': 'Offer',
        price: SITE.fee,
        priceCurrency: 'INR',
        availability: 'https://schema.org/LimitedAvailability',
      },
    },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [localBusiness, course],
  };
}

/** FAQPage is emitted next to the FAQ section so the markup sits with its content. */
export function buildFaqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
}
