/**
 * 天气舞台（场景分区） —— 由线上 bundle（WeatherStage-DI0ZLv7q.js）反编译整理
 * 昼夜、雨雪、风暴等天气状态与舞台灯光。
 * 说明：变量/函数名仍是压缩后的短名；三方库请从 ../vendor/*.js 引入。
 */
import { jsxRuntime, React, useEffect } from "../vendor/react.js";
import {
  l as Ie,
  L as De,
  u as T,
  w as M,
  b as Oe,
  c as F,
  d as Ee,
  e as ye,
  g as Se,
  t as je,
  h as ke,
  j as Ue,
  r as Be,
  k as q,
  m as ie,
  n as Ge,
  a as ue,
} from "../main.js";
import {
  Vector4,
  Color,
  f as He,
  aF as I,
  Vector3,
  BufferGeometry,
  BufferAttribute,
  ShaderMaterial,
  Vector2,
  InstancedBufferGeometry,
  PlaneGeometry,
  InstancedBufferAttribute,
  aT as oe,
  MeshBasicMaterial,
  H as Xe,
  Euler,
  Quaternion,
  Matrix4,
  CanvasTexture,
  S as Ke,
  q as he,
} from "../vendor/three.js";
import { a as te, H as G, e as me } from "../data/projects.js";
import "../vendor/rapier.js";
import "../vendor/gsap.js";
const $ = De,
  Z = {
    uRainAmbient: {
      value: new Color(),
    },
    uRainLamps: {
      value: Ie,
    },
    uRainLampOn: {
      value: 0,
    },
    uRainFire: {
      value: new Vector4(),
    },
    uRainFlash: {
      value: 0,
    },
  },
  Qe = 1.15,
  Je = 0.3;
let pe = -1;
function Me(e) {
  if (e === pe) return;
  pe = e;
  const r = Z,
    d = T.getState().nightAmount ?? 0;
  (r.uRainAmbient.value
    .setRGB(M.hemiSkyR, M.hemiSkyG, M.hemiSkyB, He)
    .multiplyScalar(M.hemiStrength * I.lerp(Qe, Je, d)),
    (r.uRainLampOn.value = Oe.night),
    r.uRainFire.value.set(M.fireX, M.fireY, M.fireZ, M.fireStrength),
    (r.uRainFlash.value = M.lightningFlash));
}
const se = `
    uniform vec3 uRainAmbient;
    uniform vec4 uRainLamps[RAIN_LAMP_COUNT];
    uniform float uRainLampOn;
    uniform vec4 uRainFire;
    uniform float uRainFlash;

    // Lit from a point: inverse-square round the source, windowed off at
    // its reach, plus a backlit glint where the drop sits between the eye
    // and the light.
    float rainPointLight(vec3 p, vec3 viewDir, vec3 source, float reach) {
        vec3 toSource = source - p;
        float d2 = dot(toSource, toSource);
        float d = sqrt(d2);
        float window = 1.0 - smoothstep(reach * 0.55, reach, d);
        float direct = 1.0 / (1.0 + d2 * 0.7);
        float behind = pow(max(dot(viewDir, toSource / max(d, 0.001)), 0.0), 8.0);
        return (direct + behind * 1.2) * window;
    }

    vec3 rainLight(vec3 p, out float lit) {
        vec3 viewDir = normalize(p - cameraPosition);
        vec3 light = vec3(0.0);
        if (uRainLampOn > 0.001) {
            float lamps = 0.0;
            for (int i = 0; i < RAIN_LAMP_COUNT; i++) {
                vec4 lamp = uRainLamps[i];
                if (lamp.w <= 0.0) continue;
                lamps += rainPointLight(p, viewDir, lamp.xyz, 4.5) * lamp.w;
            }
            light += vec3(1.0, 0.66, 0.36) * lamps * 2.2 * uRainLampOn;
        }
        if (uRainFire.w > 0.001) {
            light += vec3(1.0, 0.5, 0.2) * rainPointLight(p, viewDir, uRainFire.xyz, 3.5) * uRainFire.w * 2.4;
        }
        lit = dot(light, vec3(0.3, 0.5, 0.2));
        return uRainAmbient + light + vec3(0.75, 0.82, 1.0) * uRainFlash;
    }
`,
  et = [
    {
      key: "far",
      count: F ? 380 : 820,
      radius: F ? 11 : 16,
      height: 18,
      top: 12,
      minSpeed: 8,
      maxSpeed: 13,
      minLength: 0.2,
      maxLength: 0.5,
      width: 0.01,
      opacity: F ? 0.42 : 0.5,
      wind: 0.085,
      order: 7,
      seed: 17,
    },
    {
      key: "near",
      count: F ? 104 : 220,
      radius: F ? 6 : 8,
      height: 13,
      top: 8.5,
      minSpeed: 14,
      maxSpeed: 21,
      minLength: 0.58,
      maxLength: 1.2,
      width: 0.014,
      opacity: F ? 0.6 : 0.72,
      wind: 0.145,
      order: 8,
      seed: 701,
    },
  ],
  tt = {
    perLamp: F ? 16 : 30,
    radius: 2.3,
    above: 2.4,
    span: 5.2,
    minSpeed: 9,
    maxSpeed: 14,
    minLength: 0.3,
    maxLength: 0.62,
    width: 0.011,
    opacity: 0.55,
    wind: 0.1,
    order: 8,
    seed: 1301,
  };
function O(e) {
  const r = Math.sin(e * 91.317 + 17.71) * 43758.5453;
  return r - Math.floor(r);
}
const Re = `
    uniform float uTime;
    uniform vec2 uSpeed;
    uniform vec2 uLength;
    uniform float uWind;
    uniform float uWidth;
    uniform float uOpacity;
    uniform vec2 uResolution;

    attribute vec4 aDrop;   // x, z in -1..1, phase, speed
    attribute vec3 aShape;  // length, brightness, sway phase
    attribute vec2 aCorner; // side -1..1, 0 tail .. 1 head

    varying vec3 vColor;
    varying float vAlpha;
    varying vec2 vCorner;
    varying float vSoft;

    ${se}

    vec3 streakHead(vec3 tail, float len) {
        return tail + vec3(-(uWind + 0.06), -1.0, 0.045) * len;
    }

    void hideStreak() {
        gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
        vColor = vec3(0.0);
        vAlpha = 0.0;
        vCorner = aCorner;
        vSoft = 0.0;
    }

    // Writes gl_Position; returns the streak's width on screen in pixels as
    // x and the width actually drawn (never under one pixel) as y.
    vec2 placeStreak(vec3 tail, vec3 head) {
        vec4 clipTail = projectionMatrix * viewMatrix * vec4(tail, 1.0);
        vec4 clipHead = projectionMatrix * viewMatrix * vec4(head, 1.0);
        vec4 clip = mix(clipTail, clipHead, aCorner.y);
        vec2 axis = (clipHead.xy / clipHead.w - clipTail.xy / clipTail.w) * uResolution;
        vec2 across = normalize(vec2(-axis.y, axis.x) + vec2(1e-5, 0.0));
        float pixels = uWidth * projectionMatrix[1][1] * 0.5 * uResolution.y / clip.w;
        float drawn = max(pixels, 1.0);
        clip.xy += across * aCorner.x * drawn / uResolution * clip.w;
        gl_Position = clip;
        vCorner = aCorner;
        vSoft = smoothstep(1.5, 4.0, drawn);
        return vec2(pixels, drawn);
    }

    bool behindCamera(vec3 tail, vec3 head) {
        return (projectionMatrix * viewMatrix * vec4(tail, 1.0)).w < 0.1
            || (projectionMatrix * viewMatrix * vec4(head, 1.0)).w < 0.1;
    }
`,
  at = `
    uniform vec3 uCenter;
    uniform float uRadius;
    uniform float uHeight;
    uniform float uTop;

    ${Re}

    void main() {
        float speed = mix(uSpeed.x, uSpeed.y, aDrop.w);
        float len = mix(uLength.x, uLength.y, aShape.x);
        float fall = mod(aDrop.z * uHeight + uTime * speed, uHeight);

        // A fixed place in the world, wrapped into the box round the player.
        vec2 home = aDrop.xy * uRadius;
        vec2 rel = mod(home - uCenter.xz + uRadius, 2.0 * uRadius) - uRadius;

        float drift = fall * uWind;
        float sway = sin(uTime * 0.75 + aShape.z * 6.2831) * 0.055;
        vec3 tail = vec3(
            uCenter.x + rel.x - drift + sway,
            uCenter.y + uTop - fall,
            uCenter.z + rel.y + drift * 0.22
        );
        vec3 head = streakHead(tail, len);
        if (behindCamera(tail, head)) {
            hideStreak();
            return;
        }
        vec2 width = placeStreak(tail, head);

        float lit;
        vColor = rainLight(mix(tail, head, aCorner.y), lit);

        // Edge of the box, and drops so close to the lens they would smear
        // across half the frame.
        float edge = 1.0 - smoothstep(0.72, 1.0, length(rel) / uRadius);
        float nearLens = smoothstep(0.7, 2.2, gl_Position.w);
        float coverage = width.x / width.y;
        vAlpha = uOpacity * aShape.y * edge * nearLens * mix(coverage, 1.0, 0.35)
            * (1.0 + min(lit, 1.5) * 2.0);
    }
`,
  rt = `
    uniform float uRadius;
    uniform float uAbove;
    uniform float uSpan;

    attribute float aLamp;

    ${Re}

    void main() {
        vec4 lamp = uRainLamps[int(aLamp)];
        if (lamp.w <= 0.0 || uOpacity <= 0.0) {
            hideStreak();
            return;
        }
        float speed = mix(uSpeed.x, uSpeed.y, aDrop.w);
        float len = mix(uLength.x, uLength.y, aShape.x);
        float fall = mod(aDrop.z * uSpan + uTime * speed, uSpan);
        float drift = fall * uWind;
        // Upwind by half the slant, so the cylinder of rain is centred on
        // the lamp halfway down rather than at the top.
        vec3 tail = vec3(
            lamp.x + aDrop.x * uRadius - drift + uSpan * uWind * 0.5,
            lamp.y + uAbove - fall,
            lamp.z + aDrop.y * uRadius + drift * 0.22
        );
        vec3 head = streakHead(tail, len);
        if (behindCamera(tail, head)) {
            hideStreak();
            return;
        }
        vec2 width = placeStreak(tail, head);

        float lit;
        vColor = rainLight(mix(tail, head, aCorner.y), lit);
        // In and out at the ends of the fall rather than popping.
        float ends = smoothstep(0.0, 0.7, fall) * (1.0 - smoothstep(uSpan - 0.9, uSpan, fall));
        float nearLens = smoothstep(0.7, 2.2, gl_Position.w);
        float coverage = width.x / width.y;
        vAlpha = uOpacity * aShape.y * ends * nearLens * mix(coverage, 1.0, 0.35)
            * min(lit * 3.0, 1.0) * lamp.w;
    }
`,
  nt = `
    varying vec3 vColor;
    varying float vAlpha;
    varying vec2 vCorner;
    varying float vSoft;

    void main() {
        // Bright at the leading tip, trailing off behind it. Soft across only
        // where the streak is wide enough on screen to have an across; a
        // one-pixel line sampled off-centre would just flicker.
        float along = mix(0.2, 1.0, vCorner.y);
        float across = 1.0 - vCorner.x * vCorner.x * vSoft;
        float alpha = vAlpha * along * across;
        if (alpha < 0.004) discard;
        gl_FragColor = vec4(vColor, min(alpha, 0.95));
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
    }
`;
function Ae(e, r, d = 0) {
  const c = new Float32Array(e * 4 * 4),
    i = new Float32Array(e * 4 * 3),
    n = new Float32Array(e * 4 * 2),
    a = d ? new Float32Array(e * 4) : null,
    l = new Uint32Array(e * 6),
    f = [
      [-1, 0],
      [1, 0],
      [-1, 1],
      [1, 1],
    ];
  for (let u = 0; u < e; u += 1) {
    const o = u + r;
    let m = O(o + 1) * 2 - 1,
      x = O(o + 41) * 2 - 1;
    if (d) {
      const p = m * Math.PI,
        S = Math.sqrt((x + 1) / 2);
      ((m = Math.cos(p) * S), (x = Math.sin(p) * S));
    }
    const w = [m, x, O(o + 83), O(o + 127)],
      v = [O(o + 191), 0.72 + O(o + 311) * 0.28, O(o + 239)];
    for (let p = 0; p < 4; p += 1) {
      const S = u * 4 + p;
      (c.set(w, S * 4),
        i.set(v, S * 3),
        n.set(f[p], S * 2),
        a && (a[S] = Math.floor(u / d)));
    }
    l.set(
      [u * 4, u * 4 + 2, u * 4 + 1, u * 4 + 1, u * 4 + 2, u * 4 + 3],
      u * 6,
    );
  }
  const t = new BufferGeometry();
  return (
    t.setAttribute(
      "position",
      new BufferAttribute(new Float32Array(e * 4 * 3), 3),
    ),
    t.setAttribute("aDrop", new BufferAttribute(c, 4)),
    t.setAttribute("aShape", new BufferAttribute(i, 3)),
    t.setAttribute("aCorner", new BufferAttribute(n, 2)),
    a && t.setAttribute("aLamp", new BufferAttribute(a, 1)),
    t.setIndex(new BufferAttribute(l, 1)),
    t
  );
}
function Ce(e, r, d) {
  return new ShaderMaterial({
    defines: {
      RAIN_LAMP_COUNT: $,
    },
    uniforms: {
      ...Z,
      ...d,
      uTime: {
        value: 0,
      },
      uSpeed: {
        value: new Vector2(e.minSpeed, e.maxSpeed),
      },
      uLength: {
        value: new Vector2(e.minLength, e.maxLength),
      },
      uWind: {
        value: e.wind,
      },
      uWidth: {
        value: e.width,
      },
      uOpacity: {
        value: 0,
      },
      uResolution: {
        value: new Vector2(1, 1),
      },
    },
    vertexShader: r,
    fragmentShader: nt,
    transparent: !0,
    depthWrite: !1,
  });
}
function Pe(e, r, d, c, i, n, a = 1) {
  i.current = I.damp(i.current, M.rainAmount, 2.25, r);
  const l = i.current * n.opacity * a;
  if (((d.visible = l > 0.001), !d.visible)) return !1;
  const f = e.clock.elapsedTime;
  Me(f);
  const t = c.uniforms;
  return (
    (t.uTime.value = f),
    (t.uWind.value = n.wind + Math.sin(f * 0.28) * n.wind * 0.22),
    (t.uOpacity.value = l),
    e.gl.getDrawingBufferSize(t.uResolution.value),
    !0
  );
}
function ot({ settings: e }) {
  const r = React.useRef(),
    d = React.useRef(0),
    c = React.useMemo(() => Ae(e.count, e.seed), [e]),
    i = React.useMemo(
      () =>
        Ce(e, at, {
          uCenter: {
            value: new Vector3(),
          },
          uRadius: {
            value: e.radius,
          },
          uHeight: {
            value: e.height,
          },
          uTop: {
            value: e.top,
          },
        }),
      [e],
    );
  return (
    React.useEffect(
      () => () => {
        (c.dispose(), i.dispose());
      },
      [c, i],
    ),
    useEffect((n, a) => {
      const l = r.current;
      !l ||
        !Pe(n, a, l, i, d, e) ||
        i.uniforms.uCenter.value.copy(T.getState().ballPosition);
    }),
    jsxRuntime.jsx("mesh", {
      ref: r,
      geometry: c,
      material: i,
      visible: !1,
      frustumCulled: !1,
      renderOrder: e.order,
    })
  );
}
function it() {
  const e = tt,
    r = React.useRef(),
    d = React.useRef(0),
    c = React.useMemo(() => Ae($ * e.perLamp, e.seed, e.perLamp), [e]),
    i = React.useMemo(
      () =>
        Ce(e, rt, {
          uRadius: {
            value: e.radius,
          },
          uAbove: {
            value: e.above,
          },
          uSpan: {
            value: e.span,
          },
        }),
      [e],
    );
  return (
    React.useEffect(
      () => () => {
        (c.dispose(), i.dispose());
      },
      [c, i],
    ),
    useEffect((n, a) => {
      const l = r.current;
      if (!l) return;
      const f = I.smoothstep(T.getState().nightAmount ?? 0, 0.2, 0.7);
      Pe(n, a, l, i, d, e, f);
    }),
    jsxRuntime.jsx("mesh", {
      ref: r,
      geometry: c,
      material: i,
      visible: !1,
      frustumCulled: !1,
      renderOrder: e.order,
    })
  );
}
function st() {
  return jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [
      et.map((e) =>
        jsxRuntime.jsx(
          ot,
          {
            settings: e,
          },
          e.key,
        ),
      ),
      jsxRuntime.jsx(it, {}),
    ],
  });
}
const E = F ? 44 : 96,
  ze = F ? 3 : 5,
  U = ze + 1,
  Le = 0.28,
  Te = 0.72,
  ve = 9;
function lt(e, r, d) {
  e.surface = null;
  for (let c = 0; c < 6; c += 1) {
    const i = Math.random() * Math.PI * 2,
      a =
        Math.hypot(r.ballPosition.x - te.x, r.ballPosition.z - te.z) < 7 &&
        Math.random() < 0.55,
      l = a ? te : r.ballPosition,
      f = Math.sqrt(Math.random()) * (a ? 2.05 : 8),
      t = l.x + Math.cos(i) * f,
      u = l.z + Math.sin(i) * f,
      o = ye(t, u, r);
    if (o) {
      ((e.x = t),
        (e.z = u),
        (e.y = o.point.y + 0.012),
        (e.surface = o.object),
        (e.water = o.object.name === "rain-pond"));
      break;
    }
  }
  ((e.start = d + Math.random() * 0.6),
    (e.end = e.start + (e.water ? Te : Le) + 0.05));
}
const ct = `
    uniform float uTime;
    uniform float uStrength;
    uniform float uPointScale;

    attribute vec4 aImpact;  // x, y, z, moment of impact
    attribute float aWater;  // 1 on the pond, -1 when there is no impact
    attribute vec4 aDrop;    // direction, speed out, speed up, size; size 0 is the incoming drop

    varying vec3 vColor;
    varying float vAlpha;

    ${se}

    void main() {
        float age = uTime - aImpact.w;
        vec3 p = aImpact.xyz;
        float life = 0.0;
        bool live = aWater > -0.5;

        if (aDrop.w <= 0.0) {
            // The drop coming in: the last tenth of a second before it hits.
            live = live && age > -0.09 && age < 0.0;
            p.y -= age * 7.0;
            life = 1.0 + age / 0.09;
        } else {
            // Thrown up and out, falling back under gravity. Water throws
            // them a little lower and wider than soil does.
            float up = aDrop.z * mix(1.0, 0.8, aWater);
            float land = up * 2.0 / 9.8;
            live = live && age >= 0.0 && age < land;
            life = age / land;
            vec2 out2 = vec2(cos(aDrop.x), sin(aDrop.x)) * aDrop.y * mix(1.0, 1.25, aWater) * age;
            p += vec3(out2.x, up * age - 4.9 * age * age, out2.y);
        }

        vec4 mvPosition = viewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        float depth = max(-mvPosition.z, 0.2);
        float size = max(aDrop.w, 0.8);
        float pixels = uPointScale * size / depth;
        gl_PointSize = live && uStrength > 0.0 ? max(pixels, 1.5) : 0.0;

        float lit;
        vColor = rainLight(p, lit);
        float fade = aDrop.w <= 0.0 ? life : pow(1.0 - life, 0.6);
        vAlpha = live ? uStrength * fade * (0.55 + min(lit, 1.5) * 0.9) * min(pixels / 1.5, 1.0) : 0.0;
    }
`,
  ut = `
    varying vec3 vColor;
    varying float vAlpha;

    void main() {
        float d = length(gl_PointCoord - 0.5);
        float alpha = vAlpha * smoothstep(0.5, 0.15, d);
        if (alpha < 0.004) discard;
        gl_FragColor = vec4(vColor, min(alpha, 0.95));
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
    }
`,
  dt = `
    uniform float uTime;

    attribute vec4 aImpact;
    attribute float aWater;

    varying vec2 vUv;
    varying float vAge;
    varying float vWater;
    varying vec3 vColor;

    ${se}

    void main() {
        float life = aWater > 0.5 ? ${Te.toFixed(2)} : ${Le.toFixed(2)};
        vAge = aWater < -0.5 ? -1.0 : (uTime - aImpact.w) / life;
        vWater = aWater;
        vUv = uv;
        // Wide and slow on water; a tight crown's worth on soil.
        float size = vAge < 0.0 || vAge > 1.0 ? 0.0 : (aWater > 0.5 ? 0.62 : 0.2);
        vec3 p = aImpact.xyz + vec3(position.x, 0.004, -position.y) * size;
        gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
        float lit;
        vColor = rainLight(aImpact.xyz + vec3(0.0, 0.05, 0.0), lit);
    }
`,
  ft = `
    uniform float uStrength;

    varying vec2 vUv;
    varying float vAge;
    varying float vWater;
    varying vec3 vColor;

    void main() {
        if (vAge < 0.0 || vAge > 1.0) discard;
        float r = length(vUv - 0.5);
        float radius = 0.03 + vAge * 0.4;
        float width = max(fwidth(r) * 1.3, 0.008);
        float crest = 1.0 - smoothstep(width, width * 2.0, abs(r - radius));
        float echo = 1.0 - smoothstep(width, width * 2.0, abs(r - radius * 0.66));
        float fade = smoothstep(0.0, 0.07, vAge) * pow(1.0 - vAge, 1.6);
        float ring = crest + echo * (vWater > 0.5 ? 0.3 : 0.0);
        // Soil takes a quick dark wet spot under the crown as well.
        float spot = vWater > 0.5 ? 0.0 : (1.0 - smoothstep(0.08, 0.22, r)) * (1.0 - vAge);
        float alpha = max(ring * 0.5, spot * 0.22) * fade * uStrength;
        if (alpha < 0.004) discard;
        vec3 color = mix(vColor * 0.2, vColor * 0.75, ring);
        gl_FragColor = vec4(color, alpha);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
    }
`;
function ht() {
  const e = React.useRef(),
    r = React.useRef(),
    d = React.useRef(0),
    c = React.useMemo(
      () =>
        Array.from(
          {
            length: E,
          },
          () => ({
            start: 0,
            end: -1,
            surface: null,
          }),
        ),
      [],
    ),
    i = React.useMemo(() => {
      const a = E * U,
        l = new BufferGeometry(),
        f = new Float32Array(a * 4);
      for (let u = 0; u < E; u += 1) {
        const o = Math.random() * Math.PI * 2;
        for (let m = 0; m < U; m += 1) {
          const x = (u * U + m) * 4;
          m !== 0 &&
            ((f[x] = o + (m / ze) * Math.PI * 2 + (Math.random() - 0.5) * 0.9),
            (f[x + 1] = 0.12 + Math.random() * 0.34),
            (f[x + 2] = 0.6 + Math.random() * 0.55),
            (f[x + 3] = 0.7 + Math.random() * 0.6));
        }
      }
      (l.setAttribute(
        "position",
        new BufferAttribute(new Float32Array(a * 3), 3),
      ),
        l.setAttribute(
          "aImpact",
          new BufferAttribute(new Float32Array(a * 4), 4),
        ),
        l.setAttribute(
          "aWater",
          new BufferAttribute(new Float32Array(a).fill(-1), 1),
        ),
        l.setAttribute("aDrop", new BufferAttribute(f, 4)));
      const t = new ShaderMaterial({
        defines: {
          RAIN_LAMP_COUNT: $,
        },
        uniforms: {
          ...Z,
          uTime: {
            value: 0,
          },
          uStrength: {
            value: 0,
          },
          uPointScale: {
            value: ve,
          },
        },
        vertexShader: ct,
        fragmentShader: ut,
        transparent: !0,
        depthWrite: !1,
      });
      return {
        geometry: l,
        material: t,
      };
    }, []),
    n = React.useMemo(() => {
      const a = new InstancedBufferGeometry(),
        l = new PlaneGeometry(1, 1);
      ((a.index = l.index),
        a.setAttribute("position", l.attributes.position),
        a.setAttribute("uv", l.attributes.uv),
        a.setAttribute(
          "aImpact",
          new InstancedBufferAttribute(new Float32Array(E * 4), 4),
        ),
        a.setAttribute(
          "aWater",
          new InstancedBufferAttribute(new Float32Array(E).fill(-1), 1),
        ),
        (a.instanceCount = E));
      const f = new ShaderMaterial({
        defines: {
          RAIN_LAMP_COUNT: $,
        },
        uniforms: {
          ...Z,
          uTime: {
            value: 0,
          },
          uStrength: {
            value: 0,
          },
        },
        vertexShader: dt,
        fragmentShader: ft,
        transparent: !0,
        depthWrite: !1,
      });
      return {
        geometry: a,
        material: f,
      };
    }, []);
  return (
    React.useEffect(
      () => () => {
        (i.geometry.dispose(),
          i.material.dispose(),
          n.geometry.dispose(),
          n.material.dispose());
      },
      [i, n],
    ),
    useEffect((a, l) => {
      const f = e.current,
        t = r.current;
      if (!f || !t) return;
      d.current = I.damp(d.current, M.rainAmount, 2.1, l);
      const u = d.current,
        o = u > 0.003;
      if (((f.visible = o), (t.visible = o), !o)) return;
      const m = a.clock.elapsedTime;
      (Me(m),
        (i.material.uniforms.uTime.value = m),
        (i.material.uniforms.uStrength.value = u * 0.8),
        (i.material.uniforms.uPointScale.value = ve * a.gl.getPixelRatio()),
        (n.material.uniforms.uTime.value = m),
        (n.material.uniforms.uStrength.value = u));
      const x = T.getState(),
        w = i.geometry.attributes.aImpact,
        v = i.geometry.attributes.aWater,
        p = n.geometry.attributes.aImpact,
        S = n.geometry.attributes.aWater;
      let C = !1;
      for (let b = 0; b < E; b += 1) {
        const y = c[b],
          s = y.surface && Ee(y.surface, y.x, y.z, x);
        if (m < y.end && (s || !y.surface)) continue;
        lt(y, x, m);
        const z = y.surface ? (y.water ? 1 : 0) : -1;
        for (let L = 0; L < U; L += 1) {
          const P = b * U + L;
          (w.setXYZW(P, y.x ?? 0, y.y ?? 0, y.z ?? 0, y.start), v.setX(P, z));
        }
        (p.setXYZW(b, y.x ?? 0, y.y ?? 0, y.z ?? 0, y.start),
          S.setX(b, z),
          (C = !0));
      }
      C &&
        ((w.needsUpdate = !0),
        (v.needsUpdate = !0),
        (p.needsUpdate = !0),
        (S.needsUpdate = !0));
    }),
    jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [
        jsxRuntime.jsx("points", {
          ref: e,
          geometry: i.geometry,
          material: i.material,
          visible: !1,
          frustumCulled: !1,
          renderOrder: 10,
        }),
        jsxRuntime.jsx("mesh", {
          ref: r,
          geometry: n.geometry,
          material: n.material,
          visible: !1,
          frustumCulled: !1,
          renderOrder: 3,
        }),
      ],
    })
  );
}
const Fe = 512,
  _ = new Vector3(),
  ae = new Vector3();
function mt(e) {
  let r = e >>> 0;
  return () => ((r = (r * 1664525 + 1013904223) >>> 0), r / 4294967296);
}
function K(e, r, d, c, i) {
  if (d <= 0) return [e.clone(), r.clone()];
  const n = e.clone().lerp(r, 0.44 + i() * 0.12),
    a = e.distanceTo(r);
  ((n.x += (i() - 0.5) * a * c),
    (n.y += (i() - 0.5) * a * c * 0.2),
    (n.z += (i() - 0.5) * a * c));
  const l = K(e, n, d - 1, c * 0.82, i),
    f = K(n, r, d - 1, c * 0.82, i);
  return [...l.slice(0, -1), ...f];
}
function ge(e, r, d) {
  let c = d;
  for (let i = 0; i < r.length - 1 && c + 2 <= Fe; i += 1) {
    const n = r[i],
      a = r[i + 1];
    ((e[c * 3] = n.x),
      (e[c * 3 + 1] = n.y),
      (e[c * 3 + 2] = n.z),
      (e[(c + 1) * 3] = a.x),
      (e[(c + 1) * 3 + 1] = a.y),
      (e[(c + 1) * 3 + 2] = a.z),
      (c += 2));
  }
  return c;
}
function pt() {
  const e = React.useRef(),
    r = React.useRef(),
    d = React.useRef(),
    c = T((l) => l.season !== "clear"),
    i = React.useRef({
      active: !1,
      start: 0,
      next: 1.8,
      count: 0,
    }),
    n = React.useMemo(() => {
      const l = new BufferGeometry();
      return (
        l.setAttribute(
          "position",
          new BufferAttribute(new Float32Array(Fe * 3), 3),
        ),
        l.setDrawRange(0, 0),
        l
      );
    }, []);
  React.useEffect(
    () => () => {
      ((M.lightningFlash = 0), n.dispose());
    },
    [n],
  );
  const a = (l, f) => {
    var L;
    const t = T.getState(),
      u = i.current,
      o = mt(1741 + u.count * 977);
    (f.getWorldDirection(_),
      (_.y = 0),
      _.lengthSq() < 0.001 && _.set(0, 0, -1),
      _.normalize(),
      ae.set(-_.z, 0, _.x));
    const m = 5 + o() * 9,
      x = (o() - 0.5) * 7,
      w = t.ballPosition.x + _.x * m + ae.x * x,
      v = t.ballPosition.z + _.z * m + ae.z * x,
      p = je(w, v, t.terrainParameters.scale, t.terrainParameters.amplitude),
      S = ye(w, v, t),
      C = new Vector3(w, S ? S.point.y + 0.04 : p + 8, v),
      b = new Vector3(
        w + (o() - 0.5) * 4,
        p + 15 + o() * 5,
        v + (o() - 0.5) * 4,
      ),
      y = K(b, C, 5, 0.24, o),
      s = n.attributes.position.array;
    let z = ge(s, y, 0);
    for (let P = 0; P < 3; P += 1) {
      const D = 0.2 + P * 0.2 + o() * 0.08,
        B = Math.min(y.length - 2, Math.floor(D * y.length)),
        le = y[B],
        J = 2.1 + o() * 3.2,
        ce = o() * Math.PI * 2,
        _e = le
          .clone()
          .add(
            new Vector3(
              Math.cos(ce) * J,
              -J * (0.5 + o() * 0.35),
              Math.sin(ce) * J,
            ),
          ),
        We = K(le, _e, 3, 0.3, o);
      z = ge(s, We, z);
    }
    (n.setDrawRange(0, z),
      (n.attributes.position.needsUpdate = !0),
      n.computeBoundingSphere(),
      (L = d.current) == null || L.position.set(w, p + 5.5, v),
      (u.active = !0),
      (u.start = l),
      (u.count += 1),
      (u.echoDelay = 0.11 + o() * 0.12),
      (u.echoStrength = 0.25 + o() * 0.4),
      e.current && (e.current.visible = !0),
      r.current && (r.current.visible = !0),
      ke.playThunder({
        delay: 0.35 + m * 0.055,
        intensity: 0.65 + o() * 0.22,
        pan: I.clamp(x / 7, -1, 1),
      }));
  };
  return (
    useEffect((l, f) => {
      var v, p;
      const t = i.current,
        u = l.clock.elapsedTime;
      if (!c || M.rainAmount < 0.15) {
        ((t.active = !1),
          (t.next = 1.8),
          (M.lightningFlash = 0),
          e.current && (e.current.visible = !1),
          r.current && (r.current.visible = !1),
          d.current && (d.current.intensity = 0));
        return;
      }
      if (!t.active) {
        ((t.next -= f), t.next <= 0 && a(u, l.camera));
        return;
      }
      const o = u - t.start,
        m = Math.exp(-Math.pow((o - 0.05) / 0.052, 2)),
        x = Math.exp(-Math.pow((o - t.echoDelay) / 0.035, 2)) * t.echoStrength,
        w = Math.min(1, m + x + Math.exp(-o * 9) * 0.12);
      ((M.lightningFlash = w),
        (v = e.current) != null &&
          v.material &&
          (e.current.material.opacity = w),
        (p = r.current) != null &&
          p.material &&
          (r.current.material.opacity = w * 0.46),
        d.current && (d.current.intensity = w * 12),
        o > 0.52 &&
          ((t.active = !1),
          (t.next = (10 + ((t.count * 3.71) % 8)) * (1 - M.stormBlend * 0.4)),
          (M.lightningFlash = 0),
          e.current && (e.current.visible = !1),
          r.current && (r.current.visible = !1),
          d.current && (d.current.intensity = 0)));
    }),
    c
      ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
          children: [
            jsxRuntime.jsx("lineSegments", {
              ref: r,
              geometry: n,
              visible: !1,
              renderOrder: 11,
              children: jsxRuntime.jsx("lineBasicMaterial", {
                color: "#73a7ff",
                transparent: !0,
                opacity: 0,
                blending: oe,
                depthTest: !0,
                depthWrite: !1,
                toneMapped: !1,
              }),
            }),
            jsxRuntime.jsx("lineSegments", {
              ref: e,
              geometry: n,
              visible: !1,
              renderOrder: 12,
              children: jsxRuntime.jsx("lineBasicMaterial", {
                color: "#eff7ff",
                transparent: !0,
                opacity: 0,
                blending: oe,
                depthTest: !0,
                depthWrite: !1,
                toneMapped: !1,
              }),
            }),
            jsxRuntime.jsx(Se, {
              ref: d,
              color: "#a8c8e8",
              intensity: 0,
              distance: 38,
              decay: 1.8,
            }),
          ],
        })
      : null
  );
}
const R = 15,
  xe = ["#7a8f3c", "#96803a", "#a4562f", "#5d7a33", "#8f6b2e"],
  N = new Matrix4(),
  H = new Vector3(),
  Y = new Quaternion(),
  X = new Euler(),
  V = new Vector3(),
  we = new Color();
function vt() {
  const e = React.useSyncExternalStore(Ue, Be),
    r = React.useRef(),
    d = React.useRef(),
    c = React.useRef(0),
    i = React.useMemo(() => {
      const a = T.getState().qualityFactor >= 0.55;
      return {
        leafCount: a ? 110 : 60,
        dustCount: a ? 30 : 16,
      };
    }, []),
    n = React.useMemo(() => {
      const a = ie(356418),
        l = Array.from(
          {
            length: i.leafCount,
          },
          () => ({
            x: (a() - 0.5) * 2 * R,
            y: 0.15 + a() * 2.4,
            z: (a() - 0.5) * 2 * R,
            speed: 0.75 + a() * 0.6,
            swirl: 0.6 + a() * 1.6,
            lift: 0.7 + a() * 1.4,
            tumbleX: 2.2 + a() * 4.5,
            tumbleY: 1.6 + a() * 3.6,
            tumbleZ: 2.4 + a() * 4.2,
            phase: a() * Math.PI * 2,
            size: 0.7 + a() * 0.65,
          }),
        ),
        f = Array.from(
          {
            length: i.dustCount,
          },
          () => ({
            x: (a() - 0.5) * 2 * R,
            z: (a() - 0.5) * 2 * R,
            y: 0.06 + a() * 0.26,
            life: a(),
            lifeSpeed: 0.45 + a() * 0.5,
            speed: 1.35 + a() * 0.5,
            size: 0.7 + a() * 0.7,
          }),
        ),
        t = new PlaneGeometry(0.1, 0.066),
        u = new MeshBasicMaterial({
          side: Xe,
          transparent: !0,
          opacity: 0,
          depthWrite: !1,
        }),
        o = new PlaneGeometry(0.72, 0.1),
        m = new MeshBasicMaterial({
          color: "#cbbd9e",
          transparent: !0,
          opacity: 0,
          depthWrite: !1,
        });
      return {
        dust: f,
        dustGeometry: o,
        dustMaterial: m,
        leafGeometry: t,
        leafMaterial: u,
        leaves: l,
      };
    }, [i]);
  return (
    React.useEffect(() => {
      const a = r.current;
      a &&
        (n.leaves.forEach((l, f) => {
          (we.set(xe[f % xe.length]), a.setColorAt(f, we));
        }),
        a.instanceColor && (a.instanceColor.needsUpdate = !0));
    }, [n]),
    React.useEffect(
      () => () => {
        (n.leafGeometry.dispose(),
          n.leafMaterial.dispose(),
          n.dustGeometry.dispose(),
          n.dustMaterial.dispose());
      },
      [n],
    ),
    useEffect((a, l) => {
      const f = T.getState(),
        t = Math.min(l, 0.05),
        u = f.season === "storm" && !q ? 1 : 0;
      c.current = I.damp(c.current, u, 1.6, t);
      const o = c.current;
      M.stormBlend = o;
      const m = r.current,
        x = d.current,
        w = o > 0.012;
      if ((m && (m.visible = w), x && (x.visible = w), !w)) return;
      const v = a.clock.elapsedTime,
        p = f.smoothedCircleCenter,
        S = f.windParameters,
        C = Math.cos(S.direction ?? 0),
        b = Math.sin(S.direction ?? 0),
        y = S.direction ?? 0;
      (m &&
        ((n.leafMaterial.opacity = Math.min(1, o * 2.4) * 0.92),
        n.leaves.forEach((s, z) => {
          const L = 0.65 + 0.35 * Math.sin(v * 1.35 + s.phase * 2.1),
            P = s.speed * (3.4 + L * 3.2) * o * t,
            D = Math.sin(v * s.swirl + s.phase) * 1.7 * o * t;
          if (
            ((s.x += C * P - b * D),
            (s.z += b * P + C * D),
            (s.y += Math.sin(v * s.lift + s.phase * 3.3) * 0.9 * o * t),
            (s.y = I.clamp(s.y, 0.1, 3)),
            s.x * s.x + s.z * s.z > R * R)
          ) {
            const B = (Math.sin(s.phase * 12.9898 + v) * 0.5 + 0.5) * 2 - 1;
            ((s.x = -C * R * 0.96 - b * B * R * 0.85),
              (s.z = -b * R * 0.96 + C * B * R * 0.85),
              (s.y =
                0.15 +
                (Math.sin(s.phase * 78.233 + v * 0.7) * 0.5 + 0.5) * 2.3));
          }
          (H.set(p.x + s.x, s.y, p.z + s.z),
            X.set(
              v * s.tumbleX + s.phase,
              v * s.tumbleY + s.phase * 2,
              v * s.tumbleZ + s.phase * 3,
            ),
            Y.setFromEuler(X),
            V.setScalar(s.size * Math.min(1, o * 2.6)),
            N.compose(H, Y, V),
            m.setMatrixAt(z, N));
        }),
        (m.instanceMatrix.needsUpdate = !0)),
        x &&
          ((n.dustMaterial.opacity = Math.min(1, o * 2.2) * 0.16),
          X.set(-Math.PI / 2, 0, -y),
          Y.setFromEuler(X),
          n.dust.forEach((s, z) => {
            s.life += s.lifeSpeed * t;
            const L = s.speed * 6.4 * o * t;
            if (
              ((s.x += C * L),
              (s.z += b * L),
              s.life >= 1 || s.x * s.x + s.z * s.z > R * R)
            ) {
              s.life = 0;
              const D =
                (Math.sin((z + 1) * 12.9898 + v * 1.7) * 0.5 + 0.5) * 2 - 1;
              ((s.x = -C * R * 0.9 - b * D * R * 0.8),
                (s.z = -b * R * 0.9 + C * D * R * 0.8));
            }
            const P = Math.sin(Math.min(s.life, 1) * Math.PI);
            (H.set(p.x + s.x, s.y, p.z + s.z),
              V.set(s.size * (0.5 + P), 1, s.size * P * 0.9),
              N.compose(H, Y, V),
              x.setMatrixAt(z, N));
          }),
          (x.instanceMatrix.needsUpdate = !0)));
    }),
    e
      ? null
      : jsxRuntime.jsxs("group", {
          children: [
            jsxRuntime.jsx("instancedMesh", {
              ref: r,
              args: [n.leafGeometry, n.leafMaterial, i.leafCount],
              frustumCulled: !1,
              visible: !1,
            }),
            jsxRuntime.jsx("instancedMesh", {
              ref: d,
              args: [n.dustGeometry, n.dustMaterial, i.dustCount],
              frustumCulled: !1,
              visible: !1,
            }),
          ],
        })
  );
}
const j = F ? 16 : 28,
  gt = `
uniform float uTime;
uniform float uStrength;
uniform float uPixelRatio;

attribute float aPhase;
attribute float aSize;
attribute float aWarmth;
attribute float aForeground;

varying float vAlpha;
varying float vWarmth;
varying float vPhase;

void main() {
    vec3 transformed = position;
    float sway = 0.05 + aForeground * 0.045;
    transformed.x += sin(uTime * (0.18 + aPhase * 0.025) + aPhase * 6.2831) * sway;
    transformed.z += cos(uTime * (0.14 + aPhase * 0.02) + aPhase * 4.7) * sway * 0.72;
    transformed.y += sin(uTime * (0.32 + aPhase * 0.04) + aPhase * 8.3) * 0.055;

    vec4 viewPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    float perspective = 44.0 / max(-viewPosition.z, 1.0);
    gl_PointSize = clamp(aSize * perspective * uPixelRatio, 1.4, 17.0);

    vAlpha = uStrength * mix(0.54, 0.82, aForeground);
    vWarmth = aWarmth;
    vPhase = aPhase;
}
`,
  xt = `
uniform float uTime;

varying float vAlpha;
varying float vWarmth;
varying float vPhase;

void main() {
    vec2 point = gl_PointCoord - 0.5;
    float distanceFromCenter = length(point) * 2.0;
    float halo = smoothstep(1.0, 0.08, distanceFromCenter);
    float core = smoothstep(0.34, 0.0, distanceFromCenter);
    float twinkle = 0.78 + sin(uTime * 1.15 + vPhase * 18.0) * 0.22;
    float alpha = (halo * 0.2 + core * 0.8) * vAlpha * twinkle;
    if (alpha < 0.01) discard;

    vec3 cool = vec3(0.58, 0.74, 1.0);
    vec3 warm = vec3(1.0, 0.59, 0.24);
    vec3 color = mix(cool, warm, vWarmth);
    gl_FragColor = vec4(color, alpha);
    #include <colorspace_fragment>
}
`;
function wt() {
  const e = document.createElement("canvas");
  ((e.width = 256), (e.height = 64));
  const r = e.getContext("2d"),
    d = ie(335593);
  (r.clearRect(0, 0, e.width, e.height),
    (r.globalCompositeOperation = "lighter"));
  for (let i = 0; i < 18; i += 1) {
    const n = d() * e.width,
      a = 22 + d() * 27,
      l = 18 + d() * 42,
      f = 7 + d() * 14;
    (r.save(), r.translate(n, a), r.scale(1, f / l));
    const t = r.createRadialGradient(0, 0, 0, 0, 0, l);
    (t.addColorStop(0, `rgba(255,255,255,${0.035 + d() * 0.045})`),
      t.addColorStop(0.48, "rgba(255,255,255,0.025)"),
      t.addColorStop(1, "rgba(255,255,255,0)"),
      (r.fillStyle = t),
      r.fillRect(-l, -l, l * 2, l * 2),
      r.restore());
  }
  const c = new CanvasTexture(e);
  return (
    (c.colorSpace = Ke),
    (c.minFilter = he),
    (c.magFilter = he),
    (c.needsUpdate = !0),
    c
  );
}
function yt() {
  const e = React.useRef(),
    r = React.useRef(),
    d = React.useRef([]),
    c = React.useRef(0),
    i = T((t) => t.sleeping),
    n = T((t) => t.terrainParameters.scale),
    a = T((t) => t.terrainParameters.amplitude),
    l = React.useMemo(() => Ge(G.x, G.z, n, a), [a, n]),
    f = React.useMemo(() => {
      const t = ie(335593),
        u = new Float32Array(j * 3),
        o = new Float32Array(j),
        m = new Float32Array(j),
        x = new Float32Array(j),
        w = new Float32Array(j);
      for (let p = 0; p < j; p += 1) {
        const S = p < Math.min(6, Math.floor(j * 0.28)),
          C = S ? -8.15 + t() * 3.45 : -4.5 + t() * 7.2,
          b = S ? -5.75 + t() * 3.7 : -4.1 + t() * 6.1,
          y = S ? 0.4 + t() * 2.2 : 0.28 + t() * 1.75,
          s = Math.hypot(C - me.x, b - me.z);
        ((u[p * 3] = C),
          (u[p * 3 + 1] = y),
          (u[p * 3 + 2] = b),
          (o[p] = t()),
          (m[p] = S ? 1.7 + t() * 1.15 : 0.85 + t() * 0.8),
          (x[p] = s < 2.25 ? 0.78 + t() * 0.22 : t() * 0.18),
          (w[p] = S ? 1 : 0));
      }
      const v = new BufferGeometry();
      return (
        v.setAttribute("position", new BufferAttribute(u, 3)),
        v.setAttribute("aPhase", new BufferAttribute(o, 1)),
        v.setAttribute("aSize", new BufferAttribute(m, 1)),
        v.setAttribute("aWarmth", new BufferAttribute(x, 1)),
        v.setAttribute("aForeground", new BufferAttribute(w, 1)),
        {
          geometry: v,
          mistTexture: wt(),
          uniforms: {
            uPixelRatio: {
              value: Math.min(window.devicePixelRatio || 1, 2),
            },
            uStrength: {
              value: 0,
            },
            uTime: {
              value: 0,
            },
          },
        }
      );
    }, []);
  return (
    React.useEffect(
      () => () => {
        (f.geometry.dispose(), f.mistTexture.dispose());
      },
      [f],
    ),
    useEffect((t, u) => {
      const o = i ? 1 : 0;
      c.current = q ? o : I.damp(c.current, o, i ? 1.25 : 3.2, u);
      const m = c.current,
        x = q ? 0 : t.clock.elapsedTime;
      (e.current &&
        ((e.current.uniforms.uStrength.value = m),
        (e.current.uniforms.uTime.value = x)),
        r.current && (r.current.intensity = m * 0.78),
        d.current.forEach((w, v) => {
          if (!w) return;
          const p = m * (0.055 - v * 0.008);
          ((w.visible = p > 0.002),
            (w.material.opacity = p),
            q ||
              ((w.position.x =
                w.userData.baseX +
                Math.sin(x * (0.035 + v * 0.008) + v) * 0.28),
              (w.position.y =
                w.userData.baseY + Math.sin(x * 0.09 + v * 1.7) * 0.035)));
        }));
    }),
    jsxRuntime.jsxs("group", {
      position: [G.x, l, G.z],
      children: [
        jsxRuntime.jsx("points", {
          geometry: f.geometry,
          frustumCulled: !1,
          renderOrder: 18,
          children: jsxRuntime.jsx("shaderMaterial", {
            ref: e,
            uniforms: f.uniforms,
            vertexShader: gt,
            fragmentShader: xt,
            blending: oe,
            depthWrite: !1,
            transparent: !0,
            toneMapped: !1,
          }),
        }),
        [
          {
            position: [-1.25, 0.42, -0.25],
            scale: [5.4, 0.86, 1],
          },
          {
            position: [1.55, 0.34, 0.35],
            scale: [4.25, 0.68, 1],
          },
          {
            position: [-3.15, 0.3, -0.95],
            scale: [3.7, 0.58, 1],
          },
        ].map((t, u) =>
          jsxRuntime.jsx(
            "sprite",
            {
              ref: (o) => {
                ((d.current[u] = o),
                  o &&
                    ((o.userData.baseX = t.position[0]),
                    (o.userData.baseY = t.position[1])));
              },
              position: t.position,
              scale: t.scale,
              visible: !1,
              renderOrder: 12 + u,
              children: jsxRuntime.jsx("spriteMaterial", {
                map: f.mistTexture,
                color: u === 2 ? "#d5b386" : "#91a9d2",
                depthWrite: !1,
                opacity: 0,
                transparent: !0,
              }),
            },
            u,
          ),
        ),
        i &&
          jsxRuntime.jsx(Se, {
            ref: r,
            position: [1.8, 2.85, 1.15],
            color: "#7698dc",
            intensity: 0,
            distance: 9.25,
            decay: 2,
          }),
      ],
    })
  );
}
function Pt() {
  return (
    React.useEffect(
      () => (
        ue.setState({
          weatherBuilt: !0,
        }),
        () =>
          ue.setState({
            weatherBuilt: !1,
            weatherWarm: !1,
          })
      ),
      [],
    ),
    jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [
        jsxRuntime.jsx(st, {}),
        jsxRuntime.jsx(ht, {}),
        jsxRuntime.jsx(pt, {}),
        jsxRuntime.jsx(vt, {}),
        jsxRuntime.jsx(yt, {}),
      ],
    })
  );
}
export { Pt as default };
