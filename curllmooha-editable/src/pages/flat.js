/**
 * 平面页面脚本 —— 由线上 bundle（flat-D6JHTwaK.js）反编译整理
 * /hire/ 与 /work/ 等项目页共用的按钮磁吸、进场动画。
 * 说明：变量/函数名仍是压缩后的短名；三方库请从 ../vendor/*.js 引入。
 */
var X = Object.defineProperty;
var Y = (t, e, i) =>
  e in t
    ? X(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: i,
      })
    : (t[e] = i);
var r = (t, e, i) => Y(t, typeof e != "symbol" ? e + "" : e, i);
import q from "../lib/clarity.js";
import { gsap } from "../vendor/gsap.js";
var N = "1.3.26";
function W(t, e, i) {
  return Math.max(t, Math.min(e, i));
}
function C(t, e, i) {
  return (1 - i) * t + i * e;
}
function B(t, e, i, s) {
  return C(t, e, 1 - Math.exp(-i * s));
}
function F(t, e) {
  return ((t % e) + e) % e;
}
var V = class {
  constructor() {
    r(this, "isRunning", !1);
    r(this, "value", 0);
    r(this, "from", 0);
    r(this, "to", 0);
    r(this, "currentTime", 0);
    r(this, "lerp");
    r(this, "duration");
    r(this, "easing");
    r(this, "onUpdate");
  }
  advance(t) {
    var i;
    if (!this.isRunning) return;
    let e = !1;
    if (this.duration && this.easing) {
      this.currentTime += t;
      const s = W(0, this.currentTime / this.duration, 1);
      e = s >= 1;
      const o = e ? 1 : this.easing(s);
      this.value = this.from + (this.to - this.from) * o;
    } else
      this.lerp
        ? ((this.value = B(this.value, this.to, this.lerp * 60, t)),
          Math.round(this.value) === Math.round(this.to) &&
            ((this.value = this.to), (e = !0)))
        : ((this.value = this.to), (e = !0));
    (e && this.stop(),
      (i = this.onUpdate) == null || i.call(this, this.value, e));
  }
  stop() {
    this.isRunning = !1;
  }
  fromTo(t, e, { lerp: i, duration: s, easing: o, onStart: c, onUpdate: p }) {
    ((this.from = this.value = t),
      (this.to = e),
      (this.lerp = i),
      (this.duration = s),
      (this.easing = o),
      (this.currentTime = 0),
      (this.isRunning = !0),
      c == null || c(),
      (this.onUpdate = p));
  }
};
function U(t, e) {
  let i;
  return function (...s) {
    (clearTimeout(i),
      (i = setTimeout(() => {
        ((i = void 0), t.apply(this, s));
      }, e)));
  };
}
var $ = class {
    constructor(t, e, { autoResize: i = !0, debounce: s = 250 } = {}) {
      r(this, "width", 0);
      r(this, "height", 0);
      r(this, "scrollHeight", 0);
      r(this, "scrollWidth", 0);
      r(this, "debouncedResize");
      r(this, "wrapperResizeObserver");
      r(this, "contentResizeObserver");
      r(this, "resize", () => {
        (this.onWrapperResize(), this.onContentResize());
      });
      r(this, "onWrapperResize", () => {
        this.wrapper instanceof Window
          ? ((this.width = window.innerWidth),
            (this.height = window.innerHeight))
          : ((this.width = this.wrapper.clientWidth),
            (this.height = this.wrapper.clientHeight));
      });
      r(this, "onContentResize", () => {
        this.wrapper instanceof Window
          ? ((this.scrollHeight = this.content.scrollHeight),
            (this.scrollWidth = this.content.scrollWidth))
          : ((this.scrollHeight = this.wrapper.scrollHeight),
            (this.scrollWidth = this.wrapper.scrollWidth));
      });
      ((this.wrapper = t),
        (this.content = e),
        i &&
          ((this.debouncedResize = U(this.resize, s)),
          this.wrapper instanceof Window
            ? window.addEventListener("resize", this.debouncedResize)
            : ((this.wrapperResizeObserver = new ResizeObserver(
                this.debouncedResize,
              )),
              this.wrapperResizeObserver.observe(this.wrapper)),
          (this.contentResizeObserver = new ResizeObserver(
            this.debouncedResize,
          )),
          this.contentResizeObserver.observe(this.content)),
        this.resize());
    }
    destroy() {
      var t, e;
      ((t = this.wrapperResizeObserver) == null || t.disconnect(),
        (e = this.contentResizeObserver) == null || e.disconnect(),
        this.wrapper === window &&
          this.debouncedResize &&
          window.removeEventListener("resize", this.debouncedResize));
    }
    get limit() {
      return {
        x: this.scrollWidth - this.width,
        y: this.scrollHeight - this.height,
      };
    }
  },
  k = class {
    constructor() {
      r(this, "events", {});
    }
    emit(t, ...e) {
      var s;
      const i = this.events[t] || [];
      for (let o = 0, c = i.length; o < c; o++)
        (s = i[o]) == null || s.call(i, ...e);
    }
    on(t, e) {
      return (
        this.events[t] ? this.events[t].push(e) : (this.events[t] = [e]),
        () => {
          var i;
          this.events[t] =
            (i = this.events[t]) == null ? void 0 : i.filter((s) => e !== s);
        }
      );
    }
    off(t, e) {
      var i;
      this.events[t] =
        (i = this.events[t]) == null ? void 0 : i.filter((s) => e !== s);
    }
    destroy() {
      this.events = {};
    }
  };
const j = 100 / 6,
  b = {
    passive: !1,
  };
function M(t, e) {
  return t === 1 ? j : t === 2 ? e : 1;
}
var G = class {
  constructor(
    t,
    e = {
      wheelMultiplier: 1,
      touchMultiplier: 1,
    },
  ) {
    r(this, "touchStart", {
      x: 0,
      y: 0,
    });
    r(this, "lastDelta", {
      x: 0,
      y: 0,
    });
    r(this, "window", {
      width: 0,
      height: 0,
    });
    r(this, "emitter", new k());
    r(this, "onTouchStart", (t) => {
      const { clientX: e, clientY: i } = t.targetTouches
        ? t.targetTouches[0]
        : t;
      ((this.touchStart.x = e),
        (this.touchStart.y = i),
        (this.lastDelta = {
          x: 0,
          y: 0,
        }),
        this.emitter.emit("scroll", {
          deltaX: 0,
          deltaY: 0,
          event: t,
        }));
    });
    r(this, "onTouchMove", (t) => {
      const { clientX: e, clientY: i } = t.targetTouches
          ? t.targetTouches[0]
          : t,
        s = -(e - this.touchStart.x) * this.options.touchMultiplier,
        o = -(i - this.touchStart.y) * this.options.touchMultiplier;
      ((this.touchStart.x = e),
        (this.touchStart.y = i),
        (this.lastDelta = {
          x: s,
          y: o,
        }),
        this.emitter.emit("scroll", {
          deltaX: s,
          deltaY: o,
          event: t,
        }));
    });
    r(this, "onTouchEnd", (t) => {
      this.emitter.emit("scroll", {
        deltaX: this.lastDelta.x,
        deltaY: this.lastDelta.y,
        event: t,
      });
    });
    r(this, "onWheel", (t) => {
      let { deltaX: e, deltaY: i, deltaMode: s } = t;
      const o = M(s, this.window.width),
        c = M(s, this.window.height);
      ((e *= o),
        (i *= c),
        (e *= this.options.wheelMultiplier),
        (i *= this.options.wheelMultiplier),
        this.emitter.emit("scroll", {
          deltaX: e,
          deltaY: i,
          event: t,
        }));
    });
    r(this, "onWindowResize", () => {
      this.window = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    });
    ((this.element = t),
      (this.options = e),
      window.addEventListener("resize", this.onWindowResize),
      this.onWindowResize(),
      this.element.addEventListener("wheel", this.onWheel, b),
      this.element.addEventListener("touchstart", this.onTouchStart, b),
      this.element.addEventListener("touchmove", this.onTouchMove, b),
      this.element.addEventListener("touchend", this.onTouchEnd, b));
  }
  on(t, e) {
    return this.emitter.on(t, e);
  }
  destroy() {
    (this.emitter.destroy(),
      window.removeEventListener("resize", this.onWindowResize),
      this.element.removeEventListener("wheel", this.onWheel, b),
      this.element.removeEventListener("touchstart", this.onTouchStart, b),
      this.element.removeEventListener("touchmove", this.onTouchMove, b),
      this.element.removeEventListener("touchend", this.onTouchEnd, b));
  }
};
const O = (t) => Math.min(1, 1.001 - 2 ** (-10 * t));
var Q = class {
  constructor({
    wrapper: t = window,
    content: e = document.documentElement,
    eventsTarget: i = t,
    smoothWheel: s = !0,
    syncTouch: o = !1,
    syncTouchLerp: c = 0.075,
    touchInertiaExponent: p = 1.7,
    duration: h,
    easing: a,
    lerp: u = 0.1,
    infinite: f = !1,
    orientation: m = "vertical",
    gestureOrientation: l = m === "horizontal" ? "both" : "vertical",
    touchMultiplier: S = 1,
    wheelMultiplier: n = 1,
    autoResize: d = !0,
    prevent: v,
    virtualScroll: g,
    overscroll: w = !0,
    autoRaf: y = !1,
    anchors: T = !1,
    autoToggle: L = !1,
    allowNestedScroll: x = !1,
    __experimental__naiveDimensions: A = !1,
    naiveDimensions: P = A,
    stopInertiaOnNavigate: D = !1,
    respectReducedMotion: I = !0,
  } = {}) {
    r(this, "_isScrolling", !1);
    r(this, "_isStopped", !1);
    r(this, "_isLocked", !1);
    r(this, "_preventNextNativeScrollEvent", !1);
    r(this, "_resetVelocityTimeout", null);
    r(this, "_rafId", null);
    r(this, "_isDraggingSelection", !1);
    r(
      this,
      "reducedMotionMediaQuery",
      window.matchMedia("(prefers-reduced-motion: reduce)"),
    );
    r(this, "isTouching");
    r(this, "isIos");
    r(this, "time", 0);
    r(this, "userData", {});
    r(this, "lastVelocity", 0);
    r(this, "velocity", 0);
    r(this, "direction", 0);
    r(this, "options");
    r(this, "targetScroll");
    r(this, "animatedScroll");
    r(this, "animate", new V());
    r(this, "emitter", new k());
    r(this, "dimensions");
    r(this, "virtualScroll");
    r(this, "onScrollEnd", (t) => {
      t instanceof CustomEvent ||
        ((this.isScrolling === "smooth" || this.isScrolling === !1) &&
          t.stopPropagation());
    });
    r(this, "dispatchScrollendEvent", () => {
      this.options.wrapper.dispatchEvent(
        new CustomEvent("scrollend", {
          bubbles: this.options.wrapper === window,
          detail: {
            lenisScrollEnd: !0,
          },
        }),
      );
    });
    r(this, "onTransitionEnd", (t) => {
      var e;
      (e = t.propertyName) != null &&
        e.includes("overflow") &&
        t.target === this.rootElement &&
        this.checkOverflow();
    });
    r(this, "onClick", (t) => {
      const e = t
          .composedPath()
          .filter((s) => s instanceof HTMLAnchorElement && s.href)
          .map((s) => new URL(s.href)),
        i = new URL(window.location.href);
      if (this.options.anchors) {
        const s = e.find(
          (o) => i.host === o.host && i.pathname === o.pathname && o.hash,
        );
        if (s) {
          const o =
              typeof this.options.anchors == "object" && this.options.anchors
                ? this.options.anchors
                : void 0,
            c = decodeURIComponent(s.hash);
          this.scrollTo(c, o);
          return;
        }
      }
      if (
        this.options.stopInertiaOnNavigate &&
        e.some((s) => i.host === s.host && i.pathname !== s.pathname)
      ) {
        this.reset();
        return;
      }
    });
    r(this, "onPointerDown", (t) => {
      t.button === 1 && this.reset();
    });
    r(this, "onVirtualScroll", (t) => {
      if (
        typeof this.options.virtualScroll == "function" &&
        this.options.virtualScroll(t) === !1
      )
        return;
      const { deltaX: e, deltaY: i, event: s } = t;
      if (
        (this.emitter.emit("virtual-scroll", {
          deltaX: e,
          deltaY: i,
          event: s,
        }),
        s.ctrlKey || s.lenisStopPropagation)
      )
        return;
      const o = s.type.includes("touch"),
        c = s.type.includes("wheel");
      if (
        o &&
        this.isIos &&
        (s.type === "touchstart" &&
          (this._isDraggingSelection = this.isTouchOnSelectionHandle(s)),
        this._isDraggingSelection)
      ) {
        s.type === "touchend" && (this._isDraggingSelection = !1);
        return;
      }
      this.isTouching = s.type === "touchstart" || s.type === "touchmove";
      const p = e === 0 && i === 0;
      if (
        this.options.syncTouch &&
        o &&
        s.type === "touchstart" &&
        p &&
        !this.isStopped &&
        !this.isLocked
      ) {
        this.reset();
        return;
      }
      const h =
        (this.options.gestureOrientation === "vertical" && i === 0) ||
        (this.options.gestureOrientation === "horizontal" && e === 0);
      if (p || h) return;
      let a = s.composedPath();
      a = a.slice(0, a.indexOf(this.rootElement));
      const u = this.options.prevent,
        f = Math.abs(e) >= Math.abs(i) ? "horizontal" : "vertical";
      if (
        a.find((n) => {
          var d, v, g, w, y;
          return (
            n instanceof HTMLElement &&
            ((typeof u == "function" && (u == null ? void 0 : u(n))) ||
              ((d = n.hasAttribute) == null
                ? void 0
                : d.call(n, "data-lenis-prevent")) ||
              (f === "vertical" &&
                ((v = n.hasAttribute) == null
                  ? void 0
                  : v.call(n, "data-lenis-prevent-vertical"))) ||
              (f === "horizontal" &&
                ((g = n.hasAttribute) == null
                  ? void 0
                  : g.call(n, "data-lenis-prevent-horizontal"))) ||
              (o &&
                ((w = n.hasAttribute) == null
                  ? void 0
                  : w.call(n, "data-lenis-prevent-touch"))) ||
              (c &&
                ((y = n.hasAttribute) == null
                  ? void 0
                  : y.call(n, "data-lenis-prevent-wheel"))) ||
              (this.options.allowNestedScroll &&
                this.hasNestedScroll(n, {
                  deltaX: e,
                  deltaY: i,
                })))
          );
        })
      )
        return;
      if (this.isStopped || this.isLocked) {
        s.cancelable && s.preventDefault();
        return;
      }
      if (!((this.options.syncTouch && o) || (this.options.smoothWheel && c))) {
        ((this.isScrolling = "native"),
          this.animate.stop(),
          (s.lenisStopPropagation = !0));
        return;
      }
      let m = i;
      (this.options.gestureOrientation === "both"
        ? (m = Math.abs(i) > Math.abs(e) ? i : e)
        : this.options.gestureOrientation === "horizontal" && (m = e),
        (!this.options.overscroll ||
          this.options.infinite ||
          (this.options.wrapper !== window &&
            this.limit > 0 &&
            ((this.animatedScroll > 0 && this.animatedScroll < this.limit) ||
              (this.animatedScroll === 0 && i > 0) ||
              (this.animatedScroll === this.limit && i < 0)))) &&
          (s.lenisStopPropagation = !0),
        s.cancelable && s.preventDefault());
      const l = o && this.options.syncTouch,
        S = o && s.type === "touchend";
      (S &&
        (m =
          Math.sign(m) *
          Math.abs(this.velocity) ** this.options.touchInertiaExponent),
        this.scrollTo(this.targetScroll + m, {
          programmatic: !1,
          ...(l
            ? {
                lerp: S ? this.options.syncTouchLerp : 1,
              }
            : {
                lerp: this.options.lerp,
                duration: this.options.duration,
                easing: this.options.easing,
              }),
        }));
    });
    r(this, "onNativeScroll", () => {
      if (
        (this._resetVelocityTimeout !== null &&
          (clearTimeout(this._resetVelocityTimeout),
          (this._resetVelocityTimeout = null)),
        this._preventNextNativeScrollEvent)
      ) {
        this._preventNextNativeScrollEvent = !1;
        return;
      }
      if (this.isScrolling === !1 || this.isScrolling === "native") {
        const t = this.animatedScroll;
        ((this.animatedScroll = this.targetScroll = this.actualScroll),
          (this.lastVelocity = this.velocity),
          (this.velocity = this.animatedScroll - t),
          (this.direction = Math.sign(this.animatedScroll - t)),
          this.isStopped || (this.isScrolling = "native"),
          this.emit(),
          this.velocity !== 0 &&
            (this._resetVelocityTimeout = setTimeout(() => {
              ((this.lastVelocity = this.velocity),
                (this.velocity = 0),
                (this.isScrolling = !1),
                this.emit());
            }, 400)));
      }
    });
    r(this, "raf", (t) => {
      const e = t - (this.time || t);
      ((this.time = t),
        this.animate.advance(e * 0.001),
        this.options.autoRaf &&
          (this._rafId = requestAnimationFrame(this.raf)));
    });
    ((window.lenisVersion = N),
      window.lenis || (window.lenis = {}),
      (window.lenis.version = N),
      m === "horizontal" && (window.lenis.horizontal = !0),
      o === !0 && (window.lenis.touch = !0),
      (this.isIos = /(iPad|iPhone|iPod)/g.test(navigator.userAgent)),
      (!t || t === document.documentElement) && (t = window),
      typeof h == "number" && typeof a != "function"
        ? (a = O)
        : typeof a == "function" && typeof h != "number" && (h = 1),
      (this.options = {
        wrapper: t,
        content: e,
        eventsTarget: i,
        smoothWheel: s,
        syncTouch: o,
        syncTouchLerp: c,
        touchInertiaExponent: p,
        duration: h,
        easing: a,
        lerp: u,
        infinite: f,
        gestureOrientation: l,
        orientation: m,
        touchMultiplier: S,
        wheelMultiplier: n,
        autoResize: d,
        prevent: v,
        virtualScroll: g,
        overscroll: w,
        autoRaf: y,
        anchors: T,
        autoToggle: L,
        allowNestedScroll: x,
        naiveDimensions: P,
        stopInertiaOnNavigate: D,
        respectReducedMotion: I,
      }),
      (this.dimensions = new $(t, e, {
        autoResize: d,
      })),
      this.updateClassName(),
      (this.targetScroll = this.animatedScroll = this.actualScroll),
      this.options.wrapper.addEventListener("scroll", this.onNativeScroll),
      this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, {
        capture: !0,
      }),
      (this.options.anchors || this.options.stopInertiaOnNavigate) &&
        this.options.wrapper.addEventListener("click", this.onClick),
      this.options.wrapper.addEventListener("pointerdown", this.onPointerDown),
      (this.virtualScroll = new G(i, {
        touchMultiplier: S,
        wheelMultiplier: n,
      })),
      this.virtualScroll.on("scroll", this.onVirtualScroll),
      this.options.autoToggle &&
        (this.checkOverflow(),
        this.rootElement.addEventListener(
          "transitionend",
          this.onTransitionEnd,
        )),
      this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf)));
  }
  destroy() {
    (this.emitter.destroy(),
      this.options.wrapper.removeEventListener("scroll", this.onNativeScroll),
      this.options.wrapper.removeEventListener("scrollend", this.onScrollEnd, {
        capture: !0,
      }),
      this.options.wrapper.removeEventListener(
        "pointerdown",
        this.onPointerDown,
      ),
      (this.options.anchors || this.options.stopInertiaOnNavigate) &&
        this.options.wrapper.removeEventListener("click", this.onClick),
      this.virtualScroll.destroy(),
      this.dimensions.destroy(),
      this.cleanUpClassName(),
      this._rafId && cancelAnimationFrame(this._rafId));
  }
  on(t, e) {
    return this.emitter.on(t, e);
  }
  off(t, e) {
    return this.emitter.off(t, e);
  }
  get overflow() {
    const t = this.isHorizontal ? "overflow-x" : "overflow-y";
    return getComputedStyle(this.rootElement)[t];
  }
  checkOverflow() {
    ["hidden", "clip"].includes(this.overflow)
      ? this.internalStop()
      : this.internalStart();
  }
  setScroll(t) {
    this.isHorizontal
      ? this.options.wrapper.scrollTo({
          left: t,
          behavior: "instant",
        })
      : this.options.wrapper.scrollTo({
          top: t,
          behavior: "instant",
        });
  }
  isTouchOnSelectionHandle(t) {
    const e = window.getSelection();
    if (!e || e.isCollapsed || e.rangeCount === 0) return !1;
    const i = t.targetTouches[0] ?? t.changedTouches[0];
    if (!i) return !1;
    const s = e.getRangeAt(0).getClientRects();
    if (s.length === 0) return !1;
    const o = s[0],
      c = s[s.length - 1],
      p = 40,
      h = Math.hypot(i.clientX - o.left, i.clientY - o.top) <= p,
      a = Math.hypot(i.clientX - c.right, i.clientY - c.bottom) <= p;
    return h || a;
  }
  resize() {
    (this.dimensions.resize(),
      (this.animatedScroll = this.targetScroll = this.actualScroll),
      this.emit());
  }
  emit() {
    this.emitter.emit("scroll", this);
  }
  reset() {
    ((this.isLocked = !1),
      (this.isScrolling = !1),
      (this.animatedScroll = this.targetScroll = this.actualScroll),
      (this.lastVelocity = this.velocity = 0),
      this.animate.stop());
  }
  start() {
    if (this.isStopped) {
      if (this.options.autoToggle) {
        this.rootElement.style.removeProperty("overflow");
        return;
      }
      this.internalStart();
    }
  }
  internalStart() {
    this.isStopped && (this.reset(), (this.isStopped = !1), this.emit());
  }
  stop() {
    if (!this.isStopped) {
      if (this.options.autoToggle) {
        this.rootElement.style.setProperty("overflow", "clip");
        return;
      }
      this.internalStop();
    }
  }
  internalStop() {
    this.isStopped || (this.reset(), (this.isStopped = !0), this.emit());
  }
  scrollTo(
    t,
    {
      offset: e = 0,
      immediate: i = !1,
      lock: s = !1,
      programmatic: o = !0,
      lerp: c = o ? this.options.lerp : void 0,
      duration: p = o ? this.options.duration : void 0,
      easing: h = o ? this.options.easing : void 0,
      onStart: a,
      onComplete: u,
      force: f = !1,
      userData: m,
    } = {},
  ) {
    if (
      (this.prefersReducedMotion &&
        (o ? (i = !0) : ((c = 1), (p = void 0), (h = void 0))),
      (this.isStopped || this.isLocked) && !f)
    )
      return;
    let l = t,
      S = e;
    if (typeof l == "string" && ["top", "left", "start", "#"].includes(l))
      l = 0;
    else if (typeof l == "string" && ["bottom", "right", "end"].includes(l))
      l = this.limit;
    else {
      let n = null;
      if (
        (typeof l == "string"
          ? ((n = l.startsWith("#")
              ? document.getElementById(l.slice(1))
              : document.querySelector(l)),
            n ||
              (l === "#top"
                ? (l = 0)
                : console.warn("Lenis: Target not found", l)))
          : l instanceof HTMLElement && l != null && l.nodeType && (n = l),
        n)
      ) {
        if (this.options.wrapper !== window) {
          const T = this.rootElement.getBoundingClientRect();
          S -= this.isHorizontal ? T.left : T.top;
        }
        const d = n.getBoundingClientRect(),
          v = getComputedStyle(n),
          g = this.isHorizontal
            ? Number.parseFloat(v.scrollMarginLeft)
            : Number.parseFloat(v.scrollMarginTop),
          w = getComputedStyle(this.rootElement),
          y = this.isHorizontal
            ? Number.parseFloat(w.scrollPaddingLeft)
            : Number.parseFloat(w.scrollPaddingTop);
        l =
          (this.isHorizontal ? d.left : d.top) +
          this.animatedScroll -
          (Number.isNaN(g) ? 0 : g) -
          (Number.isNaN(y) ? 0 : y);
      }
    }
    if (typeof l == "number") {
      if (((l += S), this.options.infinite)) {
        if (o) {
          this.targetScroll = this.animatedScroll = this.scroll;
          const n = l - this.animatedScroll;
          n > this.limit / 2
            ? (l -= this.limit)
            : n < -this.limit / 2 && (l += this.limit);
        }
      } else l = W(0, l, this.limit);
      if (l === this.targetScroll) {
        (a == null || a(this), u == null || u(this));
        return;
      }
      if (((this.userData = m ?? {}), i)) {
        ((this.animatedScroll = this.targetScroll = l),
          this.setScroll(this.scroll),
          this.reset(),
          this.preventNextNativeScrollEvent(),
          this.emit(),
          u == null || u(this),
          (this.userData = {}),
          requestAnimationFrame(() => {
            this.dispatchScrollendEvent();
          }));
        return;
      }
      (o || (this.targetScroll = l),
        typeof p == "number" && typeof h != "function"
          ? (h = O)
          : typeof h == "function" && typeof p != "number" && (p = 1),
        this.animate.fromTo(this.animatedScroll, l, {
          duration: p,
          easing: h,
          lerp: c,
          onStart: () => {
            (s && (this.isLocked = !0),
              (this.isScrolling = "smooth"),
              a == null || a(this));
          },
          onUpdate: (n, d) => {
            ((this.isScrolling = "smooth"),
              (this.lastVelocity = this.velocity),
              (this.velocity = n - this.animatedScroll),
              (this.direction = Math.sign(this.velocity)),
              (this.animatedScroll = n),
              this.setScroll(this.scroll),
              o && (this.targetScroll = n),
              d || this.emit(),
              d &&
                (this.reset(),
                this.emit(),
                u == null || u(this),
                (this.userData = {}),
                requestAnimationFrame(() => {
                  this.dispatchScrollendEvent();
                }),
                this.preventNextNativeScrollEvent()));
          },
        }));
    }
  }
  preventNextNativeScrollEvent() {
    ((this._preventNextNativeScrollEvent = !0),
      requestAnimationFrame(() => {
        this._preventNextNativeScrollEvent = !1;
      }));
  }
  hasNestedScroll(t, { deltaX: e, deltaY: i }) {
    const s = Date.now();
    t._lenis || (t._lenis = {});
    const o = t._lenis;
    let c, p, h, a, u, f, m, l, S, n;
    if (s - (o.time ?? 0) > 2e3) {
      o.time = Date.now();
      const x = window.getComputedStyle(t);
      if (
        ((o.computedStyle = x),
        (c = ["auto", "overlay", "scroll"].includes(x.overflowX)),
        (p = ["auto", "overlay", "scroll"].includes(x.overflowY)),
        (u = ["auto"].includes(x.overscrollBehaviorX)),
        (f = ["auto"].includes(x.overscrollBehaviorY)),
        (o.hasOverflowX = c),
        (o.hasOverflowY = p),
        !(c || p))
      )
        return !1;
      ((m = t.scrollWidth),
        (l = t.scrollHeight),
        (S = t.clientWidth),
        (n = t.clientHeight),
        (h = m > S),
        (a = l > n),
        (o.isScrollableX = h),
        (o.isScrollableY = a),
        (o.scrollWidth = m),
        (o.scrollHeight = l),
        (o.clientWidth = S),
        (o.clientHeight = n),
        (o.hasOverscrollBehaviorX = u),
        (o.hasOverscrollBehaviorY = f));
    } else
      ((h = o.isScrollableX),
        (a = o.isScrollableY),
        (c = o.hasOverflowX),
        (p = o.hasOverflowY),
        (m = o.scrollWidth),
        (l = o.scrollHeight),
        (S = o.clientWidth),
        (n = o.clientHeight),
        (u = o.hasOverscrollBehaviorX),
        (f = o.hasOverscrollBehaviorY));
    if (!((c && h) || (p && a))) return !1;
    const d = Math.abs(e) >= Math.abs(i) ? "horizontal" : "vertical";
    let v, g, w, y, T, L;
    if (d === "horizontal")
      ((v = Math.round(t.scrollLeft)),
        (g = m - S),
        (w = e),
        (y = c),
        (T = h),
        (L = u));
    else if (d === "vertical")
      ((v = Math.round(t.scrollTop)),
        (g = l - n),
        (w = i),
        (y = p),
        (T = a),
        (L = f));
    else return !1;
    return !L && (v >= g || v <= 0) ? !0 : (w > 0 ? v < g : v > 0) && y && T;
  }
  get rootElement() {
    return this.options.wrapper === window
      ? document.documentElement
      : this.options.wrapper;
  }
  get limit() {
    return this.options.naiveDimensions
      ? this.isHorizontal
        ? this.rootElement.scrollWidth - this.rootElement.clientWidth
        : this.rootElement.scrollHeight - this.rootElement.clientHeight
      : this.dimensions.limit[this.isHorizontal ? "x" : "y"];
  }
  get isHorizontal() {
    return this.options.orientation === "horizontal";
  }
  get actualScroll() {
    const t = this.options.wrapper;
    return this.isHorizontal
      ? (t.scrollX ?? t.scrollLeft)
      : (t.scrollY ?? t.scrollTop);
  }
  get scroll() {
    return this.options.infinite
      ? F(this.animatedScroll, this.limit)
      : this.animatedScroll;
  }
  get progress() {
    return this.limit === 0 ? 1 : this.scroll / this.limit;
  }
  get isScrolling() {
    return this._isScrolling;
  }
  set isScrolling(t) {
    this._isScrolling !== t &&
      ((this._isScrolling = t), this.updateClassName());
  }
  get isStopped() {
    return this._isStopped;
  }
  set isStopped(t) {
    this._isStopped !== t && ((this._isStopped = t), this.updateClassName());
  }
  get isLocked() {
    return this._isLocked;
  }
  set isLocked(t) {
    this._isLocked !== t && ((this._isLocked = t), this.updateClassName());
  }
  get isSmooth() {
    return this.isScrolling === "smooth";
  }
  get prefersReducedMotion() {
    return (
      this.options.respectReducedMotion && this.reducedMotionMediaQuery.matches
    );
  }
  get className() {
    let t = "lenis";
    return (
      this.options.autoToggle && (t += " lenis-autoToggle"),
      this.isStopped && (t += " lenis-stopped"),
      this.isLocked && (t += " lenis-locked"),
      this.isScrolling && (t += " lenis-scrolling"),
      this.isScrolling === "smooth" && (t += " lenis-smooth"),
      t
    );
  }
  updateClassName() {
    (this.cleanUpClassName(),
      this.className.split(" ").forEach((t) => {
        this.rootElement.classList.add(t);
      }));
  }
  cleanUpClassName() {
    for (const t of Array.from(this.rootElement.classList))
      (t === "lenis" || t.startsWith("lenis-")) &&
        this.rootElement.classList.remove(t);
  }
};
const R = 0.32,
  _ = 0.18;
function K(t) {
  const e = t.querySelector(".fx-btn__label"),
    i = gsap.quickTo(t, "x", {
      duration: 0.6,
      ease: "power3.out",
    }),
    s = gsap.quickTo(t, "y", {
      duration: 0.6,
      ease: "power3.out",
    }),
    o =
      e &&
      gsap.quickTo(e, "x", {
        duration: 0.6,
        ease: "power3.out",
      }),
    c =
      e &&
      gsap.quickTo(e, "y", {
        duration: 0.6,
        ease: "power3.out",
      }),
    p = (h) => {
      const a = t.getBoundingClientRect();
      (t.style.setProperty(
        "--fx-x",
        `${((h.clientX - a.left) / a.width) * 100}%`,
      ),
        t.style.setProperty(
          "--fx-y",
          `${((h.clientY - a.top) / a.height) * 100}%`,
        ));
    };
  (t.addEventListener("pointerenter", (h) => {
    h.pointerType === "mouse" && p(h);
  }),
    t.addEventListener("pointermove", (h) => {
      if (h.pointerType !== "mouse") return;
      const a = t.getBoundingClientRect(),
        u = h.clientX - (a.left + a.width / 2),
        f = h.clientY - (a.top + a.height / 2);
      (i(u * R), s(f * R), o == null || o(u * _), c == null || c(f * _));
    }),
    t.addEventListener("pointerleave", (h) => {
      h.pointerType === "mouse" &&
        (p(h),
        gsap.to(t, {
          x: 0,
          y: 0,
          duration: 0.9,
          ease: "elastic.out(1, 0.4)",
        }),
        e &&
          gsap.to(e, {
            x: 0,
            y: 0,
            duration: 0.9,
            ease: "elastic.out(1, 0.4)",
          }));
    }));
}
function J(t) {
  const e = new IntersectionObserver(
    (i) => {
      for (const s of i)
        s.isIntersecting &&
          (s.target.classList.add(
            s.target.classList.contains("fx-reveal") ? "is-in" : "is-drawn",
          ),
          s.target.querySelectorAll("mask path").forEach((o) => {
            gsap.fromTo(
              o,
              {
                strokeDashoffset: 1,
              },
              {
                strokeDashoffset: 0,
                duration: 1.4,
                delay: parseFloat(o.style.getPropertyValue("--d")) || 0,
                ease: "power2.inOut",
              },
            );
          }),
          e.unobserve(s.target));
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.15,
    },
  );
  t.querySelectorAll(".fx-doodle, .fx-reveal").forEach((i) => e.observe(i));
}
function Z(t) {
  t.querySelectorAll(".fx-badge svg").forEach((e) => {
    const i = gsap.to(e, {
      rotation: 360,
      duration: 16,
      ease: "none",
      repeat: -1,
    });
    e.style.animation = "none";
    const s = e.closest(".fx-badge");
    (s.addEventListener("pointerenter", () =>
      gsap.to(i, {
        timeScale: 5,
        duration: 0.6,
        ease: "power2.out",
      }),
    ),
      s.addEventListener("pointerleave", () =>
        gsap.to(i, {
          timeScale: 1,
          duration: 1.2,
          ease: "power2.out",
        }),
      ));
  });
}
function tt(t) {
  t.querySelectorAll(".fx-copy[data-copy]").forEach((e) => {
    let i;
    e.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(e.dataset.copy);
      } catch {
        return;
      }
      (e.classList.add("is-done"),
        gsap.fromTo(
          e,
          {
            scale: 0.94,
          },
          {
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.45)",
          },
        ),
        clearTimeout(i),
        (i = setTimeout(() => e.classList.remove("is-done"), 1800)));
    });
  });
}
function et() {
  const t = document.createElement("canvas");
  ((t.className = "fx-trail"),
    t.setAttribute("aria-hidden", "true"),
    document.body.append(t));
  const e = t.getContext("2d"),
    i = 900,
    s = 11,
    o = 4,
    c = 6,
    p = 14,
    h = [];
  let a = null,
    u = 0,
    f = 1,
    m = !1;
  const l = () => {
    ((f = Math.min(window.devicePixelRatio || 1, 2)),
      (t.width = innerWidth * f),
      (t.height = innerHeight * f));
  };
  (l(),
    window.addEventListener("resize", l),
    window.addEventListener(
      "pointermove",
      (n) => {
        if (n.pointerType !== "mouse") return;
        const d = {
          x: n.clientX + c,
          y: n.clientY + p,
        };
        if (!a) {
          a = d;
          return;
        }
        const v = d.x - a.x,
          g = d.y - a.y,
          w = Math.hypot(v, g);
        if (w > 200) {
          ((a = d), (u = 0));
          return;
        }
        const y = Math.atan2(g, v),
          T = performance.now();
        for (u += w; u >= s;) {
          u -= s;
          const L = u / (w || 1);
          h.push({
            x: d.x - v * L,
            y: d.y - g * L,
            angle: y,
            t: T,
          });
        }
        ((a = d), m || ((m = !0), requestAnimationFrame(S)));
      },
      {
        passive: !0,
      },
    ),
    document.addEventListener("pointerleave", () => {
      a = null;
    }));
  function S(n) {
    for (; h.length && n - h[0].t > i;) h.shift();
    if ((e.clearRect(0, 0, t.width, t.height), !h.length)) {
      m = !1;
      return;
    }
    ((e.lineCap = "round"), (e.lineWidth = 1.6 * f));
    for (const d of h) {
      const v = 1 - (n - d.t) / i;
      e.strokeStyle = `rgba(255, 255, 255, ${(0.7 * v * v).toFixed(3)})`;
      const g = Math.cos(d.angle) * (o / 2) * f,
        w = Math.sin(d.angle) * (o / 2) * f;
      (e.beginPath(),
        e.moveTo(d.x * f - g, d.y * f - w),
        e.lineTo(d.x * f + g, d.y * f + w),
        e.stroke());
    }
    requestAnimationFrame(S);
  }
}
let z = null;
function it() {
  z ||
    ((z = new Q({
      lerp: 0.1,
      wheelMultiplier: 1,
    })),
    gsap.ticker.add((t) => z.raf(t * 1e3)),
    gsap.ticker.lagSmoothing(0));
}
function st(t, e) {
  const i = [...t.querySelectorAll("video[autoplay]")];
  if (e) {
    i.forEach((o) => {
      (o.removeAttribute("autoplay"), o.pause());
    });
    return;
  }
  const s = new IntersectionObserver((o) => {
    for (const { target: c, isIntersecting: p } of o)
      p ? c.play().catch(() => {}) : c.pause();
  });
  i.forEach((o) => s.observe(o));
}
function ot(t) {
  t.querySelectorAll("[data-hover-clip]").forEach((e) => {
    const i = e.querySelector("video");
    i &&
      (e.addEventListener("pointerenter", (s) => {
        s.pointerType === "mouse" &&
          (i.src || (i.src = i.dataset.src),
          i
            .play()
            .then(() => e.classList.add("is-playing"))
            .catch(() => {}));
      }),
      e.addEventListener("pointerleave", () => {
        (e.classList.remove("is-playing"), i.pause());
      }));
  });
}
let H = !1;
function rt(t = document) {
  const e = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  (st(t, e),
    !(
      e ||
      (document.documentElement.classList.add("fx-js"),
      it(),
      J(t),
      Z(t),
      tt(t),
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches)
    ) &&
      (t.querySelectorAll(".fx-btn").forEach(K), ot(t), H || ((H = !0), et())));
}
const nt = () => /(^|\.)curllmooha\.com$/.test(window.location.hostname);
function lt() {
  nt() && q.init("yx16t5raw6");
}
document.querySelector("[data-fx-auto]") && (lt(), rt());
export { lt as initClarity, rt as initFlat, nt as isLiveSite };
