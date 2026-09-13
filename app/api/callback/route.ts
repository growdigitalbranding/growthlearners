import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Callback request handler — the secondary conversion path, for people who do
 * not want to open WhatsApp.
 *
 * Leads are forwarded to CALLBACK_WEBHOOK_URL, which should point at whatever
 * the team already uses: a Zapier or Make hook, an n8n flow, a Google Apps
 * Script bound to a sheet, or the CRM's own inbound endpoint. If that variable
 * is not set the route refuses the submission rather than accepting it and
 * dropping it — a form that silently loses enquiries is worse than no form,
 * and the UI falls back to offering WhatsApp instead.
 */

type Payload = {
  name?: unknown;
  mobile?: unknown;
  org?: unknown;
  /** Honeypot. Real users never see this field, so anything in it is a bot. */
  website?: unknown;
};

const asString = (value: unknown, max: number): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

/** 10 digits starting 6–9, with an optional +91 / 0 prefix. */
const MOBILE = /^(?:\+?91[\s-]?|0)?([6-9]\d{9})$/;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: 'Could not read that request.' }, { status: 400 });
  }

  // Bots fill every field they find. Accept, then discard.
  if (asString(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = asString(body.name, 80);
  const rawMobile = asString(body.mobile, 20).replace(/[\s-]/g, '');
  const org = asString(body.org, 120);

  const fieldErrors: Record<string, string> = {};
  if (name.length < 2) fieldErrors.name = 'Please enter your name.';

  const match = MOBILE.exec(rawMobile);
  if (!match) fieldErrors.mobile = 'Enter a 10-digit Indian mobile number.';

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ ok: false, fieldErrors }, { status: 422 });
  }

  const lead = {
    name,
    mobile: `+91${match![1]}`,
    org: org || null,
    source: 'growthlearners.in/#enquire',
    receivedAt: new Date().toISOString(),
  };

  const webhook = process.env.CALLBACK_WEBHOOK_URL;
  if (!webhook) {
    console.error('[callback] CALLBACK_WEBHOOK_URL is not set — refusing to accept a lead we cannot deliver.');
    return NextResponse.json(
      { ok: false, error: 'The callback form is not connected yet. Please message us on WhatsApp.' },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
  } catch (error) {
    // Log the lead so it is recoverable from the platform logs even when the
    // downstream hook is down.
    console.error('[callback] delivery failed', { lead, error });
    return NextResponse.json(
      { ok: false, error: 'We could not submit that just now. Please message us on WhatsApp.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
