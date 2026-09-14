'use client';

import { useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import type { WorkItem } from '@/lib/content';

/**
 * A gallery video with a control that works for every pointer.
 *
 * Hover-to-play alone was never enough. On a touch device there is no hover:
 * a tap fires a synthetic mouseenter, so the clip starts with nothing to stop
 * it, and most people never discover it moves at all. Since roughly all of
 * this page's traffic is a phone, that meant the clips were effectively still
 * images for the audience the section exists to convince.
 *
 * So the button is the real control — visible, tappable, keyboard-reachable,
 * and labelled — and hover stays as a convenience on pointers that have one.
 * That also keeps WCAG 2.2.2 satisfied: nothing here starts moving without a
 * person asking, and anything moving can be stopped.
 */
export default function WorkVideo({ item }: { item: WorkItem }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const describe = item.student
    ? `${item.title}. ${item.kind}, made by ${item.student}.`
    : `${item.title}. ${item.kind}.`;

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };

  return (
    <div className="relative h-full w-full">
      {/* The poster is an <img>, not the video's own poster attribute.
          A poster attribute is fetched the moment the element is parsed —
          there is no lazy equivalent for it — so two gallery stills were
          being pulled down during the first paint while the gallery itself
          sits nine screens below the fold. On a throttled connection they
          competed with the hero for bandwidth and pushed LCP from 2.7s to
          3.6s. As a lazy <img> they load when they are nearly in view, and
          the video paints over this once it has frames. */}
      {item.poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.poster}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}

      <video
        ref={ref}
        src={item.src}
        muted
        loop
        playsInline
        preload="none"
        aria-label={describe}
        className="relative h-full w-full object-cover"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        // Convenience only, and only where a pointer can actually hover. The
        // button below is what makes the clip reachable at all.
        onMouseEnter={(event) => {
          if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            void event.currentTarget.play();
          }
        }}
        onMouseLeave={(event) => {
          if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            event.currentTarget.pause();
          }
        }}
      />

      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? `Pause ${item.title}` : `Play ${item.title}`}
        className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full
                   border border-white/25 bg-accent-2/70 text-bg backdrop-blur-sm
                   transition-[background-color,border-color,transform] duration-150
                   hover:border-white/50 hover:bg-accent-2/90 active:scale-[0.94]"
      >
        {playing ? (
          <Pause size={16} strokeWidth={2.2} aria-hidden />
        ) : (
          <Play size={16} strokeWidth={2.2} aria-hidden className="ml-0.5" />
        )}
      </button>
    </div>
  );
}
