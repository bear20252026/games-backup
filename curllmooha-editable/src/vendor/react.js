/**
 * react + react-dom + @react-three/fiber —— 导出名还原层
 * 运行时本体：react-runtime.js（压缩产物，未改动）
 * 这里把压缩后的导出别名映射回官方名字，业务代码统一从本文件 import。
 */
export * from "./react-runtime.js";

// 官方名字 → 压缩别名
export { r as React } from "./react-runtime.js";
export { j as jsxRuntime } from "./react-runtime.js";
export { R as ReactDOM } from "./react-runtime.js";
export { a as useEffect } from "./react-runtime.js";
export { u as useThree } from "./react-runtime.js";
export { d as useLoader } from "./react-runtime.js";
export { f as extend } from "./react-runtime.js";
export { p as useLoaderPreload } from "./react-runtime.js";
export { e as useLoaderClear } from "./react-runtime.js";
