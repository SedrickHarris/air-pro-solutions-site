// Adds <link rel="preload" as="font"> for the two critical latin font files to every exported HTML page.
// next/font self-hosts Barlow Condensed and Manrope but, in this static export, emits no font preload, so the
// fonts were requested only after the CSS was parsed and swapped in after first paint (a layout shift).
// Critical files: Barlow Condensed 700 (every H1) and Manrope (variable, covers all body weights), latin subset.
// Runs after `next build` (see package.json "build"). Fails the build if a file cannot be found.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'out');
const cssDir = path.join(out, '_next/static/css');

const faces = [];
for (const f of fs.readdirSync(cssDir).filter((n) => n.endsWith('.css'))) {
  const css = fs.readFileSync(path.join(cssDir, f), 'utf8');
  for (const m of css.matchAll(/@font-face\{([^}]*)\}/g)) {
    const b = m[1];
    const family = (b.match(/font-family:([^;]+)/) || [])[1];
    const weight = (b.match(/font-weight:([^;]+)/) || [])[1];
    const url = (b.match(/src:url\(([^)]+\.woff2)\)/) || [])[1];
    if (family && url) faces.push({ family: family.replace(/["']/g, '').trim(), weight: (weight || '').trim(), url });
  }
}

// Next marks the latin subset files with ".p." in the name.
const pick = (family, weightTest) => faces.find((x) => x.family === family && weightTest(x.weight) && /\.p\.woff2$/.test(x.url));
const wanted = [
  pick('Barlow Condensed', (w) => w === '700'),
  pick('Manrope', () => true),
];
if (wanted.some((x) => !x)) {
  console.error('preload-fonts: could not find the latin Barlow Condensed 700 and Manrope files in the built CSS.');
  process.exit(1);
}
for (const w of wanted) if (!fs.existsSync(path.join(out, w.url))) { console.error('preload-fonts: missing file', w.url); process.exit(1); }

const tags = wanted.map((w) => `<link rel="preload" href="${w.url}" as="font" type="font/woff2" crossorigin=""/>`).join('');
let pages = 0;
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== '_next') walk(p); }
    else if (e.name.endsWith('.html')) {
      const h = fs.readFileSync(p, 'utf8');
      if (!h.includes('</head>') || h.includes('as="font"')) continue;
      fs.writeFileSync(p, h.replace('<head>', `<head>${tags}`));
      pages++;
    }
  }
})(out);
console.log(`preload-fonts: ${wanted.map((w) => `${w.family} ${w.weight} ${w.url.split('/').pop()}`).join(', ')} -> ${pages} pages`);
