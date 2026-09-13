import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { SITE, batchStartDisplay } from '@/lib/site';
import { TOTAL_SESSIONS } from '@/lib/content';
import { buildSchema } from '@/lib/schema';
import MotionProvider from '@/components/ui/MotionProvider';
import SmoothScroll from '@/components/ui/SmoothScroll';

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-serif',
  // Georgia is metrically close enough that the swap is barely visible.
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  adjustFontFallback: true,
});

const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  fallback: ['system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
});

const title = `${SITE.courseName} in ${SITE.city} | ${SITE.name}`;
const description = `A ${SITE.durationWeeks}-week, ${TOTAL_SESSIONS}-session in-person AI digital marketing course in ${SITE.city}. You finish owning a live website, live Google and Meta campaigns, an AI video ad, a CRM and an automation. ${SITE.seats} seats. Next batch ${batchStartDisplay}.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description,
  applicationName: SITE.name,
  keywords: [
    'AI digital marketing course Coimbatore',
    'digital marketing course in Coimbatore',
    'digital marketing training Coimbatore',
    'Google Ads course Coimbatore',
    'Meta Ads course Coimbatore',
    'digital marketing course for students',
    'AI marketing course Tamil Nadu',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE.url,
    siteName: SITE.name,
    title,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  category: 'education',
};

export const viewport: Viewport = {
  themeColor: '#FAF7F2',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${serif.variable} ${sans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          // Server-rendered from lib/schema.ts — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema()) }}
        />
      </head>
      <body className="bg-bg font-sans text-ink antialiased">
        {SITE.gtmId ? (
          <>
            {/* GTM loads GA4 and the Meta Pixel. afterInteractive keeps it off
                the critical path so it cannot cost us LCP on a 4G phone. */}
            <Script id="gtm" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${SITE.gtmId}');`}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${SITE.gtmId}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
                title="Google Tag Manager"
              />
            </noscript>
          </>
        ) : null}

        <MotionProvider>
          <SmoothScroll />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
