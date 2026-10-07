/**
 * Renderer, post-processing and playback for "One Wrong Color".
 *
 * Modes (query string):
 *   (none)      real-time preview, loops forever
 *   ?t=7.4      freeze on a given loop time (seconds)
 *   ?capture    fixed 1080x1920 canvas; exposes window.OWC.renderFrame(i)
 *               for frame-exact offline capture (see capture.mjs)
 */
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { CONFIG } from './config.js';
import { createOneWrongColor } from './scene.js';

const params = new URLSearchParams(location.search);
const CAPTURE = params.has('capture');
const FROZEN = params.has('t') ? Number(params.get('t')) : null;
const { width: OUT_W, height: OUT_H, fps: FPS } = CONFIG.output;

const stage = document.getElementById('stage');
const renderer = new THREE.WebGLRenderer({
  antialias: false, // MSAA happens in the composer's render target
  powerPreference: 'high-performance',
  preserveDrawingBuffer: CAPTURE,
});
renderer.setPixelRatio(1);
renderer.toneMapping = THREE.NeutralToneMapping; // hue-preserving: ACES drifts saturated blue to purple
renderer.toneMappingExposure = CONFIG.render.exposure;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.localClippingEnabled = true;
stage.appendChild(renderer.domElement);

const anim = createOneWrongColor(renderer, CONFIG);
const L = CONFIG.loop.duration;

const target = new THREE.WebGLRenderTarget(OUT_W, OUT_H, {
  type: THREE.HalfFloatType,
  samples: CONFIG.render.msaaSamples,
});
const composer = new EffectComposer(renderer, target);
composer.addPass(new RenderPass(anim.scene, anim.camera));
const { strength, radius, threshold } = CONFIG.render.bloom;
const bloom = new UnrealBloomPass(new THREE.Vector2(OUT_W, OUT_H), strength, radius, threshold);
composer.addPass(bloom);
const output = new OutputPass();
composer.addPass(output);

/** Internal resolution: exact output size when capturing, display-fitted otherwise. */
function resize() {
  let w = OUT_W;
  let h = OUT_H;
  if (!CAPTURE) {
    const rect = stage.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, CONFIG.render.previewMaxPixelRatio);
    h = Math.min(OUT_H, Math.max(320, Math.round(rect.height * dpr)));
    w = Math.round((h * OUT_W) / OUT_H);
  }
  renderer.setSize(w, h, false);
  composer.setSize(w, h);
}
resize();

function renderAt(t) {
  anim.update(t);
  composer.render();
}

let raf = 0;
let disposed = false;
const onResize = () => resize();

if (CAPTURE) {
  window.OWC = {
    fps: FPS,
    duration: L,
    frameCount: Math.round(L * FPS),
    sphereCount: anim.sphereCount,
    /** Render frame i (t = i / fps) and return it as a PNG data URL. */
    renderFrame(i, type = 'image/png', quality) {
      renderAt(i / FPS);
      return renderer.domElement.toDataURL(type, quality);
    },
    dispose,
    ready: true,
  };
} else {
  window.addEventListener('resize', onResize);
  if (FROZEN !== null) {
    renderAt(FROZEN);
  } else {
    const start = performance.now();
    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      renderAt((((now - start) / 1000) % L + L) % L);
    };
    raf = requestAnimationFrame(tick);
  }
}

function dispose() {
  if (disposed) return;
  disposed = true;
  cancelAnimationFrame(raf);
  window.removeEventListener('resize', onResize);
  window.removeEventListener('pagehide', dispose);
  anim.dispose();
  bloom.dispose();
  output.dispose();
  composer.dispose(); // disposes its internal render targets
  target.dispose();
  renderer.dispose();
  renderer.forceContextLoss();
  renderer.domElement.remove();
}
window.addEventListener('pagehide', dispose);
