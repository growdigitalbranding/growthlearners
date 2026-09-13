# Growthlearners — AI Digital Marketing Course landing page

Single-page, in-person course landing site for Coimbatore. Next.js 14 App
Router, TypeScript, Tailwind, Framer Motion, GSAP ScrollTrigger and Lenis.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
npm run typecheck
```

---

## Before you launch — replace the placeholders

Everything launch-specific is isolated in **`lib/site.ts`**, and each value can
be overridden with an environment variable instead of a code edit (see
`.env.example`). None of it is scattered through the components.

| What | Where | Status |
|---|---|---|
| WhatsApp number and display phone | `SITE.whatsapp`, `SITE.phoneDisplay` | **placeholder** `+91 90000 00000` — this is the page's primary conversion, so it is the first thing to change |
| Street address, postcode, map link, lat/long | `SITE.streetAddress`, `SITE.geo`, `SITE.mapUrl` | **placeholder** — also feeds `LocalBusiness` JSON-LD, so wrong data here is an SEO liability |
| Fee | `SITE.fee`, `SITE.feeDisplay` | ₹18,999 — **confirm the price point** |
| Next batch date | `SITE.batchStartISO` | 2026-10-05 — **confirm**. The display date, the OG image and the `CourseInstance` schema all derive from this one value |
| Seat count | `SITE.seats` | 15 — see the note below |
| Social handles | `SITE.social` | **placeholder** |
| Email | `SITE.email` | **placeholder** |
| GTM container | `NEXT_PUBLIC_GTM_ID` | empty — analytics stays off until set |
| Callback destination | `CALLBACK_WEBHOOK_URL` | empty — see *Callback form* below |
| Favicon | `app/icon.svg` | approximation — see `public/brand/README.md` |

**On the seat count:** the brief said "8 seats" in the product summary but
"15 seats" in both the hero status line and the numbers section. We went with
15, since that is what the two pieces of specified copy say. Change
`SITE.seats` to flip it everywhere — hero, numbers, final CTA, the FAQ answer
and the `Course` schema all read that one constant.

### Social proof

`TESTIMONIALS` in `lib/content.ts` is **empty on purpose**. Every landing-page
pattern for a course puts social proof before the price, and it is the one thing
this page does not have — but a fabricated testimonial on a page a parent is
reading is worse than none.

Add one entry and the Proof section renders itself, between the outcomes and the
fee. Worth collecting, roughly in order of value:

1. A student naming what they built and what the numbers did.
2. A student who got an interview or a client off the back of it.
3. **A parent who paid.** This page is read by parents; one of them saying it
   was worth the money does more than three student quotes.

Keep them verbatim — the unpolished ones read as real, which is the point.

### Callback form

`POST /api/callback` validates the submission server-side, then forwards it as
JSON to `CALLBACK_WEBHOOK_URL` — point that at whatever the team already uses
(a Zapier or Make hook, an n8n flow, a Google Apps Script bound to a sheet, or
the CRM's inbound endpoint).

With no webhook configured the route **refuses the submission** with a 503 and
the UI points the visitor at WhatsApp. That is deliberate: a form that silently
drops enquiries is worse than no form. If a delivery to a configured webhook
fails, the lead is written to the server log so it stays recoverable.

---

## Structure

```
app/
  layout.tsx            fonts, metadata, JSON-LD, GTM
  page.tsx              section order — the whole page
  not-found.tsx         branded 404
  privacy/page.tsx      privacy notice — READ THE HEADER, needs legal review
  opengraph-image.tsx   OG card generated at build time
  icon.svg              favicon
  api/callback/route.ts callback form handler
components/
  sections/             one file per section, in page order
  ui/                   motion primitives and shared controls
lib/
  site.ts               everything launch-specific
  content.ts            course copy and the 20-session curriculum
  motion.ts             the shared motion vocabulary
  schema.ts             LocalBusiness, Course and FAQPage JSON-LD
  analytics.ts          typed dataLayer events
```

### Editing the curriculum

`lib/content.ts` holds all 20 sessions grouped into four weeks, each with a
verb-first objective and its tool chips. Adding or removing a session updates
the accordion, the pinned week cards, the footer links, the counts in the copy
and the `Course` schema automatically — `TOTAL_SESSIONS` is derived, never
typed twice.

---

## Motion

`lib/motion.ts` defines the page's whole motion vocabulary — `reveal`,
`stagger`, `underline`, `counter`, `magnetic`, `parallax` — once. Sections
import from it and never invent their own timings.

**Reduced motion** is honoured in three places:

1. `<MotionConfig reducedMotion="user">` strips transform and layout animation
   from every Framer variant while leaving opacity, so each `reveal` collapses
   to a plain fade with no per-section conditional.
2. GSAP work is inside `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`,
   so the pin and the chip sweep are never created at all.
3. A CSS media query in `globals.css` catches CSS-only motion (the marquee).

Lenis, the magnetic CTAs and parallax all opt out entirely. Magnetic and
parallax are additionally disabled below 768px.

**Nothing re-triggers on scroll up.** Every reveal uses `once: true`.

**Nothing above the fold animates its existence.** All hero motion is
transform-only — no opacity — because the hero sub-headline is the LCP element
and must be painted at full contrast in the first frame. This is the reason the
hero uses `heroRise` rather than `reveal`; please keep it that way.

---

## Performance

Lighthouse mobile, simulated slow 4G and Moto G-class CPU:

| | |
|---|---|
| Performance | **91** (median of 5; runs vary 90–93) |
| Accessibility | **100** |
| Best practices | **100** |
| SEO | **100** |

TBT 60ms, CLS 0.038. Measured directly under 4x CPU throttling at 1.6Mbps, LCP
fires together with FCP at ~1.0s as a single candidate.

GSAP (~45kB) is loaded with a dynamic `import()` after hydration rather than in
the entry chunk; the markup it animates is still server-rendered. Inter is
deliberately not preloaded so the serif that carries the headline gets the
bandwidth.

---

## Accessibility notes

Contrast was audited rather than assumed, and three failures were fixed:

- The signal orange `#FF4D2E` is **not used for text on paper** — it measures
  3.09:1. `accent-deep` `#C9340F` (4.94:1) is the text colour; the signal
  orange stays for fills, rules and decorative marks.
- Primary CTA labels are ink on orange (5.67:1). White on orange is 3.31:1 and
  fails.
- On the deep green, text tints are never lighter than `bg/65`.

If you introduce new accent text, check it before shipping.

Two further rules the page depends on:

- **The proof strip must keep its pause button.** Motion that starts on its own
  and runs longer than five seconds needs a mechanism to stop it (WCAG 2.2.2,
  level A). Hover-pause does not count — most of this audience is on Android,
  where there is no hover. The strip also idles via IntersectionObserver when
  scrolled out of view, so it is not compositing forever on a mid-range phone.
- **`scroll-padding` on `html` is load-bearing.** Without it, keyboard focus
  scrolls under the sticky mobile CTA bar (WCAG 2.4.11). `scroll-margin` on the
  anchors covers anchor jumps only, not focus-driven scrolling.
- **Don't branch a render on `useReducedMotion()`.** It reads the media query at
  module load, so on a reduced-motion client the first render disagrees with the
  server's `false` and React throws a hydration mismatch. `ProofStrip` holds it
  behind a mounted flag for exactly this reason.
- **The accordion panel is CSS, not Framer.** `grid-template-rows: 0fr → 1fr`
  with `visibility` doing the accessibility work. Animating `height: auto`
  through JS meant measuring content and driving a pixel height per frame,
  28 rows deep.

### Still needed before launch

The privacy notice at `/privacy` describes what the code actually does, but it
cannot know your retention period, who can access enquiries, or your grievance
officer's details — which India's DPDP Act 2023 requires a data fiduciary to
publish. Read the header comment in that file. There is also no terms of
service or refund policy, because those are commercial terms only you can set.

---

## Deploying

Vercel, zero config. Set the environment variables from `.env.example` in the
project settings — `NEXT_PUBLIC_*` values are public by design, and
`CALLBACK_WEBHOOK_URL` is server-only.

### One thing to decide

The project is pinned to **Next.js 14.2.35**, the latest patched 14.x, as
specified. Next 14 is past security support: the advisories still open against
it are fixed only in 15.5+. Most do not apply to a static marketing page on
Vercel (they need self-hosting, custom servers, rewrites, middleware, i18n or
the image optimizer, none of which this page uses), but the upgrade is close to
free here since the App Router code is unchanged — worth doing before this
grows into a multi-page site.
