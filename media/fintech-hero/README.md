# Fintech Glass Data — Hero Stock Footage

A procedurally generated, loopable fintech background clip with a dark glass interface, made for stock marketplaces such as Adobe Stock.

## Deliverables (`out/`)

| File | Resolution | Use |
|---|---|---|
| `fintech-glass-data-hero_3840x2160_30fps.mp4` | 3840×2160, 16:9 | Horizontal master |
| `fintech-glass-data-hero_vertical_2160x3840_30fps.mp4` | 2160×3840, 9:16 | Vertical master, laid out separately for vertical (not a crop) |
| `*_preview.mp4` | Half resolution | Quick review or web embeds |

- 30 fps, 12.0 s (360 frames). H.264 High, CRF 14, BT.709, yuv420p, no audio track.
- **Seamless loop:** every animated value is a periodic function of the loop phase. `loopcheck.mjs` checks that frame 360 matches frame 0 pixel for pixel, and the build runs it first. Only the film grain is not part of this check.
- **No text, numbers, logos or trademarks.** Labels are abstract rounded bars. The "%" and "▲" indicators are drawn from circles, lines and triangles, not font glyphs. No fonts are loaded at all.

## Composition

- **Horizontal:** the left and center-left area is kept empty for copy and has a soft left-side shade for contrast. The glass panels sit on the right, and the dotted globe, network and particles fill the right and lower part of the frame.
- **Vertical:** the top ~50% is kept empty for headline and CTA. The panel stack sits in the lower half, the globe horizon is at the bottom, and a distant blurred panel at the top right balances the frame.

## Scene elements

- Glass panels with backdrop blur, tint, a moving soft reflection, a specular top edge, a gradient metallic border and drop shadow.
- Depth of field: the far panels are softly blurred, and the near foreground panel is heavily blurred and out of focus.
- Line chart with area fill and glow, a dashed champagne comparison line, a slow crosshair with a chip, and a pulsing live point.
- Bar chart with a moving highlight cursor, a ring/percentage indicator, a far multi-line panel and a list card.
- Floating data nodes in two depth layers. Thin connections fade in and out, transaction pulses travel along the links, and key nodes pulse.
- Dotted globe with great-circle "global transaction" arcs. It rotates by exactly one grid step per loop.
- Particle stream moving slowly toward the camera (the cinematic push), plus bokeh, a light beam, a vignette and fine grain to prevent gradient banding.

## Rebuild

```bash
./build.sh            # renders both layouts at 4K and encodes to out/
# live preview in a browser: open scene.html?layout=h  (or ?layout=v)
```

Requires Node with Playwright (Chromium) and ffmpeg. The render is deterministic, so a rebuild gives identical frames.

## Suggested stock metadata

**Title:** Elegant fintech data visualization on dark glass interface, seamless loop background

**Keywords:** fintech, finance, financial technology, data visualization, glassmorphism, glass interface, dashboard, analytics, investment, banking, digital banking, stock market abstract, chart, graph, line graph, growth, network, data network, global finance, globe, connections, transactions, technology background, hero background, website background, saas, business, abstract, futuristic, dark, navy, blue, copy space, loop, seamless loop, 4k, motion graphics, ui, interface, data, big data, ai analytics

**Category:** Technology (or Business). Generated procedurally. It contains no people, property, logos or real data, so no releases are needed. Mark it as generative or procedural per the marketplace's AI/CG disclosure rules where they apply.
