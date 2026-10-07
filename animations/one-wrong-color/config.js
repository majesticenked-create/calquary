/**
 * One Wrong Color: production parameters.
 *
 * Everything the animation does is a pure function of the loop time `t`
 * (0 <= t < loop.duration), so every loop is frame-identical. Change values
 * here; the layout, flow speed solve and camera path re-derive themselves.
 */
export const CONFIG = {
  output: {
    width: 1080, // final render size (9:16)
    height: 1920,
    fps: 60,
  },

  loop: {
    duration: 12.0, // seconds, 10-12 recommended
  },

  colors: {
    background: 0x0b0c0f,
    floor: 0x141619,
    machine: 0x2a2e35, // painted body panels
    machineDark: 0x17191d, // base plate, recesses
    metal: 0xa4abb5, // brushed accents, rods, rollers
    blue: 0x0f4fff, // the crowd
    orange: 0xff7414, // the odd one out
    ledIdle: 0x5aa8ff, // machine accent lights at rest
    warning: 0xff1a1a, // "reject?" suspense colour
    glass: 0xd6ebff, // transparent tubes
  },

  spheres: {
    lanes: 9, // columns of spheres (odd keeps the hero lane centred)
    minRows: 34, // rows on the circulating track (auto-raised if the layout needs more)
    radius: 0.17,
    laneSpacing: 0.46,
    rowSpacing: 0.6,
    widthSegments: 32,
    heightSegments: 20,
  },

  speed: {
    base: 2.2, // world units / second of the flow
    suspense: 0.3, // flow multiplier while the scanner inspects the hero
    release: 0.35, // extra "release" surge after the pulse (multiplier peak above base)
  },

  // Key moments (seconds into the loop). Must be increasing as listed.
  timeline: {
    intro: 2.0, // blue hero ignites orange
    slowdownStart: 5.4, // flow starts braking: suspense
    scanArrive: 6.8, // hero centred in the circular scanner
    liftEnd: 7.15, // hero levitated inside the scanner ring
    pulse: 7.35, // scanner accepts: orange pulse fires backward
    waveDuration: 0.8, // time for the pulse to reach the feeder
    rushStart: 7.6, // flow recovers (plus release surge)
    portalInStart: 7.95, // hero glides back into the entry portal
    portalInEnd: 8.45,
    rushEnd: 10.8, // flow back to exactly base speed
    portalOutOpen: 10.95, // exit portal opens at the start position
    emergeStart: 11.25, // hero emerges blue, lands in its slot at t = duration
  },

  layout: {
    heroStart: 0.9, // track coordinate of the hero at frame 0
    trackY: 0.45, // height of the conveyor surface
    // Converted (orange) spheres must be past this track coordinate when the
    // loop wraps, so the colour reset happens off camera.
    flushClearance: 7.0,
    // Station placement as fractions between the intro point and the scanner.
    rollers: [0.13, 0.31],
    gate: 0.4,
    pistons: 0.51,
    tubes: [0.62, 0.86],
  },

  camera: {
    fov: 36,
    near: 0.1,
    far: 80,
  },

  render: {
    exposure: 0.95,
    environmentIntensity: 0.4,
    shadowMapSize: 2048,
    msaaSamples: 4,
    bloom: { strength: 0.4, radius: 0.4, threshold: 0.92 },
    previewMaxPixelRatio: 2, // cap for on-screen preview
  },
};
