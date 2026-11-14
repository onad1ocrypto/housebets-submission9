#!/usr/bin/env python3
"""Bundle submission 9 (/home/user/sb9) into ONE self-contained HTML file.

Why: the workspace file preview runs in a sandboxed iframe with no network,
so relative asset paths (assets/crests/ARS.png ...) cannot load there.
This script inlines every CSS file, every JS file and every image as a data
URI, so the result opens correctly from the file panel with zero server.

Heavy images are downscaled first (copies only -- /home/user/sb9 itself is
never modified) to keep the single file near 1 MB.

Usage:  python3 build_single.py
Output: /home/user/submission-4-preview.html
"""
import base64, io, os, re, shutil

SRC = '/home/user/sb9'
TMP = '/tmp/sb4_inline'
OUT = '/home/user/submission-9-preview.html'

MIME = {'.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
        '.webp': 'image/webp', '.svg': 'image/svg+xml', '.gif': 'image/gif'}

# rel path -> (max width, jpeg quality) ; entries not listed are copied verbatim
RESIZE = {
    'assets/brand/housebets-logo.png': (560, None),
    'assets/brand/hubie.png':          (160, None),
    'assets/posters/ars-bha-hero.jpg': (900, 78),
    'assets/posters/liv-mun-hero.jpg': (900, 78),
}

# prefix rules (checked only when the exact path is not in RESIZE):
# crests render at 24-40px in the UI, so 96px is still >2x and halves the bytes
PREFIX_RESIZE = [('assets/crests/', (80, None))]


def rule_for(rel):
    if rel in RESIZE:
        return RESIZE[rel]
    for pfx, rule in PREFIX_RESIZE:
        if rel.startswith(pfx):
            return rule
    return None


def prepare_assets():
    """Copy assets to TMP, downscaling the heavy ones. Returns sorted rel paths."""
    if os.path.isdir(TMP):
        shutil.rmtree(TMP)
    rel = []
    for root, _dirs, files in os.walk(os.path.join(SRC, 'assets')):
        for fn in files:
            src = os.path.join(root, fn)
            r = os.path.relpath(src, SRC)
            dst = os.path.join(TMP, r)
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            rel.append(r)
            rule = rule_for(r)
            if rule and not r.lower().endswith('.svg'):
                from PIL import Image
                maxw, q = rule
                im = Image.open(src)
                if im.width > maxw:
                    h = round(im.height * maxw / im.width)
                    im = im.resize((maxw, h), Image.LANCZOS)
                if q:
                    im.convert('RGB').save(dst, 'JPEG', quality=q, optimize=True)
                else:
                    im.save(dst, 'PNG', optimize=True)
            else:
                shutil.copyfile(src, dst)
    return sorted(rel)


def data_uri(path):
    ext = os.path.splitext(path)[1].lower()
    mime = MIME.get(ext, 'application/octet-stream')
    with open(path, 'rb') as fh:
        return 'data:%s;base64,%s' % (mime, base64.b64encode(fh.read()).decode())


BOOTSTRAP = r"""
<script>
/* Asset shim: every image is inlined as a data URI in window.__IMG.
   The app builds <img src="assets/crests/ARS.png"> strings at runtime, so we
   rewrite the path to its data URI -- both for markup injected via innerHTML
   (MutationObserver) and for img.src = ... assignments (property override). */
window.__IMG = __IMG_JSON__;
(function () {
  var M = window.__IMG || {};
  function map(v) {
    if (v == null) return null;
    var k = String(v).replace(/^\.?\/*/, '');
    if (M[k]) return M[k];
    k = 'assets/' + k.replace(/^assets\//, '');
    return M[k] || null;
  }
  function fix(img) {
    if (!img || img.tagName !== 'IMG') return;
    var a = img.getAttribute('src');
    if (!a || a.indexOf('data:') === 0) return;
    var m = map(a);
    if (m) img.setAttribute('src', m);
  }
  function sweep(root) {
    if (!root || root.nodeType !== 1) return;
    if (root.tagName === 'IMG') { fix(root); return; }
    if (!root.querySelectorAll) return;
    var imgs = root.querySelectorAll('img[src]:not([src^="data:"])');
    for (var i = 0; i < imgs.length; i++) fix(imgs[i]);
  }
  sweep(document.documentElement);
  if (window.MutationObserver) {
    new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var m = muts[i];
        if (m.type === 'childList') {
          for (var j = 0; j < m.addedNodes.length; j++) sweep(m.addedNodes[j]);
        } else if (m.type === 'attributes') {
          sweep(m.target);
        }
      }
    }).observe(document.documentElement,
      { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] });
  } else {
    setInterval(function () { sweep(document.documentElement); }, 400);
  }
  var d = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
  if (d && d.set) {
    Object.defineProperty(HTMLImageElement.prototype, 'src', {
      configurable: true,
      get: function () { return d.get.call(this); },
      set: function (v) {
        var m = map(v);
        if (m) this.setAttribute('src', m); else d.set.call(this, v);
      }
    });
  }
  document.addEventListener('DOMContentLoaded', function () { sweep(document.documentElement); });
})();
</script>
"""


def esc_js(s):
    """Make a script body safe to inline."""
    return s.replace('</script', '<\\/script')


def main():
    rel = prepare_assets()

    img = {}
    for r in rel:
        img[r] = data_uri(os.path.join(TMP, r))
    img_js = esc_js(__import__('json').dumps(img, separators=(',', ':')))

    html = open(os.path.join(SRC, 'index.html'), encoding='utf-8').read()

    # 1. inline the stylesheets (app.css first, then the theme override)
    styles = []
    for m in re.finditer(r'<link rel="stylesheet" href="([^"]+)">', html):
        css = open(os.path.join(SRC, m.group(1)), encoding='utf-8').read()
        # any url(assets/...) left in the CSS becomes a data URI too
        css = re.sub(r'url\(["\']?(assets/[^)"\']+)["\']?\)',
                     lambda mm: 'url("%s")' % img.get(mm.group(1), mm.group(1)), css)
        styles.append('/* ==== %s ==== */\n%s' % (m.group(1), css))
    html = re.sub(r'<link rel="stylesheet" href="[^"]+">', '', html)
    html = html.replace('</head>', '<style>\n%s\n</style>\n</head>' % '\n'.join(styles))

    # 2. inline the scripts, keeping data.js before app.js
    scripts = []
    for m in re.finditer(r'<script src="([^"]+)"></script>', html):
        js = open(os.path.join(SRC, m.group(1)), encoding='utf-8').read()
        scripts.append('/* ==== %s ==== */\n%s' % (m.group(1), esc_js(js)))
    html = re.sub(r'<script src="[^"]+"></script>', '', html)
    html = html.replace('</body>', '%s\n</body>' % '\n'.join(
        '<script>\n%s\n</script>' % s for s in scripts))

    # 3. the asset shim has to run before the app
    html = html.replace('<body>', '<body>\n' + BOOTSTRAP.replace('__IMG_JSON__', img_js))

    html = html.replace('<title>Housebets Sportsbook — prototype</title>',
                        '<title>Housebets Sportsbook — Submission 7 (Siang)</title>')

    with open(OUT, 'w', encoding='utf-8') as fh:
        fh.write(html)

    print('assets inlined : %d' % len(rel))
    print('external refs  : %d' % len(re.findall(r'(?:src|href)="(?:https?:)?//', html)))
    print('output         : %s  (%.2f MB)' % (OUT, os.path.getsize(OUT) / 1048576.0))


if __name__ == '__main__':
    main()
