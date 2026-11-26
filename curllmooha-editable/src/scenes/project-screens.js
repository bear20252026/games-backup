/**
 * 项目屏幕（场景分区） —— 由线上 bundle（ProjectScreens-D4jOPliI.js）反编译整理
 * 作品投影屏/电视墙的渲染、贴图与视频播放。
 * 说明：变量/函数名仍是压缩后的短名；三方库请从 ../vendor/*.js 引入。
 */
import {
  React,
  jsxRuntime,
  useEffect,
  g as Gt,
  useThree,
} from "../vendor/react.js";
import {
  Vector3,
  BufferGeometry,
  b3 as bt,
  b8 as St,
  MeshStandardMaterial,
  H as qe,
  Matrix4,
  InstancedMesh,
  Quaternion,
  PlaneGeometry,
  MeshBasicMaterial,
  aT as Fe,
  PointsMaterial,
  aF as j,
  CanvasTexture,
  S as Pe,
  a as kt,
  CatmullRomCurve3,
  TubeGeometry,
  Vector2,
  ao as _t,
  q as be,
  ShaderMaterial,
  Color,
  VideoTexture,
  Object3D,
  Box3,
  BufferAttribute,
  Sphere,
  Matrix3,
} from "../vendor/three.js";
import {
  t as Xe,
  a as nt,
  u as Et,
  k as ne,
  m as Oe,
  A as Xt,
  B as zt,
  D as Jt,
  c as $t,
  E as Kt,
  F as Zt,
  H as Qt,
  I as Be,
  J as ea,
  K as ta,
  M as st,
  N as aa,
  w as it,
  O as oa,
  Q as na,
  C as sa,
  T as ia,
  g as ra,
  U as rt,
  V as la,
  W as ca,
  X as lt,
} from "../main.js";
import { r as J, S as De, p as ua, c as Ce } from "../data/projects.js";
import { m as ha, I as da, a as fa, p as ma } from "../world/ivy-leaf.js";
import { a as pa, u as ga } from "../world/decoded-images.js";
import "../vendor/rapier.js";
import "../vendor/gsap.js";
function wa({ anchor: o, terrainScale: e, terrainAmplitude: s }) {
  const t = React.useMemo(() => {
      const l = [],
        p = Math.cos(J),
        c = Math.sin(J),
        h = (i, f) => Xe(o.x + i * p + f * c, o.z - i * c + f * p, e, s) - o.y;
      for (let i = 0; i < 8; i++) {
        const f = 1.1 + (i / 7) * 4,
          y = Math.sin(f) * 2.25,
          S = Math.cos(f) * 2,
          M = h(y, S);
        for (let A = 0; A < 6; A++) {
          const a = (A * Math.PI) / 3 + i * 0.8,
            r = 0.28 + (A % 3) * 0.06;
          for (let d = 1; d <= 5; d++) {
            const n = d / 6,
              g = r * n,
              R = M + Math.sin(n * Math.PI * 0.75) * r * 0.7,
              B = new Vector3(y + Math.cos(a) * g, R, S + Math.sin(a) * g);
            for (const E of [-1, 1]) {
              const N = B.clone().add(
                  new Vector3(
                    Math.cos(a + E * 0.95),
                    0.012,
                    Math.sin(a + E * 0.95),
                  ).multiplyScalar(0.09 * (1 - n * 0.7)),
                ),
                O = B.clone().add(
                  new Vector3(Math.cos(a), 0, Math.sin(a)).multiplyScalar(
                    -0.028,
                  ),
                ),
                I = new BufferGeometry();
              (I.setAttribute("position", new bt([...O, ...B, ...N], 3)),
                I.computeVertexNormals(),
                l.push(I));
            }
          }
        }
      }
      return [l].map((i) => {
        const f = i.map((S) => (S.index ? S.toNonIndexed() : S)),
          y = St(f);
        return (new Set([...i, ...f]).forEach((S) => S.dispose()), y);
      });
    }, [o, e, s]),
    m = React.useMemo(
      () => [
        new MeshStandardMaterial({
          color: "#527746",
          roughness: 0.95,
          side: qe,
        }),
      ],
      [],
    );
  return (
    React.useEffect(() => () => t.forEach((l) => l.dispose()), [t]),
    React.useEffect(() => () => m.forEach((l) => l.dispose()), [m]),
    jsxRuntime.jsx("group", {
      children: t.map((l, p) =>
        jsxRuntime.jsx(
          "mesh",
          {
            geometry: l,
            material: m[p],
            receiveShadow: !0,
          },
          p,
        ),
      ),
    })
  );
}
const va = /s?creen|sreen/i,
  ya = /antenna/i,
  xa = "screens-lamp",
  ct = 0.375,
  ut = 0.1;
function Re(o, e) {
  const s = Math.sin(o * 127.1 + e * 311.7) * 43758.5453;
  return s - Math.floor(s);
}
function ba(o, e) {
  const s = Math.floor(o),
    t = Math.floor(e),
    m = o - s,
    l = e - t,
    p = m * m * (3 - 2 * m),
    c = l * l * (3 - 2 * l),
    h = Re(s, t),
    i = Re(s + 1, t),
    f = Re(s, t + 1),
    y = Re(s + 1, t + 1);
  return h + (i - h) * p + (f - h) * c + (h - i - f + y) * p * c;
}
function Sa(o, e) {
  const s = Math.cos(J),
    t = Math.sin(J),
    m = o - De.x,
    l = e - De.z;
  return {
    x: m * s - l * t,
    z: m * t + l * s,
  };
}
function Ta(o, e, s) {
  const t = new CatmullRomCurve3(o),
    m = Math.max(4, o.length * 3),
    l = 5,
    p = new TubeGeometry(t, m, 1, l, !1),
    c = p.attributes.position,
    h = new Vector3(),
    i = new Vector3();
  for (let f = 0; f <= m; f += 1) {
    const y = f / m;
    t.getPointAt(y, h);
    const S = j.lerp(e, s, Math.pow(y, 0.7));
    for (let M = 0; M <= l; M += 1) {
      const A = f * (l + 1) + M;
      (i.fromBufferAttribute(c, A).sub(h).multiplyScalar(S).add(h),
        c.setXYZ(A, i.x, i.y, i.z));
    }
  }
  return (p.computeVertexNormals(), p);
}
function ht() {
  const o = document.createElement("canvas");
  ((o.width = 128), (o.height = 128));
  const e = o.getContext("2d"),
    s = e.createRadialGradient(64, 64, 0, 64, 64, 64);
  (s.addColorStop(0, "rgba(255,255,255,1)"),
    s.addColorStop(0.35, "rgba(255,255,255,0.55)"),
    s.addColorStop(0.7, "rgba(255,255,255,0.14)"),
    s.addColorStop(1, "rgba(255,255,255,0)"),
    (e.fillStyle = s),
    e.fillRect(0, 0, 128, 128));
  const t = new CanvasTexture(o);
  return ((t.colorSpace = Pe), t);
}
function* Ma(o, e, s) {
  const t = Oe(6045415),
    m = o.clone(!0);
  m.updateMatrixWorld(!0);
  const l = [];
  m.traverse((d) => {
    d.isMesh && l.push(d);
  });
  const p = new kt(),
    c = new Vector3(),
    h = (d) => va.test(d.name) || ya.test(d.name),
    i = (d, n) => {
      (p.set(d, n), (p.far = 10));
      const g = p.intersectObjects(l, !1)[0];
      return !g || !g.face
        ? null
        : (c.copy(g.face.normal).transformDirection(g.object.matrixWorld),
          c.dot(n) > 0 && c.negate(),
          {
            point: g.point.clone(),
            normal: c.clone(),
            screen: h(g.object),
          });
    },
    f = new Vector3(0, 1, 0),
    y = [],
    S = [],
    M = function* (d, n, g, R, B, E, N) {
      const O = [];
      let I = n,
        _ = t() < 0.5 ? 1 : -1;
      for (let P = 0; P < g; P += 1) {
        d += B + (ba(d * 4.1, I * 3.3) - 0.5) * 0.12;
        const C = new Vector3(Math.sin(d), 0, Math.cos(d)),
          G = i(C.clone().multiplyScalar(4).setY(I), C.clone().negate());
        if ((yield, !G || G.screen)) break;
        if (G.normal.dot(C) < 0.35) {
          I += R;
          continue;
        }
        const Q = G.point.addScaledVector(G.normal, 0.01);
        O.push(Q);
        const ie = new Vector3().crossVectors(G.normal, f).normalize(),
          re = 1 - P / g,
          le = t() < 0.35 ? 2 : 1;
        for (let ee = 0; ee < le; ee += 1) {
          _ = -_;
          const ce = new Vector3()
            .addScaledVector(f, -0.75 - t() * 0.3)
            .addScaledVector(ie, _ * (0.55 + t() * 0.4));
          y.push({
            point: Q.clone()
              .addScaledVector(ie, _ * 0.012)
              .addScaledVector(G.normal, 0.012 + t() * 0.02),
            normal: G.normal.clone(),
            hang: ce,
            lift: 0.35 + t() * 0.45,
            size: (0.07 + t() * 0.045) * (0.7 + re * 0.3) * (N ? 0.85 : 1),
            tint: ma(t, 1 - re),
          });
        }
        (N === 0 &&
          P > 3 &&
          t() < 0.12 &&
          (yield* M(
            d,
            I,
            5 + Math.floor(t() * 6),
            R * 0.45,
            (t() < 0.5 ? -1 : 1) * 0.06,
            !1,
            1,
          )),
          (I += R));
      }
      if (O.length >= 3) {
        if (E) {
          const P = O[0].clone(),
            C = new Vector3(P.x, 0, P.z).normalize();
          (P.addScaledVector(C, 0.05),
            (P.y = s(P.x, P.z) - 0.03),
            O.unshift(P));
        }
        S.push({
          points: O,
          root: N === 0 ? 0.014 : 0.008,
        });
      }
    },
    A = [84, 102, 120, 136, 150, 162, 172, 182, 192, 204, 218, 234, 250, 268];
  for (const d of A) {
    const n = j.degToRad(d + (t() - 0.5) * 8),
      g = 0.8 + t() * (e.y - 1);
    yield* M(n, 0.04, Math.round(g / 0.065), 0.065, (t() - 0.5) * 0.02, !0, 0);
  }
  const a = {
      x: e.x * 0.5,
    },
    r = i(new Vector3(-4, 0.16, -0.25), new Vector3(1, 0, 0));
  return {
    leaves: y,
    stems: S,
    cableStart:
      (r == null ? void 0 : r.point) ?? new Vector3(-a.x, 0.16, -0.25),
  };
}
function* Aa(o, e, s) {
  const t = yield* Ma(o, e, s),
    m = [];
  for (const p of t.stems) (m.push(Ta(p.points, p.root, 0.003)), yield);
  const l = ka(t.cableStart, s);
  return {
    ...t,
    stemParts: m,
    cable: l,
  };
}
function Ft(o, e) {
  const s =
      globalThis.requestIdleCallback ??
      ((c) =>
        window.setTimeout(() => {
          const h = performance.now();
          c({
            didTimeout: !1,
            timeRemaining: () => Math.max(0, 6 - (performance.now() - h)),
          });
        }, 16)),
    t = globalThis.cancelIdleCallback ?? window.clearTimeout;
  let m = 0,
    l = !1;
  const p = (c) => {
    if (l) return;
    let h;
    do h = o.next();
    while (!h.done && !c.didTimeout && c.timeRemaining() > 3);
    h.done
      ? e(h.value)
      : (m = s(p, {
          timeout: 250,
        }));
  };
  return (
    (m = s(p, {
      timeout: 250,
    })),
    () => {
      ((l = !0), t(m));
    }
  );
}
function ka(o, e) {
  const s = Xt.find((A) => A.id === xa);
  if (!s) return null;
  const t = s.x - Math.sin(s.rotation) * ct,
    m = s.z - Math.cos(s.rotation) * ct,
    l = Sa(t, m),
    p = new Vector2(-l.x, -l.z).normalize(),
    c = l.x + p.x * (ut + 0.02),
    h = l.z + p.y * (ut + 0.02),
    i = Oe(828958),
    f = [o.clone(), new Vector3(o.x - 0.12, e(o.x - 0.12, o.z) + 0.02, o.z)],
    y = 9;
  for (let A = 1; A < y; A += 1) {
    const a = A / y,
      r = Math.sin(a * Math.PI) * 0.55 + Math.sin(a * Math.PI * 2.3) * 0.12,
      d = j.lerp(o.x - 0.12, c, a) + p.y * r,
      n = j.lerp(o.z, h, a) - p.x * r + (i() - 0.5) * 0.08;
    f.push(new Vector3(d, e(d, n) + 0.02, n));
  }
  const S = e(c, h);
  (f.push(new Vector3(c, S + 0.03, h)),
    f.push(new Vector3(c, S + 0.5, h)),
    f.push(new Vector3(c, S + 0.86, h)));
  const M = new CatmullRomCurve3(f, !1, "centripetal");
  return {
    tube: new TubeGeometry(M, 96, 0.017, 6, !1),
    box: {
      x: c + p.x * 0.02,
      y: S + 0.95,
      z: h + p.y * 0.02,
      yaw: Math.atan2(p.x, p.y),
    },
  };
}
const dt = 12;
function Ca({
  model: o,
  footprint: e,
  anchor: s,
  terrainScale: t,
  terrainAmplitude: m,
  lightRef: l,
}) {
  const p = React.useMemo(() => {
      const a = Math.cos(J),
        r = Math.sin(J);
      return (d, n) => Xe(s.x + d * a + n * r, s.z - d * r + n * a, t, m) - s.y;
    }, [s, t, m]),
    [c, h] = React.useState(null);
  React.useEffect(() => {
    let a = !1,
      r = 0,
      d = null;
    const n = () => {
      r = window.setTimeout(() => {
        a ||
          (d = Ft(Aa(o, e, p), (R) => {
            a || h(R);
          }));
      }, 4400);
    };
    let g = null;
    return (
      nt.getState().hudReady
        ? n()
        : (g = nt.subscribe((R) => {
            R.hudReady && (g == null || g(), (g = null), n());
          })),
      () => {
        ((a = !0), g == null || g(), window.clearTimeout(r), d == null || d());
      }
    );
  }, [o, e, p]);
  const i = React.useMemo(() => {
    if (!c) return null;
    const a = new Matrix4(),
      r = new Quaternion(),
      d = new Vector3(),
      n = new InstancedMesh(
        ha(),
        new MeshStandardMaterial({
          vertexColors: !0,
          roughness: da,
          side: qe,
        }),
        Math.max(1, c.leaves.length),
      );
    n.count = c.leaves.length;
    const g = new Vector3(),
      R = new Vector3(),
      B = new Matrix4(),
      E = new Quaternion(),
      N = new Vector3(1, 0, 0);
    c.leaves.forEach((_, P) => {
      (R.copy(_.hang)
        .addScaledVector(_.normal, -_.hang.dot(_.normal))
        .normalize(),
        g.crossVectors(R, _.normal).normalize(),
        B.makeBasis(g, R, _.normal),
        r.setFromRotationMatrix(B),
        E.setFromAxisAngle(N, -_.lift),
        r.multiply(E),
        d.setScalar(_.size),
        a.compose(_.point, r, d),
        n.setMatrixAt(P, a),
        n.setColorAt(P, _.tint));
    });
    const O = c.stemParts.length ? St(c.stemParts) : null;
    c.stemParts.forEach((_) => _.dispose());
    const I = c.cable;
    return (
      (n.castShadow = !1),
      (n.receiveShadow = !0),
      (n.instanceMatrix.needsUpdate = !0),
      n.instanceColor && (n.instanceColor.needsUpdate = !0),
      n.computeBoundingSphere(),
      {
        ivy: n,
        stemGeometry: O,
        cable: I,
      }
    );
  }, [c, p]);
  React.useEffect(
    () => () => {
      var a, r;
      i &&
        (i.ivy.geometry.dispose(),
        i.ivy.material.dispose(),
        i.ivy.dispose(),
        (a = i.stemGeometry) == null || a.dispose(),
        (r = i.cable) == null || r.tube.dispose());
    },
    [i],
  );
  const f = React.useMemo(() => {
    const a = new PlaneGeometry(4.2, 2.6, 16, 10).rotateX(-Math.PI / 2),
      r = a.attributes.position;
    for (let n = 0; n < r.count; n += 1) {
      const g = r.getX(n),
        R = r.getZ(n) + 1.05;
      r.setXYZ(n, g, p(g, R) + 0.035, R);
    }
    a.computeBoundingSphere();
    const d = new MeshBasicMaterial({
      map: ht(),
      transparent: !0,
      opacity: 0,
      blending: Fe,
      depthWrite: !1,
      toneMapped: !1,
    });
    return {
      geometry: a,
      material: d,
    };
  }, [p]);
  React.useEffect(
    () => () => {
      (f.geometry.dispose(), f.material.map.dispose(), f.material.dispose());
    },
    [f],
  );
  const y = React.useMemo(() => {
    const a = Oe(198629),
      r = Array.from(
        {
          length: dt,
        },
        () => ({
          x: (a() - 0.5) * 1.8,
          y: 0.8 + a() * 1.9,
          z: 0.55 + a() * 0.45,
          radius: 0.14 + a() * 0.22,
          speed: (1.6 + a() * 2.2) * (a() < 0.5 ? -1 : 1),
          phase: a() * Math.PI * 2,
        }),
      ),
      d = new BufferGeometry();
    d.setAttribute("position", new bt(new Float32Array(dt * 3), 3));
    const n = new PointsMaterial({
      size: 0.075,
      map: ht(),
      color: "#ffe7b8",
      transparent: !0,
      opacity: 0,
      depthWrite: !1,
      blending: Fe,
    });
    return {
      flight: r,
      geometry: d,
      material: n,
    };
  }, []);
  React.useEffect(
    () => () => {
      (y.geometry.dispose(), y.material.map.dispose(), y.material.dispose());
    },
    [y],
  );
  const S = React.useRef(),
    M = React.useMemo(
      () => ({
        h: 0,
        s: 0,
        l: 0,
      }),
      [],
    ),
    A = React.useRef();
  return (
    useEffect((a) => {
      const r = Et.getState(),
        d = j.smoothstep(r.nightAmount ?? 0, 0.12, 0.78),
        n = l.current;
      (n &&
        (n.color.getHSL(M),
        f.material.color.setHSL(M.h, Math.min(1, M.s * 1.8 + 0.25), M.l * 0.62),
        (f.material.opacity = j.clamp(n.intensity / 3, 0, 1) * 0.3 * d)),
        S.current && (S.current.visible = f.material.opacity > 0.004));
      const g = A.current;
      if (
        !g ||
        ((y.material.opacity = d * 0.95),
        (g.visible = d > 0.05 && !ne),
        !g.visible)
      )
        return;
      const R = a.clock.elapsedTime,
        B = y.geometry.attributes.position;
      (y.flight.forEach((E, N) => {
        const O = R * E.speed + Math.sin(R * 3.1 + E.phase) * 1.3;
        B.setXYZ(
          N,
          E.x + Math.cos(O) * E.radius,
          E.y +
            Math.sin(O * 1.7) * E.radius * 0.6 +
            Math.sin(R * 17 + E.phase) * 0.02,
          E.z + Math.sin(O) * E.radius * 0.5,
        );
      }),
        (B.needsUpdate = !0));
    }),
    jsxRuntime.jsxs("group", {
      children: [
        i &&
          jsxRuntime.jsxs(jsxRuntime.Fragment, {
            children: [
              jsxRuntime.jsx("primitive", {
                object: i.ivy,
                dispose: null,
              }),
              i.stemGeometry &&
                jsxRuntime.jsx("mesh", {
                  geometry: i.stemGeometry,
                  receiveShadow: !0,
                  dispose: null,
                  children: jsxRuntime.jsx("meshStandardMaterial", {
                    color: fa,
                    roughness: 0.95,
                  }),
                }),
              i.cable &&
                jsxRuntime.jsxs(jsxRuntime.Fragment, {
                  children: [
                    jsxRuntime.jsx("mesh", {
                      geometry: i.cable.tube,
                      castShadow: !0,
                      receiveShadow: !0,
                      dispose: null,
                      children: jsxRuntime.jsx("meshStandardMaterial", {
                        color: "#26282a",
                        roughness: 0.7,
                      }),
                    }),
                    jsxRuntime.jsxs("mesh", {
                      position: [i.cable.box.x, i.cable.box.y, i.cable.box.z],
                      rotation: [0, i.cable.box.yaw, 0],
                      castShadow: !0,
                      children: [
                        jsxRuntime.jsx("boxGeometry", {
                          args: [0.13, 0.17, 0.07],
                        }),
                        jsxRuntime.jsx("meshStandardMaterial", {
                          color: "#4a4f4c",
                          roughness: 0.6,
                          metalness: 0.3,
                        }),
                      ],
                    }),
                  ],
                }),
            ],
          }),
        jsxRuntime.jsx("mesh", {
          ref: S,
          geometry: f.geometry,
          material: f.material,
          renderOrder: 3,
          visible: !1,
        }),
        jsxRuntime.jsx("points", {
          ref: A,
          geometry: y.geometry,
          material: y.material,
          frustumCulled: !1,
          visible: !1,
        }),
      ],
    })
  );
}
const Pt = "/assets/tv-BIHPSDVB.glb",
  te = new Vector3(),
  ae = new Vector3(),
  ge = new Vector3(),
  Ra = new Vector3(),
  _e = new Vector3(),
  ft = new Vector3(0, 1, 0),
  _a = 6e3;
function* Ea(
  o,
  {
    skip: e = () => !1,
    cell: s = 0.18,
    minArea: t = 0.01,
    clearance: m = 0.3,
    spacing: l = 0.45,
    limit: p = 6,
    avoid: c = [],
    avoidRadius: h = 0.4,
  } = {},
) {
  o.updateMatrixWorld(!0);
  const i = new Map(),
    f = [];
  o.traverse((a) => {
    a.isMesh && !e(a) && f.push(a);
  });
  let y = 0;
  for (const a of f) {
    const r = a.geometry.attributes.position,
      d = a.geometry.index,
      n = d ? d.count : r.count;
    for (let g = 0; g < n; g += 3) {
      (y >= _a && ((y = 0), yield), (y += 1));
      const R = d ? d.getX(g) : g,
        B = d ? d.getX(g + 1) : g + 1,
        E = d ? d.getX(g + 2) : g + 2;
      (te.fromBufferAttribute(r, R).applyMatrix4(a.matrixWorld),
        ae.fromBufferAttribute(r, B).applyMatrix4(a.matrixWorld),
        ge.fromBufferAttribute(r, E).applyMatrix4(a.matrixWorld),
        _e.subVectors(ge, ae).cross(Ra.subVectors(ae, te)));
      const N = _e.length();
      if (N < 1e-9 || (_e.divideScalar(N), Math.abs(_e.y) < 0.92)) continue;
      const O = (te.x + ae.x + ge.x) / 3,
        I = (te.y + ae.y + ge.y) / 3,
        _ = (te.z + ae.z + ge.z) / 3,
        P = `${Math.floor(O / s)}:${Math.floor(_ / s)}`;
      let C = i.get(P);
      if (
        (C ||
          i.set(
            P,
            (C = {
              x: 0,
              z: 0,
              y: -1 / 0,
              area: 0,
              weight: 0,
            }),
          ),
        I > C.y + 0.03 &&
          ((C.y = I), (C.area = 0), (C.x = 0), (C.z = 0), (C.weight = 0)),
        I > C.y - 0.03)
      ) {
        const G = N / 2;
        ((C.area += G), (C.x += O * G), (C.z += _ * G), (C.weight += G));
      }
    }
  }
  const S = [];
  for (const a of i.values())
    a.area < t || S.push(new Vector3(a.x / a.weight, a.y, a.z / a.weight));
  S.sort((a, r) => r.y - a.y);
  const M = new kt();
  M.far = m;
  const A = [];
  for (const a of S) {
    if (A.length >= p) break;
    A.some((r) => Math.hypot(r.x - a.x, r.z - a.z) < l) ||
      c.some((r) => Math.hypot(r.x - a.x, r.z - a.z) < h) ||
      (M.set(te.copy(a).addScaledVector(ft, 0.02), ft),
      !M.intersectObjects(f, !1).length && A.push(a));
  }
  return A;
}
const xe = 3.4,
  za = 5.2,
  Fa = 0.1,
  mt = ne ? 0 : 0.62,
  pt = /s?creen|sreen/i,
  gt = /antenna/i,
  Pa = 4;
function Oa(o) {
  const e = o.geometry.getAttribute("position"),
    s = new Vector3(),
    t = new Box3().setFromBufferAttribute(e),
    m = t.getSize(new Vector3()),
    l = t.getCenter(new Vector3()),
    p = m.x >= m.z,
    c = [null, null];
  for (let h = 0; h < e.count; h += 1) {
    s.fromBufferAttribute(e, h);
    const i = (p ? s.x - l.x : s.z - l.z) >= 0 ? 1 : 0;
    (!c[i] || s.y > c[i].y) && (c[i] = s.clone());
  }
  return !c[0] || !c[1]
    ? null
    : (o.updateWorldMatrix(!0, !1),
      c.map((h) => h.applyMatrix4(o.matrixWorld)));
}
function Ia(o) {
  const e = o.clone();
  ((e.metalness = 0.24), (e.roughness = 0.62));
  const s = {
    uTime: {
      value: 0,
    },
    uCharge: {
      value: 1,
    },
    uArc: {
      value: 0,
    },
    uTipY: {
      value: 0,
    },
    uTipSpan: {
      value: 1,
    },
  };
  return (
    (e.userData.chargeUniforms = s),
    (e.onBeforeCompile = (t) => {
      ((t.uniforms.uTime = s.uTime),
        (t.uniforms.uCharge = s.uCharge),
        (t.uniforms.uArc = s.uArc),
        (t.uniforms.uTipY = s.uTipY),
        (t.uniforms.uTipSpan = s.uTipSpan),
        (t.vertexShader = t.vertexShader
          .replace(
            "#include <common>",
            `#include <common>
varying vec3 vRod;`,
          )
          .replace(
            "#include <begin_vertex>",
            `#include <begin_vertex>
vRod = position;`,
          )),
        (t.fragmentShader = t.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
                uniform float uTime;
                uniform float uCharge;
                uniform float uArc;
                uniform float uTipY;
                uniform float uTipSpan;
                varying vec3 vRod;`,
          )
          .replace(
            "#include <emissivemap_fragment>",
            `#include <emissivemap_fragment>
                // Nothing runs up the rods any more.
                //
                // There were two charges travelling the length of the aerial,
                // and at any distance they read as bands sliding over the
                // metal — a ring of light crawling up a stick, which is not
                // what electricity looks like on anything. The rods are just
                // rods; the only thing that happens here is that their ends
                // light when the gap between them fires.
                // A point, not a band. The cap is a sixth of the rod and the
                // curve is steep inside it, so the part that actually goes
                // past white is the last few percent of the metal — which is
                // where a discharge is anchored and the only place it is that
                // bright in any photograph of one.
                float tip = pow(smoothstep(uTipY - uTipSpan, uTipY, vRod.y), 3.5);
                // Mains hum. The rod ends never sit still while the gap is
                // live: metal carrying a current buzzes, and a perfectly
                // steady glow on the tips reads as a painted highlight.
                float hum = 0.86 + 0.14 * sin(uTime * 47.0) + 0.06 * sin(uTime * 113.0);
                totalEmissiveRadiance +=
                    vec3(0.5, 0.95, 1.9) * tip * uArc * hum * 2.2 * uCharge;`,
          )));
    }),
    (e.customProgramCacheKey = () => "meadow-antenna-charge"),
    e
  );
}
const Ua = "'SFMono-Regular', ui-monospace, Menlo, Consolas, monospace",
  La = {
    ident: 22,
  },
  Na = 6,
  wt = [0, 4, 5],
  Ot = "TV_02_screen_10_0",
  Ga = Object.freeze({
    [Ot]: "project-aera",
    TV_03_sreen_03_0: "project-brickblaster",
    TV_Sreen_01_0: "project-hologram",
    TV_05_screen_05_0: "project-paper-boat",
    TV_07_screen_07_0: "project-golden-hour",
    TV_08_screen_08_0: "project-cosmic-bloom",
    PC_01_Sreen_02_0: "project-polify",
  }),
  oe = [
    {
      tint: [1, 0.62, 0.14],
      name: "amber",
    },
    {
      tint: [0.38, 1, 0.48],
      name: "green",
    },
    {
      tint: [0.58, 0.79, 1],
      name: "cold white",
    },
    {
      tint: [1, 0.91, 0.7],
      name: "warm white",
    },
    {
      tint: [0.34, 0.92, 1],
      name: "cyan",
    },
    {
      tint: [1, 0.46, 0.36],
      name: "salmon",
    },
  ];
function Ba(o) {
  const e = Oe(24301 ^ Math.imul(o + 1, 2654435761));
  return {
    grain: 0.012 + e() * 0.038,
    faultOdds: 0.05 + e() * 0.11,
    faultRate: 0.15 + e() * 0.3,
    rollSpeed: 0.015 + e() * 0.075,
    rollAmount: 0.05 + e() * 0.12,
  };
}
function ja(o) {
  const e = new CanvasTexture(o);
  return (
    (e.colorSpace = Pe),
    (e.minFilter = be),
    (e.magFilter = be),
    (e.generateMipmaps = !1),
    e
  );
}
const Va = new Color("#9dc0ff"),
  we = 256,
  ve = 192;
let He = null;
const vt = () => {
  He ?? (He = It());
};
typeof window < "u" &&
  (window.requestIdleCallback
    ? window.requestIdleCallback(vt, {
        timeout: 2e3,
      })
    : window.setTimeout(vt, 300));
function Wa() {
  const o = He ?? It();
  return ((He = null), o);
}
function It() {
  const o = document.createElement("canvas");
  ((o.width = we), (o.height = ve));
  const e = o.getContext("2d");
  ((e.fillStyle = "#000000"),
    e.fillRect(0, 0, we, ve),
    (e.fillStyle = "#ffffff"),
    (e.font = `700 ${La.ident}px ${Ua}`),
    (e.letterSpacing = "6px"),
    (e.textBaseline = "middle"));
  const s = "CURLLMOOHA",
    t = e.measureText(s).width;
  return (
    e.fillText(s, (we - t) / 2, ve * 0.5),
    (e.fillStyle = "rgba(255, 255, 255, 0.5)"),
    e.fillRect((we - t) / 2, ve * 0.5 - 26, t, 1),
    e.fillRect((we - t) / 2, ve * 0.5 + 25, t, 1),
    (e.letterSpacing = "0px"),
    (e.textBaseline = "alphabetic"),
    ja(o)
  );
}
const je = `
    uniform vec2 uUvMin;
    uniform vec2 uUvScale;
    varying vec2 vUv;
    void main() {
        vUv = (uv - uUvMin) / uUvScale;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`,
  Je = `
    float hash11(float p) {
        return fract(sin(p * 127.1) * 43758.5453);
    }

    float hash21(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    // 0 almost always; a short decaying spike when this set's number comes up.
    //
    // Rate and odds are per set rather than baked in here, and that is the
    // whole point of the rewrite: with one schedule for all ten, the pile
    // twitched in chorus every couple of seconds and read as a screen effect
    // applied to a model. Every set now runs its own clock at its own rate
    // with its own chance of anything happening, so most of them are simply
    // *working*, one of them faults, and you cannot predict which.
    float crtFault(float time, float seed, float rate, float odds) {
        float clock = time * rate + seed * 23.0;
        float slot = floor(clock);
        float local = fract(clock);
        float roll = hash11(slot + seed * 31.0);
        float span = 0.03 + roll * 0.05;
        if (roll > odds || local > span) return 0.0;
        return 1.0 - local / span;
    }

    // The band crawling up the picture, at this set's own pace.
    float crtRoll(vec2 uv, float time, float seed, float speed) {
        float band = fract(uv.y - time * speed + seed);
        return smoothstep(0.0, 0.05, band) * (1.0 - smoothstep(0.05, 0.17, band));
    }
`,
  Da = `
    uniform sampler2D uCard;
    uniform vec3 uAccent;
    uniform vec3 uTint;
    uniform float uStyle;
    // 1 when uCard is a photograph rather than the ident: it is cropped to
    // the tube's shape and keeps its own colour, with the phosphor only
    // warming it rather than replacing it.
    uniform float uPhoto;
    uniform vec2 uCrop;
    // The switch-on. 0 is a dark tube, 1 is the whole picture; in between,
    // the picture is a bright line across the middle opening vertically.
    uniform float uOn;
    uniform float uTime;
    uniform float uSignal;
    uniform float uTune;
    uniform float uSeed;
    uniform float uNight;
    uniform float uStorm;
    uniform float uFlash;
    uniform float uFaultRate;
    uniform float uFaultOdds;
    uniform float uGrain;
    uniform float uRollSpeed;
    uniform float uRollAmount;
    varying vec2 vUv;

    ${Je}

    void main() {
        vec2 uv = vUv;

        // The roll. A real set drifts; a locked one drifts less.
        float drift = (1.0 - uSignal) * 0.06 + uTune * 0.5;
        uv.y = fract(uv.y + sin(uTime * 0.32 + uSeed * 6.0) * 0.004 + drift * uTune);

        // The fault, and the tear it drags across the picture: the frame is
        // cut into slices and a few of them are thrown sideways, which is what
        // a lost horizontal lock actually looks like.
        // Weather is on the aerial, not on the glass.
        //
        // These are analogue sets in a field with rabbit-ear antennas, and rain
        // is what analogue reception loses to — so as the storm comes in the
        // picture does not dim or streak, it *breaks up*: the faults come four
        // times as often, and the signal gives way to snow. By the height of
        // the rain there is no picture on the pile at all, which is a truer
        // thing for the meadow to say about its own weather than any amount of
        // water drawn on the front of a tube.
        float fault = max(
            crtFault(uTime, uSeed, uFaultRate * (1.0 + uStorm * 5.0), uFaultOdds + uStorm * 0.55),
            uTune * 0.7
        );
        fault = max(fault, uStorm * 0.45);
        float slice = floor(uv.y * 26.0);
        float tear = (hash11(slice + floor(uTime * 22.0)) - 0.5) * fault * 0.34;
        tear *= step(0.45, hash11(slice * 1.7 + floor(uTime * 22.0)));
        uv.x = fract(uv.x + tear);

        // The mark, treated differently on every set.
        //
        // One card, six treatments. Ten televisions showing the identical
        // still is a wallpaper; ten showing the same word doing six different
        // things is a pile of televisions, and the word is what they have in
        // common rather than what makes them the same.
        vec2 identUv = uv;
        float reveal = 1.0;
        float echo = 0.0;

        if (uStyle < 0.5) {
            // Locked. The mark sits dead still and only its colour comes
            // apart, which is what a good set with a tired cable looks like.
            echo = 0.35;
        } else if (uStyle < 1.5) {
            // The caption crawl every shop-window set has ever run.
            identUv.x = fract(identUv.x + uTime * 0.045);
        } else if (uStyle < 2.5) {
            // Vertical hold, gently given up on.
            identUv.y = fract(identUv.y + uTime * 0.028);
        } else if (uStyle < 3.5) {
            // Lit only where a bright band sweeps down it.
            float band = fract(uv.y + uTime * 0.16);
            reveal = 0.24 + 1.6
                * smoothstep(0.0, 0.1, band)
                * (1.0 - smoothstep(0.1, 0.32, band));
        } else if (uStyle < 4.5) {
            // Breathing, as though the tube were still settling.
            identUv = (identUv - 0.5) * (1.0 - 0.05 * sin(uTime * 0.55)) + 0.5;
            echo = 0.5;
        } else {
            // The weave of a tired timebase.
            identUv.x += sin(identUv.y * 9.0 + uTime * 0.9) * 0.012;
        }

        // A broadcast sits still on its tube. The footage is the motion; the
        // set adds only what a set adds — a hair of horizontal jitter per
        // scanline, changing every frame, which is the analogue wobble no
        // flat panel has, and the raster creeping under it (see lines, below).
        identUv.x += (hash11(floor(uv.y * 160.0) + floor(uTime * 24.0)) - 0.5) * 0.0022 * uPhoto;

        // Colour coming apart. Mostly while the set is failing — a permanent        // Colour coming apart. Mostly while the set is failing — a permanent
        // chromatic split is a photo filter, not a fault — with a hair of it
        // held on the styles that are otherwise perfectly still.
        float split = fault * 0.014 + echo * 0.0045;
        // A 16:9 still on a 4:3 tube: the middle of it, not a squashed
        // whole. The ident is drawn at the tube's own shape and needs no crop.
        identUv.x = identUv.x * uCrop.x + uCrop.y;
        vec3 picture = vec3(
            texture2D(uCard, identUv + vec2(split, 0.0)).r,
            texture2D(uCard, identUv).g,
            texture2D(uCard, identUv - vec2(split, 0.0)).b
        ) * mix(uTint, mix(vec3(1.0), uTint, 0.22), uPhoto) * reveal;

        // The band crawling up the tube, and faster once the lock is going.
        picture *= 1.0
            + crtRoll(uv, uTime, uSeed, uRollSpeed) * (uRollAmount + uStorm * 0.5) * (1.0 - uPhoto);

        // The snow the signal is lost to.
        float snow = hash21(floor(uv * vec2(154.0, 112.0)) + floor(uTime * 30.0));
        picture = mix(picture, vec3(snow * 0.92), smoothstep(0.05, 0.85, uStorm));

        // Scanlines and the shadow mask under them.
        // A photograph keeps a hint of the tube and no more. The line depth,
        // the mask, the corner falloff, the grain and the standby dimming
        // below were all set for a white word on black, where they read as
        // character; on a picture they read as a bad signal, and the point
        // of the picture is to be seen.
        float lines = mix(0.86 + 0.14 * sin(uv.y * 210.0), 0.955 + 0.045 * sin(uv.y * 210.0 + uTime * 2.4), uPhoto);
        float mask = mix(0.94 + 0.06 * sin(uv.x * 320.0), 1.0, uPhoto);
        picture *= lines * mask;

        // Grain, and much more of it when the signal is weak.
        // Barely anything.
        //
        // A working television is not grainy — it has a texture you notice
        // when you put your face near the glass and not before. This ran at
        // ten times the depth and every card read as noise with a colour
        // behind it, which is a broken set, not a set. The fault and the storm
        // are the only two things allowed to bring the snow up.
        float grain = hash21(floor(uv * vec2(120.0, 90.0)) + floor(uTime * 24.0));
        picture = mix(
            picture,
            vec3(grain),
            (uGrain * (0.55 + (1.0 - uSignal) * 0.45) + uTune * 0.4 + fault * 0.5) * mix(1.0, 0.4, uPhoto)
        );

        // The tube: bright in the middle, dark in the corners, curved off at
        // the edge so the glass has a shape.
        vec2 centred = uv - 0.5;
        float vignette = 1.0 - smoothstep(0.32, 0.72, length(centred * vec2(1.0, 1.18)));
        picture *= mix(mix(0.35, 1.0, vignette), mix(0.74, 1.0, vignette), uPhoto);

        // Breath: the whole picture pulses very slightly, and flares as it
        // tunes in.
        float breath = 0.97 + 0.03 * sin(uTime * (1.7 + uSeed * 2.0));
        float gain = mix(mix(0.34, 1.0, uSignal), mix(0.66, 1.0, uSignal), uPhoto) * breath + uTune * 0.85;

        // After dark a television stops being a picture and becomes a lamp.
        //
        // Everything above is tuned for a tube seen in daylight and the
        // numbers are right for that, but they left ten switched-on sets
        // dimmer at midnight than one lantern on the path — which is the exact
        // thing this heap exists not to be. It was also arithmetically
        // incapable of glowing: the composer's bloom only takes pixels above
        // 0.8 (luminanceThreshold, FilmPostProcessing.jsx), and a white ident
        // at the old gain landed near 0.45 once the vignette and the scanlines
        // had taken their cut. No amount of bloom tuning downstream could find
        // light that was never emitted.
        //
        // The lift is strongest on the sets nobody is standing in front of.
        // That is the inverse of the daylight curve and it is deliberate twice
        // over: a lit window is at its most legible from across a field, and a
        // set already at full signal would blow out if it were lifted as hard.
        //
        // The set actually being watched barely takes it at all. At 0.75 on
        // top of full signal, the glow card in front and no tone mapping, the
        // picture you walked up to read was blown out to white.
        gain *= 1.0 + uNight * mix(1.75, 0.18, uSignal);
        picture *= gain;

        // The switch-on, the way a tube does it: the beam collapses to a
        // bright line across the middle of a dark glass, the line opens
        // upward and downward until it is the picture, and the edge of the
        // opening glows white while it travels. Off is a dark tube with a
        // spark in the centre, which is what an old set looks like a moment
        // after the switch.
        float on = mix(1.0, uOn, uPhoto);
        float halfOpen = on * 0.5;
        float dy = abs(uv.y - 0.5);
        float inside = 1.0 - smoothstep(halfOpen, halfOpen + 0.004, dy);
        float rim = exp(-pow((dy - halfOpen) / 0.014, 2.0)) * (1.0 - on);
        // In the first breath the line itself is still growing out from the
        // centre, so the set starts as a dot.
        float lineW = smoothstep(0.0, 0.18, on) * 0.5 + 0.012;
        float across = 1.0 - smoothstep(lineW, lineW + 0.02, abs(uv.x - 0.5));
        picture = picture * inside * across + vec3(1.0, 0.97, 0.88) * rim * across * 1.6;

        // Standby: an unwatched set still owns its own colour rather than
        // going black, which is what keeps the pile alive from a distance.
        // Kept light — at the first depth this washed the listing's dark
        // ground orange and the five rows stopped reading as rows.
        picture += uAccent * (0.04 + 0.09 * uSignal) * vignette;

        // Lightning reaches the set before it reaches the meadow: a strike
        // blows the picture out for a frame, the way it does to anything on a
        // long wire.
        picture += vec3(0.85, 0.88, 1.0) * uFlash * 0.7;

        // A soft shoulder instead of a hard clip, after dark. These are not
        // tone mapped, so anything over 1.0 used to flatten to pure white and
        // take the picture with it; above 0.78 the light now rolls off, keeping
        // the detail in a white page while still leaving enough over the
        // bloom threshold for the pile to glow from across the meadow.
        vec3 over = max(picture - 0.78, 0.0);
        vec3 shouldered = min(picture, vec3(0.78)) + over / (1.0 + over * 2.2);
        picture = mix(picture, shouldered, uNight);

        gl_FragColor = vec4(picture, 1.0);
        #include <colorspace_fragment>
    }
`,
  Ha = `
    uniform float uTime;
    uniform float uSignal;
    uniform float uSeed;
    uniform float uNight;
    uniform float uStorm;
    uniform float uFlash;
    uniform float uFaultRate;
    uniform float uFaultOdds;
    uniform float uGrain;
    uniform float uRollSpeed;
    uniform float uRollAmount;
    varying vec2 vUv;

    ${Je}

    vec3 barColour(vec2 uv) {
        float column = floor(clamp(uv.x, 0.0, 0.999) * 7.0);
        if (uv.y > 0.3) {
            if (column < 0.5) return vec3(0.76);
            if (column < 1.5) return vec3(0.76, 0.76, 0.06);
            if (column < 2.5) return vec3(0.06, 0.7, 0.76);
            if (column < 3.5) return vec3(0.08, 0.72, 0.16);
            if (column < 4.5) return vec3(0.76, 0.1, 0.7);
            if (column < 5.5) return vec3(0.74, 0.09, 0.09);
            return vec3(0.1, 0.12, 0.74);
        }
        // The strip under them, which on a real card is the blacker-than-black
        // and colour-burst reference and reads simply as "engineering".
        if (column < 0.5) return vec3(0.08, 0.1, 0.42);
        if (column < 1.5) return vec3(0.03);
        if (column < 2.5) return vec3(0.5, 0.06, 0.3);
        if (column < 3.5) return vec3(0.03);
        if (column < 4.5) return vec3(0.28, 0.42, 0.44);
        if (column < 5.5) return vec3(0.03);
        return vec3(0.36);
    }

    void main() {
        vec2 uv = vUv;
        float fault = max(
            crtFault(uTime, uSeed + 0.6, uFaultRate * (1.0 + uStorm * 5.0), uFaultOdds + uStorm * 0.5),
            uStorm * 0.4
        );

        // The wobble: a slow standing wave down the whole card, with the
        // sideways throw of a fault on top of it.
        uv.x += sin(uv.y * 22.0 + uTime * 1.6 + uSeed * 6.0) * 0.006;
        float slice = floor(uv.y * 28.0);
        uv.x = fract(uv.x + (hash11(slice + floor(uTime * 24.0)) - 0.5) * fault * 0.42);

        vec3 picture = barColour(uv);
        picture *= 1.0 + crtRoll(uv, uTime, uSeed, uRollSpeed) * uRollAmount;

        float grain = hash21(floor(uv * vec2(120.0, 90.0)) + floor(uTime * 24.0));
        picture = mix(picture, vec3(grain), uGrain + fault * 0.5 + smoothstep(0.05, 0.85, uStorm) * 0.85);
        picture *= 0.86 + 0.14 * sin(uv.y * 200.0);

        vec2 centred = uv - 0.5;
        float vignette = 1.0 - smoothstep(0.32, 0.72, length(centred * vec2(1.0, 1.18)));
        picture *= mix(0.4, 1.0, vignette) * mix(0.55, 1.0, uSignal);
        // The same night lift the ident sets take, and the reasoning is there.
        // The bars get the full share: seven saturated columns are the first
        // thing on the pile that reads from a distance, and the one image that
        // says "broadcast" without needing to be read.
        picture *= 1.0 + uNight * mix(1.6, 0.3, uSignal);
        picture += vec3(0.85, 0.88, 1.0) * uFlash * 0.7;

        gl_FragColor = vec4(picture, 1.0);
        #include <colorspace_fragment>
    }
`,
  Ya = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`,
  qa = `
    uniform vec3 uColor;
    uniform float uGlow;
    varying vec2 vUv;

    void main() {
        vec2 centred = vUv - 0.5;
        // Squashed a little vertically, because a tube spills sideways more
        // than it spills up.
        float distance = length(centred * vec2(1.0, 1.24)) * 2.0;
        // Squared, on a quad wide enough to hold it.
        //
        // This was cubed, and for a real reason: the first pass still had
        // brightness left when it reached the edge of its geometry, which put
        // a visible boundary in mid-air and turned a wash of light into a pane
        // of orange glass wedged between two cabinets. But cubing solved that
        // by extinguishing the glow two thirds of the way in, and what was
        // left was invisible — at night, from the path, ten lit screens threw
        // no halo at all. The edge was the wrong thing to fix. A glow has to
        // arrive at nothing before its geometry runs out, so the geometry is
        // now large enough that it can do that gently (see the scale these are
        // built at), and the curve is free to stay soft.
        float falloff = 1.0 - smoothstep(0.0, 1.0, distance);
        falloff *= falloff;
        // Hollow in the middle, which is the whole difference between light
        // and fog.
        //
        // Centred on the glass and brightest at its centre, this card was
        // adding a wash on top of the one part of the scene that is already
        // the brightest thing in it — so the ident sat behind a milky oval and
        // every tube looked like it had condensation on the inside. What a lit
        // screen actually does to a dark room happens *outside* the glass: the
        // bezel, the cabinet next to it, the air. Fading the card in from
        // nothing at the centre to full by roughly the edge of the screen puts
        // the energy where the picture is not, and the tube reads as bright
        // rather than smeared.
        //
        // Dimmed at the centre rather than emptied. Taken all the way to zero
        // this stopped being a hollow and became a shape: six bright smoke
        // rings hanging in the clearing, each one obviously the edge of a
        // quad. The wash still has to cross the middle — it is light, it has
        // nowhere else to be — it just must not compete with the picture it is
        // supposed to be coming from.
        falloff *= mix(0.3, 1.0, smoothstep(0.0, 0.52, distance));
        float energy = falloff * uGlow;
        if (energy < 0.002) discard;
        gl_FragColor = vec4(uColor * energy, energy);
        #include <colorspace_fragment>
    }
`,
  ye = 32,
  Ut = 3,
  Xa = 3,
  Ve = Ut + Xa,
  Ja = `
    uniform vec3 uFrom;
    uniform vec3 uTo;
    uniform vec3 uCameraLocal;
    uniform float uTime;
    uniform float uSeed;
    uniform float uJag;
    uniform float uThickness;
    uniform float uLife;
    attribute float aAlong;
    attribute float aSide;
    attribute float aStrand;
    varying float vSide;
    varying float vGap;
    varying float vBright;

    float arcHash(float n) {
        return fract(sin(n * 127.1) * 43758.5453123);
    }

    // A kink every whole number of x, joined by straight runs. Linear on
    // purpose: smoothing this is what turns a discharge back into a rope.
    float arcKink(float x) {
        float cell = floor(x);
        return mix(arcHash(cell) * 2.0 - 1.0, arcHash(cell + 1.0) * 2.0 - 1.0, x - cell);
    }

    // Where the channel sits across the gap at t, in metres. Pinned to nothing
    // at both ends, so it stays welded to the rod tips.
    float channel(float t, float phase) {
        float taper = sin(t * 3.14159265);
        float wander =
            arcKink(t * 7.0 + uTime * 2.5 + phase * 13.0) * 0.62 +
            arcKink(t * 17.0 - uTime * 4.0 + phase * 29.0) * 0.26 +
            sin(t * 9.0 + phase * 31.0 + uTime * 7.0) * 0.3 +
            sin(t * 21.0 + phase * 17.0 - uTime * 11.0) * 0.14;
        return wander * taper * uJag;
    }

    void main() {
        vec3 axis = uTo - uFrom;
        vec3 direction = normalize(axis);

        float branch = step(${Ut - 0.5}, aStrand);
        float satellite = step(0.5, aStrand) * (1.0 - branch);
        float phase = uSeed + aStrand * 0.317;

        // A branch forks off the channel at attach, runs span of the gap and
        // veers off it. Drawn from the strike seed rather than from time, so a
        // fork holds still for the length of a strike instead of scribbling
        // every frame.
        float attach = 0.16 + arcHash(aStrand * 13.7 + uSeed * 91.0) * 0.62;
        float span = 0.09 + arcHash(aStrand * 5.3 + uSeed * 37.0) * 0.15;
        float veer = arcHash(aStrand * 9.1 + uSeed * 53.0) * 2.0 - 1.0;

        float t = mix(aAlong, attach + aAlong * span, branch);
        float offset = channel(t, phase);
        // The satellites braid around the core instead of tracing it.
        offset += sin(t * 33.0 + phase * 61.0 + uTime * 13.0) * uJag * 0.3 * satellite;
        // The fork leaves the channel, accelerating as it goes.
        offset += veer * aAlong * aAlong * uJag * 1.1 * branch;

        // Cores are fattest in the middle; a fork narrows to a point, squared
        // so it actually arrives at one rather than stopping at a stub.
        float taper = mix(0.3 + 0.7 * sin(t * 3.14159265), (1.0 - aAlong) * (1.0 - aAlong), branch);
        float weight = mix(mix(1.0, 0.5, satellite), 0.3, branch);
        // A weak discharge is thin and a hard one is fat: the gap gets visibly
        // fatter as it goes over, rather than only brighter.
        float width = uThickness * taper * weight * (0.4 + 0.6 * uLife);

        vec3 base = uFrom + axis * t;

        // The one axis anything is visible in.
        //
        // side is perpendicular to the gap and to the view, which makes it the
        // ribbon's width on screen and the only direction a bend shows up in.
        // Both the wander and the thickness live here; putting the wander on
        // the other perpendicular pushes it towards the camera, where it
        // projects to nothing and draws a straight line.
        vec3 toCamera = normalize(uCameraLocal - base);
        vec3 raw = cross(direction, toCamera);
        float grazing = length(raw);
        // Standing so the aerial points at you collapses that axis and folds
        // the whole ribbon into a point. Any stable perpendicular will do
        // there — from head on, which way the jag goes is unknowable anyway.
        vec3 fallback = abs(direction.y) < 0.9 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
        vec3 side = grazing > 0.04 ? raw / grazing : normalize(cross(direction, fallback));

        vec3 local = base + side * (offset + aSide * width);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(local, 1.0);
        vSide = aSide;
        vGap = t;
        vBright = mix(mix(1.0, 0.62, satellite), (1.0 - aAlong) * 0.7, branch);
    }
`,
  $a = `
    uniform float uLife;
    uniform float uTime;
    uniform float uSeed;
    varying float vSide;
    varying float vGap;
    varying float vBright;

    float arcHash(float n) {
        return fract(sin(n * 127.1) * 43758.5453123);
    }

    void main() {
        float across = abs(vSide);
        // A white filament inside a blue one, which is the whole colour story
        // of a small air discharge.
        float core = 1.0 - smoothstep(0.0, 0.36, across);
        float halo = 1.0 - smoothstep(0.0, 1.0, across);
        halo *= halo;

        // Charge, actually going somewhere.
        //
        // The difference between a lamp and a current is that a current has a
        // direction: two packets run the gap at different speeds and in
        // opposite directions, so something is always crossing it for as long
        // as it is lit. Under them the channel sizzles per cell and per frame,
        // because a conducting gap is not a smooth object and smoothing it is
        // what made this read as a drawn stroke.
        float packet =
            pow(max(0.0, sin((vGap * 3.0 - uTime * 6.0) * 3.14159265)), 12.0) +
            pow(max(0.0, sin((vGap * 5.0 + uTime * 9.0) * 3.14159265)), 16.0) * 0.7;
        float sizzle = 0.72 + 0.28 * arcHash(floor(vGap * 44.0) + floor(uTime * 70.0) + uSeed);

        // Bright along its whole length rather than fattest in the middle: the
        // ends are where it meets the metal and they are not the dim part.
        float body = 0.55 + 0.45 * sin(vGap * 3.14159265);
        float energy = uLife * vBright * sizzle * (body + packet * 1.6);

        // Well past one, on purpose.
        //
        // This is added light, and added light against a sunlit meadow is a
        // fight it loses at any sane value — an early version was invisible
        // before dusk. Driving the heart past three is what makes it survive a
        // lit sky, and it is also physically the right shape: the channel of an
        // arc genuinely is far brighter than anything around it, which is why
        // it hurts to look at.
        //
        // Blue rather than violet. Violet is the colour of a spark
        // photographed close up, and at the size this actually occupies it
        // muddied into the night sky and vanished into anything warm behind
        // it. Electric blue holds against both, and is what anybody means when
        // they picture current.
        vec3 colour = mix(vec3(0.28, 0.95, 2.8), vec3(1.7, 2.6, 3.3), core);
        // Hotter at the two roots. An arc is anchored in white-hot metal and
        // only the middle of the channel is blue.
        float root = pow(abs(vGap * 2.0 - 1.0), 3.0);
        colour = mix(colour, vec3(2.6, 3.0, 3.4), root * 0.7);
        // A packet passing takes the channel to blue-white where it is.
        colour = mix(colour, vec3(2.2, 3.0, 3.5), min(1.0, packet * core));

        float alpha = (core * 1.5 + halo * 0.85) * energy;
        if (alpha < 0.003) discard;
        gl_FragColor = vec4(colour * alpha, alpha);
        #include <colorspace_fragment>
    }
`;
function Ka() {
  const o = new BufferGeometry(),
    e = ye + 1,
    s = e * Ve,
    t = new Float32Array(s * 2 * 3),
    m = new Float32Array(s * 2),
    l = new Float32Array(s * 2),
    p = new Float32Array(s * 2),
    c = new Uint16Array(ye * Ve * 6);
  for (let h = 0; h < Ve; h += 1)
    for (let i = 0; i < e; i += 1) {
      const f = i / ye,
        y = (h * e + i) * 2;
      if (
        ((m[y] = f),
        (m[y + 1] = f),
        (l[y] = -1),
        (l[y + 1] = 1),
        (p[y] = h),
        (p[y + 1] = h),
        i < ye)
      ) {
        const S = (h * ye + i) * 6;
        ((c[S] = y),
          (c[S + 1] = y + 1),
          (c[S + 2] = y + 2),
          (c[S + 3] = y + 1),
          (c[S + 4] = y + 3),
          (c[S + 5] = y + 2));
      }
    }
  return (
    o.setAttribute("position", new BufferAttribute(t, 3)),
    o.setAttribute("aAlong", new BufferAttribute(m, 1)),
    o.setAttribute("aSide", new BufferAttribute(l, 1)),
    o.setAttribute("aStrand", new BufferAttribute(p, 1)),
    o.setIndex(new BufferAttribute(c, 1)),
    (o.boundingSphere = new Sphere(new Vector3(), 100)),
    o
  );
}
const Za = new PlaneGeometry(1, 1),
  Qa = new Vector3(0, 0, 1),
  eo = `
    uniform float uTime;
    uniform float uSignal;
    uniform float uSeed;
    uniform float uNight;
    uniform float uStorm;
    uniform float uFlash;
    uniform float uFaultRate;
    uniform float uFaultOdds;
    uniform float uGrain;
    uniform float uRollSpeed;
    uniform float uRollAmount;
    varying vec2 vUv;

    ${Je}

    void main() {
        vec2 uv = vUv;
        // These sets have no signal at all, so the fault has nothing to
        // interrupt — it throws the snow sideways instead, which is the other
        // half of what an untuned television does.
        float fault = max(
            crtFault(uTime, uSeed + 0.37, uFaultRate * 2.4 * (1.0 + uStorm * 4.0), uFaultOdds + 0.2),
            uStorm * 0.5
        );
        float slice = floor(uv.y * 30.0);
        uv.x = fract(uv.x + (hash11(slice + floor(uTime * 26.0)) - 0.5) * fault * 0.5);

        float grain = hash21(floor(uv * vec2(96.0, 72.0)) + floor(uTime * 18.0 + uSeed * 40.0));
        // A slow band rolling through, which is what makes it read as a set
        // that is on rather than a noise texture.
        float band = smoothstep(0.42, 0.5, fract(uv.y * 0.6 - uTime * 0.11 + uSeed));
        vec3 picture = vec3(0.32 + grain * 0.5) * (0.5 + band * 0.5);
        picture *= 1.0 + crtRoll(uv, uTime, uSeed, uRollSpeed) * (uRollAmount + 0.14);
        picture *= 1.0 + fault * 0.5;
        picture *= 0.86 + 0.14 * sin(uv.y * 190.0);
        vec2 centred = uv - 0.5;
        float vignette = 1.0 - smoothstep(0.3, 0.7, length(centred * vec2(1.0, 1.18)));
        picture *= mix(0.3, 1.0, vignette);
        picture *= 1.0 + uStorm * 0.5;
        // A smaller share of the night lift than the sets with something to
        // say. These are the quiet ones on the heap and they stay quiet — lit
        // enough to read as switched on after dark, not enough to compete with
        // the idents for an eye crossing the meadow.
        picture *= 1.0 + uNight * 0.85;
        picture += vec3(0.85, 0.88, 1.0) * uFlash * 0.7;
        gl_FragColor = vec4(picture * mix(0.4, 0.72, uSignal), 1.0);
        #include <colorspace_fragment>
    }
`;
function to(o) {
  o.updateWorldMatrix(!0, !1);
  const e = o.geometry;
  e.boundingBox || e.computeBoundingBox();
  const s = e.boundingBox.getCenter(new Vector3());
  o.localToWorld(s);
  const t = e.getAttribute("normal"),
    m = new Vector3(),
    l = new Vector3();
  for (let a = 0; a < t.count; a += 1) (l.fromBufferAttribute(t, a), m.add(l));
  const p = new Matrix3().getNormalMatrix(o.matrixWorld);
  m.applyMatrix3(p).normalize();
  const c = e.getAttribute("uv"),
    h = new Vector2(1 / 0, 1 / 0),
    i = new Vector2(-1 / 0, -1 / 0);
  if (c)
    for (let a = 0; a < c.count; a += 1)
      ((h.x = Math.min(h.x, c.getX(a))),
        (h.y = Math.min(h.y, c.getY(a))),
        (i.x = Math.max(i.x, c.getX(a))),
        (i.y = Math.max(i.y, c.getY(a))));
  else (h.set(0, 0), i.set(1, 1));
  const f = new Vector2(Math.max(1e-4, i.x - h.x), Math.max(1e-4, i.y - h.y)),
    y = e.boundingBox.getSize(new Vector3()),
    S = o.getWorldScale(new Vector3()),
    M = y.multiply(S),
    A = [M.x, M.y, M.z].sort((a, r) => r - a);
  return {
    mesh: o,
    centre: s,
    normal: m,
    width: A[0],
    height: A[1],
    area: A[0] * A[1],
    uvMin: h,
    uvScale: f,
  };
}
const yt = (o) => o.map(to);
function ao(o) {
  const e = o.clone(!0),
    s = [],
    t = new Map(),
    m = [],
    l = [];
  (e.traverse((r) => {
    if (!r.isMesh) return;
    if (((r.castShadow = !0), (r.receiveShadow = !0), pt.test(r.name))) {
      s.push(r);
      return;
    }
    if (gt.test(r.name)) {
      const n = Ia(r.material),
        g =
          r.geometry.boundingBox ??
          (r.geometry.computeBoundingBox(), r.geometry.boundingBox);
      ((n.userData.chargeUniforms.uTipY.value = g.max.y),
        (n.userData.chargeUniforms.uTipSpan.value = Math.max(
          0.001,
          (g.max.y - g.min.y) * 0.16,
        )),
        m.push(n),
        l.push(r),
        (r.material = n));
      return;
    }
    const d = r.material;
    if (!t.has(d)) {
      const n = d.clone();
      ((n.metalness = 0),
        (n.roughness = 0.86),
        (n.envMapIntensity = 0.4),
        n.emissive.set("#20160f"),
        (n.emissiveIntensity = 0.02));
      const g = n.map ? la(n.map, Pa) : null;
      (g
        ? (n.map = g)
        : n.map &&
          ((n.map.anisotropy = 8),
          (n.map.generateMipmaps = !0),
          (n.map.minFilter = _t),
          (n.map.needsUpdate = !0)),
        (n.normalMap = null),
        (n.roughnessMap = null),
        (n.metalnessMap = null),
        t.set(d, n));
    }
    r.material = t.get(d);
  }),
    e.updateMatrixWorld(!0));
  const c = new Box3().setFromObject(e).getSize(new Vector3());
  (e.scale.multiplyScalar(c.y > 0 ? xe / c.y : 1), e.updateMatrixWorld(!0));
  const h = new Box3().setFromObject(e),
    i = h.getCenter(new Vector3());
  (e.position.set(-i.x, -h.min.y, -i.z), e.updateMatrixWorld(!0));
  const f = new Vector3();
  (yt(s).forEach((r) => {
    f.addScaledVector(r.normal, r.area);
  }),
    f.lengthSq() > 1e-6 &&
      ((e.rotation.y = -Math.atan2(f.x, f.z)), e.updateMatrixWorld(!0)));
  const y = yt(s),
    S = new Box3().setFromObject(e).getSize(new Vector3()),
    M = l.length ? Oa(l[0]) : null,
    A = M ? [...M, M[0].clone().lerp(M[1], 0.5)] : [];
  return {
    model: e,
    perchSearch: {
      skip: (r) => pt.test(r.name) || gt.test(r.name),
      avoid: A,
    },
    screens: y,
    materials: [...t.values(), ...m],
    antennaMaterials: m,
    antennaTips: M,
    footprint: S,
  };
}
function ho({ terrainScale: o, terrainAmplitude: e }) {
  const { scene: s } = zt(Pt),
    t = React.useMemo(() => ao(s), [s]),
    m = React.useMemo(() => {
      const { x: u, z: b } = De;
      return {
        x: u,
        z: b,
        y: Xe(u, b, o, e),
      };
    }, [e, o]),
    l = React.useMemo(
      () =>
        t.screens.map((u) => {
          const b = u.mesh.name,
            z = ua[Ga[b]] ?? null;
          return {
            screen: u,
            listing: b === Ot,
            bars: !z,
            project: z,
            identIndex: z ? Ce.indexOf(z) : -1,
          };
        }),
      [t],
    ),
    p = React.useMemo(() => Wa(), []),
    c = React.useMemo(() => Ce.map((u) => Jt[u.section]), []),
    h = Gt(pa, c),
    i = useThree((u) => u.gl);
  React.useEffect(() => {
    const u = i.capabilities.getMaxAnisotropy();
    return (
      h.forEach((b) => {
        ((b.colorSpace = Pe),
          (b.minFilter = _t),
          (b.magFilter = be),
          (b.generateMipmaps = !0),
          (b.anisotropy = u),
          (b.needsUpdate = !0));
      }),
      ga(i, h)
    );
  }, [i, h]);
  const f = React.useMemo(
    () =>
      l.map(
        ({ screen: u, project: b, listing: z, bars: V, identIndex: T }, U) => {
          const D = ((U * 37) % 19) / 19,
            F = Ba(U),
            $ = {
              uUvMin: {
                value: u.uvMin.clone(),
              },
              uUvScale: {
                value: u.uvScale.clone(),
              },
              uTime: {
                value: 0,
              },
              uSignal: {
                value: 0,
              },
              uSeed: {
                value: D,
              },
              uStorm: {
                value: 0,
              },
              uNight: {
                value: 0,
              },
              uFlash: {
                value: 0,
              },
              uFaultRate: {
                value: F.faultRate,
              },
              uFaultOdds: {
                value: F.faultOdds,
              },
              uGrain: {
                value: F.grain,
              },
              uRollSpeed: {
                value: F.rollSpeed,
              },
              uRollAmount: {
                value: F.rollAmount,
              },
            };
          if (V)
            return new ShaderMaterial({
              uniforms: $,
              vertexShader: je,
              fragmentShader: Ha,
              toneMapped: !1,
            });
          if (!b)
            return new ShaderMaterial({
              uniforms: $,
              vertexShader: je,
              fragmentShader: eo,
              toneMapped: !1,
            });
          const q = z ? oe[3] : oe[T % oe.length],
            Z = h[Ce.indexOf(b)] ?? null,
            ue = z ? 0 : Z ? wt[T % wt.length] : 1 + (T % (Na - 1));
          return new ShaderMaterial({
            uniforms: {
              ...$,
              uCard: {
                value: Z ?? p,
              },
              uPhoto: {
                value: Z ? 1 : 0,
              },
              uOn: {
                value: 1,
              },
              uCrop: {
                value: Z ? new Vector2(0.75, 0.125) : new Vector2(1, 0),
              },
              uAccent: {
                value: new Color(...q.tint),
              },
              uTint: {
                value: new Vector3(...q.tint),
              },
              uStyle: {
                value: ue,
              },
              uTune: {
                value: 0,
              },
            },
            vertexShader: je,
            fragmentShader: Da,
            toneMapped: !1,
          });
        },
      ),
    [l, p, h],
  );
  React.useEffect(() => {
    l.forEach(({ screen: u }, b) => {
      u.mesh.material = f[b];
    });
  }, [l, f]);
  const y = React.useRef(new Float32Array(l.length).fill(-1 / 0)),
    S = React.useRef([]);
  React.useEffect(() => {
    if ($t) return;
    const u = [];
    return (
      l.forEach(({ project: b }, z) => {
        const V = b && Kt[b.section];
        if (!V) return;
        const T = document.createElement("video");
        ((T.muted = !0),
          (T.loop = !0),
          (T.playsInline = !0),
          T.setAttribute("playsinline", ""),
          T.setAttribute("muted", ""),
          (T.preload = "none"),
          (T.src = V),
          T.setAttribute("aria-hidden", "true"),
          (T.tabIndex = -1),
          (T.style.cssText =
            "position:fixed;left:0;bottom:0;width:2px;height:2px;opacity:0.01;pointer-events:none;"),
          document.body.appendChild(T));
        const U = new VideoTexture(T);
        ((U.colorSpace = Pe),
          (U.minFilter = be),
          (U.magFilter = be),
          (U.generateMipmaps = !1));
        const D = () => {
          f[z].uniforms.uCard.value = U;
        };
        (T.addEventListener("playing", D),
          u.push({
            video: T,
            texture: U,
            onPlaying: D,
            index: z,
          }));
      }),
      (S.current = u.map((b) => b.video)),
      () => {
        ((S.current = []),
          u.forEach(({ video: b, texture: z, onPlaying: V, index: T }) => {
            var D;
            (b.removeEventListener("playing", V),
              b.pause(),
              b.removeAttribute("src"),
              b.load(),
              b.remove(),
              z.dispose());
            const U = f[T];
            (D = U == null ? void 0 : U.uniforms) != null &&
              D.uCard &&
              (U.uniforms.uCard.value = h[Ce.indexOf(l[T].project)] ?? p);
          }));
      }
    );
  }, [l, p, f, h]);
  const M = React.useMemo(
      () =>
        l.map(
          ({ screen: u, project: b, listing: z, bars: V, identIndex: T }) => {
            if (!b && !z && !V) return null;
            const U = new Quaternion().setFromUnitVectors(Qa, u.normal),
              D = u.centre.clone().addScaledVector(u.normal, 0.035),
              F = z
                ? oe[3]
                : b
                  ? oe[T % oe.length]
                  : {
                      tint: [0.81, 0.89, 1],
                    },
              $ = new Color(...F.tint);
            return {
              position: D,
              quaternion: U,
              scale: [u.width * 2.2, u.height * 1.9, 1],
              normal: u.normal.clone(),
              material: new ShaderMaterial({
                uniforms: {
                  uColor: {
                    value: $,
                  },
                  uGlow: {
                    value: 0,
                  },
                },
                vertexShader: Ya,
                fragmentShader: qa,
                transparent: !0,
                depthWrite: !1,
                blending: Fe,
                toneMapped: !1,
              }),
            };
          },
        ),
      [l],
    ),
    A = React.useRef(),
    a = React.useMemo(() => new Vector3(), []),
    r = React.useRef({
      next: 1.2,
      until: 0,
      seed: 0,
      flicker: 0,
    }),
    d = React.useMemo(() => Ka(), []),
    n = React.useMemo(
      () =>
        new ShaderMaterial({
          uniforms: {
            uFrom: {
              value: new Vector3(),
            },
            uTo: {
              value: new Vector3(),
            },
            uCameraLocal: {
              value: new Vector3(),
            },
            uTime: {
              value: 0,
            },
            uSeed: {
              value: 0,
            },
            uJag: {
              value: 0.06,
            },
            uThickness: {
              value: 0.012,
            },
            uLife: {
              value: 0,
            },
          },
          vertexShader: Ja,
          fragmentShader: $a,
          transparent: !0,
          depthWrite: !1,
          side: qe,
          blending: Fe,
          toneMapped: !1,
        }),
      [],
    );
  (React.useEffect(() => {
    const u = t.antennaTips;
    if (!u) return;
    (n.uniforms.uFrom.value.copy(u[0]), n.uniforms.uTo.value.copy(u[1]));
    const b = u[0].distanceTo(u[1]);
    ((n.uniforms.uJag.value = b * 0.22),
      (n.uniforms.uThickness.value = Math.max(0.007, b * 0.055)));
  }, [n, t]),
    React.useEffect(
      () => () => {
        (ca(),
          M.forEach((u) => (u == null ? void 0 : u.material.dispose())),
          p.dispose(),
          d.dispose(),
          n.dispose(),
          f.forEach((u) => u.dispose()),
          t.materials.forEach((u) => u.dispose()));
      },
      [d, n, M, p, f, t],
    ));
  const g = React.useRef(),
    [R, B] = React.useState([]);
  React.useEffect(() => {
    const u = t.model.clone(!0);
    return (
      u.updateMatrixWorld(!0),
      Ft(Ea(u, t.perchSearch), (b) => {
        B(b.filter((z) => z.y > xe * 0.5));
      })
    );
  }, [t]);
  const E = React.useMemo(
    () =>
      R.map((u, b) => ({
        point: u,
        perch: Zt(`screens:${b}`, "screens"),
      })),
    [R],
  );
  React.useEffect(() => () => Qt("screens"), [E]);
  const N = React.useRef([]),
    O = React.useRef(),
    I = React.useRef(),
    _ = React.useRef(0),
    P = React.useRef(!0),
    C = React.useRef(new Float32Array(l.length)),
    G = React.useRef({
      section: null,
      elapsed: 0,
    }),
    Q = React.useMemo(() => new Vector3(), []),
    ie = React.useMemo(() => new Color(), []),
    re = React.useMemo(() => new Vector3(), []),
    le = React.useMemo(() => new Vector3(), []),
    ee = Be((u) => u.openingProject),
    ce = Be((u) => u.finishProjectReveal);
  (React.useEffect(() => {
    const u = ee === rt.work ? ee : null;
    ((G.current = {
      section: u,
      elapsed: 0,
    }),
      u && mt === 0 && ce(u));
  }, [ce, ee]),
    useEffect((u, b) => {
      var ke, Qe, et;
      const z = Et.getState(),
        V = Math.min(b, 0.05),
        T = u.clock.elapsedTime,
        U = ea(m.x, m.z, ta(z), Math.max(t.footprint.x, t.footprint.z) * 0.25),
        D = 1 - j.smoothstep(U, st, aa);
      _.current = ne ? D : j.damp(_.current, D, 6.5, V);
      const F = j.smoothstep(_.current, 0.04, 0.9),
        $ = F > 0.008 && !document.hidden;
      for (const x of S.current)
        $ && x.paused ? x.play().catch(() => {}) : !$ && !x.paused && x.pause();
      const q = g.current;
      q &&
        ((q.visible = F > 0.008),
        (q.position.y = j.lerp(-1.4, 0, F)),
        q.scale.setScalar(Math.max(0.001, F)));
      const Z = !!q && F > 0.985 && U < st;
      for (let x = 0; x < E.length; x += 1) {
        const { point: L, perch: W } = E[x];
        ((W.present = Z),
          Z &&
            (q.localToWorld(W.position.copy(L)),
            (W.yaw = J),
            (W.turn = Math.PI),
            (W.height = L.y)));
      }
      const ue = F > 0.62;
      P.current !== ue &&
        ((P.current = ue),
        (Qe = (ke = O.current) == null ? void 0 : ke.setEnabled) == null ||
          Qe.call(ke, ue));
      const $e = z.ballPosition;
      let Te = -1,
        Ie = 1 / 0;
      if (F > 0.6)
        for (let x = 0; x < l.length; x += 1) {
          const { screen: L, listing: W } = l[x];
          if (!W) continue;
          (Q.set($e.x - m.x, 0, $e.z - m.z),
            Q.applyAxisAngle(Object3D.DEFAULT_UP, -J));
          const H = Q.sub(L.centre).setY(0),
            fe = H.length();
          fe > za ||
            fe > Ie ||
            H.normalize().dot(L.normal) < Fa ||
            ((Te = x), (Ie = fe));
        }
      ((lt.section = Te >= 0 ? rt.work : null),
        (lt.distance = Te >= 0 ? Ie : 1 / 0));
      const he = G.current;
      let Ke = 0;
      if (he.section) {
        he.elapsed += V;
        const x = j.clamp(he.elapsed / mt, 0, 1);
        if (((Ke = Math.sin(x * Math.PI)), x >= 1)) {
          const L = he.section;
          ((he.section = null), Be.getState().openingProject === L && ce(L));
        }
      }
      const de = j.clamp(it.rainAmount ?? 0, 0, 1),
        Ze = j.clamp(it.lightningFlash ?? 0, 0, 1),
        K = j.smoothstep(z.nightAmount ?? 0, 0.12, 0.78),
        Y = r.current;
      let Me = 0;
      if (
        F > 0.5 &&
        (T > Y.until &&
          T > Y.next &&
          ((Y.seed = Math.random()),
          (Y.until = T + 0.16 + Math.random() * 0.3),
          (Y.next = Y.until + (0.7 + Math.random() * 2.4) * (1 - de * 0.6))),
        T < Y.until)
      ) {
        const x = (Y.until - T) / 0.4;
        ((Y.flicker = 0.6 + 0.4 * Math.abs(Math.sin(T * 71))),
          (Me = Math.min(1, x) * Y.flicker));
      }
      const Ue = A.current;
      Ue &&
        t.antennaTips &&
        ((Ue.visible = Me > 0.01),
        (n.uniforms.uLife.value = Me * (1 + K * 0.25)),
        (n.uniforms.uTime.value = T),
        (n.uniforms.uSeed.value = Y.seed),
        a.copy(u.camera.position),
        Ue.worldToLocal(a),
        n.uniforms.uCameraLocal.value.copy(a));
      for (let x = 0; x < t.antennaMaterials.length; x += 1) {
        const L = t.antennaMaterials[x].userData.chargeUniforms;
        ((L.uTime.value = T),
          (L.uCharge.value = F * (0.5 + K * 0.9 + de * 0.6)),
          (L.uArc.value = Me));
      }
      let Le = 0,
        Ne = null;
      for (let x = 0; x < l.length; x += 1) {
        const { project: L, listing: W } = l[x],
          H = f[x],
          fe = x === Te ? 1 : 0,
          Lt = F * (L || W ? 0.38 : 0.22),
          tt = Math.min(1, Lt + fe * 0.62);
        if (
          ((C.current[x] = ne ? tt : j.damp(C.current[x], tt, 5.5, V)),
          (H.uniforms.uTime.value = T),
          H.uniforms.uOn)
        ) {
          const X = y.current;
          F > 0.12
            ? (X[x] === -1 / 0 && (X[x] = -x * 0.11), (X[x] += V))
            : F < 0.02 && (X[x] = -1 / 0);
          const Nt = Math.max(0, Math.min(1, X[x] / 0.62));
          H.uniforms.uOn.value = X[x] < 0 ? 0 : 1 - Math.pow(1 - Nt, 3);
        }
        ((H.uniforms.uSignal.value = C.current[x]),
          (H.uniforms.uNight.value = K),
          (H.uniforms.uStorm.value = de),
          (H.uniforms.uFlash.value = Ze));
        const at = M[x],
          Ge = N.current[x];
        if (at && Ge) {
          (Ge.getWorldDirection(re),
            le
              .copy(u.camera.position)
              .sub(Ge.getWorldPosition(le.clone()))
              .normalize());
          const X = Math.max(0, re.dot(le));
          at.material.uniforms.uGlow.value =
            C.current[x] *
            F *
            (0.14 + K * 1.55 * (1 - C.current[x] * 0.6)) *
            (1 - de * 0.45) *
            (0.9 + Ze * 0.6) *
            (X * X);
        }
        (H.uniforms.uTune && (H.uniforms.uTune.value = W ? Ke : 0),
          (L || W) &&
            C.current[x] > Le &&
            ((Le = C.current[x]),
            (Ne =
              ((et = M[x]) == null
                ? void 0
                : et.material.uniforms.uColor.value) ?? null)));
      }
      const Ae = I.current;
      if (Ae) {
        const x = ne ? 0 : 1 + K * 0.5,
          L = ne
            ? 1
            : 0.86 +
              (Math.sin(T * 11.7) * 0.06 +
                Math.sin(T * 4.3) * 0.045 +
                Math.sin(T * 23.1) * 0.015) *
                x,
          W = 0.62 + Le * 0.38;
        ((Ae.intensity = W * F * (0.18 + K * 2.9) * L * (1 - de * 0.35)),
          (Ae.distance = 8 + K * 8),
          Ne && (ie.copy(Ne).lerp(Va, K * 0.75), Ae.color.copy(ie)));
      }
    }));
  const Se = t.footprint;
  return jsxRuntime.jsxs(oa, {
    type: "fixed",
    colliders: !1,
    position: [m.x, m.y, m.z],
    rotation: [0, J, 0],
    children: [
      jsxRuntime.jsx(na, {
        ref: O,
        args: [Se.x * 0.42, xe * 0.5, Se.z * 0.42],
        position: [0, xe * 0.5, 0],
      }),
      jsxRuntime.jsxs("group", {
        ref: g,
        visible: !1,
        dispose: null,
        children: [
          jsxRuntime.jsx(sa, {
            blobs: [
              {
                x: 0,
                z: 0,
                radius: Math.max(Se.x, Se.z) * 0.52,
                strength: 0.68,
              },
            ],
          }),
          jsxRuntime.jsx("primitive", {
            object: t.model,
            dispose: null,
          }),
          jsxRuntime.jsx(wa, {
            anchor: m,
            terrainScale: o,
            terrainAmplitude: e,
          }),
          jsxRuntime.jsx(ia, {
            children: jsxRuntime.jsx(Ca, {
              model: t.model,
              footprint: t.footprint,
              anchor: m,
              terrainScale: o,
              terrainAmplitude: e,
              lightRef: I,
            }),
          }),
          t.antennaTips &&
            jsxRuntime.jsx("mesh", {
              ref: A,
              geometry: d,
              material: n,
              frustumCulled: !1,
              visible: !1,
              renderOrder: 6,
              dispose: null,
            }),
          M.map(
            (u, b) =>
              u &&
              jsxRuntime.jsx(
                "mesh",
                {
                  ref: (z) => {
                    N.current[b] = z;
                  },
                  geometry: Za,
                  material: u.material,
                  position: u.position,
                  quaternion: u.quaternion,
                  scale: u.scale,
                  renderOrder: 5,
                  dispose: null,
                },
                b,
              ),
          ),
          jsxRuntime.jsx(ra, {
            ref: I,
            intensity: 0,
            distance: 6.5,
            decay: 2,
            position: [0, xe * 0.55, 0.95],
          }),
        ],
      }),
    ],
  });
}
zt.preload(Pt);
export { ho as default };
