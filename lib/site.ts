/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  REPLACE BEFORE LAUNCH
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every value in this block is a placeholder standing in for something only
 *  Growthlearners can supply. They are deliberately all in one file so launch
 *  is a single edit, and each can be overridden by an env var at deploy time
 *  (see .env.example) without touching code.
 *
 *    geo                      real lat/long — the only address field still unset
 *    fee                      confirm the price point
 *    batchStartISO            confirm the next batch date
 *    seats                    see note below
 *    social                   real handles
 *    gtmId                    real GTM container, or analytics stays off
 *
 *  Note on seats: the brief contradicted itself, saying "8 seats" in the product
 *  summary and "15 seats" in the hero status line and the numbers section. We
 *  ran with 15 until Growthlearners confirmed 8 is the real number, which is
 *  also what the photograph of the room supports. Change this one constant to
 *  flip it everywhere — hero, numbers, sticky bar, final CTA, classroom lede,
 *  FAQ, OG image, meta description and Course JSON-LD all read it.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const env = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP,
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
};

export const SITE = {
  name: 'Growthlearners',
  courseName: 'AI Digital Marketing Course',
  url: env.siteUrl || 'https://growthlearners.in',

  /** Digits only, full international format — used to build wa.me links. */
  whatsapp: env.whatsapp || '919626622296',
  phoneDisplay: env.phoneDisplay || '+91 96266 22296',
  email: 'hello@growthlearners.in',

  city: 'Coimbatore',
  region: 'Tamil Nadu',
  country: 'IN',
  postalCode: '641044',
  // Punctuated exactly as the Google Business Profile has it. Structured data
  // that disagrees with the profile is worse than none, and "St" rather than
  // "Street" is the sort of difference that causes the disagreement.
  streetAddress: '89, NGN St, Siddhapudur, New Siddhapudur',
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('89, NGN St, Siddhapudur, New Siddhapudur, Coimbatore, Tamil Nadu 641044'),

  /**
   * Real coordinates, or null. Never a guess.
   *
   * This was the Coimbatore city-centre default, about three kilometres from
   * Siddhapudur. That was harmless while the street address was obviously a
   * placeholder and nothing could ship; with a real address above it, it would
   * have put a precise pin on the wrong building. A wrong pin is worse than no
   * pin, because with `geo` absent Google geocodes the postal address instead
   * — which is now correct. So the schema omits the block entirely until this
   * is filled in. Right-click the building in Google Maps to get the pair.
   */
  geo: null as { lat: number; lng: number } | null,

  seats: 8,
  sessions: 20,
  deliverables: 8,
  durationWeeks: 4,

  fee: 18999,
  feeDisplay: '₹18,999',

  /** ISO date drives both the display string and Course JSON-LD. */
  batchStartISO: '2026-10-05',

  timings: 'Mon–Fri, 6:30–8:30 PM · 5 sessions a week',
  weekendBatch: 'Sat & Sun, 10:00 AM–1:00 PM',

  social: {
    instagram: 'https://instagram.com/growthlearners',
    linkedin: 'https://linkedin.com/company/growthlearners',
    youtube: 'https://youtube.com/@growthlearners',
  },

  gtmId: env.gtmId || '',
} as const;

/** "5 October 2026" — derived so the date is never written twice. */
export const batchStartDisplay = new Date(`${SITE.batchStartISO}T00:00:00Z`).toLocaleDateString(
  'en-GB',
  { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' },
);

export const batchEndISO = (() => {
  const end = new Date(`${SITE.batchStartISO}T00:00:00Z`);
  end.setUTCDate(end.getUTCDate() + SITE.durationWeeks * 7);
  return end.toISOString().slice(0, 10);
})();

/**
 * WhatsApp deep link, prefilled with an enquiry message so the student does not
 * have to compose one — and so the team can see which page the lead came from.
 */
export function whatsappLink(message?: string): string {
  const text =
    message ||
    `Hi Growthlearners, I'd like to know more about the AI Digital Marketing Course in Coimbatore starting ${batchStartDisplay}. Please share the batch details and fee.`;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const telLink = `tel:+${SITE.whatsapp}`;
