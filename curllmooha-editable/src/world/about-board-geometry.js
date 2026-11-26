/**
 * 看板几何体与材质 —— 由线上 bundle（aboutBoardGeometry-DcaOtMwp.js）反编译整理
 * 与 AboutBoard 配套的几何/材质生成与预构建。
 * 说明：变量/函数名仍是压缩后的短名；三方库请从 ../vendor/*.js 引入。
 */
import {
  CylinderGeometry,
  Shape,
  ExtrudeGeometry,
  Vector3,
  bB as P,
  LatheGeometry,
  Vector2,
  b8 as W,
  CatmullRomCurve3,
  TubeGeometry,
  aF as T,
  BufferAttribute,
  Matrix4,
  Color,
} from "../vendor/three.js";
import { m as R } from "../main.js";
import { m as o0, p as n0, a as r0 } from "./ivy-leaf.js";
import "../data/projects.js";
import "../vendor/react.js";
import "../vendor/rapier.js";
import "../vendor/gsap.js";
const p = Object.freeze({
    centerY: 1.55,
    width: 1.92,
    height: 1.066,
    frontZ: 0.09,
  }),
  V = Object.freeze({
    x: 0,
    y: 2.215,
    z: 0.27,
  }),
  s0 = Object.freeze({
    x: 1.22,
    y: 2.15,
    z: 0.06,
  }),
  r = {
    ridgeY: 2.6,
    pitch: 0.5,
    slope: 0.6,
    width: 2.54,
  },
  y0 = Object.freeze({
    top: r.ridgeY + 0.035 + 0.0275,
    half: r.width / 2,
  }),
  _ = 0.5;
let O = null;
function z0() {
  O || (O = N());
}
function b0() {
  const s = O ?? N();
  return ((O = null), s);
}
function N() {
  const s = {
      structure: [],
      frame: [],
      panel: [],
      roof: [],
      iron: [],
      ivy: [],
    },
    f = R(25482168877);
  function n(o, e, a, d = 0.014, c = 0, h = 2) {
    const M = new P(...e, h, d);
    return (M.rotateZ(c).translate(...a), s[o].push(M), M);
  }
  function m(o, e, a, d = 16) {
    const c = new CatmullRomCurve3(e.map((h) => new Vector3(...h)));
    s[o].push(new TubeGeometry(c, d, a, 5, !1));
  }
  for (const o of [-1, 1])
    (n("structure", [0.16, 2.27, 0.17], [o * 0.87, 1.135, -0.035], 0.02),
      n("iron", [0.185, 0.1, 0.195], [o * 0.87, 0.2, -0.035], 0.008),
      n(
        "structure",
        [0.085, 0.4, 0.12],
        [o * 0.72, 0.85, -0.08],
        0.012,
        o * 0.62,
      ));
  n("structure", [2.04, 1.19, 0.065], [0, p.centerY, -0.045]);
  const i = (p.height - 3 * 0.006) / 4;
  for (let o = 0; o < 4; o++) {
    const e = p.centerY - p.height / 2 + i / 2 + o * (i + 0.006);
    n("panel", [p.width, i, 0.09], [0, e, p.frontZ - 0.045], 0.01);
  }
  for (const o of [-1, 1]) {
    (n("frame", [0.12, 1.3, 0.16], [o * 1.02, p.centerY, 0.045], 0.022),
      n("frame", [2.16, 0.11, 0.17], [0, p.centerY + o * 0.605, 0.045], 0.02));
    for (const e of [p.centerY - 0.5, p.centerY + 0.5]) {
      const a = new CylinderGeometry(0.017, 0.02, 0.014, 10);
      (a.rotateX(Math.PI / 2).translate(o * 1.02, e, 0.13), s.iron.push(a));
    }
  }
  (n("frame", [2.24, 0.05, 0.23], [0, p.centerY - 0.668, 0.06], 0.018),
    n("structure", [2.26, 0.1, 0.2], [0, 2.27, -0.02], 0.016),
    n(
      "structure",
      [r.width + 0.06, 0.07, 0.08],
      [0, r.ridgeY - 0.035, 0],
      0.02,
    ));
  const z = Math.sin(r.pitch) * _,
    w = new Shape();
  (w.moveTo(-Math.cos(r.pitch) * _, r.ridgeY - z - 0.03),
    w.lineTo(Math.cos(r.pitch) * _, r.ridgeY - z - 0.03),
    w.lineTo(0, r.ridgeY - 0.03),
    w.closePath());
  for (const o of [-1, 1]) {
    const e = new ExtrudeGeometry(w, {
      depth: 0.04,
      bevelEnabled: !1,
    });
    (e.rotateY(Math.PI / 2).translate(o * 1.12 - 0.02, 0, 0),
      s.structure.push(e.index ? e.toNonIndexed() : e));
  }
  for (const o of [1, -1]) {
    const e = r.pitch * o,
      a = new Vector3(0, -Math.sin(r.pitch), Math.cos(r.pitch) * o),
      d = new Vector3(0, Math.cos(r.pitch), Math.sin(r.pitch) * o),
      c = new Vector3(0, r.ridgeY, 0),
      h = (g, G, y, b = 0) => {
        const x = c.clone().addScaledVector(a, G).addScaledVector(d, y);
        g.rotateX(e).translate(b + x.x, x.y, x.z);
      },
      M = new P(r.width, 0.035, r.slope, 1, 0.01);
    (h(M, r.slope / 2, -0.012), s.structure.push(M));
    const u = 0.19,
      A = Math.ceil(r.width / u);
    for (let g = 0; g < 3; g++) {
      const G = g * 0.165;
      for (let y = 0; y < A; y++) {
        const b = g % 2 ? u / 2 : 0,
          x = -2.54 / 2 + u / 2 + y * u + b;
        if (x > r.width / 2 - u * 0.3) continue;
        const I = 0.24 + (f() - 0.5) * 0.035 + (g === 2 ? 0.04 : 0),
          Y = new P(u - 0.014, 0.022, I, 1, 0.006);
        (Y.rotateY((f() - 0.5) * 0.06),
          h(Y, G + I / 2, 0.012 + g * 0.011, x),
          s.roof.push(Y));
      }
    }
  }
  (n("frame", [r.width + 0.1, 0.055, 0.13], [0, r.ridgeY + 0.035, 0], 0.024),
    n("iron", [0.075, 0.075, 0.014], [V.x, 2.285, 0.087], 0.006),
    n("iron", [0.022, 0.022, 0.2], [V.x, 2.285, 0.175], 0.006),
    n("iron", [0.016, 0.03, 0.016], [V.x, V.y + 0.058, V.z], 0.004));
  const S = new LatheGeometry(
    [
      [0.002, 0.043],
      [0.034, 0.037],
      [0.057, 0.019],
      [0.066, 0.001],
      [0.079, 0.001],
      [0.074, 0.024],
      [0.046, 0.047],
      [0.002, 0.056],
    ].map(([o, e]) => new Vector2(o, e)),
    20,
  );
  (S.translate(V.x, V.y, V.z), s.iron.push(S));
  const l = s0;
  return (
    n("iron", [0.012, 0.085, 0.065], [1.086, 2.16, l.z], 0.004),
    n("iron", [0.17, 0.018, 0.018], [1.165, 2.19, l.z], 0.005),
    m(
      "iron",
      [
        [l.x, 2.19, l.z],
        [l.x + 0.004, 2.168, l.z],
        [l.x - 0.01, l.y + 0.002, l.z],
        [l.x + 0.012, l.y - 0.004, l.z],
      ],
      0.005,
      10,
    ),
    d0(s),
    Object.fromEntries(
      Object.entries(s).map(([o, e]) => {
        const a = e.map((c) => (c.index ? c.toNonIndexed() : c));
        a.forEach((c) => c.clearGroups());
        const d = W(a);
        return (
          new Set([...e, ...a]).forEach((c) => c.dispose()),
          d.computeBoundingBox(),
          d.computeBoundingSphere(),
          [o, d]
        );
      }),
    )
  );
}
const c0 = new Color(r0),
  a0 = new Vector3(0, 1, 0);
function i0(s, f) {
  const n = s.attributes.position.count,
    m = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) f.toArray(m, i * 3);
  return (s.setAttribute("color", new BufferAttribute(m, 3)), s);
}
const C = new Vector3(),
  k = new Vector3(),
  v = new Vector3(),
  L = new Matrix4();
function l0(s, f, n, m, i) {
  const z = o0(i);
  return (
    v.copy(f).normalize(),
    k.copy(n).addScaledVector(v, -n.dot(v)).normalize(),
    C.crossVectors(k, v),
    L.makeBasis(C, k, v)
      .scale(new Vector3(m, m, m))
      .setPosition(s),
    z.applyMatrix4(L)
  );
}
function d0(s) {
  const f = R(444472911),
    n = (e) => (f() - 0.5) * e,
    m = (e) => n0(f, e);
  function i(
    e,
    a,
    d,
    { spacing: c = 0.05, sizeFrom: h = 0.1, sizeTo: M = 0.06 } = {},
  ) {
    const u = new CatmullRomCurve3(e),
      A = new TubeGeometry(u, Math.max(8, e.length * 6), d, 5, !1);
    s.ivy.push(i0(A, c0));
    const g = u.getLength(),
      G = Math.floor(g / c);
    for (let y = 1; y <= G; y++) {
      const b = y / (G + 0.6),
        x = u.getPointAt(b),
        I = u.getTangentAt(b),
        Y = a(x, b),
        B = y % 2 ? 1 : -1,
        E = new Vector3().crossVectors(I, Y).normalize(),
        H = x
          .clone()
          .addScaledVector(E, B * 0.014)
          .addScaledVector(Y, 0.008),
        U = Y.clone()
          .addScaledVector(a0, 0.35 + n(0.3))
          .addScaledVector(E, B * 0.25 + n(0.2)),
        Z = new Vector3(0, -0.6, 0)
          .addScaledVector(E, B * (0.75 + n(0.3)))
          .addScaledVector(Y, 0.35),
        D = T.lerp(h, M, b) * (0.82 + f() * 0.36);
      s.ivy.push(l0(H, U, Z, D, m(b)));
    }
    return u;
  }
  const z = new Vector3(-0.93, 0, 0.02),
    w = [];
  for (let e = 0; e <= 22; e++) {
    const a = e / 22,
      d = 0.02 + a * 2.17,
      c = T.lerp(0.135, 0.168, T.smoothstep(d, 0.72, 0.98)),
      h = Math.PI * (0.72 + 0.3 * Math.sin(a * Math.PI * 2.6 + 0.4)) + n(0.12);
    w.push(new Vector3(z.x + Math.cos(h) * c, d, z.z + Math.sin(h) * c));
  }
  const S = (e) => new Vector3(e.x - z.x, 0, e.z - z.z).normalize();
  i(w, S, 0.011, {
    spacing: 0.042,
    sizeFrom: 0.115,
    sizeTo: 0.07,
  });
  const l = w.at(-1);
  i(
    [
      l,
      new Vector3(-0.96, 2.245, 0.15),
      new Vector3(-0.84, 2.262, 0.128),
      new Vector3(-0.7, 2.25, 0.128),
      new Vector3(-0.56, 2.266, 0.122),
      new Vector3(-0.47, 2.255, 0.12),
    ],
    () => new Vector3(0, -0.15, 1).normalize(),
    0.007,
    {
      spacing: 0.048,
      sizeFrom: 0.08,
      sizeTo: 0.05,
    },
  );
  const o = w[9];
  (i(
    [
      o,
      new Vector3(-0.93, o.y - 0.04, 0.19),
      new Vector3(-0.86, 0.905, 0.2),
      new Vector3(-0.77, 0.9, 0.195),
      new Vector3(-0.71, 0.87, 0.2),
    ],
    () => new Vector3(0, 0.1, 1).normalize(),
    0.006,
    {
      spacing: 0.05,
      sizeFrom: 0.08,
      sizeTo: 0.055,
    },
  ),
    i(
      [
        new Vector3(-1.12, 0.02, 0.06),
        new Vector3(-1.04, 0.07, 0.14),
        new Vector3(-0.93, 0.05, 0.19),
        new Vector3(-0.82, 0.03, 0.2),
      ],
      (e) =>
        S(e)
          .add(new Vector3(0, 0.6, 0))
          .normalize(),
      0.008,
      {
        spacing: 0.055,
        sizeFrom: 0.11,
        sizeTo: 0.09,
      },
    ));
}
export {
  s0 as CHIME_HOOK,
  V as LAMP,
  p as PANEL,
  y0 as RIDGE,
  N as createAboutBoardGeometry,
  z0 as prebuildAboutBoardGeometry,
  b0 as takeAboutBoardGeometry,
};
