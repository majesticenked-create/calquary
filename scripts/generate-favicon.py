#!/usr/bin/env python3
"""
Generates the site favicon set (favicon.svg, favicon-16x16.png,
favicon-32x32.png, favicon.ico, apple-touch-icon.png) as a solid
brand-green rounded square with a bold sans-serif "C" — the same mark
concept as the pre-rebrand favicon (reversed letterform on brand green),
redrawn in the new sans typography and palette. The dot that sat in the
old ivory/Georgia version is dropped here: at 16x16 it read as a stray
pixel more than a brand element, and the header wordmark's dot already
carries that motif at a size where it actually works.

PNGs are rendered with Pillow using SFNS.ttf (the macOS system sans, same
Inter-family substitute used by generate-og-image.py) at its Black
variation-axis weight, since a tiny glyph needs the heaviest weight to
stay legible. The SVG uses a generic sans-serif font stack instead of a
hardcoded local path, since it's the version browsers/OS chrome render
directly (no Python/Pillow involved at that point) and needs to degrade
gracefully on any system.

Usage: python3 generate-favicon.py
Run standalone (not part of the per-build asset pipeline) — same
one-off treatment as the original favicon set.
"""
from PIL import Image, ImageDraw, ImageFont

BRAND = (27, 122, 75)
WHITE = (255, 255, 255)
SANS = "/System/Library/Fonts/SFNS.ttf"

ROOT = "/Users/beyouenked/Documents/Calquary"


def font(size):
    f = ImageFont.truetype(SANS, size)
    try:
        f.set_variation_by_name("Black")
    except Exception:
        pass
    return f


def render_png(size):
    img = Image.new("RGB", (size, size), BRAND)
    draw = ImageDraw.Draw(img)
    radius = int(size * 0.22)
    draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=BRAND)

    f = font(int(size * 0.66))
    text = "C"
    bbox = draw.textbbox((0, 0), text, font=f)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(
        (size / 2 - tw / 2 - bbox[0], size / 2 - th / 2 - bbox[1]),
        text,
        font=f,
        fill=WHITE,
    )
    return img


def main():
    icon_16 = render_png(16)
    icon_32 = render_png(32)
    icon_16.save(f"{ROOT}/favicon-16x16.png")
    icon_32.save(f"{ROOT}/favicon-32x32.png")
    icon_32.save(f"{ROOT}/favicon.ico", sizes=[(16, 16), (32, 32)])

    apple = render_png(180)
    apple.save(f"{ROOT}/apple-touch-icon.png")

    svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#1B7A4B"/>
  <text x="16" y="23" font-family="Inter, -apple-system, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="20" fill="#FFFFFF" text-anchor="middle">C</text>
</svg>
"""
    with open(f"{ROOT}/favicon.svg", "w") as fp:
        fp.write(svg)

    print("Generated favicon.svg, favicon-16x16.png, favicon-32x32.png, favicon.ico, apple-touch-icon.png")


if __name__ == "__main__":
    main()
