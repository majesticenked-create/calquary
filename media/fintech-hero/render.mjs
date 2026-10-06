// Renders scene.html frame-by-frame in headless Chromium and writes PNGs.
// Usage: node render.mjs <layout h|v> <outDir> [frames=360] [scale=2] [workers=4] [only=comma list]
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const [layout = 'h', outDir = 'frames', framesArg = '360', scaleArg = '2', workersArg = '4', only] = process.argv.slice(2);
const total = +framesArg, scale = +scaleArg, workers = +workersArg;
const dims = layout === 'h' ? [1920, 1080] : [1080, 1920];
const vw = dims[0] * scale, vh = dims[1] * scale;
fs.mkdirSync(outDir, { recursive: true });
const here = path.dirname(fileURLToPath(import.meta.url));
const url = pathToFileURL(path.join(here, 'scene.html')).href + '?render=1';

const list = only ? only.split(',').map(Number) : [...Array(total).keys()].filter(i => !fs.existsSync(path.join(outDir, `f${String(i).padStart(4, '0')}.png`)));
const browser = await chromium.launch({ args: ['--disable-gpu-vsync', '--force-color-profile=srgb'] });
let next = 0, done = 0;
const t0 = Date.now();
await Promise.all([...Array(workers)].map(async () => {
  const page = await browser.newPage({ viewport: { width: vw, height: vh }, deviceScaleFactor: 1 });
  await page.goto(url);
  await page.evaluate(([l, s]) => window.setup(l, s), [layout, scale]);
  while (next < list.length) {
    const i = list[next++];
    await page.evaluate(([f, t]) => window.renderFrame(f, t), [i, total]);
    await page.screenshot({ path: path.join(outDir, `f${String(i).padStart(4, '0')}.png`), clip: { x: 0, y: 0, width: vw, height: vh } });
    done++;
    if (done % 20 === 0) console.log(`${done}/${list.length}  ${((Date.now() - t0) / done / 1000 * workers).toFixed(2)}s/frame/worker`);
  }
  await page.close();
}));
await browser.close();
console.log(`done ${done} frames in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
