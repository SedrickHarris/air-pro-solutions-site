// Loads the repo's TS content files from plain Node (transpiles on the fly; resolves ./ and @/ imports).
import { createRequire } from 'node:module';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import vm from 'node:vm';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const root = resolve(dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..', '..');
export { root };
const cache = new Map();

export function load(file) {
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


export const loadContent = (name) => load(resolve(root, 'src/content', name + '.ts'));
