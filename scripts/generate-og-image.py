#!/usr/bin/env python3
"""
Generates one 1200x630 Open Graph preview image from a JSON spec (drawn
directly with Pillow, not rasterized from SVG/HTML). Invoked per-page from
build.js via subprocess — same "system-font substitution" approach used for
the site favicon, since the actual Inter webfont is only loaded at runtime
via Google Fonts CDN and isn't bundled as a local file this Node build
script could hand to a renderer. SFNS.ttf (San Francisco, the macOS system
sans) stands in for Inter here — same grotesque-sans family, and its
variable-font axis gives real Bold/Heavy/Black weights instead of faking
bold with a fixed-weight face.

Category badges are drawn as icon-only mint squares using the same simple
line/circle primitives as the site's actual category icon SVGs (see the
`icon` field on each CATEGORIES entry in js/calculators-data.js) — no
letter-code text, matching the rebrand's icon-only badge treatment.

Usage: python3 generate-og-image.py <batch.json>
batch.json is a JSON array of specs, each processed and saved in this one
process (avoids paying Python/Pillow startup cost per image — matters once
this is generating 85+ images every build).
Spec fields:
  kind: "tool" | "category" | "site"
  output: absolute output path
  categoryId, categoryName: str
  title: str
  primaryLabel, primaryValue: str (tool only)
  toolCount: int (category only)
  tagline: str (site only)
"""
import json
import sys
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
PAPER = (255, 255, 255)
PAPER_MINT = (234, 243, 236)
INK = (23, 23, 23)
MUTED = (95, 107, 114)
BRAND = (27, 122, 75)
LINE = (229, 231, 235)

SANS = "/System/Library/Fonts/SFNS.ttf"


def font(weight, size):
    f = ImageFont.truetype(SANS, size)
    try:
        f.set_variation_by_name(weight)
    except Exception:
        pass
    return f


def wrap_to_width(draw, text, f, max_width, max_lines=2):
    words = text.split()
    lines = []
    cur = ""
    for w in words:
        trial = (cur + " " + w).strip()
        if draw.textbbox((0, 0), trial, font=f)[2] <= max_width:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
        if len(lines) == max_lines - 1 and cur:
            pass
    if cur:
        lines.append(cur)
    lines = lines[:max_lines]
    if len(lines) == max_lines:
        last = lines[-1]
        while draw.textbbox((0, 0), last + "…", font=f)[2] > max_width and len(last) > 1:
            last = last[:-1]
        if last != lines[-1]:
            lines[-1] = last.rstrip() + "…"
    return lines


# Each category's icon redrawn with plain Pillow primitives (line/ellipse),
# mirroring the stroke paths in the CATEGORIES.icon SVG fragments exactly —
# kept as literal coordinates rather than an SVG-path parser since there are
# only 8 of them and every path is already just lines/polylines/circles.
def draw_icon(draw, cat_id, cx, cy, size, color, sw):
    scale = size / 24
    ox, oy = cx - size / 2, cy - size / 2

    def p(x, y):
        return (ox + x * scale, oy + y * scale)

    def circ(x, y, r):
        draw.ellipse([p(x - r, y - r), p(x + r, y + r)], outline=color, width=sw)

    if cat_id == "math":
        circ(7, 7, 2.5)
        circ(17, 17, 2.5)
        draw.line([p(18, 6), p(6, 18)], fill=color, width=sw)
    elif cat_id == "finance":
        draw.line([p(5, 19), p(5, 13)], fill=color, width=sw)
        draw.line([p(12, 19), p(12, 9)], fill=color, width=sw)
        draw.line([p(19, 19), p(19, 5)], fill=color, width=sw)
    elif cat_id == "construction":
        draw.line([p(4, 11.5), p(12, 5), p(20, 11.5)], fill=color, width=sw, joint="curve")
        draw.line([p(6, 10), p(6, 19), p(18, 19), p(18, 10)], fill=color, width=sw, joint="curve")
    elif cat_id == "health":
        pts = [p(3, 12), p(8, 12), p(10, 6), p(14, 18), p(16, 12), p(21, 12)]
        draw.line(pts, fill=color, width=sw, joint="curve")
    elif cat_id == "datetime":
        circ(12, 12, 8)
        draw.line([p(12, 12), p(12, 7)], fill=color, width=sw)
        draw.line([p(12, 12), p(16, 14)], fill=color, width=sw)
    elif cat_id == "conversions":
        draw.line([p(16, 3), p(20, 7), p(16, 11)], fill=color, width=sw, joint="curve")
        draw.line([p(20, 7), p(4, 7)], fill=color, width=sw)
        draw.line([p(8, 13), p(4, 17), p(8, 21)], fill=color, width=sw, joint="curve")
        draw.line([p(4, 17), p(20, 17)], fill=color, width=sw)
    elif cat_id == "text":
        draw.line([p(9, 4), p(15, 4)], fill=color, width=sw)
        draw.line([p(12, 4), p(12, 20)], fill=color, width=sw)
        draw.line([p(9, 20), p(15, 20)], fill=color, width=sw)
    elif cat_id == "pets":
        circ(12, 15.5, 4)
        for tx, ty in [(5.5, 9), (10, 4.5), (14, 4.5), (18.5, 9)]:
            circ(tx, ty, 2)


def draw_badge(draw, x, y, size, cat_id):
    radius = int(size * 0.24)
    draw.rounded_rectangle([x, y, x + size, y + size], radius=radius, fill=PAPER_MINT)
    icon_size = size * 0.52
    sw = max(3, int(size * 0.045))
    draw_icon(draw, cat_id, x + size / 2, y + size / 2, icon_size, BRAND, sw)


def draw_wordmark(img, draw):
    f = font("Bold", 30)
    text = "Calquary"
    bbox = draw.textbbox((0, 0), text, font=f)
    tw = bbox[2] - bbox[0]
    x = W - 64 - tw - 12
    y = H - 64
    draw.text((x, y), text, font=f, fill=INK)
    dot_x = x + tw + 8
    draw.ellipse([dot_x, y + 18, dot_x + 8, y + 26], fill=BRAND)
    f2 = font("Regular", 16)
    url_text = "calquary.com"
    bbox2 = draw.textbbox((0, 0), url_text, font=f2)
    draw.text((W - 64 - (bbox2[2] - bbox2[0]), y + 34), url_text, font=f2, fill=MUTED)


def generate_one(spec):
    img = Image.new("RGB", (W, H), PAPER)
    draw = ImageDraw.Draw(img)

    margin = 64
    badge_size = 72
    if spec["kind"] != "site":
        draw_badge(draw, margin, 56, badge_size, spec["categoryId"])
        cat_font = font("Semibold", 20)
        cat_text = spec["categoryName"].upper()
        draw.text((margin + badge_size + 20, 56 + badge_size / 2 - 12), cat_text, font=cat_font, fill=MUTED)

    if spec["kind"] == "tool":
        title_font = font("Bold", 64)
        max_w = W - margin * 2
        lines = wrap_to_width(draw, spec["title"], title_font, max_w, max_lines=2)
        if len(lines) > 1:
            title_font = font("Bold", 54)
            lines = wrap_to_width(draw, spec["title"], title_font, max_w, max_lines=2)
        ty = 190
        for line in lines:
            draw.text((margin, ty), line, font=title_font, fill=INK)
            ty += int(title_font.size * 1.15)

        strip_y = ty + 28
        draw.line([(margin, strip_y), (W - margin, strip_y)], fill=LINE, width=2)
        label_font = font("Regular", 22)
        value_font = font("Heavy", 46)
        draw.text((margin, strip_y + 26), spec["primaryLabel"], font=label_font, fill=MUTED)
        lb = draw.textbbox((0, 0), spec["primaryLabel"], font=label_font)
        draw.text((margin, strip_y + 26 + (lb[3] - lb[1]) + 10), spec["primaryValue"], font=value_font, fill=INK)
    elif spec["kind"] == "category":
        title_font = font("Bold", 72)
        max_w = W - margin * 2
        lines = wrap_to_width(draw, spec["title"], title_font, max_w, max_lines=2)
        ty = 210
        for line in lines:
            draw.text((margin, ty), line, font=title_font, fill=INK)
            ty += int(title_font.size * 1.15)
        count_font = font("Regular", 26)
        draw.text((margin, ty + 20), f"{spec['toolCount']} calculators in this category", font=count_font, fill=MUTED)
    else:  # site-wide fallback for homepage/static pages
        title_font = font("Bold", 60)
        max_w = W - margin * 2
        lines = wrap_to_width(draw, spec["title"], title_font, max_w, max_lines=2)
        ty = 220
        for line in lines:
            draw.text((margin, ty), line, font=title_font, fill=INK)
            ty += int(title_font.size * 1.15)
        count_font = font("Regular", 26)
        draw.text((margin, ty + 20), spec.get("tagline", ""), font=count_font, fill=MUTED)

    draw_wordmark(img, draw)

    img.save(spec["output"])


def main():
    batch = json.load(open(sys.argv[1]))
    for spec in batch:
        generate_one(spec)
    print(f"Generated {len(batch)} OG images")


if __name__ == "__main__":
    main()
