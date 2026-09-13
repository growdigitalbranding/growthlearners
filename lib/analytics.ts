'use client';

/**
 * Everything goes through GTM's dataLayer — GA4 and the Meta Pixel are both
 * configured inside the container, so this file never needs to know about
 * either. Safe to call when GTM is absent: the array just accumulates.
 */
export type GtmEvent =
  | { event: 'whatsapp_click'; location: string }
  | { event: 'callback_submit'; college_or_company: string }
  | { event: 'curriculum_open'; session: number; title: string }
  | { event: 'faq_open'; question: string }
  | { event: 'phone_click'; location: string };

export function track(payload: GtmEvent): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload as unknown as Record<string, unknown>);
}
