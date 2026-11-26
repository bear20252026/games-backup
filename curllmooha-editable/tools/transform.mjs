// 把线上 bundle 拆回可编辑的 Vite 工程。
// 做四件事：
//   1. 按 chunk 拆成业务模块，重写模块间的 import/动态 import 路径；
//   2. 三方库以 *_runtime.js 原样保留，另生成 wrapper 把压缩别名还原成官方名字；
//   3. 业务代码里引用的三方别名，在保持作用域安全的前提下重命名为官方名字；
//   4. 去掉 Vite 的 __vite__mapDeps 资源预加载表（源码工程不需要，构建时 Vite 会自己生成）。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from '@babel/parser';
import _traverse from '@babel/traverse';
import _generate from '@babel/generator';
import * as t from '@babel/types';

const traverse = _traverse.default || _traverse;
const generate = _generate.default || _generate;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJ = path.resolve(__dirname, '..');
const SRC = path.resolve(PROJ, '..', 'curllmooha_source', 'assets');
const threeMap = JSON.parse(fs.readFileSync(path.join(__dirname, 'three-alias-map.json'), 'utf8'));

// ---------- 模块表 ----------
const APP = {
  'main-BnGm-0-m.js': {
    out: 'src/main.js',
    title: '主入口 / 草甸场景',
    note: '负责启动、设备分级、场景装配、角色控制、HUD 与各区域的按需加载。',
  },
  'WindborneSketchbook-BzsFNEj_.js': {
    out: 'src/scenes/windborne-sketchbook.js',
    title: '风之写生簿（场景分区）',
    note: '草甸西侧悬浮画册区域的场景、材质与交互。',
  },
  'ProjectScreens-D4jOPliI.js': {
    out: 'src/scenes/project-screens.js',
    title: '项目屏幕（场景分区）',
    note: '作品投影屏/电视墙的渲染、贴图与视频播放。',
  },
  'ContactPond-ZK76ajXT.js': {
    out: 'src/scenes/contact-pond.js',
    title: '联系池塘（场景分区）',
    note: '水面、鱼群、纸船与联系方式的交互区域。',
  },
  'AboutBoard-Cf6sITsG.js': {
    out: 'src/scenes/about-board.js',
    title: '关于看板（场景分区）',
    note: '自述展板、灯光与风铃交互。',
  },
  'WeatherStage-DI0ZLv7q.js': {
    out: 'src/scenes/weather-stage.js',
    title: '天气舞台（场景分区）',
    note: '昼夜、雨雪、风暴等天气状态与舞台灯光。',
  },
  'FilmPostProcessing-Dpafo7_I.js': {
    out: 'src/world/film-post-processing.js',
    title: '胶片后期',
    note: '后期处理链：景深、噪点、色调与电影感合成。',
  },
  'aboutBoardGeometry-DcaOtMwp.js': {
    out: 'src/world/about-board-geometry.js',
    title: '看板几何体与材质',
    note: '与 AboutBoard 配套的几何/材质生成与预构建。',
  },
  'ivyLeaf-CE3lyIS1.js': {
    out: 'src/world/ivy-leaf.js',
    title: '常春藤叶片',
    note: '叶片几何、材质与摆动。',
  },
  'decodedImages-C_X7Q7ja.js': {
    out: 'src/world/decoded-images.js',
    title: '图片解码缓存',
    note: '把贴图预解码为 ImageBitmap，避免运行期卡顿。',
  },
  'flat-D6JHTwaK.js': {
    out: 'src/pages/flat.js',
    title: '平面页面脚本',
    note: '/hire/ 与 /work/ 等项目页共用的按钮磁吸、进场动画。',
  },
  'projects-jUOwRfMr.js': {
    out: 'src/data/projects.js',
    title: '作品数据',
    note: '作品条目、封面/视频路径、页面链接等元数据。',
  },
  'index-ghQi_28l.js': {
    out: 'src/lib/clarity.js',
    title: 'Clarity 统计封装',
    note: 'Microsoft Clarity 的最小封装（init/setTag/identify/event）。',
  },
  'worldShapes.worker-CW9xYs6r.js': {
    out: 'src/workers/world-shapes.worker.js',
    title: '地形生成 Worker',
    note: '独立 IIFE 脚本，在 Worker 中生成地形/场景几何，避免阻塞主线程。',
    raw: true,
  },
};

const VENDOR = {
  'react-TjmrQZ_z.js': { rt: 'src/vendor/react-runtime.js', wrapper: 'src/vendor/react.js', pkg: 'react + react-dom + @react-three/fiber' },
  'three-CPLjTyt2.js': { rt: 'src/vendor/three-runtime.js', wrapper: 'src/vendor/three.js', pkg: 'three r174 + addons' },
  'gsap-DdWnu9fz.js': { rt: 'src/vendor/gsap-runtime.js', wrapper: 'src/vendor/gsap.js', pkg: 'gsap' },
  'rapier-DpitnbkN.js': { rt: 'src/vendor/rapier-runtime.js', wrapper: 'src/vendor/rapier.js', pkg: '@dimforge/rapier3d-compat' },
  'postfx-GwtP5Agz.js': { rt: 'src/vendor/postfx-runtime.js', wrapper: 'src/vendor/postfx.js', pkg: 'postprocessing' },
};

// 压缩别名 → 官方名字（只写能确定的；不确定的一律保留别名）
const REACT_MAP = {
  r: 'React',
  h: 'React',
  j: 'jsxRuntime',
  R: 'ReactDOM',
  a: 'useEffect',
  u: 'useThree',
  d: 'useLoader',
  f: 'extend',
  p: 'useLoaderPreload',
  e: 'useLoaderClear',
};
const GSAP_MAP = { g: 'gsap' };
const THREE_MAP = threeMap.aliasToOfficial;

function vendorInfo(src) {
  const base = path.basename(src);
  if (!VENDOR[base]) return null;
  return { base, ...VENDOR[base] };
}

function outAbs(outRel) {
  return path.join(PROJ, outRel);
}

function relImport(fromOutRel, toOutRel) {
  let rel = path.relative(path.dirname(outAbs(fromOutRel)), outAbs(toOutRel)).replace(/\\/g, '/');
  if (!rel.startsWith('.')) rel = './' + rel;
  return rel;
}

const HEADERS = {};

// ---------- 逐个 chunk 处理 ----------
const log = [];
for (const [file, info] of Object.entries(APP)) {
  if (info.raw) continue;
  const code = fs.readFileSync(path.join(SRC, file), 'utf8');
  const ast = parse(code, { sourceType: 'module', errorRecovery: false });

  let renamedCount = 0;
  let droppedPreload = 0;

  traverse(ast, {
    Program(programPath) {
      // 1) 删除 __vite__mapDeps 声明
      for (const p of programPath.get('body')) {
        if (p.isVariableDeclaration()) {
          const decls = p.node.declarations.filter((d) => d.id?.name === '__vite__mapDeps');
          if (decls.length === p.node.declarations.length) p.remove();
          else p.node.declarations = p.node.declarations.filter((d) => d.id?.name !== '__vite__mapDeps');
        }
      }
    },
    ImportDeclaration(p) {
      const src = p.node.source.value;
      const v = vendorInfo(src);
      if (v) {
        const map = v.base.startsWith('react') ? REACT_MAP : v.base.startsWith('gsap') ? GSAP_MAP : v.base.startsWith('three') ? THREE_MAP : {};
        const usedTargets = new Set();
        const newSpecs = [];
        for (const spec of p.node.specifiers) {
          if (t.isImportSpecifier(spec) && map[spec.imported.name]) {
            const official = map[spec.imported.name];
            const taken = p.scope.getProgramParent().hasBinding(official, true);
            if (!taken && !usedTargets.has(official)) {
              p.scope.rename(spec.local.name, official);
              renamedCount++;
              newSpecs.push(t.importSpecifier(t.identifier(official), t.identifier(official)));
              usedTargets.add(official);
              continue;
            }
          }
          newSpecs.push(spec);
        }
        p.node.specifiers = newSpecs;
        p.node.source = t.stringLiteral(relImport(info.out, v.wrapper));
        return;
      }
      // 2) 业务模块之间的 import 改写
      const target = APP[path.basename(src)];
      if (target) p.node.source = t.stringLiteral(relImport(info.out, target.out));
    },
    ExportNamedDeclaration(p) {
      const src = p.node.source?.value;
      if (!src) return;
      const v = vendorInfo(src);
      if (v) p.node.source = t.stringLiteral(relImport(info.out, v.wrapper));
      const target = APP[path.basename(src)];
      if (target) p.node.source = t.stringLiteral(relImport(info.out, target.out));
    },
    CallExpression(p) {
      // 3) 动态 import 路径 + 去掉 __vite__mapDeps 预加载参数
      const callee = p.node.callee;
      if (t.isImport(callee) && p.node.arguments[0] && t.isStringLiteral(p.node.arguments[0])) {
        const base = path.basename(p.node.arguments[0].value);
        const target = APP[base];
        if (target) p.node.arguments[0] = t.stringLiteral(relImport(info.out, target.out));
        const v = vendorInfo(base);
        if (v) p.node.arguments[0] = t.stringLiteral(relImport(info.out, v.wrapper));
      }
      // Dn(() => import(...), __vite__mapDeps([...]))
      if (p.node.arguments.length >= 2) {
        const second = p.node.arguments[1];
        if (
          t.isCallExpression(second) &&
          t.isIdentifier(second.callee) &&
          second.callee.name === '__vite__mapDeps'
        ) {
          p.node.arguments = p.node.arguments.slice(0, 1);
          droppedPreload++;
        }
      }
      // 4) worker 路径 由 NewExpression 单独处理
    },
    NewExpression(p) {
      // new URL("/assets/worldShapes.worker-xxx.js", import.meta.url)
      if (t.isIdentifier(p.node.callee, { name: 'URL' }) && p.node.arguments.length) {
        const first = p.node.arguments[0];
        if (t.isStringLiteral(first) && first.value.includes('worldShapes.worker')) {
          p.node.arguments[0] = t.stringLiteral(
            relImport(info.out, 'src/workers/world-shapes.worker.js'),
          );
        }
      }
    },
  });

  const header = `/**
 * ${info.title} —— 由线上 bundle（${file}）反编译整理
 * ${info.note}
 * 说明：变量/函数名仍是压缩后的短名；三方库请从 ../vendor/*.js 引入。
 */
`;
  const out = generate(ast, { comments: true, jsescOption: { minimal: true } }, code);
  fs.mkdirSync(path.dirname(outAbs(info.out)), { recursive: true });
  fs.writeFileSync(outAbs(info.out), header + out.code + '\n');
  HEADERS[info.out] = { file, ...info };
  log.push({ file: info.out, renamed: renamedCount, droppedPreload, bytes: out.code.length });
}

// ---------- 三方库 ----------
const runtimeName = Object.fromEntries(
  Object.entries(VENDOR).map(([file, v]) => [file, path.basename(v.rt)]),
);

for (const [file, v] of Object.entries(VENDOR)) {
  const code = fs.readFileSync(path.join(SRC, file), 'utf8');
  // 三方库之间原本互相引用旧文件名，这里统一改成 *_runtime.js
  let body = code;
  for (const [orig, newName] of Object.entries(runtimeName)) {
    body = body.replaceAll(`"./${orig}"`, `"./${newName}"`).replaceAll(`'./${orig}'`, `'./${newName}'`);
  }
  const outCode = `/**
 * ${v.pkg} 运行时（线上打包产物，未改动）
 * 原文件：${file}
 * 业务代码不要直接 import 这个文件，请用同目录的 wrapper。
 */
${body}`;
  fs.mkdirSync(path.dirname(outAbs(v.rt)), { recursive: true });
  fs.writeFileSync(outAbs(v.rt), outCode);
  log.push({ file: v.rt, bytes: body.length });
}

// rapier 的 wasm 用 new URL("rapier_wasm3d_bg-xxx.wasm", import.meta.url) 加载，
// 把文件放到运行时同目录，Vite 构建时会自动改成带 hash 的资源路径。
fs.copyFileSync(
  path.join(SRC, 'rapier_wasm3d_bg-u8gCVdJH.wasm'),
  path.join(PROJ, 'src/vendor/rapier_wasm3d_bg-u8gCVdJH.wasm'),
);

// wrapper
function writeWrapper(v, header, exportsLines) {
  const lines = [
    '/**',
    ` * ${v.pkg} —— 导出名还原层`,
    ` * 运行时本体：${path.basename(v.rt)}（压缩产物，未改动）`,
    ' * 这里把压缩后的导出别名映射回官方名字，业务代码统一从本文件 import。',
    ' */',
    `export * from './${path.basename(v.rt)}'`,
    '',
  ];
  if (exportsLines.length) {
    lines.push('// 官方名字 → 压缩别名');
    for (const l of exportsLines) lines.push(l);
  }
  fs.writeFileSync(outAbs(v.wrapper), lines.join('\n') + '\n');
}

const threeOfficial = Object.entries(THREE_MAP).sort((a, b) => a[1].localeCompare(b[1]));
writeWrapper(
  VENDOR['three-CPLjTyt2.js'],
  'three.js',
  threeOfficial.map(([alias, official]) => `export { ${alias} as ${official} } from './three-runtime.js'`),
);

const reactOfficial = [
  ['r', 'React'],
  ['j', 'jsxRuntime'],
  ['R', 'ReactDOM'],
  ['a', 'useEffect'],
  ['u', 'useThree'],
  ['d', 'useLoader'],
  ['f', 'extend'],
  ['p', 'useLoaderPreload'],
  ['e', 'useLoaderClear'],
];
writeWrapper(
  VENDOR['react-TjmrQZ_z.js'],
  'react.js',
  reactOfficial.map(([alias, official]) => `export { ${alias} as ${official} } from './react-runtime.js'`),
);

writeWrapper(VENDOR['gsap-DdWnu9fz.js'], 'gsap.js', [`export { g as gsap } from './gsap-runtime.js'`]);
writeWrapper(VENDOR['rapier-DpitnbkN.js'], 'rapier.js', []);
writeWrapper(VENDOR['postfx-GwtP5Agz.js'], 'postfx.js', []);

// worker 原样拷贝
fs.mkdirSync(path.join(PROJ, 'src/workers'), { recursive: true });
fs.copyFileSync(
  path.join(SRC, 'worldShapes.worker-CW9xYs6r.js'),
  path.join(PROJ, 'src/workers/world-shapes.worker.js'),
);

console.log('生成文件：');
for (const r of log) console.log(`  ${r.file.padEnd(46)} ${String(r.bytes).padStart(8)}B  renamed=${r.renamed ?? '-'} preloadDrop=${r.droppedPreload ?? '-'}`);
console.log(`\nthree official exports: ${threeOfficial.length}`);
console.log(`worker copied -> src/workers/world-shapes.worker.js`);
