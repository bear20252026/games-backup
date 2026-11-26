/**
 * 联系池塘（场景分区） —— 由线上 bundle（ContactPond-ZK76ajXT.js）反编译整理
 * 水面、鱼群、纸船与联系方式的交互区域。
 * 说明：变量/函数名仍是压缩后的短名；三方库请从 ../vendor/*.js 引入。
 */
import { React, useEffect, jsxRuntime } from "../vendor/react.js";
import {
  m as Ae,
  _ as q,
  $ as V,
  a0 as oe,
  a1 as Ye,
  a2 as ae,
  B as Je,
  a3 as re,
  w as D,
  u as Ft,
  k as Ce,
  a4 as Wt,
  a5 as et,
  a6 as Bt,
  g as jt,
  a7 as Oe,
  a8 as Et,
  K as Gt,
  a9 as se,
  aa as Ut,
  ab as ie,
  ac as ge,
  ad as Ht,
} from "../main.js";
import {
  Color,
  aY as Yt,
  Group,
  Box3,
  Vector3,
  a5 as Vt,
  a_ as $t,
  aF as y,
  MeshStandardMaterial,
  H as At,
  b8 as Kt,
  MeshBasicMaterial,
  Matrix4,
  Quaternion,
  RingGeometry,
  SphereGeometry,
  PlaneGeometry,
  SpriteMaterial,
  ShaderMaterial,
  Vector2,
  InstancedMesh,
  Euler,
  aT as ao,
  IcosahedronGeometry,
  BufferAttribute,
  BufferGeometry,
  b3 as Ge,
  CanvasTexture,
  S as $e,
  q as Tt,
  at as ot,
} from "../vendor/three.js";
import { a as Pe } from "../data/projects.js";
import "../vendor/rapier.js";
import "../vendor/gsap.js";
const so = "/assets/Fish-7rIe5fDV.glb",
  io = "/assets/pond_pack-mjsi-7jK.glb",
  lo = "#e0561c",
  co = 0.55,
  ho = 9.5,
  kt = 5.2,
  Ee = 1.62,
  at = 1.72,
  Dt = 1.95,
  uo = 0.5,
  we = 0.12,
  Le = 0.09,
  Nt = 0.36,
  po = 0.13,
  Ie = 0.6,
  mo = 0.3,
  fo = 1.45,
  xe = [
    {
      name: "Ember",
      seed: 20897,
      scale: 1,
      body: [1, 1, 1],
      x: 0.6,
      z: 1.3,
    },
    {
      name: "Rust",
      seed: 40503,
      scale: 0.92,
      body: [0.78, 0.6, 0.62],
      x: -0.9,
      z: 0.4,
    },
    {
      name: "Marigold",
      seed: 11291,
      scale: 0.84,
      body: [1.04, 1.75, 1.4],
      x: 0.2,
      z: -1.2,
    },
    {
      name: "Coral",
      seed: 32586,
      scale: 0.78,
      body: [1, 1.3, 2.2],
      x: -0.5,
      z: -0.4,
    },
    {
      name: "Fry",
      seed: 15765,
      scale: 0.66,
      body: [1.06, 0.82, 0.55],
      x: 1,
      z: 0.1,
    },
  ],
  Ue = {
    uPondWaterY: {
      value: 0,
    },
    uPondScatter: {
      value: new Color("#0b2a2e"),
    },
  };
function go(e) {
  ((e.onBeforeCompile = (o) => {
    (Object.assign(o.uniforms, Ue),
      (o.vertexShader = o.vertexShader
        .replace(
          "#include <common>",
          `#include <common>
varying float vPondWorldY;`,
        )
        .replace(
          "#include <project_vertex>",
          `#include <project_vertex>
vPondWorldY = (modelMatrix * vec4(transformed, 1.0)).y;`,
        )),
      (o.fragmentShader = o.fragmentShader
        .replace(
          "#include <common>",
          `#include <common>
varying float vPondWorldY;
uniform float uPondWaterY;
uniform vec3 uPondScatter;`,
        )
        .replace(
          "#include <tonemapping_fragment>",
          `{
    float pondDepth = max(uPondWaterY - vPondWorldY, 0.0);
    vec3 pondPass = exp(-pondDepth * vec3(2.2, 1.05, 0.8));
    gl_FragColor.rgb = gl_FragColor.rgb * pondPass + uPondScatter * (1.0 - pondPass.g);
}
#include <tonemapping_fragment>`,
        )));
  }),
    (e.customProgramCacheKey = () => "pond-fish-underwater-v1"));
}
function vo(e, o, { phase: a = 0, body: n = null } = {}) {
  const d =
    o.find((M) => /swim/i.test(M.name)) ??
    o.find((M) => M.name === "Animation") ??
    o[0];
  if (!d) throw new Error("Pond fish requires its authored swim animation");
  const t = Yt(e),
    s = new Group(),
    i = new Set(),
    h = new Set(),
    r = new Map();
  (t.traverse((M) => {
    if (!M.isMesh) return;
    const U = (Y) => {
      if (!r.has(Y)) {
        const I = Y.clone();
        (n && I.name === "FishBody" && I.color.setRGB(...n),
          go(I),
          r.set(Y, I),
          i.add(I));
      }
      return r.get(Y);
    };
    ((M.material = Array.isArray(M.material)
      ? M.material.map(U)
      : U(M.material)),
      (M.castShadow = !1),
      (M.receiveShadow = !1),
      M.isSkinnedMesh && (h.add(M.skeleton), (M.frustumCulled = !1)));
  }),
    t.updateMatrixWorld(!0));
  const x = new Box3().setFromObject(t),
    R = x.getSize(new Vector3());
  (t.position.sub(x.getCenter(new Vector3())), s.add(t));
  const N = t.getObjectByName("Face"),
    L = t.getObjectByName("Tail");
  if (!N || !L) throw new Error("Pond fish is missing its Face/Tail rig");
  const j = N.getWorldPosition(new Vector3()).sub(
    L.getWorldPosition(new Vector3()),
  );
  ((j.y = 0),
    j.normalize(),
    s.quaternion.setFromUnitVectors(j, new Vector3(1, 0, 0)),
    s.scale.setScalar(uo / Math.max(R.x, R.z)));
  const C = new Vt(t),
    H = C.clipAction(d)
      .setLoop($t, 1 / 0)
      .play();
  return (
    (H.time = a % d.duration),
    C.update(0),
    {
      model: s,
      mixer: C,
      action: H,
      dispose() {
        (C.stopAllAction(),
          C.uncacheRoot(t),
          h.forEach((M) => M.dispose()),
          i.forEach((M) => M.dispose()));
      },
    }
  );
}
function xo(e, o) {
  return Ye - ae(q(e, o));
}
const nt = (e) => y.euclideanModulo(e + Math.PI, Math.PI * 2) - Math.PI;
function Ct(e, o) {
  return Math.max(we, Math.min(Nt, xo(e, o) - po));
}
function rt(e, o, a) {
  const n = oe(e() * Math.PI * 2, o * Math.sqrt(e()));
  return ((a.x = n.x), (a.z = n.z), a);
}
function Ke(e, o) {
  const a = q(e.x, e.z);
  return (a > o && ((e.x *= o / a), (e.z *= o / a)), e);
}
function wo(e = xe) {
  return e.map((o) => {
    const a = Ae(o.seed),
      n = {
        config: o,
        rng: a,
        x: o.x,
        z: o.z,
        depth: 0.16 + a() * 0.12,
        heading: a() * Math.PI * 2,
        speed: 0.08,
        yawRate: 0,
        pitch: 0,
        roll: 0,
        accel: 0,
        animRate: 1,
        intent: null,
        intentTime: 0,
        duration: 0,
        targetX: 0,
        targetZ: 0,
        targetDepth: 0.2,
        targetSpeed: 0.1,
        speedResponse: 2,
        sipped: !1,
        meander: a() * 100,
        jump: null,
      };
    return (qe(n, null, !1), n);
  });
}
const G = {
  x: 0,
  z: 0,
};
function st(e, o, a) {
  ((G.x = e.x + Math.cos(e.heading + o) * a),
    (G.z = e.z + Math.sin(e.heading + o) * a),
    Ke(G, Ee),
    (e.targetX = G.x),
    (e.targetZ = G.z));
}
function qe(e, o, a) {
  const { rng: n } = e,
    d = e.intent,
    t = n();
  e.intentTime = 0;
  const s = 0.14,
    i = s + (o ? 0.18 : 0.08),
    h = i + 0.08;
  if (d === "dart") {
    ((e.intent = "glide"),
      (e.targetSpeed = 0.035),
      (e.speedResponse = 0.7),
      (e.duration = 1.4 + n() * 1.6));
    return;
  }
  if (t < s && d !== "hover") {
    ((e.intent = "hover"),
      (e.targetSpeed = 0.012),
      (e.speedResponse = 1.1),
      (e.duration = 2 + n() * 4));
    return;
  }
  if (t < i) {
    ((e.intent = "sip"),
      (e.targetSpeed = 0.07 + n() * 0.04),
      (e.speedResponse = 1.4),
      (e.duration = 9),
      (e.sipped = !1),
      st(e, (n() - 0.5) * 1.6, 0.35 + n() * 0.6));
    return;
  }
  if (t < h && !a) {
    ((e.intent = "dart"),
      (e.targetSpeed = 0.42 + n() * 0.16),
      (e.speedResponse = 9),
      (e.duration = 0.45 + n() * 0.45),
      st(e, (n() < 0.5 ? -1 : 1) * (0.6 + n() * 1.1), 1.2));
    return;
  }
  if (
    ((e.intent = "cruise"),
    (e.targetSpeed = a ? 0.06 + n() * 0.05 : 0.08 + n() * 0.12),
    (e.speedResponse = 1.6),
    (e.duration = 14),
    o && n() < 0.6)
  ) {
    const r = Math.atan2(o.z / V.z, o.x / V.x) + (n() - 0.5) * 0.9,
      x = oe(r, fo + (n() - 0.5) * 0.35);
    ((G.x = x.x), (G.z = x.z));
  } else (rt(n, Ee, G), Math.hypot(G.x - e.x, G.z - e.z) < 1 && rt(n, Ee, G));
  ((e.targetX = G.x),
    (e.targetZ = G.z),
    (e.targetDepth = we + 0.03 + n() * (Nt - we - 0.03)));
}
const ze = 0.95,
  yo = 0.36,
  Ot = 0.85;
function bo(e) {
  let o = null,
    a = 1 / 0;
  for (const n of e) {
    if (n.jump || n.intent === "hover") continue;
    const d = Ot * ze + 0.4,
      t = n.x + Math.cos(n.heading) * d,
      s = n.z + Math.sin(n.heading) * d;
    if (
      q(t, s) > Ee ||
      !e.every(
        (r) =>
          r === n ||
          Math.hypot(
            r.x + Math.cos(r.heading) * r.speed * ze - t,
            r.z + Math.sin(r.heading) * r.speed * ze - s,
          ) > 0.9,
      )
    )
      continue;
    const h = n.depth + Math.abs(n.speed - 0.2);
    h < a && ((a = h), (o = n));
  }
  return o
    ? ((o.jump = {
        time: 0,
        fromDepth: o.depth,
        splashedOut: !1,
        splashedIn: !1,
      }),
      o)
    : null;
}
function Ro(e, o, { visitor: a = null, calm: n = !1, events: d = null } = {}) {
  if (!(o <= 0))
    for (const t of e) {
      if (t.jump) {
        Mo(t, o, d);
        continue;
      }
      if (
        ((t.intentTime += o),
        t.intent === "sip" && !t.sipped && t.depth < Le + 0.012)
      ) {
        t.sipped = !0;
        const T = 0.14 * t.config.scale;
        d == null ||
          d.push({
            type: "sip",
            x: t.x + Math.cos(t.heading) * T,
            z: t.z + Math.sin(t.heading) * T,
          });
      }
      const s =
          t.intent === "hover" || t.intent === "glide" || t.intent === "dart",
        i = Math.hypot(t.targetX - t.x, t.targetZ - t.z);
      (t.intent === "sip"
        ? t.sipped || t.intentTime > t.duration
        : t.intentTime > t.duration || (!s && i < 0.22)) && qe(t, a, n);
      let r, x;
      if (
        t.intent === "hover" ||
        t.intent === "glide" ||
        (t.intent === "sip" && i < 0.22)
      )
        ((r = Math.cos(t.heading)), (x = Math.sin(t.heading)));
      else {
        const T = i || 1;
        ((r = (t.targetX - t.x) / T), (x = (t.targetZ - t.z) / T));
      }
      const R = 0.45 + t.speed * 1.6,
        N = q(t.x + Math.cos(t.heading) * R, t.z + Math.sin(t.heading) * R);
      if (N > at - 0.15) {
        const T = y.clamp((N - (at - 0.15)) / 0.3, 0, 1) * 3,
          Z = Math.hypot(t.x, t.z) || 1;
        ((r -= (t.x / Z) * T), (x -= (t.z / Z) * T));
      }
      let L = 0;
      for (const T of e) {
        if (T === t || T.jump) continue;
        const Z = t.x - T.x,
          J = t.z - T.z,
          F = Math.hypot(Z, J);
        if (F > Ie || F < 1e-5) continue;
        const me = (1 - F / Ie) ** 2 * 2.4;
        ((r += (Z / F) * me),
          (x += (J / F) * me),
          -(Z * Math.cos(t.heading) + J * Math.sin(t.heading)) / F > 0.5 &&
            (L = Math.max(L, 1 - F / Ie)));
        const ee = mo * (t.config.scale + T.config.scale) * 0.5;
        if (F < ee) {
          const fe = Math.min((ee - F) * 0.5, o * 0.15);
          ((t.x += (Z / F) * fe), (t.z += (J / F) * fe));
        }
      }
      const j =
        (Math.sin(t.meander * 0.83) * 0.22 +
          Math.sin(t.meander * 2.3 + 1.7) * 0.08) *
        (t.intent === "hover" ? 0.3 : 1);
      t.meander += o * (0.6 + t.speed * 2);
      const C = Math.atan2(x, r) + (t.intent === "dart" ? 0 : j),
        H = nt(C - t.heading),
        M = t.intent === "dart" ? 3.2 : 0.75 + 0.9 * Math.exp(-t.speed * 9),
        U = y.clamp(H * 1.8, -M, M);
      ((t.yawRate = y.damp(t.yawRate, U, t.intent === "dart" ? 12 : 4, o)),
        (t.heading = nt(t.heading + t.yawRate * o)));
      const Y = 1 - 0.45 * Math.min(Math.abs(H) / Math.PI, 1),
        I = Math.max(0.01, t.targetSpeed * Y * (1 - L * 0.7)),
        ye = I < t.speed ? Math.min(t.speedResponse, 1.1) : t.speedResponse,
        he = t.speed;
      ((t.speed = y.damp(t.speed, I, ye, o)),
        (t.accel = y.damp(t.accel, (t.speed - he) / o, 6, o)),
        (t.x += Math.cos(t.heading) * t.speed * o),
        (t.z += Math.sin(t.heading) * t.speed * o),
        Ke(t, Dt));
      const ne = Ct(t.x, t.z),
        de = t.intent === "sip" ? Le : we,
        ue = t.intent === "sip" ? Le : y.clamp(t.targetDepth, we, ne),
        pe = t.depth;
      ((t.depth = y.damp(t.depth, ue, 0.25 + t.speed * 4, o)),
        (t.depth = y.clamp(t.depth, Math.min(de, t.depth), ne)));
      const Q = (pe - t.depth) / o;
      ((t.pitch = y.damp(
        t.pitch,
        y.clamp(Math.atan2(Q, Math.max(t.speed, 0.06)), -0.45, 0.45),
        5,
        o,
      )),
        (t.roll = y.damp(
          t.roll,
          y.clamp(-t.yawRate * (0.08 + t.speed * 0.6), -0.4, 0.4),
          5,
          o,
        )));
      const be = co + t.speed * ho + Math.max(t.accel, 0) * 5;
      t.animRate = y.damp(t.animRate, Math.min(be, kt), 6, o);
    }
}
function Mo(e, o, a) {
  const n = e.jump;
  n.time += o;
  const d = n.time / ze;
  if (
    ((e.speed = y.damp(e.speed, Ot, 10, o)),
    (e.x += Math.cos(e.heading) * e.speed * o),
    (e.z += Math.sin(e.heading) * e.speed * o),
    Ke(e, Dt),
    (e.animRate = kt),
    (e.yawRate = 0),
    (e.roll = y.damp(e.roll, 0, 6, o)),
    d < 1)
  ) {
    const t = e.depth;
    e.depth = n.fromDepth - Math.sin(d * Math.PI) * (yo + n.fromDepth);
    const s = (t - e.depth) / o;
    ((e.pitch = y.clamp(Math.atan2(s, e.speed), -0.9, 0.9)),
      !n.splashedOut &&
        e.depth < 0 &&
        ((n.splashedOut = !0),
        a == null ||
          a.push({
            type: "leap-out",
            x: e.x,
            z: e.z,
          })),
      n.splashedOut &&
        !n.splashedIn &&
        d > 0.5 &&
        e.depth > 0 &&
        ((n.splashedIn = !0),
        a == null ||
          a.push({
            type: "leap-in",
            x: e.x,
            z: e.z,
          })));
    return;
  }
  ((e.depth = Math.min(e.depth + o * 0.4, Ct(e.x, e.z))),
    (e.pitch = y.damp(e.pitch, 0, 4, o)),
    d > 1.4 &&
      ((e.jump = null),
      (e.intent = "dart"),
      qe(e, null, !0),
      (e.speedResponse = 2.6)));
}
function Po() {
  return new ShaderMaterial({
    transparent: !0,
    depthWrite: !1,
    uniforms: {
      uTime: {
        value: 0,
      },
      uDeep: {
        value: new Color("#184d55"),
      },
      uShallow: {
        value: new Color("#51867b"),
      },
      uBank: {
        value: new Color("#1b2a1c"),
      },
      uLampPos: {
        value: new Vector3(0, 1, 0),
      },
      uLampColor: {
        value: new Color("#ffb066"),
      },
      uLampStrength: {
        value: 0,
      },
      uSkyHorizon: {
        value: new Color("#4e8dc2"),
      },
      uSkyZenith: {
        value: new Color("#285f9f"),
      },
      uSunColor: {
        value: new Color("#fff0c2"),
      },
      uSunDir: {
        value: new Vector3(0.5, 0.75, 0.35).normalize(),
      },
      uWindDir: {
        value: new Vector2(1, 0),
      },
      uWindSpeed: {
        value: 0.3,
      },
      uRainAmount: {
        value: 0,
      },
      uNightAmount: {
        value: 0,
      },
      uStretch: {
        value: new Vector2(V.x, V.z),
      },
      uReveal: {
        value: 1,
      },
      uEdgeCenter: Oe.uniforms.uEdgeCenter,
      uEdgeRadius: Oe.uniforms.uEdgeRadius,
      uEdgeFade: Oe.uniforms.uEdgeFade,
    },
    vertexShader: `
            varying vec2 vUv;
            varying vec3 vViewDir;
            varying vec3 vWorldPos;
            void main() {
                vUv = uv;
                vec4 worldPos = modelMatrix * vec4(position, 1.0);
                vWorldPos = worldPos.xyz;
                vViewDir = cameraPosition - worldPos.xyz;
                gl_Position = projectionMatrix * viewMatrix * worldPos;
            }
        `,
    fragmentShader: `
            uniform float uTime;
            uniform vec3 uDeep;
            uniform vec3 uShallow;
            uniform vec3 uBank;
            uniform vec3 uSkyHorizon;
            uniform vec3 uSkyZenith;
            uniform vec3 uSunColor;
            uniform vec3 uSunDir;
            uniform vec2 uWindDir;
            uniform float uWindSpeed;
            uniform float uRainAmount;
            uniform float uNightAmount;
            uniform vec3 uLampPos;
            uniform vec3 uLampColor;
            uniform float uLampStrength;
            uniform vec2 uStretch;
            uniform float uReveal;
            uniform vec2 uEdgeCenter;
            uniform float uEdgeRadius;
            uniform float uEdgeFade;
            varying vec2 vUv;
            varying vec3 vViewDir;
            varying vec3 vWorldPos;

            float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
            float vnoise(vec2 p) {
                vec2 i = floor(p);
                vec2 f = fract(p);
                f = f * f * (3.0 - 2.0 * f);
                return mix(
                    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
                    f.y
                );
            }

            vec3 rainRippleField(vec2 uv, float time) {
                vec2 gridUv = uv * 9.0;
                vec2 baseCell = floor(gridUv);
                vec3 rings = vec3(0.0);

                for (int y = -1; y <= 1; y++) {
                    for (int x = -1; x <= 1; x++) {
                        vec2 cell = baseCell + vec2(float(x), float(y));
                        float seed = hash(cell + vec2(13.7, 5.1));
                        vec2 point = cell + vec2(
                            hash(cell + vec2(3.2, 9.7)),
                            hash(cell + vec2(8.3, 2.4))
                        );
                        float age = fract(time * (0.48 + seed * 0.22) + seed);
                        float radius = age * 0.72;
                        vec2 offset = gridUv - point;
                        float distanceToPoint = length(offset);
                        float wave = (distanceToPoint - radius) / 0.075;
                        float envelope = exp(-wave * wave) * smoothstep(0.0, 0.09, age)
                            * pow(1.0 - age, 2.4);
                        rings.x += envelope;
                        rings.yz += (-2.0 * wave / 0.075) * envelope
                            * offset / max(distanceToPoint, 0.001);

                    }
                }

                return rings;
            }

            // Two drifting octaves plus a directional swell. Removing the
            // third octave saves three noise evaluations per water pixel
            // because the height is sampled for the centre and both slopes.
            float surfaceHeight(vec2 uv, vec2 flow) {
                float h = vnoise(uv * 7.0 + flow) * 0.56;
                h += vnoise(uv * 13.0 + flow * 1.6 + vec2(3.7, 9.2)) * 0.3;
                vec2 centered = (uv - 0.5) * 2.0;
                h += (sin(dot(centered, uWindDir) * 9.0 - uTime * 1.9) * 0.5 + 0.5) * 0.12;
                return h;
            }

            void main() {
                vec2 centered = (vUv - 0.5) * 2.0;
                float radial = length(centered);
                vec2 flow = uWindDir * uTime * uWindSpeed;
                // The same disc UV, stretched to the pond's real proportions.
                // Shape terms (radial, depth, shoreline) stay on vUv; texture
                // terms (ripples, sparkles, foam) read nUv so they keep one
                // size across the whole oval.
                vec2 nUv = 0.5 + (vUv - 0.5) * uStretch;

                // Analytic slope from offset height samples: stable, smooth
                // normals (screen-space derivatives crumble into pixel grit
                // at the gameplay camera's grazing angles).
                float slopeStep = 0.014;
                float h0 = surfaceHeight(nUv, flow);
                float hx = surfaceHeight(nUv + vec2(slopeStep, 0.0), flow);
                float hy = surfaceHeight(nUv + vec2(0.0, slopeStep), flow);
                vec2 slope = vec2(hx - h0, hy - h0) / slopeStep;

                float rainRings = 0.0;
                if (uRainAmount > 0.001) {
                    vec3 rainField = rainRippleField(nUv, uTime);
                    rainRings = min(rainField.x, 1.0);
                    slope += rainField.yz * 0.42 * uRainAmount;
                }

                // A sheltered pond is close to a mirror. At 0.075 the surface
                // tilted far enough that every ripple threw the reflection from
                // sky to bank and back, mottling the water into camouflage
                // rather than reading as a gentle chop. Calming the normals is
                // what makes it sit still.
                vec3 normal = normalize(vec3(-slope.x * 0.028, 1.0, -slope.y * 0.028));
                vec3 viewDir = normalize(vViewDir);
                // Clamped hard on both ends: float error can push the dot a
                // hair past 1.0, and pow() of a negative base is NaN — one
                // NaN pixel through the bloom mip chain wipes the whole
                // frame white/black (the "blinking" on the pond approach).
                float facing = clamp(dot(viewDir, normal), 0.0, 1.0);

                // Schlick fresnel, uncapped on purpose. Seen from the bank the
                // view is grazing, and grazing water is a mirror. The old 0.52
                // cap plus a 0.4 clamp on the weight below meant well over half
                // of every pixel was a fixed body colour, so the pond stayed the
                // same shade at noon, dusk and midnight while the meadow around
                // it changed with the hour. That was the whole problem.
                float fresnel = 0.02 + 0.98 * pow(1.0 - facing, 5.0);

                // Approximate the bowl's physical depth beneath this water UV.
                // Absorption increases continuously toward the deeper centre.
                // Depth of the dig beneath this point — pondGroundHeight in
                // pondLayout.js, restated: a straight cut below the shoreline,
                // then the bed's bowl. Shallow right at the bank, so the soil
                // of the cut shows through the edge of the water.
                float pondD = radial * ${He.toFixed(3)};
                float cutSlope = ${So.toFixed(4)};
                float waterDepth = max(${Et.toFixed(3)} - pondD, 0.0) * cutSlope;
                float bowlT = min(pondD / ${lt.toFixed(3)}, 1.0);
                waterDepth += 0.32 * (1.0 - bowlT * bowlT) * step(pondD, ${lt.toFixed(3)});
                waterDepth = max(waterDepth, 0.0) + 0.02;
                // Absorption per channel rather than one grey fade: red goes
                // first, so the shallows stay clear and faintly green over the
                // sand while the middle deepens to teal instead of to grey.
                vec3 absorbed = exp(-waterDepth * vec3(3.1, 1.55, 1.2));
                float deepFactor = 1.0 - dot(absorbed, vec3(0.3333));
                vec3 base = mix(uShallow, uDeep, deepFactor);
                base *= mix(vec3(1.0), absorbed * 1.25 + 0.2, 0.35);

                // Fake refraction: the body colour wobbles with the surface
                // slope, as if the bed beneath were bending with the waves.
                base *= 1.0 + (normal.x + normal.z) * 0.18;

                // The body is lit, not self-luminous. Warming it toward the
                // sun's colour by day and dropping it to a cold, much darker
                // tone at night is what puts the water in the same hour as the
                // meadow around it.
                vec3 bodyLight = mix(vec3(1.0), uSunColor, 0.30);
                bodyLight = mix(bodyLight, vec3(0.17, 0.24, 0.36), uNightAmount);
                base *= bodyLight;

                // ---- what the surface mirrors ---------------------------
                // A ray leaving at a shallow angle hits the far bank and the
                // trees on it, not the sky. That detail is what makes water
                // read as water — and it is also what keeps a strongly
                // reflective surface from flattening into a pale disc, because
                // the grazing angles that reflect hardest are exactly the ones
                // aimed at the dark treeline.
                vec3 reflectedRay = reflect(-viewDir, normal);
                float up = clamp(reflectedRay.y, 0.0, 1.0);
                // Wide ramps on purpose. Narrow ones made every ripple swing
                // the reflection the whole way from dark bank to bright sky,
                // and the surface marbled into oily streaks at dawn and dusk.
                // Spreading the transition lets the ripples modulate the
                // reflection instead of switching it.
                vec3 mirrored = mix(mix(uBank, uSkyHorizon, 0.55), uSkyHorizon, smoothstep(0.0, 0.34, up));
                mirrored = mix(mirrored, uSkyZenith, smoothstep(0.30, 0.88, up));

                // ---- the far bank, mirrored ------------------------------
                // The single strongest "this is water" cue: a dark band along
                // the far shore where the grassy bank hangs upside down in it.
                // Worked out from the geometry rather than a second render.
                // March the view ray across the water to the far rim; a bank
                // of height H stands there, and similar triangles say its
                // reflection reaches L = H * D / h back toward the viewer,
                // where D is how far away that rim is and h the eye height.
                vec2 toFrag = vWorldPos.xz - cameraPosition.xz;
                float eyeDistance = length(toFrag);
                vec2 viewXZ = toFrag / max(eyeDistance, 0.0001);
                // Into the disc's unit space: world X is U, world Z is -V.
                vec2 perMetre = vec2(viewXZ.x, -viewXZ.y)
                    / (${He} * uStretch);
                float unitsPerMetre = max(length(perMetre), 0.0001);
                vec2 rayDir = perMetre / unitsPerMetre;
                float pd = dot(centered, rayDir);
                float farRim = -pd + sqrt(max(pd * pd - (dot(centered, centered) - 1.0), 0.0));
                float toRim = farRim / unitsPerMetre;
                float eyeHeight = max(cameraPosition.y - vWorldPos.y, 0.35);
                // The bank's skyline is ragged — tufts, stones, a gap — so its
                // height wanders along the rim instead of being one ruler line.
                // Noise on the rim point itself, not on its angle: atan()
                // jumps from π to -π on the far side, and that cut a hard
                // vertical seam through the reflected bank.
                vec2 rimPoint = centered + rayDir * farRim;
                float bankHeight = 0.62 + 0.5 * vnoise(rimPoint * 3.2 + vec2(1.7, 4.3));
                float bankReach = bankHeight * (eyeDistance + toRim) / eyeHeight;
                // Ripples shred the band's lower edge rather than blurring it.
                float bankEdge = toRim / max(bankReach, 0.001) + (h0 - 0.45) * 0.35;
                float bankMask = 1.0 - smoothstep(0.62, 1.0, bankEdge);
                // Beyond the rim is not this pond's business.
                bankMask *= step(radial, 1.0);
                // A touch of green-gold where the grass tips catch the light.
                vec3 bankColor = mix(uBank, uBank * 1.9 + vec3(0.03, 0.04, 0.0),
                    smoothstep(0.55, 1.0, bankEdge));
                mirrored = mix(mirrored, bankColor, bankMask);

                // Stylised on purpose: at the gameplay camera's ~25° the
                // physical fresnel is 6%, which reflects nothing you can read.
                float reflectivity = clamp(0.16 + fresnel * 0.84, 0.05, 0.94);
                reflectivity = max(reflectivity, bankMask * 0.74);
                vec3 color = mix(base, mirrored, reflectivity);

                // Sun sparkles on ripple crests by day, moon glints after
                // dark: a tight lobe broken by drifting noise so the light
                // twinkles instead of smearing.
                // A view ray can briefly become the exact opposite of the
                // sun ray while the camera crosses the shore. normalize(0)
                // is undefined on mobile GPUs and was the last path that
                // could feed NaNs into bloom, making the entire frame flash.
                vec3 halfVector = viewDir + normalize(uSunDir);
                float halfLengthSq = max(dot(halfVector, halfVector), 0.000001);
                vec3 halfDir = halfVector * inversesqrt(halfLengthSq);
                float lobe = clamp(dot(normal, halfDir), 0.0, 1.0);
                // Finer and gentler than before. Once the surface was calmed the
                // specular lobe stopped varying across the pond, so this mask
                // was no longer breaking a highlight into sparkles — it was the
                // only thing modulating an otherwise flat sheen, and painted its
                // own noise onto the water as pale blotches.
                float sparkleMask = 0.25 + 0.55 * vnoise(nUv * 72.0 + flow * 3.2);
                float glint = pow(lobe, 240.0) * sparkleMask;
                // Tight enough to be a highlight rather than a haze: at 32 this
                // lobe smeared a pale band across a third of the surface.
                // Softer than before: against the darker body the old 0.09
                // lobe read as a hard band lying across the ripples.
                float gloss = pow(lobe, 110.0) * 0.055;
                float clearSky = 1.0 - uRainAmount * 0.82;
                vec3 dayGlint = mix(vec3(1.0, 0.95, 0.8), uSunColor, 0.68);
                color += dayGlint * (glint * 0.55 + gloss)
                    * clearSky * (1.0 - uNightAmount);
                color += vec3(0.62, 0.75, 1.0) * (glint * 0.5 + gloss * 0.4)
                    * clearSky * uNightAmount;
                color += vec3(0.16, 0.32, 0.38) * rainRings * uRainAmount * 0.035;

                color = mix(color, color * vec3(0.36, 0.48, 0.62), uNightAmount);

                // The lantern's reflection. A real one is a long broken smear
                // running from under the lamp toward whoever is looking, and it
                // is the single thing that most makes a night pond read as
                // water rather than a dark hole. Built from that geometry
                // directly: distance along the lamp-to-viewer axis stretches
                // it, distance across the axis narrows it, and the surface
                // height breaks it into the flickering segments a still pond
                // gives back.
                if (uLampStrength > 0.001) {
                    vec2 lampXZ = uLampPos.xz;
                    vec2 toCam = cameraPosition.xz - lampXZ;
                    float toCamLen = max(length(toCam), 0.0001);
                    vec2 axis = toCam / toCamLen;
                    vec2 d = vWorldPos.xz - lampXZ;
                    float along = dot(d, axis);
                    float across = dot(d, vec2(-axis.y, axis.x));

                    // The wobble is what stops it being a painted stripe.
                    across += (h0 - 0.45) * 0.55;

                    // Widens as it runs away from the lamp, the way a real
                    // reflection spreads with the angle it is seen at.
                    float width = 0.055 + max(along, 0.0) * 0.075;
                    float lateral = exp(-(across * across) / (width * width));
                    float reach = clamp(uLampPos.y * 1.5, 0.6, 3.0);
                    float longitudinal = smoothstep(-0.22, 0.06, along)
                        * exp(-max(along, 0.0) / reach);

                    // Broken into segments by the ripple, so it glitters
                    // instead of lying flat on the surface.
                    float segments = 0.55 + 0.45 * vnoise(
                        vec2(along * 5.5 - uTime * 0.55, across * 7.0)
                    );
                    float streak = lateral * longitudinal * segments;
                    color += uLampColor * streak * uLampStrength;
                }

                // Foam where the water meets the stones. Two noise scales do the
                // work: a coarse one pushes the waterline in and out so the band
                // is never a constant width, and a finer one eats holes in it so
                // it breaks into scum and bubbles rather than reading as a
                // painted ring. The slow sine underneath is the lap — the whole
                // collar breathing against the rocks.
                float edgeNoise = vnoise(nUv * 20.0 + flow * 1.4);
                float edgeFine = vnoise(nUv * 46.0 - flow * 2.2);
                // The wobble has to stay small relative to the band or the foam
                // creeps into open water — at 0.13 it reached halfway across the
                // pond and the whole surface went scummy.
                float shore = radial + (edgeNoise - 0.5) * 0.055
                    + (edgeFine - 0.5) * 0.025;

                float lap = smoothstep(0.87, 1.0, shore)
                    * (0.62 + 0.38 * sin(uTime * 0.9 + edgeNoise * 11.0));
                // Bubbles thin out away from the rocks.
                float bubbles = smoothstep(0.55, 0.9, vnoise(nUv * 38.0 + flow * 2.6))
                    * smoothstep(0.9, 1.0, shore);
                float flecks = step(0.72, vnoise(nUv * 30.0 + flow * 2.6))
                    * smoothstep(0.92, 1.0, shore) * 0.55;
                float patches = smoothstep(0.38, 0.72, edgeNoise);
                float foam = clamp(lap * patches * 0.65 + bubbles * 0.45 + flecks, 0.0, 1.0);
                // Foam is wet white, and it keeps a little of itself at night —
                // it is the brightest thing on the water once the sun is gone.
                vec3 foamColor = mix(vec3(0.90, 0.95, 0.93), vec3(0.55, 0.66, 0.72), uNightAmount);
                color = mix(color, foamColor, foam * 0.12 * (1.0 - uNightAmount * 0.65));

                // Optical thickness reveals the sand shelf and retains colour in
                // the deeper bowl; grazing views still reflect the sky.
                float transmission = exp(-waterDepth * 1.35);
                float alpha = 1.0 - transmission * (1.0 - fresnel);
                alpha = max(alpha, foam * 0.48);
                // A wide, noise-broken fade. The old 0.91-1.0 ramp finished in a
                // tenth of the radius, which put a crisp arc exactly where the
                // water meets the stones.
                float organicEdge = radial + (edgeNoise - 0.5) * 0.07
                    + (edgeFine - 0.5) * 0.03;
                alpha *= 1.0 - smoothstep(0.87, 1.01, organicEdge);
                // Where the bank is mirrored the surface is a mirror, not a
                // window. The band lives in exactly the outer tenth the fade
                // above dissolves, so it gets a much later fade of its own —
                // otherwise the pale bed shows through and the band is lost.
                alpha = max(alpha, bankMask * 0.82
                    * (1.0 - smoothstep(0.95, 1.02, organicEdge)));

                // NaN scrub. One NaN pixel from this material walks through
                // the bloom mip chain and wipes the whole frame white (the
                // pond-approach flicker). NaN fails every self-comparison,
                // so each channel falls back to the calm deep colour, and
                // clamp() — which may pass NaN through — runs only after.
                color = vec3(
                    color.r == color.r ? color.r : 0.12,
                    color.g == color.g ? color.g : 0.3,
                    color.b == color.b ? color.b : 0.36
                );
                color = clamp(color, vec3(0.0), vec3(4.0));
                alpha = alpha == alpha ? clamp(alpha, 0.0, 1.0) : 0.8;
                float groundEdge = length(vWorldPos.xz - uEdgeCenter);
                alpha *= 1.0 - smoothstep(uEdgeRadius - 0.4, uEdgeRadius + uEdgeFade * 0.4, groundEdge);
                alpha *= uReveal;
                gl_FragColor = vec4(color, alpha);
                #include <colorspace_fragment>
            }
        `,
  });
}
const He = 2.5,
  X = 0.105,
  le = X - Ye,
  it = X + 0.018,
  So = (2 * -Ye) / (3.55 - Et),
  lt = 1.9;
function zo(e, { segments: o = 48, rings: a = 4, heightAt: n = () => 0 } = {}) {
  const d = [0, 0, n(0)],
    t = [0.5, 0.5],
    s = [];
  for (let h = 1; h <= a; h += 1) {
    const r = h / a,
      x = n(e * r);
    for (let R = 0; R < o; R += 1) {
      const N = (R / o) * Math.PI * 2,
        L = Math.cos(N),
        j = Math.sin(N),
        C = oe(-N, e * r);
      (d.push(C.x, -C.z, x), t.push(0.5 + L * r * 0.5, 0.5 + j * r * 0.5));
    }
  }
  for (let h = 0; h < o; h += 1) s.push(0, 1 + h, 1 + ((h + 1) % o));
  for (let h = 2; h <= a; h += 1) {
    const r = 1 + (h - 2) * o,
      x = 1 + (h - 1) * o;
    for (let R = 0; R < o; R += 1) {
      const N = (R + 1) % o,
        L = r + R,
        j = r + N,
        C = x + R,
        H = x + N;
      s.push(L, C, j, j, C, H);
    }
  }
  const i = new BufferGeometry();
  return (
    i.setIndex(s),
    i.setAttribute("position", new Ge(d, 3)),
    i.setAttribute("uv", new Ge(t, 2)),
    i.computeVertexNormals(),
    i.computeBoundingSphere(),
    i
  );
}
const Eo = zo(He, {
  segments: 128,
  rings: 9,
});
function Ao(e, o) {
  return ae(q(e, o)) + le;
}
const Fe = 1.85,
  ct = [
    ...Array.from(
      {
        length: 8,
      },
      (e, o) => (Fe * o) / 8,
    ),
    ...Array.from(
      {
        length: 31,
      },
      (e, o) => {
        const a = o / 30,
          n = a * a * 0.35 + a * 0.65;
        return Fe + (Ht - Fe) * n;
      },
    ),
  ];
function _o({ segments: e = 176 } = {}) {
  const o = [],
    a = [],
    n = ct.length - 1;
  for (let t = 0; t <= n; t += 1) {
    const s = ct[t],
      i = ae(s);
    for (let h = 0; h < e; h += 1) {
      const r = (h / e) * Math.PI * 2,
        x = oe(r, s);
      o.push(x.x, i, x.z);
    }
  }
  for (let t = 0; t < n; t += 1) {
    const s = t * e,
      i = (t + 1) * e;
    for (let h = 0; h < e; h += 1) {
      const r = (h + 1) % e;
      (a.push(s + h, s + r, i + h), a.push(s + r, i + r, i + h));
    }
  }
  const d = new BufferGeometry();
  return (
    d.setIndex(a),
    d.setAttribute("position", new Ge(o, 3)),
    d.computeVertexNormals(),
    d.computeBoundingSphere(),
    d
  );
}
const To = _o(),
  ht = ["#857e70", "#8f8676", "#7a7466", "#968d7c", "#6f6a5d"];
function ko() {
  const e = Ae(10095905),
    o = [],
    a = (t, s, i, h) => {
      const r = oe(t, s),
        x = ae(s) + le,
        R = i * (0.55 + e() * 0.25);
      o.push({
        x: r.x,
        z: r.z,
        y: x + R * (0.35 - h * 1.1),
        sx: i * (0.95 + e() * 0.35),
        sy: R,
        sz: i * (0.95 + e() * 0.35),
        rx: (e() - 0.5) * 0.6,
        ry: e() * Math.PI * 2,
        rz: (e() - 0.5) * 0.6,
        color: ht[Math.floor(e() * ht.length)],
      });
    },
    n = -0.16,
    d = (t) =>
      Math.abs(y.euclideanModulo(t - n + Math.PI, Math.PI * 2) - Math.PI) <
      0.55;
  for (const t of [0.55, 1.2, 1.75, 2.4, 2.95, 3.6, 4.2, 4.85, 5.45]) {
    const s = t + (e() - 0.5) * 0.18,
      i = 2.55 + e() * 0.3;
    a(s, i, 0.3 + e() * 0.22, 0.5);
    const h = Math.floor(e() * 3);
    for (let r = 0; r < h; r += 1)
      a(s + (e() - 0.5) * 0.22, i + (e() - 0.5) * 0.25, 0.12 + e() * 0.12, 0.4);
  }
  for (const t of [1, 2.2, 3.3, 4.5, 5.6])
    e() < 0.25 ||
      a(t + (e() - 0.5) * 0.2, 2.34 + e() * 0.14, 0.14 + e() * 0.1, 0.35);
  for (let t = o.length - 1; t >= 0; t -= 1) {
    const s = o[t],
      i = Math.atan2(s.z / V.z, s.x / V.x);
    d(i) && s.sx > 0.2 && o.splice(t, 1);
  }
  return (
    [3.4, 3, 2.62].forEach((t, s) => {
      const i = oe(n + (s - 1) * 0.035, t),
        h = 0.34 - s * 0.03;
      o.push({
        x: i.x,
        z: i.z,
        y: ae(t) + le + 0.005,
        sx: h * 1.15,
        sy: h * 0.16,
        sz: h,
        rx: (e() - 0.5) * 0.08,
        ry: e() * Math.PI,
        rz: (e() - 0.5) * 0.08,
        color: "#9a917f",
      });
    }),
    o
  );
}
const ce = ko(),
  Do = ce.map((e) =>
    new Quaternion().setFromEuler(new Euler(e.rx, e.ry, e.rz)),
  ),
  dt = new Matrix4(),
  ut = new Vector3(),
  We = new Vector3();
function No() {
  const e = new IcosahedronGeometry(1, 1),
    o = e.attributes.position,
    a = new Vector3(),
    n = (r) => {
      const x =
        Math.sin(r.x * 12.9898 + r.y * 78.233 + r.z * 37.719) * 43758.5453;
      return x - Math.floor(x);
    };
  for (let r = 0; r < o.count; r += 1) {
    a.fromBufferAttribute(o, r);
    const x = 0.8 + n(a) * 0.34;
    (a.multiplyScalar(x),
      a.y < -0.35 && (a.y = -0.35 + (a.y + 0.35) * 0.4),
      o.setXYZ(r, a.x, a.y, a.z));
  }
  e.computeVertexNormals();
  const d = new Float32Array(o.count * 3),
    t = new Color("#aebf86"),
    s = new Color("#ffffff"),
    i = new Color(),
    h = e.attributes.normal;
  for (let r = 0; r < o.count; r += 1) {
    const x = h.getY(r);
    a.fromBufferAttribute(o, r);
    const R = y.smoothstep(x, 0.45, 0.85) * (0.55 + n(a) * 0.45);
    (i.copy(s).lerp(t, R),
      (d[r * 3] = i.r),
      (d[r * 3 + 1] = i.g),
      (d[r * 3 + 2] = i.b));
  }
  return (e.setAttribute("color", new BufferAttribute(d, 3)), e);
}
function Co() {
  const e = No(),
    o = new MeshStandardMaterial({
      roughness: 1,
      flatShading: !0,
      vertexColors: !0,
    }),
    a = new InstancedMesh(e, o, ce.length),
    n = new Matrix4(),
    d = new Quaternion(),
    t = new Euler(),
    s = new Vector3(),
    i = new Vector3(),
    h = new Color();
  return (
    ce.forEach((r, x) => {
      (s.set(r.x, r.y, r.z),
        t.set(r.rx, r.ry, r.rz),
        d.setFromEuler(t),
        i.set(r.sx, r.sy, r.sz),
        n.compose(s, d, i),
        a.setMatrixAt(x, n),
        a.setColorAt(x, h.set(r.color)));
    }),
    (a.instanceMatrix.needsUpdate = !0),
    a.instanceColor && (a.instanceColor.needsUpdate = !0),
    (a.castShadow = !0),
    (a.receiveShadow = !0),
    a
  );
}
const pt = new Vector3(),
  mt = new Vector3(),
  Oo = new Color("#184d55").multiplyScalar(0.9),
  Be = 48,
  Lo = new SphereGeometry(1, 6, 4),
  ft = new MeshBasicMaterial({
    color: "#cfeef3",
    transparent: !0,
    opacity: 0,
    depthWrite: !1,
  }),
  Io = 5.2,
  gt = new Matrix4(),
  vt = new Vector3(),
  xt = new Vector3(),
  Fo = new Quaternion(),
  ve = 8,
  Wo = new RingGeometry(0.06, 0.12, 32),
  Bo = new MeshBasicMaterial({
    color: "#d8ebe5",
    transparent: !0,
    opacity: 0,
    depthWrite: !1,
    toneMapped: !1,
  });
function jo() {
  const e = document.createElement("canvas");
  ((e.width = 128), (e.height = 128));
  const o = e.getContext("2d"),
    a = o.createRadialGradient(64, 64, 0, 64, 64, 64);
  (a.addColorStop(0, "rgba(232, 242, 236, 0.0)"),
    a.addColorStop(0.34, "rgba(232, 242, 236, 0.30)"),
    a.addColorStop(0.52, "rgba(226, 238, 234, 0.20)"),
    a.addColorStop(0.78, "rgba(220, 234, 232, 0.05)"),
    a.addColorStop(1, "rgba(220, 234, 232, 0.0)"),
    (o.fillStyle = a),
    o.fillRect(0, 0, 128, 128));
  const n = new CanvasTexture(e);
  return (
    (n.colorSpace = $e),
    (n.minFilter = Tt),
    (n.generateMipmaps = !1),
    (n.wrapS = ot),
    (n.wrapT = ot),
    n
  );
}
const Go = jo();
function Uo() {
  const e = document.createElement("canvas");
  ((e.width = 128), (e.height = 128));
  const o = e.getContext("2d"),
    a = o.createRadialGradient(64, 64, 0, 64, 64, 64);
  (a.addColorStop(0, "rgba(255, 246, 214, 0.95)"),
    a.addColorStop(0.22, "rgba(255, 216, 150, 0.72)"),
    a.addColorStop(0.52, "rgba(255, 176, 102, 0.30)"),
    a.addColorStop(0.78, "rgba(255, 150, 80, 0.08)"),
    a.addColorStop(1, "rgba(255, 150, 80, 0.0)"),
    (o.fillStyle = a),
    o.fillRect(0, 0, 128, 128));
  const n = new CanvasTexture(e);
  return ((n.colorSpace = $e), (n.minFilter = Tt), (n.generateMipmaps = !1), n);
}
const Ho = Uo(),
  Yo = new SpriteMaterial({
    map: Ho,
    transparent: !0,
    depthWrite: !1,
    blending: ao,
    opacity: 0.9,
  }),
  Zo = new PlaneGeometry(0.86, 0.86),
  Xo = new MeshBasicMaterial({
    map: Go,
    transparent: !0,
    opacity: 0.85,
    depthWrite: !1,
  }),
  W = 0.11,
  Vo = 0.24,
  wt = W * Math.SQRT2,
  $o = [
    [-W, -W],
    [W, -W],
    [-W, W],
    [W, W],
  ];
function Ko() {
  const e = document.createElement("canvas");
  ((e.width = 512), (e.height = 128));
  const o = e.getContext("2d"),
    a = Ae(28832);
  for (let d = 0; d < 4; d += 1) {
    const t = d * 128;
    ((o.fillStyle = "#f1e4c6"),
      o.fillRect(t, 0, 128, 128),
      (o.globalAlpha = 0.18),
      (o.strokeStyle = "#c9b48c"),
      (o.lineWidth = 1));
    for (let s = 0; s < 26; s += 1) {
      const i = a() * 128;
      (o.beginPath(),
        o.moveTo(t + a() * 40, i),
        o.quadraticCurveTo(
          t + 64,
          i + (a() - 0.5) * 10,
          t + 88 + a() * 40,
          i + (a() - 0.5) * 6,
        ),
        o.stroke());
    }
    if (
      ((o.globalAlpha = 0.22),
      (o.strokeStyle = "#8a6f4b"),
      (o.lineWidth = 8),
      o.strokeRect(t + 4, 4, 120, 120),
      (o.globalAlpha = 0.85),
      (o.strokeStyle = "#a8432c"),
      (o.fillStyle = "#a8432c"),
      (o.lineCap = "round"),
      d % 2 === 0)
    ) {
      o.lineWidth = 5;
      for (let s = 0; s < 3; s += 1) {
        const i = 48 + s * 15;
        (o.beginPath(),
          o.moveTo(t + 32, i),
          o.bezierCurveTo(t + 48, i - 10, t + 56, i + 10, t + 64, i),
          o.bezierCurveTo(t + 72, i - 10, t + 80, i + 10, t + 96, i),
          o.stroke());
      }
    } else
      (o.beginPath(),
        o.arc(t + 64, 60, 18, 0, Math.PI * 2),
        o.fill(),
        (o.globalAlpha = 0.5),
        (o.lineWidth = 3),
        o.beginPath(),
        o.moveTo(t + 38, 92),
        o.lineTo(t + 90, 92),
        o.stroke());
    o.globalAlpha = 1;
  }
  const n = new CanvasTexture(e);
  return ((n.colorSpace = $e), (n.anisotropy = 4), n);
}
const yt = Ko(),
  qo = new MeshStandardMaterial({
    map: yt,
    emissiveMap: yt,
    emissive: new Color(lo),
    emissiveIntensity: 0.16,
    roughness: 0.9,
    side: At,
  }),
  Se = new MeshStandardMaterial({
    color: "#3f2e21",
    roughness: 0.8,
  }),
  bt = 1.75,
  Rt = -0.55,
  je = [
    {
      x: 0.92,
      z: 0.58,
      scale: 0.075,
      tilt: 0.4,
      turn: 1.2,
      color: "#7d7668",
    },
    {
      x: -0.5,
      z: 1.28,
      scale: 0.055,
      tilt: 0.9,
      turn: 3.4,
      color: "#8a8172",
    },
    {
      x: 1.55,
      z: -0.35,
      scale: 0.09,
      tilt: 0.2,
      turn: 5.1,
      color: "#6e6a5c",
    },
    {
      x: -1.35,
      z: -0.85,
      scale: 0.06,
      tilt: 1.3,
      turn: 0.7,
      color: "#93876f",
    },
    {
      x: 0.15,
      z: 1.72,
      scale: 0.07,
      tilt: 0.6,
      turn: 2.2,
      color: "#7a7263",
    },
    {
      x: -1.8,
      z: 0.55,
      scale: 0.08,
      tilt: 0.3,
      turn: 4.3,
      color: "#857b6a",
    },
    {
      x: 0.55,
      z: -1.62,
      scale: 0.05,
      tilt: 1.1,
      turn: 1.8,
      color: "#8f8474",
    },
    {
      x: -0.15,
      z: -0.5,
      scale: 0.045,
      tilt: 0.8,
      turn: 3.9,
      color: "#6f6b5e",
    },
    {
      x: 1.05,
      z: 1.35,
      scale: 0.06,
      tilt: 0.5,
      turn: 0.3,
      color: "#7b7365",
    },
  ].map((e) => ({
    ...e,
    x: e.x * V.x,
    z: e.z * V.z,
  }));
function Mt(e) {
  e.updateWorldMatrix(!0, !1);
  const o = e.geometry.clone();
  o.applyMatrix4(e.matrixWorld);
  for (const n of Object.keys(o.attributes))
    n !== "position" && n !== "normal" && n !== "uv" && o.deleteAttribute(n);
  o.computeBoundingBox();
  const a = o.boundingBox;
  return (
    o.translate(-(a.min.x + a.max.x) / 2, -a.min.y, -(a.min.z + a.max.z) / 2),
    o
  );
}
function Pt(e, o, a, n, d, t) {
  const s = e.clone();
  return (
    s.applyMatrix4(
      new Matrix4().compose(
        new Vector3(o, a, n),
        new Quaternion().setFromEuler(new Euler(0, d, 0)),
        new Vector3(t, t, t),
      ),
    ),
    s
  );
}
const St = [
    {
      proto: 0,
      x: -0.55,
      z: -0.7,
      rotationY: 0.6,
      scale: 1.15,
    },
    {
      proto: 1,
      x: 0.4,
      z: -1.05,
      rotationY: 2.3,
      scale: 0.9,
    },
    {
      proto: 2,
      x: -1.05,
      z: 0.35,
      rotationY: 4.1,
      scale: 1,
    },
    {
      proto: 0,
      x: 0.95,
      z: 0.55,
      rotationY: 1.2,
      scale: 0.82,
    },
    {
      proto: 2,
      x: -0.2,
      z: 1.2,
      rotationY: 5,
      scale: 1.05,
    },
    {
      proto: 1,
      x: -0.9,
      z: 2.05,
      rotationY: 3.2,
      scale: 0.95,
    },
    {
      proto: 0,
      x: -0.45,
      z: 2.55,
      rotationY: 0.9,
      scale: 0.78,
    },
  ].map((e) => ({
    ...e,
    x: e.x * V.x,
    z: e.z * V.z,
  })),
  zt = [
    {
      angle: 1.15,
      radius: 2.34,
      count: 5,
    },
    {
      angle: 3.95,
      radius: 2.4,
      count: 4,
    },
    {
      angle: 0.55,
      radius: 2.42,
      count: 3,
    },
    {
      angle: 5.2,
      radius: 2.3,
      count: 4,
    },
    {
      angle: 2.6,
      radius: 2.36,
      count: 4,
    },
    {
      angle: 4.6,
      radius: 2.4,
      count: 3,
    },
  ];
function na({ revealRef: e }) {
  const o = React.useMemo(() => Po(), []),
    a = React.useMemo(() => Co(), []),
    { scene: n, animations: d } = Je(so),
    { scene: t } = Je(io),
    s = React.useMemo(() => {
      const l = [],
        u = [];
      let g = null;
      t.traverse((c) => {
        if (!c.isMesh) return;
        g || (g = c.material);
        const p = c.name.toLowerCase();
        p.includes("lily")
          ? l.push(Mt(c))
          : p.includes("cattail") && u.push(Mt(c));
      });
      const S = g ? g.clone() : new MeshStandardMaterial();
      S.side = At;
      const k = St.map((c) => ({
          x: c.x,
          y: X + 0.006,
          z: c.z,
          geometry: Pt(l[c.proto % l.length], 0, 0, 0, c.rotationY, c.scale),
        })),
        O = Ae(212302353),
        m = zt.map((c) => {
          const { x: p, z: b } = oe(c.angle, c.radius),
            P = ae(q(p, b)) + le,
            $ = [];
          for (let te = 0; te < c.count; te += 1) {
            const f = u[Math.floor(O() * u.length)],
              A = p + (O() - 0.5) * 0.42,
              E = b + (O() - 0.5) * 0.42;
            $.push(
              Pt(
                f,
                A - p,
                ae(q(A, E)) + le - 0.02 - P,
                E - b,
                O() * Math.PI * 2,
                0.55 + O() * 0.25,
              ),
            );
          }
          const Me = Kt($, !1);
          return (
            $.forEach((te) => te.dispose()),
            {
              x: p,
              y: P,
              z: b,
              geometry: Me,
            }
          );
        });
      return (
        l.forEach((c) => c.dispose()),
        u.forEach((c) => c.dispose()),
        {
          lilyPads: k,
          cattailClumps: m,
          material: S,
        }
      );
    }, [t]),
    i = React.useMemo(
      () =>
        xe.map((l, u) =>
          vo(n, d, {
            phase: u * 0.37,
            body: l.body,
          }),
        ),
      [n, d],
    ),
    h = React.useMemo(() => wo(), []),
    r = React.useRef(),
    x = React.useRef(),
    R = React.useRef(),
    N = React.useRef(),
    L = React.useRef(),
    j = React.useRef([]),
    C = React.useRef([]),
    H = React.useRef([]),
    M = React.useRef(),
    U = React.useMemo(
      () => ({
        rocks: ce.map(re),
        cattails: zt.map(re),
        lilies: St.map(re),
        pebbles: je.map(re),
        swimmers: xe.map(re),
        lantern: re(),
      }),
      [],
    ),
    Y = React.useRef(),
    I = React.useRef(),
    ye = et(),
    he = React.useRef(),
    ne = React.useRef(0),
    de = React.useRef(e ? 0 : 1),
    ue = React.useRef([]),
    pe = React.useRef([]).current,
    Q = React.useRef(-1),
    be = React.useRef(0),
    T = React.useRef(),
    Z = React.useRef(0),
    J = React.useRef(
      Array.from(
        {
          length: Be,
        },
        () => ({
          x: 0,
          y: 0,
          z: 0,
          vx: 0,
          vy: 0,
          vz: 0,
          life: 0,
          span: 1,
          size: 1,
        }),
      ),
    ),
    F = (l, u, g = 1, S = 14) => {
      const k = J.current;
      for (let O = 0; O < S; O += 1) {
        const m = Z.current % Be;
        Z.current += 1;
        const c = k[m],
          p = Math.random() * Math.PI * 2,
          b = (0.35 + Math.random() * 0.85) * g;
        ((c.x = l + Math.cos(p) * 0.03),
          (c.z = u + Math.sin(p) * 0.03),
          (c.y = X + 0.01),
          (c.vx = Math.cos(p) * b),
          (c.vz = Math.sin(p) * b),
          (c.vy = (1.5 + Math.random() * 1.5) * g),
          (c.span = 0.42 + Math.random() * 0.34),
          (c.life = c.span),
          (c.size = (0.012 + Math.random() * 0.016) * Math.min(g, 1.25)));
      }
    },
    me = React.useRef([]),
    De = React.useRef(0),
    ee = React.useMemo(
      () =>
        Array.from(
          {
            length: ve,
          },
          () => Bo.clone(),
        ),
      [],
    ),
    fe = React.useRef(
      Array.from(
        {
          length: ve,
        },
        () => ({
          active: !1,
          x: 0,
          z: 0,
          startTime: 0,
          duration: 0.65,
          maxScale: 3,
        }),
      ),
    ),
    Ne = (l, u, g = 3, S = 0.65) => {
      const k = fe.current,
        O = De.current % ve;
      De.current += 1;
      const m = k[O];
      ((m.active = !0),
        (m.x = l),
        (m.z = u),
        (m.startTime = be.current),
        (m.duration = S),
        (m.maxScale = g));
    };
  React.useEffect(
    () => () => {
      (o.dispose(),
        a.geometry.dispose(),
        a.material.dispose(),
        a.dispose(),
        s.lilyPads.forEach((l) => l.geometry.dispose()),
        s.cattailClumps.forEach((l) => l.geometry.dispose()),
        s.material.dispose(),
        i.forEach((l) => l.dispose()),
        ee.forEach((l) => l.dispose()));
    },
    [o, a, s, i, ee],
  );
  const Qe = React.useRef(!1),
    Lt = (l, u) => {
      const g = Gt(l),
        S = Pe.x,
        k = Pe.z;
      let O = !Qe.current;
      (ce.forEach((m, c) => {
        const p = U.rocks[c];
        (se(p, S + m.x, k + m.z, g), Ut(p) || (O = !0), ie(p, u));
      }),
        O &&
          ((Qe.current = !0),
          ce.forEach((m, c) => {
            const p = ge(U.rocks[c], m.sy * 1.6 + 0.06);
            (ut.set(m.x, m.y + p.offsetY, m.z),
              p.shown
                ? We.set(m.sx * p.lateral, m.sy * p.grow, m.sz * p.lateral)
                : We.setScalar(0),
              dt.compose(ut, Do[c], We),
              a.setMatrixAt(c, dt));
          }),
          (a.instanceMatrix.needsUpdate = !0)),
        s.cattailClumps.forEach((m, c) => {
          const p = U.cattails[c];
          (se(p, S + m.x, k + m.z, g), ie(p, u));
          const b = j.current[c];
          if (!b) return;
          const P = ge(p, 0.6);
          ((b.visible = P.shown),
            b.scale.set(P.lateral, P.grow, P.lateral),
            (b.position.y = m.y + P.offsetY));
        }),
        s.lilyPads.forEach((m, c) => {
          const p = U.lilies[c];
          (se(p, S + m.x, k + m.z, g), ie(p, u));
          const b = C.current[c];
          if (!b) return;
          const P = ge(p, 0);
          ((b.visible = P.shown), b.scale.set(P.lateral, 1, P.lateral));
        }),
        je.forEach((m, c) => {
          const p = U.pebbles[c];
          (se(p, S + m.x, k + m.z, g), ie(p, u));
          const b = H.current[c];
          if (!b) return;
          const P = ge(p, 0);
          ((b.visible = P.shown),
            b.scale.set(
              m.scale * P.lateral,
              m.scale * 0.55 * P.grow,
              m.scale * P.lateral,
            ));
        }),
        xe.forEach((m, c) => {
          const p = U.swimmers[c],
            b = h[c];
          (se(p, S + b.x, k + b.z, g), ie(p, u));
          const P = ue.current[c];
          if (!P) return;
          const $ = y.clamp(p.value, 0, 1);
          ((P.visible = $ > 0.05), P.scale.setScalar(m.scale * $));
        }));
      {
        const m = U.lantern;
        (se(m, S + bt, k + Rt, g), ie(m, u));
        const c = M.current;
        if (c) {
          const p = ge(m, 0.35);
          ((c.visible = p.shown),
            c.scale.set(p.lateral, p.grow, p.lateral),
            (c.position.y = p.offsetY));
        }
      }
    },
    Re = React.useRef(null);
  return (
    useEffect((l, u) => {
      const g = l.clock.elapsedTime;
      if (
        (Re.current === null && (Re.current = g),
        (Re.current += Math.min(u, 0.05) * (1 - D.sleepCalm * 0.75)),
        I.current)
      ) {
        const f = et();
        (f && I.current.material !== f && (I.current.material = f),
          (I.current.visible = !!f));
      }
      const S = Ft.getState(),
        k = S.windParameters,
        O = (e == null ? void 0 : e.current) ?? 1;
      ((de.current = Ce ? O : y.damp(de.current, O, 7, u)),
        y.clamp(de.current, 0, 1),
        Y.current && (Y.current.visible = !0),
        (o.uniforms.uReveal.value = 1),
        Lt(S, u),
        (ne.current = y.damp(ne.current, D.rainAmount, 2.1, u)),
        (o.uniforms.uTime.value = Re.current),
        o.uniforms.uWindDir.value.set(
          Math.cos(k.direction),
          Math.sin(k.direction),
        ),
        (o.uniforms.uWindSpeed.value =
          (0.18 + k.strength * 0.28) * Math.max(0.2, k.speed)),
        (o.uniforms.uRainAmount.value = ne.current),
        (o.uniforms.uNightAmount.value = S.nightAmount ?? 0),
        o.uniforms.uSunDir.value.set(D.sunDirX, D.sunDirY, D.sunDirZ),
        o.uniforms.uSkyHorizon.value.setRGB(
          D.skyHorizonR,
          D.skyHorizonG,
          D.skyHorizonB,
        ),
        o.uniforms.uSkyZenith.value.setRGB(
          D.skyZenithR,
          D.skyZenithG,
          D.skyZenithB,
        ),
        o.uniforms.uSunColor.value.setRGB(
          D.sunColorR,
          D.sunColorG,
          D.sunColorB,
        ),
        o.uniforms.uBank.value.setRGB(
          D.leavesColorR * 0.34,
          D.leavesColorG * 0.38,
          D.leavesColorB * 0.32,
        ),
        x.current
          ? (x.current.getWorldPosition(pt),
            o.uniforms.uLampPos.value.copy(pt),
            (o.uniforms.uLampStrength.value =
              y.clamp((S.nightAmount ?? 0) * 1.15, 0, 1) * 0.85))
          : (o.uniforms.uLampStrength.value = 0),
        r.current &&
          ((r.current.position.y = it + Math.sin(g * 1.1) * 0.018),
          (r.current.rotation.y = g * 0.15),
          (r.current.rotation.x = Math.sin(g * 0.85) * 0.06),
          (r.current.rotation.z = Math.sin(g * 0.7) * 0.06)));
      {
        const f = y.smoothstep(S.nightAmount ?? 0, 0.12, 0.78);
        (x.current && (x.current.intensity = f * 1),
          N.current && (N.current.material.opacity = 0.12 + f * 0.78),
          R.current && (R.current.material.emissiveIntensity = 0.13 + f * 0.7));
      }
      (L.current &&
        ((L.current.rotation.y = Math.sin(g * 0.16) * 0.012),
        (L.current.position.y = Math.sin(g * 0.55) * 0.003)),
        (be.current = g));
      const m = J.current,
        c = T.current;
      if (c) {
        const f = Math.min(u, 0.05);
        let A = 0;
        for (let E = 0; E < m.length; E += 1) {
          const z = m[E];
          z.life > 0 &&
            ((z.life -= f),
            (z.vy -= Io * f),
            (z.x += z.vx * f),
            (z.y += z.vy * f),
            (z.z += z.vz * f),
            z.y <= X && (z.life = 0));
          const K = Math.max(z.life, 0) / z.span;
          (K > A && (A = K),
            vt.set(z.x, z.y, z.z),
            xt.setScalar(K > 0 ? z.size : 0),
            gt.compose(vt, Fo, xt),
            c.setMatrixAt(E, gt));
        }
        ((c.instanceMatrix.needsUpdate = !0),
          (c.visible = A > 0),
          (ft.opacity = Math.min(1, A * 1.5) * 0.9));
      }
      const p = fe.current;
      for (let f = 0; f < ve; f++) {
        const A = p[f],
          E = me.current[f];
        if (!E) continue;
        if (!A.active) {
          E.visible = !1;
          continue;
        }
        const K = (g - A.startTime) / A.duration;
        K >= 1
          ? ((A.active = !1), (E.visible = !1))
          : ((E.visible = !0),
            E.position.set(A.x, X + 0.006, A.z),
            E.scale.setScalar(y.lerp(0.5, A.maxScale, K)),
            (ee[f].opacity = (1 - K) * (1 - K) * 0.55));
      }
      const b = S.ballPosition,
        P = b.x - Pe.x,
        $ = b.z - Pe.z,
        Me = q(P, $) < Wt + 0.8;
      Me && !Ce
        ? (Q.current < 0 && (Q.current = g + 6 + Math.random() * 6),
          g >= Q.current && (bo(h), (Q.current = g + 18 + Math.random() * 16)))
        : (Q.current = -1);
      const te = Math.min(u, 0.05);
      ((pe.length = 0),
        Ro(h, te, {
          visitor: Me
            ? {
                x: P,
                z: $,
              }
            : null,
          calm: Ce,
          events: pe,
        }));
      for (const f of pe)
        f.type === "sip"
          ? Ne(f.x, f.z, 1.7, 1.5)
          : f.type === "leap-out"
            ? (F(f.x, f.z, 0.95, 14), Ne(f.x, f.z, 2.7, 0.9))
            : (F(f.x, f.z, 1.3, 18), Ne(f.x, f.z, 3.4, 1.1));
      (he.current &&
        (he.current.localToWorld(mt.set(0, X, 0)),
        (Ue.uPondWaterY.value = mt.y)),
        Ue.uPondScatter.value
          .copy(Oo)
          .multiplyScalar(1 - 0.85 * (S.nightAmount ?? 0)),
        h.forEach((f, A) => {
          const E = ue.current[A];
          if (
            E &&
            (E.position.set(f.x, X - f.depth, f.z),
            E.rotation.set(f.roll, -f.heading, f.pitch, "YXZ"),
            E.visible)
          ) {
            const z = i[A];
            (z.action.setEffectiveTimeScale(f.animRate), z.mixer.update(te));
          }
        }));
    }),
    jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [
        jsxRuntime.jsx("mesh", {
          ref: I,
          geometry: To,
          material: ye ?? void 0,
          visible: !!ye,
          receiveShadow: !0,
          dispose: null,
        }),
        jsxRuntime.jsxs("group", {
          position: [0, -le, 0],
          children: [
            jsxRuntime.jsxs("group", {
              ref: Y,
              visible: !e,
              children: [
                je.map((l, u) =>
                  jsxRuntime.jsxs(
                    "mesh",
                    {
                      ref: (g) => {
                        H.current[u] = g;
                      },
                      position: [l.x, Ao(l.x, l.z) + l.scale * 0.34, l.z],
                      rotation: [l.tilt, l.turn, 0],
                      scale: [l.scale, l.scale * 0.55, l.scale],
                      children: [
                        jsxRuntime.jsx("dodecahedronGeometry", {
                          args: [1, 0],
                        }),
                        jsxRuntime.jsx("meshStandardMaterial", {
                          color: l.color,
                          roughness: 0.9,
                          flatShading: !0,
                        }),
                      ],
                    },
                    u,
                  ),
                ),
                jsxRuntime.jsx("mesh", {
                  ref: Bt,
                  name: "rain-pond",
                  geometry: Eo,
                  position: [0, X, 0],
                  rotation: [-Math.PI / 2, 0, 0],
                  renderOrder: 1,
                  dispose: null,
                  children: jsxRuntime.jsx("primitive", {
                    object: o,
                    attach: "material",
                  }),
                }),
              ],
            }),
            jsxRuntime.jsxs("group", {
              ref: he,
              children: [
                jsxRuntime.jsx("primitive", {
                  object: a,
                }),
                s.cattailClumps.map((l, u) =>
                  jsxRuntime.jsx(
                    "mesh",
                    {
                      ref: (g) => {
                        j.current[u] = g;
                      },
                      geometry: l.geometry,
                      material: s.material,
                      position: [l.x, l.y, l.z],
                      visible: !1,
                      castShadow: !0,
                      receiveShadow: !0,
                      dispose: null,
                    },
                    `cattail-${u}`,
                  ),
                ),
                jsxRuntime.jsx("group", {
                  ref: L,
                  children: s.lilyPads.map((l, u) =>
                    jsxRuntime.jsx(
                      "mesh",
                      {
                        ref: (g) => {
                          C.current[u] = g;
                        },
                        geometry: l.geometry,
                        material: s.material,
                        position: [l.x, l.y, l.z],
                        visible: !1,
                        receiveShadow: !0,
                        renderOrder: 2,
                        dispose: null,
                      },
                      `lily-${u}`,
                    ),
                  ),
                }),
                xe.map((l, u) =>
                  jsxRuntime.jsx(
                    "group",
                    {
                      ref: (g) => {
                        ((ue.current[u] = g), g && (g.rotation.order = "YXZ"));
                      },
                      scale: l.scale,
                      dispose: null,
                      children: jsxRuntime.jsx("primitive", {
                        object: i[u].model,
                        dispose: null,
                      }),
                    },
                    `swimmer-${u}`,
                  ),
                ),
                Array.from({
                  length: ve,
                }).map((l, u) =>
                  jsxRuntime.jsx(
                    "mesh",
                    {
                      ref: (g) => {
                        me.current[u] = g;
                      },
                      geometry: Wo,
                      material: ee[u],
                      rotation: [-Math.PI / 2, 0, 0],
                      visible: !1,
                      dispose: null,
                    },
                    `fish-ripple-${u}`,
                  ),
                ),
                jsxRuntime.jsx("instancedMesh", {
                  ref: T,
                  args: [Lo, ft, Be],
                  frustumCulled: !1,
                  visible: !1,
                  dispose: null,
                }),
                jsxRuntime.jsxs("group", {
                  ref: M,
                  position: [bt, 0, Rt],
                  visible: !1,
                  children: [
                    jsxRuntime.jsx("mesh", {
                      position: [0, X + 0.013, 0],
                      rotation: [-Math.PI / 2, 0, 0],
                      geometry: Zo,
                      material: Xo,
                      renderOrder: 2,
                      dispose: null,
                    }),
                    jsxRuntime.jsxs("group", {
                      ref: r,
                      position: [0, it, 0],
                      children: [
                        jsxRuntime.jsxs("group", {
                          scale: 1.2,
                          children: [
                            jsxRuntime.jsxs("mesh", {
                              position: [0, -0.004, 0],
                              castShadow: !0,
                              receiveShadow: !0,
                              children: [
                                jsxRuntime.jsx("boxGeometry", {
                                  args: [0.3, 0.03, 0.3],
                                }),
                                jsxRuntime.jsx("meshStandardMaterial", {
                                  color: "#6d4c31",
                                  roughness: 0.9,
                                }),
                              ],
                            }),
                            [-0.09, 0.09].map((l) =>
                              jsxRuntime.jsxs(
                                "mesh",
                                {
                                  position: [l, -0.026, 0],
                                  children: [
                                    jsxRuntime.jsx("boxGeometry", {
                                      args: [0.05, 0.018, 0.31],
                                    }),
                                    jsxRuntime.jsx("meshStandardMaterial", {
                                      color: "#553a26",
                                      roughness: 0.95,
                                    }),
                                  ],
                                },
                                l,
                              ),
                            ),
                            jsxRuntime.jsx("mesh", {
                              ref: R,
                              position: [0, 0.137, 0],
                              rotation: [0, Math.PI / 4, 0],
                              material: qo,
                              castShadow: !0,
                              children: jsxRuntime.jsx("cylinderGeometry", {
                                args: [wt, wt, Vo, 4, 1, !0],
                              }),
                            }),
                            $o.map(([l, u]) =>
                              jsxRuntime.jsx(
                                "mesh",
                                {
                                  position: [l, 0.137, u],
                                  material: Se,
                                  children: jsxRuntime.jsx("boxGeometry", {
                                    args: [0.016, 0.262, 0.016],
                                  }),
                                },
                                `post-${l}-${u}`,
                              ),
                            ),
                            [0.022, 0.262].map((l) =>
                              [-1, 1].map((u) =>
                                jsxRuntime.jsxs(
                                  "group",
                                  {
                                    children: [
                                      jsxRuntime.jsx("mesh", {
                                        position: [0, l, u * W],
                                        material: Se,
                                        children: jsxRuntime.jsx(
                                          "boxGeometry",
                                          {
                                            args: [W * 2 + 0.016, 0.014, 0.014],
                                          },
                                        ),
                                      }),
                                      jsxRuntime.jsx("mesh", {
                                        position: [u * W, l, 0],
                                        material: Se,
                                        children: jsxRuntime.jsx(
                                          "boxGeometry",
                                          {
                                            args: [0.014, 0.014, W * 2 + 0.016],
                                          },
                                        ),
                                      }),
                                    ],
                                  },
                                  `rail-${l}-${u}`,
                                ),
                              ),
                            ),
                            [Math.PI / 4, -Math.PI / 4].map((l) =>
                              jsxRuntime.jsx(
                                "mesh",
                                {
                                  position: [0, 0.268, 0],
                                  rotation: [0, l, 0],
                                  material: Se,
                                  children: jsxRuntime.jsx("boxGeometry", {
                                    args: [W * 2.8, 0.008, 0.008],
                                  }),
                                },
                                l,
                              ),
                            ),
                            jsxRuntime.jsx("sprite", {
                              ref: N,
                              position: [0, 0.13, 0],
                              scale: [0.28, 0.32, 1],
                              material: Yo,
                            }),
                          ],
                        }),
                        jsxRuntime.jsx(jt, {
                          ref: x,
                          position: [0, 0.16, 0],
                          color: "#ffb066",
                          intensity: 0,
                          distance: 3.2,
                          decay: 2,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    })
  );
}
export { na as default };
