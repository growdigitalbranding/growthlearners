'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

type Props = {
  /** Everything shown in the closed state, laid out by the caller. */
  summary: React.ReactNode;
  children: React.ReactNode;
  onOpen?: () => void;
  className?: string;
  tone?: 'light' | 'dark';
};

/**
 * One accordion row, shared by the curriculum and the FAQ.
 *
 * The trigger is a real <button> with aria-expanded and aria-controls, so it
 * works from the keyboard and announces its state.
 *
 * The panel is pure CSS (see .disclosure-panel in globals.css). It used to
 * animate height:auto through Framer Motion, which meant measuring the content
 * and driving an explicit pixel height via rAF on every frame — a layout,
 * paint and composite each time, across 28 rows. grid-template-rows does the
 * same job declaratively, and takes Framer out of 28 components.
 */
export default function Disclosure({ summary, children, onOpen, className = '', tone = 'light' }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonId = useId();

  const toggle = () => {
    setOpen((wasOpen) => {
      if (!wasOpen) onOpen?.();
      return !wasOpen;
    });
  };

  const warm = tone === 'dark' ? 'bg-white/[0.04]' : 'bg-accent/[0.045]';

  return (
    <div className={`border-b ${tone === 'dark' ? 'border-white/10' : 'border-line'} ${className}`}>
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls={panelId}
          className={`flex min-h-[3.25rem] w-full items-center gap-4 py-5 text-left transition-colors duration-200
                      ${open ? warm : 'bg-transparent'}
                      ${tone === 'dark' ? 'hover:bg-white/[0.03]' : 'hover:bg-ink/[0.025]'}`}
        >
          <span className="min-w-0 flex-1">{summary}</span>
          <ChevronDown
            size={20}
            strokeWidth={2}
            aria-hidden
            className={`mr-1 shrink-0 transition-transform duration-200 ease-editorial
                        ${tone === 'dark' ? 'text-bg/65' : 'text-muted'} ${open ? 'rotate-180 text-accent-deep' : ''}`}
          />
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        data-open={open}
        className="disclosure-panel"
      >
        <div>
          <div className="pb-7 pr-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
