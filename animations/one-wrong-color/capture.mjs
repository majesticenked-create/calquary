#!/usr/bin/env node
/**
 * Frame-exact offline render of "One Wrong Color" to MP4 (H.264, 1080x1920, 60fps).
 *
 *   npm i -D playwright            # once (any recent version)
 *   node capture.mjs --out one-wrong-color.mp4
 *
 * Options:
 *   --out <file>        output video (default one-wrong-color.mp4)
 *   --frames a:b        render only frames a..b-1 (default: whole loop)
 *   --stills <list>     comma-separated loop times in seconds -> PNG stills, no video
 *   --three-dir <dir>   serve three.js from a local node_modules/three (offline)
 *   --gpu               use the hardware GPU instead of SwiftShader
 *   --crf <n>           x264 quality (default 14)
 *
 * Every frame is rendered at t = i / fps from the deterministic timeline, so the
 * result is identical on every run and the last frame flows into the first.
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { extname, join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const here = dirname(fileURLToPath(import.meta.url));
const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => {
    if (a.startsWith('--')) acc.push([a.slice(2), all[i + 1] && !all[i + 1].startsWith('--') ? all[i + 1] : true]);
    return acc;
  }, []),
);
const out = resolve(args.out || 'one-wrong-color.mp4');
const threeDir = args['three-dir'] ? resolve(args['three-dir']) : null;

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json' };
const server = createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const file = join(here, path === '/' ? 'index.html' : path);
    if (!file.startsWith(here)) throw new Error('outside root');
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': MIME[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
const base = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch({
  args: args.gpu
    ? ['--enable-gpu', '--ignore-gpu-blocklist']
    : ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
let ffmpeg;
try {
  const page = await browser.newPage({ viewport: { width: 540, height: 960 } });
  page.on('pageerror', (e) => console.error('[page]', e.message));
  page.on('console', (m) => m.type() === 'error' && console.error('[console]', m.text()));
  if (threeDir) {
    await page.route('https://cdn.jsdelivr.net/npm/three@*/**', async (route) => {
      const rel = new URL(route.request().url()).pathname.replace(/^\/npm\/three@[^/]+\//, '');
      route.fulfill({ body: await readFile(join(threeDir, rel)), contentType: 'text/javascript' });
    });
  }
  await page.goto(`${base}/index.html?capture`);
  await page.waitForFunction(() => window.OWC && window.OWC.ready, null, { timeout: 120000 });
  const info = await page.evaluate(() => ({ fps: OWC.fps, frameCount: OWC.frameCount, spheres: OWC.sphereCount }));
  console.log(`loop: ${info.frameCount} frames @ ${info.fps}fps, ${info.spheres} spheres`);

  const grab = async (i) => {
    const url = await page.evaluate((n) => OWC.renderFrame(n), i);
    return Buffer.from(url.slice(url.indexOf(',') + 1), 'base64');
  };

  if (args.stills) {
    for (const tStr of String(args.stills).split(',')) {
      const t = Number(tStr);
      const file = out.replace(/\.[^.]+$/, '') + `-t${t.toFixed(3).padStart(6, "0")}.png`;
      writeFileSync(file, await grab(t * info.fps));
      console.log('wrote', file);
    }
  } else {
    const [a, b] = args.frames ? String(args.frames).split(':').map(Number) : [0, info.frameCount];
    ffmpeg = spawn('ffmpeg', [
      '-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(info.fps), '-i', '-',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', String(args.crf || 14), '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart', out,
    ], { stdio: ['pipe', 'inherit', 'inherit'] });
    const done = new Promise((ok, fail) => ffmpeg.on('close', (c) => (c === 0 ? ok() : fail(new Error(`ffmpeg exit ${c}`)))));
    const t0 = Date.now();
    for (let i = a; i < b; i++) {
      const png = await grab(i);
      if (!ffmpeg.stdin.write(png)) await new Promise((ok) => ffmpeg.stdin.once('drain', ok));
      if ((i - a) % 30 === 0) {
        const per = (Date.now() - t0) / (i - a + 1);
        console.log(`frame ${i + 1}/${b}  (${(per / 1000).toFixed(2)}s/frame, ~${Math.round(((b - i) * per) / 1000)}s left)`);
      }
    }
    ffmpeg.stdin.end();
    await done;
    console.log('wrote', out);
  }
  await page.evaluate(() => OWC.dispose());
} finally {
  await browser.close();
  server.close();
}
