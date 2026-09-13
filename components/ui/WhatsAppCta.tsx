'use client';

import { MessageCircle } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { whatsappLink } from '@/lib/site';
import { track } from '@/lib/analytics';

type Props = {
  /** Where on the page this button sits — sent with the GTM event. */
  location: string;
  label?: string;
  message?: string;
  className?: string;
  magnetic?: boolean;
  iconSize?: number;
};

/** The page's primary conversion. Every instance reports its own location. */
export default function WhatsAppCta({
  location,
  label = 'WhatsApp us',
  message,
  className = 'btn-accent',
  magnetic = true,
  iconSize = 18,
}: Props) {
  const href = whatsappLink(message);
  const onClick = () => track({ event: 'whatsapp_click', location });

  const inner = (
    <>
      <MessageCircle size={iconSize} strokeWidth={2} aria-hidden />
      {label}
    </>
  );

  if (!magnetic) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={className}
        data-gtm="whatsapp"
      >
        {inner}
      </a>
    );
  }

  return (
    <MagneticButton
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={className}
      data-gtm="whatsapp"
    >
      {inner}
    </MagneticButton>
  );
}
