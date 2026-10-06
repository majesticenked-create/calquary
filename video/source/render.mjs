import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
import { spawn } from 'child_process';
const [,, out, startF='0', endF='900'] = process.argv;
const browser = await chromium.launch({ args: ['--disable-gpu-vsync','--force-device-scale-factor=1'] });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto('file://' + process.cwd() + '/scene.html');
await page.waitForFunction('window.ready === true');
const ff = spawn('ffmpeg', ['-y','-v','error','-f','image2pipe','-framerate','60','-c:v','png','-i','-',
  '-c:v','libx264','-preset','slow','-crf','16','-pix_fmt','yuv420p','-r','60', out], { stdio: ['pipe','inherit','inherit'] });
const t0 = Date.now();
for (let f = +startF; f < +endF; f++) {
  const url = await page.evaluate((f) => { window.renderFrame(f); return document.getElementById('c').toDataURL('image/png'); }, f);
  const buf = Buffer.from(url.slice(url.indexOf(',') + 1), 'base64');
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  if (f % 60 === 0) console.error(out, 'frame', f, ((Date.now()-t0)/1000).toFixed(1)+'s');
}
ff.stdin.end();
await new Promise(r => ff.on('close', r));
await browser.close();
