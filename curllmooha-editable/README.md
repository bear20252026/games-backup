# curllmooha.com · 可编辑重建工程

这是对 <https://www.curllmooha.com/> 线上版本的**反编译重建工程**，不是作者原始的 `.jsx` 源码。

线上只发布了 Vite 打包后的产物（`main-BnGm-0-m.js` 760,804 字节），**没有 sourcemap**（`.map` 全部 403），所以无法直接取回工程源码。本工程把 bundle 按 chunk 拆回模块、把三方库和业务代码分离、把压缩导出别名还原成官方名字，并用一份新的 Vite 配置重新构建成和线上几乎同尺寸的分包。

- 原站技术栈：React 19 + @react-three/fiber + three.js r174 + Rapier（物理）+ GSAP + postprocessing
- 重建后构建产物：`main` 771.5 KB / `three` 698.8 KB / `react` 339.6 KB / `rapier` 134.6 KB / `postfx` 303.2 KB / CSS 142.9 KB，与线上逐项对齐（线上 760.8 / 698.8 / 339.9 / 137.5 / 303.3 / 143.0 KB）

## 快速运行

需要 HTTP 服务（ES Module 不能用 `file://` 打开）：

```bash
npm install          # 只装 vite
npm run dev          # http://127.0.0.1:8899
npm run build        # 产物在 dist/
npm run preview      # 预览构建产物
node tools/serve.js dist 8899   # 零依赖静态服务器
```

Windows 下可直接双击 `run.bat`（内部同样是 `npm run dev`）。

## 目录结构

```
index.html                 首页骨架 + 首帧 boot 编排（原内联脚本原样保留）
hire/index.html            接单页
work/<slug>/index.html     7 个作品页（polify / aera / brickblaster / hologram / paper-boat / golden-hour / cosmic-bloom）
src/
  main.js                  主入口与草甸场景（41,656 行）：启动、设备分级、角色控制、HUD、分区懒加载
  scenes/                  5 个场景分区：windborne-sketchbook / project-screens / contact-pond / about-board / weather-stage
  world/                   胶片后期、看板几何、常春藤叶片、图片预解码
  pages/flat.js            平面页脚本（按钮磁吸、进场动画）
  data/projects.js         作品元数据
  lib/clarity.js           Microsoft Clarity 封装
  workers/world-shapes.worker.js   地形生成 Worker（独立 IIFE）
  styles/main.css          全站样式（7,423 行，clay 拟物设计令牌）
  vendor/
    three.js               three r174 导出名还原层（71 个类名，如 Vector3 / Mesh / BufferGeometry）
    three-runtime.js       线上 three 运行时代码，未改动
    react.js               React 19 + react-dom + R3F 导出名还原层
    react-runtime.js       线上 react chunk，未改动
    gsap.js / postfx.js / rapier.js   其余三方库的还原层
    *-runtime.js           对应运行时本体
public/assets/             贴图、glb 模型、字体、项目视频（保留原 hash 文件名，代码里按绝对路径引用）
public/work/<slug>/        作品页的视频与 1600px 预览图
public/draco/              GLTF 的 Draco 解码器（模型用到，线上也是运行时才拉取）
tools/                     一次性反编译脚本、零依赖服务器、无头验证脚本
```

## 还原了什么

1. **模块边界**：原来的 16 个 chunk 拆成业务模块，模块间 `import` 与 9 处 `import()` 全部改写成源码路径。
2. **三方库导出名**：三个库的导出名在线上被压成 `H`、`aF`、`g` 这样的别名。通过扫描 three 每个类的 `isXxx` 标记（`this.isVector3` / `this.type="BufferGeometry"`）恢复出 71 个官方类名，React 侧按运行时行为识别出 `React`、`jsxRuntime`、`ReactDOM`、`useEffect`、`useThree`、`useLoader`、`extend` 等。业务代码里 `new Vector3(...)` 现在出现 400+ 处，`jsxRuntime.jsx(...)` 1000+ 处。
3. **预加载表**：删掉了 Vite 注入的 `__vite__mapDeps` 资源表及其 9 处调用参数；重建时由 Vite 自己生成。
4. **Worker**：原来用绝对路径字符串加载，改成 `new Worker(new URL("./workers/world-shapes.worker.js", import.meta.url))`，纳入构建图。
5. **入口时序**：首页原本是 boot 脚本在首帧画完后动态插 `<script>` 拉起 bundle。构建器看不到这种运行时字符串，于是加了一层 `window.__meadowEntry = () => import('/src/main.js')` 的内联 module 桥，既让 main 进入构建图，又保留“等首帧再启动”的原有时序。
6. **多页构建**：恢复了 `/hire/` 与 6 个 `/work/` 页面的独立入口（原站是构建时多页配置 + 内联样式）。

## 保真度与限制

- **变量名仍是压缩短名**。没有 sourcemap 时，`const w=v.useMemo(...)` 这类局部名不可逆，只能恢复模块边界和三方库的导出名；这是无损的边界。
- 三方库本体（`*-runtime.js`）一个字节没改，只加文件头注释，保证运行时行为与线上一致；`react-runtime.js`、`postfx-runtime.js` 内部互相引用的 chunk 文件名有改写（指向新的 runtime 文件名）。
- 样式是原 `main-CueL5vI8.css` 原样搬入后格式化的结果（142.9 KB vs 线上 143.0 KB）。
- 首页 `index.html` 的 boot 脚本、JSON-LD、meta 全部保留；只改了 CSS 链接、main 入口和预加载数组。
- 构建目标设为 `es2022`，与线上一致使用 ES Module。

## 已验证

- `npm run build` 通过，产出 9 个页面与和线上同尺寸的分包。
- 无头 Chrome（SwiftShader 软件 WebGL）实测：`/`、`/hire/`、`/work/polify/`、`/work/hologram/` 均 **0 控制台报错、0 个 404**，首页 canvas 正常拿到 1440×900，加载进度条与原站镜像同步推进（软件渲染下都停在 40% 附近，属性能限制，非代码问题）。
- 与原站镜像逐帧对比：首屏蒲公英 boot 画面、进度文案、配色一致。

## 可编辑性与扩展

这不是只读的快照，改代码能进构建、能上线：

- 改文案/样式/数据：`index.html`、`src/styles/main.css`、`src/data/projects.js`
- 加功能：新建 `src/extensions/*.js`，在 `src/main.js` 里 import 即可
- 加页面：新建目录里的 `index.html`，在 `vite.config.js` 的 `pages` 注册
- 加 three 对象：统一从 `src/vendor/three.js` 引入（别另装 three）

2026-11-24 在临时副本做过一轮实测：改首页标题、新增模块（页面出现 `editable ✓` 徽标）、新增 `/lab/` 页面，三项全部构建通过、浏览器 0 报错。

详细步骤、坑位与实测记录见 `docs/EXTENDING.md`；三方组件许可见 `THIRD-PARTY-NOTICES.md`。

## 版权

站点代码版权归 **Vipin Pathak**（curllmooha）所有，仓库未附 LICENSE。本工程仅用于本地研究、学习其 three.js 场景组织、着色器与首屏性能优化写法；请勿直接商用或二次发布。需要授权请通过站内邮箱联系作者。
