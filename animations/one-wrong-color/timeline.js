/**
 * Deterministic timeline: pure functions of loop time t (no Three.js, no clocks,
 * no randomness). The scene samples these every frame; Node can import this
 * file to verify loop continuity.
 *
 * Track coordinate `s` runs along the conveyor in the flow direction and maps
 * directly to world z (flow moves toward the camera, +z).
 */

const TAU = Math.PI * 2;

export const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
export const smoothstep = (e0, e1, x) => {
  const u = clamp01((x - e0) / (e1 - e0));
  return u * u * (3 - 2 * u);
};
export const lerp = (a, b, u) => a + (b - a) * u;
/** Positive modulo. */
export const mod = (a, n) => ((a % n) + n) % n;
/** Wrap into [-n/2, n/2). */
export const wrapHalf = (a, n) => mod(a + n / 2, n) - n / 2;

/** Cubic Hermite for one component; v0/v1 are velocities (units per second). */
function hermite(p0, v0, p1, v1, u, dur) {
  const u2 = u * u;
  const u3 = u2 * u;
  return (
    (2 * u3 - 3 * u2 + 1) * p0 +
    (u3 - 2 * u2 + u) * v0 * dur +
    (-2 * u3 + 3 * u2) * p1 +
    (u3 - u2) * v1 * dur
  );
}

export function createTimeline(C) {
  const L = C.loop.duration;
  const T = C.timeline;
  const order = [
    'intro', 'slowdownStart', 'scanArrive', 'liftEnd', 'pulse',
    'portalInStart', 'portalInEnd', 'portalOutOpen', 'emergeStart',
  ];
  for (let i = 1; i < order.length; i++) {
    if (!(T[order[i]] > T[order[i - 1]])) {
      throw new Error(`timeline.${order[i]} must be after timeline.${order[i - 1]}`);
    }
  }
  if (!(T.rushStart >= T.scanArrive && T.rushEnd > T.rushStart && T.rushEnd < T.emergeStart)) {
    throw new Error('timeline: need scanArrive <= rushStart < rushEnd < emergeStart');
  }
  if (!(T.emergeStart < L - 0.3)) throw new Error('timeline.emergeStart too close to loop end');

  const v0 = C.speed.base;
  const slow = C.speed.suspense;
  const r = C.spheres.radius;
  const d = C.spheres.rowSpacing;
  const lanes = C.spheres.lanes;
  const centerLane = (lanes - 1) / 2;
  if (!Number.isInteger(centerLane)) throw new Error('spheres.lanes must be odd');
  const s0 = C.layout.heroStart;
  const trackY = C.layout.trackY;
  const baseY = trackY + r;

  // ---------------------------------------------------------------- flow
  // Speed multiplier: constant -> brake for suspense -> recover with a
  // release surge -> exactly base speed again before the loop seam.
  const rushLen = T.rushEnd - T.rushStart;
  const shape = (t, A) => {
    if (t < T.rushStart) return 1 - (1 - slow) * smoothstep(T.slowdownStart, T.scanArrive, t);
    if (t < T.rushEnd) {
      const u = (t - T.rushStart) / rushLen;
      const sn = Math.sin(Math.PI * u);
      return slow + (1 - slow) * smoothstep(0, 1, u) + A * sn * sn;
    }
    return 1;
  };

  const N = Math.round(L * 1000);
  const dt = L / N;
  const table = new Float64Array(N + 1);
  const integrate = (A) => {
    table[0] = 0;
    for (let i = 0; i < N; i++) {
      const a = i * dt;
      table[i + 1] = table[i] + (v0 * dt * (shape(a, A) + 4 * shape(a + dt / 2, A) + shape(a + dt, A))) / 6;
    }
  };
  const X = (t) => {
    const f = clamp01(t / L) * N;
    const i = Math.min(N - 1, Math.floor(f));
    return table[i] + (table[i + 1] - table[i]) * (f - i);
  };

  // Static zones that don't depend on the speed solve.
  const riseStart = -1.4; // spheres surface from the feeder slot here
  const riseEnd = -0.3;
  const waveEndS = riseStart; // the pulse travels all the way to the feeder

  // Solve the surge amplitude A so total flow displacement over the loop is
  // an exact whole number of rows (seamless loop), with at least the
  // configured surge and enough travel to carry every converted sphere past
  // flushClearance before the seam.
  integrate(0);
  const X0 = table[N];
  const perA = (v0 * rushLen) / 2; // integral of A*sin^2 over the rush window
  let k = Math.ceil((X0 + C.speed.release * perA) / d - 1e-9);
  let A = 0;
  for (let guard = 0; guard < 500; guard++, k++) {
    A = (k * d - X0) / perA;
    integrate(A);
    const scale = (k * d) / table[N]; // kill quadrature error: X(L) is exact
    for (let i = 0; i <= N; i++) table[i] *= scale;
    const flushed = waveEndS + table[N] - X(T.pulse) >= C.layout.flushClearance + r;
    if (flushed) break;
  }
  const XL = table[N];
  const rowsPerLoop = k;

  // ---------------------------------------------------------------- layout
  const scanS = s0 + X(T.scanArrive);
  const introS = s0 + X(T.intro);
  const span = scanS - introS;
  const at = (f) => introS + f * span;
  const lay = C.layout;
  const layout = {
    s0,
    trackY,
    baseY,
    riseStart,
    riseEnd,
    scanS,
    introS,
    sinkStart: scanS + 0.85,
    sinkEnd: scanS + 1.85,
    rollers: [at(lay.rollers[0]), at(lay.rollers[1])],
    gate: at(lay.gate),
    pistons: [at(lay.pistons), at(lay.pistons) + 1.5 * d],
    tubes: [at(lay.tubes[0]), at(lay.tubes[1])],
    archHeight: 0.72,
    archLateral: 0.34,
    portalInS: scanS - 0.55,
    heroLiftY: baseY + 0.55,
    exitLiftY: baseY + 0.5,
    scannerRadius: (lanes * C.spheres.laneSpacing) / 2 + 0.55,
  };
  layout.trackStart = layout.riseStart - 0.9;
  layout.trackEnd = layout.sinkEnd + 0.9;

  // Circulating track: S_START is grid-aligned with the hero slot. Its length
  // is long enough that the two empty "hero slots" (this loop's and the
  // next's) only ever travel through hidden track.
  const backRows = Math.ceil((s0 - (riseStart - 0.5)) / d);
  const sStart = s0 - backRows * d;
  const needLen = Math.max(
    layout.sinkEnd + 0.6 - sStart,
    XL + layout.sinkEnd - s0 + d,
    XL + s0 - riseStart + d,
  );
  const rows = Math.max(C.spheres.minRows, Math.ceil(needLen / d));
  const trackLen = rows * d;
  layout.sStart = sStart;
  layout.rows = rows;
  layout.trackLen = trackLen;

  // ---------------------------------------------------------------- lanes
  const laneOffset = (s) => {
    const [a, b] = layout.tubes;
    if (s <= a || s >= b) return 0;
    const u = (s - a) / (b - a);
    return layout.archLateral * Math.sin(TAU * u) * Math.sin(Math.PI * u);
  };
  const laneX = (lane, s) => (lane - centerLane) * C.spheres.laneSpacing + laneOffset(s);
  const hiddenDrop = 2 * r + 0.08;
  const laneY = (s) => {
    let y = baseY;
    const [a, b] = layout.tubes;
    if (s > a && s < b) {
      const sn = Math.sin((Math.PI * (s - a)) / (b - a));
      y += layout.archHeight * sn * sn;
    }
    if (s < riseEnd) y -= hiddenDrop * (1 - smoothstep(riseStart, riseEnd, s));
    if (s > layout.sinkStart) y -= hiddenDrop * smoothstep(layout.sinkStart, layout.sinkEnd, s);
    return y;
  };
  const isHidden = (s) => s <= riseStart || s >= layout.sinkEnd;

  /** Track position of instance row `row` at time t. */
  const rowS = (row, t) => sStart + mod(row * d + X(t), trackLen);
  /** Offset of the nearest sphere row to station position sStation, in [-d/2, d/2). */
  const rowPhase = (sStation, t) => wrapHalf(s0 + X(t) - sStation, d);

  // Hero slots: A carries the hero this loop, B is the slot that becomes A at
  // the seam. Both are kept empty in the centre lane.
  const isHeroSlot = (s, t) => {
    const a = mod(s - (s0 + X(t)) + d / 2, trackLen);
    const b = mod(s - (s0 + X(t) - XL) + d / 2, trackLen);
    return a < d || b < d;
  };

  // ---------------------------------------------------------------- pulse wave
  const waveDur = T.waveDuration;
  const waveSpeed = (scanS - waveEndS) / waveDur;
  const Xpulse = X(T.pulse);
  const waveFront = (t) => (t < T.pulse || t > T.pulse + waveDur ? null : scanS - waveSpeed * (t - T.pulse));
  /**
   * Conversion state of a sphere row at time t.
   * Returns -1 if not converted, otherwise seconds since it turned orange.
   */
  const conversionAge = (row, t) => {
    if (t < T.pulse) return -1;
    const sp = sStart + mod(row * d + Xpulse, trackLen); // where it was when the pulse fired
    if (sp < waveEndS || sp > layout.sinkEnd) return -1;
    if (sp - sStart + (X(t) - Xpulse) >= trackLen) return -1; // wrapped back into the feeder
    const tc = T.pulse + Math.abs(scanS - sp) / waveSpeed;
    return t >= tc ? t - tc : -1;
  };
  /** 0..1 orange amount of the machine accent light at track position s. */
  const accentOrange = (s, t) => {
    if (t < T.pulse) return 0;
    const tc = T.pulse + Math.abs(scanS - s) / waveSpeed;
    if (t < tc) return 0;
    const bandTop = waveEndS + X(t) - Xpulse; // last converted sphere's position
    return smoothstep(bandTop - 0.4, bandTop + 0.4, s);
  };
  /** Bright flash on the accent light right as the wave passes. */
  const accentFlash = (s, t) => {
    if (t < T.pulse) return 0;
    const tc = T.pulse + Math.abs(scanS - s) / waveSpeed;
    return t < tc ? 0 : Math.exp(-(t - tc) * 5);
  };

  /** 1 = stations working normally, 0 = opened up for the release surge. */
  const activity = (t) =>
    1 - smoothstep(T.rushStart, T.rushStart + 0.5, t) * (1 - smoothstep(T.rushEnd - 0.7, T.rushEnd, t));

  // ---------------------------------------------------------------- scanner
  const warnStart = T.scanArrive - 0.45;
  const scanner = (t, out) => {
    let warn = 0;
    if (t >= warnStart && t < T.pulse) {
      const u = (t - warnStart) / (T.pulse - warnStart);
      const sn = Math.sin(Math.PI * u * 3);
      warn = sn * sn;
    }
    out.warn = warn;
    out.accept = t >= T.pulse ? Math.exp(-(t - T.pulse) * 0.9) * (1 - smoothstep(T.rushEnd - 0.5, T.rushEnd + 0.5, t)) : 0;
    out.flash = t >= T.pulse ? Math.exp(-(t - T.pulse) * 6) : 0;
    out.shock = t >= T.pulse && t < T.pulse + 0.9 ? (t - T.pulse) / 0.9 : -1;
    // Laser sweep: whole number of sweeps per loop.
    out.laser = Math.sin((TAU * 7 * t) / L);
    // Focus: brighter beam while the hero is inside.
    out.focus = smoothstep(T.scanArrive - 0.6, T.scanArrive, t) * (1 - smoothstep(T.pulse, T.pulse + 0.4, t));
    return out;
  };

  // ---------------------------------------------------------------- portals
  const portalIn = (t) =>
    smoothstep(T.portalInStart - 0.35, T.portalInStart, t) * (1 - smoothstep(T.portalInEnd + 0.05, T.portalInEnd + 0.4, t));
  const emergeOut = T.emergeStart + (2 * r + 0.03) / v0; // hero fully out of the exit portal
  const portalOutS = s0 + X(T.emergeStart) - XL + r + 0.015;
  const portalOut = (t) =>
    smoothstep(T.portalOutOpen, T.portalOutOpen + 0.25, t) * (1 - smoothstep(emergeOut + 0.05, L - 0.02, t));
  layout.portalOutS = portalOutS;

  // ---------------------------------------------------------------- hero
  const pScanY = baseY;
  const vSlow = v0 * slow;
  const goneZ = layout.portalInS - 2 * r - 0.06;
  const NO_CLIP = -1e4;

  /** Fills `out` with the hero's state at time t. */
  const hero = (t, out) => {
    out.visible = true;
    out.clipZ = NO_CLIP; // keep only z > clipZ
    out.scale = 1;
    out.orange = 0;
    out.glow = 0;

    if (t < T.scanArrive) {
      const s = s0 + X(t);
      out.x = laneX(centerLane, s);
      out.y = laneY(s);
      out.z = s;
      if (t >= T.intro) {
        const e = t - T.intro;
        out.orange = smoothstep(0, 0.12, e);
        out.glow = 0.3 + 1.8 * Math.exp(-e * 6);
      }
      const u = (t - (T.intro - 0.08)) / 0.55;
      if (u > 0 && u < 1) {
        const sn = Math.sin(Math.PI * u);
        out.y += 0.3 * sn;
        out.scale = 1 + 0.12 * sn * sn;
      }
      // Suspense: hero brightens as it nears the scanner.
      out.glow += 0.5 * smoothstep(T.slowdownStart, T.scanArrive, t);
      return out;
    }

    out.orange = 1;
    out.x = 0;
    if (t < T.liftEnd) {
      const dur = T.liftEnd - T.scanArrive;
      const u = (t - T.scanArrive) / dur;
      out.y = hermite(pScanY, 0, layout.heroLiftY, 0, u, dur);
      out.z = hermite(scanS, vSlow, scanS, 0, u, dur);
      out.glow = 0.72;
      return out;
    }
    const pulseGlow = t >= T.pulse ? 2.2 * Math.exp(-(t - T.pulse) * 3) : 0;
    if (t < T.portalInStart) {
      const u = (t - T.liftEnd) / (T.portalInStart - T.liftEnd);
      out.y = layout.heroLiftY + 0.04 * Math.sin(TAU * u) * Math.sin(Math.PI * u);
      out.z = scanS;
      out.glow = 0.72 + pulseGlow;
      return out;
    }
    if (t < T.portalInEnd) {
      const dur = T.portalInEnd - T.portalInStart;
      const u = (t - T.portalInStart) / dur;
      out.y = layout.heroLiftY;
      out.z = hermite(scanS, 0, goneZ, -2.6, u, dur);
      out.clipZ = layout.portalInS;
      out.glow = 0.72 + pulseGlow + 1.2 * u;
      out.scale = 1 - 0.15 * u;
      return out;
    }
    if (t < T.emergeStart) {
      out.visible = false;
      out.x = 0;
      out.y = layout.exitLiftY;
      out.z = portalOutS;
      return out;
    }
    // Emerge blue from the exit portal and settle into slot B, which sits at
    // exactly the frame-0 position when t reaches L.
    const s = s0 + X(t) - XL;
    out.orange = 0;
    out.x = laneX(centerLane, s);
    out.z = s;
    const h = layout.exitLiftY - baseY;
    out.y = baseY + h * (1 - smoothstep(emergeOut, L, t));
    out.clipZ = portalOutS;
    out.glow = 1.6 * Math.exp(-(t - T.emergeStart) * 4) * (1 - smoothstep(emergeOut, L, t));
    return out;
  };

  // ---------------------------------------------------------------- camera
  // Periodic keyframes (Catmull-Rom tangents on non-uniform times).
  const heroS = (t) => s0 + X(t);
  const deg = Math.PI / 180;
  const ty = baseY + 0.15;
  const keys = [
    { t: 0.0, z: heroS(0) + 1.7, dist: 7.4, pitch: 50, yaw: -7 },
    { t: 2.0, z: heroS(2.0) + 1.25, dist: 7.0, pitch: 48, yaw: -3 },
    { t: 3.7, z: heroS(3.7) + 1.0, dist: 7.2, pitch: 50, yaw: 3 },
    { t: 5.3, z: heroS(5.3) + 0.6, dist: 7.6, pitch: 48, yaw: 6 },
    { t: 6.7, z: scanS - 0.5, dist: 8.0, pitch: 38, yaw: 3 },
    { t: 7.4, z: scanS - 0.9, dist: 8.5, pitch: 40, yaw: 0 },
    { t: 8.5, z: scanS - 3.6, dist: 12.6, pitch: 51, yaw: -4 },
    { t: 9.8, z: (scanS + s0) / 2 - 1.0, dist: 12.0, pitch: 54, yaw: -7 },
    { t: 11.0, z: s0 + 1.4, dist: 8.2, pitch: 51, yaw: -8 },
  ].map((k) => ({ ...k, pitch: k.pitch * deg, yaw: k.yaw * deg }));
  const fields = ['z', 'dist', 'pitch', 'yaw'];
  const nk = keys.length;
  const keyAt = (i) => {
    const w = Math.floor(i / nk);
    const k = keys[mod(i, nk)];
    return { k, t: k.t + w * L };
  };
  const camera = (t, out) => {
    let i = 0;
    while (i < nk - 1 && t >= keys[i + 1].t) i++;
    const a = keyAt(i), b = keyAt(i + 1), p = keyAt(i - 1), n = keyAt(i + 2);
    const dur = b.t - a.t;
    const u = (t - a.t) / dur;
    for (const f of fields) {
      const ma = (b.k[f] - p.k[f]) / (b.t - p.t);
      const mb = (n.k[f] - a.k[f]) / (n.t - a.t);
      out[f] = hermite(a.k[f], ma, b.k[f], mb, u, dur);
    }
    out.x = 0;
    out.y = ty;
    return out;
  };

  return {
    L,
    X,
    XL,
    rowsPerLoop,
    surge: A,
    layout,
    laneX,
    laneY,
    isHidden,
    rowS,
    rowPhase,
    isHeroSlot,
    centerLane,
    waveFront,
    conversionAge,
    accentOrange,
    accentFlash,
    activity,
    scanner,
    portalIn,
    portalOut,
    hero,
    camera,
    speed: (t) => (X(Math.min(L, t + 0.0005)) - X(Math.max(0, t - 0.0005))) / 0.001,
  };
}
