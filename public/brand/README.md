# Brand assets

The wordmark on the page is **live text**, not an image — set in the editorial
serif, lowercase, one word, with the accent colour on "growth" only. That is
deliberate: it matches the supplied logo exactly, stays crisp at every size,
costs no network request, and keeps the largest text on screen available to
the LCP measurement. See `components/ui/Wordmark.tsx`.

## Drop the real raster files in here

Two files were supplied as images in chat but did not reach the build, so the
following are approximations or placeholders. Replacing them is a drop-in:

| File | Where it goes | Status |
|---|---|---|
| `app/icon.svg` | favicon, all modern browsers | **approximation** — hand-authored SVG of the orange tile + serif `g` + rising arrow. Replace with the real mark. |
| `app/apple-icon.png` | iOS home screen, 180×180 | **missing** — add the supplied favicon PNG at 180×180 and Next will wire it up automatically. |
| `public/brand/logo.png` | not used by the page | optional — keep the full lockup (with the "Build today for a brighter tomorrow" tagline) here for decks and email signatures. |

To swap the favicon for the supplied PNG instead of the SVG: delete
`app/icon.svg`, drop the PNG in as `app/icon.png` (512×512). Next 14 picks up
`app/icon.*` and `app/apple-icon.*` by filename — no code change needed.

## Colour

The orange in the supplied logo and the page accent are the same signal orange,
`#FF4D2E`. The `g` counter-form in the favicon is the page's own paper white,
`#FAF7F2`. Both are defined once in `tailwind.config.ts`.

## The tagline

"Build today for a brighter tomorrow" appears in the full logo lockup but is
deliberately **not** rendered beside the wordmark in the header — the brief
calls for no icon and no tagline there, so the headline carries the page. It is
used once, in the footer, where it has room to read as a line rather than
compete with the navigation.
