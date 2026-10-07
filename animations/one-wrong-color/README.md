# One Wrong Color

A vertical (1080×1920, 9:16), 12-second, seamlessly looping Three.js animation.
Hundreds of glossy blue spheres flow in rows through a sorting machine. At 2 s one
sphere ignites orange and travels through the **rollers → narrow gates →
synchronized pistons → curved glass tubes → circular scanner**. The scanner
flashes a red warning, then accepts the sphere and fires an orange pulse backward
through the machine, turning every sphere orange in a chain reaction. The hero
dives into a portal and comes out of a second portal as a blue sphere, landing
on the exact frame-0 position.

There is no narration, no captions and no logo.

## Run

The files are plain ES modules. Three.js r170 loads through an import map from
jsDelivr, so there is nothing to build. Serve the folder with any static server:

```bash
npx serve animations/one-wrong-color      # then open the printed URL
```

| URL | Purpose |
|---|---|
| `index.html` | Real-time preview that loops forever, sized to the window at a 9:16 aspect ratio. |
| `index.html?t=7.4` | Freezes on one loop time, for look development. |
| `index.html?capture` | Fixed 1080×1920 canvas with `window.OWC.renderFrame(i)` for frame-exact capture. |

## Export the video

```bash
cd animations/one-wrong-color
npm i --no-save playwright                 # once
node capture.mjs --out one-wrong-color.mp4 # H.264, 60 fps, 720 frames
node capture.mjs --gpu --out loop.mp4      # use the hardware GPU (much faster)
node capture.mjs --stills 2,7.35,9 --out shot.png   # PNG stills at given seconds
```

Each frame renders at `t = i / 60` and does not depend on wall-clock time, so
every export is identical. Frame 719 flows directly into frame 0, so the MP4
loops perfectly on a social platform's repeat.

`node verify-loop.mjs` checks the seam without a browser. It confirms that the
flow, hero, camera, scanner and portals match at `t → L` and `t = 0`, and that
every orange sphere is off camera when the loop resets.

## Parameters (`config.js`)

| Group | Key | What it controls |
|---|---|---|
| `colors` | `blue`, `orange`, `warning`, `ledIdle`, `machine`, `background`, … | Every colour in the piece. |
| `spheres` | `lanes`, `minRows`, `radius`, `laneSpacing`, `rowSpacing` | Number of spheres (`lanes × rows`; rows are raised automatically when the loop needs more track) and their geometry. |
| `speed` | `base`, `suspense`, `release` | Flow speed, the slow-down before the scanner, and the surge after the pulse. |
| `loop` | `duration` | Loop length in seconds. |
| `timeline` | `intro`, `scanArrive`, `pulse`, `waveDuration`, … | When each story beat happens. |
| `layout` | `heroStart`, `rollers`, `gate`, `pistons`, `tubes`, `flushClearance` | Where the stations sit, as fractions of the hero's path. |
| `camera`, `render` | `fov`, `exposure`, `bloom`, `shadowMapSize`, `msaaSamples` | Look and quality. |

Station positions, the number of rows on the track and the surge strength are
all derived from these values. The solver in `timeline.js` keeps the total flow
over one loop at exactly a whole number of rows, so the loop stays seamless
after any edit. Run `node verify-loop.mjs` after changing parameters.

## How it's built

- **`timeline.js`**: pure math with no Three.js, clocks or randomness. It
  integrates the flow speed into a displacement table and lays out the machine
  from it. It also defines the hero path, the pulse wave, the scanner states,
  the portals and a periodic camera spline.
- **`scene.js`**: builds every mesh once. The spheres, rollers, fins, pistons
  and LEDs are `InstancedMesh`es. A per-instance emissive attribute drives the
  chain-reaction flash. Portal entry and exit use a clipping plane on the hero.
  `update(t)` only writes into existing buffers, so the frame loop allocates
  nothing.
- **`main.js`**: renderer, shadows, Neutral tone mapping (it keeps the blue
  from drifting toward purple) and bloom through an MSAA HalfFloat composer.
  `dispose()` runs on `pagehide`. It frees every geometry, material, texture
  and render target and the environment map, then releases the WebGL context.

Two details keep the loop invisible:

1. Each sphere's colour depends on where it was when the pulse fired. By the
   end of the loop, the post-pulse release surge has carried every converted
   sphere downstream, past the camera's view. Only fresh blue spheres are on
   screen when the colours reset.
2. The centre lane keeps two empty slots: the hero's slot for this loop and the
   one it lands in for the next. Both stay on hidden track except when the hero
   occupies them. The track is sized automatically to guarantee this.
