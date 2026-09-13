/**
 * The logotype: one word, lowercase, editorial serif, accent on "growth" only.
 * Set as live text rather than an image — it is exactly what the supplied logo
 * is, and as type it stays crisp at any size and costs no request.
 * No icon, no tagline beside it.
 */
export default function Wordmark({
  className = '',
  tone = 'light',
}: {
  className?: string;
  tone?: 'light' | 'dark';
}) {
  return (
    <span className={`font-serif lowercase leading-none tracking-[-0.02em] ${className}`}>
      {/* The name is real text, read once, rather than an aria-label — which is
          prohibited on a <span> because it carries no role. The two coloured
          halves are hidden so it is not announced as two fragments. */}
      <span className="sr-only">Growthlearners</span>
      <span aria-hidden className="text-accent">growth</span>
      <span aria-hidden className={tone === 'dark' ? 'text-bg' : 'text-ink'}>learners</span>
    </span>
  );
}
