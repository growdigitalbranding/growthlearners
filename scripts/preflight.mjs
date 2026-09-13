#!/usr/bin/env node
/**
 * Launch readiness check.
 *
 * The page is finished; the facts on it are not. Everything below is something
 * a visitor can see, or something that silently does nothing, and every one of
 * them is a single edit in lib/site.ts or lib/content.ts.
 *
 * Run it before any deploy:   npm run preflight
 * Exits non-zero on blockers, so it can gate a build.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => { try { return readFileSync(join(root, p), 'utf8'); } catch { return ''; } };

const site = read('lib/site.ts');
const content = read('lib/content.ts');
const env = { ...process.env };

const checks = [];
const add = (severity, area, problem, fix) => checks.push({ severity, area, problem, fix });

// ── Things a visitor can see ────────────────────────────────────────────────
if (!env.NEXT_PUBLIC_WHATSAPP && /whatsapp: env\.whatsapp \|\| '919000000000'/.test(site)) {
  add('blocker', 'Phone', 'The WhatsApp number is still 919000000000. It is live on every CTA and inside the Course JSON-LD.',
      'Set NEXT_PUBLIC_WHATSAPP, or change SITE.whatsapp in lib/site.ts.');
}
if (!env.NEXT_PUBLIC_PHONE_DISPLAY && /\+91 90000 00000/.test(site)) {
  add('blocker', 'Phone', 'The displayed number reads "+91 90000 00000" in the footer and the final CTA.',
      'Set NEXT_PUBLIC_PHONE_DISPLAY, or change SITE.phoneDisplay.');
}
if (/streetAddress: 'RS Puram, Coimbatore'/.test(site)) {
  add('blocker', 'Address', 'The address has no building or street. It also feeds LocalBusiness JSON-LD, so it has to match your Google Business Profile exactly.',
      'Set SITE.streetAddress, SITE.postalCode and SITE.geo to the real location.');
}
if (/lat: 11\.0168, lng: 76\.9558/.test(site)) {
  add('warning', 'Address', 'Map coordinates are the Coimbatore city centre default, not your building.',
      'Right-click your location in Google Maps, copy the coordinates into SITE.geo.');
}

// ── Trust ───────────────────────────────────────────────────────────────────
if (/export const TEACHERS: Teacher\[\] = \[\];/.test(content)) {
  add('blocker', 'Trust', 'Nobody is named as a teacher. The page twice promises "a straight answer from someone who teaches the course" without saying who.',
      'Add one entry to TEACHERS in lib/content.ts and the section renders itself.');
}
if (/export const TESTIMONIALS: Testimonial\[\] = \[\];/.test(content)) {
  add('warning', 'Trust', 'No social proof anywhere. Every landing-page pattern for a course puts it before the price.',
      'Add real quotes to TESTIMONIALS. A parent who paid is worth three student quotes.');
}

// ── Things that silently do nothing ─────────────────────────────────────────
if (!env.NEXT_PUBLIC_GTM_ID) {
  add('warning', 'Analytics', 'No GTM container, so GA4 and the Meta Pixel never load and none of the conversion events are recorded.',
      'Set NEXT_PUBLIC_GTM_ID. Without it you cannot tell which ad produced an enquiry.');
}
if (!env.CALLBACK_WEBHOOK_URL) {
  add('blocker', 'Leads', 'CALLBACK_WEBHOOK_URL is unset, so the callback form refuses every submission with a 503.',
      'Point it at a Zapier/Make hook, an n8n flow, or the CRM inbound endpoint.');
}

// ── Freshness ───────────────────────────────────────────────────────────────
const iso = site.match(/batchStartISO: '(\d{4}-\d{2}-\d{2})'/)?.[1];
if (iso) {
  const start = new Date(`${iso}T00:00:00Z`);
  const days = Math.round((start - new Date()) / 86400000);
  if (days < 0) {
    add('blocker', 'Batch', `The advertised batch start (${iso}) is ${Math.abs(days)} days in the past. It shows in the hero, the final CTA and the Course schema.`,
        'Move SITE.batchStartISO to the next batch.');
  } else if (days < 7) {
    add('warning', 'Batch', `The batch starts in ${days} days. Enquiries arriving now have almost no runway.`,
        'Consider advertising the following batch.');
  }
}

// ── Report ──────────────────────────────────────────────────────────────────
const blockers = checks.filter((c) => c.severity === 'blocker');
const warnings = checks.filter((c) => c.severity === 'warning');

const bold = (s) => `\x1b[1m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const amber = (s) => `\x1b[33m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;

console.log(`\n${bold('Launch readiness')}\n`);

if (checks.length === 0) {
  console.log(green('  Nothing blocking. Every placeholder has been replaced.\n'));
  process.exit(0);
}

for (const group of [
  { list: blockers, label: red('BLOCKER'), heading: 'Must fix before this page goes in front of anyone' },
  { list: warnings, label: amber('WARNING'), heading: 'Should fix' },
]) {
  if (group.list.length === 0) continue;
  console.log(`${bold(group.heading)}\n`);
  for (const c of group.list) {
    console.log(`  ${group.label}  ${bold(c.area)}`);
    console.log(`    ${c.problem}`);
    console.log(`    ${dim('Fix: ' + c.fix)}\n`);
  }
}

console.log(`${blockers.length} blocker(s), ${warnings.length} warning(s).\n`);
process.exit(blockers.length > 0 ? 1 : 0);
