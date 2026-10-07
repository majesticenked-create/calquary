#!/usr/bin/env node
/**
 * Headless check that the timeline loops seamlessly (no browser needed):
 *   node verify-loop.mjs
 * Exits non-zero if any animated quantity differs between t -> L and t = 0.
 */
import { CONFIG } from './config.js';
import { createTimeline } from './timeline.js';

const tl = createTimeline(CONFIG);
const L = tl.L;
const eps = 1e-7;
const fails = [];
const close = (name, a, b, tol = 1e-4) => {
  if (Math.abs(a - b) > tol) fails.push(`${name}: ${a} vs ${b}`);
};

// Flow: whole number of rows per loop, same speed either side of the seam.
close('X(L) % rowSpacing', (tl.XL / CONFIG.spheres.rowSpacing) % 1, 0, 1e-9);
close('speed', tl.speed(L - 0.01), tl.speed(0.01), 1e-3);

// Hero, camera, scanner, portals.
const h0 = tl.hero(0, {}), hL = tl.hero(L - eps, {});
for (const k of ['x', 'y', 'z', 'scale', 'orange', 'glow']) close(`hero.${k}`, hL[k], h0[k]);
const c0 = tl.camera(0, {}), cL = tl.camera(L - eps, {});
for (const k of ['x', 'y', 'z', 'dist', 'pitch', 'yaw']) close(`camera.${k}`, cL[k], c0[k]);
const s0 = tl.scanner(0, {}), sL = tl.scanner(L - eps, {});
for (const k of ['warn', 'accept', 'flash', 'laser', 'focus']) close(`scanner.${k}`, sL[k], s0[k], 1e-3);
close('portalIn', tl.portalIn(L - eps), tl.portalIn(0));
close('portalOut', tl.portalOut(L - eps), tl.portalOut(0));
close('activity', tl.activity(L - eps), tl.activity(0));

// Every sphere still orange at the seam must be past the flush line or hidden,
// so the colour reset happens off camera.
for (let row = 0; row < tl.layout.rows; row++) {
  if (tl.conversionAge(row, L - eps) < 0) continue;
  const s = tl.rowS(row, L - eps);
  if (!tl.isHidden(s) && s < CONFIG.layout.flushClearance) fails.push(`row ${row} still orange on camera at s=${s.toFixed(2)}`);
}

// Hero path has no jumps while visible.
let prev = tl.hero(0, {});
for (let i = 1; i < L * 1000; i++) {
  const cur = tl.hero(i / 1000, {});
  if (cur.visible && prev.visible) {
    const step = Math.hypot(cur.x - prev.x, cur.y - prev.y, cur.z - prev.z);
    if (step > 0.02) fails.push(`hero jump ${step.toFixed(3)} at t=${(i / 1000).toFixed(3)}`);
  }
  prev = cur;
}

console.log(
  `loop ${L}s | ${tl.layout.rows * CONFIG.spheres.lanes} spheres | ${tl.rowsPerLoop} rows/loop | ` +
    `release surge x${(1 + tl.surge).toFixed(2)} | scanner at s=${tl.layout.scanS.toFixed(2)}`,
);
if (fails.length) {
  console.error('LOOP CHECK FAILED\n  ' + fails.join('\n  '));
  process.exit(1);
}
console.log('loop check passed');
