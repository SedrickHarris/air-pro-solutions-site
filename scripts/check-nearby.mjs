// Validates the `nearby` arrays in src/content/cities.ts.
// Fails on: slug that is not a live city (has a `page` block), self-link, duplicate in one array, or more than 5 neighbors.
// Reports (does not fail): one-way links, where A lists B but B does not list A.
// Run: npm run check:nearby. Loads the TS content files directly, so no extra runner is needed.
import { createRequire } from 'node:module';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import vm from 'node:vm';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const root = resolve(dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..');
const cache = new Map();

function load(file) {
  if (cache.has(file)) return cache.get(file).exports;
  const out = ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const mod = { exports: {} };
  cache.set(file, mod);
  const req = (spec) => {
    let base = null;
    if (spec.startsWith('@/')) base = resolve(root, 'src', spec.slice(2));
    else if (spec.startsWith('.')) base = resolve(dirname(file), spec);
    if (!base) return require(spec);
    for (const ext of ['.ts', '.tsx', '/index.ts']) if (existsSync(base + ext)) return load(base + ext);
    throw new Error(`Cannot resolve ${spec} from ${file}`);
  };
  vm.runInThisContext(`(function (exports, require, module) {${out}\n})`)(mod.exports, req, mod);
  return mod.exports;
}

const { cities } = load(resolve(root, 'src/content/cities.ts'));
const bySlug = new Map(cities.map((c) => [c.slug, c]));
const errors = [];
const links = new Map();

for (const c of cities) {
  if (!c.page) continue;
  const list = c.page.nearby;
  links.set(c.slug, list);
  const seen = new Set();
  if (list.length > 5) errors.push(`${c.slug}: ${list.length} neighbors (max 5)`);
  for (const s of list) {
    if (s === c.slug) errors.push(`${c.slug}: lists itself`);
    else if (!bySlug.get(s)?.page) errors.push(`${c.slug}: "${s}" is not a live city`);
    if (seen.has(s)) errors.push(`${c.slug}: "${s}" appears twice`);
    seen.add(s);
  }
}

const oneWay = [];
for (const [a, list] of links) for (const b of list) if (links.has(b) && !links.get(b).includes(a)) oneWay.push(`${a} -> ${b}`);
const empty = [...links].filter(([, l]) => l.length === 0).map(([s]) => s);

console.log(`Checked ${links.size} live cities.`);
if (empty.length) console.log(`No nearby row: ${empty.join(', ')}`);
console.log(`One-way links (${oneWay.length}), report only:`);
for (const l of oneWay) console.log(`  ${l}`);
if (errors.length) {
  console.error(`\nFAIL: ${errors.length} problem(s):`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
console.log('\nOK: all nearby slugs resolve, no self-links or duplicates.');
