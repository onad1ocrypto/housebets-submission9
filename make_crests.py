#!/usr/bin/env python3
"""Generate monogram crest badges for every team in data.js that has no PNG yet.

data.js already carries two brand colours per team (`col` / `col2`), so the
badge uses the team's real palette instead of a guessed one:

  * disc      = vertical gradient col -> col2
  * ring      = theme gold #F7C860, so all 44 read as one designed family
  * initials  = the abbreviation, white on dark discs / navy on light discs

Rendered at 512px then downscaled to 128px so the edges are clean, matching
the existing 128x128 RGBA crest files (transparent outside the circle).

Only MISSING files are written; the 16 existing club badges are never touched.
"""
import os, re
from PIL import Image, ImageDraw, ImageFont

SRC = '/home/user/sb4'
CRESTS = os.path.join(SRC, 'assets', 'crests')
FONT_BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
GOLD = (247, 200, 96)          # #F7C860 - the theme accent
DARK_INK = (11, 27, 56)        # #0B1B38
S = 512                        # supersample canvas
OUT = 128                      # final size, matches the real crests


def hex2rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def luma(rgb):
    r, g, b = [c / 255.0 for c in rgb]
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def parse_teams():
    src = open(os.path.join(SRC, 'assets', 'data.js'), encoding='utf-8').read()
    pat = re.compile(
        r"([A-Z0-9]{2,5})\s*:\s*\{[^}]*?abbr\s*:\s*'([A-Z0-9]{2,5})'"
        r"[^}]*?col\s*:\s*'(#[0-9A-Fa-f]{6})'\s*,\s*col2\s*:\s*'(#[0-9A-Fa-f]{6})'",
        re.S)
    out = {}
    for m in pat.finditer(src):
        _key, abbr, col, col2 = m.groups()
        out[abbr] = (hex2rgb(col), hex2rgb(col2))
    return out


def make_badge(abbr, col, col2):
    img = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # gradient disc
    R = S // 2 - 8
    disc = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    dd = ImageDraw.Draw(disc)
    dd.ellipse([S // 2 - R, S // 2 - R, S // 2 + R, S // 2 + R], fill=(255, 255, 255, 255))
    grad = Image.new('RGB', (1, S))
    gp = grad.load()
    for y in range(S):
        t = y / (S - 1)
        gp[0, y] = tuple(round(col[i] + (col2[i] - col[i]) * t) for i in range(3))
    grad = grad.resize((S, S))
    solid = Image.new('RGBA', (S, S))
    solid.paste(grad, (0, 0), disc)
    img = Image.alpha_composite(img, solid)

    # gold ring, drawn inside the disc edge
    d = ImageDraw.Draw(img)
    ring = R - 14
    d.ellipse([S // 2 - ring, S // 2 - ring, S // 2 + ring, S // 2 + ring],
              outline=GOLD + (255,), width=14)

    # initials - pick ink by the brightness of the middle of the gradient
    mid = tuple(round((col[i] + col2[i]) / 2) for i in range(3))
    ink = (255, 255, 255, 255) if luma(mid) < 0.55 else DARK_INK + (255,)

    txt = abbr[:3]
    size = 300 if len(txt) <= 2 else 240
    font = ImageFont.truetype(FONT_BOLD, size)
    box = d.textbbox((0, 0), txt, font=font)
    w, h = box[2] - box[0], box[3] - box[1]
    # centre on the glyph box, not the baseline
    d.text((S / 2 - w / 2 - box[0], S / 2 - h / 2 - box[1]), txt, font=font, fill=ink)

    return img.resize((OUT, OUT), Image.LANCZOS)


def main():
    teams = parse_teams()
    have = {f[:-4] for f in os.listdir(CRESTS) if f.endswith('.png')}
    todo = sorted(a for a in teams if a not in have)

    print('teams in data.js : %d' % len(teams))
    print('crests on disk   : %d' % len(have))
    print('generating       : %d  -> %s' % (len(todo), ' '.join(todo)))

    for abbr in todo:
        col, col2 = teams[abbr]
        make_badge(abbr, col, col2).save(os.path.join(CRESTS, abbr + '.png'), 'PNG')

    total = len([f for f in os.listdir(CRESTS) if f.endswith('.png')])
    print('crests after     : %d' % total)


if __name__ == '__main__':
    main()
