#!/usr/bin/env bash
# Renders and encodes both masters. Frames go to $FRAMES (default ./frames, gitignored).
set -euo pipefail
cd "$(dirname "$0")"
export PLAYWRIGHT_MODULE="${PLAYWRIGHT_MODULE:-$(npm root -g)/playwright}"
FRAMES="${FRAMES:-frames}"
WORKERS="${WORKERS:-4}"
mkdir -p out
node loopcheck.mjs
for L in h v; do
  node render.mjs "$L" "$FRAMES/$L" 360 2 "$WORKERS"
  [ "$L" = h ] && NAME=fintech-glass-data-hero_3840x2160_30fps || NAME=fintech-glass-data-hero_vertical_2160x3840_30fps
  # Master: H.264 High, near-lossless, BT.709, no audio, faststart.
  ffmpeg -y -loglevel error -framerate 30 -i "$FRAMES/$L/f%04d.png" \
    -c:v libx264 -preset slow -crf 14 -tune film -profile:v high -level 5.2 \
    -pix_fmt yuv420p -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv \
    -vf "scale=out_color_matrix=bt709:out_range=tv" -an -movflags +faststart "out/$NAME.mp4"
  # Lightweight 1080p preview for quick review / web use.
  ffmpeg -y -loglevel error -i "out/$NAME.mp4" -vf "scale=iw/2:ih/2:flags=lanczos" \
    -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -an -movflags +faststart "out/${NAME/3840x2160/1920x1080}_preview.mp4"
done
ls -la out
