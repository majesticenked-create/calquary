/**
 * Scene construction + per-frame update for "One Wrong Color".
 *
 * Everything is allocated once in createOneWrongColor(); update(t) only writes
 * into existing buffers (no per-frame allocations), and dispose() releases
 * every GPU resource the scene created.
 */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createTimeline, smoothstep } from './timeline.js';

const TAU = Math.PI * 2;

export function createOneWrongColor(renderer, C) {
  const tl = createTimeline(C);
  const lay = tl.layout;
  const S = C.spheres;
  const r = S.radius;
  const lanes = S.lanes;
  const center = tl.centerLane;
  const trackW = lanes * S.laneSpacing;
  const plateW = trackW + 0.7;
  const L = tl.L;

  // Every geometry / material / texture / render target goes through here so
  // dispose() can free it.
  const owned = [];
  const own = (o) => (owned.push(o), o);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(C.colors.background);
  scene.fog = new THREE.Fog(C.colors.background, 17, 36);

  // ------------------------------------------------------------------ environment
  {
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const envRT = own(pmrem.fromScene(room, 0.04));
    room.dispose();
    pmrem.dispose();
    scene.environment = envRT.texture;
    scene.environmentIntensity = C.render.environmentIntensity;
  }

  // ------------------------------------------------------------------ colours
  const COL = {
    blue: new THREE.Color(C.colors.blue),
    orange: new THREE.Color(C.colors.orange),
    led: new THREE.Color(C.colors.ledIdle),
    warn: new THREE.Color(C.colors.warning),
  };
  const tmpCol = new THREE.Color();
  const tmpCol2 = new THREE.Color();
  /** out += c * k, in place. */
  const addScaled = (out, c, k) => {
    out.r += c.r * k;
    out.g += c.g * k;
    out.b += c.b * k;
    return out;
  };

  // ------------------------------------------------------------------ materials
  const mat = {
    body: own(new THREE.MeshPhysicalMaterial({
      color: C.colors.machine, metalness: 0.35, roughness: 0.36, clearcoat: 0.7, clearcoatRoughness: 0.22,
    })),
    dark: own(new THREE.MeshStandardMaterial({ color: C.colors.machineDark, metalness: 0.25, roughness: 0.5 })),
    slot: own(new THREE.MeshStandardMaterial({ color: 0x030304, metalness: 0, roughness: 0.95 })),
    metal: own(new THREE.MeshStandardMaterial({ color: C.colors.metal, metalness: 0.92, roughness: 0.26 })),
    roller: own(new THREE.MeshStandardMaterial({ vertexColors: true, metalness: 0.85, roughness: 0.3 })),
    floor: own(new THREE.MeshStandardMaterial({ color: C.colors.floor, metalness: 0.15, roughness: 0.6 })),
    glass: own(new THREE.MeshPhysicalMaterial({
      color: C.colors.glass, metalness: 0, roughness: 0.05, clearcoat: 0.5, clearcoatRoughness: 0.05,
      transparent: true, opacity: 0.06, depthWrite: false, side: THREE.FrontSide, envMapIntensity: 0.8,
    })),
    led: own(new THREE.MeshBasicMaterial({ color: 0xffffff })),
  };
  const glowMat = (map, color) =>
    own(new THREE.MeshBasicMaterial({
      color, map, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
    }));

  // Gradient textures (generated, no external assets).
  const makeTexture = (w, h, paint) => {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    paint(c.getContext('2d'), w, h);
    const tex = own(new THREE.CanvasTexture(c));
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  };
  const radialTex = makeTexture(256, 256, (g, w, h) => {
    const grd = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    grd.addColorStop(0, 'rgba(255,255,255,1)');
    grd.addColorStop(0.35, 'rgba(255,255,255,0.55)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, w, h);
  });
  const swirlTex = makeTexture(256, 256, (g, w, h) => {
    const grd = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    grd.addColorStop(0, 'rgba(255,255,255,1)');
    grd.addColorStop(0.6, 'rgba(255,255,255,0.35)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, w, h);
    g.globalCompositeOperation = 'destination-out';
    g.translate(w / 2, h / 2);
    for (let i = 0; i < 5; i++) {
      g.rotate(TAU / 5);
      g.beginPath();
      for (let a = 0; a < 1; a += 0.02) g.lineTo(Math.cos(a * 4) * a * w * 0.5, Math.sin(a * 4) * a * w * 0.5);
      g.lineWidth = 9;
      g.strokeStyle = 'rgba(0,0,0,0.55)';
      g.stroke();
    }
  });
  const bandTex = makeTexture(64, 256, (g, w, h) => {
    const grd = g.createLinearGradient(0, 0, 0, h);
    grd.addColorStop(0, 'rgba(255,255,255,0)');
    grd.addColorStop(0.5, 'rgba(255,255,255,1)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, w, h);
  });

  // ------------------------------------------------------------------ helpers
  const add = (geo, material, { x = 0, y = 0, z = 0, cast = true, receive = true, rx = 0, ry = 0, rz = 0 } = {}) => {
    const m = new THREE.Mesh(geo, material);
    m.position.set(x, y, z);
    m.rotation.set(rx, ry, rz);
    m.castShadow = cast;
    m.receiveShadow = receive;
    scene.add(m);
    return m;
  };
  const rbox = (w, h, dpt, rad = 0.04) => own(new RoundedBoxGeometry(w, h, dpt, 3, Math.min(rad, w / 2, h / 2, dpt / 2)));
  /** Puck with rounded edges (lathe profile), axis = Y, centred. */
  const roundedPuck = (radius, height, bevel) => {
    const pts = [new THREE.Vector2(0, -height / 2)];
    const steps = 6;
    for (let i = 0; i <= steps; i++) {
      const a = -Math.PI / 2 + (i / steps) * (Math.PI / 2);
      pts.push(new THREE.Vector2(radius - bevel + Math.cos(a) * bevel, -height / 2 + bevel + Math.sin(a) * bevel));
    }
    for (let i = 0; i <= steps; i++) {
      const a = (i / steps) * (Math.PI / 2);
      pts.push(new THREE.Vector2(radius - bevel + Math.cos(a) * bevel, height / 2 - bevel + Math.sin(a) * bevel));
    }
    pts.push(new THREE.Vector2(0, height / 2));
    return own(new THREE.LatheGeometry(pts, 32));
  };
  const instanced = (geo, material, count, { cast = true, receive = true } = {}) => {
    const m = new THREE.InstancedMesh(geo, material, count);
    m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    m.castShadow = cast;
    m.receiveShadow = receive;
    m.frustumCulled = false; // instances move over the whole machine
    scene.add(m);
    return m;
  };
  const dummy = new THREE.Object3D();
  const mtx = new THREE.Matrix4();
  const ZERO = new THREE.Matrix4().makeScale(0, 0, 0);

  // ------------------------------------------------------------------ lights
  scene.add(new THREE.HemisphereLight(0xc4d6ff, 0x16120d, 0.35));
  const key = new THREE.DirectionalLight(0xfff1e2, 2.2);
  const midZ = (lay.trackStart + lay.trackEnd) / 2;
  key.position.set(-5, 12, midZ + 5);
  key.target.position.set(0, 0, midZ);
  key.castShadow = true;
  key.shadow.mapSize.set(C.render.shadowMapSize, C.render.shadowMapSize);
  Object.assign(key.shadow.camera, { left: -13, right: 13, top: 13, bottom: -13, near: 1, far: 40 });
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.02;
  scene.add(key, key.target);
  const rim = new THREE.DirectionalLight(0x8fb4ff, 1.1);
  rim.position.set(3, 6, lay.trackStart - 10);
  scene.add(rim);

  const waveLight = new THREE.PointLight(C.colors.orange, 0, 7, 2);
  const scanLight = new THREE.PointLight(C.colors.ledIdle, 0, 7, 2);
  scanLight.position.set(0, lay.baseY + 1.1, lay.scanS + 0.4);
  const heroLight = new THREE.PointLight(C.colors.orange, 0, 2.6, 2);
  scene.add(waveLight, scanLight, heroLight);

  // ------------------------------------------------------------------ floor + base plate
  add(own(new THREE.PlaneGeometry(90, 90)), mat.floor, { rx: -Math.PI / 2, z: midZ, cast: false });

  const plateTop = (s) => (s > lay.rollers[0] - 0.12 && s < lay.rollers[1] + 0.12 ? lay.trackY - 0.12 : lay.trackY);
  const plateSeg = (a, b, top) => {
    add(rbox(plateW, top, b - a, 0.06), mat.dark, { y: top / 2, z: (a + b) / 2 });
  };
  plateSeg(lay.trackStart, lay.rollers[0] - 0.12, lay.trackY);
  plateSeg(lay.rollers[0] - 0.12, lay.rollers[1] + 0.12, lay.trackY - 0.12);
  plateSeg(lay.rollers[1] + 0.12, lay.trackEnd, lay.trackY);
  // Skirt panels along both sides (painted body).
  for (const side of [-1, 1]) {
    const len = lay.trackEnd - lay.trackStart + 0.2;
    add(rbox(0.16, lay.trackY + 0.12, len, 0.06), mat.body, {
      x: side * (plateW / 2 + 0.08), y: (lay.trackY + 0.12) / 2, z: midZ,
    });
  }
  // Feeder and collector slots.
  const slot = (a, b) =>
    add(own(new THREE.PlaneGeometry(trackW + 0.08, b - a)), mat.slot, {
      rx: -Math.PI / 2, y: lay.trackY + 0.002, z: (a + b) / 2, cast: false,
    });
  slot(lay.riseStart - 0.25, lay.riseEnd - 0.05);
  slot(lay.sinkStart + 0.1, lay.sinkEnd + 0.3);

  // Lane dividers (instanced per segment length).
  const boundaryX = (j) => (j - lanes / 2) * S.laneSpacing;
  const dividerSegments = [
    [lay.riseEnd + 0.05, lay.rollers[0] - 0.15],
    [lay.rollers[1] + 0.15, lay.tubes[0] - 0.3],
    [lay.tubes[1] + 0.3, lay.sinkStart],
  ];
  for (const [a, b] of dividerSegments) {
    const m = instanced(rbox(0.04, 0.075, b - a, 0.018), mat.metal, lanes + 1);
    for (let j = 0; j <= lanes; j++) {
      const outer = j === 0 || j === lanes;
      dummy.position.set(boundaryX(j), lay.trackY + 0.0375, (a + b) / 2);
      dummy.scale.set(outer ? 1.6 : 1, outer ? 1.8 : 1, 1);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      m.setMatrixAt(j, dummy.matrix);
    }
    m.instanceMatrix.setUsage(THREE.StaticDrawUsage);
  }

  // ------------------------------------------------------------------ LED accent strips
  const ledSpacing = 0.24;
  const ledPerSide = Math.floor((lay.trackEnd - lay.trackStart - 0.4) / ledSpacing);
  const leds = instanced(own(new THREE.BoxGeometry(0.045, 0.02, ledSpacing * 0.72)), mat.led, ledPerSide * 2, {
    cast: false, receive: false,
  });
  const ledS = new Float32Array(ledPerSide * 2);
  for (let i = 0; i < ledPerSide; i++) {
    for (const [k, side] of [[0, -1], [1, 1]]) {
      const s = lay.trackStart + 0.2 + (i + 0.5) * ledSpacing;
      const idx = i * 2 + k;
      ledS[idx] = s;
      mtx.makeTranslation(side * (plateW / 2 - 0.1), plateTop(s) + 0.012, s);
      leds.setMatrixAt(idx, mtx);
      leds.setColorAt(idx, COL.led);
    }
  }
  leds.instanceMatrix.setUsage(THREE.StaticDrawUsage);
  const accentColor = (s, t, intensity, out) => {
    const o = tl.accentOrange(s, t);
    const f = tl.accentFlash(s, t);
    out.copy(COL.led).multiplyScalar(intensity);
    tmpCol2.copy(COL.orange).multiplyScalar(intensity * 1.35);
    out.lerp(tmpCol2, o);
    return addScaled(out, COL.orange, f * 4.5);
  };

  // ------------------------------------------------------------------ 1. rollers
  const rollR = 0.075;
  const rollerCount = Math.floor((lay.rollers[1] - lay.rollers[0]) / 0.205) + 1;
  const rollerPitch = (lay.rollers[1] - lay.rollers[0]) / (rollerCount - 1);
  let rollerGeo = new THREE.CylinderGeometry(rollR, rollR, trackW + 0.24, 36, 1);
  {
    const ni = rollerGeo.toNonIndexed();
    rollerGeo.dispose();
    rollerGeo = own(ni);
    const pos = rollerGeo.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    const light = new THREE.Color(C.colors.metal);
    const darkc = new THREE.Color(C.colors.machineDark);
    for (let tri = 0; tri < pos.count; tri += 3) {
      let cx = 0, cz = 0;
      for (let v = 0; v < 3; v++) { cx += pos.getX(tri + v); cz += pos.getZ(tri + v); }
      const ang = Math.atan2(cx, cz) + Math.PI;
      const c = Math.floor((ang / TAU) * 12) % 2 ? light : darkc;
      for (let v = 0; v < 3; v++) colors.set([c.r, c.g, c.b], (tri + v) * 3);
    }
    rollerGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    rollerGeo.rotateZ(Math.PI / 2); // axis along X
  }
  const rollers = instanced(rollerGeo, mat.roller, rollerCount);
  // Effective rolling radius so roller angle is a whole number of turns per loop.
  const rollTurns = Math.max(1, Math.round(tl.XL / (TAU * rollR)));
  const rollEff = tl.XL / (TAU * rollTurns);
  for (const side of [-1, 1]) {
    add(rbox(0.12, 0.2, lay.rollers[1] - lay.rollers[0] + 0.3, 0.04), mat.body, {
      x: side * (trackW / 2 + 0.2), y: lay.trackY - 0.04, z: (lay.rollers[0] + lay.rollers[1]) / 2,
    });
  }

  // ------------------------------------------------------------------ 2. gate
  const gateY = lay.trackY + 0.78;
  for (const side of [-1, 1]) {
    add(rbox(0.2, gateY + 0.1, 0.24, 0.05), mat.body, { x: side * (plateW / 2 + 0.05), y: (gateY + 0.1) / 2, z: lay.gate });
  }
  add(rbox(plateW + 0.3, 0.16, 0.24, 0.06), mat.body, { y: gateY, z: lay.gate });
  const gateLed = add(own(new THREE.BoxGeometry(plateW + 0.05, 0.025, 0.03)), own(new THREE.MeshBasicMaterial()), {
    y: gateY - 0.02, z: lay.gate + 0.125, cast: false, receive: false,
  });
  const fins = instanced(rbox(0.12, 0.26, 0.06, 0.025), mat.metal, lanes * 2);

  // ------------------------------------------------------------------ 3. pistons
  const gantryY = lay.trackY + 1.32;
  const headH = 0.09;
  const headR = 0.12;
  const pistonLeds = [];
  for (const ps of lay.pistons) {
    for (const side of [-1, 1]) {
      add(rbox(0.2, gantryY + 0.12, 0.26, 0.05), mat.body, { x: side * (plateW / 2 + 0.05), y: (gantryY + 0.12) / 2, z: ps });
    }
    add(rbox(plateW + 0.3, 0.2, 0.3, 0.07), mat.body, { y: gantryY + 0.1, z: ps });
    pistonLeds.push(add(own(new THREE.BoxGeometry(plateW + 0.05, 0.025, 0.03)), own(new THREE.MeshBasicMaterial()), {
      y: gantryY + 0.04, z: ps + 0.155, cast: false, receive: false,
    }));
  }
  const rodGeo = own(new THREE.CylinderGeometry(0.03, 0.03, 1, 16));
  rodGeo.translate(0, -0.5, 0); // top anchored at origin
  const rods = instanced(rodGeo, mat.metal, lanes * 2);
  const heads = instanced(roundedPuck(headR, headH, 0.03), mat.body, lanes * 2);

  // ------------------------------------------------------------------ 4. curved transparent tubes
  const tubeA = lay.tubes[0] - 0.3;
  const tubeB = lay.tubes[1] + 0.3;
  for (let i = 0; i < lanes; i++) {
    const pts = [];
    for (let s = tubeA; s <= tubeB + 1e-6; s += 0.05) pts.push(new THREE.Vector3(tl.laneX(i, s), tl.laneY(s), s));
    const curve = new THREE.CatmullRomCurve3(pts);
    const tube = add(own(new THREE.TubeGeometry(curve, 220, r + 0.042, 20, false)), mat.glass, { cast: false, receive: false });
    tube.renderOrder = 2;
  }
  const collars = instanced(own(new THREE.TorusGeometry(r + 0.05, 0.026, 12, 32)), mat.metal, lanes * 2);
  for (let i = 0; i < lanes; i++) {
    [tubeA, tubeB].forEach((s, k) => {
      mtx.makeTranslation(tl.laneX(i, s), tl.laneY(s), s);
      collars.setMatrixAt(i * 2 + k, mtx);
    });
  }
  collars.instanceMatrix.setUsage(THREE.StaticDrawUsage);
  // Low cradles under the tube ends.
  for (const s of [tubeA, tubeB]) add(rbox(trackW + 0.25, 0.16, 0.2, 0.05), mat.body, { y: lay.trackY + 0.03, z: s });

  // ------------------------------------------------------------------ 5. circular scanner
  const R = lay.scannerRadius;
  const scanY = lay.baseY;
  add(own(new THREE.TorusGeometry(R, 0.17, 32, 160)), mat.body, { y: scanY, z: lay.scanS });
  add(own(new THREE.TorusGeometry(R + 0.2, 0.05, 16, 160)), mat.metal, { y: scanY, z: lay.scanS - 0.05 });
  for (const side of [-1, 1]) add(rbox(0.6, 0.5, 0.6, 0.1), mat.body, { x: side * R, y: 0.25, z: lay.scanS });
  const scanRingMat = own(new THREE.MeshBasicMaterial());
  add(own(new THREE.TorusGeometry(R - 0.19, 0.03, 12, 160)), scanRingMat, { y: scanY, z: lay.scanS + 0.06, cast: false, receive: false });
  add(own(new THREE.TorusGeometry(R - 0.19, 0.03, 12, 160)), scanRingMat, { y: scanY, z: lay.scanS - 0.06, cast: false, receive: false });
  const discMat = glowMat(radialTex, 0xffffff);
  const disc = add(own(new THREE.CircleGeometry(R - 0.2, 96)), discMat, { y: scanY, z: lay.scanS, cast: false, receive: false });
  disc.renderOrder = 3;
  const laserMat = own(new THREE.MeshBasicMaterial());
  const laser = add(own(new THREE.BoxGeometry(1, 0.022, 0.022)), laserMat, { z: lay.scanS, cast: false, receive: false });
  const lampMat = own(new THREE.MeshBasicMaterial());
  for (const side of [-1, 1]) {
    const a = Math.PI / 2 + side * 0.65;
    add(own(new THREE.SphereGeometry(0.075, 20, 14)), lampMat, {
      x: Math.cos(a) * R, y: scanY + Math.sin(a) * R, z: lay.scanS + 0.17, cast: false,
    });
  }
  const shockMat = glowMat(null, 0xffffff);
  const shock = add(own(new THREE.RingGeometry(0.93, 1.0, 128)), shockMat, { y: scanY, z: lay.scanS + 0.02, cast: false, receive: false });
  shock.renderOrder = 4;

  // ------------------------------------------------------------------ pulse wave front
  const waveMat = glowMat(bandTex, 0xffffff);
  const wave = add(own(new THREE.PlaneGeometry(plateW + 0.6, 1.1)), waveMat, { cast: false, receive: false });
  wave.renderOrder = 4;

  // ------------------------------------------------------------------ portals
  const makePortal = (color, s, y) => {
    const g = new THREE.Group();
    g.position.set(0, y, s);
    const ringMat = own(new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(3) }));
    g.add(new THREE.Mesh(own(new THREE.TorusGeometry(0.27, 0.028, 16, 64)), ringMat));
    const discM = glowMat(swirlTex, new THREE.Color(color).multiplyScalar(1.6));
    const d = new THREE.Mesh(own(new THREE.CircleGeometry(0.255, 48)), discM);
    d.renderOrder = 5;
    g.add(d);
    const halo = new THREE.Mesh(own(new THREE.CircleGeometry(0.75, 48)), glowMat(radialTex, new THREE.Color(color).multiplyScalar(0.6)));
    halo.renderOrder = 5;
    g.add(halo);
    scene.add(g);
    return { group: g, disc: d };
  };
  const portalIn = makePortal(C.colors.orange, lay.portalInS, lay.heroLiftY);
  const portalOut = makePortal(C.colors.blue, lay.portalOutS, lay.exitLiftY);

  // ------------------------------------------------------------------ spheres (instanced)
  const sphereGeo = own(new THREE.SphereGeometry(r, S.widthSegments, S.heightSegments));
  const rows = lay.rows;
  const count = rows * lanes;
  const glowAttr = new THREE.InstancedBufferAttribute(new Float32Array(count), 1);
  glowAttr.setUsage(THREE.DynamicDrawUsage);
  sphereGeo.setAttribute('aGlow', glowAttr);
  const sphereMat = own(new THREE.MeshPhysicalMaterial({
    color: 0xffffff, metalness: 0.0, roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 0.9,
  }));
  // Per-instance emissive flash for the chain reaction.
  sphereMat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float aGlow;\nvarying float vGlow;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvGlow = aGlow;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying float vGlow;')
      .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\ntotalEmissiveRadiance += diffuseColor.rgb * vGlow;');
  };
  sphereMat.customProgramCacheKey = () => 'owc-sphere-glow';
  const spheres = instanced(sphereGeo, sphereMat, count);
  for (let i = 0; i < count; i++) spheres.setColorAt(i, COL.blue);
  spheres.instanceColor.setUsage(THREE.DynamicDrawUsage);

  // ------------------------------------------------------------------ hero
  const clipPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 1e4);
  const heroMat = own(new THREE.MeshPhysicalMaterial({
    color: C.colors.blue, emissive: C.colors.orange, emissiveIntensity: 0, metalness: 0, roughness: 0.12,
    clearcoat: 1, clearcoatRoughness: 0.04, envMapIntensity: 1.25, clippingPlanes: [clipPlane], clipShadows: true,
  }));
  const hero = add(own(new THREE.SphereGeometry(r, 48, 32)), heroMat);
  const introRing = add(own(new THREE.RingGeometry(0.86, 1.0, 96)), glowMat(null, new THREE.Color(C.colors.orange).multiplyScalar(2.5)), {
    rx: -Math.PI / 2, cast: false, receive: false,
  });
  introRing.renderOrder = 4;

  // ------------------------------------------------------------------ camera
  const camera = new THREE.PerspectiveCamera(C.camera.fov, C.output.width / C.output.height, C.camera.near, C.camera.far);
  const camState = {};
  const heroState = {};
  const scanState = {};

  // ================================================================== update
  function update(tIn) {
    const t = ((tIn % L) + L) % L;
    const act = tl.activity(t);
    const flowX = tl.X(t);

    // --- spheres
    const colArr = spheres.instanceColor.array;
    const glowArr = glowAttr.array;
    for (let row = 0; row < rows; row++) {
      const s = tl.rowS(row, t);
      const hidden = tl.isHidden(s);
      const age = hidden ? -1 : tl.conversionAge(row, t);
      let o = 0, glow = 0;
      if (age >= 0) {
        o = smoothstep(0, 0.08, age);
        glow = 1.1 * Math.exp(-age * 8) + 0.03;
      }
      tmpCol.copy(COL.blue).lerp(COL.orange, o);
      const y = tl.laneY(s);
      const heroSlot = tl.isHeroSlot(s, t);
      for (let lane = 0; lane < lanes; lane++) {
        const i = row * lanes + lane;
        if (hidden || (lane === center && heroSlot)) {
          spheres.setMatrixAt(i, ZERO);
          continue;
        }
        mtx.makeTranslation(tl.laneX(lane, s), y, s);
        spheres.setMatrixAt(i, mtx);
        colArr[i * 3] = tmpCol.r;
        colArr[i * 3 + 1] = tmpCol.g;
        colArr[i * 3 + 2] = tmpCol.b;
        glowArr[i] = glow;
      }
    }
    spheres.instanceMatrix.needsUpdate = true;
    spheres.instanceColor.needsUpdate = true;
    glowAttr.needsUpdate = true;

    // --- rollers
    const rollAngle = flowX / rollEff;
    for (let i = 0; i < rollerCount; i++) {
      mtx.makeRotationX(rollAngle + i * 0.4);
      mtx.setPosition(0, lay.trackY - rollR, lay.rollers[0] + i * rollerPitch);
      rollers.setMatrixAt(i, mtx);
    }
    rollers.instanceMatrix.needsUpdate = true;

    // --- gate fins hug each sphere, snap shut between them
    {
      const dz = Math.abs(tl.rowPhase(lay.gate, t));
      const m = Math.min(dz, S.rowSpacing - dz);
      const cl = m < r + 0.03 ? Math.sqrt(Math.max(0, r * r - Math.max(0, m - 0.03) ** 2)) : 0;
      let inner = Math.min(0.24, Math.max(0.075, cl + 0.015));
      inner = 0.24 + (inner - 0.24) * act;
      for (let lane = 0; lane < lanes; lane++) {
        const cx = tl.laneX(lane, lay.gate);
        for (const [k, side] of [[0, -1], [1, 1]]) {
          mtx.makeTranslation(cx + side * (inner + 0.06), lay.baseY, lay.gate);
          fins.setMatrixAt(lane * 2 + k, mtx);
        }
      }
      fins.instanceMatrix.needsUpdate = true;
      accentColor(lay.gate, t, 2.2, gateLed.material.color);
    }

    // --- pistons stamp each sphere in sync (two rows, half a beat apart)
    lay.pistons.forEach((ps, p) => {
      const dz = tl.rowPhase(ps, t);
      const stamp = Math.exp(-((dz / 0.085) ** 2)) * act;
      const lift = 0.4 * (1 - stamp);
      const capH = (dist) => (dist < r ? Math.sqrt(r * r - dist * dist) : -1);
      const a = Math.max(0, Math.abs(dz) - headR);
      const b = Math.max(0, S.rowSpacing - Math.abs(dz) - headR);
      const yMin = lay.baseY + Math.max(capH(a), capH(b), 0) + 0.004;
      const yBottom = Math.max(lay.baseY + r + lift, yMin);
      const rodLen = Math.max(0.01, gantryY - (yBottom + headH));
      for (let lane = 0; lane < lanes; lane++) {
        const i = p * lanes + lane;
        const cx = tl.laneX(lane, ps);
        mtx.makeTranslation(cx, yBottom + headH / 2, ps);
        heads.setMatrixAt(i, mtx);
        mtx.makeScale(1, rodLen, 1).setPosition(cx, gantryY, ps);
        rods.setMatrixAt(i, mtx);
      }
      accentColor(ps, t, 2.2, pistonLeds[p].material.color);
    });
    heads.instanceMatrix.needsUpdate = true;
    rods.instanceMatrix.needsUpdate = true;

    // --- LED strips
    for (let i = 0; i < ledS.length; i++) leds.setColorAt(i, accentColor(ledS[i], t, 1.6, tmpCol));
    leds.instanceColor.needsUpdate = true;

    // --- scanner
    tl.scanner(t, scanState);
    const sc = scanRingMat.color.copy(COL.led).multiplyScalar(1.8 + 1.4 * scanState.focus);
    sc.lerp(tmpCol.copy(COL.warn).multiplyScalar(3.2), scanState.warn);
    sc.lerp(tmpCol.copy(COL.orange).multiplyScalar(3.0), scanState.accept);
    addScaled(sc, COL.orange, scanState.flash * 4);
    laserMat.color.copy(sc).multiplyScalar(1.3);
    discMat.color.copy(sc).multiplyScalar(0.05 + 0.08 * scanState.focus + 0.1 * scanState.flash);
    lampMat.color.copy(COL.warn).multiplyScalar(0.25 + 4 * scanState.warn);
    scanLight.color.copy(sc).multiplyScalar(1 / Math.max(sc.r, sc.g, sc.b, 1e-3));
    scanLight.intensity = 2.5 + 3 * scanState.focus + 5 * scanState.warn + 10 * scanState.flash;
    {
      const h = (0.5 + 0.5 * scanState.laser) * (R - 0.45);
      const half = Math.sqrt(Math.max(0, (R - 0.2) ** 2 - h * h));
      laser.position.set(0, scanY + h, lay.scanS);
      laser.scale.set(half * 2, 1 + scanState.focus, 1 + scanState.focus);
    }
    if (scanState.shock >= 0) {
      const u = scanState.shock;
      shock.visible = true;
      shock.scale.setScalar(0.3 + u * (R + 0.6));
      shockMat.color.copy(COL.orange).multiplyScalar(4 * (1 - u) * (1 - u));
    } else shock.visible = false;

    // --- pulse wave front travelling backward through the machine
    const wf = tl.waveFront(t);
    if (wf !== null) {
      wave.visible = true;
      wave.position.set(0, tl.laneY(wf) + 0.1, wf);
      waveMat.color.copy(COL.orange).multiplyScalar(2.2);
      waveLight.visible = true;
      waveLight.position.set(0, tl.laneY(wf) + 0.6, wf);
      waveLight.intensity = 8;
    } else {
      wave.visible = false;
      waveLight.visible = false;
      waveLight.intensity = 0;
    }

    // --- portals
    const pin = tl.portalIn(t);
    portalIn.group.visible = pin > 0.001;
    portalIn.group.scale.setScalar(Math.max(pin, 1e-3));
    portalIn.disc.rotation.z = (-TAU * 6 * t) / L;
    const pout = tl.portalOut(t);
    portalOut.group.visible = pout > 0.001;
    portalOut.group.scale.setScalar(Math.max(pout, 1e-3));
    portalOut.disc.rotation.z = (TAU * 6 * t) / L;

    // --- hero
    tl.hero(t, heroState);
    hero.visible = heroState.visible;
    hero.position.set(heroState.x, heroState.y, heroState.z);
    hero.scale.setScalar(heroState.scale);
    clipPlane.constant = -heroState.clipZ;
    heroMat.color.copy(COL.blue).lerp(COL.orange, heroState.orange);
    heroMat.emissive.copy(heroMat.color);
    heroMat.emissiveIntensity = heroState.glow;
    heroLight.visible = heroState.visible;
    heroLight.position.copy(hero.position);
    heroLight.position.y += 0.25;
    heroLight.color.copy(heroMat.color);
    heroLight.intensity = heroState.visible
      ? (0.5 + 1.4 * heroState.glow) * heroState.orange + 0.8 * heroState.glow * (1 - heroState.orange)
      : 0;

    // Shockwave ring on the conveyor when the hero ignites.
    {
      const e = t - C.timeline.intro;
      if (e >= 0 && e < 0.7) {
        const u = e / 0.7;
        introRing.visible = true;
        introRing.position.set(heroState.x, lay.trackY + 0.01, heroState.z);
        introRing.scale.setScalar(0.25 + 1.1 * u);
        introRing.material.opacity = (1 - u) * (1 - u);
      } else introRing.visible = false;
    }

    // --- camera
    tl.camera(t, camState);
    const cp = Math.cos(camState.pitch);
    camera.position.set(
      camState.x + camState.dist * Math.sin(camState.yaw) * cp,
      camState.y + camState.dist * Math.sin(camState.pitch),
      camState.z + camState.dist * Math.cos(camState.yaw) * cp,
    );
    camera.lookAt(camState.x, camState.y, camState.z);
  }

  function dispose() {
    for (const o of owned) o.dispose();
    owned.length = 0;
    // InstancedMesh owns GPU buffers for its instance attributes.
    scene.traverse((o) => {
      if (o.isInstancedMesh) o.dispose();
    });
    scene.clear();
    scene.environment = null;
  }

  return { scene, camera, update, dispose, timeline: tl, sphereCount: count };
}
