import { ImageResponse } from 'next/og';
import { SITE, batchStartDisplay } from '@/lib/site';
import { TOTAL_SESSIONS } from '@/lib/content';

export const runtime = 'nodejs';
export const alt = `${SITE.courseName} in ${SITE.city} — ${TOTAL_SESSIONS} sessions, in person`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * The OG card is generated at build time rather than shipped as a raster, so it
 * stays in sync with the batch date and seat count in lib/site.ts.
 *
 * The brand serif is fetched at build. If that fetch fails — an offline or
 * network-restricted build — we fall back to the bundled default font rather
 * than failing the build over a social preview.
 */
async function loadSerif(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      'https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap',
      { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } },
    ).then((res) => res.text());

    const url = css.match(/src:\s*url\((https:\/\/[^)]+\.(?:woff2|ttf))\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((res) => res.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const serif = await loadSerif();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#FAF7F2',
          backgroundImage:
            'linear-gradient(to right, rgba(18,18,18,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(18,18,18,0.055) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          padding: '64px 72px',
        }}
      >
        <div style={{ display: 'flex', fontSize: 40, fontFamily: serif ? 'Serif' : undefined }}>
          <span style={{ color: '#FF4D2E' }}>growth</span>
          <span style={{ color: '#121212' }}>learners</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 92,
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              color: '#121212',
              fontFamily: serif ? 'Serif' : undefined,
              maxWidth: 980,
            }}
          >
            One month. {TOTAL_SESSIONS} sessions. Real campaigns you ran.
          </div>
          <div style={{ display: 'flex', width: 260, height: 8, backgroundColor: '#FF4D2E', marginTop: 28 }} />
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 28,
            color: '#6B6862',
            letterSpacing: '0.01em',
          }}
        >
          In person in {SITE.city} · {SITE.seats} seats · Next batch {batchStartDisplay}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: serif ? [{ name: 'Serif', data: serif, style: 'normal', weight: 400 }] : undefined,
    },
  );
}
