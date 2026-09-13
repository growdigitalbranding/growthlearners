#!/usr/bin/env node
/**
 * Generates the placeholder tiles for the student-work gallery.
 *
 * Deliberately not photography. These are slots: they show the grid, the
 * aspect ratios and the rhythm so the layout can be judged, while being
 * unmistakably not student work. Stock photos here would look real, and the
 * one thing this section cannot do is look real before it is.
 *
 * Regenerate after editing the list:  node scripts/make-placeholders.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'work');
mkdirSync(out, { recursive: true });

const RATIOS = { '16/9': [1600, 900], '4/5': [1000, 1250], '9/16': [900, 1600], '1/1': [1200, 1200] };

const TILES = [
  { file: 'campaign-01', kind: 'AI ad campaign', ratio: '4/5' },
  { file: 'product-01', kind: 'Product photography', ratio: '1/1' },
  { file: 'realestate-01', kind: 'Real estate creative', ratio: '4/5' },
  { file: 'social-01', kind: 'Social campaign', ratio: '4/5' },
  { file: 'reel-01', kind: 'AI reel', ratio: '9/16' },
  { file: 'film-01', kind: 'Brand film', ratio: '16/9' },
  { file: 'ugc-01', kind: 'UGC-style ad', ratio: '9/16' },
  { file: 'landing-01', kind: 'Landing page', ratio: '16/9' },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

for (const tile of TILES) {
  const [w, h] = RATIOS[tile.ratio];
  const unit = Math.min(w, h);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="Placeholder slot">
  <rect width="${w}" height="${h}" fill="#1C1C1C"/>
  <g stroke="#F7F7F5" stroke-opacity="0.09" stroke-width="1">
    ${Array.from({ length: Math.ceil(w / 80) }, (_, i) => `<line x1="${i * 80}" y1="0" x2="${i * 80}" y2="${h}"/>`).join('')}
    ${Array.from({ length: Math.ceil(h / 80) }, (_, i) => `<line x1="0" y1="${i * 80}" x2="${w}" y2="${i * 80}"/>`).join('')}
  </g>
  <rect x="${unit * 0.06}" y="${unit * 0.06}" width="${unit * 0.055}" height="${unit * 0.055}" fill="#FF4D2E"/>
  <text x="${w / 2}" y="${h / 2 - unit * 0.03}" fill="#F7F7F5" fill-opacity="0.9" text-anchor="middle"
        font-family="Georgia, serif" font-size="${unit * 0.075}">${esc(tile.kind)}</text>
  <text x="${w / 2}" y="${h / 2 + unit * 0.055}" fill="#F7F7F5" fill-opacity="0.5" text-anchor="middle"
        font-family="system-ui, sans-serif" font-size="${unit * 0.032}" letter-spacing="${unit * 0.006}">PLACEHOLDER · ${tile.ratio} · REPLACE WITH REAL STUDENT WORK</text>
</svg>`;
  writeFileSync(join(out, `${tile.file}.svg`), svg);
}

console.log(`Wrote ${TILES.length} placeholder tiles to public/work/`);
console.log('These are slots, not photographs. Replace every one before launch.');
