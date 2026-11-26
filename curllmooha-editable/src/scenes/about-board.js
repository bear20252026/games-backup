/**
 * 关于看板（场景分区） —— 由线上 bundle（AboutBoard-Cf6sITsG.js）反编译整理
 * 自述展板、灯光与风铃交互。
 * 说明：变量/函数名仍是压缩后的短名；三方库请从 ../vendor/*.js 引入。
 */
import { React, useEffect, jsxRuntime } from "../vendor/react.js";
import {
  takeAboutBoardGeometry as Ke,
  RIDGE as re,
  PANEL as b,
  LAMP as $,
  CHIME_HOOK as J,
} from "../world/about-board-geometry.js";
import {
  BufferGeometry,
  BufferAttribute,
  Sphere,
  Vector3,
  Color,
  aT as Ze,
  MeshBasicMaterial,
  MeshStandardMaterial,
  bx as $e,
  by as Je,
  bz as Qe,
  bA as et,
  H as tt,
  CanvasTexture,
  S as De,
  DataTexture,
  R as nt,
  Vector2,
  aF as ue,
  TorusGeometry,
  CylinderGeometry,
  ExtrudeGeometry,
  ShapeGeometry,
  LatheGeometry,
  b8 as rt,
  b3 as ve,
  CircleGeometry,
  SphereGeometry,
  Shape,
  PlaneGeometry,
} from "../vendor/three.js";
import {
  k as ie,
  c as je,
  m as Ue,
  F as ut,
  H as dt,
  J as ft,
  K as ht,
  u as Le,
  M as pt,
  b as mt,
  C as gt,
  ae as xt,
  af as wt,
  w as Q,
  h as bt,
  G as vt,
} from "../main.js";
import { m as ee, A as H, l as ce } from "../data/projects.js";
import "../world/ivy-leaf.js";
import "../vendor/rapier.js";
import "../vendor/gsap.js";
const Mt = `
    attribute float aSize;
    attribute float aPhase;
    attribute float aSpeed;
    uniform float uTime;
    uniform float uPixelRatio;
    uniform float uDrift;
    varying float vTwinkle;
    void main() {
        vec3 drifted = position;
        drifted.x += sin(uTime * aSpeed + aPhase) * 0.09 * uDrift;
        drifted.y += sin(uTime * aSpeed * 0.73 + aPhase * 1.7) * 0.07 * uDrift;
        drifted.z += cos(uTime * aSpeed * 0.61 + aPhase * 2.3) * 0.05 * uDrift;
        vec4 viewPosition = modelViewMatrix * vec4(drifted, 1.0);
        gl_Position = projectionMatrix * viewPosition;
        gl_PointSize = aSize * uPixelRatio / max(-viewPosition.z, 0.25);
        vTwinkle = 0.55 + 0.45 * sin(uTime * (0.7 + aSpeed) + aPhase * 3.1);
    }
`,
  St = `
    uniform vec3 uColor;
    uniform float uOpacity;
    varying float vTwinkle;
    void main() {
        // Soft round core with a halo that truly reaches zero before the quad
        // edge, so the sprite never shows its corners.
        float d = length(gl_PointCoord - 0.5) * 2.0;
        float falloff = 1.0 - smoothstep(0.0, 1.0, d);
        float alpha = falloff * falloff * uOpacity * vTwinkle;
        if (alpha < 0.004) discard;
        gl_FragColor = vec4(uColor * (0.35 + falloff * 0.65), alpha);
        #include <colorspace_fragment>
    }
`;
function yt({
  count: t = 12,
  scale: e = [1, 1, 1],
  size: a = 26,
  color: s = "#f5deb0",
  opacity: o = 0.3,
  seed: n = 20949,
  ...i
}) {
  const l = React.useRef(),
    c = je ? Math.round(t * 0.6) : t,
    r = React.useMemo(() => {
      const h = Ue(n),
        m = new Float32Array(c * 3),
        w = new Float32Array(c),
        y = new Float32Array(c),
        T = new Float32Array(c);
      for (let g = 0; g < c; g += 1)
        ((m[g * 3] = (h() - 0.5) * e[0]),
          (m[g * 3 + 1] = (h() - 0.5) * e[1]),
          (m[g * 3 + 2] = (h() - 0.5) * e[2]),
          (w[g] = a * (0.55 + h() * 0.75)),
          (y[g] = h() * Math.PI * 2),
          (T[g] = 0.25 + h() * 0.45));
      const d = new BufferGeometry();
      return (
        d.setAttribute("position", new BufferAttribute(m, 3)),
        d.setAttribute("aSize", new BufferAttribute(w, 1)),
        d.setAttribute("aPhase", new BufferAttribute(y, 1)),
        d.setAttribute("aSpeed", new BufferAttribute(T, 1)),
        (d.boundingSphere = new Sphere(
          new Vector3(),
          Math.max(e[0], e[1], e[2]),
        )),
        d
      );
    }, [c, a, n, e[0], e[1], e[2]]);
  React.useEffect(() => () => r.dispose(), [r]);
  const u = React.useMemo(
    () => ({
      uTime: {
        value: 0,
      },
      uPixelRatio: {
        value: Math.min(typeof window > "u" ? 1 : window.devicePixelRatio, 2),
      },
      uColor: {
        value: new Color(s),
      },
      uOpacity: {
        value: o,
      },
      uDrift: {
        value: ie ? 0 : 1,
      },
    }),
    [s, o],
  );
  return (
    useEffect((h) => {
      l.current &&
        ((l.current.uniforms.uTime.value = h.clock.elapsedTime),
        (l.current.uniforms.uDrift.value = ie ? 0 : 1));
    }),
    jsxRuntime.jsx("points", {
      ...i,
      geometry: r,
      children: jsxRuntime.jsx("shaderMaterial", {
        ref: l,
        vertexShader: Mt,
        fragmentShader: St,
        uniforms: u,
        transparent: !0,
        depthWrite: !1,
        blending: Ze,
        toneMapped: !1,
      }),
    })
  );
}
const Me = [-0.92, -0.38, 0.24, 0.86].map(
    (t) => new Vector3(t * re.half, re.top, 0),
  ),
  Se = new Vector3(),
  Et = "/lilita-one-uppercase.typeface.json",
  Fe = "THE MEADOW KEEPER",
  At = "CURLLMOOHA",
  Ct = "VIPIN PATHAK  ·  CREATIVE DEVELOPER",
  Ve = ["i make small worlds inside browsers —", "this meadow is one of them."],
  te = "#35261b",
  L = "#5c3f29",
  Tt =
    "M25.2 10.3C22.6 5.1 15.4 3.2 10 6.7 4.9 10 4.5 17.7 8.2 22.7c3.7 5 11.2 5.4 15.5 1.4 3.5-3.2 3.4-8.8 0-11.5-3.2-2.5-8-1.9-10.2 1.4-1.9 2.8-.3 6.6 2.9 7.1 2.7.5 5.2-1.7 4.8-4.3-.3-1.8-2.2-2.8-3.8-2.1-1 .4-1.6 1.5-1.3 2.5";
function F(t, e = 22, a = 0.82) {
  const s = new DataTexture(new Uint8Array([128, 128, 128, 255]), 1, 1, nt);
  s.needsUpdate = !0;
  const o = new MeshStandardMaterial({
    color: t,
    roughness: a,
    metalness: 0,
    bumpMap: s,
    bumpScale: 0.11,
  });
  return (
    (o.userData.bumpTexture = s),
    (o.onBeforeCompile = (n) => {
      ((n.uniforms.uWoodGrain = {
        value: e,
      }),
        (n.uniforms.uWoodKnot = {
          value: new Vector2(Math.sin(e) * 0.42, Math.cos(e * 1.7) * 0.06),
        }),
        (n.vertexShader = n.vertexShader
          .replace(
            "#include <common>",
            `#include <common>
varying vec3 vWoodPosition;`,
          )
          .replace(
            "#include <begin_vertex>",
            `#include <begin_vertex>
vWoodPosition = position;`,
          )),
        (n.fragmentShader = n.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
varying vec3 vWoodPosition;
uniform float uWoodGrain;
uniform vec2 uWoodKnot;
float woodHash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float woodNoise(vec2 p) {
    vec2 cell = floor(p);
    vec2 local = fract(p);
    local = local * local * (3.0 - 2.0 * local);
    float a = woodHash(cell);
    float b = woodHash(cell + vec2(1.0, 0.0));
    float c = woodHash(cell + vec2(0.0, 1.0));
    float d = woodHash(cell + vec2(1.0, 1.0));
    return mix(mix(a, b, local.x), mix(c, d, local.x), local.y);
}
float woodHeight(vec3 p) {
    float broadWarp = sin(p.x * 2.2) * 0.075 + sin(p.x * 6.7) * 0.018;
    broadWarp += (woodNoise(p.xz * 2.4) - 0.5) * 0.055;
    float ring = sin((p.y + broadWarp) * uWoodGrain);
    float fineGrain = sin((p.y + broadWarp * 0.45) * uWoodGrain * 2.7);
    vec2 knotCenter = uWoodKnot;
    vec2 knotSpace = vec2(p.x - knotCenter.x, (p.y - knotCenter.y) * 4.2);
    float knotDistance = length(knotSpace);
    float knotMask = exp(-knotDistance * 4.0);
    float knotRings = sin(knotDistance * 48.0 - p.x * 1.5) * knotMask;
    return ring * 0.58 + fineGrain * 0.2 + knotRings * 0.72;
}`,
          )
          .replace(
            "#include <color_fragment>",
            `#include <color_fragment>
float woodRelief = woodHeight(vWoodPosition);
float woodPore = woodNoise(vWoodPosition.xy * vec2(5.0, 34.0));
float woodTone = 0.94 + woodRelief * 0.058 - (woodPore - 0.5) * 0.045;
diffuseColor.rgb *= woodTone;`,
          )
          .replace(
            "#include <roughnessmap_fragment>",
            `#include <roughnessmap_fragment>
float woodRoughnessVariation = woodNoise(vWoodPosition.xy * vec2(3.0, 18.0));
roughnessFactor *= 0.9 + woodRoughnessVariation * 0.12;`,
          )
          .replace(
            "#include <normal_fragment_maps>",
            `#ifdef USE_BUMPMAP
float proceduralWoodHeight = woodHeight(vWoodPosition);
vec2 proceduralWoodSlope = vec2(dFdx(proceduralWoodHeight), dFdy(proceduralWoodHeight));
normal = perturbNormalArb(-vViewPosition, normal, proceduralWoodSlope * 0.095, faceDirection);
#endif`,
          )));
    }),
    (o.customProgramCacheKey = () => "meadow-wood-v2"),
    o
  );
}
function ye(t, e, a, s, o) {
  const n = [...e],
    i = n.map((r) => t.measureText(r).width),
    l = i.reduce((r, u) => r + u, 0) + o * (n.length - 1);
  let c = a - l / 2;
  return (
    (t.textAlign = "left"),
    n.forEach((r, u) => {
      (t.fillText(r, c, s), (c += i[u] + o));
    }),
    l
  );
}
function Ee(t) {
  const e = t.getContext("2d"),
    a = t.width,
    s = t.height,
    o = a / b.width;
  (e.clearRect(0, 0, a, s),
    (e.textBaseline = "middle"),
    (e.lineCap = "round"),
    (e.lineJoin = "round"),
    (e.fillStyle = te),
    (e.font = `400 ${0.076 * o}px "Bebas Neue", "Arial Narrow", sans-serif`));
  const n = 0.17 * o,
    i = ye(e, Fe, a / 2, n, 0.02 * o);
  ((e.strokeStyle = L), (e.globalAlpha = 0.8), (e.lineWidth = 2.6));
  for (const u of [-1, 1]) {
    const h = a / 2 + u * (i / 2 + 0.03 * o);
    (e.beginPath(),
      e.moveTo(h, n - 0.003 * o),
      e.lineTo(h + u * 0.1 * o, n - 0.003 * o),
      e.stroke());
  }
  ((e.globalAlpha = 1),
    (e.fillStyle = te),
    (e.font = `400 ${0.09 * o}px "Bebas Neue", "Arial Narrow", sans-serif`),
    ye(e, Ct, a / 2, 0.625 * o, 0.01 * o));
  const l = 0.705 * o;
  ((e.fillStyle = L),
    (e.strokeStyle = L),
    (e.globalAlpha = 0.65),
    (e.lineWidth = 2),
    e.beginPath(),
    e.moveTo(a / 2 - 0.15 * o, l),
    e.lineTo(a / 2 - 0.022 * o, l),
    e.moveTo(a / 2 + 0.022 * o, l),
    e.lineTo(a / 2 + 0.15 * o, l),
    e.stroke(),
    e.beginPath(),
    e.moveTo(a / 2, l - 0.011 * o),
    e.lineTo(a / 2 + 0.011 * o, l),
    e.lineTo(a / 2, l + 0.011 * o),
    e.lineTo(a / 2 - 0.011 * o, l),
    e.closePath(),
    e.fill(),
    (e.globalAlpha = 1),
    (e.fillStyle = te),
    (e.globalAlpha = 0.9),
    (e.textAlign = "center"),
    (e.font = `600 ${0.056 * o}px Nunito, "Avenir Next", "Segoe UI", sans-serif`),
    Ve.forEach((u, h) => {
      e.fillText(u, a / 2, (0.858 + h * 0.08) * o);
    }),
    (e.globalAlpha = 1));
  const c = 0.085 * o;
  (e.save(),
    e.translate(a - 0.07 * o - c, s - 0.07 * o - c),
    e.scale(c / 32, c / 32),
    (e.strokeStyle = L),
    (e.globalAlpha = 0.9),
    (e.lineWidth = 3.1),
    e.stroke(new Path2D(Tt)),
    (e.fillStyle = "#b4532f"),
    e.beginPath(),
    e.arc(17.2, 17.2, 1.7, 0, Math.PI * 2),
    e.fill(),
    e.restore());
  const r = Ue(700583);
  e.globalCompositeOperation = "destination-out";
  for (let u = 0; u < 900; u++)
    ((e.globalAlpha = 0.18 + r() * 0.4),
      e.beginPath(),
      e.arc(r() * a, r() * s, 0.5 + r() * 1.8, 0, Math.PI * 2),
      e.fill());
  e.lineWidth = 1.2;
  for (let u = 0; u < 70; u++) {
    const h = r() * a,
      m = r() * s;
    ((e.globalAlpha = 0.14 + r() * 0.2),
      e.beginPath(),
      e.moveTo(h, m),
      e.lineTo(h + 20 + r() * 90, m + (r() - 0.5) * 3),
      e.stroke());
  }
  ((e.globalCompositeOperation = "source-over"), (e.globalAlpha = 1));
}
function Pt() {
  const t = React.useMemo(() => {
    const e = document.createElement("canvas");
    ((e.width = 2048),
      (e.height = Math.round(2048 * (b.height / b.width))),
      Ee(e));
    const a = new CanvasTexture(e);
    return ((a.colorSpace = De), (a.anisotropy = 8), a);
  }, []);
  return (
    React.useEffect(() => {
      let e = !0;
      return (
        Promise.all([
          document.fonts.load('400 72px "Bebas Neue"', Fe),
          document.fonts.load("600 60px Nunito", Ve[0]),
        ])
          .catch(() => {})
          .then(() => {
            e && (Ee(t.image), (t.needsUpdate = !0));
          }),
        () => {
          e = !1;
        }
      );
    }, [t]),
    React.useEffect(() => () => t.dispose(), [t]),
    jsxRuntime.jsxs("mesh", {
      position: [0, b.centerY, b.frontZ + 0.002],
      renderOrder: 1,
      children: [
        jsxRuntime.jsx("planeGeometry", {
          args: [b.width, b.height],
        }),
        jsxRuntime.jsx("meshStandardMaterial", {
          map: t,
          transparent: !0,
          depthWrite: !1,
          roughness: 0.72,
          metalness: 0,
          polygonOffset: !0,
          polygonOffsetFactor: -2,
        }),
      ],
    })
  );
}
function Rt({ material: t }) {
  const e = React.useRef(),
    a = 1,
    s = 0.28,
    o = 0.07;
  return (
    React.useLayoutEffect(() => {
      const n = e.current;
      if (!n) return;
      n.geometry.computeBoundingBox();
      const i = n.geometry.boundingBox,
        l = i.max.x - i.min.x,
        c = i.max.y - i.min.y,
        r = Math.min(1.52 / l, 0.25 / c);
      (n.scale.setScalar(r),
        n.position.set(
          -(i.min.x + l / 2) * r,
          b.centerY + b.height / 2 - 0.38 - (i.min.y + c / 2) * r,
          b.frontZ + o * r,
        ));
    }, []),
    jsxRuntime.jsx(xt, {
      ref: e,
      font: Et,
      size: a,
      height: s,
      curveSegments: je ? 3 : 5,
      bevelEnabled: !0,
      bevelThickness: o,
      bevelSize: 0.035,
      bevelSegments: 2,
      material: t,
      castShadow: !0,
      receiveShadow: !0,
      children: At,
    })
  );
}
function zt() {
  const t = document.createElement("canvas");
  ((t.width = 256), (t.height = Math.round(256 * (b.height / b.width))));
  const e = t.getContext("2d"),
    { width: a, height: s } = t;
  ((e.fillStyle = "#000"),
    e.fillRect(0, 0, a, s),
    e.translate(a / 2, -s * 0.14),
    e.scale(1.9, 1));
  const o = e.createRadialGradient(0, 0, 0, 0, 0, s * 1.05);
  (o.addColorStop(0, "rgba(255,255,255,1)"),
    o.addColorStop(0.35, "rgba(255,255,255,0.62)"),
    o.addColorStop(0.72, "rgba(255,255,255,0.14)"),
    o.addColorStop(1, "rgba(255,255,255,0)"),
    (e.fillStyle = o),
    e.fillRect(-a, 0, a * 2, s * 2));
  const n = new CanvasTexture(t);
  return ((n.colorSpace = De), n);
}
const _t = new Color("#ffc27a");
function Ot({ material: t }) {
  return jsxRuntime.jsxs("group", {
    position: [$.x, $.y, $.z],
    children: [
      jsxRuntime.jsx("mesh", {
        position: [0, 0.008, 0],
        material: t,
        children: jsxRuntime.jsx("sphereGeometry", {
          args: [0.03, 16, 10],
        }),
      }),
      jsxRuntime.jsx("sprite", {
        material: wt(),
        position: [0, -0.018, 0],
        scale: [0.34, 0.34, 1],
      }),
    ],
  });
}
const K = [0.4, 0.355, 0.315, 0.28, 0.25],
  v = -0.1,
  Ae = v - 0.012,
  Ce = 0.062,
  _ = 0.015,
  N = 0.03,
  S = 0.21,
  oe = N + _,
  ne = new Color("#7a4f2c"),
  Wt = new Color("#5a3920"),
  It = new Color("#c99a58"),
  Ht = new Color("#8d6236"),
  Te = new Color("#7b5430"),
  kt = new Color("#24170d"),
  O = new Color("#3a2c21"),
  V = new Color("#b95c3a"),
  ae = new Color("#ecdfc2"),
  Dt = new Vector3(0, 1, 0),
  Bt = new Color(),
  Nt = new Vector3();
function Y(t) {
  const e = t.map(([s, o]) => {
      const n = s.index ? s.toNonIndexed() : s;
      n.clearGroups();
      const i = n.attributes.position,
        l = new Float32Array(i.count * 3);
      for (let c = 0; c < i.count; c += 1)
        (typeof o == "function"
          ? o(Nt.fromBufferAttribute(i, c), Bt)
          : o
        ).toArray(l, c * 3);
      return (n.setAttribute("color", new BufferAttribute(l, 3)), n);
    }),
    a = rt(e);
  return (new Set([...t.map(([s]) => s), ...e]).forEach((s) => s.dispose()), a);
}
const Gt = (t, e, a, s = 12) =>
    new CylinderGeometry(t, t, e, s).translate(0, a, 0),
  X = (t, e) => Gt(0.0016, t - e, (t + e) / 2, 4),
  Ye = (t, e = 0.0042) => new SphereGeometry(e, 6, 4).translate(0, t, 0),
  Pe = (t, e) => new SphereGeometry(e, 10, 7).translate(0, t, 0),
  Re = (t, e = 24) =>
    new LatheGeometry(t.map(([a, s]) => new Vector2(a, s)).reverse(), e),
  ze = 1.1;
function jt(t, e) {
  const s = -0.035 - t,
    o = e % 2 ? 0.02 : -0.018,
    n = It.clone().offsetHSL(0, 0, o),
    i = Ht.clone().offsetHSL(0, 0, o),
    l = (d, g) => {
      const R = ue.clamp((-0.035 - d.y) / t, 0, 1),
        M = Math.pow(Math.abs(R - 0.5) * 2, 2.2);
      return g.copy(n).lerp(i, M * 0.7);
    },
    c = new CylinderGeometry(_, _ * 1.04, t, 14, 6, !0).translate(
      0,
      -0.035 - t / 2,
      0,
    ),
    r = c.attributes.position,
    u = [];
  for (let d = 0; d < r.count; d += 1)
    Math.abs(r.getY(d) - s) > 1e-5 ||
      (r.setY(d, s + (r.getX(d) + _) * ze * 0.5), u.push(d));
  c.computeVertexNormals();
  const h = [],
    m = new Vector3(0, s + _ * ze * 0.5, 0),
    w = u
      .map((d) => new Vector3().fromBufferAttribute(r, d))
      .sort((d, g) => Math.atan2(d.z, d.x) - Math.atan2(g.z, g.x));
  for (let d = 0; d < w.length; d += 1) {
    const g = w[d],
      R = w[(d + 1) % w.length];
    h.push(m.x, m.y, m.z, g.x, g.y, g.z, R.x, R.y, R.z);
  }
  const y = new BufferGeometry();
  (y.setAttribute("position", new ve(h, 3)),
    y.setAttribute("uv", new ve(new Float32Array((h.length / 3) * 2), 2)),
    y.computeVertexNormals());
  const T = [
    [X(0, -0.035), O],
    [Ye(-0.035 + 0.004), O],
    [c, l],
    [y, kt],
    [
      new CircleGeometry(_, 14).rotateX(-Math.PI / 2).translate(0, -0.035, 0),
      Te,
    ],
  ];
  for (const d of t > 0.3 ? [0.3, 0.72] : [0.42])
    T.push([
      new TorusGeometry(_ * 1.02, 0.0028, 5, 16)
        .rotateX(Math.PI / 2)
        .translate(0, -0.035 - t * d, 0),
      Te,
    ]);
  return T;
}
function _e(t) {
  const e = new Shape();
  return (
    e.moveTo(0, 0),
    e.bezierCurveTo(0.05 * t, -0.02 * t, 0.045 * t, -0.1 * t, 0, -0.15 * t),
    e.bezierCurveTo(-0.045 * t, -0.1 * t, -0.05 * t, -0.02 * t, 0, 0),
    e
  );
}
const Oe = [-S - 0.05, -S - 0.075];
function Ut() {
  const t = Re([
      [1e-4, v + 0.05],
      [0.011, v + 0.047],
      [0.013, v + 0.036],
      [0.02, v + 0.03],
      [0.05, v + 0.022],
      [0.08, v + 0.01],
      [0.09, v + 0.002],
      [0.09, v - 0.008],
      [0.084, v - 0.013],
      [1e-4, v - 0.013],
    ]),
    e = Y([
      [X(0, v + 0.048), O],
      [new TorusGeometry(0.009, 0.0022, 5, 14).translate(0, 0.004, 0), O],
      [t, (m, w) => w.copy(ne).lerp(Wt, ue.smoothstep(m.y, v, v + 0.05) * 0.6)],
      [
        new CylinderGeometry(0.0905, 0.0905, 0.004, 32, 1, !0).translate(
          0,
          v - 0.003,
          0,
        ),
        V,
      ],
    ]),
    a = K.map((m, w) => Y(jt(m, w))),
    s = Re(
      [
        [1e-4, -S + 0.009],
        [N * 0.8, -S + 0.008],
        [N, -S + 0.003],
        [N, -S - 0.003],
        [N * 0.8, -S - 0.008],
        [1e-4, -S - 0.009],
      ],
      20,
    ),
    o = Y([
      [X(0, -S), O],
      [s, ne],
      [X(-S, -0.39), O],
      [Pe(Oe[0], 0.009), V],
      [Pe(Oe[1], 0.007), ae],
      [Ye(-0.39 + 0.003), O],
    ]),
    n = new ExtrudeGeometry(_e(1), {
      depth: 0.008,
      bevelEnabled: !0,
      bevelThickness: 0.0015,
      bevelSize: 0.0015,
      bevelSegments: 1,
      curveSegments: 10,
    }).translate(0, 0, -0.004),
    i = _e(0.55),
    l = new ShapeGeometry(i, 8).translate(0, -0.03, 0.0062),
    c = new ShapeGeometry(i, 8).rotateY(Math.PI).translate(0, -0.03, -0.0062),
    r = (m) =>
      new PlaneGeometry(0.0022, 0.07)
        .rotateY(m > 0 ? 0 : Math.PI)
        .translate(0, -0.07, m * 0.0065),
    u = Y([
      [n, ne],
      [l, V],
      [c, V],
      [r(1), ae],
      [r(-1), ae],
    ]),
    h = K.map((m, w) => {
      const y = (w / K.length) * Math.PI * 2 + 0.3;
      return {
        x: Math.cos(y) * Ce,
        z: Math.sin(y) * Ce,
      };
    });
  return {
    top: e,
    tubes: a,
    clapper: o,
    sail: u,
    ring: h,
  };
}
const We = () =>
  (Math.random() + Math.random() + Math.random() + Math.random() - 2) * 1.73;
function se(t, e, a, s, o, n) {
  ((t.vx += ((e - t.x) * s - t.vx * o) * n),
    (t.vz += ((a - t.z) * s - t.vz * o) * n),
    (t.x += t.vx * n),
    (t.z += t.vz * n));
}
const Lt = 3.8,
  Ft = 9,
  Ie = 0.24;
function Vt() {
  const t = React.useMemo(Ut, []),
    e = React.useMemo(
      () =>
        new MeshStandardMaterial({
          vertexColors: !0,
          roughness: 0.62,
          metalness: 0,
        }),
      [],
    ),
    a = React.useRef(),
    s = React.useRef(),
    o = React.useRef(),
    n = React.useRef([]),
    i = React.useMemo(
      () => ({
        root: {
          x: 0,
          z: 0,
          vx: 0,
          vz: 0,
        },
        clapper: {
          x: 0,
          z: 0,
          vx: 0,
          vz: 0,
        },
        tubes: K.map(() => ({
          x: 0,
          z: 0,
          vx: 0,
          vz: 0,
          struck: -1,
        })),
        air: {
          x: 0,
          z: 0,
        },
        wind: new Vector3(),
        welcomeArmed: !0,
      }),
      [],
    );
  return (
    React.useEffect(
      () => () => {
        ([t.top, t.clapper, t.sail, ...t.tubes].forEach((l) => l.dispose()),
          e.dispose());
      },
      [t, e],
    ),
    useEffect((l, c) => {
      if (ie || !a.current) return;
      const r = Math.min(c, 0.05),
        u = l.clock.elapsedTime,
        h = Le.getState(),
        m = h.windParameters.direction ?? 0,
        w = Math.cos(m),
        y = Math.sin(m),
        T = h.smoothedCircleCenter,
        g = ((H.x - T.x) * w + (H.z - T.z) * y - Q.gustOffset) / vt,
        R = Math.exp(-g * g) * Q.gustStrength,
        M = ue.smoothstep(R + Q.stormBlend * 0.7, 0.55, 1.35),
        W = i.wind.set(w, 0, y).applyAxisAngle(Dt, -ce),
        A = i.air,
        Z = r / 0.28,
        fe = Math.sqrt(2 * Z);
      ((A.x += -A.x * Z + We() * fe), (A.z += -A.z * Z + We() * fe));
      const he = h.ballPosition,
        pe = Math.hypot(he.x - H.x, he.z - H.z);
      if ((pe > Ft && (i.welcomeArmed = !0), i.welcomeArmed && pe < Lt)) {
        i.welcomeArmed = !1;
        const x = Math.random() * Math.PI * 2;
        ((i.clapper.vx += Math.cos(x) * Ie),
          (i.clapper.vz += Math.sin(x) * Ie),
          (i.root.vx += Math.cos(x) * 0.08),
          (i.root.vz += Math.sin(x) * 0.08));
      }
      const q = i.root;
      (se(
        q,
        W.x * M * 0.1 +
          A.x * M * 0.03 +
          Math.sin(u * 1.1) * 0.016 +
          Math.sin(u * 0.37) * 0.008,
        W.z * M * 0.1 + A.z * M * 0.03 + Math.sin(u * 0.8 + 1.3) * 0.012,
        16,
        2.4,
        r,
      ),
        a.current.rotation.set(-q.z, 0, q.x));
      const C = i.clapper,
        me = 0.004 + M * 0.022;
      (se(
        C,
        W.x * M * 0.012 + A.x * me,
        W.z * M * 0.012 + A.z * me,
        39,
        0.9,
        r,
      ),
        i.tubes.forEach((x) => {
          se(
            x,
            W.x * M * 0.004 + A.x * M * 0.003,
            W.z * M * 0.004 + A.z * M * 0.003,
            45,
            1.6,
            r,
          );
        }),
        i.tubes.forEach((x, k) => {
          const D = t.ring[k].x + x.x,
            ge = t.ring[k].z + x.z,
            xe = C.x - D,
            we = C.z - ge,
            G = Math.hypot(xe, we);
          if (G >= oe || G < 1e-6) return;
          const j = xe / G,
            U = we / G;
          ((C.x = D + j * oe), (C.z = ge + U * oe));
          const z = (C.vx - x.vx) * j + (C.vz - x.vz) * U;
          z >= 0 ||
            ((C.vx -= 1.4 * z * j),
            (C.vz -= 1.4 * z * U),
            (x.vx += z * j * 0.8),
            (x.vz += z * U * 0.8),
            -z > 0.03 &&
              u - x.struck > 0.09 &&
              ((x.struck = u), bt.playWindChime(k, -z / 0.25)));
        }),
        s.current.rotation.set(-C.z / S, 0, C.x / S),
        (o.current.rotation.y = A.x * M * 0.5 + Math.sin(u * 0.7) * 0.12),
        n.current.forEach((x, k) => {
          const D = i.tubes[k];
          x.rotation.set(-D.z / S, 0, D.x / S);
        }));
    }),
    jsxRuntime.jsxs("group", {
      ref: a,
      position: [J.x, J.y, J.z],
      children: [
        jsxRuntime.jsx("mesh", {
          geometry: t.top,
          material: e,
          castShadow: !0,
        }),
        t.tubes.map((l, c) =>
          jsxRuntime.jsx(
            "group",
            {
              ref: (r) => {
                n.current[c] = r;
              },
              position: [t.ring[c].x, Ae, t.ring[c].z],
              children: jsxRuntime.jsx("mesh", {
                geometry: l,
                material: e,
                castShadow: !0,
              }),
            },
            c,
          ),
        ),
        jsxRuntime.jsxs("group", {
          ref: s,
          position: [0, Ae, 0],
          children: [
            jsxRuntime.jsx("mesh", {
              geometry: t.clapper,
              material: e,
              castShadow: !0,
            }),
            jsxRuntime.jsx("mesh", {
              ref: o,
              geometry: t.sail,
              material: e,
              position: [0, -0.39, 0],
              castShadow: !0,
            }),
          ],
        }),
      ],
    })
  );
}
function eo() {
  const t = React.useMemo(Ke, []),
    e = React.useMemo(
      () => ({
        structure: F("#5e3d25", 24, 0.88),
        frame: F("#8a5a33", 28),
        panel: F("#ecdfc2", 19, 0.74),
        roof: F("#b95c3a", 36, 0.86),
        iron: new MeshStandardMaterial({
          color: "#2f2925",
          metalness: 0.55,
          roughness: 0.5,
        }),
        ivy: new MeshStandardMaterial({
          vertexColors: !0,
          roughness: 0.78,
          side: tt,
        }),
        name: new MeshStandardMaterial({
          color: "#3b2619",
          roughness: 0.58,
          metalness: 0,
        }),
        bulb: new MeshStandardMaterial({
          color: "#efe2c4",
          roughness: 0.4,
          emissive: "#ffc27a",
          emissiveIntensity: 0,
        }),
        wash: new MeshBasicMaterial({
          map: zt(),
          color: "#000000",
          transparent: !0,
          blending: et,
          blendEquation: Qe,
          blendSrc: Je,
          blendDst: $e,
          depthWrite: !1,
          toneMapped: !1,
        }),
      }),
      [],
    );
  React.useEffect(
    () => () => {
      (Object.values(t).forEach((o) => o.dispose()),
        Object.values(e).forEach((o) => {
          var n, i;
          ((n = o.userData.bumpTexture) == null || n.dispose(),
            (i = o.map) == null || i.dispose(),
            o.dispose());
        }));
    },
    [t, e],
  );
  const a = React.useRef(),
    s = React.useMemo(() => Me.map((o, n) => ut(`board:${n}`, "board")), []);
  return (
    React.useEffect(() => () => dt("board"), []),
    useEffect(() => {
      var l;
      const o = mt.night;
      ((e.bulb.emissiveIntensity = 0.03 + o * 2.4),
        e.wash.color.copy(_t).multiplyScalar(o * 1.6),
        (e.wash.visible = o > 0.01));
      const n = a.current;
      if (!n) return;
      n.getWorldScale(Se);
      const i =
        ((l = n.parent) == null ? void 0 : l.visible) !== !1 &&
        Math.abs(Se.y / ee - 1) < 0.03 &&
        ft(H.x, H.z, ht(Le.getState())) < pt;
      for (let c = 0; c < s.length; c += 1) {
        const r = s[c];
        ((r.present = i),
          i &&
            (n.localToWorld(r.position.copy(Me[c])),
            (r.yaw = ce),
            (r.turn = 0.35),
            (r.height = re.top * ee)));
      }
    }),
    jsxRuntime.jsxs("group", {
      ref: a,
      rotation: [0, ce, 0],
      scale: ee,
      children: [
        Object.entries(t).map(([o, n]) =>
          jsxRuntime.jsx(
            "mesh",
            {
              geometry: n,
              material: e[o],
              castShadow: o !== "panel",
              receiveShadow: !0,
            },
            o,
          ),
        ),
        jsxRuntime.jsx(Pt, {}),
        jsxRuntime.jsx(Rt, {
          material: e.name,
        }),
        jsxRuntime.jsx(Ot, {
          material: e.bulb,
        }),
        jsxRuntime.jsx(Vt, {}),
        jsxRuntime.jsx("mesh", {
          position: [0, b.centerY, b.frontZ + 0.004],
          material: e.wash,
          renderOrder: 2,
          children: jsxRuntime.jsx("planeGeometry", {
            args: [b.width, b.height],
          }),
        }),
        jsxRuntime.jsx(gt, {
          blobs: [
            {
              x: 0,
              z: 0,
              radius: 1.2,
              strength: 0.34,
            },
            {
              x: -0.87,
              z: 0,
              radius: 0.24,
              strength: 0.9,
            },
            {
              x: 0.87,
              z: 0,
              radius: 0.24,
              strength: 0.9,
            },
          ],
        }),
        jsxRuntime.jsx(yt, {
          count: 9,
          position: [0, 1.62, 0.36],
          scale: [2.3, 1.5, 0.5],
          size: 22,
          opacity: 0.2,
          color: "#f2ddb4",
        }),
      ],
    })
  );
}
export { eo as default };
