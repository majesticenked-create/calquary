// Verifies the seam: frame `total` (p=1) must be pixel-identical to frame 0 (grain off).
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch();
for (const layout of ['h', 'v']) {
  const page = await browser.newPage({ viewport: { width: 960, height: 960 } });
  await page.goto(pathToFileURL(path.join(here, 'scene.html')).href + '?render=1');
  const res = await page.evaluate((l) => {
    window.NO_GRAIN = true; window.setup(l, 0.5);
    const c = document.getElementById('c'), x = c.getContext('2d');
    const grab = f => { window.renderFrame(f, 360); return x.getImageData(0, 0, c.width, c.height).data; };
    const a = grab(0), b = grab(360), n = grab(1);
    let seam = 0, step = 0;
    for (let i = 0; i < a.length; i++) { seam = Math.max(seam, Math.abs(a[i] - b[i])); step += Math.abs(a[i] - n[i]); }
    return { seamMaxDiff: seam, meanStepDiff01: step / a.length };
  }, layout);
  console.log(layout, res);
}
await browser.close();
