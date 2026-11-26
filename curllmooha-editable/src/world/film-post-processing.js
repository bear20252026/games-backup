/**
 * 胶片后期 —— 由线上 bundle（FilmPostProcessing-Dpafo7_I.js）反编译整理
 * 后期处理链：景深、噪点、色调与电影感合成。
 * 说明：变量/函数名仍是压缩后的短名；三方库请从 ../vendor/*.js 引入。
 */
import { useThree, React, useEffect, jsxRuntime } from "../vendor/react.js";
import {
  E as X,
  B as Z,
  a as N,
  b as he,
  V as me,
  H as pe,
  c as de,
  S as ge,
  d as we,
  e as be,
} from "../vendor/postfx.js";
import {
  y as H,
  s as ve,
  u as W,
  q as ye,
  a as V,
  P as G,
  f as xe,
  i as Se,
  w as Te,
  p as I,
} from "../main.js";
import {
  j as b,
  Matrix4,
  Vector3,
  Vector2,
  BufferGeometry,
  b3 as U,
  OrthographicCamera,
  WebGLRenderTarget,
  Scene,
  Mesh,
  aF as t,
} from "../vendor/three.js";
import "../data/projects.js";
import "../vendor/rapier.js";
import "../vendor/gsap.js";
const Pe = "vec3(0.000303, 0.000607, 0.002125)",
  Ee = "vec3(0.000607, 0.001214, 0.003035)",
  Fe = "vec3(0.000607, 0.001518, 0.003677)",
  Le = "vec3(0.000303, 0.000607, 0.002435)",
  Ve = `
uniform float uShutter;
uniform float uVeil;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    // Matches the CSS --letterbox-height so the caption still sits just clear
    // of the bar: max(7vh, 50vh - 21.275vw), and the 6vh the stylesheet drops
    // to below 4:3 — without that branch a portrait window would draw a 21%
    // bar straight over the caption positioned for a 6% one.
    float barHeight = aspect < 1.33333
        ? 0.06
        : max(0.07, 0.5 - 0.21275 * aspect);
    float bar = barHeight * uShutter;

    vec3 color = inputColor.rgb;

    // The blink as the eyes close.
    color = mix(color, ${Le}, uVeil);

    // Each bar cast a soft shadow into the frame (0 18px 42px rgba(2,5,12,.22)).
    //
    // No separate edge wash here, unlike the stylesheet. The overlay needed its
    // own gradients and inset shadow because it sat outside the render; in the
    // composer the vignette already deepens to 0.48 while sleeping, and adding
    // the wash on top of it darkened the band just inside the bar to roughly
    // half what the original showed. This shadow alone is what the bars owe the
    // frame.
    float shadow = max(
        smoothstep(1.0 - bar - 0.05, 1.0 - bar, uv.y),
        1.0 - smoothstep(bar, bar + 0.05, uv.y)
    );
    color = mix(color, ${Fe}, shadow * 0.14 * uShutter);

    // The bars themselves, carrying the stylesheet's top-to-bottom gradient.
    float edge = 0.0016;
    float topBar = smoothstep(1.0 - bar - edge, 1.0 - bar, uv.y);
    float bottomBar = 1.0 - smoothstep(bar, bar + edge, uv.y);
    float bars = max(topBar, bottomBar);

    float safeBar = max(bar, 1e-5);
    float within = uv.y > 0.5
        ? clamp((1.0 - uv.y) / safeBar, 0.0, 1.0)
        : clamp((safeBar - uv.y) / safeBar, 0.0, 1.0);
    color = mix(color, mix(${Pe}, ${Ee}, within), bars);

    outputColor = vec4(color, inputColor.a);
}
`;
class Ie extends X {
  constructor() {
    super("CinematicShutterEffect", Ve, {
      uniforms: new Map([
        ["uShutter", new b(0)],
        ["uVeil", new b(0)],
      ]),
    });
  }
  get shutter() {
    return this.uniforms.get("uShutter").value;
  }
  set shutter(r) {
    this.uniforms.get("uShutter").value = r;
  }
  get veil() {
    return this.uniforms.get("uVeil").value;
  }
  set veil(r) {
    this.uniforms.get("uVeil").value = r;
  }
}
const Oe = `
uniform mat4 uInverseViewProjection;
uniform vec3 uCamera;
uniform float uCloudLight;
uniform vec2 uDrift;
uniform float uFocusDistance;
uniform float uFocusAmount;

float hash(vec2 p) {
    vec3 q = fract(vec3(p.xyx) * 0.1031);
    q += dot(q, q.yzx + 33.33);
    return fract((q.x + q.y) * q.z);
}

float softNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
        f.y
    );
}

float distanceAt(vec2 at, float depthThere) {
    vec4 world = uInverseViewProjection * vec4(at * 2.0 - 1.0, depthThere * 2.0 - 1.0, 1.0);
    return length(world.xyz / world.w - uCamera);
}

// How soft a pixel is, 0..1: sharp around the character, softening past them
// and right up against the lens.
float softnessAt(float distanceTo) {
    float far = smoothstep(uFocusDistance + 7.0, uFocusDistance + 26.0, distanceTo);
    float near = 1.0 - smoothstep(uFocusDistance * 0.3, uFocusDistance * 0.62, distanceTo);
    return max(far, near * 0.8);
}

const vec2 DISC[8] = vec2[8](
    vec2(0.0, 1.0), vec2(0.707, 0.707), vec2(1.0, 0.0), vec2(0.707, -0.707),
    vec2(0.0, -1.0), vec2(-0.707, -0.707), vec2(-1.0, 0.0), vec2(-0.707, 0.707)
);

void mainImage(const in vec4 inputColor, const in vec2 uv, const in float depth, out vec4 outputColor) {
    vec3 color = inputColor.rgb;
    bool sky = depth >= 0.99995;

    vec4 world = uInverseViewProjection * vec4(uv * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0);
    world /= world.w;
    float distanceTo = length(world.xyz - uCamera);

    float softness = uFocusAmount * softnessAt(distanceTo);
    if (softness > 0.01) {
        // A tap only counts if it is as far out of focus as this pixel, so the
        // sharp character cannot smear a halo into the soft trees behind them.
        vec3 sum = color;
        float weight = 1.0;
        for (int i = 0; i < 8; i++) {
            vec2 at = uv + DISC[i] * texelSize * softness * 3.2 * (i % 2 == 0 ? 1.0 : 0.62);
            float there = uFocusAmount * softnessAt(distanceAt(at, readDepth(at)));
            float count = smoothstep(0.0, 0.5, there);
            sum += texture2D(inputBuffer, at).rgb * count;
            weight += count;
        }
        color = sum / weight;
    }

    if (!sky) {
        // Two scales of slow patches: the mass of a passing cloud, and its edge.
        // Mostly open sun, so a visitor sees shade pass over the field rather
        // than a dimmer meadow.
        vec2 at = world.xz * 0.024 + uDrift;
        float mass = softNoise(at) * 0.68 + softNoise(at * 2.7 + 11.3) * 0.32;
        float lit = smoothstep(0.26, 0.5, mass);
        color *= mix(1.0 - uCloudLight * 0.2, 1.0 + uCloudLight * 0.05, lit);
    }

    outputColor = vec4(color, inputColor.a);
}
`,
  $ = new Matrix4();
class qe extends X {
  constructor(r) {
    (super("MeadowLightEffect", Oe, {
      blendFunction: Z.NORMAL,
      attributes: N.DEPTH | N.CONVOLUTION,
      uniforms: new Map([
        ["uInverseViewProjection", new b(new Matrix4())],
        ["uCamera", new b(new Vector3())],
        ["uCloudLight", new b(0)],
        ["uDrift", new b(new Vector2())],
        ["uFocusDistance", new b(14)],
        ["uFocusAmount", new b(0)],
      ]),
    }),
      (this.camera = r));
  }
  setLight({
    cloudLight: r,
    driftX: i,
    driftZ: u,
    focusDistance: e,
    focusAmount: m,
  }) {
    const c = this.uniforms;
    ((c.get("uCloudLight").value = r),
      c.get("uDrift").value.set(i, u),
      (c.get("uFocusDistance").value = e),
      (c.get("uFocusAmount").value = m));
  }
  update() {
    const r = this.camera,
      i = this.uniforms;
    ($.multiplyMatrices(r.projectionMatrix, r.matrixWorldInverse),
      i.get("uInverseViewProjection").value.copy($).invert(),
      i.get("uCamera").value.setFromMatrixPosition(r.matrixWorld));
  }
}
const _e = (n) =>
  n.isWebGLRenderer ||
  n.isScene ||
  n.isCamera ||
  n.isTexture ||
  n.isRenderTarget ||
  n.isWebGLRenderTarget ||
  n.isBufferGeometry ||
  typeof n == "function";
function ke(n) {
  const r = new Map(),
    i = new Set(),
    u = (e, m, c) => {
      if (!e || typeof e != "object") return;
      if (e.isMaterial) {
        (c || !r.has(e)) && r.set(e, c);
        return;
      }
      if (m > 4 || i.has(e) || _e(e) || e.enabled === !1) return;
      if (
        (i.add(e),
        e.mipmapBlurPass &&
          e.blurPass &&
          i.add(e.mipmapBlurPass.enabled ? e.blurPass : e.mipmapBlurPass),
        e.isMesh)
      ) {
        u(e.material, m + 1, c);
        return;
      }
      e.fullscreenMaterial && u(e.fullscreenMaterial, m + 1, !1);
      const x =
        e instanceof Map ? e.values() : Array.isArray(e) ? e : Object.values(e);
      for (const S of x) u(S, m + 1, c);
    };
  for (const e of n.passes)
    e.enabled &&
      (e.fullscreenMaterial && u(e.fullscreenMaterial, 0, e.renderToScreen),
      u(e, 0, !1));
  return r;
}
async function ze(n, r, i) {
  if (!r) return;
  const u = ke(r),
    e = new BufferGeometry();
  (e.setAttribute("position", new U([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3)),
    e.setAttribute("uv", new U([0, 0, 2, 0, 0, 2], 2)));
  const m = new OrthographicCamera(-1, 1, 1, -1, 0, 1),
    c = new WebGLRenderTarget(1, 1);
  try {
    for (const [x, S] of u) {
      for (; document.hidden;) await H(i, 100);
      if (i.aborted) throw i.reason;
      const T = new Scene(),
        A = new Mesh(e, x);
      ((A.frustumCulled = !1), T.add(A));
      const M = n.getRenderTarget();
      let C;
      try {
        (n.setRenderTarget(S ? null : c),
          (C = ve(n, T, m, null, {
            signal: i,
          })));
      } finally {
        n.setRenderTarget(M);
      }
      (await C, await H(i));
    }
  } finally {
    (e.dispose(), c.dispose());
  }
}
const Ne = 0.17;
function Je() {
  const n = W((s) => s.quality),
    r = ye(n),
    i = useThree((s) => s.gl),
    u = useThree((s) => s.camera),
    e = React.useRef(null),
    m = useThree((s) => s.viewport.dpr),
    c = useThree((s) => s.size);
  React.useEffect(() => {
    var s;
    (s = e.current) == null || s.setSize(c.width, c.height);
  }, [m, c.width, c.height]);
  const [x, S] = React.useState(!1),
    T = V((s) => s.phase !== G.loading),
    A = V((s) => s.framesReleased),
    M = x && A,
    C = React.useRef(!1);
  ((C.current = M),
    React.useEffect(
      () => (
        (I.composerMounted = !0),
        () => {
          I.composerMounted = !1;
        }
      ),
      [],
    ),
    React.useEffect(() => {
      if (!T) return;
      const s = new AbortController();
      return (
        ze(i, e.current, s.signal)
          .then(() => {
            s.signal.aborted || S(!0);
          })
          .catch((D) => {
            (s.abort(), xe(D));
          }),
        () => s.abort()
      );
    }, [i, T]));
  const [O, Q] = React.useState(!1),
    g = React.useRef(),
    B = React.useRef(0);
  React.useEffect(
    () => (
      g.current &&
        ((g.current.configuration.autoDetectTransparency = !1),
        (g.current.configuration.transparencyAware = !1)),
      (window.__ao = g.current ?? null),
      () => {
        window.__ao === g.current && (window.__ao = null);
      }
    ),
  );
  const K = React.useRef({
      golden: 0,
      morning: 0,
      night: 0,
      rainy: 0,
      sleeping: 0,
      shutter: 0,
      focus: 0,
      veilTime: 999,
      wasSleeping: !1,
    }),
    o = React.useMemo(() => {
      const s = new he({
        blendFunction: Z.ADD,
        mipmapBlur: !0,
        intensity: 0.3,
        luminanceThreshold: 0.8,
        luminanceSmoothing: 0.26,
        radius: 0.64,
      });
      return {
        smaa: new ge(),
        bloom: s,
        brightnessContrast: new de({
          brightness: 0.016,
          contrast: 0.078,
        }),
        hueSaturation: new pe({
          hue: 0,
          saturation: 0.065,
        }),
        vignette: new me({
          eskil: !1,
          offset: 0.22,
          darkness: 0.38,
        }),
        shutter: new Ie(),
        light: new qe(u),
      };
    }, [u]),
    v = React.useMemo(
      () => ({
        cloudLight: 0,
        driftX: 0,
        driftZ: 0,
        focusDistance: 14,
        focusAmount: 0,
      }),
      [],
    );
  return (
    React.useEffect(
      () => () => {
        Object.values(o).forEach((s) => s.dispose());
      },
      [o],
    ),
    useEffect((s, D) => {
      C.current && (I.framesDrawn += 1);
      const f = W.getState(),
        a = K.current,
        w = Math.min(D, 0.05);
      g.current && (g.current.enabled = Se.cloud < 0.999);
      const P = f.qualityFactor ?? 1;
      (P > B.current && (B.current = P),
        !O && B.current - P >= Ne && Q(!0),
        (a.night = t.damp(a.night, t.clamp(f.nightAmount ?? 0, 0, 1), 4, w)),
        (a.rainy = t.damp(a.rainy, f.season !== "clear" ? 1 : 0, 2.4, w)),
        (a.sleeping = t.damp(a.sleeping, f.sleeping ? 1 : 0, 2.4, w)),
        (a.golden = t.damp(
          a.golden,
          t.clamp(f.goldenAmount ?? 0, 0, 1),
          2.4,
          w,
        )),
        (a.morning = t.damp(
          a.morning,
          t.clamp(f.morningAmount ?? 0, 0, 1),
          2.4,
          w,
        )));
      const { golden: p, morning: y, night: h, rainy: E, sleeping: q } = a,
        Y = t.lerp(0.3, 0.24, y),
        ee = t.lerp(Y, 0.4, p);
      let F = t.lerp(ee, 0.46, h);
      ((F = t.lerp(F, 0.2, E)), (o.bloom.intensity = t.lerp(F, 0.38, q)));
      const te = t.lerp(0.8, 0.86, y),
        se = t.lerp(te, 0.83, p);
      ((o.bloom.luminanceMaterial.threshold = t.lerp(se, 0.9, h)),
        (o.bloom.luminanceMaterial.smoothing = t.lerp(0.26, 0.5, h)));
      const oe = t.lerp(0.64, 0.68, y),
        ae = t.lerp(oe, 0.74, p);
      if (
        ((o.bloom.mipmapBlurPass.radius = t.lerp(ae, 0.66, h)),
        f.quality === "high")
      ) {
        const z = Te;
        ((o.bloom.intensity += 0.16 * h),
          (o.bloom.mipmapBlurPass.radius = t.lerp(
            o.bloom.mipmapBlurPass.radius,
            0.82,
            1 - E,
          )));
        const ue = (1 - h) * (1 - E);
        ((v.cloudLight = ue),
          (v.driftX = z.windTime * 0.016),
          (v.driftZ = z.windTime * 0.006));
        const R = f.ballPosition;
        v.focusDistance = R
          ? Math.hypot(
              R.x - u.position.x,
              R.y - u.position.y,
              R.z - u.position.z,
            )
          : 14;
        const le = V.getState().phase === G.start && f.cameraMode !== "fpp";
        ((a.focus = t.damp(a.focus, le ? 1 : 0, 2, w)),
          (v.focusAmount = a.focus),
          o.light.setLight(v));
      }
      const re = t.lerp(t.lerp(t.lerp(0.016, 0.01, y), 0.012, p), 0, h);
      o.brightnessContrast.brightness = re;
      const ne = t.lerp(t.lerp(t.lerp(0.078, 0.048, y), 0.052, p), 0.055, h);
      ((o.brightnessContrast.contrast = ne),
        (o.hueSaturation.hue = -0.003 * p * (1 - h)));
      const ie = t.lerp(t.lerp(t.lerp(0.065, 0.025, y), -0.012, p), -0.025, h);
      ((o.hueSaturation.saturation = ie),
        (o.vignette.offset = t.lerp(t.lerp(0.22, 0.28, p), 0.26, h)));
      const ce = t.lerp(t.lerp(0.38, 0.34, p), 0.32, h);
      o.vignette.darkness = t.lerp(ce, 0.48, q);
      const _ = f.sleeping ? 1 : 0;
      a.shutter = t.damp(a.shutter, _, _ > a.shutter ? 6.2 : 3.8, w);
      const k = t.smoothstep(a.shutter, 0, 1);
      ((o.shutter.shutter = k < 0.004 ? 0 : k),
        f.sleeping && !a.wasSleeping && (a.veilTime = 0),
        (a.wasSleeping = !!f.sleeping),
        a.veilTime < 1.6 && (a.veilTime += w));
      const L = a.veilTime / 1.55;
      o.shutter.veil =
        L >= 1
          ? 0
          : Math.min(t.smoothstep(L, 0, 0.18), 1 - t.smoothstep(L, 0.43, 1)) *
            0.98;
    }),
    jsxRuntime.jsxs(we, {
      ref: e,
      enabled: M,
      multisampling: 0,
      enableNormalPass: !1,
      resolutionScale: 1,
      children: [
        r.ambientOcclusion &&
          !O &&
          jsxRuntime.jsx(be, {
            ref: g,
            aoRadius: 0.5,
            distanceFalloff: 0.9,
            halfRes: !0,
            intensity: 1.1,
            quality: "medium",
            depthAwareUpsampling: !0,
            color: "#2a2418",
          }),
        r.antialias &&
          jsxRuntime.jsx("primitive", {
            object: o.smaa,
          }),
        r.meadowLight &&
          jsxRuntime.jsx("primitive", {
            object: o.light,
          }),
        r.bloom &&
          jsxRuntime.jsx("primitive", {
            object: o.bloom,
          }),
        jsxRuntime.jsx("primitive", {
          object: o.brightnessContrast,
        }),
        jsxRuntime.jsx("primitive", {
          object: o.hueSaturation,
        }),
        jsxRuntime.jsx("primitive", {
          object: o.vignette,
        }),
        jsxRuntime.jsx("primitive", {
          object: o.shutter,
        }),
      ],
    })
  );
}
export { Je as default };
