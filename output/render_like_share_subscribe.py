"""Render a Like / Share / Subscribe / Bell lower-third on a chroma green background.
Writes raw RGB 1920x1080 frames to stdout (pipe into ffmpeg)."""
import math, sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1920, 1080
FPS = 30
DUR = 10.0
SS = 2                      # supersampling factor
GREEN = (0, 255, 0)
RED = (232, 30, 28)
WHITE = (255, 255, 255)
FONT = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"

# Work region (1080p units) – everything lives in the lower part of the frame
RY0 = 560
RH = H - RY0

def S(v): return int(round(v * SS))

# ---------- easing ----------
def clamp(t): return max(0.0, min(1.0, t))
def prog(t, a, b): return clamp((t - a) / (b - a))
def ease_out_cubic(t): return 1 - (1 - t) ** 3
def ease_in_out(t): return 3 * t * t - 2 * t * t * t
def ease_out_back(t, c1=1.70158):
    c3 = c1 + 1
    return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2
def ease_in_back(t, c1=1.70158):
    return (c1 + 1) * t ** 3 - c1 * t ** 2

# ---------- layout ----------
CY = 800 - RY0              # bar centre y in region coords
PH = 150                    # pill height
PR = PH / 2
ICON_R = 52
font_big = ImageFont.truetype(FONT, S(64))
font_bell = ImageFont.truetype(FONT, S(52))
font_btn = ImageFont.truetype(FONT, S(34))

def text_w(txt, f):
    b = f.getbbox(txt); return (b[2] - b[0]) / SS

X0 = 0                      # computed below, then centred
pills = []
x = 0
# Like
like_icon = x + PR
like_text = like_icon + ICON_R + 22
like_end = like_text + text_w("Like", font_big) + 42
pills.append(dict(start=x, end=like_end, icon=like_icon))
# Share
share_icon = like_end + 18 + ICON_R
share_text = share_icon + ICON_R + 22
share_end = share_text + text_w("Share", font_big) + 42
pills.append(dict(start=like_end - PH, end=share_end, icon=share_icon))
# Subscribe
btn_w = text_w("SUBSCRIBED", font_btn) + 56
btn_x0 = share_end + 26
btn_x1 = btn_x0 + btn_w
sub_end = btn_x1 + 34
pills.append(dict(start=share_end - PH, end=sub_end, icon=(btn_x0 + btn_x1) / 2))
# Bell
bell_icon = sub_end + 22 + ICON_R
bell_text = bell_icon + ICON_R + 20
bell_end = bell_text + max(text_w("Press The", font_bell), text_w("Bell Icon", font_bell)) + 46
pills.append(dict(start=sub_end - PH, end=bell_end, icon=bell_icon))

OFF = (W - bell_end) / 2    # centre the full bar horizontally
for p in pills:
    for k in ("start", "end", "icon"): p[k] += OFF
like_text += OFF; share_text += OFF; btn_x0 += OFF; btn_x1 += OFF; bell_text += OFF

# ---------- timeline (seconds) ----------
T_LIKE_IN = (0.15, 0.6)
T_LIKE_CLICK = 1.25
T_SHARE_IN = (1.7, 2.2)
T_SHARE_CLICK = 2.75
T_SUB_IN = (3.2, 3.7)
T_SUB_CLICK = 4.25
T_BELL_IN = (4.7, 5.2)
T_BELL_CLICK = 5.75
T_OUT = 8.6                 # outro start
pill_in = [T_LIKE_IN, T_SHARE_IN, T_SUB_IN, T_BELL_IN]
clicks = [T_LIKE_CLICK, T_SHARE_CLICK, T_SUB_CLICK, T_BELL_CLICK]

# ---------- glyphs (drawn in a 200x200 box, scaled later) ----------
G = 200 * SS
def gbox(*pts): return [v * SS for v in pts]

def bez(p0, p1, p2, n=24):
    return [((1-t)**2*p0[0] + 2*(1-t)*t*p1[0] + t*t*p2[0],
             (1-t)**2*p0[1] + 2*(1-t)*t*p1[1] + t*t*p2[1]) for t in (i/n for i in range(n+1))]

def make_circle_icon(glyph_fn):
    im = Image.new("RGBA", (G, G), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.ellipse([0, 0, G - 1, G - 1], fill=RED)
    glyph_fn(im)
    return im

def thumb(im):
    d = ImageDraw.Draw(im)
    d.rounded_rectangle(gbox(46, 96, 76, 152), radius=6*SS, fill=WHITE)
    d.rounded_rectangle(gbox(84, 92, 152, 154), radius=14*SS, fill=WHITE)
    d.polygon([(x*SS, y*SS) for x, y in [(84, 100), (100, 52), (122, 54), (118, 96)]], fill=WHITE)
    d.ellipse(gbox(98, 40, 124, 66), fill=WHITE)
    for y in (108, 123, 138):
        d.line(gbox(122, y, 154, y), fill=RED, width=4*SS)

def arrow(im):
    d = ImageDraw.Draw(im)
    top = bez((44, 152), (52, 78), (122, 76))
    bot = bez((122, 116), (76, 112), (44, 152))
    d.polygon([(x*SS, y*SS) for x, y in top + bot], fill=WHITE)
    d.polygon([(x*SS, y*SS) for x, y in [(116, 52), (162, 96), (116, 140)]], fill=WHITE)

def bell_glyph():
    im = Image.new("RGBA", (G, G), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.ellipse(gbox(90, 38, 110, 58), fill=WHITE)
    pts = [(100, 50), (80, 56), (68, 72), (64, 98), (62, 120), (48, 136), (48, 146),
           (152, 146), (152, 136), (138, 120), (136, 98), (132, 72), (120, 56)]
    d.polygon([(x*SS, y*SS) for x, y in pts], fill=WHITE)
    d.ellipse(gbox(86, 146, 114, 170), fill=WHITE)
    return im

ICON_LIKE = make_circle_icon(thumb)
ICON_SHARE = make_circle_icon(arrow)
ICON_BELL_BG = make_circle_icon(lambda im: None)
BELL = bell_glyph()

def make_cursor():
    c = 100 * SS
    im = Image.new("RGBA", (c + 20*SS, c + 20*SS), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    o = 10
    shapes = [("r", (30, 2, 48, 62, 9)), ("r", (46, 30, 63, 64, 8)), ("r", (61, 34, 78, 66, 8)),
              ("r", (76, 40, 92, 68, 7)), ("r", (24, 50, 92, 104, 18)),
              ("p", [(8, 60), (20, 50), (40, 76), (30, 86)])]
    for col, grow in ((( 20, 20, 20), 5), (WHITE, 0)):
        for kind, s in shapes:
            if kind == "r":
                x0, y0, x1, y1, r = s
                d.rounded_rectangle([(x0-grow+o)*SS, (y0-grow+o)*SS, (x1+grow+o)*SS, (y1+grow+o)*SS],
                                    radius=(r+grow)*SS, fill=col)
            else:
                cx = sum(p[0] for p in s)/len(s); cy = sum(p[1] for p in s)/len(s)
                pts = []
                for px, py in s:
                    dx, dy = px-cx, py-cy; L = math.hypot(dx, dy) or 1
                    pts.append(((px + dx/L*grow*1.4 + o)*SS, (py + dy/L*grow*1.4 + o)*SS))
                d.polygon(pts, fill=col)
    # finger crease lines
    for x in (48, 63, 78):
        d.line([(x+o)*SS, (56+o)*SS, (x+o)*SS, (68+o)*SS], fill=(20, 20, 20), width=3*SS)
    return im, ((39 + o) * SS, (2 + o) * SS)   # image, hotspot (fingertip)

CURSOR, HOT = make_cursor()
CURSOR_SCALE = 0.62

# ---------- helpers ----------
def paste_scaled(dst, src, cx, cy, size, angle=0.0, alpha=1.0):
    if size <= 1: return
    im = src
    if angle:
        im = im.rotate(angle, resample=Image.BICUBIC, center=(G/2, 50*SS))
    im = im.resize((int(size), int(size)), Image.LANCZOS)
    if alpha < 1:
        a = im.getchannel("A").point(lambda v: int(v * alpha)); im.putalpha(a)
    dst.alpha_composite(im, (int(cx - size/2), int(cy - size/2)))

def burst(d, cx, cy, r, t):
    """Radiating click lines; t in [0,1]."""
    if not 0 <= t <= 1: return
    e = ease_out_cubic(t)
    r0 = r * (1.05 + 0.35 * e); r1 = r * (1.25 + 0.55 * e)
    a = int(255 * (1 - t))
    for i in range(10):
        ang = i * math.tau / 10 - math.pi / 2
        d.line([S(cx + math.cos(ang)*r0), S(cy + math.sin(ang)*r0),
                S(cx + math.cos(ang)*r1), S(cy + math.sin(ang)*r1)],
               fill=RED + (a,), width=S(5))

def pulse(t, click):
    """Icon scale pulse around a click."""
    u = (t - click) / 0.35
    if 0 <= u <= 1: return 1 + 0.18 * math.sin(math.pi * u)
    return 1.0

def pill_right(i, t):
    p = pills[i]
    if i == 0:
        return p["end"]
    a, b = pill_in[i]
    e = ease_out_back(prog(t, a, b), 1.2) if t >= a else 0
    prev_end = pills[i-1]["end"]
    right = prev_end + (p["end"] - prev_end) * e
    # outro: retract in reverse order
    k = 3 - i
    oa = T_OUT + k * 0.18
    if t > oa:
        right = prev_end + (right - prev_end) * (1 - ease_in_back(prog(t, oa, oa + 0.3)))
    return right

def like_scale(t):
    s = ease_out_back(prog(t, *T_LIKE_IN), 2.0) if t >= T_LIKE_IN[0] else 0
    oa = T_OUT + 4 * 0.18
    if t > oa: s *= 1 - ease_in_back(prog(t, oa, oa + 0.3))
    return s

def cursor_pos(t):
    """Waypoints: (time, x, y, visible). Hotspot coordinates in region space."""
    off_x, off_y = W + 80, RH + 120
    wp = [(0.55, off_x, off_y)]
    targets = [(pills[0]["icon"], clicks[0]), (pills[1]["icon"], clicks[1]),
               (pills[2]["icon"], clicks[2]), (pills[3]["icon"], clicks[3])]
    for x, tc in targets:
        wp.append((tc - 0.4, x + 14, CY + 30))
        wp.append((tc + 0.25, x + 14, CY + 30))
    wp.append((clicks[3] + 0.95, off_x - 100, off_y))
    if t <= wp[0][0] or t >= wp[-1][0]: return None
    for (t0, x0, y0), (t1, x1, y1) in zip(wp, wp[1:]):
        if t0 <= t <= t1:
            e = ease_in_out(prog(t, t0, t1))
            return x0 + (x1 - x0) * e, y0 + (y1 - y0) * e
    return None

# ---------- frame rendering ----------
def pill_mask(x0, x1):
    m = Image.new("L", (S(W), S(RH)), 0)
    ImageDraw.Draw(m).rounded_rectangle([S(x0), S(CY - PR), S(x1), S(CY + PR)], radius=S(PR), fill=255)
    return m

def shadow_from(mask):
    small = mask.resize((mask.width // 4, mask.height // 4), Image.BILINEAR)
    small = small.filter(ImageFilter.GaussianBlur(5)).point(lambda v: int(v * 0.45))
    sh = small.resize(mask.size, Image.BILINEAR)
    layer = Image.new("RGBA", mask.size, (0, 0, 0, 0))
    black = Image.new("RGBA", mask.size, (25, 25, 25, 255))
    layer.paste(black, (S(8), S(6)), sh)
    return layer

def draw_text_clipped(layer, x, y, txt, font):
    ImageDraw.Draw(layer).text((S(x), S(y)), txt, font=font, fill=RED, anchor="lm")

def render_pill(i, t):
    """Returns RGBA layer (region-size) for pill i, or None."""
    p = pills[i]
    layer = Image.new("RGBA", (S(W), S(RH)), (0, 0, 0, 0))
    if i == 0:
        sc = like_scale(t)
        if sc <= 0.01: return None
        cx = (p["start"] + p["end"]) / 2
        hw = (p["end"] - p["start"]) / 2 * sc; hh = PR * sc
        m = Image.new("L", layer.size, 0)
        ImageDraw.Draw(m).rounded_rectangle([S(cx - hw), S(CY - hh), S(cx + hw), S(CY + hh)],
                                            radius=S(hh), fill=255)
        content = Image.new("RGBA", layer.size, (0, 0, 0, 0))
        ImageDraw.Draw(content).rectangle([0, 0, layer.width, layer.height], fill=WHITE)
        # icon & text (scaled with the pill)
        ic = cx + (p["icon"] - cx) * sc
        isz = S(2 * ICON_R) * sc * pulse(t, clicks[0])
        paste_scaled(content, ICON_LIKE, S(ic), S(CY), isz)
        tp = prog(t, T_LIKE_IN[1] - 0.15, T_LIKE_IN[1] + 0.25)
        if tp > 0 and sc > 0.6:
            tl = Image.new("RGBA", layer.size, (0, 0, 0, 0))
            draw_text_clipped(tl, like_text, CY + 2, "Like", font_big)
            if sc != 1:
                tl = tl.resize((int(tl.width*sc), int(tl.height*sc)), Image.BICUBIC)
                big = Image.new("RGBA", layer.size, (0, 0, 0, 0))
                big.alpha_composite(tl, (int(S(cx) - S(cx)*sc), int(S(CY) - S(CY)*sc)))
                tl = big
            wm = Image.new("L", layer.size, 0)
            ImageDraw.Draw(wm).rectangle([0, 0, S(like_text - 5 + (p["end"] - like_text) * ease_out_cubic(tp)), layer.height], fill=255)
            content.paste(tl, (0, 0), Image.composite(tl.getchannel("A"), Image.new("L", layer.size, 0), wm))
        layer.paste(content, (0, 0), m)
        return layer, m

    right = pill_right(i, t)
    if right <= pills[i-1]["end"] + 1: return None
    m = pill_mask(p["start"], right)
    content = Image.new("RGBA", layer.size, WHITE + (255,))
    d = ImageDraw.Draw(content)
    reveal = prog(t, pill_in[i][0] + 0.15, pill_in[i][1] + 0.1)
    if i == 1:
        isz = S(2 * ICON_R) * ease_out_back(reveal, 2.0) * pulse(t, clicks[1])
        paste_scaled(content, ICON_SHARE, S(p["icon"]), S(CY), isz)
        d.text((S(share_text), S(CY + 2)), "Share", font=font_big, fill=RED, anchor="lm")
    elif i == 2:
        u = (t - clicks[2]) / 0.3
        squish = 1 - 0.1 * math.sin(math.pi * u) if 0 <= u <= 1 else 1
        bs = ease_out_back(reveal, 2.0) * squish
        bcx = (btn_x0 + btn_x1) / 2; bw = (btn_x1 - btn_x0) / 2 * bs; bh = 36 * bs
        if bs > 0.02:
            subscribed = t >= clicks[2] + 0.12
            col = RED
            d.rounded_rectangle([S(bcx - bw), S(CY - bh), S(bcx + bw), S(CY + bh)], radius=S(bh), fill=col)
            if bs > 0.5:
                txt = "SUBSCRIBED" if subscribed else "SUBSCRIBE"
                f = font_btn if bs > 0.95 else ImageFont.truetype(FONT, max(1, S(34 * bs)))
                d.text((S(bcx), S(CY + 1)), txt, font=f, fill=WHITE, anchor="mm")
    elif i == 3:
        sc = ease_out_back(reveal, 2.0) * pulse(t, clicks[3])
        isz = S(2 * ICON_R) * sc
        paste_scaled(content, ICON_BELL_BG, S(p["icon"]), S(CY), isz)
        u = t - clicks[3]
        ang = 28 * math.exp(-3.2 * u) * math.sin(u * 2 * math.pi * 4.5) if u > 0 else 0
        paste_scaled(content, BELL, S(p["icon"]), S(CY), isz, angle=ang)
        d.text((S(bell_text), S(CY - 27)), "Press The", font=font_bell, fill=RED, anchor="lm")
        d.text((S(bell_text), S(CY + 29)), "Bell Icon", font=font_bell, fill=RED, anchor="lm")
    layer.paste(content, (0, 0), m)
    return layer, m

def render(t):
    region = Image.new("RGBA", (S(W), S(RH)), GREEN + (255,))
    # back-to-front: Bell, Subscribe, Share, Like (earlier pills sit on top)
    for i in (3, 2, 1, 0):
        r = render_pill(i, t)
        if r is None: continue
        layer, m = r
        region.alpha_composite(shadow_from(m))
        region.alpha_composite(layer)
    fx = Image.new("RGBA", region.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(fx)
    for i, tc in enumerate(clicks):
        if i == 2: continue
        burst(d, pills[i]["icon"], CY, ICON_R, (t - tc) / 0.4)
    region.alpha_composite(fx)
    cp = cursor_pos(t)
    if cp is not None:
        press = any(0 <= t - tc <= 0.15 for tc in clicks)
        cs = CURSOR_SCALE * (0.85 if press else 1.0)
        cur = CURSOR.resize((int(CURSOR.width * cs), int(CURSOR.height * cs)), Image.LANCZOS)
        region.alpha_composite(cur, (int(S(cp[0]) - HOT[0] * cs), int(S(cp[1]) - HOT[1] * cs)))
    small = region.convert("RGB").resize((W, RH), Image.LANCZOS)
    frame = Image.new("RGB", (W, H), GREEN)
    frame.paste(small, (0, RY0))
    return frame

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--still":
        for ts in sys.argv[2:]:
            render(float(ts)).save(f"still_{ts}.png")
        sys.exit()
    out = sys.stdout.buffer
    for n in range(int(DUR * FPS)):
        out.write(render(n / FPS).tobytes())
