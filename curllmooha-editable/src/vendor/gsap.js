/**
 * gsap —— 导出名还原层
 * 运行时本体：gsap-runtime.js（压缩产物，未改动）
 * 这里把压缩后的导出别名映射回官方名字，业务代码统一从本文件 import。
 */
export * from "./gsap-runtime.js";

// 官方名字 → 压缩别名
export { g as gsap } from "./gsap-runtime.js";
