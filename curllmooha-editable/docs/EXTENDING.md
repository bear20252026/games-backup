# 扩展与修改指南

这份工程是按 chunk 反编译重建的，**业务代码可以正常改、正常加**。下面三类操作在 2026-11-24 用临时副本实测过（没有改动交付工程本身），结果都通过了构建和浏览器运行。

## 一、改文案 / 样式 / 数据（最安全）

| 目标 | 文件 | 说明 |
|---|---|---|
| 首页文案、meta、JSON-LD | `index.html` | 内联 boot 脚本不要动 |
| 接单页 / 作品页 | `hire/index.html`、`work/<slug>/index.html` | 样式内联在各自的 `<style>` 里 |
| 颜色、圆角、字体、阴影 | `src/styles/main.css` | 设计令牌集中在文件顶部 |
| 作品标题、封面、链接 | `src/data/projects.js` | 纯数据，改完刷新即可 |
| 贴图、模型、视频 | `public/assets/`、`public/work/<slug>/` | 代码里用 `/assets/...` 绝对路径引用 |

改完 `npm run dev` 直接看效果（CSS/JS 有 HMR），确认无误再 `npm run build`。

## 二、新增一个业务模块（实测通过）

1. 新建文件 `src/extensions/hello.js`：

```js
export default function hello() {
  const el = document.createElement('div');
  el.textContent = 'editable ✓';
  document.body.appendChild(el);
}
```

2. 在 `src/main.js` 头部（文件头注释之后）加两行：

```js
import hello from './extensions/hello.js';
hello();
```

3. `npm run build`，产物里会出现这段代码，运行后页面上能看到新增内容。

实测结果：新增的模块被 Rollup 正常打包，页面出现元素，控制台 0 报错。

> 更稳妥的做法是把扩展逻辑写成纯函数，在 main 的启动流程里调用；不要把大段新代码直接插进 `main.js` 中间，避免后续难维护。

## 三、新增一个页面（实测通过）

1. 新建 `lab/index.html`（可以复用 `/src/styles/main.css`）。
2. 在 `vite.config.js` 的 `pages` 对象里加一行：

```js
lab: 'lab/index.html',
```

3. 构建后访问 `/lab/` 即可。

实测结果：`/lab/` 返回 200，标题与 `h1` 正确，样式链路生效。

## 四、扩展 three.js 场景对象

- 统一从 `src/vendor/three.js` 引入，**不要另装一份 three**，否则会出现两个 three 实例（`instanceof` 判断、矩阵/材质都不共享）。

```js
import { Mesh, BoxGeometry, MeshStandardMaterial } from '../vendor/three.js';
```

- 场景装配集中在 `src/main.js`，可以搜索 `scene.add(`、`useEffect(`、`new Group` 找到挂载点；某个分区专属的东西优先加到对应 `src/scenes/*.js`。
- 新写着色器时直接沿用原站的写法（`ShaderMaterial` + GLSL 模板字符串），构建不需要额外插件。

## 五、已知边界与坑

1. **变量名是压缩后的短名**（`w`、`Ue`、`$n`）。改之前先 `git init` 提交基线，用编辑器的“查找引用”确认作用域，别按字面意思猜。
2. **`src/main.js` 是一个 4 万多行的大模块**，作者原本的组件边界已被打包抹掉，不要再试图把它拆成几十个文件；新功能放独立模块再 import。
3. **`src/vendor/*-runtime.js` 是压缩后的库本体，不要改**。要升级库，请整块替换 runtime 并同步改 wrapper 的导出映射。
4. **JSX 支持**：现有代码是编译后的 `jsxRuntime.jsx(...)` 调用。想直接写 JSX，需要在 `vite.config.js` 里加 `esbuild: { jsx: 'automatic' }`，或安装 `@vitejs/plugin-react`（会同时带来 Fast Refresh）。
5. **React 组件级热更新没装插件**，改 `.js` 会整页刷新；CSS 是即时热更新。
6. **新增静态资源**：`public/` 下的文件按绝对路径访问；被 JS `import` 的资源走 Vite 的资源管线，会带 hash。两者不要混用同一个路径。
7. **改 Worker** 后必须重新 `npm run build`，开发服务器不会自动重打包 Worker 的产物路径。
8. 新增页面必须登记到 `vite.config.js` 的 `pages`，否则不会产出 HTML。

## 六、本次扩展实测记录

在临时副本（`%TEMP%\curllmooha-exttest`）上做了三项修改：

| 修改 | 验证方式 | 结果 |
|---|---|---|
| 首页 `<title>` 改为 `EDITABLE TEST · curllmooha` | 读构建后的 `dist/index.html` + 浏览器 `document.title` | 通过 |
| 新增 `src/extensions/hello.js` 并在 `main.js` import | 浏览器检查 `#ext-hello` 元素 | 出现，`editable ✓`，0 报错 |
| 新增 `lab/index.html` 并注册到多页配置 | 访问 `/lab/` | 200，`h1 = LAB PAGE OK`，样式生效 |

截图：`docs/img/extension-home.png`（左下角是新增模块）、`docs/img/extension-lab.png`（新增页面）。

测试完成后临时副本已删除，交付工程保持原样。
