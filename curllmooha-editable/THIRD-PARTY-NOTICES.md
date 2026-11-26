# 第三方组件与许可说明

本工程是 curllmooha.com 线上构建产物的反编译重建，保留了原站打包进去的第三方运行时（`src/vendor/*-runtime.js`）。按线上 bundle 中的版权头与可识别版本整理，已知组件如下。若需商用，请以各项目官方许可原文为准。

| 组件 | 位置 | 版本 / 识别依据 | 许可 |
|---|---|---|---|
| three.js（含 GLTFLoader、DRACOLoader 等 addons） | `src/vendor/three-runtime.js` | r174（bundle 内 `REVISION="174"`） | MIT |
| React / ReactDOM | `src/vendor/react-runtime.js` | React 19.0.0（运行时可读到 `version`） | MIT |
| @react-three/fiber | `src/vendor/react-runtime.js` | 与 React 同 chunk | MIT |
| GSAP | `src/vendor/gsap-runtime.js` | 打包版 | GreenSock Standard License（多数场景免费，特定商业用途需商业授权，见 gsap.com/licensing） |
| Rapier 3D | `src/vendor/rapier-runtime.js` + `rapier_wasm3d_bg-*.wasm` | @dimforge/rapier3d-compat | Apache-2.0 |
| postprocessing (pmndrs) | `src/vendor/postfx-runtime.js` | 打包版 | Zlib |
| Microsoft Clarity | `src/lib/clarity.js`、`index-ghQi_28l.js` 对应的封装 | 线上统计服务 | 微软服务条款（非开源组件） |
| Nunito | `public/assets/nunito-*.woff2` | 字体 | SIL Open Font License 1.1 |
| Inter Tight | `public/assets/inter-tight-*.woff2` | 字体 | SIL Open Font License 1.1 |
| Bebas Neue | `public/bebas-neue-v9-latin-regular.woff` | 字体 | SIL Open Font License 1.1 |
| Lilita One | `public/lilita-one-uppercase.typeface.json` | 3D 文字用字体 | SIL Open Font License 1.1 |
| Vite | 构建工具（`package.json`） | v6 | MIT |

## 站点自身内容

站点代码、文案、贴图、模型、视频、项目截图等版权归 **Vipin Pathak（curllmooha）** 所有。原站未附 LICENSE，默认保留所有权利。

本工程仅用于本地研究、学习其 three.js 场景组织、着色器写法与首屏加载优化；请勿直接商用或公开再发布。需要授权请通过站内邮箱联系作者。

## 说明

- `src/vendor/*-runtime.js` 是原站打包后的第三方代码，**未做逻辑修改**，只在文件头加了来源注释、并改写了库与库之间的相对引用文件名。
- `src/vendor/*.js`（无 `-runtime` 后缀）是本工程生成的导出名还原层，不含第三方实现。
- 若替换其中任一 runtime，请同步更新 wrapper 中的导出别名映射，否则业务代码会找不到符号。
