// usage: node render.js out.mp4 [fps] [onlyStill seconds]
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

(async () => {
  const out = process.argv[2] || 'out.mp4';
  const fps = +(process.argv[3] || 60);
  const still = process.argv[4];
  const browser = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-gpu-rasterization'] });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('file://' + path.join(__dirname, 'scene.html'));
  await page.evaluate(() => window.ready);

  if (still !== undefined) {
    for (const s of still.split(',')) {
      const d = await page.evaluate(t => window.renderFrame(t), +s);
      fs.writeFileSync(`${out}_${s}.png`, Buffer.from(d.split(',')[1], 'base64'));
    }
    await browser.close(); return;
  }

  const dur = 16, n = Math.round(dur * fps);
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-pix_fmt', 'yuv420p',
    '-profile:v', 'high', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = 0; i < n; i++) {
    const d = await page.evaluate(t => window.renderFrame(t), i / fps);
    if (!ff.stdin.write(Buffer.from(d.split(',')[1], 'base64')))
      await new Promise(r => ff.stdin.once('drain', r));
    if (i % 120 === 0) console.log(`frame ${i}/${n}`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await browser.close();
})();
