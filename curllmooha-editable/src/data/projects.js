/**
 * 作品数据 —— 由线上 bundle（projects-jUOwRfMr.js）反编译整理
 * 作品条目、封面/视频路径、页面链接等元数据。
 * 说明：变量/函数名仍是压缩后的短名；三方库请从 ../vendor/*.js 引入。
 */
(function () {
  const a = document.createElement("link").relList;
  if (a && a.supports && a.supports("modulepreload")) return;
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) l(t);
  new MutationObserver((t) => {
    for (const o of t)
      if (o.type === "childList")
        for (const s of o.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && l(s);
  }).observe(document, {
    childList: !0,
    subtree: !0,
  });
  function h(t) {
    const o = {};
    return (
      t.integrity && (o.integrity = t.integrity),
      t.referrerPolicy && (o.referrerPolicy = t.referrerPolicy),
      t.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : t.crossOrigin === "anonymous"
          ? (o.credentials = "omit")
          : (o.credentials = "same-origin"),
      o
    );
  }
  function l(t) {
    if (t.ep) return;
    t.ep = !0;
    const o = h(t);
    fetch(t.href, o);
  }
})();
const c = (r, a) => Math.atan2(a.x - r.x, a.z - r.z),
  p = Object.freeze({
    x: 0,
    z: 0,
  }),
  u = Object.freeze({
    x: -2.45,
    z: -4.35,
  }),
  g = Object.freeze({
    x: -7.25,
    z: -5.5,
    scale: 1.05,
    color: "#f3db72",
  }),
  m = Object.freeze({
    x: 2,
    z: -24,
  }),
  y = Object.freeze({
    x: -24,
    z: 6,
  }),
  f = Object.freeze({
    x: 22,
    z: -4,
  }),
  O = Object.freeze({
    x: -8.5,
    y: 6.1,
    z: 10.5,
  }),
  w = Object.freeze({
    x: 1.6,
    z: -3.1,
    facing: -1.1,
  }),
  j = Object.freeze({
    x: -2.6,
    z: -2.3,
  }),
  v = Object.freeze({
    x: -9.5,
    z: -6.5,
  }),
  T = Object.freeze({
    x: -10.55,
    y: 3.2,
    z: -6,
  }),
  E = Object.freeze({
    x: -9.05,
    y: 2.78,
    z: -5.15,
  }),
  z = Object.freeze({
    x: -0.3,
    y: 1.04,
    z: -0.72,
  }),
  S = Object.freeze({
    x: -0.05,
    y: 1.18,
    z: -0.45,
  }),
  _ = -2.8,
  x = 1.22,
  k = -0.12,
  P = 1.15,
  A = c(f, p) + 0.1,
  d = Object.freeze({
    x: 2,
    z: 22,
  }),
  b = c(d, p),
  i = Object.freeze({
    ...d,
    rotation: b,
  }),
  e = Object.freeze({
    "project-brickblaster": i,
    "project-hologram": i,
    "project-paper-boat": i,
    "project-golden-hour": i,
    "project-cosmic-bloom": i,
    "project-aera": i,
    "project-polify": i,
  }),
  n = [
    {
      section: "project-brickblaster",
      number: "03",
      title: "brickblaster",
      year: 2026,
      kind: "personal",
      url: "https://lego-battle.vercel.app/",
      host: "lego-battle.vercel.app",
      type: "interactive 3d game",
      role: "gameplay, art direction & creative development",
      description:
        "a playable brick-built aerial combat world: fly, aim and defend the last brick sector in a compact browser mission.",
      story:
        "the aircraft, the battlefield and the mission screens all use the same brick look. the flying is arcade on purpose, and rapier does the physics, so the battlefield comes apart brick by brick when you hit it.",
      highlights: [
        "arcade flight controls",
        "destructible brick battlefield",
        "cinematic mission ui",
      ],
      tools: ["three.js", "react three fiber", "rapier"],
      position: [e["project-brickblaster"].x, e["project-brickblaster"].z],
      rotation: e["project-brickblaster"].rotation,
      palette: ["#e5312f", "#f4d947", "#2e68c6"],
    },
    {
      section: "project-hologram",
      number: "04",
      title: "hologram shader",
      year: 2025,
      kind: "personal",
      url: "https://holo-mocha.vercel.app/",
      host: "holo-mocha.vercel.app",
      type: "real-time shader experiment",
      role: "shader design & creative development",
      description:
        "a neon hologram laboratory where spacecraft flicker through scan lines, distortion and a reactive digital grid.",
      story:
        "scan lines, interference and a luminous grid give the spacecraft its projected, unstable feel. i left the shader controls open, so you can pull each effect apart and see exactly what it does to the material.",
      highlights: [
        "procedural hologram material",
        "animated scanline interference",
        "interactive shader controls",
      ],
      tools: ["three.js", "glsl", "leva"],
      position: [e["project-hologram"].x, e["project-hologram"].z],
      rotation: e["project-hologram"].rotation,
      palette: ["#178dff", "#35f4ff", "#6a58ff"],
    },
    {
      section: "project-paper-boat",
      number: "05",
      title: "the paper boat",
      year: 2025,
      kind: "personal",
      url: "https://waterboat.vercel.app/",
      host: "waterboat.vercel.app",
      type: "cinematic webgl scene",
      role: "environment, water & creative development",
      description:
        "a quiet boat voyage across reflective water, composed as a small real-time cinematic at sunset.",
      story:
        "i kept it to one boat, an ocean surface with reflections and a slow camera. the sunset light and post-processing do most of the work on the mood.",
      highlights: [
        "real-time ocean surface",
        "cinematic lighting & camera",
        "reflections and atmosphere",
      ],
      tools: ["three.js", "glsl", "postprocessing"],
      position: [e["project-paper-boat"].x, e["project-paper-boat"].z],
      rotation: e["project-paper-boat"].rotation,
      palette: ["#b65a32", "#f1b566", "#8ba8ae"],
    },
    {
      section: "project-golden-hour",
      number: "06",
      title: "golden hour",
      year: 2025,
      kind: "personal",
      url: "https://golden-hour-one.vercel.app/",
      host: "golden-hour-one.vercel.app",
      type: "cinematic environment study",
      role: "environment art & creative development",
      description:
        "a windswept tree on a small island in luminous water, with a swan and her cygnets drifting past — built around the colour, reflection and stillness of golden hour.",
      story:
        "the tree is procedural, and everything else is arranged around it: drifting leaves, reflected light, and a swan with her cygnets passing through. i wanted to see how far colour and atmosphere alone could carry a scene this simple.",
      highlights: [
        "sculptural procedural tree",
        "sunset light study",
        "reflections, drifting leaves and swans",
      ],
      tools: ["three.js", "glsl", "react three fiber"],
      position: [e["project-golden-hour"].x, e["project-golden-hour"].z],
      rotation: e["project-golden-hour"].rotation,
      palette: ["#cf5b3b", "#f0b047", "#5d735e"],
    },
    {
      section: "project-cosmic-bloom",
      number: "07",
      title: "cosmic bloom",
      year: 2025,
      kind: "personal",
      url: "https://blob-mixer-zeta.vercel.app/",
      host: "blob-mixer-zeta.vercel.app",
      type: "interactive generative shader",
      role: "shader design & creative development",
      description:
        "a morphing colour field shaped like a living bloom, mixing iridescent bands across a soft organic surface.",
      story:
        "noise pushes the surface around in real time, and the iridescent bands are mixed across it as it moves, so the shape and the colour never drift apart.",
      highlights: [
        "noise-driven deformation",
        "iridescent colour mixing",
        "real-time organic motion",
      ],
      tools: ["three.js", "glsl", "creative coding"],
      position: [e["project-cosmic-bloom"].x, e["project-cosmic-bloom"].z],
      rotation: e["project-cosmic-bloom"].rotation,
      palette: ["#7d37df", "#20c7d7", "#e23b90"],
    },
    {
      section: "project-aera",
      number: "02",
      title: "aera",
      year: 2026,
      kind: "personal",
      url: "https://aerawe.vercel.app/",
      host: "aerawe.vercel.app",
      type: "3d product site",
      role: "concept, 3d & creative development",
      description:
        "a concept product site for a water brand, set entirely underwater: two glass bottles drift among fish and bubbles as the page scrolls deeper.",
      problem:
        "how do you make a water brand feel like water on a flat web page? i wanted the scrolling itself to feel like going under.",
      story:
        "scrolling is the descent: the page sinks you through the water, past fish and bubbles, to two glass bottles, with an underwater soundscape under all of it. a concept of my own, not a commissioned site.",
      highlights: [
        "scroll-driven descent",
        "glass and bubble materials",
        "underwater soundscape",
      ],
      tools: ["three.js", "react three fiber", "gsap"],
      position: [e["project-aera"].x, e["project-aera"].z],
      rotation: e["project-aera"].rotation,
      palette: ["#2f7fa6", "#8fd3e8", "#f2f7fa"],
    },
    {
      section: "project-polify",
      number: "01",
      title: "polify",
      year: 2026,
      kind: "client",
      url: "https://www.polify.xyz/",
      host: "polify.xyz",
      type: "studio website · freelance",
      role: "sole developer — from a static figma to production: every animation, effect and micro-interaction",
      description:
        "the site of a web3 creative studio: a tilted wall of client work you can filter, with the studio’s cases, story and jobs sliding in as panels beside it.",
      problem:
        "the studio wanted its portfolio to feel immersive and interactive, with their whole archive on one wall you can drag around. that’s around a hundred images and looping videos, and drawn the usual way, it stutters the moment you start dragging.",
      story:
        "working from the studio’s static figma, i built every animation, effect and micro-interaction. the work wall is the heart of it: around a hundred stills and looping videos in one draggable three.js grid, packed into gpu texture atlases so it draws in a handful of calls and stays smooth while you drag.",
      highlights: [
        "tilted, filterable work wall",
        "sliding side panels",
        "hover and press micro-interactions",
      ],
      tools: ["three.js", "vanilla javascript", "lenis"],
      position: [e["project-polify"].x, e["project-polify"].z],
      rotation: e["project-polify"].rotation,
      palette: ["#2b6cf6", "#f2c33c", "#111114"],
    },
  ],
  R = Object.freeze({
    "project-brickblaster":
      "a brick-built fighter banking over a blocky island at night, engines glowing",
    "project-hologram":
      "a blue wireframe hologram of a spacecraft hovering above a hexagonal grid",
    "project-paper-boat": "a small wooden sailboat on glassy water at sunset",
    "project-golden-hour":
      "a twisted tree with pink leaves on a small island in still water at sunset, a swan and cygnets beside it",
    "project-cosmic-bloom":
      "a soft iridescent blob floating over a deep blue ground behind the title",
    "project-aera":
      "two glass water bottles drifting underwater among fish and bubbles",
    "project-polify":
      "the polify studio site: a tilted wall of client work beside an open list of cases",
  }),
  I = Object.freeze([...n].sort((r, a) => r.number.localeCompare(a.number))),
  N = n.map((r) => r.section),
  C = Object.fromEntries(n.map((r) => [r.section, r]));
export {
  m as A,
  g as C,
  w as F,
  p as H,
  N as P,
  d as S,
  O as T,
  I as W,
  y as a,
  f as b,
  n as c,
  v as d,
  j as e,
  T as f,
  E as g,
  z as h,
  S as i,
  u as j,
  x as k,
  k as l,
  P as m,
  A as n,
  _ as o,
  C as p,
  R as q,
  b as r,
};
