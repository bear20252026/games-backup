import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SRC = process.argv[2];
const tmp = path.join(path.dirname(new URL(import.meta.url).pathname.slice(1)), 'tmp-probe');
fs.mkdirSync(tmp, { recursive: true });
for (const f of ['react-TjmrQZ_z.js', 'three-CPLjTyt2.js']) {
  fs.copyFileSync(path.join(SRC, f), path.join(tmp, f));
}

const mod = await import(pathToFileURL(path.join(tmp, 'react-TjmrQZ_z.js')).href).catch((e) => {
  console.log('IMPORT ERROR:', e.message);
  process.exit(1);
});

const sym = (n) => Symbol.for('react.' + n);
const out = [];
for (const [name, v] of Object.entries(mod)) {
  const rec = { alias: name, type: typeof v };
  if (typeof v === 'function') {
    rec.fnName = v.name;
    rec.length = v.length;
    try {
      const el = v('div', null, 'x');
      if (el && typeof el === 'object' && el.$$typeof === sym('element')) rec.guess = 'createElement';
    } catch {}
    try {
      const el = v('div', { children: 'x' });
      if (el && typeof el === 'object' && el.$$typeof === sym('element')) rec.guess = rec.guess || 'jsx';
    } catch {}
    try {
      const fr = v(() => null);
      if (fr && typeof fr === 'object' && fr.$$typeof === sym('forward_ref')) rec.guess = 'forwardRef';
      else if (fr && typeof fr === 'object' && fr.$$typeof === sym('memo')) rec.guess = 'memo';
    } catch {}
    try {
      const ctx = v({});
      if (ctx && typeof ctx === 'object' && ctx.$$typeof === sym('context')) rec.guess = 'createContext';
    } catch {}
    if (!rec.guess && v.prototype && v.prototype.isReactComponent !== undefined) rec.guess = 'Component(class)';
    if (!rec.guess && v.name === 'Fragment') rec.guess = 'Fragment?';
    if (!rec.guess) {
      // 用错误信息判断 hook：调用时抛 "Invalid hook call"
      try {
        v();
      } catch (e) {
        if (/hook/i.test(String(e.message))) rec.guess = 'hook?';
        rec.err = String(e.message).slice(0, 80);
      }
    }
  } else if (typeof v === 'symbol') {
    rec.symbolFor = Object.entries({
      fragment: sym('fragment'),
      strict_mode: sym('strict_mode'),
      suspense: sym('suspense'),
      profiler: sym('profiler'),
    })
      .filter(([, s]) => s === v)
      .map(([k]) => k)[0] || 'other';
  } else if (typeof v === 'object' && v) {
    rec.keys = Object.keys(v).slice(0, 8);
    if (v.$$typeof) rec.$$typeof = String(v.$$typeof);
  }
  out.push(rec);
}
console.log(JSON.stringify(out, null, 1));

// 额外：看 react chunk 顶层是否暴露了 __SECRET / ReactDOM 相关
for (const key of ['createRoot', 'hydrateRoot', 'render', '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED']) {
  const hit = Object.entries(mod).find(([, v]) => v && (v === globalThis[key] || (typeof v === 'object' && key in v)));
  if (hit) console.log('extra:', key, '->', hit[0]);
}
