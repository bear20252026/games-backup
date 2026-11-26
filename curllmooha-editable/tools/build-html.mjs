// 复制线上 HTML，只替换构建产物路径 → 源码路径。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJ = path.resolve(__dirname, '..');
const SRC = path.resolve(PROJ, '..', 'curllmooha_source');

const pages = [
  ['index.html', 'index.html'],
  ['hire/index.html', 'hire/index.html'],
  ...['polify', 'aera', 'brickblaster', 'hologram', 'paper-boat', 'golden-hour', 'cosmic-bloom'].map((s) => [
    `work/${s}/index.html`,
    `work/${s}/index.html`,
  ]),
];

const replaceMain = (html) => {
  let out = html;
  out = out.replaceAll('/assets/main-BnGm-0-m.js', '/src/main.js');
  out = out.replaceAll('/assets/main-CueL5vI8.css', '/src/styles/main.css');
  // 预加载表指向的是旧构建产物文件名，源码工程里由 Vite 接管，这里清空
  out = out.replace(/var preloads = \[[^\]]*\]/, 'var preloads = []');
  // Vite 看不到运行时拼出来的 <script src>，这里用内联 module 包一层动态 import，
  // 既让 Rollup 把 main.js 纳入构建图，又保留「等首帧画完再启动」的时序。
  out = out.replace(
    '<link rel="stylesheet" crossorigin href="/src/styles/main.css">',
    `<link rel="stylesheet" crossorigin href="/src/styles/main.css">
  <script type="module">
    // 由 index.html 的 boot 脚本在首帧绘制完成后调用，避免进入构建图就被立即执行
    window.__meadowEntry = () => import('/src/main.js')
  </script>`,
  );
  out = out.replace(
    /var script = document\.createElement\('script'\)\s*\n\s*script\.type = 'module'\s*\n\s*script\.crossOrigin = ''\s*\n\s*script\.src = "\/src\/main\.js"\s*\n\s*document\.head\.appendChild\(script\)/,
    `if (window.__meadowEntry) {
          window.__meadowEntry()
          return
        }
        var script = document.createElement('script')
        script.type = 'module'
        script.crossOrigin = ''
        script.src = '/src/main.js'
        document.head.appendChild(script)`,
  );
  return out;
};

const replaceFlat = (html) => html.replaceAll('/assets/flat-D6JHTwaK.js', '/src/pages/flat.js');

for (const [from, to] of pages) {
  let html = fs.readFileSync(path.join(SRC, from), 'utf8');
  html = from === 'index.html' ? replaceMain(html) : replaceFlat(html);
  const dest = path.join(PROJ, to);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html);
  console.log(`html: ${from} -> ${to}  ${(html.length / 1024).toFixed(1)}KB`);
}

// 样式：原样搬入，加一段说明头
const css = fs.readFileSync(path.join(SRC, 'assets', 'main-CueL5vI8.css'), 'utf8');
fs.mkdirSync(path.join(PROJ, 'src/styles'), { recursive: true });
fs.writeFileSync(
  path.join(PROJ, 'src/styles/main.css'),
  `/*!
 * 全站样式 —— 由线上 bundle（assets/main-CueL5vI8.css）反编译整理
 * 设计语言：clay（黏土）拟物，浅色纸面 + 凸凹阴影 + 橙色强调。
 * 结构大致为：字体 @font-face → 设计令牌(:root) → 基础层 → HUD/菜单 → 各场景组件 → 移动端适配。
 * 版权归 Vipin Pathak 所有，仅供学习研究。
 */
${css}`,
);
console.log(`css : src/styles/main.css  ${(css.length / 1024).toFixed(1)}KB`);
