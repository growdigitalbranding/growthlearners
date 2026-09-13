import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F7F7F5',
        ink: '#0E0E0E',
        accent: '#FF4D2E',
        // Small accent text fails AA on paper at the signal orange (3.09:1).
        // accent-deep clears 4.94:1 there; accent-soft clears 5.30:1 on the
        // deep green. The signal orange itself is kept for fills, rules and
        // decorative marks, where it is not text.
        'accent-deep': '#C9340F',
        'accent-soft': '#FF8A70',
        // Near-black, for the cinematic blocks. The imagery carries those
        // sections; the surface only has to get out of its way.
        'accent-2': '#0E0E0E',
        'ink-2': '#141414',
        muted: '#6B6862',
        line: 'rgba(18,18,18,0.10)',
        'line-strong': 'rgba(18,18,18,0.18)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        // Fluid scale. min is the 375px value, max the 1440px+ value.
        'display': ['clamp(2.75rem, 0.5rem + 3.4vw + 3.6vh, 6.5rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'h2': ['clamp(2rem, 1.3rem + 3.4vw, 4rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'h3': ['clamp(1.375rem, 1.1rem + 1.2vw, 2rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'lead': ['clamp(1.0625rem, 1rem + 0.4vw, 1.25rem)', { lineHeight: '1.55' }],
        'eyebrow': ['0.75rem', { lineHeight: '1', letterSpacing: '0.16em' }],
      },
      maxWidth: {
        shell: '84rem',
      },
      spacing: {
        section: 'clamp(4.5rem, 3rem + 7vw, 9rem)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-50%,0,0)' },
        },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
