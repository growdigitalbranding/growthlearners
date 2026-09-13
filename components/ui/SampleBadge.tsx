/**
 * Marks a section that is still rendering sample rows.
 *
 * The sample data exists so the layout can be judged with content in it. The
 * risk is that it quietly ships, and a fabricated testimonial on a page a
 * parent reads is the worst failure this site has available to it. So every
 * section carrying placeholder rows says so, visibly, until the flags come off.
 */
export default function SampleBadge({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5
                  font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em]
                  ${tone === 'dark'
                    ? 'border-accent/50 bg-accent/15 text-accent'
                    : 'border-accent-deep/40 bg-accent/[0.08] text-accent-deep'}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
      Sample content, not yet replaced
    </span>
  );
}
