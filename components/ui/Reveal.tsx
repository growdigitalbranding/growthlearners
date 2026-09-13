'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { reveal, stagger, VIEWPORT, VIEWPORT_TALL } from '@/lib/motion';

type RevealProps = HTMLMotionProps<'div'> & {
  /** Render as a stagger parent instead of a revealing child. */
  group?: boolean;
  /** Looser trigger for blocks taller than the viewport. */
  tall?: boolean;
  as?: 'div' | 'section' | 'ul' | 'li' | 'p' | 'span' | 'h2' | 'h3' | 'header' | 'figure';
};

/**
 * The `reveal` and `stagger` tokens. Wrap a group in <Reveal group> and its
 * children in plain <Reveal> — the parent owns the trigger, children inherit it.
 */
export default function Reveal({ group, tall, as = 'div', children, ...rest }: RevealProps) {
  const Tag = motion[as] as typeof motion.div;

  // Children of a stagger parent must not re-declare whileInView, or they each
  // wait for their own viewport intersection and the stagger falls apart.
  return (
    <Tag
      variants={group ? stagger : reveal}
      {...(group
        ? { initial: 'hidden' as const, whileInView: 'visible' as const, viewport: tall ? VIEWPORT_TALL : VIEWPORT }
        : {})}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** A revealing block that owns its own trigger (not inside a group). */
export function RevealSolo({ tall, as = 'div', children, ...rest }: Omit<RevealProps, 'group'>) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={tall ? VIEWPORT_TALL : VIEWPORT}
      {...rest}
    >
      {children}
    </Tag>
  );
}
