/**
 * 风之写生簿（场景分区） —— 由线上 bundle（WindborneSketchbook-BzsFNEj_.js）反编译整理
 * 草甸西侧悬浮画册区域的场景、材质与交互。
 * 说明：变量/函数名仍是压缩后的短名；三方库请从 ../vendor/*.js 引入。
 */
import {
  useThree,
  g as Fo,
  React,
  useEffect,
  jsxRuntime,
} from "../vendor/react.js";
import {
  MeshStandardMaterial,
  BoxGeometry,
  b8 as uo,
  PointsMaterial,
  aT as pe,
  MeshBasicMaterial,
  H as Pe,
  Color,
  Group,
  aF as M,
  Vector3,
  bo as Ko,
  b3 as Xo,
  Shape,
  ShapeGeometry,
  CanvasTexture,
  S as et,
  Z as Vt,
  BufferGeometry,
  BufferAttribute,
  ShaderMaterial,
  CatmullRomCurve3,
  TubeGeometry,
  bn as Qo,
  at as Kt,
  Bone,
  SkinnedMesh,
  aG as on,
} from "../vendor/three.js";
import {
  o as nn,
  v as wt,
  c as X,
  S as Ie,
  w as ce,
  u as rn,
  k as v,
  C as an,
  g as Ze,
  x as sn,
  R as cn,
  G as ln,
  z as ho,
} from "../main.js";
import { b as le } from "../data/projects.js";
import { D as un, u as pn } from "../world/decoded-images.js";
import "../vendor/rapier.js";
import "../vendor/gsap.js";
function dn(e, t, o, n = e) {
  const i = o ? Math.max(0, Math.cos(e)) : 0,
    a = o ? 0.009 * Math.min(1, Math.abs(n - e) / 0.12) : 0;
  return {
    depth: 0.008 - Math.min(t, 3) * 0.009 + i * 0.012 + a,
    bend: -Math.sin(e) * (0.055 + i * i * 0.32),
  };
}
function fn(e, t, o) {
  return e === 0
    ? 0
    : o *
        (Math.sin((Math.PI * e) / (t - 1)) -
          Math.sin((Math.PI * (e - 1)) / (t - 1)));
}
const T = 0.56,
  L = 0.72,
  hn = 0.0055,
  Xt = 1.23,
  mn = 1.65,
  Qe = 1.22,
  Yt = -0.24,
  mo = "#f8f6ee",
  de = "#ffd47b",
  gn = "#fff4cf",
  Zt = "#63372c",
  vn = "#39251e",
  Mn = [de, "#dcc69c"],
  St = Math.ceil(Ie.length / 2),
  go = ho.filter(Boolean),
  vo = ho.map((e) => (e ? go.indexOf(e) : -1)),
  fe = 30,
  Mo = T / fe,
  xt = 0.4,
  Jt = 1.15,
  bn = 6,
  O = {
    hidden: "hidden",
    turning: "turning",
    left: "left",
    right: "right",
    destination: "destination",
    underlay: "underlay",
  },
  yn = {
    [O.hidden]: 0,
    [O.underlay]: 1,
    [O.destination]: 2,
    [O.left]: 3,
    [O.right]: 3,
    [O.turning]: 4,
  },
  ue = {
    height: 0.3,
    radius: 0.0042,
    y: -0.012,
  },
  wn = [
    {
      y: 0.112,
      side: 1,
      length: 0.052,
      tilt: 0.62,
    },
    {
      y: 0.086,
      side: -1,
      length: 0.06,
      tilt: 0.58,
    },
    {
      y: 0.05,
      side: 1,
      length: 0.072,
      tilt: 0.52,
    },
    {
      y: 0.014,
      side: -1,
      length: 0.079,
      tilt: 0.48,
    },
    {
      y: -0.024,
      side: 1,
      length: 0.079,
      tilt: 0.46,
    },
    {
      y: -0.062,
      side: -1,
      length: 0.07,
      tilt: 0.44,
    },
    {
      y: -0.098,
      side: 1,
      length: 0.056,
      tilt: 0.42,
    },
  ],
  qt = 4.15,
  Qt = 8.5,
  Sn = 5.4,
  xn = 0.52,
  Pn = 0.022,
  En = 0.03,
  Tn = 0.028,
  Rn = 11,
  An = 13,
  Pt = 3.15,
  eo = 0.54,
  In = 0.92,
  te = X ? 40 : 72,
  Je = X ? 14 : 26,
  Et = X ? 1 : 2,
  Tt = [
    {
      position: [-0.9, 0.18, 0.32],
      rotation: [0.5, 0.1, 0.25],
      scale: 0.84,
    },
    {
      position: [-0.58, -0.34, -0.42],
      rotation: [1.2, 0.7, -0.4],
      scale: 0.62,
    },
    {
      position: [-0.18, 0.45, 0.5],
      rotation: [0.2, 1.1, 0.7],
      scale: 0.68,
    },
    {
      position: [0.34, -0.42, 0.45],
      rotation: [0.7, -0.5, 0.2],
      scale: 0.76,
    },
    {
      position: [0.7, 0.32, -0.38],
      rotation: [1.1, 0.4, -0.8],
      scale: 0.58,
    },
    {
      position: [0.96, -0.04, 0.2],
      rotation: [0.3, 0.9, 0.45],
      scale: 0.72,
    },
  ],
  bo = Array.from(
    {
      length: 7,
    },
    (e, t) => ({
      z: -0.015 + t * 0.0044,
      x: (((t * 7) % 5) - 2) * 0.0012,
      y: (((t * 11) % 7) - 3) * 8e-4,
      width: T - 0.02 + ((t % 3) - 1) * 0.003,
      height: L - 0.02 + (((t + 1) % 3) - 1) * 0.003,
      color: ["#e7dcc3", "#f1e7d2", "#ddd0b6"][t % 3],
    }),
  );
function _n(e) {
  const t = [],
    o = new Color(),
    n = (a, u, d, h, y) => {
      a.translate(d, h, y);
      const S = a.attributes.position.count,
        b = new Float32Array(S).fill(u),
        P = new Float32Array(S * 3);
      for (let G = 0; G < S; G += 1) o.toArray(P, G * 3);
      (a.setAttribute("aDeckleLayer", new BufferAttribute(b, 1)),
        a.setAttribute("color", new BufferAttribute(P, 3)),
        t.push(a));
    };
  bo.forEach((a, u) => {
    (o.set(a.color),
      n(new BoxGeometry(0.0035, a.height, 0.0022), u, e * (T + a.x), a.y, a.z));
    for (const d of [-1, 1])
      n(
        new BoxGeometry(a.width, 0.0035, 0.0022),
        u,
        e * T * 0.5 + a.x,
        d * (L * 0.5 + a.y),
        a.z,
      );
  });
  const i = uo(t);
  return (t.forEach((a) => a.dispose()), i);
}
function Cn() {
  const e = {
      uCreepHead: {
        value: 0.5,
      },
      uEmberHeat: {
        value: 0,
      },
    },
    t = new MeshStandardMaterial({
      vertexColors: !0,
      emissive: "#ff7a24",
      emissiveIntensity: 1,
      roughness: 1,
    });
  return (
    (t.userData.deckleUniforms = e),
    (t.onBeforeCompile = (o) => {
      ((o.uniforms.uCreepHead = e.uCreepHead),
        (o.uniforms.uEmberHeat = e.uEmberHeat),
        (o.vertexShader = o.vertexShader
          .replace(
            "#include <common>",
            `#include <common>
                attribute float aDeckleLayer;
                varying float vDeckleLayer;`,
          )
          .replace(
            "#include <begin_vertex>",
            `#include <begin_vertex>
                vDeckleLayer = aDeckleLayer;`,
          )),
        (o.fragmentShader = o.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
                varying float vDeckleLayer;
                uniform float uCreepHead;
                uniform float uEmberHeat;`,
          )
          .replace(
            "#include <emissivemap_fragment>",
            `#include <emissivemap_fragment>
                float deckleAlong =
                    vDeckleLayer / ${(bo.length - 1).toFixed(1)};
                float deckleCreep = exp(
                    -pow((deckleAlong - uCreepHead) / 0.26, 2.0)
                );
                totalEmissiveRadiance *=
                    uEmberHeat * (0.06 + deckleCreep * 0.62);`,
          )));
    }),
    (t.customProgramCacheKey = () => "windborne-deckle-creep-v1"),
    t
  );
}
function z(e, t, o) {
  const n = M.clamp((e - t) / Math.max(1e-4, o - t), 0, 1);
  return n * n * (3 - 2 * n);
}
function On(e) {
  const t = M.clamp(e, 0, 1),
    o = M.smoothstep(t, 0, 0.38) * 0.34,
    n = Math.pow(M.smoothstep(t, 0.26, 1), 1.55) * 0.66,
    i = Math.sin(t * Math.PI * 1.5) * Math.pow(1 - t, 3.4) * 0.028;
  return o + n + i;
}
function Gn() {
  const e = new BoxGeometry(T, L, hn, fe, 2);
  e.translate(T * 0.5, 0, 0);
  const t = e.attributes.position,
    o = new Vector3(),
    n = [],
    i = [];
  for (let a = 0; a < t.count; a += 1) {
    o.fromBufferAttribute(t, a);
    const u = M.clamp(o.x / Mo, 0, fe),
      d = Math.min(fe - 1, Math.floor(u)),
      h = u >= fe ? 1 : u - d;
    (n.push(d, d + 1, 0, 0), i.push(1 - h, h, 0, 0));
  }
  return (
    e.setAttribute("skinIndex", new Ko(n, 4)),
    e.setAttribute("skinWeight", new Xo(i, 4)),
    e
  );
}
function kn(e) {
  const t = T + 0.06,
    o = L + 0.06,
    n = new BoxGeometry(t, o, 0.018, 10, 12, 1),
    i = n.attributes.position;
  for (let a = 0; a < i.count; a += 1) {
    const u = i.getX(a),
      d = i.getY(a),
      h = u / (t * 0.5),
      y = d / (o * 0.5),
      S = Math.pow(Math.abs(h * y), 2.3),
      b = Math.pow(Math.max(0, e * h), 4),
      P = Math.sin(h * 4.8 + e * 0.7) * Math.cos(y * 4.1) * 0.0014;
    i.setZ(a, i.getZ(a) + S * 0.014 + b * 0.006 + P);
  }
  return (n.computeVertexNormals(), n);
}
function to(e) {
  const t = {
      uPaperNight: {
        value: 0,
      },
      uPaperMotion: {
        value: 0,
      },
      uMagicEnergy: {
        value: 0,
      },
      uMagicHead: {
        value: 0,
      },
    },
    o = new MeshStandardMaterial({
      map: e,
      color: "#ffffff",
      roughness: 0.96,
      metalness: 0,
    });
  return (
    (o.userData.paperUniforms = t),
    (o.onBeforeCompile = (n) => {
      ((n.uniforms.uPaperNight = t.uPaperNight),
        (n.uniforms.uPaperMotion = t.uPaperMotion),
        (n.vertexShader = n.vertexShader
          .replace(
            "#include <common>",
            `#include <common>
                varying vec2 vPaperUv;
                varying float vPaperAcross;`,
          )
          .replace(
            "#include <uv_vertex>",
            `#include <uv_vertex>
                vPaperUv = uv;
                vPaperAcross = clamp(position.x / ${T.toFixed(3)}, 0.0, 1.0);`,
          )),
        (n.fragmentShader = n.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
                varying vec2 vPaperUv;
                varying float vPaperAcross;
                uniform float uPaperNight;
                uniform float uPaperMotion;
                uniform float uMagicEnergy;
                uniform float uMagicHead;`,
          )
          .replace(
            "#include <aomap_fragment>",
            `#include <aomap_fragment>

                float paperHorizontalEdge = 1.0 - smoothstep(
                    0.015,
                    0.15,
                    min(vPaperUv.y, 1.0 - vPaperUv.y)
                );
                float paperOuterEdge = smoothstep(0.76, 0.985, vPaperAcross);
                float paperEdge = max(paperHorizontalEdge, paperOuterEdge);
                float paperGrazing = pow(
                    1.0 - saturate(dot(normal, geometryViewDir)),
                    2.15
                );
                vec2 paperFibreCell = floor(vPaperUv * vec2(190.0, 245.0));
                float paperFibreNoise = fract(
                    sin(dot(paperFibreCell, vec2(12.9898, 78.233))) *
                    43758.5453
                );
                float paperFibres = 0.95 + paperFibreNoise * 0.05;

                float paperTransmission =
                    uPaperNight *
                    (0.032 + paperEdge * 0.06 + paperGrazing * 0.03) +
                    uPaperMotion *
                    (0.008 + paperEdge * 0.035 + paperGrazing * 0.02);
                vec3 paperWarmth = mix(
                    diffuseColor.rgb,
                    vec3(1.0, 0.68, 0.34),
                    0.18 + paperEdge * 0.24
                );
                totalEmissiveRadiance +=
                    paperWarmth * paperTransmission * paperFibres;

                // A narrow enchanted chase stays attached to the skinned
                // outer page edge, so the light bends with the paper instead
                // of floating through it as a separate effect mesh.
                float magicOuterEdge = smoothstep(
                    0.82,
                    0.995,
                    vPaperAcross
                );
                float magicChase = exp(
                    -pow((vPaperUv.y - uMagicHead) / 0.075, 2.0)
                );
                float magicFibre = 0.7 + paperFibreNoise * 0.3;
                vec3 magicEdgeColor = mix(
                    vec3(1.0, 0.54, 0.15),
                    vec3(0.26, 0.88, 1.0),
                    0.22 + magicChase * 0.72
                );
                totalEmissiveRadiance +=
                    magicEdgeColor *
                    uMagicEnergy *
                    magicOuterEdge *
                    (0.12 + magicChase * 1.75) *
                    magicFibre;`,
          )));
    }),
    (o.customProgramCacheKey = () => "windborne-paper-lighting-v3"),
    o
  );
}
function Dn(e, t, o) {
  const n = [];
  for (let d = 0; d <= fe; d += 1) {
    const h = new Bone();
    ((h.position.x = d === 0 ? 0 : Mo), d > 0 && n[d - 1].add(h), n.push(h));
  }
  const i = new MeshStandardMaterial({
      color: "#e0d4b8",
      emissive: "#ff8a34",
      emissiveIntensity: 0,
      roughness: 0.98,
      metalness: 0,
    }),
    a = [i, i, i, i, to(t), to(o)],
    u = new SkinnedMesh(e, a);
  return (
    (u.castShadow = !0),
    (u.receiveShadow = !0),
    (u.frustumCulled = !1),
    u.add(n[0]),
    u.bind(new on(n)),
    u
  );
}
const Rt = 0.085,
  oo = 0.075,
  yo = 0.135;
function jn(e, t, o, n) {
  const i = o * Rt,
    a = n * oo,
    u = o - i * 2,
    d = n * (1 - oo - yo),
    h = Math.min(u / t.width, d / t.height),
    y = t.width * h,
    S = t.height * h,
    b = i + (u - y) * 0.5,
    P = a + (d - S) * 0.5;
  (e.save(),
    (e.shadowColor = "rgba(74, 58, 32, 0.28)"),
    (e.shadowBlur = o * 0.028),
    (e.shadowOffsetY = n * 0.008),
    (e.fillStyle = "#ffffff"),
    e.fillRect(b, P, y, S),
    e.restore(),
    e.drawImage(t, b, P, y, S),
    (e.strokeStyle = "rgba(78, 62, 38, 0.22)"),
    (e.lineWidth = Math.max(1, o * 0.002)),
    e.strokeRect(b, P, y, S));
}
const q = 'Nunito, "Avenir Next", system-ui, sans-serif';
function Un(e, t, o, n) {
  if (!t) return;
  const i = o * Rt,
    a = o - i * 2,
    u = n * (1 - yo) + n * 0.028,
    d = Math.round(n * 0.034);
  (e.save(),
    (e.textBaseline = "top"),
    (e.font = `800 ${d}px ${q}`),
    (e.fillStyle = "rgba(146, 108, 62, 0.9)"));
  const h = `${t.number}`;
  e.fillText(h, i, u);
  const y = e.measureText(`${h}  `).width;
  ((e.font = `700 ${d}px ${q}`), (e.fillStyle = "rgba(66, 52, 36, 0.92)"));
  const S = t.title.toLowerCase().split(" "),
    b = [""];
  for (const P of S) {
    const G = b[b.length - 1] ? `${b[b.length - 1]} ${P}` : P;
    e.measureText(G).width > a - y && b[b.length - 1]
      ? b.push(P)
      : (b[b.length - 1] = G);
  }
  (b.slice(0, 2).forEach((P, G) => {
    e.fillText(P, i + y, u + G * d * 1.22);
  }),
    e.restore());
}
function no(e, t, o) {
  const n = [""];
  for (const i of t.split(" ")) {
    const a = n[n.length - 1] ? `${n[n.length - 1]} ${i}` : i;
    e.measureText(a).width > o && n[n.length - 1]
      ? n.push(i)
      : (n[n.length - 1] = a);
  }
  return n;
}
function Nn(e, t, o, n) {
  if (!t) return;
  const i = o * Rt * 1.4,
    a = o - i * 2;
  let u = n * 0.2;
  (e.save(), (e.textBaseline = "top"));
  const d = Math.round(n * 0.16);
  ((e.font = `800 ${d}px ${q}`),
    (e.fillStyle = "rgba(146, 108, 62, 0.5)"),
    e.fillText(t.number, i - d * 0.04, u),
    (u += d * 1.08),
    (e.fillStyle = "rgba(146, 108, 62, 0.55)"),
    e.fillRect(i, u, o * 0.12, Math.max(2, n * 0.004)),
    (u += n * 0.045));
  const h = Math.round(n * 0.052);
  ((e.font = `800 ${h}px ${q}`), (e.fillStyle = "rgba(66, 52, 36, 0.94)"));
  for (const P of no(e, t.title.toLowerCase(), a).slice(0, 3))
    (e.fillText(P, i, u), (u += h * 1.18));
  u += n * 0.03;
  const y = Math.round(n * 0.034);
  ((e.font = `600 ${y}px ${q}`), (e.fillStyle = "rgba(92, 74, 52, 0.82)"));
  const S = no(e, t.line, a),
    b = Math.floor((n * 0.9 - u) / (y * 1.42));
  (S.slice(0, b).forEach((P, G) => {
    const me = G === b - 1 && S.length > b;
    (e.fillText(me ? `${P.replace(/\s+\S*$/, "")}…` : P, i, u),
      (u += y * 1.42));
  }),
    e.restore());
}
function ro(e, t, o) {
  const n = e.getContext("2d", {
    willReadFrequently: !0,
  });
  ((n.fillStyle = mo),
    n.fillRect(0, 0, e.width, e.height),
    t
      ? (jn(n, t, e.width, e.height), Un(n, o, e.width, e.height))
      : Nn(n, o, e.width, e.height));
}
function wo(e, t) {
  const o = document.createElement("canvas");
  ((o.width = 448), (o.height = 576), ro(o, e, t));
  const n = new CanvasTexture(o);
  return (
    (n.userData.repaint = () => ro(o, e, t)),
    (n.colorSpace = et),
    (n.wrapS = Kt),
    (n.wrapT = Kt),
    (n.needsUpdate = !0),
    n
  );
}
const ao = new WeakMap(),
  zn = () => new Promise((e) => setTimeout(e, 0));
function Ln(e) {
  let t = ao.get(e);
  if (
    (t ||
      ((t = {
        status: "pending",
        faces: null,
        endpaper: null,
        promise: null,
      }),
      (t.promise = (async () => {
        const o = [];
        for (let n = 0; n < Ie.length; n += 1)
          (o.push(wo(e[vo[n]] ?? null, Ie[n])), n % 2 === 1 && (await zn()));
        ((t.endpaper = So()), (t.faces = o), (t.status = "ready"));
      })().catch(() => {
        t.status = "failed";
      })),
      ao.set(e, t)),
    t.status === "pending")
  )
    throw t.promise;
  return t.status === "ready" ? t : null;
}
function So() {
  const e = document.createElement("canvas");
  ((e.width = 448), (e.height = 576));
  const t = e.getContext("2d"),
    o = t.createLinearGradient(0, 0, e.width, e.height);
  (o.addColorStop(0, "#f9f2de"),
    o.addColorStop(0.52, "#eee2c6"),
    o.addColorStop(1, "#dbcaa8"),
    (t.fillStyle = o),
    t.fillRect(0, 0, e.width, e.height));
  const n = new CanvasTexture(e);
  return ((n.colorSpace = et), (n.needsUpdate = !0), n);
}
const xo = T - 0.07,
  Po = L - 0.07,
  so = 1024;
function io(e) {
  const t = e.getContext("2d"),
    o = e.width,
    n = e.height;
  ((t.fillStyle = "#000"),
    t.fillRect(0, 0, o, n),
    (t.fillStyle = "#fff"),
    (t.strokeStyle = "#fff"),
    (t.lineJoin = "round"),
    (t.textAlign = "center"),
    (t.textBaseline = "alphabetic"));
  const i = (a, u, d, h) => {
    ((t.lineWidth = o * h), t.strokeText(a, u, d), t.fillText(a, u, d));
  };
  ((t.font = `800 ${Math.round(o * 0.158)}px ${q}`),
    "letterSpacing" in t && (t.letterSpacing = `${-o * 0.002}px`),
    i("sketches", o / 2, n * 0.178, 0.003),
    (t.font = `800 ${Math.round(o * 0.062)}px ${q}`),
    "letterSpacing" in t && (t.letterSpacing = `${o * 0.006}px`),
    i("curllmooha", o / 2, n * 0.855, 0.0025),
    (t.font = `700 ${Math.round(o * 0.032)}px ${q}`),
    "letterSpacing" in t && (t.letterSpacing = `${o * 0.005}px`),
    i(`webgl studies · ${Ie.length}`, o / 2, n * 0.915, 0.003));
}
function Hn() {
  const e = document.createElement("canvas");
  ((e.width = so), (e.height = Math.round(so * (Po / xo))), io(e));
  const t = new CanvasTexture(e);
  return ((t.userData.repaint = () => io(e)), (t.needsUpdate = !0), t);
}
function Bn() {
  const e = document.createElement("canvas");
  ((e.width = 64), (e.height = 64));
  const t = e.getContext("2d"),
    o = t.createRadialGradient(32, 32, 0, 32, 32, 31);
  (o.addColorStop(0, "rgba(255,255,255,1)"),
    o.addColorStop(0.2, "rgba(255,249,214,0.95)"),
    o.addColorStop(0.55, "rgba(255,218,126,0.34)"),
    o.addColorStop(1, "rgba(255,205,96,0)"),
    (t.fillStyle = o),
    t.fillRect(0, 0, 64, 64));
  const n = new CanvasTexture(e);
  return ((n.colorSpace = et), (n.needsUpdate = !0), n);
}
const Ee = 512;
function Fn() {
  const e = document.createElement("canvas"),
    t = Ee;
  ((e.width = t), (e.height = t));
  const o = e.getContext("2d"),
    n = o.createLinearGradient(0, 0, t, t);
  (n.addColorStop(0, "#efe6d2"),
    n.addColorStop(0.5, "#dcd0b6"),
    n.addColorStop(1, "#c4b493"),
    (o.fillStyle = n),
    o.fillRect(0, 0, t, t));
  for (let a = 0; a < 26; a += 1) {
    const u = (a * 137) % t,
      d = (a * 211) % t,
      h = t * (0.09 + (a % 4) * 0.035),
      y = o.createRadialGradient(u, d, 0, u, d, h),
      S = a % 2 === 0;
    (y.addColorStop(0, S ? "rgba(96,72,44,0.09)" : "rgba(255,248,226,0.10)"),
      y.addColorStop(1, "rgba(0,0,0,0)"),
      (o.fillStyle = y),
      o.beginPath(),
      o.arc(u, d, h, 0, Math.PI * 2),
      o.fill());
  }
  o.lineWidth = 1.1;
  for (let a = 0; a < 1400; a += 1) {
    const u = (a * 47) % Ee,
      d = (a * 73) % Ee,
      h = 6 + ((a * 11) % 22),
      y = ((a % 5) - 2) * 0.16;
    ((o.strokeStyle =
      a % 3 === 0 ? "rgba(255,250,229,0.16)" : "rgba(88,73,48,0.09)"),
      o.beginPath(),
      o.moveTo(u, d),
      o.lineTo(u + h, d + y * h),
      o.stroke());
  }
  for (let a = 0; a < 900; a += 1) {
    const u = (a * 31) % Ee,
      d = (a * 59) % Ee,
      h = 0.6 + (a % 3) * 0.7;
    ((o.fillStyle = "rgba(77,63,42,0.08)"),
      o.beginPath(),
      o.arc(u, d, h, 0, Math.PI * 2),
      o.fill());
  }
  const i = new CanvasTexture(e);
  return (
    (i.colorSpace = et),
    (i.wrapS = Vt),
    (i.wrapT = Vt),
    i.repeat.set(1.4, 1.8),
    (i.needsUpdate = !0),
    i
  );
}
function Wn() {
  const e = new Float32Array(te * 3),
    t = new Float32Array(te);
  for (let n = 0; n < te; n += 1) {
    const i = ((n * 13) % te) / te;
    ((e[n * 3] = M.lerp(-1.16, 1.08, i)),
      (e[n * 3 + 1] =
        -0.4 + Math.sin(i * Math.PI) * 0.72 + Math.sin(n * 2.7) * 0.09),
      (e[n * 3 + 2] = Math.sin(i * Math.PI * 2 + n * 0.31) * 0.42),
      (t[n] = ((n * 37) % te) / te));
  }
  const o = new BufferGeometry();
  return (
    o.setAttribute("position", new BufferAttribute(e, 3)),
    o.setAttribute("aSeed", new BufferAttribute(t, 1)),
    o
  );
}
function $n() {
  const e = {
      uTime: {
        value: 0,
      },
      uOpacity: {
        value: 0,
      },
      uGather: {
        value: 0,
      },
      uImpact: {
        value: 0,
      },
      uEnergy: {
        value: 0,
      },
      uColor: {
        value: new Color(de).multiplyScalar(0.82),
      },
      uPointSize: {
        value: X ? 0.058 : 0.05,
      },
    },
    t = new ShaderMaterial({
      uniforms: e,
      vertexShader: `
            attribute float aSeed;
            uniform float uTime;
            uniform float uGather;
            uniform float uImpact;
            uniform float uEnergy;
            uniform float uPointSize;
            varying float vMoteAlpha;
            varying float vViewDepth;
            varying float vSeed;

            void main() {
                float phase = aSeed * 6.2831853;
                vec3 idle = position;
                float orbitAngle =
                    uTime * (0.16 + aSeed * 0.13) +
                    phase;
                mat2 orbit = mat2(
                    cos(orbitAngle),
                    -sin(orbitAngle),
                    sin(orbitAngle),
                    cos(orbitAngle)
                );
                idle.xz = mix(idle.xz, orbit * idle.xz, 0.48);
                idle.x +=
                    sin(uTime * (0.48 + aSeed * 0.18) + phase) *
                    (0.045 + uEnergy * 0.025);
                idle.y +=
                    cos(uTime * (0.56 + aSeed * 0.12) + phase) *
                    0.038 +
                    sin(uTime * 0.24 + phase) * 0.03;
                idle.z +=
                    sin(uTime * 0.39 + phase * 1.7) *
                    (0.04 + uEnergy * 0.02);

                vec3 gathered = vec3(
                    idle.x * 0.24,
                    idle.y * 0.76,
                    idle.z * 0.25
                );
                vec3 transformed = mix(idle, gathered, uGather);
                vec3 burstDirection = normalize(
                    vec3(position.x, position.y * 0.55, position.z) +
                    vec3(0.001)
                );
                transformed += burstDirection * uImpact * (0.08 + aSeed * 0.12);

                vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
                gl_Position = projectionMatrix * mvPosition;
                vViewDepth = -mvPosition.z;
                gl_PointSize =
                    uPointSize *
                    (285.0 / max(1.0, -mvPosition.z)) *
                    (0.76 + aSeed * 0.72 + uImpact * 0.75 + uEnergy * 0.2);
                vMoteAlpha = 0.54 + aSeed * 0.46;
                vSeed = aSeed;
            }
        `,
      fragmentShader: `
            uniform vec3 uColor;
            uniform float uOpacity;
            varying float vMoteAlpha;
            varying float vViewDepth;
            varying float vSeed;

            void main() {
                vec2 point = gl_PointCoord - 0.5;
                float radius = length(point);
                float core = 1.0 - smoothstep(0.02, 0.23, radius);
                float halo = 1.0 - smoothstep(0.06, 0.5, radius);
                float distanceFade =
                    1.0 - smoothstep(15.0, 30.0, vViewDepth);
                float alpha = (core * 0.76 + halo * 0.34) *
                    uOpacity * vMoteAlpha * distanceFade;
                if (alpha < 0.004) discard;
                // Most motes are embers drifting toward paper white; only the
                // last sliver of the seed range carries the cool accent, so
                // the swarm stays one temperature instead of two.
                vec3 ember = vec3(2.0, 1.05, 0.34);
                vec3 paper = vec3(1.9, 1.72, 1.25);
                vec3 color = mix(ember, paper, smoothstep(0.25, 0.85, vSeed));
                color = mix(
                    color,
                    vec3(0.5, 1.5, 2.0),
                    smoothstep(0.88, 1.0, vSeed) * 0.7
                );
                color = mix(color, uColor * 1.7, core * 0.5);
                gl_FragColor = vec4(color, alpha);
                #include <colorspace_fragment>
            }
        `,
      transparent: !0,
      depthWrite: !1,
      blending: pe,
      toneMapped: !1,
    });
  return ((t.userData.windUniforms = e), t);
}
function Vn() {
  const e = new Float32Array(Je * 3);
  for (let o = 0; o < Je; o += 1) {
    const n = ((o * 7) % Je) / Je;
    ((e[o * 3] = Math.sin(o * 2.399963) * 0.12),
      (e[o * 3 + 1] = -0.33 + n * 0.7),
      (e[o * 3 + 2] = 0.1 + Math.cos(o * 1.73) * 0.045));
  }
  const t = new BufferGeometry();
  return (t.setAttribute("position", new BufferAttribute(e, 3)), t);
}
function Kn(e, t) {
  const o = e.attributes.position,
    n = e.attributes.uv,
    i = new Vector3(),
    a = new Vector3();
  for (let u = 0; u < o.count; u += 1) {
    const d = n.getX(u);
    (t.getPointAt(d, i), a.fromBufferAttribute(o, u).sub(i));
    const h = Math.pow(Math.max(0, Math.sin(d * Math.PI)), 0.55);
    (a.multiplyScalar(0.14 + h * 0.86).add(i), o.setXYZ(u, a.x, a.y, a.z));
  }
  return (
    (o.needsUpdate = !0),
    e.computeVertexNormals(),
    e.computeBoundingSphere(),
    e
  );
}
function co(e, t = 1) {
  const o = -0.22 + e * 0.13,
    n = e === 0 ? 0.31 : -0.3,
    i = e * 1.7,
    a = Array.from(
      {
        length: 36,
      },
      (h, y) => {
        const S = y / 35,
          b = Math.sin(S * Math.PI);
        return new Vector3(
          M.lerp(-0.74, 0.76, S),
          o +
            b * (0.16 + e * 0.025) +
            Math.sin(S * Math.PI * 2 + i) * 0.022 * b,
          n + Math.sin(S * Math.PI + i) * 0.055,
        );
      },
    ),
    u = new CatmullRomCurve3(a),
    d = new TubeGeometry(
      u,
      X ? 24 : 36,
      (e === 0 ? 0.008 : 0.0068) * t,
      X ? 4 : 6,
      !1,
    );
  return Kn(d, u);
}
function lo(e, t = 0, o = !1) {
  const n = {
      uTime: {
        value: 0,
      },
      uOpacity: {
        value: 0,
      },
      uGather: {
        value: 0,
      },
      uImpact: {
        value: 0,
      },
      uEnergy: {
        value: 0,
      },
      uDraw: {
        value: 1,
      },
      uPhase: {
        value: t,
      },
      uHdr: {
        value: o ? 2.85 : 1.45,
      },
      uColor: {
        value: new Color(e),
      },
    },
    i = new ShaderMaterial({
      uniforms: n,
      vertexShader: `
            uniform float uTime;
            uniform float uGather;
            uniform float uImpact;
            uniform float uEnergy;
            uniform float uPhase;
            varying vec2 vRibbonUv;
            varying float vViewDepth;

            void main() {
                vRibbonUv = uv;
                vec3 transformed = position;
                transformed.xz *= mix(1.0, 0.76, uGather);
                transformed.xz *= 1.0 + uImpact * 0.13;
                transformed += normal *
                    sin(uv.x * 17.0 + uTime * 1.55 + uPhase) *
                    (0.004 + uEnergy * 0.003) *
                    (1.0 - uGather * 0.45);
                vec4 mvPosition =
                    modelViewMatrix *
                    vec4(transformed, 1.0);
                gl_Position = projectionMatrix * mvPosition;
                vViewDepth = -mvPosition.z;
            }
        `,
      fragmentShader: `
            uniform vec3 uColor;
            uniform float uOpacity;
            uniform float uTime;
            uniform float uPhase;
            uniform float uEnergy;
            uniform float uDraw;
            uniform float uHdr;
            varying vec2 vRibbonUv;
            varying float vViewDepth;

            void main() {
                float head = smoothstep(0.0, 0.12, vRibbonUv.x);
                float tail = 1.0 - smoothstep(0.78, 1.0, vRibbonUv.x);
                // The tube is already tapered in geometry, so this only takes
                // the last of the edge off instead of doing all the shaping.
                float taper = pow(max(0.0, sin(vRibbonUv.x * 3.1415926)), 0.4);
                float drawMask =
                    1.0 - smoothstep(uDraw, uDraw + 0.08, vRibbonUv.x);
                float travel = fract(uTime * 0.19 + uPhase * 0.11);
                float travelDistance = abs(vRibbonUv.x - travel);
                float brightHead = exp(
                    -pow(travelDistance / 0.065, 2.0)
                );
                // Long, soft streaks. The old high-frequency packets beaded
                // each stream into a dotted line at any real viewing distance.
                float packets =
                    pow(
                        0.5 +
                            0.5 *
                                sin(
                                    vRibbonUv.x * 13.0 -
                                    uTime * 2.6 +
                                    uPhase
                                ),
                        2.2
                    );
                float flow =
                    0.6 +
                    brightHead * (0.72 + uEnergy * 0.36) +
                    packets * 0.3;
                float distanceFade =
                    1.0 - smoothstep(15.0, 30.0, vViewDepth);
                float alpha =
                    uOpacity *
                    head *
                    tail *
                    taper *
                    drawMask *
                    flow *
                    distanceFade;
                if (alpha < 0.003) discard;
                vec3 color =
                    uColor *
                    uHdr *
                    (0.82 + brightHead * 0.55 + packets * 0.18);
                gl_FragColor = vec4(color, alpha);
                #include <colorspace_fragment>
            }
        `,
      transparent: !0,
      depthWrite: !1,
      depthTest: !0,
      blending: o ? Qo : pe,
      toneMapped: !1,
    });
  return ((i.userData.windUniforms = n), i);
}
const Xn = X ? 14 : 30;
function Yn() {
  return () => ({
    x: (Math.random() - 0.5) * T * Qe * 1.9,
    y: L * Qe * 0.42 + Math.random() * 0.1,
    z: (Math.random() - 0.5) * 0.14 - 0.04,
    vx: (Math.random() - 0.5) * 0.1,
    vy: 0.16 + Math.random() * 0.2,
    vz: (Math.random() - 0.5) * 0.08,
    life: 1.15 + Math.random() * 0.95,
  });
}
function Zn() {
  return (e, t, o) => {
    ((e.vy += (0.19 - e.vy * 0.62) * t),
      (e.vx += (Math.sin(o * 1.7 + e.id * 21.3) * 0.13 - e.vx * 0.55) * t),
      (e.vz += (Math.cos(o * 1.35 + e.id * 17.1) * 0.09 - e.vz * 0.55) * t),
      (e.x += e.vx * t),
      (e.y += e.vy * t),
      (e.z += e.vz * t));
  };
}
function Jn() {
  const t = new Shape();
  return (
    t.moveTo(-0.03 * 0.5, 0),
    t.lineTo(0.03 * 0.5, 0),
    t.lineTo(0.03 * 0.5, -0.22),
    t.lineTo(0, -0.22 + 0.035),
    t.lineTo(-0.03 * 0.5, -0.22),
    t.closePath(),
    new ShapeGeometry(t)
  );
}
function sr({ revealRef: e, readyRef: t }) {
  const o = useThree((s) => s.gl),
    n = Fo(un, go),
    i = Ln(n),
    a = React.useRef(),
    u = React.useRef(),
    d = React.useRef(),
    h = React.useRef(),
    y = React.useRef(),
    S = React.useRef(),
    b = React.useRef(),
    P = React.useRef(),
    G = React.useRef(0),
    me = React.useRef(1),
    ge = React.useRef(),
    ve = React.useRef(),
    tt = React.useRef(),
    Ce = React.useRef(),
    Oe = React.useRef(),
    At = React.useRef([]),
    It = React.useRef([]),
    ot = React.useRef(),
    nt = React.useRef(),
    rt = React.useRef(),
    at = React.useRef(),
    _t = React.useRef([]),
    st = React.useRef(e ? 0 : 1),
    Ct = React.useRef({
      page: 0,
      direction: 1,
      cooldown: 0,
      lastGust: 0,
      turningUntil: 0,
      activeSheetIndex: -1,
      turnDirection: 1,
      arrivalPhase: "closed",
      openingStartedAt: 0,
      settledAt: -100,
      openingProgress: 0,
      openingPageStarted: !1,
      sheets: [],
    }),
    Ge = React.useMemo(Gn, []),
    it = React.useMemo(Jn, []),
    ke = React.useMemo(Cn, []),
    ct = React.useMemo(() => [-1, 1].map((s) => _n(s)), []),
    lt = React.useMemo(nn, []),
    Eo = React.useMemo(Yn, []),
    To = React.useMemo(Zn, []),
    ut = React.useMemo(
      () =>
        wt([
          {
            t: 0,
            c: [1, 0.88, 0.6, 0],
          },
          {
            t: 0.12,
            c: [1, 0.78, 0.38, 0.62],
          },
          {
            t: 0.45,
            c: [1, 0.46, 0.13, 0.46],
          },
          {
            t: 0.78,
            c: [0.82, 0.2, 0.04, 0.22],
          },
          {
            t: 1,
            c: [0.36, 0.05, 0, 0],
          },
        ]),
      [],
    ),
    pt = React.useMemo(
      () =>
        wt([
          {
            t: 0,
            c: [0.35, 0, 0, 1],
          },
          {
            t: 0.22,
            c: [1, 0, 0, 1],
          },
          {
            t: 1,
            c: [0.18, 0, 0, 1],
          },
        ]),
      [],
    ),
    dt = React.useMemo(
      () =>
        wt([
          {
            t: 0,
            c: [0.2, 0, 0, 1],
          },
          {
            t: 0.55,
            c: [0.85, 0, 0, 1],
          },
          {
            t: 1,
            c: [1, 0, 0, 1],
          },
        ]),
      [],
    ),
    Ot = React.useRef(0),
    H = React.useMemo(Bn, []),
    B = React.useMemo(Fn, []),
    Q = React.useMemo(
      () =>
        new MeshStandardMaterial({
          color: "#d9ab5c",
          emissive: "#ffca6a",
          emissiveIntensity: 0.12,
          roughness: 0.58,
          metalness: 0.08,
          toneMapped: !1,
        }),
      [],
    ),
    Y = React.useMemo(Hn, []),
    De = React.useMemo(
      () =>
        new MeshStandardMaterial({
          color: "#d9ab5c",
          emissive: "#ffca6a",
          emissiveIntensity: 0.08,
          alphaMap: Y,
          alphaTest: 0.46,
          roughness: 0.42,
          metalness: 0.62,
          toneMapped: !1,
          polygonOffset: !0,
          polygonOffsetFactor: -2,
        }),
      [Y],
    );
  React.useEffect(
    () => () => {
      (Y.dispose(), De.dispose());
    },
    [Y, De],
  );
  const ft = React.useMemo(() => {
    const s = [];
    for (const m of [0, 0.014]) {
      const E = T - 0.038 - m * 2,
        U = L - 0.03 - m * 2;
      for (const W of [-1, 1])
        (s.push(
          new BoxGeometry(E, 0.0022, 0.0015).translate(0, (W * U) / 2, 0),
        ),
          s.push(
            new BoxGeometry(0.0022, U, 0.0015).translate((W * E) / 2, 0, 0),
          ));
    }
    const f = uo(s);
    return (s.forEach((m) => m.dispose()), f);
  }, []);
  React.useEffect(() => () => ft.dispose(), [ft]);
  const je = React.useMemo(() => [-1, 1].map((s) => kn(s)), []),
    ht = React.useMemo(Wn, []),
    mt = React.useMemo(Vn, []),
    Ue = React.useMemo($n, []),
    Ne = React.useMemo(
      () =>
        new PointsMaterial({
          color: de,
          map: H,
          size: X ? 0.02 : 0.017,
          sizeAttenuation: !0,
          transparent: !0,
          opacity: 0,
          depthWrite: !1,
          blending: pe,
          toneMapped: !1,
        }),
      [H],
    ),
    gt = React.useMemo(
      () =>
        Array.from(
          {
            length: Et,
          },
          (s, f) => ({
            halo: co(f, 1),
            core: co(f, 0.42),
          }),
        ),
      [],
    ),
    ze = React.useMemo(() => Mn, []),
    Me = React.useMemo(
      () => ze.slice(0, Et).map((s, f) => lo(s, f * 1.71)),
      [ze],
    ),
    be = React.useMemo(
      () => ze.slice(0, Et).map((s, f) => lo(s, f * 1.71, !0)),
      [ze],
    ),
    ye = React.useMemo(
      () =>
        new MeshBasicMaterial({
          color: new Color("#ffe6ac").multiplyScalar(0.88),
          map: H,
          transparent: !0,
          opacity: 0,
          depthWrite: !1,
          side: Pe,
          blending: pe,
          toneMapped: !1,
        }),
      [H],
    ),
    Le = React.useMemo(
      () =>
        new MeshBasicMaterial({
          color: new Color(de).multiplyScalar(0.9),
          map: H,
          transparent: !0,
          opacity: 0,
          depthWrite: !1,
          side: Pe,
          blending: pe,
          toneMapped: !1,
        }),
      [H],
    ),
    F = React.useMemo(() => {
      const s =
          (i == null ? void 0 : i.faces) ??
          Ie.map((m, E) => wo(n[vo[E]] ?? null, m)),
        f = (i == null ? void 0 : i.endpaper) ?? So();
      return Array.from(
        {
          length: St,
        },
        (m, E) => {
          const U = s[E * 2],
            W = s[E * 2 + 1] ?? f,
            C = Dn(Ge, U, W),
            Z = new Group();
          return (
            Z.add(C),
            {
              mesh: C,
              hinge: Z,
              front: U,
              back: W,
              opened: !1,
              turnAngle: Math.PI / 2,
              turnedAt: -xt,
            }
          );
        },
      );
    }, [Ge, n, i]);
  return (
    React.useLayoutEffect(() => {
      const s = Math.min(8, o.capabilities.getMaxAnisotropy()),
        f = [B, H, Y],
        m = new Set();
      return (
        F.forEach((E) => {
          (m.add(E.front), m.add(E.back));
        }),
        f.forEach((E) => {
          var U;
          ((E.anisotropy = s),
            (E.needsUpdate = !0),
            (U = o.initTexture) == null || U.call(o, E));
        }),
        m.forEach((E) => {
          ((E.anisotropy = s), (E.needsUpdate = !0));
        }),
        o.initTexture ? pn(o, [...m]) : void 0
      );
    }, [B, Y, o, H, F]),
    React.useEffect(() => {
      let s = !0;
      return (
        Promise.all([
          document.fonts.load("800 40px Nunito", "sketches 01"),
          document.fonts.load("700 40px Nunito", "curllmooha"),
        ])
          .catch(() => {})
          .then(() => {
            if (!s) return;
            const f = new Set([Y]);
            (F.forEach((m) => {
              (f.add(m.front), f.add(m.back));
            }),
              f.forEach((m) => {
                m.userData.repaint &&
                  (m.userData.repaint(), (m.needsUpdate = !0));
              }));
          }),
        () => {
          s = !1;
        }
      );
    }, [Y, F]),
    React.useEffect(
      () => (
        (Ct.current.sheets = F),
        t && (t.current = !1),
        () => {
          (t && (t.current = !1), (ce.bookWindStrength = 0));
        }
      ),
      [t, F],
    ),
    React.useEffect(
      () => () => {
        (F.forEach((s) => {
          (s.mesh.material.forEach((f) => f.dispose()),
            s.mesh.skeleton.dispose(),
            s.front.dispose(),
            s.back.dispose());
        }),
          Ge.dispose(),
          it.dispose(),
          H.dispose(),
          B.dispose(),
          Q.dispose(),
          je.forEach((s) => s.dispose()),
          ht.dispose(),
          mt.dispose(),
          Ue.dispose(),
          Ne.dispose(),
          gt.forEach(({ halo: s, core: f }) => {
            (s.dispose(), f.dispose());
          }),
          Me.forEach((s) => s.dispose()),
          be.forEach((s) => s.dispose()),
          ye.dispose(),
          Le.dispose(),
          ke.dispose(),
          ct.forEach((s) => s.dispose()),
          lt.dispose(),
          ut.dispose(),
          pt.dispose(),
          dt.dispose());
      },
      [
        it,
        B,
        Q,
        je,
        ct,
        ke,
        ut,
        lt,
        pt,
        dt,
        H,
        mt,
        Ne,
        Ge,
        F,
        ye,
        Le,
        ht,
        Ue,
        gt,
        be,
        Me,
      ],
    ),
    useEffect((s, f) => {
      const m = rn.getState(),
        E = (e == null ? void 0 : e.current) ?? 1;
      st.current = v ? E : M.damp(st.current, E, 7, f);
      const U = m.sleeping ? 0 : 1;
      me.current = v ? U : M.damp(me.current, U, m.sleeping ? 7 : 1.6, f);
      const W = M.clamp(me.current, 0, 1),
        C = M.clamp(st.current, 0, 1) * W;
      if (a.current) {
        a.current.visible = C > 0.008;
        const l = M.lerp(0.82, 1, C);
        (a.current.scale.set(l, C, l),
          (a.current.position.y = M.lerp(-0.24, 0, C) - (1 - W) * mn));
      }
      const Z = m.windParameters,
        A = s.clock.elapsedTime,
        w = v ? 0 : A,
        r = Ct.current;
      r.cooldown = Math.max(0, r.cooldown - f);
      const vt = Math.hypot(m.ballPosition.x - le.x, m.ballPosition.z - le.z);
      (r.arrivalPhase === "closed" &&
        C > 0.82 &&
        vt < qt &&
        ((r.page = v ? 1 : 0),
        (r.direction = 1),
        (r.turnDirection = 1),
        (r.activeSheetIndex = 0),
        (r.openingStartedAt = A),
        (r.openingProgress = v ? 1 : 0),
        (r.openingPageStarted = v),
        (r.arrivalPhase = v ? "open" : "opening"),
        v &&
          r.sheets[0] &&
          ((r.sheets[0].opened = !0), (r.sheets[0].turnedAt = A - xt)),
        (r.turningUntil = v ? A : A + Pt),
        (r.cooldown = Pt + 1.4)),
        r.arrivalPhase === "opening" &&
          ((r.openingProgress = M.clamp((A - r.openingStartedAt) / Pt, 0, 1)),
          !r.openingPageStarted &&
            r.openingProgress >= eo &&
            (r.openingPageStarted = !0),
          r.openingProgress >= 1 &&
            ((r.page = 1),
            r.sheets[0] &&
              ((r.sheets[0].opened = !0), (r.sheets[0].turnedAt = A - xt)),
            (r.arrivalPhase = "open"),
            (r.activeSheetIndex = -1),
            (r.turningUntil = A),
            (r.settledAt = A),
            (r.cooldown = 1.8))));
      const $ = r.arrivalPhase === "open" ? 1 : r.openingProgress,
        k = r.arrivalPhase === "opening",
        oe = z($, 0.14, 0.5),
        ne = z($, eo, In),
        Ro = z($, 0, 0.18),
        Ao = z($, 0.34, 0.58),
        we = k ? Ro * (1 - Ao) : 0,
        I = k ? z($, 0.11, 0.28) * (1 - z($, 0.6, 0.82)) : 0,
        He = z(ne, 0.24, 0.86),
        J = k ? Math.exp(-Math.pow((ne - 0.52) / 0.28, 2)) : 0,
        Be = k ? Math.exp(-Math.pow((ne - 0.91) / 0.09, 2)) : 0,
        Io = 1 - M.smoothstep(vt, qt, Qt),
        Se =
          r.arrivalPhase === "open"
            ? Math.exp(-Math.max(0, A - r.settledAt) * 0.72)
            : 0,
        Gt = 1 - M.smoothstep(vt, Sn, Qt);
      G.current = v
        ? m.sleeping
          ? 0
          : Gt
        : M.damp(G.current, m.sleeping ? 0 : Gt, 3.2, f);
      const N = C * G.current,
        Mt = N > 0.004;
      ((ce.bookWindX = le.x),
        (ce.bookWindZ = le.z),
        t && (t.current = r.arrivalPhase === "open"));
      const kt = Math.cos(Z.direction ?? 0),
        Dt = Math.sin(Z.direction ?? 0),
        jt = m.smoothedCircleCenter,
        Ut = ((le.x - jt.x) * kt + (le.z - jt.z) * Dt - ce.gustOffset) / ln,
        Fe = Math.exp(-Ut * Ut) * ce.gustStrength;
      let ee = k || A < r.turningUntil;
      const _o =
          !k && A < r.turningUntil
            ? M.clamp(1 - (r.turningUntil - A) / Jt, 0, 1)
            : 0,
        We = Math.sin(_o * Math.PI),
        Co = v ? 0.5 : 0.5 + Math.sin(w * 0.68) * 0.5,
        _ = M.clamp(
          r.arrivalPhase === "closed"
            ? 0.24 + Io * 0.36
            : k
              ? 0.4 + we * 0.55 + I * 0.52 + J * 0.58 + Be * 0.72
              : 0.42 + Co * 0.1 + Se * 0.48 + We * 0.45,
          0,
          1.55,
        ),
        R = Math.max(J * 0.76, Be, We * 0.42);
      if (
        ((ce.bookWindStrength = v
          ? 0
          : Math.max(J * 0.42, Be, We * 0.36) * 0.96 * W),
        !v &&
          r.arrivalPhase === "open" &&
          C > 0.9 &&
          !ee &&
          r.cooldown <= 0 &&
          Fe > 0.55 &&
          r.lastGust <= 0.55)
      ) {
        r.page >= St ? (r.direction = -1) : r.page <= 0 && (r.direction = 1);
        const l = M.clamp(r.page + r.direction, 0, St);
        ((r.turnDirection = Math.sign(l - r.page)),
          (r.activeSheetIndex = r.turnDirection > 0 ? r.page : r.page - 1),
          (r.page = l),
          (r.cooldown = 3),
          (r.turningUntil = A + Jt),
          (ee = !0));
      }
      r.lastGust = Fe;
      const D = M.clamp((Z.strength ?? 0.5) * 0.6 + Fe * 0.72, 0, 1.5),
        V = M.smoothstep(m.nightAmount ?? 0, 0.18, 0.82),
        re = we,
        $e = w * xn,
        Oo = Math.sin($e),
        Go = Math.cos($e),
        Nt = Math.sin($e * 0.5),
        ko = Math.cos($e * 0.5),
        Do = v ? 0 : Oo * M.lerp(0.032, 0.055, oe),
        bt = v
          ? Xt
          : Xt + Do - (1 - oe) * 0.065 + J * 0.075 + re * 0.045 + Fe * 0.025;
      if (u.current) {
        (u.current.position.set(
          v ? 0 : Nt * M.lerp(0.012, 0.025, oe),
          bt,
          0.06,
        ),
          v
            ? u.current.rotation.set(Yt, 0, 0)
            : u.current.rotation.set(
                M.lerp(-0.08, Yt, oe) + Go * Pn - J * 0.025,
                Nt * Tn +
                  Dt * D * 0.018 +
                  Math.sin((A - r.openingStartedAt) * Rn) * re * 0.035,
                -ko * En -
                  kt * D * 0.016 +
                  re * Math.sin((A - r.openingStartedAt) * An) * 0.022,
              ));
        const l = Qe * (1 + J * 0.026);
        u.current.scale.setScalar(l);
      }
      if (d.current) {
        const l = z($, 0.22, 0.62);
        d.current.position.x = M.lerp(-T * 0.5, 0, l);
      }
      if (h.current) {
        const l = On(oe);
        ((h.current.visible = !0),
          (h.current.rotation.y = -Math.PI * l),
          (h.current.rotation.z = -Math.sin(l * Math.PI) * 0.035),
          (h.current.position.z = Math.sin(l * Math.PI) * 0.052));
      }
      if (y.current) {
        const l =
          r.arrivalPhase === "open"
            ? 1
            : k && r.openingPageStarted
              ? z(ne, 0.36, 0.58)
              : 0;
        ((y.current.visible = l > 0.002),
          (y.current.scale.x = Math.max(0.001, l)));
      }
      if (S.current) {
        const l = 1 + re * 0.08 + I * 0.14;
        ((S.current.visible = oe < 0.94), S.current.scale.setScalar(l));
      }
      if (
        ((Q.emissiveIntensity = 0.1 + V * 0.22 + re * 0.55 + I * 0.78),
        (De.emissiveIntensity = Q.emissiveIntensity * 0.6),
        P.current && ((P.current.visible = Mt), (P.current.position.y = bt)),
        b.current)
      ) {
        ((b.current.visible = Mt),
          (b.current.position.y = bt),
          (b.current.rotation.y =
            (Z.direction ?? 0) * 0.12 + (v ? 0 : Math.sin(w * 0.16) * 0.08)));
        const l = M.lerp(0.88, 1.08, _) + D * 0.1 + R * 0.16 - re * 0.035;
        b.current.scale.set(l, 1, l);
      }
      const xe = Ue.userData.windUniforms;
      if (
        ((xe.uTime.value = w),
        (xe.uGather.value = we),
        (xe.uImpact.value = R),
        (xe.uEnergy.value = _),
        Ce.current &&
          ((Ce.current.rotation.y = v
            ? 0
            : w * (0.1 + (Z.speed ?? 0.8) * 0.08)),
          (Ce.current.rotation.z = v ? 0 : Math.sin(w * 0.37) * 0.12)),
        ge.current &&
          ((ge.current.visible = Mt),
          (ge.current.position.y = v ? 0 : Math.sin(w * 0.78) * 0.012),
          (ge.current.rotation.z = v ? 0 : Math.sin(w * 0.42) * 0.022)),
        Oe.current &&
          ((Oe.current.position.y = v ? 0 : (w * 0.045) % 0.12),
          (Oe.current.rotation.y = v ? 0 : Math.sin(w * 0.38) * 0.11)),
        ve.current)
      ) {
        const l = 0.48 + I * 0.42 + R * 1.38 + Se * 0.12;
        ((ve.current.visible = I > 0.02 || R > 0.015 || Se > 0.16),
          ve.current.scale.setScalar(l),
          (ve.current.rotation.z = Math.sin(w * 1.8) * 0.05));
      }
      (tt.current && (tt.current.scale.y = 0.08 + z($, 0.14, 0.48) * 0.92),
        (ye.opacity = N * (R * 0.78 + I * 0.32 + Se * 0.08)),
        (Le.opacity = N * (0.08 + _ * 0.19 + I * 0.36 + R * 0.28)),
        At.current.forEach((l, g) => {
          if (l) {
            for (const x of [Me[g], be[g]]) {
              const j = x.userData.windUniforms;
              ((j.uTime.value = w),
                (j.uGather.value = we),
                (j.uImpact.value = R),
                (j.uEnergy.value = _),
                (j.uDraw.value = k
                  ? M.clamp(z($, 0.08, 0.55) + R * 0.22, 0.08, 1)
                  : 1));
            }
            if (!v) {
              const x = Math.sin(w * 0.42);
              ((l.position.x = x * (0.025 + g * 0.008)),
                (l.position.y = Math.sin(w * 0.37 + g * 0.9) * 0.014),
                (l.rotation.z = x * (g === 0 ? 0.018 : -0.014)));
            }
          }
        }),
        It.current.forEach((l, g) => {
          if (!l) return;
          const x = Tt[g],
            j = v
              ? (g + 1) / (Tt.length + 1)
              : (w * (0.055 + g * 0.003) + g * 0.17) % 1,
            ae = k && r.openingPageStarted ? He : j,
            Ve = Math.sin(ae * Math.PI);
          if (k) {
            const se = 1 - we * 0.74;
            (l.position.set(
              x.position[0] * se * (0.22 + He * 1.08),
              x.position[1] * 0.48 +
                He * (0.16 + (g % 3) * 0.045) +
                Math.sin(w * 2.1 + g) * 0.025,
              x.position[2] * se * (0.28 + He * 0.94),
            ),
              (l.material.opacity =
                N * (I * 0.22 + R * 0.84) * (g < 4 || !X ? 1 : 0)));
          } else
            (l.position.set(
              M.lerp(-1.18, 1.18, ae),
              x.position[1] + (v ? 0 : Math.sin(w * 1.1 + g) * 0.07),
              x.position[2] + Math.sin(ae * Math.PI * 2 + g) * 0.12,
            ),
              (l.material.opacity =
                N * Ve * (0.16 + D * 0.14) * (0.32 + _ * 0.72)));
          const Ke = 1 + J * 0.28;
          (l.scale.set(x.scale * 1.1 * Ke, x.scale * 0.48 * Ke, 1),
            v ||
              ((l.rotation.x = x.rotation[0] + w * (0.72 + g * 0.05)),
              (l.rotation.y = x.rotation[1] + w * (0.36 + g * 0.04))));
        }),
        _t.current.forEach((l, g) => {
          !l ||
            v ||
            ((l.rotation.z =
              Math.sin(w * 0.91 + g * 1.6) * (0.045 + D * 0.035)),
            (l.rotation.x = Math.cos(w * 0.73 + g) * 0.025));
        }));
      const zt = N * (0.032 + _ * 0.055 + D * 0.038 * _ + R * 0.13 + I * 0.065);
      if (
        ((xe.uOpacity.value =
          N * (0.14 + _ * 0.24 + D * 0.12 * _ + R * 0.5 + I * 0.24)),
        (Ne.opacity = N * (0.12 + _ * 0.3 + D * 0.14 * _ + R * 0.5 + I * 0.26)),
        Me.forEach((l, g) => {
          const x = v ? 1 : 0.82 + Math.sin(w * 1.1 + g * 1.6) * 0.18;
          l.userData.windUniforms.uOpacity.value =
            zt * x * (g === 0 ? 1.18 : 0.72);
        }),
        be.forEach((l, g) => {
          const x = v ? 1 : 0.88 + Math.sin(w * 1.24 + g * 1.3) * 0.12;
          l.userData.windUniforms.uOpacity.value =
            zt * x * (g === 0 ? 0.92 : 0.62);
        }),
        ot.current &&
          (ot.current.intensity =
            C *
            (0.055 + _ * 0.07 + V * (0.2 + D * 0.035) + I * 0.16 + R * 0.4)),
        nt.current)
      ) {
        const l = v
          ? 1
          : 0.93 +
            Math.sin(w * 2.9) * 0.042 +
            Math.sin(w * 6.7 + 1.1) * 0.026 +
            Math.sin(w * 1.3 + 0.4) * 0.032;
        nt.current.intensity =
          C *
          (0.11 + _ * 0.16 + V * (0.38 + D * 0.05) + I * 0.34 + R * 1.18) *
          l;
      }
      (rt.current &&
        (rt.current.intensity =
          N * (0.055 + _ * 0.11 + V * 0.18 + I * 0.2 + R * 0.72)),
        at.current &&
          (at.current.intensity = C * (0.045 + V * 0.13 + I * 0.1 + R * 0.26)));
      const jo =
          0.025 +
          V * (0.065 + D * 0.025) +
          (ee ? 0.05 + V * 0.04 : 0) +
          R * 0.18,
        Lt = M.clamp(
          N * (0.34 + V * 0.4 + D * 0.22 + _ * 0.2 + I * 0.5 + R * 0.7),
          0,
          1.6,
        );
      Ot.current = Lt;
      const Uo = v ? 0.5 : ((w * 0.16) % 1.5) - 0.25,
        Ht = ke.userData.deckleUniforms;
      ((Ht.uCreepHead.value = Uo), (Ht.uEmberHeat.value = Lt));
      const No = C * V,
        zo = C * ((ee ? 0.72 : 0.05) + D * (ee ? 0.18 : 0.035) + R * 0.3);
      for (let l = 0; l < r.sheets.length; l += 1) {
        const g = r.sheets[l],
          x = g.mesh,
          j = l < r.page,
          ae = r.page - 1,
          Ve = r.page,
          Ke = r.turnDirection > 0 ? ae - 1 : Ve + 1,
          se = k && r.openingPageStarted && l === 0;
        let K = O.hidden;
        (k
          ? l === 0
            ? (K = O.turning)
            : r.openingPageStarted && l === 1 && (K = O.destination)
          : l === r.activeSheetIndex && ee
            ? (K = O.turning)
            : l === ae
              ? (K = O.left)
              : l === Ve
                ? (K = O.right)
                : ee && l === Ke && (K = O.underlay),
          (x.visible = K !== O.hidden),
          (x.renderOrder = yn[K]),
          g.opened !== j && ((g.opened = j), (g.turnedAt = A)));
        const Bt = r.arrivalPhase !== "open" && !r.openingPageStarted,
          Lo = j ? Math.max(0, r.page - 1 - l) : Math.max(0, l - r.page);
        let Xe = j ? -Math.PI / 2 : Math.PI / 2;
        (se && (Xe = M.lerp(Math.PI / 2, -Math.PI / 2, ne)),
          (g.turnAngle = v ? Xe : M.damp(g.turnAngle, Xe, k ? 13 : bn, f)));
        const Ft = K === O.turning,
          Wt = dn(g.turnAngle, Lo, Ft, Xe);
        (g.hinge.rotation.set(0, g.turnAngle, 0),
          g.hinge.position.set(Wt.depth, 0, 0),
          (x.position.z = 0));
        const yt = x.skeleton.bones;
        for (let ie = 0; ie < yt.length; ie += 1)
          yt[ie].rotation.set(0, fn(ie, yt.length, Bt ? 0 : Wt.bend), 0);
        for (const ie of [4, 5]) {
          const Ye = x.material[ie].userData.paperUniforms;
          ((Ye.uPaperNight.value = No), (Ye.uPaperMotion.value = zo));
          const Ho = !Bt && (l === r.page || l === r.page - 1);
          ((Ye.uMagicEnergy.value =
            N *
            (se
              ? I * 0.28 + J * 0.72 + Be * 0.94
              : Ho
                ? _ * 0.045 + Se * 0.12 + We * 0.26
                : 0)),
            (Ye.uMagicHead.value = se
              ? M.lerp(-0.12, 1.12, ne)
              : Ft
                ? 0.5 - g.turnAngle / Math.PI
                : 0.5 + Math.sin(w * 0.52) * 0.34));
        }
        x.material[0].emissiveIntensity = jo;
      }
    }),
    jsxRuntime.jsxs("group", {
      ref: a,
      visible: !e,
      children: [
        jsxRuntime.jsx(an, {
          blobs: [
            {
              x: 0,
              z: 0,
              radius: 0.95,
              strength: 0.36,
            },
          ],
        }),
        jsxRuntime.jsx(Ze, {
          ref: ot,
          color: "#efc77c",
          position: [0, 0.88, 0.08],
          intensity: 0,
          distance: 2.7,
          decay: 2,
        }),
        jsxRuntime.jsxs("group", {
          ref: b,
          children: [
            gt.map(({ halo: s, core: f }, m) =>
              jsxRuntime.jsxs(
                "group",
                {
                  ref: (E) => {
                    At.current[m] = E;
                  },
                  children: [
                    jsxRuntime.jsx("mesh", {
                      geometry: s,
                      material: Me[m],
                      renderOrder: 2,
                    }),
                    jsxRuntime.jsx("mesh", {
                      geometry: f,
                      material: be[m],
                      renderOrder: 3,
                    }),
                  ],
                },
                m,
              ),
            ),
            jsxRuntime.jsx("points", {
              ref: Ce,
              geometry: ht,
              material: Ue,
              renderOrder: 3,
            }),
            Tt.map((s, f) =>
              jsxRuntime.jsxs(
                "mesh",
                {
                  ref: (m) => {
                    It.current[f] = m;
                  },
                  position: s.position,
                  rotation: s.rotation,
                  scale: [s.scale * 1.1, s.scale * 0.48, 1],
                  renderOrder: 2,
                  children: [
                    jsxRuntime.jsx("circleGeometry", {
                      args: [0.048, 4],
                    }),
                    jsxRuntime.jsx("meshBasicMaterial", {
                      color: f % 3 === 0 ? de : f % 3 === 1 ? gn : "#c9b487",
                      transparent: !0,
                      opacity: 0.62,
                      side: Pe,
                      depthWrite: !1,
                      toneMapped: !1,
                    }),
                  ],
                },
                f,
              ),
            ),
          ],
        }),
        jsxRuntime.jsx("group", {
          ref: P,
          children: jsxRuntime.jsx(sn, {
            count: Xn,
            particleTexture: lt,
            colorTexture: ut,
            sizeTexture: pt,
            twinkleTexture: dt,
            sizeScale: 54,
            maxPointSize: 14,
            nearFadeStart: 0.2,
            nearFadeEnd: 0.7,
            blending: pe,
            strengthRef: Ot,
            spawn: Eo,
            integrate: To,
            spawnGate: (s) => s > 0.12 && Math.random() < 0.4,
          }),
        }),
        jsxRuntime.jsx("group", {
          ref: u,
          scale: Qe,
          children: jsxRuntime.jsxs("group", {
            ref: d,
            children: [
              jsxRuntime.jsxs("group", {
                ref: h,
                children: [
                  jsxRuntime.jsx("mesh", {
                    geometry: je[0],
                    castShadow: !0,
                    receiveShadow: !0,
                    position: [T * 0.5 + 0.003, 0, 0.038],
                    children: jsxRuntime.jsx("meshStandardMaterial", {
                      map: B,
                      bumpMap: B,
                      bumpScale: 0.012,
                      color: Zt,
                      roughness: 0.57,
                      metalness: 0.05,
                    }),
                  }),
                  jsxRuntime.jsx("mesh", {
                    position: [T * 0.5 + 0.003, 0, 0.052],
                    geometry: ft,
                    children: jsxRuntime.jsx("meshStandardMaterial", {
                      color: "#c49b58",
                      metalness: 0.72,
                      roughness: 0.38,
                    }),
                  }),
                  jsxRuntime.jsx("mesh", {
                    position: [T * 0.5 + 0.003, 0, 0.0548],
                    material: De,
                    children: jsxRuntime.jsx("planeGeometry", {
                      args: [xo, Po],
                    }),
                  }),
                  jsxRuntime.jsxs("group", {
                    ref: S,
                    position: [T * 0.5, 0, 0.052],
                    children: [
                      jsxRuntime.jsx("mesh", {
                        material: Q,
                        position: [0, ue.y, 0],
                        children: jsxRuntime.jsx("cylinderGeometry", {
                          args: [ue.radius, ue.radius, ue.height, 6],
                        }),
                      }),
                      wn.map((s, f) =>
                        jsxRuntime.jsx(
                          "mesh",
                          {
                            material: Q,
                            position: [s.side * s.length * 0.42, s.y, 0],
                            rotation: [0, 0, -s.side * s.tilt],
                            children: jsxRuntime.jsx("capsuleGeometry", {
                              args: [0.0055, s.length, 3, 6],
                            }),
                          },
                          `cover-sprig-${f}`,
                        ),
                      ),
                      jsxRuntime.jsx("mesh", {
                        material: Q,
                        position: [0, ue.y + ue.height * 0.5 + 0.016, 0.002],
                        rotation: [0, 0, Math.PI / 4],
                        scale: [0.85, 1.25, 0.28],
                        children: jsxRuntime.jsx("octahedronGeometry", {
                          args: [0.024, 0],
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              jsxRuntime.jsxs("group", {
                children: [
                  jsxRuntime.jsx("mesh", {
                    geometry: je[1],
                    castShadow: !0,
                    receiveShadow: !0,
                    position: [T * 0.5 + 0.003, 0, -0.038],
                    children: jsxRuntime.jsx("meshStandardMaterial", {
                      map: B,
                      bumpMap: B,
                      bumpScale: 0.012,
                      color: Zt,
                      roughness: 0.57,
                      metalness: 0.05,
                    }),
                  }),
                  jsxRuntime.jsx(cn, {
                    args: [0.058, L + 0.048, 0.024],
                    radius: 0.006,
                    smoothness: 2,
                    castShadow: !0,
                    receiveShadow: !0,
                    position: [0, 0, -0.026],
                    children: jsxRuntime.jsx("meshStandardMaterial", {
                      color: vn,
                      bumpMap: B,
                      bumpScale: 0.026,
                      roughness: 0.7,
                      metalness: 0.05,
                    }),
                  }),
                  [-1, 1].map((s) =>
                    jsxRuntime.jsxs(
                      "group",
                      {
                        ref: s === -1 ? y : void 0,
                        visible: s === 1,
                        children: [
                          jsxRuntime.jsxs("group", {
                            children: [
                              jsxRuntime.jsxs("mesh", {
                                castShadow: !0,
                                position: [s * (T - 0.005), 0, -0.004],
                                children: [
                                  jsxRuntime.jsx("boxGeometry", {
                                    args: [0.014, L - 0.018, 0.03],
                                  }),
                                  jsxRuntime.jsx("meshStandardMaterial", {
                                    color: "#e7dcc4",
                                    roughness: 0.98,
                                  }),
                                ],
                              }),
                              [-1, 1].map((f) =>
                                jsxRuntime.jsxs(
                                  "mesh",
                                  {
                                    castShadow: !0,
                                    position: [
                                      s * T * 0.5,
                                      f * (L * 0.5 - 0.004),
                                      -0.004,
                                    ],
                                    children: [
                                      jsxRuntime.jsx("boxGeometry", {
                                        args: [T - 0.018, 0.012, 0.03],
                                      }),
                                      jsxRuntime.jsx("meshStandardMaterial", {
                                        color: "#eee5d2",
                                        roughness: 0.98,
                                      }),
                                    ],
                                  },
                                  f,
                                ),
                              ),
                            ],
                          }),
                          jsxRuntime.jsx("mesh", {
                            geometry: ct[s === -1 ? 0 : 1],
                            material: ke,
                          }),
                          jsxRuntime.jsxs("mesh", {
                            castShadow: !0,
                            receiveShadow: !0,
                            position: [s * T * 0.5, 0, -0.012],
                            children: [
                              jsxRuntime.jsx("planeGeometry", {
                                args: [T, L],
                              }),
                              jsxRuntime.jsx("meshStandardMaterial", {
                                color: mo,
                                roughness: 0.98,
                                side: Pe,
                                polygonOffset: !0,
                                polygonOffsetFactor: 2,
                                polygonOffsetUnits: 2,
                              }),
                            ],
                          }),
                        ],
                      },
                      `page-stack-${s}`,
                    ),
                  ),
                  jsxRuntime.jsx("group", {
                    position: [0, 0, 0.014],
                    rotation: [0, -Math.PI / 2, 0],
                    children: F.map((s, f) =>
                      jsxRuntime.jsx(
                        "primitive",
                        {
                          object: s.hinge,
                        },
                        f,
                      ),
                    ),
                  }),
                  [-0.27, -0.135, 0, 0.135, 0.27].map((s) =>
                    jsxRuntime.jsxs(
                      "mesh",
                      {
                        castShadow: !0,
                        position: [0, s, 0.043],
                        rotation: [0, 0, Math.PI / 2],
                        children: [
                          jsxRuntime.jsx("cylinderGeometry", {
                            args: [0.0022, 0.0022, 0.045, 5],
                          }),
                          jsxRuntime.jsx("meshStandardMaterial", {
                            color: "#b7aa84",
                            roughness: 1,
                          }),
                        ],
                      },
                      `thread-${s}`,
                    ),
                  ),
                  [-0.018, 0.018].map((s, f) =>
                    jsxRuntime.jsx(
                      "group",
                      {
                        ref: (m) => {
                          _t.current[f] = m;
                        },
                        position: [s, -0.35, 0.036 - f * 0.004],
                        children: jsxRuntime.jsx("mesh", {
                          geometry: it,
                          castShadow: !0,
                          children: jsxRuntime.jsx("meshStandardMaterial", {
                            color: f === 0 ? "#d8612c" : "#91a95f",
                            roughness: 0.82,
                            side: Pe,
                          }),
                        }),
                      },
                      s,
                    ),
                  ),
                  jsxRuntime.jsxs("group", {
                    ref: ge,
                    children: [
                      jsxRuntime.jsx("mesh", {
                        ref: tt,
                        position: [0, 0, 0.105],
                        material: Le,
                        renderOrder: 5,
                        children: jsxRuntime.jsx("planeGeometry", {
                          args: [0.052, 0.7],
                        }),
                      }),
                      jsxRuntime.jsxs("group", {
                        ref: ve,
                        position: [0, 0.01, 0.118],
                        visible: !1,
                        children: [
                          jsxRuntime.jsx("mesh", {
                            material: ye,
                            scale: [0.5, 3.8, 1],
                            renderOrder: 6,
                            children: jsxRuntime.jsx("planeGeometry", {
                              args: [0.22, 0.22],
                            }),
                          }),
                          jsxRuntime.jsx("mesh", {
                            material: ye,
                            scale: [2.8, 0.34, 1],
                            renderOrder: 6,
                            children: jsxRuntime.jsx("planeGeometry", {
                              args: [0.22, 0.22],
                            }),
                          }),
                        ],
                      }),
                      jsxRuntime.jsx("points", {
                        ref: Oe,
                        geometry: mt,
                        material: Ne,
                        renderOrder: 4,
                      }),
                    ],
                  }),
                  jsxRuntime.jsx(Ze, {
                    ref: nt,
                    color: de,
                    position: [0, 0.1, -0.32],
                    intensity: 0,
                    distance: 1.8,
                    decay: 2,
                  }),
                  jsxRuntime.jsx(Ze, {
                    ref: rt,
                    color: "#c9b487",
                    position: [0.42, 0.18, 0.28],
                    intensity: 0,
                    distance: 1.45,
                    decay: 2.2,
                  }),
                  jsxRuntime.jsx(Ze, {
                    ref: at,
                    color: "#ffe4ad",
                    position: [0, 0.12, 0.46],
                    intensity: 0,
                    distance: 1.35,
                    decay: 2,
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    })
  );
}
export { sr as default };
