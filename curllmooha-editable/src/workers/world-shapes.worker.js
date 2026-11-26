(function () {
  "use strict";
  /**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   */ const At = "srgb",
    yn = "srgb-linear",
    xn = "linear",
    As = "srgb";
  class vs {
    addEventListener(t, e) {
      this._listeners === void 0 && (this._listeners = {});
      const s = this._listeners;
      (s[t] === void 0 && (s[t] = []), s[t].indexOf(e) === -1 && s[t].push(e));
    }
    hasEventListener(t, e) {
      const s = this._listeners;
      return s === void 0 ? !1 : s[t] !== void 0 && s[t].indexOf(e) !== -1;
    }
    removeEventListener(t, e) {
      const s = this._listeners;
      if (s === void 0) return;
      const n = s[t];
      if (n !== void 0) {
        const i = n.indexOf(e);
        i !== -1 && n.splice(i, 1);
      }
    }
    dispatchEvent(t) {
      const e = this._listeners;
      if (e === void 0) return;
      const s = e[t.type];
      if (s !== void 0) {
        t.target = this;
        const n = s.slice(0);
        for (let i = 0, o = n.length; i < o; i++) n[i].call(this, t);
        t.target = null;
      }
    }
  }
  const pt = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "0a",
    "0b",
    "0c",
    "0d",
    "0e",
    "0f",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "1a",
    "1b",
    "1c",
    "1d",
    "1e",
    "1f",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "2a",
    "2b",
    "2c",
    "2d",
    "2e",
    "2f",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "3a",
    "3b",
    "3c",
    "3d",
    "3e",
    "3f",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "4a",
    "4b",
    "4c",
    "4d",
    "4e",
    "4f",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
    "5a",
    "5b",
    "5c",
    "5d",
    "5e",
    "5f",
    "60",
    "61",
    "62",
    "63",
    "64",
    "65",
    "66",
    "67",
    "68",
    "69",
    "6a",
    "6b",
    "6c",
    "6d",
    "6e",
    "6f",
    "70",
    "71",
    "72",
    "73",
    "74",
    "75",
    "76",
    "77",
    "78",
    "79",
    "7a",
    "7b",
    "7c",
    "7d",
    "7e",
    "7f",
    "80",
    "81",
    "82",
    "83",
    "84",
    "85",
    "86",
    "87",
    "88",
    "89",
    "8a",
    "8b",
    "8c",
    "8d",
    "8e",
    "8f",
    "90",
    "91",
    "92",
    "93",
    "94",
    "95",
    "96",
    "97",
    "98",
    "99",
    "9a",
    "9b",
    "9c",
    "9d",
    "9e",
    "9f",
    "a0",
    "a1",
    "a2",
    "a3",
    "a4",
    "a5",
    "a6",
    "a7",
    "a8",
    "a9",
    "aa",
    "ab",
    "ac",
    "ad",
    "ae",
    "af",
    "b0",
    "b1",
    "b2",
    "b3",
    "b4",
    "b5",
    "b6",
    "b7",
    "b8",
    "b9",
    "ba",
    "bb",
    "bc",
    "bd",
    "be",
    "bf",
    "c0",
    "c1",
    "c2",
    "c3",
    "c4",
    "c5",
    "c6",
    "c7",
    "c8",
    "c9",
    "ca",
    "cb",
    "cc",
    "cd",
    "ce",
    "cf",
    "d0",
    "d1",
    "d2",
    "d3",
    "d4",
    "d5",
    "d6",
    "d7",
    "d8",
    "d9",
    "da",
    "db",
    "dc",
    "dd",
    "de",
    "df",
    "e0",
    "e1",
    "e2",
    "e3",
    "e4",
    "e5",
    "e6",
    "e7",
    "e8",
    "e9",
    "ea",
    "eb",
    "ec",
    "ed",
    "ee",
    "ef",
    "f0",
    "f1",
    "f2",
    "f3",
    "f4",
    "f5",
    "f6",
    "f7",
    "f8",
    "f9",
    "fa",
    "fb",
    "fc",
    "fd",
    "fe",
    "ff",
  ];
  let gn = 1234567;
  const bn = Math.PI / 180,
    wn = 180 / Math.PI;
  function de() {
    const r = (Math.random() * 4294967295) | 0,
      t = (Math.random() * 4294967295) | 0,
      e = (Math.random() * 4294967295) | 0,
      s = (Math.random() * 4294967295) | 0;
    return (
      pt[r & 255] +
      pt[(r >> 8) & 255] +
      pt[(r >> 16) & 255] +
      pt[(r >> 24) & 255] +
      "-" +
      pt[t & 255] +
      pt[(t >> 8) & 255] +
      "-" +
      pt[((t >> 16) & 15) | 64] +
      pt[(t >> 24) & 255] +
      "-" +
      pt[(e & 63) | 128] +
      pt[(e >> 8) & 255] +
      "-" +
      pt[(e >> 16) & 255] +
      pt[(e >> 24) & 255] +
      pt[s & 255] +
      pt[(s >> 8) & 255] +
      pt[(s >> 16) & 255] +
      pt[(s >> 24) & 255]
    ).toLowerCase();
  }
  function H(r, t, e) {
    return Math.max(t, Math.min(e, r));
  }
  function _s(r, t) {
    return ((r % t) + t) % t;
  }
  function Bi(r, t, e, s, n) {
    return s + ((r - t) * (n - s)) / (e - t);
  }
  function Oi(r, t, e) {
    return r !== t ? (e - r) / (t - r) : 0;
  }
  function Re(r, t, e) {
    return (1 - e) * r + e * t;
  }
  function Ri(r, t, e, s) {
    return Re(r, t, 1 - Math.exp(-e * s));
  }
  function Ii(r, t = 1) {
    return t - Math.abs(_s(r, t * 2) - t);
  }
  function Ni(r, t, e) {
    return r <= t
      ? 0
      : r >= e
        ? 1
        : ((r = (r - t) / (e - t)), r * r * (3 - 2 * r));
  }
  function Li(r, t, e) {
    return r <= t
      ? 0
      : r >= e
        ? 1
        : ((r = (r - t) / (e - t)), r * r * r * (r * (r * 6 - 15) + 10));
  }
  function Di(r, t) {
    return r + Math.floor(Math.random() * (t - r + 1));
  }
  function Ui(r, t) {
    return r + Math.random() * (t - r);
  }
  function Xi(r) {
    return r * (0.5 - Math.random());
  }
  function Zi(r) {
    r !== void 0 && (gn = r);
    let t = (gn += 1831565813);
    return (
      (t = Math.imul(t ^ (t >>> 15), t | 1)),
      (t ^= t + Math.imul(t ^ (t >>> 7), t | 61)),
      ((t ^ (t >>> 14)) >>> 0) / 4294967296
    );
  }
  function Vi(r) {
    return r * bn;
  }
  function Yi(r) {
    return r * wn;
  }
  function Gi(r) {
    return (r & (r - 1)) === 0 && r !== 0;
  }
  function Hi(r) {
    return Math.pow(2, Math.ceil(Math.log(r) / Math.LN2));
  }
  function Wi(r) {
    return Math.pow(2, Math.floor(Math.log(r) / Math.LN2));
  }
  function Ji(r, t, e, s, n) {
    const i = Math.cos,
      o = Math.sin,
      a = i(e / 2),
      h = o(e / 2),
      l = i((t + s) / 2),
      c = o((t + s) / 2),
      u = i((t - s) / 2),
      p = o((t - s) / 2),
      f = i((s - t) / 2),
      d = o((s - t) / 2);
    switch (n) {
      case "XYX":
        r.set(a * c, h * u, h * p, a * l);
        break;
      case "YZY":
        r.set(h * p, a * c, h * u, a * l);
        break;
      case "ZXZ":
        r.set(h * u, h * p, a * c, a * l);
        break;
      case "XZX":
        r.set(a * c, h * d, h * f, a * l);
        break;
      case "YXY":
        r.set(h * f, a * c, h * d, a * l);
        break;
      case "ZYZ":
        r.set(h * d, h * f, a * c, a * l);
        break;
      default:
        console.warn(
          "THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " +
            n,
        );
    }
  }
  function me(r, t) {
    switch (t.constructor) {
      case Float32Array:
        return r;
      case Uint32Array:
        return r / 4294967295;
      case Uint16Array:
        return r / 65535;
      case Uint8Array:
        return r / 255;
      case Int32Array:
        return Math.max(r / 2147483647, -1);
      case Int16Array:
        return Math.max(r / 32767, -1);
      case Int8Array:
        return Math.max(r / 127, -1);
      default:
        throw new Error("Invalid component type.");
    }
  }
  function mt(r, t) {
    switch (t.constructor) {
      case Float32Array:
        return r;
      case Uint32Array:
        return Math.round(r * 4294967295);
      case Uint16Array:
        return Math.round(r * 65535);
      case Uint8Array:
        return Math.round(r * 255);
      case Int32Array:
        return Math.round(r * 2147483647);
      case Int16Array:
        return Math.round(r * 32767);
      case Int8Array:
        return Math.round(r * 127);
      default:
        throw new Error("Invalid component type.");
    }
  }
  const rt = {
    DEG2RAD: bn,
    RAD2DEG: wn,
    generateUUID: de,
    clamp: H,
    euclideanModulo: _s,
    mapLinear: Bi,
    inverseLerp: Oi,
    lerp: Re,
    damp: Ri,
    pingpong: Ii,
    smoothstep: Ni,
    smootherstep: Li,
    randInt: Di,
    randFloat: Ui,
    randFloatSpread: Xi,
    seededRandom: Zi,
    degToRad: Vi,
    radToDeg: Yi,
    isPowerOfTwo: Gi,
    ceilPowerOfTwo: Hi,
    floorPowerOfTwo: Wi,
    setQuaternionFromProperEuler: Ji,
    normalize: mt,
    denormalize: me,
  };
  class E {
    constructor(t = 0, e = 0) {
      ((E.prototype.isVector2 = !0), (this.x = t), (this.y = e));
    }
    get width() {
      return this.x;
    }
    set width(t) {
      this.x = t;
    }
    get height() {
      return this.y;
    }
    set height(t) {
      this.y = t;
    }
    set(t, e) {
      return ((this.x = t), (this.y = e), this);
    }
    setScalar(t) {
      return ((this.x = t), (this.y = t), this);
    }
    setX(t) {
      return ((this.x = t), this);
    }
    setY(t) {
      return ((this.y = t), this);
    }
    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e;
          break;
        case 1:
          this.y = e;
          break;
        default:
          throw new Error("index is out of range: " + t);
      }
      return this;
    }
    getComponent(t) {
      switch (t) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        default:
          throw new Error("index is out of range: " + t);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y);
    }
    copy(t) {
      return ((this.x = t.x), (this.y = t.y), this);
    }
    add(t) {
      return ((this.x += t.x), (this.y += t.y), this);
    }
    addScalar(t) {
      return ((this.x += t), (this.y += t), this);
    }
    addVectors(t, e) {
      return ((this.x = t.x + e.x), (this.y = t.y + e.y), this);
    }
    addScaledVector(t, e) {
      return ((this.x += t.x * e), (this.y += t.y * e), this);
    }
    sub(t) {
      return ((this.x -= t.x), (this.y -= t.y), this);
    }
    subScalar(t) {
      return ((this.x -= t), (this.y -= t), this);
    }
    subVectors(t, e) {
      return ((this.x = t.x - e.x), (this.y = t.y - e.y), this);
    }
    multiply(t) {
      return ((this.x *= t.x), (this.y *= t.y), this);
    }
    multiplyScalar(t) {
      return ((this.x *= t), (this.y *= t), this);
    }
    divide(t) {
      return ((this.x /= t.x), (this.y /= t.y), this);
    }
    divideScalar(t) {
      return this.multiplyScalar(1 / t);
    }
    applyMatrix3(t) {
      const e = this.x,
        s = this.y,
        n = t.elements;
      return (
        (this.x = n[0] * e + n[3] * s + n[6]),
        (this.y = n[1] * e + n[4] * s + n[7]),
        this
      );
    }
    min(t) {
      return (
        (this.x = Math.min(this.x, t.x)),
        (this.y = Math.min(this.y, t.y)),
        this
      );
    }
    max(t) {
      return (
        (this.x = Math.max(this.x, t.x)),
        (this.y = Math.max(this.y, t.y)),
        this
      );
    }
    clamp(t, e) {
      return (
        (this.x = H(this.x, t.x, e.x)),
        (this.y = H(this.y, t.y, e.y)),
        this
      );
    }
    clampScalar(t, e) {
      return ((this.x = H(this.x, t, e)), (this.y = H(this.y, t, e)), this);
    }
    clampLength(t, e) {
      const s = this.length();
      return this.divideScalar(s || 1).multiplyScalar(H(s, t, e));
    }
    floor() {
      return (
        (this.x = Math.floor(this.x)),
        (this.y = Math.floor(this.y)),
        this
      );
    }
    ceil() {
      return ((this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), this);
    }
    round() {
      return (
        (this.x = Math.round(this.x)),
        (this.y = Math.round(this.y)),
        this
      );
    }
    roundToZero() {
      return (
        (this.x = Math.trunc(this.x)),
        (this.y = Math.trunc(this.y)),
        this
      );
    }
    negate() {
      return ((this.x = -this.x), (this.y = -this.y), this);
    }
    dot(t) {
      return this.x * t.x + this.y * t.y;
    }
    cross(t) {
      return this.x * t.y - this.y * t.x;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    angle() {
      return Math.atan2(-this.y, -this.x) + Math.PI;
    }
    angleTo(t) {
      const e = Math.sqrt(this.lengthSq() * t.lengthSq());
      if (e === 0) return Math.PI / 2;
      const s = this.dot(t) / e;
      return Math.acos(H(s, -1, 1));
    }
    distanceTo(t) {
      return Math.sqrt(this.distanceToSquared(t));
    }
    distanceToSquared(t) {
      const e = this.x - t.x,
        s = this.y - t.y;
      return e * e + s * s;
    }
    manhattanDistanceTo(t) {
      return Math.abs(this.x - t.x) + Math.abs(this.y - t.y);
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t);
    }
    lerp(t, e) {
      return (
        (this.x += (t.x - this.x) * e),
        (this.y += (t.y - this.y) * e),
        this
      );
    }
    lerpVectors(t, e, s) {
      return (
        (this.x = t.x + (e.x - t.x) * s),
        (this.y = t.y + (e.y - t.y) * s),
        this
      );
    }
    equals(t) {
      return t.x === this.x && t.y === this.y;
    }
    fromArray(t, e = 0) {
      return ((this.x = t[e]), (this.y = t[e + 1]), this);
    }
    toArray(t = [], e = 0) {
      return ((t[e] = this.x), (t[e + 1] = this.y), t);
    }
    fromBufferAttribute(t, e) {
      return ((this.x = t.getX(e)), (this.y = t.getY(e)), this);
    }
    rotateAround(t, e) {
      const s = Math.cos(e),
        n = Math.sin(e),
        i = this.x - t.x,
        o = this.y - t.y;
      return (
        (this.x = i * s - o * n + t.x),
        (this.y = i * n + o * s + t.y),
        this
      );
    }
    random() {
      return ((this.x = Math.random()), (this.y = Math.random()), this);
    }
    *[Symbol.iterator]() {
      (yield this.x, yield this.y);
    }
  }
  class Wt {
    constructor(t, e, s, n, i, o, a, h, l) {
      ((Wt.prototype.isMatrix3 = !0),
        (this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]),
        t !== void 0 && this.set(t, e, s, n, i, o, a, h, l));
    }
    set(t, e, s, n, i, o, a, h, l) {
      const c = this.elements;
      return (
        (c[0] = t),
        (c[1] = n),
        (c[2] = a),
        (c[3] = e),
        (c[4] = i),
        (c[5] = h),
        (c[6] = s),
        (c[7] = o),
        (c[8] = l),
        this
      );
    }
    identity() {
      return (this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this);
    }
    copy(t) {
      const e = this.elements,
        s = t.elements;
      return (
        (e[0] = s[0]),
        (e[1] = s[1]),
        (e[2] = s[2]),
        (e[3] = s[3]),
        (e[4] = s[4]),
        (e[5] = s[5]),
        (e[6] = s[6]),
        (e[7] = s[7]),
        (e[8] = s[8]),
        this
      );
    }
    extractBasis(t, e, s) {
      return (
        t.setFromMatrix3Column(this, 0),
        e.setFromMatrix3Column(this, 1),
        s.setFromMatrix3Column(this, 2),
        this
      );
    }
    setFromMatrix4(t) {
      const e = t.elements;
      return (
        this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]),
        this
      );
    }
    multiply(t) {
      return this.multiplyMatrices(this, t);
    }
    premultiply(t) {
      return this.multiplyMatrices(t, this);
    }
    multiplyMatrices(t, e) {
      const s = t.elements,
        n = e.elements,
        i = this.elements,
        o = s[0],
        a = s[3],
        h = s[6],
        l = s[1],
        c = s[4],
        u = s[7],
        p = s[2],
        f = s[5],
        d = s[8],
        m = n[0],
        x = n[3],
        b = n[6],
        g = n[1],
        w = n[4],
        M = n[7],
        z = n[2],
        v = n[5],
        _ = n[8];
      return (
        (i[0] = o * m + a * g + h * z),
        (i[3] = o * x + a * w + h * v),
        (i[6] = o * b + a * M + h * _),
        (i[1] = l * m + c * g + u * z),
        (i[4] = l * x + c * w + u * v),
        (i[7] = l * b + c * M + u * _),
        (i[2] = p * m + f * g + d * z),
        (i[5] = p * x + f * w + d * v),
        (i[8] = p * b + f * M + d * _),
        this
      );
    }
    multiplyScalar(t) {
      const e = this.elements;
      return (
        (e[0] *= t),
        (e[3] *= t),
        (e[6] *= t),
        (e[1] *= t),
        (e[4] *= t),
        (e[7] *= t),
        (e[2] *= t),
        (e[5] *= t),
        (e[8] *= t),
        this
      );
    }
    determinant() {
      const t = this.elements,
        e = t[0],
        s = t[1],
        n = t[2],
        i = t[3],
        o = t[4],
        a = t[5],
        h = t[6],
        l = t[7],
        c = t[8];
      return (
        e * o * c - e * a * l - s * i * c + s * a * h + n * i * l - n * o * h
      );
    }
    invert() {
      const t = this.elements,
        e = t[0],
        s = t[1],
        n = t[2],
        i = t[3],
        o = t[4],
        a = t[5],
        h = t[6],
        l = t[7],
        c = t[8],
        u = c * o - a * l,
        p = a * h - c * i,
        f = l * i - o * h,
        d = e * u + s * p + n * f;
      if (d === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
      const m = 1 / d;
      return (
        (t[0] = u * m),
        (t[1] = (n * l - c * s) * m),
        (t[2] = (a * s - n * o) * m),
        (t[3] = p * m),
        (t[4] = (c * e - n * h) * m),
        (t[5] = (n * i - a * e) * m),
        (t[6] = f * m),
        (t[7] = (s * h - l * e) * m),
        (t[8] = (o * e - s * i) * m),
        this
      );
    }
    transpose() {
      let t;
      const e = this.elements;
      return (
        (t = e[1]),
        (e[1] = e[3]),
        (e[3] = t),
        (t = e[2]),
        (e[2] = e[6]),
        (e[6] = t),
        (t = e[5]),
        (e[5] = e[7]),
        (e[7] = t),
        this
      );
    }
    getNormalMatrix(t) {
      return this.setFromMatrix4(t).invert().transpose();
    }
    transposeIntoArray(t) {
      const e = this.elements;
      return (
        (t[0] = e[0]),
        (t[1] = e[3]),
        (t[2] = e[6]),
        (t[3] = e[1]),
        (t[4] = e[4]),
        (t[5] = e[7]),
        (t[6] = e[2]),
        (t[7] = e[5]),
        (t[8] = e[8]),
        this
      );
    }
    setUvTransform(t, e, s, n, i, o, a) {
      const h = Math.cos(i),
        l = Math.sin(i);
      return (
        this.set(
          s * h,
          s * l,
          -s * (h * o + l * a) + o + t,
          -n * l,
          n * h,
          -n * (-l * o + h * a) + a + e,
          0,
          0,
          1,
        ),
        this
      );
    }
    scale(t, e) {
      return (this.premultiply(Ss.makeScale(t, e)), this);
    }
    rotate(t) {
      return (this.premultiply(Ss.makeRotation(-t)), this);
    }
    translate(t, e) {
      return (this.premultiply(Ss.makeTranslation(t, e)), this);
    }
    makeTranslation(t, e) {
      return (
        t.isVector2
          ? this.set(1, 0, t.x, 0, 1, t.y, 0, 0, 1)
          : this.set(1, 0, t, 0, 1, e, 0, 0, 1),
        this
      );
    }
    makeRotation(t) {
      const e = Math.cos(t),
        s = Math.sin(t);
      return (this.set(e, -s, 0, s, e, 0, 0, 0, 1), this);
    }
    makeScale(t, e) {
      return (this.set(t, 0, 0, 0, e, 0, 0, 0, 1), this);
    }
    equals(t) {
      const e = this.elements,
        s = t.elements;
      for (let n = 0; n < 9; n++) if (e[n] !== s[n]) return !1;
      return !0;
    }
    fromArray(t, e = 0) {
      for (let s = 0; s < 9; s++) this.elements[s] = t[s + e];
      return this;
    }
    toArray(t = [], e = 0) {
      const s = this.elements;
      return (
        (t[e] = s[0]),
        (t[e + 1] = s[1]),
        (t[e + 2] = s[2]),
        (t[e + 3] = s[3]),
        (t[e + 4] = s[4]),
        (t[e + 5] = s[5]),
        (t[e + 6] = s[6]),
        (t[e + 7] = s[7]),
        (t[e + 8] = s[8]),
        t
      );
    }
    clone() {
      return new this.constructor().fromArray(this.elements);
    }
  }
  const Ss = new Wt();
  function ji(r) {
    for (let t = r.length - 1; t >= 0; --t) if (r[t] >= 65535) return !0;
    return !1;
  }
  function Mn(r) {
    return document.createElementNS("http://www.w3.org/1999/xhtml", r);
  }
  const zn = new Wt().set(
      0.4123908,
      0.3575843,
      0.1804808,
      0.212639,
      0.7151687,
      0.0721923,
      0.0193308,
      0.1191948,
      0.9505322,
    ),
    An = new Wt().set(
      3.2409699,
      -1.5373832,
      -0.4986108,
      -0.9692436,
      1.8759675,
      0.0415551,
      0.0556301,
      -0.203977,
      1.0569715,
    );
  function qi() {
    const r = {
        enabled: !0,
        workingColorSpace: yn,
        spaces: {},
        convert: function (n, i, o) {
          return (
            this.enabled === !1 ||
              i === o ||
              !i ||
              !o ||
              (this.spaces[i].transfer === As &&
                ((n.r = It(n.r)), (n.g = It(n.g)), (n.b = It(n.b))),
              this.spaces[i].primaries !== this.spaces[o].primaries &&
                (n.applyMatrix3(this.spaces[i].toXYZ),
                n.applyMatrix3(this.spaces[o].fromXYZ)),
              this.spaces[o].transfer === As &&
                ((n.r = ye(n.r)), (n.g = ye(n.g)), (n.b = ye(n.b)))),
            n
          );
        },
        fromWorkingColorSpace: function (n, i) {
          return this.convert(n, this.workingColorSpace, i);
        },
        toWorkingColorSpace: function (n, i) {
          return this.convert(n, i, this.workingColorSpace);
        },
        getPrimaries: function (n) {
          return this.spaces[n].primaries;
        },
        getTransfer: function (n) {
          return n === "" ? xn : this.spaces[n].transfer;
        },
        getLuminanceCoefficients: function (n, i = this.workingColorSpace) {
          return n.fromArray(this.spaces[i].luminanceCoefficients);
        },
        define: function (n) {
          Object.assign(this.spaces, n);
        },
        _getMatrix: function (n, i, o) {
          return n.copy(this.spaces[i].toXYZ).multiply(this.spaces[o].fromXYZ);
        },
        _getDrawingBufferColorSpace: function (n) {
          return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace;
        },
        _getUnpackColorSpace: function (n = this.workingColorSpace) {
          return this.spaces[n].workingColorSpaceConfig.unpackColorSpace;
        },
      },
      t = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06],
      e = [0.2126, 0.7152, 0.0722],
      s = [0.3127, 0.329];
    return (
      r.define({
        [yn]: {
          primaries: t,
          whitePoint: s,
          transfer: xn,
          toXYZ: zn,
          fromXYZ: An,
          luminanceCoefficients: e,
          workingColorSpaceConfig: { unpackColorSpace: At },
          outputColorSpaceConfig: { drawingBufferColorSpace: At },
        },
        [At]: {
          primaries: t,
          whitePoint: s,
          transfer: As,
          toXYZ: zn,
          fromXYZ: An,
          luminanceCoefficients: e,
          outputColorSpaceConfig: { drawingBufferColorSpace: At },
        },
      }),
      r
    );
  }
  const vt = qi();
  function It(r) {
    return r < 0.04045
      ? r * 0.0773993808
      : Math.pow(r * 0.9478672986 + 0.0521327014, 2.4);
  }
  function ye(r) {
    return r < 0.0031308 ? r * 12.92 : 1.055 * Math.pow(r, 0.41666) - 0.055;
  }
  let xe;
  class Qi {
    static getDataURL(t) {
      if (/^data:/i.test(t.src) || typeof HTMLCanvasElement > "u") return t.src;
      let e;
      if (t instanceof HTMLCanvasElement) e = t;
      else {
        (xe === void 0 && (xe = Mn("canvas")),
          (xe.width = t.width),
          (xe.height = t.height));
        const s = xe.getContext("2d");
        (t instanceof ImageData
          ? s.putImageData(t, 0, 0)
          : s.drawImage(t, 0, 0, t.width, t.height),
          (e = xe));
      }
      return e.toDataURL("image/png");
    }
    static sRGBToLinear(t) {
      if (
        (typeof HTMLImageElement < "u" && t instanceof HTMLImageElement) ||
        (typeof HTMLCanvasElement < "u" && t instanceof HTMLCanvasElement) ||
        (typeof ImageBitmap < "u" && t instanceof ImageBitmap)
      ) {
        const e = Mn("canvas");
        ((e.width = t.width), (e.height = t.height));
        const s = e.getContext("2d");
        s.drawImage(t, 0, 0, t.width, t.height);
        const n = s.getImageData(0, 0, t.width, t.height),
          i = n.data;
        for (let o = 0; o < i.length; o++) i[o] = It(i[o] / 255) * 255;
        return (s.putImageData(n, 0, 0), e);
      } else if (t.data) {
        const e = t.data.slice(0);
        for (let s = 0; s < e.length; s++)
          e instanceof Uint8Array || e instanceof Uint8ClampedArray
            ? (e[s] = Math.floor(It(e[s] / 255) * 255))
            : (e[s] = It(e[s]));
        return { data: e, width: t.width, height: t.height };
      } else
        return (
          console.warn(
            "THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.",
          ),
          t
        );
    }
  }
  let $i = 0;
  class Ki {
    constructor(t = null) {
      ((this.isSource = !0),
        Object.defineProperty(this, "id", { value: $i++ }),
        (this.uuid = de()),
        (this.data = t),
        (this.dataReady = !0),
        (this.version = 0));
    }
    set needsUpdate(t) {
      t === !0 && this.version++;
    }
    toJSON(t) {
      const e = t === void 0 || typeof t == "string";
      if (!e && t.images[this.uuid] !== void 0) return t.images[this.uuid];
      const s = { uuid: this.uuid, url: "" },
        n = this.data;
      if (n !== null) {
        let i;
        if (Array.isArray(n)) {
          i = [];
          for (let o = 0, a = n.length; o < a; o++)
            n[o].isDataTexture ? i.push(Cs(n[o].image)) : i.push(Cs(n[o]));
        } else i = Cs(n);
        s.url = i;
      }
      return (e || (t.images[this.uuid] = s), s);
    }
  }
  function Cs(r) {
    return (typeof HTMLImageElement < "u" && r instanceof HTMLImageElement) ||
      (typeof HTMLCanvasElement < "u" && r instanceof HTMLCanvasElement) ||
      (typeof ImageBitmap < "u" && r instanceof ImageBitmap)
      ? Qi.getDataURL(r)
      : r.data
        ? {
            data: Array.from(r.data),
            width: r.width,
            height: r.height,
            type: r.data.constructor.name,
          }
        : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
  }
  let tr = 0;
  class ie extends vs {
    constructor(
      t = ie.DEFAULT_IMAGE,
      e = ie.DEFAULT_MAPPING,
      s = 1001,
      n = 1001,
      i = 1006,
      o = 1008,
      a = 1023,
      h = 1009,
      l = ie.DEFAULT_ANISOTROPY,
      c = "",
    ) {
      (super(),
        (this.isTexture = !0),
        Object.defineProperty(this, "id", { value: tr++ }),
        (this.uuid = de()),
        (this.name = ""),
        (this.source = new Ki(t)),
        (this.mipmaps = []),
        (this.mapping = e),
        (this.channel = 0),
        (this.wrapS = s),
        (this.wrapT = n),
        (this.magFilter = i),
        (this.minFilter = o),
        (this.anisotropy = l),
        (this.format = a),
        (this.internalFormat = null),
        (this.type = h),
        (this.offset = new E(0, 0)),
        (this.repeat = new E(1, 1)),
        (this.center = new E(0, 0)),
        (this.rotation = 0),
        (this.matrixAutoUpdate = !0),
        (this.matrix = new Wt()),
        (this.generateMipmaps = !0),
        (this.premultiplyAlpha = !1),
        (this.flipY = !0),
        (this.unpackAlignment = 4),
        (this.colorSpace = c),
        (this.userData = {}),
        (this.version = 0),
        (this.onUpdate = null),
        (this.renderTarget = null),
        (this.isRenderTargetTexture = !1),
        (this.pmremVersion = 0));
    }
    get image() {
      return this.source.data;
    }
    set image(t = null) {
      this.source.data = t;
    }
    updateMatrix() {
      this.matrix.setUvTransform(
        this.offset.x,
        this.offset.y,
        this.repeat.x,
        this.repeat.y,
        this.rotation,
        this.center.x,
        this.center.y,
      );
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return (
        (this.name = t.name),
        (this.source = t.source),
        (this.mipmaps = t.mipmaps.slice(0)),
        (this.mapping = t.mapping),
        (this.channel = t.channel),
        (this.wrapS = t.wrapS),
        (this.wrapT = t.wrapT),
        (this.magFilter = t.magFilter),
        (this.minFilter = t.minFilter),
        (this.anisotropy = t.anisotropy),
        (this.format = t.format),
        (this.internalFormat = t.internalFormat),
        (this.type = t.type),
        this.offset.copy(t.offset),
        this.repeat.copy(t.repeat),
        this.center.copy(t.center),
        (this.rotation = t.rotation),
        (this.matrixAutoUpdate = t.matrixAutoUpdate),
        this.matrix.copy(t.matrix),
        (this.generateMipmaps = t.generateMipmaps),
        (this.premultiplyAlpha = t.premultiplyAlpha),
        (this.flipY = t.flipY),
        (this.unpackAlignment = t.unpackAlignment),
        (this.colorSpace = t.colorSpace),
        (this.renderTarget = t.renderTarget),
        (this.isRenderTargetTexture = t.isRenderTargetTexture),
        (this.userData = JSON.parse(JSON.stringify(t.userData))),
        (this.needsUpdate = !0),
        this
      );
    }
    toJSON(t) {
      const e = t === void 0 || typeof t == "string";
      if (!e && t.textures[this.uuid] !== void 0) return t.textures[this.uuid];
      const s = {
        metadata: {
          version: 4.6,
          type: "Texture",
          generator: "Texture.toJSON",
        },
        uuid: this.uuid,
        name: this.name,
        image: this.source.toJSON(t).uuid,
        mapping: this.mapping,
        channel: this.channel,
        repeat: [this.repeat.x, this.repeat.y],
        offset: [this.offset.x, this.offset.y],
        center: [this.center.x, this.center.y],
        rotation: this.rotation,
        wrap: [this.wrapS, this.wrapT],
        format: this.format,
        internalFormat: this.internalFormat,
        type: this.type,
        colorSpace: this.colorSpace,
        minFilter: this.minFilter,
        magFilter: this.magFilter,
        anisotropy: this.anisotropy,
        flipY: this.flipY,
        generateMipmaps: this.generateMipmaps,
        premultiplyAlpha: this.premultiplyAlpha,
        unpackAlignment: this.unpackAlignment,
      };
      return (
        Object.keys(this.userData).length > 0 && (s.userData = this.userData),
        e || (t.textures[this.uuid] = s),
        s
      );
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
    transformUv(t) {
      if (this.mapping !== 300) return t;
      if ((t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1))
        switch (this.wrapS) {
          case 1e3:
            t.x = t.x - Math.floor(t.x);
            break;
          case 1001:
            t.x = t.x < 0 ? 0 : 1;
            break;
          case 1002:
            Math.abs(Math.floor(t.x) % 2) === 1
              ? (t.x = Math.ceil(t.x) - t.x)
              : (t.x = t.x - Math.floor(t.x));
            break;
        }
      if (t.y < 0 || t.y > 1)
        switch (this.wrapT) {
          case 1e3:
            t.y = t.y - Math.floor(t.y);
            break;
          case 1001:
            t.y = t.y < 0 ? 0 : 1;
            break;
          case 1002:
            Math.abs(Math.floor(t.y) % 2) === 1
              ? (t.y = Math.ceil(t.y) - t.y)
              : (t.y = t.y - Math.floor(t.y));
            break;
        }
      return (this.flipY && (t.y = 1 - t.y), t);
    }
    set needsUpdate(t) {
      t === !0 && (this.version++, (this.source.needsUpdate = !0));
    }
    set needsPMREMUpdate(t) {
      t === !0 && this.pmremVersion++;
    }
  }
  ((ie.DEFAULT_IMAGE = null),
    (ie.DEFAULT_MAPPING = 300),
    (ie.DEFAULT_ANISOTROPY = 1));
  class _t {
    constructor(t = 0, e = 0, s = 0, n = 1) {
      ((this.isQuaternion = !0),
        (this._x = t),
        (this._y = e),
        (this._z = s),
        (this._w = n));
    }
    static slerpFlat(t, e, s, n, i, o, a) {
      let h = s[n + 0],
        l = s[n + 1],
        c = s[n + 2],
        u = s[n + 3];
      const p = i[o + 0],
        f = i[o + 1],
        d = i[o + 2],
        m = i[o + 3];
      if (a === 0) {
        ((t[e + 0] = h), (t[e + 1] = l), (t[e + 2] = c), (t[e + 3] = u));
        return;
      }
      if (a === 1) {
        ((t[e + 0] = p), (t[e + 1] = f), (t[e + 2] = d), (t[e + 3] = m));
        return;
      }
      if (u !== m || h !== p || l !== f || c !== d) {
        let x = 1 - a;
        const b = h * p + l * f + c * d + u * m,
          g = b >= 0 ? 1 : -1,
          w = 1 - b * b;
        if (w > Number.EPSILON) {
          const z = Math.sqrt(w),
            v = Math.atan2(z, b * g);
          ((x = Math.sin(x * v) / z), (a = Math.sin(a * v) / z));
        }
        const M = a * g;
        if (
          ((h = h * x + p * M),
          (l = l * x + f * M),
          (c = c * x + d * M),
          (u = u * x + m * M),
          x === 1 - a)
        ) {
          const z = 1 / Math.sqrt(h * h + l * l + c * c + u * u);
          ((h *= z), (l *= z), (c *= z), (u *= z));
        }
      }
      ((t[e] = h), (t[e + 1] = l), (t[e + 2] = c), (t[e + 3] = u));
    }
    static multiplyQuaternionsFlat(t, e, s, n, i, o) {
      const a = s[n],
        h = s[n + 1],
        l = s[n + 2],
        c = s[n + 3],
        u = i[o],
        p = i[o + 1],
        f = i[o + 2],
        d = i[o + 3];
      return (
        (t[e] = a * d + c * u + h * f - l * p),
        (t[e + 1] = h * d + c * p + l * u - a * f),
        (t[e + 2] = l * d + c * f + a * p - h * u),
        (t[e + 3] = c * d - a * u - h * p - l * f),
        t
      );
    }
    get x() {
      return this._x;
    }
    set x(t) {
      ((this._x = t), this._onChangeCallback());
    }
    get y() {
      return this._y;
    }
    set y(t) {
      ((this._y = t), this._onChangeCallback());
    }
    get z() {
      return this._z;
    }
    set z(t) {
      ((this._z = t), this._onChangeCallback());
    }
    get w() {
      return this._w;
    }
    set w(t) {
      ((this._w = t), this._onChangeCallback());
    }
    set(t, e, s, n) {
      return (
        (this._x = t),
        (this._y = e),
        (this._z = s),
        (this._w = n),
        this._onChangeCallback(),
        this
      );
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._w);
    }
    copy(t) {
      return (
        (this._x = t.x),
        (this._y = t.y),
        (this._z = t.z),
        (this._w = t.w),
        this._onChangeCallback(),
        this
      );
    }
    setFromEuler(t, e = !0) {
      const s = t._x,
        n = t._y,
        i = t._z,
        o = t._order,
        a = Math.cos,
        h = Math.sin,
        l = a(s / 2),
        c = a(n / 2),
        u = a(i / 2),
        p = h(s / 2),
        f = h(n / 2),
        d = h(i / 2);
      switch (o) {
        case "XYZ":
          ((this._x = p * c * u + l * f * d),
            (this._y = l * f * u - p * c * d),
            (this._z = l * c * d + p * f * u),
            (this._w = l * c * u - p * f * d));
          break;
        case "YXZ":
          ((this._x = p * c * u + l * f * d),
            (this._y = l * f * u - p * c * d),
            (this._z = l * c * d - p * f * u),
            (this._w = l * c * u + p * f * d));
          break;
        case "ZXY":
          ((this._x = p * c * u - l * f * d),
            (this._y = l * f * u + p * c * d),
            (this._z = l * c * d + p * f * u),
            (this._w = l * c * u - p * f * d));
          break;
        case "ZYX":
          ((this._x = p * c * u - l * f * d),
            (this._y = l * f * u + p * c * d),
            (this._z = l * c * d - p * f * u),
            (this._w = l * c * u + p * f * d));
          break;
        case "YZX":
          ((this._x = p * c * u + l * f * d),
            (this._y = l * f * u + p * c * d),
            (this._z = l * c * d - p * f * u),
            (this._w = l * c * u - p * f * d));
          break;
        case "XZY":
          ((this._x = p * c * u - l * f * d),
            (this._y = l * f * u - p * c * d),
            (this._z = l * c * d + p * f * u),
            (this._w = l * c * u + p * f * d));
          break;
        default:
          console.warn(
            "THREE.Quaternion: .setFromEuler() encountered an unknown order: " +
              o,
          );
      }
      return (e === !0 && this._onChangeCallback(), this);
    }
    setFromAxisAngle(t, e) {
      const s = e / 2,
        n = Math.sin(s);
      return (
        (this._x = t.x * n),
        (this._y = t.y * n),
        (this._z = t.z * n),
        (this._w = Math.cos(s)),
        this._onChangeCallback(),
        this
      );
    }
    setFromRotationMatrix(t) {
      const e = t.elements,
        s = e[0],
        n = e[4],
        i = e[8],
        o = e[1],
        a = e[5],
        h = e[9],
        l = e[2],
        c = e[6],
        u = e[10],
        p = s + a + u;
      if (p > 0) {
        const f = 0.5 / Math.sqrt(p + 1);
        ((this._w = 0.25 / f),
          (this._x = (c - h) * f),
          (this._y = (i - l) * f),
          (this._z = (o - n) * f));
      } else if (s > a && s > u) {
        const f = 2 * Math.sqrt(1 + s - a - u);
        ((this._w = (c - h) / f),
          (this._x = 0.25 * f),
          (this._y = (n + o) / f),
          (this._z = (i + l) / f));
      } else if (a > u) {
        const f = 2 * Math.sqrt(1 + a - s - u);
        ((this._w = (i - l) / f),
          (this._x = (n + o) / f),
          (this._y = 0.25 * f),
          (this._z = (h + c) / f));
      } else {
        const f = 2 * Math.sqrt(1 + u - s - a);
        ((this._w = (o - n) / f),
          (this._x = (i + l) / f),
          (this._y = (h + c) / f),
          (this._z = 0.25 * f));
      }
      return (this._onChangeCallback(), this);
    }
    setFromUnitVectors(t, e) {
      let s = t.dot(e) + 1;
      return (
        s < Number.EPSILON
          ? ((s = 0),
            Math.abs(t.x) > Math.abs(t.z)
              ? ((this._x = -t.y),
                (this._y = t.x),
                (this._z = 0),
                (this._w = s))
              : ((this._x = 0),
                (this._y = -t.z),
                (this._z = t.y),
                (this._w = s)))
          : ((this._x = t.y * e.z - t.z * e.y),
            (this._y = t.z * e.x - t.x * e.z),
            (this._z = t.x * e.y - t.y * e.x),
            (this._w = s)),
        this.normalize()
      );
    }
    angleTo(t) {
      return 2 * Math.acos(Math.abs(H(this.dot(t), -1, 1)));
    }
    rotateTowards(t, e) {
      const s = this.angleTo(t);
      if (s === 0) return this;
      const n = Math.min(1, e / s);
      return (this.slerp(t, n), this);
    }
    identity() {
      return this.set(0, 0, 0, 1);
    }
    invert() {
      return this.conjugate();
    }
    conjugate() {
      return (
        (this._x *= -1),
        (this._y *= -1),
        (this._z *= -1),
        this._onChangeCallback(),
        this
      );
    }
    dot(t) {
      return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w;
    }
    lengthSq() {
      return (
        this._x * this._x +
        this._y * this._y +
        this._z * this._z +
        this._w * this._w
      );
    }
    length() {
      return Math.sqrt(
        this._x * this._x +
          this._y * this._y +
          this._z * this._z +
          this._w * this._w,
      );
    }
    normalize() {
      let t = this.length();
      return (
        t === 0
          ? ((this._x = 0), (this._y = 0), (this._z = 0), (this._w = 1))
          : ((t = 1 / t),
            (this._x = this._x * t),
            (this._y = this._y * t),
            (this._z = this._z * t),
            (this._w = this._w * t)),
        this._onChangeCallback(),
        this
      );
    }
    multiply(t) {
      return this.multiplyQuaternions(this, t);
    }
    premultiply(t) {
      return this.multiplyQuaternions(t, this);
    }
    multiplyQuaternions(t, e) {
      const s = t._x,
        n = t._y,
        i = t._z,
        o = t._w,
        a = e._x,
        h = e._y,
        l = e._z,
        c = e._w;
      return (
        (this._x = s * c + o * a + n * l - i * h),
        (this._y = n * c + o * h + i * a - s * l),
        (this._z = i * c + o * l + s * h - n * a),
        (this._w = o * c - s * a - n * h - i * l),
        this._onChangeCallback(),
        this
      );
    }
    slerp(t, e) {
      if (e === 0) return this;
      if (e === 1) return this.copy(t);
      const s = this._x,
        n = this._y,
        i = this._z,
        o = this._w;
      let a = o * t._w + s * t._x + n * t._y + i * t._z;
      if (
        (a < 0
          ? ((this._w = -t._w),
            (this._x = -t._x),
            (this._y = -t._y),
            (this._z = -t._z),
            (a = -a))
          : this.copy(t),
        a >= 1)
      )
        return (
          (this._w = o),
          (this._x = s),
          (this._y = n),
          (this._z = i),
          this
        );
      const h = 1 - a * a;
      if (h <= Number.EPSILON) {
        const f = 1 - e;
        return (
          (this._w = f * o + e * this._w),
          (this._x = f * s + e * this._x),
          (this._y = f * n + e * this._y),
          (this._z = f * i + e * this._z),
          this.normalize(),
          this
        );
      }
      const l = Math.sqrt(h),
        c = Math.atan2(l, a),
        u = Math.sin((1 - e) * c) / l,
        p = Math.sin(e * c) / l;
      return (
        (this._w = o * u + this._w * p),
        (this._x = s * u + this._x * p),
        (this._y = n * u + this._y * p),
        (this._z = i * u + this._z * p),
        this._onChangeCallback(),
        this
      );
    }
    slerpQuaternions(t, e, s) {
      return this.copy(t).slerp(e, s);
    }
    random() {
      const t = 2 * Math.PI * Math.random(),
        e = 2 * Math.PI * Math.random(),
        s = Math.random(),
        n = Math.sqrt(1 - s),
        i = Math.sqrt(s);
      return this.set(
        n * Math.sin(t),
        n * Math.cos(t),
        i * Math.sin(e),
        i * Math.cos(e),
      );
    }
    equals(t) {
      return (
        t._x === this._x &&
        t._y === this._y &&
        t._z === this._z &&
        t._w === this._w
      );
    }
    fromArray(t, e = 0) {
      return (
        (this._x = t[e]),
        (this._y = t[e + 1]),
        (this._z = t[e + 2]),
        (this._w = t[e + 3]),
        this._onChangeCallback(),
        this
      );
    }
    toArray(t = [], e = 0) {
      return (
        (t[e] = this._x),
        (t[e + 1] = this._y),
        (t[e + 2] = this._z),
        (t[e + 3] = this._w),
        t
      );
    }
    fromBufferAttribute(t, e) {
      return (
        (this._x = t.getX(e)),
        (this._y = t.getY(e)),
        (this._z = t.getZ(e)),
        (this._w = t.getW(e)),
        this._onChangeCallback(),
        this
      );
    }
    toJSON() {
      return this.toArray();
    }
    _onChange(t) {
      return ((this._onChangeCallback = t), this);
    }
    _onChangeCallback() {}
    *[Symbol.iterator]() {
      (yield this._x, yield this._y, yield this._z, yield this._w);
    }
  }
  class y {
    constructor(t = 0, e = 0, s = 0) {
      ((y.prototype.isVector3 = !0), (this.x = t), (this.y = e), (this.z = s));
    }
    set(t, e, s) {
      return (
        s === void 0 && (s = this.z),
        (this.x = t),
        (this.y = e),
        (this.z = s),
        this
      );
    }
    setScalar(t) {
      return ((this.x = t), (this.y = t), (this.z = t), this);
    }
    setX(t) {
      return ((this.x = t), this);
    }
    setY(t) {
      return ((this.y = t), this);
    }
    setZ(t) {
      return ((this.z = t), this);
    }
    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e;
          break;
        case 1:
          this.y = e;
          break;
        case 2:
          this.z = e;
          break;
        default:
          throw new Error("index is out of range: " + t);
      }
      return this;
    }
    getComponent(t) {
      switch (t) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        default:
          throw new Error("index is out of range: " + t);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z);
    }
    copy(t) {
      return ((this.x = t.x), (this.y = t.y), (this.z = t.z), this);
    }
    add(t) {
      return ((this.x += t.x), (this.y += t.y), (this.z += t.z), this);
    }
    addScalar(t) {
      return ((this.x += t), (this.y += t), (this.z += t), this);
    }
    addVectors(t, e) {
      return (
        (this.x = t.x + e.x),
        (this.y = t.y + e.y),
        (this.z = t.z + e.z),
        this
      );
    }
    addScaledVector(t, e) {
      return (
        (this.x += t.x * e),
        (this.y += t.y * e),
        (this.z += t.z * e),
        this
      );
    }
    sub(t) {
      return ((this.x -= t.x), (this.y -= t.y), (this.z -= t.z), this);
    }
    subScalar(t) {
      return ((this.x -= t), (this.y -= t), (this.z -= t), this);
    }
    subVectors(t, e) {
      return (
        (this.x = t.x - e.x),
        (this.y = t.y - e.y),
        (this.z = t.z - e.z),
        this
      );
    }
    multiply(t) {
      return ((this.x *= t.x), (this.y *= t.y), (this.z *= t.z), this);
    }
    multiplyScalar(t) {
      return ((this.x *= t), (this.y *= t), (this.z *= t), this);
    }
    multiplyVectors(t, e) {
      return (
        (this.x = t.x * e.x),
        (this.y = t.y * e.y),
        (this.z = t.z * e.z),
        this
      );
    }
    applyEuler(t) {
      return this.applyQuaternion(vn.setFromEuler(t));
    }
    applyAxisAngle(t, e) {
      return this.applyQuaternion(vn.setFromAxisAngle(t, e));
    }
    applyMatrix3(t) {
      const e = this.x,
        s = this.y,
        n = this.z,
        i = t.elements;
      return (
        (this.x = i[0] * e + i[3] * s + i[6] * n),
        (this.y = i[1] * e + i[4] * s + i[7] * n),
        (this.z = i[2] * e + i[5] * s + i[8] * n),
        this
      );
    }
    applyNormalMatrix(t) {
      return this.applyMatrix3(t).normalize();
    }
    applyMatrix4(t) {
      const e = this.x,
        s = this.y,
        n = this.z,
        i = t.elements,
        o = 1 / (i[3] * e + i[7] * s + i[11] * n + i[15]);
      return (
        (this.x = (i[0] * e + i[4] * s + i[8] * n + i[12]) * o),
        (this.y = (i[1] * e + i[5] * s + i[9] * n + i[13]) * o),
        (this.z = (i[2] * e + i[6] * s + i[10] * n + i[14]) * o),
        this
      );
    }
    applyQuaternion(t) {
      const e = this.x,
        s = this.y,
        n = this.z,
        i = t.x,
        o = t.y,
        a = t.z,
        h = t.w,
        l = 2 * (o * n - a * s),
        c = 2 * (a * e - i * n),
        u = 2 * (i * s - o * e);
      return (
        (this.x = e + h * l + o * u - a * c),
        (this.y = s + h * c + a * l - i * u),
        (this.z = n + h * u + i * c - o * l),
        this
      );
    }
    project(t) {
      return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(
        t.projectionMatrix,
      );
    }
    unproject(t) {
      return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(
        t.matrixWorld,
      );
    }
    transformDirection(t) {
      const e = this.x,
        s = this.y,
        n = this.z,
        i = t.elements;
      return (
        (this.x = i[0] * e + i[4] * s + i[8] * n),
        (this.y = i[1] * e + i[5] * s + i[9] * n),
        (this.z = i[2] * e + i[6] * s + i[10] * n),
        this.normalize()
      );
    }
    divide(t) {
      return ((this.x /= t.x), (this.y /= t.y), (this.z /= t.z), this);
    }
    divideScalar(t) {
      return this.multiplyScalar(1 / t);
    }
    min(t) {
      return (
        (this.x = Math.min(this.x, t.x)),
        (this.y = Math.min(this.y, t.y)),
        (this.z = Math.min(this.z, t.z)),
        this
      );
    }
    max(t) {
      return (
        (this.x = Math.max(this.x, t.x)),
        (this.y = Math.max(this.y, t.y)),
        (this.z = Math.max(this.z, t.z)),
        this
      );
    }
    clamp(t, e) {
      return (
        (this.x = H(this.x, t.x, e.x)),
        (this.y = H(this.y, t.y, e.y)),
        (this.z = H(this.z, t.z, e.z)),
        this
      );
    }
    clampScalar(t, e) {
      return (
        (this.x = H(this.x, t, e)),
        (this.y = H(this.y, t, e)),
        (this.z = H(this.z, t, e)),
        this
      );
    }
    clampLength(t, e) {
      const s = this.length();
      return this.divideScalar(s || 1).multiplyScalar(H(s, t, e));
    }
    floor() {
      return (
        (this.x = Math.floor(this.x)),
        (this.y = Math.floor(this.y)),
        (this.z = Math.floor(this.z)),
        this
      );
    }
    ceil() {
      return (
        (this.x = Math.ceil(this.x)),
        (this.y = Math.ceil(this.y)),
        (this.z = Math.ceil(this.z)),
        this
      );
    }
    round() {
      return (
        (this.x = Math.round(this.x)),
        (this.y = Math.round(this.y)),
        (this.z = Math.round(this.z)),
        this
      );
    }
    roundToZero() {
      return (
        (this.x = Math.trunc(this.x)),
        (this.y = Math.trunc(this.y)),
        (this.z = Math.trunc(this.z)),
        this
      );
    }
    negate() {
      return ((this.x = -this.x), (this.y = -this.y), (this.z = -this.z), this);
    }
    dot(t) {
      return this.x * t.x + this.y * t.y + this.z * t.z;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t);
    }
    lerp(t, e) {
      return (
        (this.x += (t.x - this.x) * e),
        (this.y += (t.y - this.y) * e),
        (this.z += (t.z - this.z) * e),
        this
      );
    }
    lerpVectors(t, e, s) {
      return (
        (this.x = t.x + (e.x - t.x) * s),
        (this.y = t.y + (e.y - t.y) * s),
        (this.z = t.z + (e.z - t.z) * s),
        this
      );
    }
    cross(t) {
      return this.crossVectors(this, t);
    }
    crossVectors(t, e) {
      const s = t.x,
        n = t.y,
        i = t.z,
        o = e.x,
        a = e.y,
        h = e.z;
      return (
        (this.x = n * h - i * a),
        (this.y = i * o - s * h),
        (this.z = s * a - n * o),
        this
      );
    }
    projectOnVector(t) {
      const e = t.lengthSq();
      if (e === 0) return this.set(0, 0, 0);
      const s = t.dot(this) / e;
      return this.copy(t).multiplyScalar(s);
    }
    projectOnPlane(t) {
      return (Es.copy(this).projectOnVector(t), this.sub(Es));
    }
    reflect(t) {
      return this.sub(Es.copy(t).multiplyScalar(2 * this.dot(t)));
    }
    angleTo(t) {
      const e = Math.sqrt(this.lengthSq() * t.lengthSq());
      if (e === 0) return Math.PI / 2;
      const s = this.dot(t) / e;
      return Math.acos(H(s, -1, 1));
    }
    distanceTo(t) {
      return Math.sqrt(this.distanceToSquared(t));
    }
    distanceToSquared(t) {
      const e = this.x - t.x,
        s = this.y - t.y,
        n = this.z - t.z;
      return e * e + s * s + n * n;
    }
    manhattanDistanceTo(t) {
      return (
        Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z)
      );
    }
    setFromSpherical(t) {
      return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
    }
    setFromSphericalCoords(t, e, s) {
      const n = Math.sin(e) * t;
      return (
        (this.x = n * Math.sin(s)),
        (this.y = Math.cos(e) * t),
        (this.z = n * Math.cos(s)),
        this
      );
    }
    setFromCylindrical(t) {
      return this.setFromCylindricalCoords(t.radius, t.theta, t.y);
    }
    setFromCylindricalCoords(t, e, s) {
      return (
        (this.x = t * Math.sin(e)),
        (this.y = s),
        (this.z = t * Math.cos(e)),
        this
      );
    }
    setFromMatrixPosition(t) {
      const e = t.elements;
      return ((this.x = e[12]), (this.y = e[13]), (this.z = e[14]), this);
    }
    setFromMatrixScale(t) {
      const e = this.setFromMatrixColumn(t, 0).length(),
        s = this.setFromMatrixColumn(t, 1).length(),
        n = this.setFromMatrixColumn(t, 2).length();
      return ((this.x = e), (this.y = s), (this.z = n), this);
    }
    setFromMatrixColumn(t, e) {
      return this.fromArray(t.elements, e * 4);
    }
    setFromMatrix3Column(t, e) {
      return this.fromArray(t.elements, e * 3);
    }
    setFromEuler(t) {
      return ((this.x = t._x), (this.y = t._y), (this.z = t._z), this);
    }
    setFromColor(t) {
      return ((this.x = t.r), (this.y = t.g), (this.z = t.b), this);
    }
    equals(t) {
      return t.x === this.x && t.y === this.y && t.z === this.z;
    }
    fromArray(t, e = 0) {
      return ((this.x = t[e]), (this.y = t[e + 1]), (this.z = t[e + 2]), this);
    }
    toArray(t = [], e = 0) {
      return ((t[e] = this.x), (t[e + 1] = this.y), (t[e + 2] = this.z), t);
    }
    fromBufferAttribute(t, e) {
      return (
        (this.x = t.getX(e)),
        (this.y = t.getY(e)),
        (this.z = t.getZ(e)),
        this
      );
    }
    random() {
      return (
        (this.x = Math.random()),
        (this.y = Math.random()),
        (this.z = Math.random()),
        this
      );
    }
    randomDirection() {
      const t = Math.random() * Math.PI * 2,
        e = Math.random() * 2 - 1,
        s = Math.sqrt(1 - e * e);
      return (
        (this.x = s * Math.cos(t)),
        (this.y = e),
        (this.z = s * Math.sin(t)),
        this
      );
    }
    *[Symbol.iterator]() {
      (yield this.x, yield this.y, yield this.z);
    }
  }
  const Es = new y(),
    vn = new _t();
  class Ie {
    constructor(
      t = new y(1 / 0, 1 / 0, 1 / 0),
      e = new y(-1 / 0, -1 / 0, -1 / 0),
    ) {
      ((this.isBox3 = !0), (this.min = t), (this.max = e));
    }
    set(t, e) {
      return (this.min.copy(t), this.max.copy(e), this);
    }
    setFromArray(t) {
      this.makeEmpty();
      for (let e = 0, s = t.length; e < s; e += 3)
        this.expandByPoint(St.fromArray(t, e));
      return this;
    }
    setFromBufferAttribute(t) {
      this.makeEmpty();
      for (let e = 0, s = t.count; e < s; e++)
        this.expandByPoint(St.fromBufferAttribute(t, e));
      return this;
    }
    setFromPoints(t) {
      this.makeEmpty();
      for (let e = 0, s = t.length; e < s; e++) this.expandByPoint(t[e]);
      return this;
    }
    setFromCenterAndSize(t, e) {
      const s = St.copy(e).multiplyScalar(0.5);
      return (this.min.copy(t).sub(s), this.max.copy(t).add(s), this);
    }
    setFromObject(t, e = !1) {
      return (this.makeEmpty(), this.expandByObject(t, e));
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return (this.min.copy(t.min), this.max.copy(t.max), this);
    }
    makeEmpty() {
      return (
        (this.min.x = this.min.y = this.min.z = 1 / 0),
        (this.max.x = this.max.y = this.max.z = -1 / 0),
        this
      );
    }
    isEmpty() {
      return (
        this.max.x < this.min.x ||
        this.max.y < this.min.y ||
        this.max.z < this.min.z
      );
    }
    getCenter(t) {
      return this.isEmpty()
        ? t.set(0, 0, 0)
        : t.addVectors(this.min, this.max).multiplyScalar(0.5);
    }
    getSize(t) {
      return this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min);
    }
    expandByPoint(t) {
      return (this.min.min(t), this.max.max(t), this);
    }
    expandByVector(t) {
      return (this.min.sub(t), this.max.add(t), this);
    }
    expandByScalar(t) {
      return (this.min.addScalar(-t), this.max.addScalar(t), this);
    }
    expandByObject(t, e = !1) {
      t.updateWorldMatrix(!1, !1);
      const s = t.geometry;
      if (s !== void 0) {
        const i = s.getAttribute("position");
        if (e === !0 && i !== void 0 && t.isInstancedMesh !== !0)
          for (let o = 0, a = i.count; o < a; o++)
            (t.isMesh === !0
              ? t.getVertexPosition(o, St)
              : St.fromBufferAttribute(i, o),
              St.applyMatrix4(t.matrixWorld),
              this.expandByPoint(St));
        else
          (t.boundingBox !== void 0
            ? (t.boundingBox === null && t.computeBoundingBox(),
              Qe.copy(t.boundingBox))
            : (s.boundingBox === null && s.computeBoundingBox(),
              Qe.copy(s.boundingBox)),
            Qe.applyMatrix4(t.matrixWorld),
            this.union(Qe));
      }
      const n = t.children;
      for (let i = 0, o = n.length; i < o; i++) this.expandByObject(n[i], e);
      return this;
    }
    containsPoint(t) {
      return (
        t.x >= this.min.x &&
        t.x <= this.max.x &&
        t.y >= this.min.y &&
        t.y <= this.max.y &&
        t.z >= this.min.z &&
        t.z <= this.max.z
      );
    }
    containsBox(t) {
      return (
        this.min.x <= t.min.x &&
        t.max.x <= this.max.x &&
        this.min.y <= t.min.y &&
        t.max.y <= this.max.y &&
        this.min.z <= t.min.z &&
        t.max.z <= this.max.z
      );
    }
    getParameter(t, e) {
      return e.set(
        (t.x - this.min.x) / (this.max.x - this.min.x),
        (t.y - this.min.y) / (this.max.y - this.min.y),
        (t.z - this.min.z) / (this.max.z - this.min.z),
      );
    }
    intersectsBox(t) {
      return (
        t.max.x >= this.min.x &&
        t.min.x <= this.max.x &&
        t.max.y >= this.min.y &&
        t.min.y <= this.max.y &&
        t.max.z >= this.min.z &&
        t.min.z <= this.max.z
      );
    }
    intersectsSphere(t) {
      return (
        this.clampPoint(t.center, St),
        St.distanceToSquared(t.center) <= t.radius * t.radius
      );
    }
    intersectsPlane(t) {
      let e, s;
      return (
        t.normal.x > 0
          ? ((e = t.normal.x * this.min.x), (s = t.normal.x * this.max.x))
          : ((e = t.normal.x * this.max.x), (s = t.normal.x * this.min.x)),
        t.normal.y > 0
          ? ((e += t.normal.y * this.min.y), (s += t.normal.y * this.max.y))
          : ((e += t.normal.y * this.max.y), (s += t.normal.y * this.min.y)),
        t.normal.z > 0
          ? ((e += t.normal.z * this.min.z), (s += t.normal.z * this.max.z))
          : ((e += t.normal.z * this.max.z), (s += t.normal.z * this.min.z)),
        e <= -t.constant && s >= -t.constant
      );
    }
    intersectsTriangle(t) {
      if (this.isEmpty()) return !1;
      (this.getCenter(Ne),
        $e.subVectors(this.max, Ne),
        ge.subVectors(t.a, Ne),
        be.subVectors(t.b, Ne),
        we.subVectors(t.c, Ne),
        Jt.subVectors(be, ge),
        jt.subVectors(we, be),
        re.subVectors(ge, we));
      let e = [
        0,
        -Jt.z,
        Jt.y,
        0,
        -jt.z,
        jt.y,
        0,
        -re.z,
        re.y,
        Jt.z,
        0,
        -Jt.x,
        jt.z,
        0,
        -jt.x,
        re.z,
        0,
        -re.x,
        -Jt.y,
        Jt.x,
        0,
        -jt.y,
        jt.x,
        0,
        -re.y,
        re.x,
        0,
      ];
      return !Fs(e, ge, be, we, $e) ||
        ((e = [1, 0, 0, 0, 1, 0, 0, 0, 1]), !Fs(e, ge, be, we, $e))
        ? !1
        : (Ke.crossVectors(Jt, jt),
          (e = [Ke.x, Ke.y, Ke.z]),
          Fs(e, ge, be, we, $e));
    }
    clampPoint(t, e) {
      return e.copy(t).clamp(this.min, this.max);
    }
    distanceToPoint(t) {
      return this.clampPoint(t, St).distanceTo(t);
    }
    getBoundingSphere(t) {
      return (
        this.isEmpty()
          ? t.makeEmpty()
          : (this.getCenter(t.center),
            (t.radius = this.getSize(St).length() * 0.5)),
        t
      );
    }
    intersect(t) {
      return (
        this.min.max(t.min),
        this.max.min(t.max),
        this.isEmpty() && this.makeEmpty(),
        this
      );
    }
    union(t) {
      return (this.min.min(t.min), this.max.max(t.max), this);
    }
    applyMatrix4(t) {
      return this.isEmpty()
        ? this
        : (Nt[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t),
          Nt[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t),
          Nt[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t),
          Nt[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t),
          Nt[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t),
          Nt[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t),
          Nt[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t),
          Nt[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t),
          this.setFromPoints(Nt),
          this);
    }
    translate(t) {
      return (this.min.add(t), this.max.add(t), this);
    }
    equals(t) {
      return t.min.equals(this.min) && t.max.equals(this.max);
    }
  }
  const Nt = [
      new y(),
      new y(),
      new y(),
      new y(),
      new y(),
      new y(),
      new y(),
      new y(),
    ],
    St = new y(),
    Qe = new Ie(),
    ge = new y(),
    be = new y(),
    we = new y(),
    Jt = new y(),
    jt = new y(),
    re = new y(),
    Ne = new y(),
    $e = new y(),
    Ke = new y(),
    oe = new y();
  function Fs(r, t, e, s, n) {
    for (let i = 0, o = r.length - 3; i <= o; i += 3) {
      oe.fromArray(r, i);
      const a =
          n.x * Math.abs(oe.x) + n.y * Math.abs(oe.y) + n.z * Math.abs(oe.z),
        h = t.dot(oe),
        l = e.dot(oe),
        c = s.dot(oe);
      if (Math.max(-Math.max(h, l, c), Math.min(h, l, c)) > a) return !1;
    }
    return !0;
  }
  const er = new Ie(),
    Le = new y(),
    ks = new y();
  class sr {
    constructor(t = new y(), e = -1) {
      ((this.isSphere = !0), (this.center = t), (this.radius = e));
    }
    set(t, e) {
      return (this.center.copy(t), (this.radius = e), this);
    }
    setFromPoints(t, e) {
      const s = this.center;
      e !== void 0 ? s.copy(e) : er.setFromPoints(t).getCenter(s);
      let n = 0;
      for (let i = 0, o = t.length; i < o; i++)
        n = Math.max(n, s.distanceToSquared(t[i]));
      return ((this.radius = Math.sqrt(n)), this);
    }
    copy(t) {
      return (this.center.copy(t.center), (this.radius = t.radius), this);
    }
    isEmpty() {
      return this.radius < 0;
    }
    makeEmpty() {
      return (this.center.set(0, 0, 0), (this.radius = -1), this);
    }
    containsPoint(t) {
      return t.distanceToSquared(this.center) <= this.radius * this.radius;
    }
    distanceToPoint(t) {
      return t.distanceTo(this.center) - this.radius;
    }
    intersectsSphere(t) {
      const e = this.radius + t.radius;
      return t.center.distanceToSquared(this.center) <= e * e;
    }
    intersectsBox(t) {
      return t.intersectsSphere(this);
    }
    intersectsPlane(t) {
      return Math.abs(t.distanceToPoint(this.center)) <= this.radius;
    }
    clampPoint(t, e) {
      const s = this.center.distanceToSquared(t);
      return (
        e.copy(t),
        s > this.radius * this.radius &&
          (e.sub(this.center).normalize(),
          e.multiplyScalar(this.radius).add(this.center)),
        e
      );
    }
    getBoundingBox(t) {
      return this.isEmpty()
        ? (t.makeEmpty(), t)
        : (t.set(this.center, this.center), t.expandByScalar(this.radius), t);
    }
    applyMatrix4(t) {
      return (
        this.center.applyMatrix4(t),
        (this.radius = this.radius * t.getMaxScaleOnAxis()),
        this
      );
    }
    translate(t) {
      return (this.center.add(t), this);
    }
    expandByPoint(t) {
      if (this.isEmpty()) return (this.center.copy(t), (this.radius = 0), this);
      Le.subVectors(t, this.center);
      const e = Le.lengthSq();
      if (e > this.radius * this.radius) {
        const s = Math.sqrt(e),
          n = (s - this.radius) * 0.5;
        (this.center.addScaledVector(Le, n / s), (this.radius += n));
      }
      return this;
    }
    union(t) {
      return t.isEmpty()
        ? this
        : this.isEmpty()
          ? (this.copy(t), this)
          : (this.center.equals(t.center) === !0
              ? (this.radius = Math.max(this.radius, t.radius))
              : (ks.subVectors(t.center, this.center).setLength(t.radius),
                this.expandByPoint(Le.copy(t.center).add(ks)),
                this.expandByPoint(Le.copy(t.center).sub(ks))),
            this);
    }
    equals(t) {
      return t.center.equals(this.center) && t.radius === this.radius;
    }
    clone() {
      return new this.constructor().copy(this);
    }
  }
  class Ct {
    constructor(t, e, s, n, i, o, a, h, l, c, u, p, f, d, m, x) {
      ((Ct.prototype.isMatrix4 = !0),
        (this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
        t !== void 0 &&
          this.set(t, e, s, n, i, o, a, h, l, c, u, p, f, d, m, x));
    }
    set(t, e, s, n, i, o, a, h, l, c, u, p, f, d, m, x) {
      const b = this.elements;
      return (
        (b[0] = t),
        (b[4] = e),
        (b[8] = s),
        (b[12] = n),
        (b[1] = i),
        (b[5] = o),
        (b[9] = a),
        (b[13] = h),
        (b[2] = l),
        (b[6] = c),
        (b[10] = u),
        (b[14] = p),
        (b[3] = f),
        (b[7] = d),
        (b[11] = m),
        (b[15] = x),
        this
      );
    }
    identity() {
      return (this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this);
    }
    clone() {
      return new Ct().fromArray(this.elements);
    }
    copy(t) {
      const e = this.elements,
        s = t.elements;
      return (
        (e[0] = s[0]),
        (e[1] = s[1]),
        (e[2] = s[2]),
        (e[3] = s[3]),
        (e[4] = s[4]),
        (e[5] = s[5]),
        (e[6] = s[6]),
        (e[7] = s[7]),
        (e[8] = s[8]),
        (e[9] = s[9]),
        (e[10] = s[10]),
        (e[11] = s[11]),
        (e[12] = s[12]),
        (e[13] = s[13]),
        (e[14] = s[14]),
        (e[15] = s[15]),
        this
      );
    }
    copyPosition(t) {
      const e = this.elements,
        s = t.elements;
      return ((e[12] = s[12]), (e[13] = s[13]), (e[14] = s[14]), this);
    }
    setFromMatrix3(t) {
      const e = t.elements;
      return (
        this.set(
          e[0],
          e[3],
          e[6],
          0,
          e[1],
          e[4],
          e[7],
          0,
          e[2],
          e[5],
          e[8],
          0,
          0,
          0,
          0,
          1,
        ),
        this
      );
    }
    extractBasis(t, e, s) {
      return (
        t.setFromMatrixColumn(this, 0),
        e.setFromMatrixColumn(this, 1),
        s.setFromMatrixColumn(this, 2),
        this
      );
    }
    makeBasis(t, e, s) {
      return (
        this.set(
          t.x,
          e.x,
          s.x,
          0,
          t.y,
          e.y,
          s.y,
          0,
          t.z,
          e.z,
          s.z,
          0,
          0,
          0,
          0,
          1,
        ),
        this
      );
    }
    extractRotation(t) {
      const e = this.elements,
        s = t.elements,
        n = 1 / Me.setFromMatrixColumn(t, 0).length(),
        i = 1 / Me.setFromMatrixColumn(t, 1).length(),
        o = 1 / Me.setFromMatrixColumn(t, 2).length();
      return (
        (e[0] = s[0] * n),
        (e[1] = s[1] * n),
        (e[2] = s[2] * n),
        (e[3] = 0),
        (e[4] = s[4] * i),
        (e[5] = s[5] * i),
        (e[6] = s[6] * i),
        (e[7] = 0),
        (e[8] = s[8] * o),
        (e[9] = s[9] * o),
        (e[10] = s[10] * o),
        (e[11] = 0),
        (e[12] = 0),
        (e[13] = 0),
        (e[14] = 0),
        (e[15] = 1),
        this
      );
    }
    makeRotationFromEuler(t) {
      const e = this.elements,
        s = t.x,
        n = t.y,
        i = t.z,
        o = Math.cos(s),
        a = Math.sin(s),
        h = Math.cos(n),
        l = Math.sin(n),
        c = Math.cos(i),
        u = Math.sin(i);
      if (t.order === "XYZ") {
        const p = o * c,
          f = o * u,
          d = a * c,
          m = a * u;
        ((e[0] = h * c),
          (e[4] = -h * u),
          (e[8] = l),
          (e[1] = f + d * l),
          (e[5] = p - m * l),
          (e[9] = -a * h),
          (e[2] = m - p * l),
          (e[6] = d + f * l),
          (e[10] = o * h));
      } else if (t.order === "YXZ") {
        const p = h * c,
          f = h * u,
          d = l * c,
          m = l * u;
        ((e[0] = p + m * a),
          (e[4] = d * a - f),
          (e[8] = o * l),
          (e[1] = o * u),
          (e[5] = o * c),
          (e[9] = -a),
          (e[2] = f * a - d),
          (e[6] = m + p * a),
          (e[10] = o * h));
      } else if (t.order === "ZXY") {
        const p = h * c,
          f = h * u,
          d = l * c,
          m = l * u;
        ((e[0] = p - m * a),
          (e[4] = -o * u),
          (e[8] = d + f * a),
          (e[1] = f + d * a),
          (e[5] = o * c),
          (e[9] = m - p * a),
          (e[2] = -o * l),
          (e[6] = a),
          (e[10] = o * h));
      } else if (t.order === "ZYX") {
        const p = o * c,
          f = o * u,
          d = a * c,
          m = a * u;
        ((e[0] = h * c),
          (e[4] = d * l - f),
          (e[8] = p * l + m),
          (e[1] = h * u),
          (e[5] = m * l + p),
          (e[9] = f * l - d),
          (e[2] = -l),
          (e[6] = a * h),
          (e[10] = o * h));
      } else if (t.order === "YZX") {
        const p = o * h,
          f = o * l,
          d = a * h,
          m = a * l;
        ((e[0] = h * c),
          (e[4] = m - p * u),
          (e[8] = d * u + f),
          (e[1] = u),
          (e[5] = o * c),
          (e[9] = -a * c),
          (e[2] = -l * c),
          (e[6] = f * u + d),
          (e[10] = p - m * u));
      } else if (t.order === "XZY") {
        const p = o * h,
          f = o * l,
          d = a * h,
          m = a * l;
        ((e[0] = h * c),
          (e[4] = -u),
          (e[8] = l * c),
          (e[1] = p * u + m),
          (e[5] = o * c),
          (e[9] = f * u - d),
          (e[2] = d * u - f),
          (e[6] = a * c),
          (e[10] = m * u + p));
      }
      return (
        (e[3] = 0),
        (e[7] = 0),
        (e[11] = 0),
        (e[12] = 0),
        (e[13] = 0),
        (e[14] = 0),
        (e[15] = 1),
        this
      );
    }
    makeRotationFromQuaternion(t) {
      return this.compose(nr, t, ir);
    }
    lookAt(t, e, s) {
      const n = this.elements;
      return (
        wt.subVectors(t, e),
        wt.lengthSq() === 0 && (wt.z = 1),
        wt.normalize(),
        qt.crossVectors(s, wt),
        qt.lengthSq() === 0 &&
          (Math.abs(s.z) === 1 ? (wt.x += 1e-4) : (wt.z += 1e-4),
          wt.normalize(),
          qt.crossVectors(s, wt)),
        qt.normalize(),
        ts.crossVectors(wt, qt),
        (n[0] = qt.x),
        (n[4] = ts.x),
        (n[8] = wt.x),
        (n[1] = qt.y),
        (n[5] = ts.y),
        (n[9] = wt.y),
        (n[2] = qt.z),
        (n[6] = ts.z),
        (n[10] = wt.z),
        this
      );
    }
    multiply(t) {
      return this.multiplyMatrices(this, t);
    }
    premultiply(t) {
      return this.multiplyMatrices(t, this);
    }
    multiplyMatrices(t, e) {
      const s = t.elements,
        n = e.elements,
        i = this.elements,
        o = s[0],
        a = s[4],
        h = s[8],
        l = s[12],
        c = s[1],
        u = s[5],
        p = s[9],
        f = s[13],
        d = s[2],
        m = s[6],
        x = s[10],
        b = s[14],
        g = s[3],
        w = s[7],
        M = s[11],
        z = s[15],
        v = n[0],
        _ = n[4],
        A = n[8],
        C = n[12],
        S = n[1],
        F = n[5],
        I = n[9],
        R = n[13],
        N = n[2],
        Z = n[6],
        U = n[10],
        G = n[14],
        ht = n[3],
        J = n[7],
        q = n[11],
        Y = n[15];
      return (
        (i[0] = o * v + a * S + h * N + l * ht),
        (i[4] = o * _ + a * F + h * Z + l * J),
        (i[8] = o * A + a * I + h * U + l * q),
        (i[12] = o * C + a * R + h * G + l * Y),
        (i[1] = c * v + u * S + p * N + f * ht),
        (i[5] = c * _ + u * F + p * Z + f * J),
        (i[9] = c * A + u * I + p * U + f * q),
        (i[13] = c * C + u * R + p * G + f * Y),
        (i[2] = d * v + m * S + x * N + b * ht),
        (i[6] = d * _ + m * F + x * Z + b * J),
        (i[10] = d * A + m * I + x * U + b * q),
        (i[14] = d * C + m * R + x * G + b * Y),
        (i[3] = g * v + w * S + M * N + z * ht),
        (i[7] = g * _ + w * F + M * Z + z * J),
        (i[11] = g * A + w * I + M * U + z * q),
        (i[15] = g * C + w * R + M * G + z * Y),
        this
      );
    }
    multiplyScalar(t) {
      const e = this.elements;
      return (
        (e[0] *= t),
        (e[4] *= t),
        (e[8] *= t),
        (e[12] *= t),
        (e[1] *= t),
        (e[5] *= t),
        (e[9] *= t),
        (e[13] *= t),
        (e[2] *= t),
        (e[6] *= t),
        (e[10] *= t),
        (e[14] *= t),
        (e[3] *= t),
        (e[7] *= t),
        (e[11] *= t),
        (e[15] *= t),
        this
      );
    }
    determinant() {
      const t = this.elements,
        e = t[0],
        s = t[4],
        n = t[8],
        i = t[12],
        o = t[1],
        a = t[5],
        h = t[9],
        l = t[13],
        c = t[2],
        u = t[6],
        p = t[10],
        f = t[14],
        d = t[3],
        m = t[7],
        x = t[11],
        b = t[15];
      return (
        d *
          (+i * h * u -
            n * l * u -
            i * a * p +
            s * l * p +
            n * a * f -
            s * h * f) +
        m *
          (+e * h * f -
            e * l * p +
            i * o * p -
            n * o * f +
            n * l * c -
            i * h * c) +
        x *
          (+e * l * u -
            e * a * f -
            i * o * u +
            s * o * f +
            i * a * c -
            s * l * c) +
        b *
          (-n * a * c -
            e * h * u +
            e * a * p +
            n * o * u -
            s * o * p +
            s * h * c)
      );
    }
    transpose() {
      const t = this.elements;
      let e;
      return (
        (e = t[1]),
        (t[1] = t[4]),
        (t[4] = e),
        (e = t[2]),
        (t[2] = t[8]),
        (t[8] = e),
        (e = t[6]),
        (t[6] = t[9]),
        (t[9] = e),
        (e = t[3]),
        (t[3] = t[12]),
        (t[12] = e),
        (e = t[7]),
        (t[7] = t[13]),
        (t[13] = e),
        (e = t[11]),
        (t[11] = t[14]),
        (t[14] = e),
        this
      );
    }
    setPosition(t, e, s) {
      const n = this.elements;
      return (
        t.isVector3
          ? ((n[12] = t.x), (n[13] = t.y), (n[14] = t.z))
          : ((n[12] = t), (n[13] = e), (n[14] = s)),
        this
      );
    }
    invert() {
      const t = this.elements,
        e = t[0],
        s = t[1],
        n = t[2],
        i = t[3],
        o = t[4],
        a = t[5],
        h = t[6],
        l = t[7],
        c = t[8],
        u = t[9],
        p = t[10],
        f = t[11],
        d = t[12],
        m = t[13],
        x = t[14],
        b = t[15],
        g =
          u * x * l - m * p * l + m * h * f - a * x * f - u * h * b + a * p * b,
        w =
          d * p * l - c * x * l - d * h * f + o * x * f + c * h * b - o * p * b,
        M =
          c * m * l - d * u * l + d * a * f - o * m * f - c * a * b + o * u * b,
        z =
          d * u * h - c * m * h - d * a * p + o * m * p + c * a * x - o * u * x,
        v = e * g + s * w + n * M + i * z;
      if (v === 0)
        return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      const _ = 1 / v;
      return (
        (t[0] = g * _),
        (t[1] =
          (m * p * i -
            u * x * i -
            m * n * f +
            s * x * f +
            u * n * b -
            s * p * b) *
          _),
        (t[2] =
          (a * x * i -
            m * h * i +
            m * n * l -
            s * x * l -
            a * n * b +
            s * h * b) *
          _),
        (t[3] =
          (u * h * i -
            a * p * i -
            u * n * l +
            s * p * l +
            a * n * f -
            s * h * f) *
          _),
        (t[4] = w * _),
        (t[5] =
          (c * x * i -
            d * p * i +
            d * n * f -
            e * x * f -
            c * n * b +
            e * p * b) *
          _),
        (t[6] =
          (d * h * i -
            o * x * i -
            d * n * l +
            e * x * l +
            o * n * b -
            e * h * b) *
          _),
        (t[7] =
          (o * p * i -
            c * h * i +
            c * n * l -
            e * p * l -
            o * n * f +
            e * h * f) *
          _),
        (t[8] = M * _),
        (t[9] =
          (d * u * i -
            c * m * i -
            d * s * f +
            e * m * f +
            c * s * b -
            e * u * b) *
          _),
        (t[10] =
          (o * m * i -
            d * a * i +
            d * s * l -
            e * m * l -
            o * s * b +
            e * a * b) *
          _),
        (t[11] =
          (c * a * i -
            o * u * i -
            c * s * l +
            e * u * l +
            o * s * f -
            e * a * f) *
          _),
        (t[12] = z * _),
        (t[13] =
          (c * m * n -
            d * u * n +
            d * s * p -
            e * m * p -
            c * s * x +
            e * u * x) *
          _),
        (t[14] =
          (d * a * n -
            o * m * n -
            d * s * h +
            e * m * h +
            o * s * x -
            e * a * x) *
          _),
        (t[15] =
          (o * u * n -
            c * a * n +
            c * s * h -
            e * u * h -
            o * s * p +
            e * a * p) *
          _),
        this
      );
    }
    scale(t) {
      const e = this.elements,
        s = t.x,
        n = t.y,
        i = t.z;
      return (
        (e[0] *= s),
        (e[4] *= n),
        (e[8] *= i),
        (e[1] *= s),
        (e[5] *= n),
        (e[9] *= i),
        (e[2] *= s),
        (e[6] *= n),
        (e[10] *= i),
        (e[3] *= s),
        (e[7] *= n),
        (e[11] *= i),
        this
      );
    }
    getMaxScaleOnAxis() {
      const t = this.elements,
        e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2],
        s = t[4] * t[4] + t[5] * t[5] + t[6] * t[6],
        n = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
      return Math.sqrt(Math.max(e, s, n));
    }
    makeTranslation(t, e, s) {
      return (
        t.isVector3
          ? this.set(1, 0, 0, t.x, 0, 1, 0, t.y, 0, 0, 1, t.z, 0, 0, 0, 1)
          : this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, s, 0, 0, 0, 1),
        this
      );
    }
    makeRotationX(t) {
      const e = Math.cos(t),
        s = Math.sin(t);
      return (this.set(1, 0, 0, 0, 0, e, -s, 0, 0, s, e, 0, 0, 0, 0, 1), this);
    }
    makeRotationY(t) {
      const e = Math.cos(t),
        s = Math.sin(t);
      return (this.set(e, 0, s, 0, 0, 1, 0, 0, -s, 0, e, 0, 0, 0, 0, 1), this);
    }
    makeRotationZ(t) {
      const e = Math.cos(t),
        s = Math.sin(t);
      return (this.set(e, -s, 0, 0, s, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this);
    }
    makeRotationAxis(t, e) {
      const s = Math.cos(e),
        n = Math.sin(e),
        i = 1 - s,
        o = t.x,
        a = t.y,
        h = t.z,
        l = i * o,
        c = i * a;
      return (
        this.set(
          l * o + s,
          l * a - n * h,
          l * h + n * a,
          0,
          l * a + n * h,
          c * a + s,
          c * h - n * o,
          0,
          l * h - n * a,
          c * h + n * o,
          i * h * h + s,
          0,
          0,
          0,
          0,
          1,
        ),
        this
      );
    }
    makeScale(t, e, s) {
      return (this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, s, 0, 0, 0, 0, 1), this);
    }
    makeShear(t, e, s, n, i, o) {
      return (this.set(1, s, i, 0, t, 1, o, 0, e, n, 1, 0, 0, 0, 0, 1), this);
    }
    compose(t, e, s) {
      const n = this.elements,
        i = e._x,
        o = e._y,
        a = e._z,
        h = e._w,
        l = i + i,
        c = o + o,
        u = a + a,
        p = i * l,
        f = i * c,
        d = i * u,
        m = o * c,
        x = o * u,
        b = a * u,
        g = h * l,
        w = h * c,
        M = h * u,
        z = s.x,
        v = s.y,
        _ = s.z;
      return (
        (n[0] = (1 - (m + b)) * z),
        (n[1] = (f + M) * z),
        (n[2] = (d - w) * z),
        (n[3] = 0),
        (n[4] = (f - M) * v),
        (n[5] = (1 - (p + b)) * v),
        (n[6] = (x + g) * v),
        (n[7] = 0),
        (n[8] = (d + w) * _),
        (n[9] = (x - g) * _),
        (n[10] = (1 - (p + m)) * _),
        (n[11] = 0),
        (n[12] = t.x),
        (n[13] = t.y),
        (n[14] = t.z),
        (n[15] = 1),
        this
      );
    }
    decompose(t, e, s) {
      const n = this.elements;
      let i = Me.set(n[0], n[1], n[2]).length();
      const o = Me.set(n[4], n[5], n[6]).length(),
        a = Me.set(n[8], n[9], n[10]).length();
      (this.determinant() < 0 && (i = -i),
        (t.x = n[12]),
        (t.y = n[13]),
        (t.z = n[14]),
        Et.copy(this));
      const l = 1 / i,
        c = 1 / o,
        u = 1 / a;
      return (
        (Et.elements[0] *= l),
        (Et.elements[1] *= l),
        (Et.elements[2] *= l),
        (Et.elements[4] *= c),
        (Et.elements[5] *= c),
        (Et.elements[6] *= c),
        (Et.elements[8] *= u),
        (Et.elements[9] *= u),
        (Et.elements[10] *= u),
        e.setFromRotationMatrix(Et),
        (s.x = i),
        (s.y = o),
        (s.z = a),
        this
      );
    }
    makePerspective(t, e, s, n, i, o, a = 2e3) {
      const h = this.elements,
        l = (2 * i) / (e - t),
        c = (2 * i) / (s - n),
        u = (e + t) / (e - t),
        p = (s + n) / (s - n);
      let f, d;
      if (a === 2e3) ((f = -(o + i) / (o - i)), (d = (-2 * o * i) / (o - i)));
      else if (a === 2001) ((f = -o / (o - i)), (d = (-o * i) / (o - i)));
      else
        throw new Error(
          "THREE.Matrix4.makePerspective(): Invalid coordinate system: " + a,
        );
      return (
        (h[0] = l),
        (h[4] = 0),
        (h[8] = u),
        (h[12] = 0),
        (h[1] = 0),
        (h[5] = c),
        (h[9] = p),
        (h[13] = 0),
        (h[2] = 0),
        (h[6] = 0),
        (h[10] = f),
        (h[14] = d),
        (h[3] = 0),
        (h[7] = 0),
        (h[11] = -1),
        (h[15] = 0),
        this
      );
    }
    makeOrthographic(t, e, s, n, i, o, a = 2e3) {
      const h = this.elements,
        l = 1 / (e - t),
        c = 1 / (s - n),
        u = 1 / (o - i),
        p = (e + t) * l,
        f = (s + n) * c;
      let d, m;
      if (a === 2e3) ((d = (o + i) * u), (m = -2 * u));
      else if (a === 2001) ((d = i * u), (m = -1 * u));
      else
        throw new Error(
          "THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + a,
        );
      return (
        (h[0] = 2 * l),
        (h[4] = 0),
        (h[8] = 0),
        (h[12] = -p),
        (h[1] = 0),
        (h[5] = 2 * c),
        (h[9] = 0),
        (h[13] = -f),
        (h[2] = 0),
        (h[6] = 0),
        (h[10] = m),
        (h[14] = -d),
        (h[3] = 0),
        (h[7] = 0),
        (h[11] = 0),
        (h[15] = 1),
        this
      );
    }
    equals(t) {
      const e = this.elements,
        s = t.elements;
      for (let n = 0; n < 16; n++) if (e[n] !== s[n]) return !1;
      return !0;
    }
    fromArray(t, e = 0) {
      for (let s = 0; s < 16; s++) this.elements[s] = t[s + e];
      return this;
    }
    toArray(t = [], e = 0) {
      const s = this.elements;
      return (
        (t[e] = s[0]),
        (t[e + 1] = s[1]),
        (t[e + 2] = s[2]),
        (t[e + 3] = s[3]),
        (t[e + 4] = s[4]),
        (t[e + 5] = s[5]),
        (t[e + 6] = s[6]),
        (t[e + 7] = s[7]),
        (t[e + 8] = s[8]),
        (t[e + 9] = s[9]),
        (t[e + 10] = s[10]),
        (t[e + 11] = s[11]),
        (t[e + 12] = s[12]),
        (t[e + 13] = s[13]),
        (t[e + 14] = s[14]),
        (t[e + 15] = s[15]),
        t
      );
    }
  }
  const Me = new y(),
    Et = new Ct(),
    nr = new y(0, 0, 0),
    ir = new y(1, 1, 1),
    qt = new y(),
    ts = new y(),
    wt = new y(),
    _n = new Ct(),
    Sn = new _t();
  class es {
    constructor(t = 0, e = 0, s = 0, n = es.DEFAULT_ORDER) {
      ((this.isEuler = !0),
        (this._x = t),
        (this._y = e),
        (this._z = s),
        (this._order = n));
    }
    get x() {
      return this._x;
    }
    set x(t) {
      ((this._x = t), this._onChangeCallback());
    }
    get y() {
      return this._y;
    }
    set y(t) {
      ((this._y = t), this._onChangeCallback());
    }
    get z() {
      return this._z;
    }
    set z(t) {
      ((this._z = t), this._onChangeCallback());
    }
    get order() {
      return this._order;
    }
    set order(t) {
      ((this._order = t), this._onChangeCallback());
    }
    set(t, e, s, n = this._order) {
      return (
        (this._x = t),
        (this._y = e),
        (this._z = s),
        (this._order = n),
        this._onChangeCallback(),
        this
      );
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._order);
    }
    copy(t) {
      return (
        (this._x = t._x),
        (this._y = t._y),
        (this._z = t._z),
        (this._order = t._order),
        this._onChangeCallback(),
        this
      );
    }
    setFromRotationMatrix(t, e = this._order, s = !0) {
      const n = t.elements,
        i = n[0],
        o = n[4],
        a = n[8],
        h = n[1],
        l = n[5],
        c = n[9],
        u = n[2],
        p = n[6],
        f = n[10];
      switch (e) {
        case "XYZ":
          ((this._y = Math.asin(H(a, -1, 1))),
            Math.abs(a) < 0.9999999
              ? ((this._x = Math.atan2(-c, f)), (this._z = Math.atan2(-o, i)))
              : ((this._x = Math.atan2(p, l)), (this._z = 0)));
          break;
        case "YXZ":
          ((this._x = Math.asin(-H(c, -1, 1))),
            Math.abs(c) < 0.9999999
              ? ((this._y = Math.atan2(a, f)), (this._z = Math.atan2(h, l)))
              : ((this._y = Math.atan2(-u, i)), (this._z = 0)));
          break;
        case "ZXY":
          ((this._x = Math.asin(H(p, -1, 1))),
            Math.abs(p) < 0.9999999
              ? ((this._y = Math.atan2(-u, f)), (this._z = Math.atan2(-o, l)))
              : ((this._y = 0), (this._z = Math.atan2(h, i))));
          break;
        case "ZYX":
          ((this._y = Math.asin(-H(u, -1, 1))),
            Math.abs(u) < 0.9999999
              ? ((this._x = Math.atan2(p, f)), (this._z = Math.atan2(h, i)))
              : ((this._x = 0), (this._z = Math.atan2(-o, l))));
          break;
        case "YZX":
          ((this._z = Math.asin(H(h, -1, 1))),
            Math.abs(h) < 0.9999999
              ? ((this._x = Math.atan2(-c, l)), (this._y = Math.atan2(-u, i)))
              : ((this._x = 0), (this._y = Math.atan2(a, f))));
          break;
        case "XZY":
          ((this._z = Math.asin(-H(o, -1, 1))),
            Math.abs(o) < 0.9999999
              ? ((this._x = Math.atan2(p, l)), (this._y = Math.atan2(a, i)))
              : ((this._x = Math.atan2(-c, f)), (this._y = 0)));
          break;
        default:
          console.warn(
            "THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " +
              e,
          );
      }
      return ((this._order = e), s === !0 && this._onChangeCallback(), this);
    }
    setFromQuaternion(t, e, s) {
      return (
        _n.makeRotationFromQuaternion(t),
        this.setFromRotationMatrix(_n, e, s)
      );
    }
    setFromVector3(t, e = this._order) {
      return this.set(t.x, t.y, t.z, e);
    }
    reorder(t) {
      return (Sn.setFromEuler(this), this.setFromQuaternion(Sn, t));
    }
    equals(t) {
      return (
        t._x === this._x &&
        t._y === this._y &&
        t._z === this._z &&
        t._order === this._order
      );
    }
    fromArray(t) {
      return (
        (this._x = t[0]),
        (this._y = t[1]),
        (this._z = t[2]),
        t[3] !== void 0 && (this._order = t[3]),
        this._onChangeCallback(),
        this
      );
    }
    toArray(t = [], e = 0) {
      return (
        (t[e] = this._x),
        (t[e + 1] = this._y),
        (t[e + 2] = this._z),
        (t[e + 3] = this._order),
        t
      );
    }
    _onChange(t) {
      return ((this._onChangeCallback = t), this);
    }
    _onChangeCallback() {}
    *[Symbol.iterator]() {
      (yield this._x, yield this._y, yield this._z, yield this._order);
    }
  }
  es.DEFAULT_ORDER = "XYZ";
  class rr {
    constructor() {
      this.mask = 1;
    }
    set(t) {
      this.mask = ((1 << t) | 0) >>> 0;
    }
    enable(t) {
      this.mask |= (1 << t) | 0;
    }
    enableAll() {
      this.mask = -1;
    }
    toggle(t) {
      this.mask ^= (1 << t) | 0;
    }
    disable(t) {
      this.mask &= ~((1 << t) | 0);
    }
    disableAll() {
      this.mask = 0;
    }
    test(t) {
      return (this.mask & t.mask) !== 0;
    }
    isEnabled(t) {
      return (this.mask & ((1 << t) | 0)) !== 0;
    }
  }
  let or = 0;
  const Cn = new y(),
    ze = new _t(),
    Lt = new Ct(),
    ss = new y(),
    De = new y(),
    ar = new y(),
    hr = new _t(),
    En = new y(1, 0, 0),
    Fn = new y(0, 1, 0),
    kn = new y(0, 0, 1),
    Pn = { type: "added" },
    cr = { type: "removed" },
    Ae = { type: "childadded", child: null },
    Ps = { type: "childremoved", child: null };
  class Qt extends vs {
    constructor() {
      (super(),
        (this.isObject3D = !0),
        Object.defineProperty(this, "id", { value: or++ }),
        (this.uuid = de()),
        (this.name = ""),
        (this.type = "Object3D"),
        (this.parent = null),
        (this.children = []),
        (this.up = Qt.DEFAULT_UP.clone()));
      const t = new y(),
        e = new es(),
        s = new _t(),
        n = new y(1, 1, 1);
      function i() {
        s.setFromEuler(e, !1);
      }
      function o() {
        e.setFromQuaternion(s, void 0, !1);
      }
      (e._onChange(i),
        s._onChange(o),
        Object.defineProperties(this, {
          position: { configurable: !0, enumerable: !0, value: t },
          rotation: { configurable: !0, enumerable: !0, value: e },
          quaternion: { configurable: !0, enumerable: !0, value: s },
          scale: { configurable: !0, enumerable: !0, value: n },
          modelViewMatrix: { value: new Ct() },
          normalMatrix: { value: new Wt() },
        }),
        (this.matrix = new Ct()),
        (this.matrixWorld = new Ct()),
        (this.matrixAutoUpdate = Qt.DEFAULT_MATRIX_AUTO_UPDATE),
        (this.matrixWorldAutoUpdate = Qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE),
        (this.matrixWorldNeedsUpdate = !1),
        (this.layers = new rr()),
        (this.visible = !0),
        (this.castShadow = !1),
        (this.receiveShadow = !1),
        (this.frustumCulled = !0),
        (this.renderOrder = 0),
        (this.animations = []),
        (this.userData = {}));
    }
    onBeforeShadow() {}
    onAfterShadow() {}
    onBeforeRender() {}
    onAfterRender() {}
    applyMatrix4(t) {
      (this.matrixAutoUpdate && this.updateMatrix(),
        this.matrix.premultiply(t),
        this.matrix.decompose(this.position, this.quaternion, this.scale));
    }
    applyQuaternion(t) {
      return (this.quaternion.premultiply(t), this);
    }
    setRotationFromAxisAngle(t, e) {
      this.quaternion.setFromAxisAngle(t, e);
    }
    setRotationFromEuler(t) {
      this.quaternion.setFromEuler(t, !0);
    }
    setRotationFromMatrix(t) {
      this.quaternion.setFromRotationMatrix(t);
    }
    setRotationFromQuaternion(t) {
      this.quaternion.copy(t);
    }
    rotateOnAxis(t, e) {
      return (ze.setFromAxisAngle(t, e), this.quaternion.multiply(ze), this);
    }
    rotateOnWorldAxis(t, e) {
      return (ze.setFromAxisAngle(t, e), this.quaternion.premultiply(ze), this);
    }
    rotateX(t) {
      return this.rotateOnAxis(En, t);
    }
    rotateY(t) {
      return this.rotateOnAxis(Fn, t);
    }
    rotateZ(t) {
      return this.rotateOnAxis(kn, t);
    }
    translateOnAxis(t, e) {
      return (
        Cn.copy(t).applyQuaternion(this.quaternion),
        this.position.add(Cn.multiplyScalar(e)),
        this
      );
    }
    translateX(t) {
      return this.translateOnAxis(En, t);
    }
    translateY(t) {
      return this.translateOnAxis(Fn, t);
    }
    translateZ(t) {
      return this.translateOnAxis(kn, t);
    }
    localToWorld(t) {
      return (this.updateWorldMatrix(!0, !1), t.applyMatrix4(this.matrixWorld));
    }
    worldToLocal(t) {
      return (
        this.updateWorldMatrix(!0, !1),
        t.applyMatrix4(Lt.copy(this.matrixWorld).invert())
      );
    }
    lookAt(t, e, s) {
      t.isVector3 ? ss.copy(t) : ss.set(t, e, s);
      const n = this.parent;
      (this.updateWorldMatrix(!0, !1),
        De.setFromMatrixPosition(this.matrixWorld),
        this.isCamera || this.isLight
          ? Lt.lookAt(De, ss, this.up)
          : Lt.lookAt(ss, De, this.up),
        this.quaternion.setFromRotationMatrix(Lt),
        n &&
          (Lt.extractRotation(n.matrixWorld),
          ze.setFromRotationMatrix(Lt),
          this.quaternion.premultiply(ze.invert())));
    }
    add(t) {
      if (arguments.length > 1) {
        for (let e = 0; e < arguments.length; e++) this.add(arguments[e]);
        return this;
      }
      return t === this
        ? (console.error(
            "THREE.Object3D.add: object can't be added as a child of itself.",
            t,
          ),
          this)
        : (t && t.isObject3D
            ? (t.removeFromParent(),
              (t.parent = this),
              this.children.push(t),
              t.dispatchEvent(Pn),
              (Ae.child = t),
              this.dispatchEvent(Ae),
              (Ae.child = null))
            : console.error(
                "THREE.Object3D.add: object not an instance of THREE.Object3D.",
                t,
              ),
          this);
    }
    remove(t) {
      if (arguments.length > 1) {
        for (let s = 0; s < arguments.length; s++) this.remove(arguments[s]);
        return this;
      }
      const e = this.children.indexOf(t);
      return (
        e !== -1 &&
          ((t.parent = null),
          this.children.splice(e, 1),
          t.dispatchEvent(cr),
          (Ps.child = t),
          this.dispatchEvent(Ps),
          (Ps.child = null)),
        this
      );
    }
    removeFromParent() {
      const t = this.parent;
      return (t !== null && t.remove(this), this);
    }
    clear() {
      return this.remove(...this.children);
    }
    attach(t) {
      return (
        this.updateWorldMatrix(!0, !1),
        Lt.copy(this.matrixWorld).invert(),
        t.parent !== null &&
          (t.parent.updateWorldMatrix(!0, !1),
          Lt.multiply(t.parent.matrixWorld)),
        t.applyMatrix4(Lt),
        t.removeFromParent(),
        (t.parent = this),
        this.children.push(t),
        t.updateWorldMatrix(!1, !0),
        t.dispatchEvent(Pn),
        (Ae.child = t),
        this.dispatchEvent(Ae),
        (Ae.child = null),
        this
      );
    }
    getObjectById(t) {
      return this.getObjectByProperty("id", t);
    }
    getObjectByName(t) {
      return this.getObjectByProperty("name", t);
    }
    getObjectByProperty(t, e) {
      if (this[t] === e) return this;
      for (let s = 0, n = this.children.length; s < n; s++) {
        const o = this.children[s].getObjectByProperty(t, e);
        if (o !== void 0) return o;
      }
    }
    getObjectsByProperty(t, e, s = []) {
      this[t] === e && s.push(this);
      const n = this.children;
      for (let i = 0, o = n.length; i < o; i++)
        n[i].getObjectsByProperty(t, e, s);
      return s;
    }
    getWorldPosition(t) {
      return (
        this.updateWorldMatrix(!0, !1),
        t.setFromMatrixPosition(this.matrixWorld)
      );
    }
    getWorldQuaternion(t) {
      return (
        this.updateWorldMatrix(!0, !1),
        this.matrixWorld.decompose(De, t, ar),
        t
      );
    }
    getWorldScale(t) {
      return (
        this.updateWorldMatrix(!0, !1),
        this.matrixWorld.decompose(De, hr, t),
        t
      );
    }
    getWorldDirection(t) {
      this.updateWorldMatrix(!0, !1);
      const e = this.matrixWorld.elements;
      return t.set(e[8], e[9], e[10]).normalize();
    }
    raycast() {}
    traverse(t) {
      t(this);
      const e = this.children;
      for (let s = 0, n = e.length; s < n; s++) e[s].traverse(t);
    }
    traverseVisible(t) {
      if (this.visible === !1) return;
      t(this);
      const e = this.children;
      for (let s = 0, n = e.length; s < n; s++) e[s].traverseVisible(t);
    }
    traverseAncestors(t) {
      const e = this.parent;
      e !== null && (t(e), e.traverseAncestors(t));
    }
    updateMatrix() {
      (this.matrix.compose(this.position, this.quaternion, this.scale),
        (this.matrixWorldNeedsUpdate = !0));
    }
    updateMatrixWorld(t) {
      (this.matrixAutoUpdate && this.updateMatrix(),
        (this.matrixWorldNeedsUpdate || t) &&
          (this.matrixWorldAutoUpdate === !0 &&
            (this.parent === null
              ? this.matrixWorld.copy(this.matrix)
              : this.matrixWorld.multiplyMatrices(
                  this.parent.matrixWorld,
                  this.matrix,
                )),
          (this.matrixWorldNeedsUpdate = !1),
          (t = !0)));
      const e = this.children;
      for (let s = 0, n = e.length; s < n; s++) e[s].updateMatrixWorld(t);
    }
    updateWorldMatrix(t, e) {
      const s = this.parent;
      if (
        (t === !0 && s !== null && s.updateWorldMatrix(!0, !1),
        this.matrixAutoUpdate && this.updateMatrix(),
        this.matrixWorldAutoUpdate === !0 &&
          (this.parent === null
            ? this.matrixWorld.copy(this.matrix)
            : this.matrixWorld.multiplyMatrices(
                this.parent.matrixWorld,
                this.matrix,
              )),
        e === !0)
      ) {
        const n = this.children;
        for (let i = 0, o = n.length; i < o; i++)
          n[i].updateWorldMatrix(!1, !0);
      }
    }
    toJSON(t) {
      const e = t === void 0 || typeof t == "string",
        s = {};
      e &&
        ((t = {
          geometries: {},
          materials: {},
          textures: {},
          images: {},
          shapes: {},
          skeletons: {},
          animations: {},
          nodes: {},
        }),
        (s.metadata = {
          version: 4.6,
          type: "Object",
          generator: "Object3D.toJSON",
        }));
      const n = {};
      ((n.uuid = this.uuid),
        (n.type = this.type),
        this.name !== "" && (n.name = this.name),
        this.castShadow === !0 && (n.castShadow = !0),
        this.receiveShadow === !0 && (n.receiveShadow = !0),
        this.visible === !1 && (n.visible = !1),
        this.frustumCulled === !1 && (n.frustumCulled = !1),
        this.renderOrder !== 0 && (n.renderOrder = this.renderOrder),
        Object.keys(this.userData).length > 0 && (n.userData = this.userData),
        (n.layers = this.layers.mask),
        (n.matrix = this.matrix.toArray()),
        (n.up = this.up.toArray()),
        this.matrixAutoUpdate === !1 && (n.matrixAutoUpdate = !1),
        this.isInstancedMesh &&
          ((n.type = "InstancedMesh"),
          (n.count = this.count),
          (n.instanceMatrix = this.instanceMatrix.toJSON()),
          this.instanceColor !== null &&
            (n.instanceColor = this.instanceColor.toJSON())),
        this.isBatchedMesh &&
          ((n.type = "BatchedMesh"),
          (n.perObjectFrustumCulled = this.perObjectFrustumCulled),
          (n.sortObjects = this.sortObjects),
          (n.drawRanges = this._drawRanges),
          (n.reservedRanges = this._reservedRanges),
          (n.visibility = this._visibility),
          (n.active = this._active),
          (n.bounds = this._bounds.map((a) => ({
            boxInitialized: a.boxInitialized,
            boxMin: a.box.min.toArray(),
            boxMax: a.box.max.toArray(),
            sphereInitialized: a.sphereInitialized,
            sphereRadius: a.sphere.radius,
            sphereCenter: a.sphere.center.toArray(),
          }))),
          (n.maxInstanceCount = this._maxInstanceCount),
          (n.maxVertexCount = this._maxVertexCount),
          (n.maxIndexCount = this._maxIndexCount),
          (n.geometryInitialized = this._geometryInitialized),
          (n.geometryCount = this._geometryCount),
          (n.matricesTexture = this._matricesTexture.toJSON(t)),
          this._colorsTexture !== null &&
            (n.colorsTexture = this._colorsTexture.toJSON(t)),
          this.boundingSphere !== null &&
            (n.boundingSphere = {
              center: n.boundingSphere.center.toArray(),
              radius: n.boundingSphere.radius,
            }),
          this.boundingBox !== null &&
            (n.boundingBox = {
              min: n.boundingBox.min.toArray(),
              max: n.boundingBox.max.toArray(),
            })));
      function i(a, h) {
        return (a[h.uuid] === void 0 && (a[h.uuid] = h.toJSON(t)), h.uuid);
      }
      if (this.isScene)
        (this.background &&
          (this.background.isColor
            ? (n.background = this.background.toJSON())
            : this.background.isTexture &&
              (n.background = this.background.toJSON(t).uuid)),
          this.environment &&
            this.environment.isTexture &&
            this.environment.isRenderTargetTexture !== !0 &&
            (n.environment = this.environment.toJSON(t).uuid));
      else if (this.isMesh || this.isLine || this.isPoints) {
        n.geometry = i(t.geometries, this.geometry);
        const a = this.geometry.parameters;
        if (a !== void 0 && a.shapes !== void 0) {
          const h = a.shapes;
          if (Array.isArray(h))
            for (let l = 0, c = h.length; l < c; l++) {
              const u = h[l];
              i(t.shapes, u);
            }
          else i(t.shapes, h);
        }
      }
      if (
        (this.isSkinnedMesh &&
          ((n.bindMode = this.bindMode),
          (n.bindMatrix = this.bindMatrix.toArray()),
          this.skeleton !== void 0 &&
            (i(t.skeletons, this.skeleton), (n.skeleton = this.skeleton.uuid))),
        this.material !== void 0)
      )
        if (Array.isArray(this.material)) {
          const a = [];
          for (let h = 0, l = this.material.length; h < l; h++)
            a.push(i(t.materials, this.material[h]));
          n.material = a;
        } else n.material = i(t.materials, this.material);
      if (this.children.length > 0) {
        n.children = [];
        for (let a = 0; a < this.children.length; a++)
          n.children.push(this.children[a].toJSON(t).object);
      }
      if (this.animations.length > 0) {
        n.animations = [];
        for (let a = 0; a < this.animations.length; a++) {
          const h = this.animations[a];
          n.animations.push(i(t.animations, h));
        }
      }
      if (e) {
        const a = o(t.geometries),
          h = o(t.materials),
          l = o(t.textures),
          c = o(t.images),
          u = o(t.shapes),
          p = o(t.skeletons),
          f = o(t.animations),
          d = o(t.nodes);
        (a.length > 0 && (s.geometries = a),
          h.length > 0 && (s.materials = h),
          l.length > 0 && (s.textures = l),
          c.length > 0 && (s.images = c),
          u.length > 0 && (s.shapes = u),
          p.length > 0 && (s.skeletons = p),
          f.length > 0 && (s.animations = f),
          d.length > 0 && (s.nodes = d));
      }
      return ((s.object = n), s);
      function o(a) {
        const h = [];
        for (const l in a) {
          const c = a[l];
          (delete c.metadata, h.push(c));
        }
        return h;
      }
    }
    clone(t) {
      return new this.constructor().copy(this, t);
    }
    copy(t, e = !0) {
      if (
        ((this.name = t.name),
        this.up.copy(t.up),
        this.position.copy(t.position),
        (this.rotation.order = t.rotation.order),
        this.quaternion.copy(t.quaternion),
        this.scale.copy(t.scale),
        this.matrix.copy(t.matrix),
        this.matrixWorld.copy(t.matrixWorld),
        (this.matrixAutoUpdate = t.matrixAutoUpdate),
        (this.matrixWorldAutoUpdate = t.matrixWorldAutoUpdate),
        (this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate),
        (this.layers.mask = t.layers.mask),
        (this.visible = t.visible),
        (this.castShadow = t.castShadow),
        (this.receiveShadow = t.receiveShadow),
        (this.frustumCulled = t.frustumCulled),
        (this.renderOrder = t.renderOrder),
        (this.animations = t.animations.slice()),
        (this.userData = JSON.parse(JSON.stringify(t.userData))),
        e === !0)
      )
        for (let s = 0; s < t.children.length; s++) {
          const n = t.children[s];
          this.add(n.clone());
        }
      return this;
    }
  }
  ((Qt.DEFAULT_UP = new y(0, 1, 0)),
    (Qt.DEFAULT_MATRIX_AUTO_UPDATE = !0),
    (Qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0));
  const Tn = {
      aliceblue: 15792383,
      antiquewhite: 16444375,
      aqua: 65535,
      aquamarine: 8388564,
      azure: 15794175,
      beige: 16119260,
      bisque: 16770244,
      black: 0,
      blanchedalmond: 16772045,
      blue: 255,
      blueviolet: 9055202,
      brown: 10824234,
      burlywood: 14596231,
      cadetblue: 6266528,
      chartreuse: 8388352,
      chocolate: 13789470,
      coral: 16744272,
      cornflowerblue: 6591981,
      cornsilk: 16775388,
      crimson: 14423100,
      cyan: 65535,
      darkblue: 139,
      darkcyan: 35723,
      darkgoldenrod: 12092939,
      darkgray: 11119017,
      darkgreen: 25600,
      darkgrey: 11119017,
      darkkhaki: 12433259,
      darkmagenta: 9109643,
      darkolivegreen: 5597999,
      darkorange: 16747520,
      darkorchid: 10040012,
      darkred: 9109504,
      darksalmon: 15308410,
      darkseagreen: 9419919,
      darkslateblue: 4734347,
      darkslategray: 3100495,
      darkslategrey: 3100495,
      darkturquoise: 52945,
      darkviolet: 9699539,
      deeppink: 16716947,
      deepskyblue: 49151,
      dimgray: 6908265,
      dimgrey: 6908265,
      dodgerblue: 2003199,
      firebrick: 11674146,
      floralwhite: 16775920,
      forestgreen: 2263842,
      fuchsia: 16711935,
      gainsboro: 14474460,
      ghostwhite: 16316671,
      gold: 16766720,
      goldenrod: 14329120,
      gray: 8421504,
      green: 32768,
      greenyellow: 11403055,
      grey: 8421504,
      honeydew: 15794160,
      hotpink: 16738740,
      indianred: 13458524,
      indigo: 4915330,
      ivory: 16777200,
      khaki: 15787660,
      lavender: 15132410,
      lavenderblush: 16773365,
      lawngreen: 8190976,
      lemonchiffon: 16775885,
      lightblue: 11393254,
      lightcoral: 15761536,
      lightcyan: 14745599,
      lightgoldenrodyellow: 16448210,
      lightgray: 13882323,
      lightgreen: 9498256,
      lightgrey: 13882323,
      lightpink: 16758465,
      lightsalmon: 16752762,
      lightseagreen: 2142890,
      lightskyblue: 8900346,
      lightslategray: 7833753,
      lightslategrey: 7833753,
      lightsteelblue: 11584734,
      lightyellow: 16777184,
      lime: 65280,
      limegreen: 3329330,
      linen: 16445670,
      magenta: 16711935,
      maroon: 8388608,
      mediumaquamarine: 6737322,
      mediumblue: 205,
      mediumorchid: 12211667,
      mediumpurple: 9662683,
      mediumseagreen: 3978097,
      mediumslateblue: 8087790,
      mediumspringgreen: 64154,
      mediumturquoise: 4772300,
      mediumvioletred: 13047173,
      midnightblue: 1644912,
      mintcream: 16121850,
      mistyrose: 16770273,
      moccasin: 16770229,
      navajowhite: 16768685,
      navy: 128,
      oldlace: 16643558,
      olive: 8421376,
      olivedrab: 7048739,
      orange: 16753920,
      orangered: 16729344,
      orchid: 14315734,
      palegoldenrod: 15657130,
      palegreen: 10025880,
      paleturquoise: 11529966,
      palevioletred: 14381203,
      papayawhip: 16773077,
      peachpuff: 16767673,
      peru: 13468991,
      pink: 16761035,
      plum: 14524637,
      powderblue: 11591910,
      purple: 8388736,
      rebeccapurple: 6697881,
      red: 16711680,
      rosybrown: 12357519,
      royalblue: 4286945,
      saddlebrown: 9127187,
      salmon: 16416882,
      sandybrown: 16032864,
      seagreen: 3050327,
      seashell: 16774638,
      sienna: 10506797,
      silver: 12632256,
      skyblue: 8900331,
      slateblue: 6970061,
      slategray: 7372944,
      slategrey: 7372944,
      snow: 16775930,
      springgreen: 65407,
      steelblue: 4620980,
      tan: 13808780,
      teal: 32896,
      thistle: 14204888,
      tomato: 16737095,
      turquoise: 4251856,
      violet: 15631086,
      wheat: 16113331,
      white: 16777215,
      whitesmoke: 16119285,
      yellow: 16776960,
      yellowgreen: 10145074,
    },
    $t = { h: 0, s: 0, l: 0 },
    ns = { h: 0, s: 0, l: 0 };
  function Ts(r, t, e) {
    return (
      e < 0 && (e += 1),
      e > 1 && (e -= 1),
      e < 1 / 6
        ? r + (t - r) * 6 * e
        : e < 1 / 2
          ? t
          : e < 2 / 3
            ? r + (t - r) * 6 * (2 / 3 - e)
            : r
    );
  }
  class V {
    constructor(t, e, s) {
      return (
        (this.isColor = !0),
        (this.r = 1),
        (this.g = 1),
        (this.b = 1),
        this.set(t, e, s)
      );
    }
    set(t, e, s) {
      if (e === void 0 && s === void 0) {
        const n = t;
        n && n.isColor
          ? this.copy(n)
          : typeof n == "number"
            ? this.setHex(n)
            : typeof n == "string" && this.setStyle(n);
      } else this.setRGB(t, e, s);
      return this;
    }
    setScalar(t) {
      return ((this.r = t), (this.g = t), (this.b = t), this);
    }
    setHex(t, e = At) {
      return (
        (t = Math.floor(t)),
        (this.r = ((t >> 16) & 255) / 255),
        (this.g = ((t >> 8) & 255) / 255),
        (this.b = (t & 255) / 255),
        vt.toWorkingColorSpace(this, e),
        this
      );
    }
    setRGB(t, e, s, n = vt.workingColorSpace) {
      return (
        (this.r = t),
        (this.g = e),
        (this.b = s),
        vt.toWorkingColorSpace(this, n),
        this
      );
    }
    setHSL(t, e, s, n = vt.workingColorSpace) {
      if (((t = _s(t, 1)), (e = H(e, 0, 1)), (s = H(s, 0, 1)), e === 0))
        this.r = this.g = this.b = s;
      else {
        const i = s <= 0.5 ? s * (1 + e) : s + e - s * e,
          o = 2 * s - i;
        ((this.r = Ts(o, i, t + 1 / 3)),
          (this.g = Ts(o, i, t)),
          (this.b = Ts(o, i, t - 1 / 3)));
      }
      return (vt.toWorkingColorSpace(this, n), this);
    }
    setStyle(t, e = At) {
      function s(i) {
        i !== void 0 &&
          parseFloat(i) < 1 &&
          console.warn(
            "THREE.Color: Alpha component of " + t + " will be ignored.",
          );
      }
      let n;
      if ((n = /^(\w+)\(([^\)]*)\)/.exec(t))) {
        let i;
        const o = n[1],
          a = n[2];
        switch (o) {
          case "rgb":
          case "rgba":
            if (
              (i =
                /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                  a,
                ))
            )
              return (
                s(i[4]),
                this.setRGB(
                  Math.min(255, parseInt(i[1], 10)) / 255,
                  Math.min(255, parseInt(i[2], 10)) / 255,
                  Math.min(255, parseInt(i[3], 10)) / 255,
                  e,
                )
              );
            if (
              (i =
                /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                  a,
                ))
            )
              return (
                s(i[4]),
                this.setRGB(
                  Math.min(100, parseInt(i[1], 10)) / 100,
                  Math.min(100, parseInt(i[2], 10)) / 100,
                  Math.min(100, parseInt(i[3], 10)) / 100,
                  e,
                )
              );
            break;
          case "hsl":
          case "hsla":
            if (
              (i =
                /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                  a,
                ))
            )
              return (
                s(i[4]),
                this.setHSL(
                  parseFloat(i[1]) / 360,
                  parseFloat(i[2]) / 100,
                  parseFloat(i[3]) / 100,
                  e,
                )
              );
            break;
          default:
            console.warn("THREE.Color: Unknown color model " + t);
        }
      } else if ((n = /^\#([A-Fa-f\d]+)$/.exec(t))) {
        const i = n[1],
          o = i.length;
        if (o === 3)
          return this.setRGB(
            parseInt(i.charAt(0), 16) / 15,
            parseInt(i.charAt(1), 16) / 15,
            parseInt(i.charAt(2), 16) / 15,
            e,
          );
        if (o === 6) return this.setHex(parseInt(i, 16), e);
        console.warn("THREE.Color: Invalid hex color " + t);
      } else if (t && t.length > 0) return this.setColorName(t, e);
      return this;
    }
    setColorName(t, e = At) {
      const s = Tn[t.toLowerCase()];
      return (
        s !== void 0
          ? this.setHex(s, e)
          : console.warn("THREE.Color: Unknown color " + t),
        this
      );
    }
    clone() {
      return new this.constructor(this.r, this.g, this.b);
    }
    copy(t) {
      return ((this.r = t.r), (this.g = t.g), (this.b = t.b), this);
    }
    copySRGBToLinear(t) {
      return ((this.r = It(t.r)), (this.g = It(t.g)), (this.b = It(t.b)), this);
    }
    copyLinearToSRGB(t) {
      return ((this.r = ye(t.r)), (this.g = ye(t.g)), (this.b = ye(t.b)), this);
    }
    convertSRGBToLinear() {
      return (this.copySRGBToLinear(this), this);
    }
    convertLinearToSRGB() {
      return (this.copyLinearToSRGB(this), this);
    }
    getHex(t = At) {
      return (
        vt.fromWorkingColorSpace(ft.copy(this), t),
        Math.round(H(ft.r * 255, 0, 255)) * 65536 +
          Math.round(H(ft.g * 255, 0, 255)) * 256 +
          Math.round(H(ft.b * 255, 0, 255))
      );
    }
    getHexString(t = At) {
      return ("000000" + this.getHex(t).toString(16)).slice(-6);
    }
    getHSL(t, e = vt.workingColorSpace) {
      vt.fromWorkingColorSpace(ft.copy(this), e);
      const s = ft.r,
        n = ft.g,
        i = ft.b,
        o = Math.max(s, n, i),
        a = Math.min(s, n, i);
      let h, l;
      const c = (a + o) / 2;
      if (a === o) ((h = 0), (l = 0));
      else {
        const u = o - a;
        switch (((l = c <= 0.5 ? u / (o + a) : u / (2 - o - a)), o)) {
          case s:
            h = (n - i) / u + (n < i ? 6 : 0);
            break;
          case n:
            h = (i - s) / u + 2;
            break;
          case i:
            h = (s - n) / u + 4;
            break;
        }
        h /= 6;
      }
      return ((t.h = h), (t.s = l), (t.l = c), t);
    }
    getRGB(t, e = vt.workingColorSpace) {
      return (
        vt.fromWorkingColorSpace(ft.copy(this), e),
        (t.r = ft.r),
        (t.g = ft.g),
        (t.b = ft.b),
        t
      );
    }
    getStyle(t = At) {
      vt.fromWorkingColorSpace(ft.copy(this), t);
      const e = ft.r,
        s = ft.g,
        n = ft.b;
      return t !== At
        ? `color(${t} ${e.toFixed(3)} ${s.toFixed(3)} ${n.toFixed(3)})`
        : `rgb(${Math.round(e * 255)},${Math.round(s * 255)},${Math.round(n * 255)})`;
    }
    offsetHSL(t, e, s) {
      return (this.getHSL($t), this.setHSL($t.h + t, $t.s + e, $t.l + s));
    }
    add(t) {
      return ((this.r += t.r), (this.g += t.g), (this.b += t.b), this);
    }
    addColors(t, e) {
      return (
        (this.r = t.r + e.r),
        (this.g = t.g + e.g),
        (this.b = t.b + e.b),
        this
      );
    }
    addScalar(t) {
      return ((this.r += t), (this.g += t), (this.b += t), this);
    }
    sub(t) {
      return (
        (this.r = Math.max(0, this.r - t.r)),
        (this.g = Math.max(0, this.g - t.g)),
        (this.b = Math.max(0, this.b - t.b)),
        this
      );
    }
    multiply(t) {
      return ((this.r *= t.r), (this.g *= t.g), (this.b *= t.b), this);
    }
    multiplyScalar(t) {
      return ((this.r *= t), (this.g *= t), (this.b *= t), this);
    }
    lerp(t, e) {
      return (
        (this.r += (t.r - this.r) * e),
        (this.g += (t.g - this.g) * e),
        (this.b += (t.b - this.b) * e),
        this
      );
    }
    lerpColors(t, e, s) {
      return (
        (this.r = t.r + (e.r - t.r) * s),
        (this.g = t.g + (e.g - t.g) * s),
        (this.b = t.b + (e.b - t.b) * s),
        this
      );
    }
    lerpHSL(t, e) {
      (this.getHSL($t), t.getHSL(ns));
      const s = Re($t.h, ns.h, e),
        n = Re($t.s, ns.s, e),
        i = Re($t.l, ns.l, e);
      return (this.setHSL(s, n, i), this);
    }
    setFromVector3(t) {
      return ((this.r = t.x), (this.g = t.y), (this.b = t.z), this);
    }
    applyMatrix3(t) {
      const e = this.r,
        s = this.g,
        n = this.b,
        i = t.elements;
      return (
        (this.r = i[0] * e + i[3] * s + i[6] * n),
        (this.g = i[1] * e + i[4] * s + i[7] * n),
        (this.b = i[2] * e + i[5] * s + i[8] * n),
        this
      );
    }
    equals(t) {
      return t.r === this.r && t.g === this.g && t.b === this.b;
    }
    fromArray(t, e = 0) {
      return ((this.r = t[e]), (this.g = t[e + 1]), (this.b = t[e + 2]), this);
    }
    toArray(t = [], e = 0) {
      return ((t[e] = this.r), (t[e + 1] = this.g), (t[e + 2] = this.b), t);
    }
    fromBufferAttribute(t, e) {
      return (
        (this.r = t.getX(e)),
        (this.g = t.getY(e)),
        (this.b = t.getZ(e)),
        this
      );
    }
    toJSON() {
      return this.getHex();
    }
    *[Symbol.iterator]() {
      (yield this.r, yield this.g, yield this.b);
    }
  }
  const ft = new V();
  V.NAMES = Tn;
  const et = new y(),
    is = new E();
  let lr = 0;
  class st {
    constructor(t, e, s = !1) {
      if (Array.isArray(t))
        throw new TypeError(
          "THREE.BufferAttribute: array should be a Typed Array.",
        );
      ((this.isBufferAttribute = !0),
        Object.defineProperty(this, "id", { value: lr++ }),
        (this.name = ""),
        (this.array = t),
        (this.itemSize = e),
        (this.count = t !== void 0 ? t.length / e : 0),
        (this.normalized = s),
        (this.usage = 35044),
        (this.updateRanges = []),
        (this.gpuType = 1015),
        (this.version = 0));
    }
    onUploadCallback() {}
    set needsUpdate(t) {
      t === !0 && this.version++;
    }
    setUsage(t) {
      return ((this.usage = t), this);
    }
    addUpdateRange(t, e) {
      this.updateRanges.push({ start: t, count: e });
    }
    clearUpdateRanges() {
      this.updateRanges.length = 0;
    }
    copy(t) {
      return (
        (this.name = t.name),
        (this.array = new t.array.constructor(t.array)),
        (this.itemSize = t.itemSize),
        (this.count = t.count),
        (this.normalized = t.normalized),
        (this.usage = t.usage),
        (this.gpuType = t.gpuType),
        this
      );
    }
    copyAt(t, e, s) {
      ((t *= this.itemSize), (s *= e.itemSize));
      for (let n = 0, i = this.itemSize; n < i; n++)
        this.array[t + n] = e.array[s + n];
      return this;
    }
    copyArray(t) {
      return (this.array.set(t), this);
    }
    applyMatrix3(t) {
      if (this.itemSize === 2)
        for (let e = 0, s = this.count; e < s; e++)
          (is.fromBufferAttribute(this, e),
            is.applyMatrix3(t),
            this.setXY(e, is.x, is.y));
      else if (this.itemSize === 3)
        for (let e = 0, s = this.count; e < s; e++)
          (et.fromBufferAttribute(this, e),
            et.applyMatrix3(t),
            this.setXYZ(e, et.x, et.y, et.z));
      return this;
    }
    applyMatrix4(t) {
      for (let e = 0, s = this.count; e < s; e++)
        (et.fromBufferAttribute(this, e),
          et.applyMatrix4(t),
          this.setXYZ(e, et.x, et.y, et.z));
      return this;
    }
    applyNormalMatrix(t) {
      for (let e = 0, s = this.count; e < s; e++)
        (et.fromBufferAttribute(this, e),
          et.applyNormalMatrix(t),
          this.setXYZ(e, et.x, et.y, et.z));
      return this;
    }
    transformDirection(t) {
      for (let e = 0, s = this.count; e < s; e++)
        (et.fromBufferAttribute(this, e),
          et.transformDirection(t),
          this.setXYZ(e, et.x, et.y, et.z));
      return this;
    }
    set(t, e = 0) {
      return (this.array.set(t, e), this);
    }
    getComponent(t, e) {
      let s = this.array[t * this.itemSize + e];
      return (this.normalized && (s = me(s, this.array)), s);
    }
    setComponent(t, e, s) {
      return (
        this.normalized && (s = mt(s, this.array)),
        (this.array[t * this.itemSize + e] = s),
        this
      );
    }
    getX(t) {
      let e = this.array[t * this.itemSize];
      return (this.normalized && (e = me(e, this.array)), e);
    }
    setX(t, e) {
      return (
        this.normalized && (e = mt(e, this.array)),
        (this.array[t * this.itemSize] = e),
        this
      );
    }
    getY(t) {
      let e = this.array[t * this.itemSize + 1];
      return (this.normalized && (e = me(e, this.array)), e);
    }
    setY(t, e) {
      return (
        this.normalized && (e = mt(e, this.array)),
        (this.array[t * this.itemSize + 1] = e),
        this
      );
    }
    getZ(t) {
      let e = this.array[t * this.itemSize + 2];
      return (this.normalized && (e = me(e, this.array)), e);
    }
    setZ(t, e) {
      return (
        this.normalized && (e = mt(e, this.array)),
        (this.array[t * this.itemSize + 2] = e),
        this
      );
    }
    getW(t) {
      let e = this.array[t * this.itemSize + 3];
      return (this.normalized && (e = me(e, this.array)), e);
    }
    setW(t, e) {
      return (
        this.normalized && (e = mt(e, this.array)),
        (this.array[t * this.itemSize + 3] = e),
        this
      );
    }
    setXY(t, e, s) {
      return (
        (t *= this.itemSize),
        this.normalized && ((e = mt(e, this.array)), (s = mt(s, this.array))),
        (this.array[t + 0] = e),
        (this.array[t + 1] = s),
        this
      );
    }
    setXYZ(t, e, s, n) {
      return (
        (t *= this.itemSize),
        this.normalized &&
          ((e = mt(e, this.array)),
          (s = mt(s, this.array)),
          (n = mt(n, this.array))),
        (this.array[t + 0] = e),
        (this.array[t + 1] = s),
        (this.array[t + 2] = n),
        this
      );
    }
    setXYZW(t, e, s, n, i) {
      return (
        (t *= this.itemSize),
        this.normalized &&
          ((e = mt(e, this.array)),
          (s = mt(s, this.array)),
          (n = mt(n, this.array)),
          (i = mt(i, this.array))),
        (this.array[t + 0] = e),
        (this.array[t + 1] = s),
        (this.array[t + 2] = n),
        (this.array[t + 3] = i),
        this
      );
    }
    onUpload(t) {
      return ((this.onUploadCallback = t), this);
    }
    clone() {
      return new this.constructor(this.array, this.itemSize).copy(this);
    }
    toJSON() {
      const t = {
        itemSize: this.itemSize,
        type: this.array.constructor.name,
        array: Array.from(this.array),
        normalized: this.normalized,
      };
      return (
        this.name !== "" && (t.name = this.name),
        this.usage !== 35044 && (t.usage = this.usage),
        t
      );
    }
  }
  class ur extends st {
    constructor(t, e, s) {
      super(new Uint16Array(t), e, s);
    }
  }
  class pr extends st {
    constructor(t, e, s) {
      super(new Uint32Array(t), e, s);
    }
  }
  class X extends st {
    constructor(t, e, s) {
      super(new Float32Array(t), e, s);
    }
  }
  let fr = 0;
  const zt = new Ct(),
    Bs = new Qt(),
    ve = new y(),
    Mt = new Ie(),
    Ue = new Ie(),
    ot = new y();
  class nt extends vs {
    constructor() {
      (super(),
        (this.isBufferGeometry = !0),
        Object.defineProperty(this, "id", { value: fr++ }),
        (this.uuid = de()),
        (this.name = ""),
        (this.type = "BufferGeometry"),
        (this.index = null),
        (this.indirect = null),
        (this.attributes = {}),
        (this.morphAttributes = {}),
        (this.morphTargetsRelative = !1),
        (this.groups = []),
        (this.boundingBox = null),
        (this.boundingSphere = null),
        (this.drawRange = { start: 0, count: 1 / 0 }),
        (this.userData = {}));
    }
    getIndex() {
      return this.index;
    }
    setIndex(t) {
      return (
        Array.isArray(t)
          ? (this.index = new (ji(t) ? pr : ur)(t, 1))
          : (this.index = t),
        this
      );
    }
    setIndirect(t) {
      return ((this.indirect = t), this);
    }
    getIndirect() {
      return this.indirect;
    }
    getAttribute(t) {
      return this.attributes[t];
    }
    setAttribute(t, e) {
      return ((this.attributes[t] = e), this);
    }
    deleteAttribute(t) {
      return (delete this.attributes[t], this);
    }
    hasAttribute(t) {
      return this.attributes[t] !== void 0;
    }
    addGroup(t, e, s = 0) {
      this.groups.push({ start: t, count: e, materialIndex: s });
    }
    clearGroups() {
      this.groups = [];
    }
    setDrawRange(t, e) {
      ((this.drawRange.start = t), (this.drawRange.count = e));
    }
    applyMatrix4(t) {
      const e = this.attributes.position;
      e !== void 0 && (e.applyMatrix4(t), (e.needsUpdate = !0));
      const s = this.attributes.normal;
      if (s !== void 0) {
        const i = new Wt().getNormalMatrix(t);
        (s.applyNormalMatrix(i), (s.needsUpdate = !0));
      }
      const n = this.attributes.tangent;
      return (
        n !== void 0 && (n.transformDirection(t), (n.needsUpdate = !0)),
        this.boundingBox !== null && this.computeBoundingBox(),
        this.boundingSphere !== null && this.computeBoundingSphere(),
        this
      );
    }
    applyQuaternion(t) {
      return (zt.makeRotationFromQuaternion(t), this.applyMatrix4(zt), this);
    }
    rotateX(t) {
      return (zt.makeRotationX(t), this.applyMatrix4(zt), this);
    }
    rotateY(t) {
      return (zt.makeRotationY(t), this.applyMatrix4(zt), this);
    }
    rotateZ(t) {
      return (zt.makeRotationZ(t), this.applyMatrix4(zt), this);
    }
    translate(t, e, s) {
      return (zt.makeTranslation(t, e, s), this.applyMatrix4(zt), this);
    }
    scale(t, e, s) {
      return (zt.makeScale(t, e, s), this.applyMatrix4(zt), this);
    }
    lookAt(t) {
      return (
        Bs.lookAt(t),
        Bs.updateMatrix(),
        this.applyMatrix4(Bs.matrix),
        this
      );
    }
    center() {
      return (
        this.computeBoundingBox(),
        this.boundingBox.getCenter(ve).negate(),
        this.translate(ve.x, ve.y, ve.z),
        this
      );
    }
    setFromPoints(t) {
      const e = this.getAttribute("position");
      if (e === void 0) {
        const s = [];
        for (let n = 0, i = t.length; n < i; n++) {
          const o = t[n];
          s.push(o.x, o.y, o.z || 0);
        }
        this.setAttribute("position", new X(s, 3));
      } else {
        const s = Math.min(t.length, e.count);
        for (let n = 0; n < s; n++) {
          const i = t[n];
          e.setXYZ(n, i.x, i.y, i.z || 0);
        }
        (t.length > e.count &&
          console.warn(
            "THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.",
          ),
          (e.needsUpdate = !0));
      }
      return this;
    }
    computeBoundingBox() {
      this.boundingBox === null && (this.boundingBox = new Ie());
      const t = this.attributes.position,
        e = this.morphAttributes.position;
      if (t && t.isGLBufferAttribute) {
        (console.error(
          "THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",
          this,
        ),
          this.boundingBox.set(
            new y(-1 / 0, -1 / 0, -1 / 0),
            new y(1 / 0, 1 / 0, 1 / 0),
          ));
        return;
      }
      if (t !== void 0) {
        if ((this.boundingBox.setFromBufferAttribute(t), e))
          for (let s = 0, n = e.length; s < n; s++) {
            const i = e[s];
            (Mt.setFromBufferAttribute(i),
              this.morphTargetsRelative
                ? (ot.addVectors(this.boundingBox.min, Mt.min),
                  this.boundingBox.expandByPoint(ot),
                  ot.addVectors(this.boundingBox.max, Mt.max),
                  this.boundingBox.expandByPoint(ot))
                : (this.boundingBox.expandByPoint(Mt.min),
                  this.boundingBox.expandByPoint(Mt.max)));
          }
      } else this.boundingBox.makeEmpty();
      (isNaN(this.boundingBox.min.x) ||
        isNaN(this.boundingBox.min.y) ||
        isNaN(this.boundingBox.min.z)) &&
        console.error(
          'THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',
          this,
        );
    }
    computeBoundingSphere() {
      this.boundingSphere === null && (this.boundingSphere = new sr());
      const t = this.attributes.position,
        e = this.morphAttributes.position;
      if (t && t.isGLBufferAttribute) {
        (console.error(
          "THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",
          this,
        ),
          this.boundingSphere.set(new y(), 1 / 0));
        return;
      }
      if (t) {
        const s = this.boundingSphere.center;
        if ((Mt.setFromBufferAttribute(t), e))
          for (let i = 0, o = e.length; i < o; i++) {
            const a = e[i];
            (Ue.setFromBufferAttribute(a),
              this.morphTargetsRelative
                ? (ot.addVectors(Mt.min, Ue.min),
                  Mt.expandByPoint(ot),
                  ot.addVectors(Mt.max, Ue.max),
                  Mt.expandByPoint(ot))
                : (Mt.expandByPoint(Ue.min), Mt.expandByPoint(Ue.max)));
          }
        Mt.getCenter(s);
        let n = 0;
        for (let i = 0, o = t.count; i < o; i++)
          (ot.fromBufferAttribute(t, i),
            (n = Math.max(n, s.distanceToSquared(ot))));
        if (e)
          for (let i = 0, o = e.length; i < o; i++) {
            const a = e[i],
              h = this.morphTargetsRelative;
            for (let l = 0, c = a.count; l < c; l++)
              (ot.fromBufferAttribute(a, l),
                h && (ve.fromBufferAttribute(t, l), ot.add(ve)),
                (n = Math.max(n, s.distanceToSquared(ot))));
          }
        ((this.boundingSphere.radius = Math.sqrt(n)),
          isNaN(this.boundingSphere.radius) &&
            console.error(
              'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',
              this,
            ));
      }
    }
    computeTangents() {
      const t = this.index,
        e = this.attributes;
      if (
        t === null ||
        e.position === void 0 ||
        e.normal === void 0 ||
        e.uv === void 0
      ) {
        console.error(
          "THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)",
        );
        return;
      }
      const s = e.position,
        n = e.normal,
        i = e.uv;
      this.hasAttribute("tangent") === !1 &&
        this.setAttribute("tangent", new st(new Float32Array(4 * s.count), 4));
      const o = this.getAttribute("tangent"),
        a = [],
        h = [];
      for (let A = 0; A < s.count; A++) ((a[A] = new y()), (h[A] = new y()));
      const l = new y(),
        c = new y(),
        u = new y(),
        p = new E(),
        f = new E(),
        d = new E(),
        m = new y(),
        x = new y();
      function b(A, C, S) {
        (l.fromBufferAttribute(s, A),
          c.fromBufferAttribute(s, C),
          u.fromBufferAttribute(s, S),
          p.fromBufferAttribute(i, A),
          f.fromBufferAttribute(i, C),
          d.fromBufferAttribute(i, S),
          c.sub(l),
          u.sub(l),
          f.sub(p),
          d.sub(p));
        const F = 1 / (f.x * d.y - d.x * f.y);
        isFinite(F) &&
          (m
            .copy(c)
            .multiplyScalar(d.y)
            .addScaledVector(u, -f.y)
            .multiplyScalar(F),
          x
            .copy(u)
            .multiplyScalar(f.x)
            .addScaledVector(c, -d.x)
            .multiplyScalar(F),
          a[A].add(m),
          a[C].add(m),
          a[S].add(m),
          h[A].add(x),
          h[C].add(x),
          h[S].add(x));
      }
      let g = this.groups;
      g.length === 0 && (g = [{ start: 0, count: t.count }]);
      for (let A = 0, C = g.length; A < C; ++A) {
        const S = g[A],
          F = S.start,
          I = S.count;
        for (let R = F, N = F + I; R < N; R += 3)
          b(t.getX(R + 0), t.getX(R + 1), t.getX(R + 2));
      }
      const w = new y(),
        M = new y(),
        z = new y(),
        v = new y();
      function _(A) {
        (z.fromBufferAttribute(n, A), v.copy(z));
        const C = a[A];
        (w.copy(C),
          w.sub(z.multiplyScalar(z.dot(C))).normalize(),
          M.crossVectors(v, C));
        const F = M.dot(h[A]) < 0 ? -1 : 1;
        o.setXYZW(A, w.x, w.y, w.z, F);
      }
      for (let A = 0, C = g.length; A < C; ++A) {
        const S = g[A],
          F = S.start,
          I = S.count;
        for (let R = F, N = F + I; R < N; R += 3)
          (_(t.getX(R + 0)), _(t.getX(R + 1)), _(t.getX(R + 2)));
      }
    }
    computeVertexNormals() {
      const t = this.index,
        e = this.getAttribute("position");
      if (e !== void 0) {
        let s = this.getAttribute("normal");
        if (s === void 0)
          ((s = new st(new Float32Array(e.count * 3), 3)),
            this.setAttribute("normal", s));
        else for (let p = 0, f = s.count; p < f; p++) s.setXYZ(p, 0, 0, 0);
        const n = new y(),
          i = new y(),
          o = new y(),
          a = new y(),
          h = new y(),
          l = new y(),
          c = new y(),
          u = new y();
        if (t)
          for (let p = 0, f = t.count; p < f; p += 3) {
            const d = t.getX(p + 0),
              m = t.getX(p + 1),
              x = t.getX(p + 2);
            (n.fromBufferAttribute(e, d),
              i.fromBufferAttribute(e, m),
              o.fromBufferAttribute(e, x),
              c.subVectors(o, i),
              u.subVectors(n, i),
              c.cross(u),
              a.fromBufferAttribute(s, d),
              h.fromBufferAttribute(s, m),
              l.fromBufferAttribute(s, x),
              a.add(c),
              h.add(c),
              l.add(c),
              s.setXYZ(d, a.x, a.y, a.z),
              s.setXYZ(m, h.x, h.y, h.z),
              s.setXYZ(x, l.x, l.y, l.z));
          }
        else
          for (let p = 0, f = e.count; p < f; p += 3)
            (n.fromBufferAttribute(e, p + 0),
              i.fromBufferAttribute(e, p + 1),
              o.fromBufferAttribute(e, p + 2),
              c.subVectors(o, i),
              u.subVectors(n, i),
              c.cross(u),
              s.setXYZ(p + 0, c.x, c.y, c.z),
              s.setXYZ(p + 1, c.x, c.y, c.z),
              s.setXYZ(p + 2, c.x, c.y, c.z));
        (this.normalizeNormals(), (s.needsUpdate = !0));
      }
    }
    normalizeNormals() {
      const t = this.attributes.normal;
      for (let e = 0, s = t.count; e < s; e++)
        (ot.fromBufferAttribute(t, e),
          ot.normalize(),
          t.setXYZ(e, ot.x, ot.y, ot.z));
    }
    toNonIndexed() {
      function t(a, h) {
        const l = a.array,
          c = a.itemSize,
          u = a.normalized,
          p = new l.constructor(h.length * c);
        let f = 0,
          d = 0;
        for (let m = 0, x = h.length; m < x; m++) {
          a.isInterleavedBufferAttribute
            ? (f = h[m] * a.data.stride + a.offset)
            : (f = h[m] * c);
          for (let b = 0; b < c; b++) p[d++] = l[f++];
        }
        return new st(p, c, u);
      }
      if (this.index === null)
        return (
          console.warn(
            "THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.",
          ),
          this
        );
      const e = new nt(),
        s = this.index.array,
        n = this.attributes;
      for (const a in n) {
        const h = n[a],
          l = t(h, s);
        e.setAttribute(a, l);
      }
      const i = this.morphAttributes;
      for (const a in i) {
        const h = [],
          l = i[a];
        for (let c = 0, u = l.length; c < u; c++) {
          const p = l[c],
            f = t(p, s);
          h.push(f);
        }
        e.morphAttributes[a] = h;
      }
      e.morphTargetsRelative = this.morphTargetsRelative;
      const o = this.groups;
      for (let a = 0, h = o.length; a < h; a++) {
        const l = o[a];
        e.addGroup(l.start, l.count, l.materialIndex);
      }
      return e;
    }
    toJSON() {
      const t = {
        metadata: {
          version: 4.6,
          type: "BufferGeometry",
          generator: "BufferGeometry.toJSON",
        },
      };
      if (
        ((t.uuid = this.uuid),
        (t.type = this.type),
        this.name !== "" && (t.name = this.name),
        Object.keys(this.userData).length > 0 && (t.userData = this.userData),
        this.parameters !== void 0)
      ) {
        const h = this.parameters;
        for (const l in h) h[l] !== void 0 && (t[l] = h[l]);
        return t;
      }
      t.data = { attributes: {} };
      const e = this.index;
      e !== null &&
        (t.data.index = {
          type: e.array.constructor.name,
          array: Array.prototype.slice.call(e.array),
        });
      const s = this.attributes;
      for (const h in s) {
        const l = s[h];
        t.data.attributes[h] = l.toJSON(t.data);
      }
      const n = {};
      let i = !1;
      for (const h in this.morphAttributes) {
        const l = this.morphAttributes[h],
          c = [];
        for (let u = 0, p = l.length; u < p; u++) {
          const f = l[u];
          c.push(f.toJSON(t.data));
        }
        c.length > 0 && ((n[h] = c), (i = !0));
      }
      i &&
        ((t.data.morphAttributes = n),
        (t.data.morphTargetsRelative = this.morphTargetsRelative));
      const o = this.groups;
      o.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(o)));
      const a = this.boundingSphere;
      return (
        a !== null &&
          (t.data.boundingSphere = {
            center: a.center.toArray(),
            radius: a.radius,
          }),
        t
      );
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      ((this.index = null),
        (this.attributes = {}),
        (this.morphAttributes = {}),
        (this.groups = []),
        (this.boundingBox = null),
        (this.boundingSphere = null));
      const e = {};
      this.name = t.name;
      const s = t.index;
      s !== null && this.setIndex(s.clone(e));
      const n = t.attributes;
      for (const l in n) {
        const c = n[l];
        this.setAttribute(l, c.clone(e));
      }
      const i = t.morphAttributes;
      for (const l in i) {
        const c = [],
          u = i[l];
        for (let p = 0, f = u.length; p < f; p++) c.push(u[p].clone(e));
        this.morphAttributes[l] = c;
      }
      this.morphTargetsRelative = t.morphTargetsRelative;
      const o = t.groups;
      for (let l = 0, c = o.length; l < c; l++) {
        const u = o[l];
        this.addGroup(u.start, u.count, u.materialIndex);
      }
      const a = t.boundingBox;
      a !== null && (this.boundingBox = a.clone());
      const h = t.boundingSphere;
      return (
        h !== null && (this.boundingSphere = h.clone()),
        (this.drawRange.start = t.drawRange.start),
        (this.drawRange.count = t.drawRange.count),
        (this.userData = t.userData),
        this
      );
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
  }
  class _e extends nt {
    constructor(t = 1, e = 1, s = 1, n = 1, i = 1, o = 1) {
      (super(),
        (this.type = "BoxGeometry"),
        (this.parameters = {
          width: t,
          height: e,
          depth: s,
          widthSegments: n,
          heightSegments: i,
          depthSegments: o,
        }));
      const a = this;
      ((n = Math.floor(n)), (i = Math.floor(i)), (o = Math.floor(o)));
      const h = [],
        l = [],
        c = [],
        u = [];
      let p = 0,
        f = 0;
      (d("z", "y", "x", -1, -1, s, e, t, o, i, 0),
        d("z", "y", "x", 1, -1, s, e, -t, o, i, 1),
        d("x", "z", "y", 1, 1, t, s, e, n, o, 2),
        d("x", "z", "y", 1, -1, t, s, -e, n, o, 3),
        d("x", "y", "z", 1, -1, t, e, s, n, i, 4),
        d("x", "y", "z", -1, -1, t, e, -s, n, i, 5),
        this.setIndex(h),
        this.setAttribute("position", new X(l, 3)),
        this.setAttribute("normal", new X(c, 3)),
        this.setAttribute("uv", new X(u, 2)));
      function d(m, x, b, g, w, M, z, v, _, A, C) {
        const S = M / _,
          F = z / A,
          I = M / 2,
          R = z / 2,
          N = v / 2,
          Z = _ + 1,
          U = A + 1;
        let G = 0,
          ht = 0;
        const J = new y();
        for (let q = 0; q < U; q++) {
          const Y = q * F - R;
          for (let bt = 0; bt < Z; bt++) {
            const fe = bt * S - I;
            ((J[m] = fe * g),
              (J[x] = Y * w),
              (J[b] = N),
              l.push(J.x, J.y, J.z),
              (J[m] = 0),
              (J[x] = 0),
              (J[b] = v > 0 ? 1 : -1),
              c.push(J.x, J.y, J.z),
              u.push(bt / _),
              u.push(1 - q / A),
              (G += 1));
          }
        }
        for (let q = 0; q < A; q++)
          for (let Y = 0; Y < _; Y++) {
            const bt = p + Y + Z * q,
              fe = p + Y + Z * (q + 1),
              dn = p + (Y + 1) + Z * (q + 1),
              Ms = p + (Y + 1) + Z * q;
            (h.push(bt, fe, Ms), h.push(fe, dn, Ms), (ht += 6));
          }
        (a.addGroup(f, ht, C), (f += ht), (p += G));
      }
    }
    copy(t) {
      return (
        super.copy(t),
        (this.parameters = Object.assign({}, t.parameters)),
        this
      );
    }
    static fromJSON(t) {
      return new _e(
        t.width,
        t.height,
        t.depth,
        t.widthSegments,
        t.heightSegments,
        t.depthSegments,
      );
    }
  }
  class Pt {
    constructor() {
      ((this.type = "Curve"),
        (this.arcLengthDivisions = 200),
        (this.needsUpdate = !1),
        (this.cacheArcLengths = null));
    }
    getPoint() {
      console.warn("THREE.Curve: .getPoint() not implemented.");
    }
    getPointAt(t, e) {
      const s = this.getUtoTmapping(t);
      return this.getPoint(s, e);
    }
    getPoints(t = 5) {
      const e = [];
      for (let s = 0; s <= t; s++) e.push(this.getPoint(s / t));
      return e;
    }
    getSpacedPoints(t = 5) {
      const e = [];
      for (let s = 0; s <= t; s++) e.push(this.getPointAt(s / t));
      return e;
    }
    getLength() {
      const t = this.getLengths();
      return t[t.length - 1];
    }
    getLengths(t = this.arcLengthDivisions) {
      if (
        this.cacheArcLengths &&
        this.cacheArcLengths.length === t + 1 &&
        !this.needsUpdate
      )
        return this.cacheArcLengths;
      this.needsUpdate = !1;
      const e = [];
      let s,
        n = this.getPoint(0),
        i = 0;
      e.push(0);
      for (let o = 1; o <= t; o++)
        ((s = this.getPoint(o / t)),
          (i += s.distanceTo(n)),
          e.push(i),
          (n = s));
      return ((this.cacheArcLengths = e), e);
    }
    updateArcLengths() {
      ((this.needsUpdate = !0), this.getLengths());
    }
    getUtoTmapping(t, e = null) {
      const s = this.getLengths();
      let n = 0;
      const i = s.length;
      let o;
      e ? (o = e) : (o = t * s[i - 1]);
      let a = 0,
        h = i - 1,
        l;
      for (; a <= h;)
        if (((n = Math.floor(a + (h - a) / 2)), (l = s[n] - o), l < 0))
          a = n + 1;
        else if (l > 0) h = n - 1;
        else {
          h = n;
          break;
        }
      if (((n = h), s[n] === o)) return n / (i - 1);
      const c = s[n],
        p = s[n + 1] - c,
        f = (o - c) / p;
      return (n + f) / (i - 1);
    }
    getTangent(t, e) {
      let n = t - 1e-4,
        i = t + 1e-4;
      (n < 0 && (n = 0), i > 1 && (i = 1));
      const o = this.getPoint(n),
        a = this.getPoint(i),
        h = e || (o.isVector2 ? new E() : new y());
      return (h.copy(a).sub(o).normalize(), h);
    }
    getTangentAt(t, e) {
      const s = this.getUtoTmapping(t);
      return this.getTangent(s, e);
    }
    computeFrenetFrames(t, e = !1) {
      const s = new y(),
        n = [],
        i = [],
        o = [],
        a = new y(),
        h = new Ct();
      for (let f = 0; f <= t; f++) {
        const d = f / t;
        n[f] = this.getTangentAt(d, new y());
      }
      ((i[0] = new y()), (o[0] = new y()));
      let l = Number.MAX_VALUE;
      const c = Math.abs(n[0].x),
        u = Math.abs(n[0].y),
        p = Math.abs(n[0].z);
      (c <= l && ((l = c), s.set(1, 0, 0)),
        u <= l && ((l = u), s.set(0, 1, 0)),
        p <= l && s.set(0, 0, 1),
        a.crossVectors(n[0], s).normalize(),
        i[0].crossVectors(n[0], a),
        o[0].crossVectors(n[0], i[0]));
      for (let f = 1; f <= t; f++) {
        if (
          ((i[f] = i[f - 1].clone()),
          (o[f] = o[f - 1].clone()),
          a.crossVectors(n[f - 1], n[f]),
          a.length() > Number.EPSILON)
        ) {
          a.normalize();
          const d = Math.acos(H(n[f - 1].dot(n[f]), -1, 1));
          i[f].applyMatrix4(h.makeRotationAxis(a, d));
        }
        o[f].crossVectors(n[f], i[f]);
      }
      if (e === !0) {
        let f = Math.acos(H(i[0].dot(i[t]), -1, 1));
        ((f /= t), n[0].dot(a.crossVectors(i[0], i[t])) > 0 && (f = -f));
        for (let d = 1; d <= t; d++)
          (i[d].applyMatrix4(h.makeRotationAxis(n[d], f * d)),
            o[d].crossVectors(n[d], i[d]));
      }
      return { tangents: n, normals: i, binormals: o };
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return ((this.arcLengthDivisions = t.arcLengthDivisions), this);
    }
    toJSON() {
      const t = {
        metadata: { version: 4.6, type: "Curve", generator: "Curve.toJSON" },
      };
      return (
        (t.arcLengthDivisions = this.arcLengthDivisions),
        (t.type = this.type),
        t
      );
    }
    fromJSON(t) {
      return ((this.arcLengthDivisions = t.arcLengthDivisions), this);
    }
  }
  class Os extends Pt {
    constructor(
      t = 0,
      e = 0,
      s = 1,
      n = 1,
      i = 0,
      o = Math.PI * 2,
      a = !1,
      h = 0,
    ) {
      (super(),
        (this.isEllipseCurve = !0),
        (this.type = "EllipseCurve"),
        (this.aX = t),
        (this.aY = e),
        (this.xRadius = s),
        (this.yRadius = n),
        (this.aStartAngle = i),
        (this.aEndAngle = o),
        (this.aClockwise = a),
        (this.aRotation = h));
    }
    getPoint(t, e = new E()) {
      const s = e,
        n = Math.PI * 2;
      let i = this.aEndAngle - this.aStartAngle;
      const o = Math.abs(i) < Number.EPSILON;
      for (; i < 0;) i += n;
      for (; i > n;) i -= n;
      (i < Number.EPSILON && (o ? (i = 0) : (i = n)),
        this.aClockwise === !0 && !o && (i === n ? (i = -n) : (i = i - n)));
      const a = this.aStartAngle + t * i;
      let h = this.aX + this.xRadius * Math.cos(a),
        l = this.aY + this.yRadius * Math.sin(a);
      if (this.aRotation !== 0) {
        const c = Math.cos(this.aRotation),
          u = Math.sin(this.aRotation),
          p = h - this.aX,
          f = l - this.aY;
        ((h = p * c - f * u + this.aX), (l = p * u + f * c + this.aY));
      }
      return s.set(h, l);
    }
    copy(t) {
      return (
        super.copy(t),
        (this.aX = t.aX),
        (this.aY = t.aY),
        (this.xRadius = t.xRadius),
        (this.yRadius = t.yRadius),
        (this.aStartAngle = t.aStartAngle),
        (this.aEndAngle = t.aEndAngle),
        (this.aClockwise = t.aClockwise),
        (this.aRotation = t.aRotation),
        this
      );
    }
    toJSON() {
      const t = super.toJSON();
      return (
        (t.aX = this.aX),
        (t.aY = this.aY),
        (t.xRadius = this.xRadius),
        (t.yRadius = this.yRadius),
        (t.aStartAngle = this.aStartAngle),
        (t.aEndAngle = this.aEndAngle),
        (t.aClockwise = this.aClockwise),
        (t.aRotation = this.aRotation),
        t
      );
    }
    fromJSON(t) {
      return (
        super.fromJSON(t),
        (this.aX = t.aX),
        (this.aY = t.aY),
        (this.xRadius = t.xRadius),
        (this.yRadius = t.yRadius),
        (this.aStartAngle = t.aStartAngle),
        (this.aEndAngle = t.aEndAngle),
        (this.aClockwise = t.aClockwise),
        (this.aRotation = t.aRotation),
        this
      );
    }
  }
  class dr extends Os {
    constructor(t, e, s, n, i, o) {
      (super(t, e, s, s, n, i, o),
        (this.isArcCurve = !0),
        (this.type = "ArcCurve"));
    }
  }
  function Rs() {
    let r = 0,
      t = 0,
      e = 0,
      s = 0;
    function n(i, o, a, h) {
      ((r = i),
        (t = a),
        (e = -3 * i + 3 * o - 2 * a - h),
        (s = 2 * i - 2 * o + a + h));
    }
    return {
      initCatmullRom: function (i, o, a, h, l) {
        n(o, a, l * (a - i), l * (h - o));
      },
      initNonuniformCatmullRom: function (i, o, a, h, l, c, u) {
        let p = (o - i) / l - (a - i) / (l + c) + (a - o) / c,
          f = (a - o) / c - (h - o) / (c + u) + (h - a) / u;
        ((p *= c), (f *= c), n(o, a, p, f));
      },
      calc: function (i) {
        const o = i * i,
          a = o * i;
        return r + t * i + e * o + s * a;
      },
    };
  }
  const rs = new y(),
    Is = new Rs(),
    Ns = new Rs(),
    Ls = new Rs();
  class Kt extends Pt {
    constructor(t = [], e = !1, s = "centripetal", n = 0.5) {
      (super(),
        (this.isCatmullRomCurve3 = !0),
        (this.type = "CatmullRomCurve3"),
        (this.points = t),
        (this.closed = e),
        (this.curveType = s),
        (this.tension = n));
    }
    getPoint(t, e = new y()) {
      const s = e,
        n = this.points,
        i = n.length,
        o = (i - (this.closed ? 0 : 1)) * t;
      let a = Math.floor(o),
        h = o - a;
      this.closed
        ? (a += a > 0 ? 0 : (Math.floor(Math.abs(a) / i) + 1) * i)
        : h === 0 && a === i - 1 && ((a = i - 2), (h = 1));
      let l, c;
      this.closed || a > 0
        ? (l = n[(a - 1) % i])
        : (rs.subVectors(n[0], n[1]).add(n[0]), (l = rs));
      const u = n[a % i],
        p = n[(a + 1) % i];
      if (
        (this.closed || a + 2 < i
          ? (c = n[(a + 2) % i])
          : (rs.subVectors(n[i - 1], n[i - 2]).add(n[i - 1]), (c = rs)),
        this.curveType === "centripetal" || this.curveType === "chordal")
      ) {
        const f = this.curveType === "chordal" ? 0.5 : 0.25;
        let d = Math.pow(l.distanceToSquared(u), f),
          m = Math.pow(u.distanceToSquared(p), f),
          x = Math.pow(p.distanceToSquared(c), f);
        (m < 1e-4 && (m = 1),
          d < 1e-4 && (d = m),
          x < 1e-4 && (x = m),
          Is.initNonuniformCatmullRom(l.x, u.x, p.x, c.x, d, m, x),
          Ns.initNonuniformCatmullRom(l.y, u.y, p.y, c.y, d, m, x),
          Ls.initNonuniformCatmullRom(l.z, u.z, p.z, c.z, d, m, x));
      } else
        this.curveType === "catmullrom" &&
          (Is.initCatmullRom(l.x, u.x, p.x, c.x, this.tension),
          Ns.initCatmullRom(l.y, u.y, p.y, c.y, this.tension),
          Ls.initCatmullRom(l.z, u.z, p.z, c.z, this.tension));
      return (s.set(Is.calc(h), Ns.calc(h), Ls.calc(h)), s);
    }
    copy(t) {
      (super.copy(t), (this.points = []));
      for (let e = 0, s = t.points.length; e < s; e++) {
        const n = t.points[e];
        this.points.push(n.clone());
      }
      return (
        (this.closed = t.closed),
        (this.curveType = t.curveType),
        (this.tension = t.tension),
        this
      );
    }
    toJSON() {
      const t = super.toJSON();
      t.points = [];
      for (let e = 0, s = this.points.length; e < s; e++) {
        const n = this.points[e];
        t.points.push(n.toArray());
      }
      return (
        (t.closed = this.closed),
        (t.curveType = this.curveType),
        (t.tension = this.tension),
        t
      );
    }
    fromJSON(t) {
      (super.fromJSON(t), (this.points = []));
      for (let e = 0, s = t.points.length; e < s; e++) {
        const n = t.points[e];
        this.points.push(new y().fromArray(n));
      }
      return (
        (this.closed = t.closed),
        (this.curveType = t.curveType),
        (this.tension = t.tension),
        this
      );
    }
  }
  function Bn(r, t, e, s, n) {
    const i = (s - t) * 0.5,
      o = (n - e) * 0.5,
      a = r * r,
      h = r * a;
    return (
      (2 * e - 2 * s + i + o) * h + (-3 * e + 3 * s - 2 * i - o) * a + i * r + e
    );
  }
  function mr(r, t) {
    const e = 1 - r;
    return e * e * t;
  }
  function yr(r, t) {
    return 2 * (1 - r) * r * t;
  }
  function xr(r, t) {
    return r * r * t;
  }
  function Xe(r, t, e, s) {
    return mr(r, t) + yr(r, e) + xr(r, s);
  }
  function gr(r, t) {
    const e = 1 - r;
    return e * e * e * t;
  }
  function br(r, t) {
    const e = 1 - r;
    return 3 * e * e * r * t;
  }
  function wr(r, t) {
    return 3 * (1 - r) * r * r * t;
  }
  function Mr(r, t) {
    return r * r * r * t;
  }
  function Ze(r, t, e, s, n) {
    return gr(r, t) + br(r, e) + wr(r, s) + Mr(r, n);
  }
  class On extends Pt {
    constructor(t = new E(), e = new E(), s = new E(), n = new E()) {
      (super(),
        (this.isCubicBezierCurve = !0),
        (this.type = "CubicBezierCurve"),
        (this.v0 = t),
        (this.v1 = e),
        (this.v2 = s),
        (this.v3 = n));
    }
    getPoint(t, e = new E()) {
      const s = e,
        n = this.v0,
        i = this.v1,
        o = this.v2,
        a = this.v3;
      return (s.set(Ze(t, n.x, i.x, o.x, a.x), Ze(t, n.y, i.y, o.y, a.y)), s);
    }
    copy(t) {
      return (
        super.copy(t),
        this.v0.copy(t.v0),
        this.v1.copy(t.v1),
        this.v2.copy(t.v2),
        this.v3.copy(t.v3),
        this
      );
    }
    toJSON() {
      const t = super.toJSON();
      return (
        (t.v0 = this.v0.toArray()),
        (t.v1 = this.v1.toArray()),
        (t.v2 = this.v2.toArray()),
        (t.v3 = this.v3.toArray()),
        t
      );
    }
    fromJSON(t) {
      return (
        super.fromJSON(t),
        this.v0.fromArray(t.v0),
        this.v1.fromArray(t.v1),
        this.v2.fromArray(t.v2),
        this.v3.fromArray(t.v3),
        this
      );
    }
  }
  class zr extends Pt {
    constructor(t = new y(), e = new y(), s = new y(), n = new y()) {
      (super(),
        (this.isCubicBezierCurve3 = !0),
        (this.type = "CubicBezierCurve3"),
        (this.v0 = t),
        (this.v1 = e),
        (this.v2 = s),
        (this.v3 = n));
    }
    getPoint(t, e = new y()) {
      const s = e,
        n = this.v0,
        i = this.v1,
        o = this.v2,
        a = this.v3;
      return (
        s.set(
          Ze(t, n.x, i.x, o.x, a.x),
          Ze(t, n.y, i.y, o.y, a.y),
          Ze(t, n.z, i.z, o.z, a.z),
        ),
        s
      );
    }
    copy(t) {
      return (
        super.copy(t),
        this.v0.copy(t.v0),
        this.v1.copy(t.v1),
        this.v2.copy(t.v2),
        this.v3.copy(t.v3),
        this
      );
    }
    toJSON() {
      const t = super.toJSON();
      return (
        (t.v0 = this.v0.toArray()),
        (t.v1 = this.v1.toArray()),
        (t.v2 = this.v2.toArray()),
        (t.v3 = this.v3.toArray()),
        t
      );
    }
    fromJSON(t) {
      return (
        super.fromJSON(t),
        this.v0.fromArray(t.v0),
        this.v1.fromArray(t.v1),
        this.v2.fromArray(t.v2),
        this.v3.fromArray(t.v3),
        this
      );
    }
  }
  class Rn extends Pt {
    constructor(t = new E(), e = new E()) {
      (super(),
        (this.isLineCurve = !0),
        (this.type = "LineCurve"),
        (this.v1 = t),
        (this.v2 = e));
    }
    getPoint(t, e = new E()) {
      const s = e;
      return (
        t === 1
          ? s.copy(this.v2)
          : (s.copy(this.v2).sub(this.v1), s.multiplyScalar(t).add(this.v1)),
        s
      );
    }
    getPointAt(t, e) {
      return this.getPoint(t, e);
    }
    getTangent(t, e = new E()) {
      return e.subVectors(this.v2, this.v1).normalize();
    }
    getTangentAt(t, e) {
      return this.getTangent(t, e);
    }
    copy(t) {
      return (super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this);
    }
    toJSON() {
      const t = super.toJSON();
      return ((t.v1 = this.v1.toArray()), (t.v2 = this.v2.toArray()), t);
    }
    fromJSON(t) {
      return (
        super.fromJSON(t),
        this.v1.fromArray(t.v1),
        this.v2.fromArray(t.v2),
        this
      );
    }
  }
  class Ar extends Pt {
    constructor(t = new y(), e = new y()) {
      (super(),
        (this.isLineCurve3 = !0),
        (this.type = "LineCurve3"),
        (this.v1 = t),
        (this.v2 = e));
    }
    getPoint(t, e = new y()) {
      const s = e;
      return (
        t === 1
          ? s.copy(this.v2)
          : (s.copy(this.v2).sub(this.v1), s.multiplyScalar(t).add(this.v1)),
        s
      );
    }
    getPointAt(t, e) {
      return this.getPoint(t, e);
    }
    getTangent(t, e = new y()) {
      return e.subVectors(this.v2, this.v1).normalize();
    }
    getTangentAt(t, e) {
      return this.getTangent(t, e);
    }
    copy(t) {
      return (super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this);
    }
    toJSON() {
      const t = super.toJSON();
      return ((t.v1 = this.v1.toArray()), (t.v2 = this.v2.toArray()), t);
    }
    fromJSON(t) {
      return (
        super.fromJSON(t),
        this.v1.fromArray(t.v1),
        this.v2.fromArray(t.v2),
        this
      );
    }
  }
  class In extends Pt {
    constructor(t = new E(), e = new E(), s = new E()) {
      (super(),
        (this.isQuadraticBezierCurve = !0),
        (this.type = "QuadraticBezierCurve"),
        (this.v0 = t),
        (this.v1 = e),
        (this.v2 = s));
    }
    getPoint(t, e = new E()) {
      const s = e,
        n = this.v0,
        i = this.v1,
        o = this.v2;
      return (s.set(Xe(t, n.x, i.x, o.x), Xe(t, n.y, i.y, o.y)), s);
    }
    copy(t) {
      return (
        super.copy(t),
        this.v0.copy(t.v0),
        this.v1.copy(t.v1),
        this.v2.copy(t.v2),
        this
      );
    }
    toJSON() {
      const t = super.toJSON();
      return (
        (t.v0 = this.v0.toArray()),
        (t.v1 = this.v1.toArray()),
        (t.v2 = this.v2.toArray()),
        t
      );
    }
    fromJSON(t) {
      return (
        super.fromJSON(t),
        this.v0.fromArray(t.v0),
        this.v1.fromArray(t.v1),
        this.v2.fromArray(t.v2),
        this
      );
    }
  }
  class Nn extends Pt {
    constructor(t = new y(), e = new y(), s = new y()) {
      (super(),
        (this.isQuadraticBezierCurve3 = !0),
        (this.type = "QuadraticBezierCurve3"),
        (this.v0 = t),
        (this.v1 = e),
        (this.v2 = s));
    }
    getPoint(t, e = new y()) {
      const s = e,
        n = this.v0,
        i = this.v1,
        o = this.v2;
      return (
        s.set(Xe(t, n.x, i.x, o.x), Xe(t, n.y, i.y, o.y), Xe(t, n.z, i.z, o.z)),
        s
      );
    }
    copy(t) {
      return (
        super.copy(t),
        this.v0.copy(t.v0),
        this.v1.copy(t.v1),
        this.v2.copy(t.v2),
        this
      );
    }
    toJSON() {
      const t = super.toJSON();
      return (
        (t.v0 = this.v0.toArray()),
        (t.v1 = this.v1.toArray()),
        (t.v2 = this.v2.toArray()),
        t
      );
    }
    fromJSON(t) {
      return (
        super.fromJSON(t),
        this.v0.fromArray(t.v0),
        this.v1.fromArray(t.v1),
        this.v2.fromArray(t.v2),
        this
      );
    }
  }
  class Se extends Pt {
    constructor(t = []) {
      (super(),
        (this.isSplineCurve = !0),
        (this.type = "SplineCurve"),
        (this.points = t));
    }
    getPoint(t, e = new E()) {
      const s = e,
        n = this.points,
        i = (n.length - 1) * t,
        o = Math.floor(i),
        a = i - o,
        h = n[o === 0 ? o : o - 1],
        l = n[o],
        c = n[o > n.length - 2 ? n.length - 1 : o + 1],
        u = n[o > n.length - 3 ? n.length - 1 : o + 2];
      return (s.set(Bn(a, h.x, l.x, c.x, u.x), Bn(a, h.y, l.y, c.y, u.y)), s);
    }
    copy(t) {
      (super.copy(t), (this.points = []));
      for (let e = 0, s = t.points.length; e < s; e++) {
        const n = t.points[e];
        this.points.push(n.clone());
      }
      return this;
    }
    toJSON() {
      const t = super.toJSON();
      t.points = [];
      for (let e = 0, s = this.points.length; e < s; e++) {
        const n = this.points[e];
        t.points.push(n.toArray());
      }
      return t;
    }
    fromJSON(t) {
      (super.fromJSON(t), (this.points = []));
      for (let e = 0, s = t.points.length; e < s; e++) {
        const n = t.points[e];
        this.points.push(new E().fromArray(n));
      }
      return this;
    }
  }
  var os = Object.freeze({
    __proto__: null,
    ArcCurve: dr,
    CatmullRomCurve3: Kt,
    CubicBezierCurve: On,
    CubicBezierCurve3: zr,
    EllipseCurve: Os,
    LineCurve: Rn,
    LineCurve3: Ar,
    QuadraticBezierCurve: In,
    QuadraticBezierCurve3: Nn,
    SplineCurve: Se,
  });
  class vr extends Pt {
    constructor() {
      (super(),
        (this.type = "CurvePath"),
        (this.curves = []),
        (this.autoClose = !1));
    }
    add(t) {
      this.curves.push(t);
    }
    closePath() {
      const t = this.curves[0].getPoint(0),
        e = this.curves[this.curves.length - 1].getPoint(1);
      if (!t.equals(e)) {
        const s = t.isVector2 === !0 ? "LineCurve" : "LineCurve3";
        this.curves.push(new os[s](e, t));
      }
      return this;
    }
    getPoint(t, e) {
      const s = t * this.getLength(),
        n = this.getCurveLengths();
      let i = 0;
      for (; i < n.length;) {
        if (n[i] >= s) {
          const o = n[i] - s,
            a = this.curves[i],
            h = a.getLength(),
            l = h === 0 ? 0 : 1 - o / h;
          return a.getPointAt(l, e);
        }
        i++;
      }
      return null;
    }
    getLength() {
      const t = this.getCurveLengths();
      return t[t.length - 1];
    }
    updateArcLengths() {
      ((this.needsUpdate = !0),
        (this.cacheLengths = null),
        this.getCurveLengths());
    }
    getCurveLengths() {
      if (this.cacheLengths && this.cacheLengths.length === this.curves.length)
        return this.cacheLengths;
      const t = [];
      let e = 0;
      for (let s = 0, n = this.curves.length; s < n; s++)
        ((e += this.curves[s].getLength()), t.push(e));
      return ((this.cacheLengths = t), t);
    }
    getSpacedPoints(t = 40) {
      const e = [];
      for (let s = 0; s <= t; s++) e.push(this.getPoint(s / t));
      return (this.autoClose && e.push(e[0]), e);
    }
    getPoints(t = 12) {
      const e = [];
      let s;
      for (let n = 0, i = this.curves; n < i.length; n++) {
        const o = i[n],
          a = o.isEllipseCurve
            ? t * 2
            : o.isLineCurve || o.isLineCurve3
              ? 1
              : o.isSplineCurve
                ? t * o.points.length
                : t,
          h = o.getPoints(a);
        for (let l = 0; l < h.length; l++) {
          const c = h[l];
          (s && s.equals(c)) || (e.push(c), (s = c));
        }
      }
      return (
        this.autoClose &&
          e.length > 1 &&
          !e[e.length - 1].equals(e[0]) &&
          e.push(e[0]),
        e
      );
    }
    copy(t) {
      (super.copy(t), (this.curves = []));
      for (let e = 0, s = t.curves.length; e < s; e++) {
        const n = t.curves[e];
        this.curves.push(n.clone());
      }
      return ((this.autoClose = t.autoClose), this);
    }
    toJSON() {
      const t = super.toJSON();
      ((t.autoClose = this.autoClose), (t.curves = []));
      for (let e = 0, s = this.curves.length; e < s; e++) {
        const n = this.curves[e];
        t.curves.push(n.toJSON());
      }
      return t;
    }
    fromJSON(t) {
      (super.fromJSON(t), (this.autoClose = t.autoClose), (this.curves = []));
      for (let e = 0, s = t.curves.length; e < s; e++) {
        const n = t.curves[e];
        this.curves.push(new os[n.type]().fromJSON(n));
      }
      return this;
    }
  }
  class Ds extends vr {
    constructor(t) {
      (super(),
        (this.type = "Path"),
        (this.currentPoint = new E()),
        t && this.setFromPoints(t));
    }
    setFromPoints(t) {
      this.moveTo(t[0].x, t[0].y);
      for (let e = 1, s = t.length; e < s; e++) this.lineTo(t[e].x, t[e].y);
      return this;
    }
    moveTo(t, e) {
      return (this.currentPoint.set(t, e), this);
    }
    lineTo(t, e) {
      const s = new Rn(this.currentPoint.clone(), new E(t, e));
      return (this.curves.push(s), this.currentPoint.set(t, e), this);
    }
    quadraticCurveTo(t, e, s, n) {
      const i = new In(this.currentPoint.clone(), new E(t, e), new E(s, n));
      return (this.curves.push(i), this.currentPoint.set(s, n), this);
    }
    bezierCurveTo(t, e, s, n, i, o) {
      const a = new On(
        this.currentPoint.clone(),
        new E(t, e),
        new E(s, n),
        new E(i, o),
      );
      return (this.curves.push(a), this.currentPoint.set(i, o), this);
    }
    splineThru(t) {
      const e = [this.currentPoint.clone()].concat(t),
        s = new Se(e);
      return (
        this.curves.push(s),
        this.currentPoint.copy(t[t.length - 1]),
        this
      );
    }
    arc(t, e, s, n, i, o) {
      const a = this.currentPoint.x,
        h = this.currentPoint.y;
      return (this.absarc(t + a, e + h, s, n, i, o), this);
    }
    absarc(t, e, s, n, i, o) {
      return (this.absellipse(t, e, s, s, n, i, o), this);
    }
    ellipse(t, e, s, n, i, o, a, h) {
      const l = this.currentPoint.x,
        c = this.currentPoint.y;
      return (this.absellipse(t + l, e + c, s, n, i, o, a, h), this);
    }
    absellipse(t, e, s, n, i, o, a, h) {
      const l = new Os(t, e, s, n, i, o, a, h);
      if (this.curves.length > 0) {
        const u = l.getPoint(0);
        u.equals(this.currentPoint) || this.lineTo(u.x, u.y);
      }
      this.curves.push(l);
      const c = l.getPoint(1);
      return (this.currentPoint.copy(c), this);
    }
    copy(t) {
      return (super.copy(t), this.currentPoint.copy(t.currentPoint), this);
    }
    toJSON() {
      const t = super.toJSON();
      return ((t.currentPoint = this.currentPoint.toArray()), t);
    }
    fromJSON(t) {
      return (
        super.fromJSON(t),
        this.currentPoint.fromArray(t.currentPoint),
        this
      );
    }
  }
  class ae extends nt {
    constructor(
      t = [new E(0, -0.5), new E(0.5, 0), new E(0, 0.5)],
      e = 12,
      s = 0,
      n = Math.PI * 2,
    ) {
      (super(),
        (this.type = "LatheGeometry"),
        (this.parameters = {
          points: t,
          segments: e,
          phiStart: s,
          phiLength: n,
        }),
        (e = Math.floor(e)),
        (n = H(n, 0, Math.PI * 2)));
      const i = [],
        o = [],
        a = [],
        h = [],
        l = [],
        c = 1 / e,
        u = new y(),
        p = new E(),
        f = new y(),
        d = new y(),
        m = new y();
      let x = 0,
        b = 0;
      for (let g = 0; g <= t.length - 1; g++)
        switch (g) {
          case 0:
            ((x = t[g + 1].x - t[g].x),
              (b = t[g + 1].y - t[g].y),
              (f.x = b * 1),
              (f.y = -x),
              (f.z = b * 0),
              m.copy(f),
              f.normalize(),
              h.push(f.x, f.y, f.z));
            break;
          case t.length - 1:
            h.push(m.x, m.y, m.z);
            break;
          default:
            ((x = t[g + 1].x - t[g].x),
              (b = t[g + 1].y - t[g].y),
              (f.x = b * 1),
              (f.y = -x),
              (f.z = b * 0),
              d.copy(f),
              (f.x += m.x),
              (f.y += m.y),
              (f.z += m.z),
              f.normalize(),
              h.push(f.x, f.y, f.z),
              m.copy(d));
        }
      for (let g = 0; g <= e; g++) {
        const w = s + g * c * n,
          M = Math.sin(w),
          z = Math.cos(w);
        for (let v = 0; v <= t.length - 1; v++) {
          ((u.x = t[v].x * M),
            (u.y = t[v].y),
            (u.z = t[v].x * z),
            o.push(u.x, u.y, u.z),
            (p.x = g / e),
            (p.y = v / (t.length - 1)),
            a.push(p.x, p.y));
          const _ = h[3 * v + 0] * M,
            A = h[3 * v + 1],
            C = h[3 * v + 0] * z;
          l.push(_, A, C);
        }
      }
      for (let g = 0; g < e; g++)
        for (let w = 0; w < t.length - 1; w++) {
          const M = w + g * t.length,
            z = M,
            v = M + t.length,
            _ = M + t.length + 1,
            A = M + 1;
          (i.push(z, v, A), i.push(_, A, v));
        }
      (this.setIndex(i),
        this.setAttribute("position", new X(o, 3)),
        this.setAttribute("uv", new X(a, 2)),
        this.setAttribute("normal", new X(l, 3)));
    }
    copy(t) {
      return (
        super.copy(t),
        (this.parameters = Object.assign({}, t.parameters)),
        this
      );
    }
    static fromJSON(t) {
      return new ae(t.points, t.segments, t.phiStart, t.phiLength);
    }
  }
  class Us extends nt {
    constructor(t = 1, e = 32, s = 0, n = Math.PI * 2) {
      (super(),
        (this.type = "CircleGeometry"),
        (this.parameters = {
          radius: t,
          segments: e,
          thetaStart: s,
          thetaLength: n,
        }),
        (e = Math.max(3, e)));
      const i = [],
        o = [],
        a = [],
        h = [],
        l = new y(),
        c = new E();
      (o.push(0, 0, 0), a.push(0, 0, 1), h.push(0.5, 0.5));
      for (let u = 0, p = 3; u <= e; u++, p += 3) {
        const f = s + (u / e) * n;
        ((l.x = t * Math.cos(f)),
          (l.y = t * Math.sin(f)),
          o.push(l.x, l.y, l.z),
          a.push(0, 0, 1),
          (c.x = (o[p] / t + 1) / 2),
          (c.y = (o[p + 1] / t + 1) / 2),
          h.push(c.x, c.y));
      }
      for (let u = 1; u <= e; u++) i.push(u, u + 1, 0);
      (this.setIndex(i),
        this.setAttribute("position", new X(o, 3)),
        this.setAttribute("normal", new X(a, 3)),
        this.setAttribute("uv", new X(h, 2)));
    }
    copy(t) {
      return (
        super.copy(t),
        (this.parameters = Object.assign({}, t.parameters)),
        this
      );
    }
    static fromJSON(t) {
      return new Us(t.radius, t.segments, t.thetaStart, t.thetaLength);
    }
  }
  class Tt extends nt {
    constructor(
      t = 1,
      e = 1,
      s = 1,
      n = 32,
      i = 1,
      o = !1,
      a = 0,
      h = Math.PI * 2,
    ) {
      (super(),
        (this.type = "CylinderGeometry"),
        (this.parameters = {
          radiusTop: t,
          radiusBottom: e,
          height: s,
          radialSegments: n,
          heightSegments: i,
          openEnded: o,
          thetaStart: a,
          thetaLength: h,
        }));
      const l = this;
      ((n = Math.floor(n)), (i = Math.floor(i)));
      const c = [],
        u = [],
        p = [],
        f = [];
      let d = 0;
      const m = [],
        x = s / 2;
      let b = 0;
      (g(),
        o === !1 && (t > 0 && w(!0), e > 0 && w(!1)),
        this.setIndex(c),
        this.setAttribute("position", new X(u, 3)),
        this.setAttribute("normal", new X(p, 3)),
        this.setAttribute("uv", new X(f, 2)));
      function g() {
        const M = new y(),
          z = new y();
        let v = 0;
        const _ = (e - t) / s;
        for (let A = 0; A <= i; A++) {
          const C = [],
            S = A / i,
            F = S * (e - t) + t;
          for (let I = 0; I <= n; I++) {
            const R = I / n,
              N = R * h + a,
              Z = Math.sin(N),
              U = Math.cos(N);
            ((z.x = F * Z),
              (z.y = -S * s + x),
              (z.z = F * U),
              u.push(z.x, z.y, z.z),
              M.set(Z, _, U).normalize(),
              p.push(M.x, M.y, M.z),
              f.push(R, 1 - S),
              C.push(d++));
          }
          m.push(C);
        }
        for (let A = 0; A < n; A++)
          for (let C = 0; C < i; C++) {
            const S = m[C][A],
              F = m[C + 1][A],
              I = m[C + 1][A + 1],
              R = m[C][A + 1];
            ((t > 0 || C !== 0) && (c.push(S, F, R), (v += 3)),
              (e > 0 || C !== i - 1) && (c.push(F, I, R), (v += 3)));
          }
        (l.addGroup(b, v, 0), (b += v));
      }
      function w(M) {
        const z = d,
          v = new E(),
          _ = new y();
        let A = 0;
        const C = M === !0 ? t : e,
          S = M === !0 ? 1 : -1;
        for (let I = 1; I <= n; I++)
          (u.push(0, x * S, 0), p.push(0, S, 0), f.push(0.5, 0.5), d++);
        const F = d;
        for (let I = 0; I <= n; I++) {
          const N = (I / n) * h + a,
            Z = Math.cos(N),
            U = Math.sin(N);
          ((_.x = C * U),
            (_.y = x * S),
            (_.z = C * Z),
            u.push(_.x, _.y, _.z),
            p.push(0, S, 0),
            (v.x = Z * 0.5 + 0.5),
            (v.y = U * 0.5 * S + 0.5),
            f.push(v.x, v.y),
            d++);
        }
        for (let I = 0; I < n; I++) {
          const R = z + I,
            N = F + I;
          (M === !0 ? c.push(N, N + 1, R) : c.push(N + 1, N, R), (A += 3));
        }
        (l.addGroup(b, A, M === !0 ? 1 : 2), (b += A));
      }
    }
    copy(t) {
      return (
        super.copy(t),
        (this.parameters = Object.assign({}, t.parameters)),
        this
      );
    }
    static fromJSON(t) {
      return new Tt(
        t.radiusTop,
        t.radiusBottom,
        t.height,
        t.radialSegments,
        t.heightSegments,
        t.openEnded,
        t.thetaStart,
        t.thetaLength,
      );
    }
  }
  class Xs extends nt {
    constructor(t = [], e = [], s = 1, n = 0) {
      (super(),
        (this.type = "PolyhedronGeometry"),
        (this.parameters = { vertices: t, indices: e, radius: s, detail: n }));
      const i = [],
        o = [];
      (a(n),
        l(s),
        c(),
        this.setAttribute("position", new X(i, 3)),
        this.setAttribute("normal", new X(i.slice(), 3)),
        this.setAttribute("uv", new X(o, 2)),
        n === 0 ? this.computeVertexNormals() : this.normalizeNormals());
      function a(g) {
        const w = new y(),
          M = new y(),
          z = new y();
        for (let v = 0; v < e.length; v += 3)
          (f(e[v + 0], w), f(e[v + 1], M), f(e[v + 2], z), h(w, M, z, g));
      }
      function h(g, w, M, z) {
        const v = z + 1,
          _ = [];
        for (let A = 0; A <= v; A++) {
          _[A] = [];
          const C = g.clone().lerp(M, A / v),
            S = w.clone().lerp(M, A / v),
            F = v - A;
          for (let I = 0; I <= F; I++)
            I === 0 && A === v
              ? (_[A][I] = C)
              : (_[A][I] = C.clone().lerp(S, I / F));
        }
        for (let A = 0; A < v; A++)
          for (let C = 0; C < 2 * (v - A) - 1; C++) {
            const S = Math.floor(C / 2);
            C % 2 === 0
              ? (p(_[A][S + 1]), p(_[A + 1][S]), p(_[A][S]))
              : (p(_[A][S + 1]), p(_[A + 1][S + 1]), p(_[A + 1][S]));
          }
      }
      function l(g) {
        const w = new y();
        for (let M = 0; M < i.length; M += 3)
          ((w.x = i[M + 0]),
            (w.y = i[M + 1]),
            (w.z = i[M + 2]),
            w.normalize().multiplyScalar(g),
            (i[M + 0] = w.x),
            (i[M + 1] = w.y),
            (i[M + 2] = w.z));
      }
      function c() {
        const g = new y();
        for (let w = 0; w < i.length; w += 3) {
          ((g.x = i[w + 0]), (g.y = i[w + 1]), (g.z = i[w + 2]));
          const M = x(g) / 2 / Math.PI + 0.5,
            z = b(g) / Math.PI + 0.5;
          o.push(M, 1 - z);
        }
        (d(), u());
      }
      function u() {
        for (let g = 0; g < o.length; g += 6) {
          const w = o[g + 0],
            M = o[g + 2],
            z = o[g + 4],
            v = Math.max(w, M, z),
            _ = Math.min(w, M, z);
          v > 0.9 &&
            _ < 0.1 &&
            (w < 0.2 && (o[g + 0] += 1),
            M < 0.2 && (o[g + 2] += 1),
            z < 0.2 && (o[g + 4] += 1));
        }
      }
      function p(g) {
        i.push(g.x, g.y, g.z);
      }
      function f(g, w) {
        const M = g * 3;
        ((w.x = t[M + 0]), (w.y = t[M + 1]), (w.z = t[M + 2]));
      }
      function d() {
        const g = new y(),
          w = new y(),
          M = new y(),
          z = new y(),
          v = new E(),
          _ = new E(),
          A = new E();
        for (let C = 0, S = 0; C < i.length; C += 9, S += 6) {
          (g.set(i[C + 0], i[C + 1], i[C + 2]),
            w.set(i[C + 3], i[C + 4], i[C + 5]),
            M.set(i[C + 6], i[C + 7], i[C + 8]),
            v.set(o[S + 0], o[S + 1]),
            _.set(o[S + 2], o[S + 3]),
            A.set(o[S + 4], o[S + 5]),
            z.copy(g).add(w).add(M).divideScalar(3));
          const F = x(z);
          (m(v, S + 0, g, F), m(_, S + 2, w, F), m(A, S + 4, M, F));
        }
      }
      function m(g, w, M, z) {
        (z < 0 && g.x === 1 && (o[w] = g.x - 1),
          M.x === 0 && M.z === 0 && (o[w] = z / 2 / Math.PI + 0.5));
      }
      function x(g) {
        return Math.atan2(g.z, -g.x);
      }
      function b(g) {
        return Math.atan2(-g.y, Math.sqrt(g.x * g.x + g.z * g.z));
      }
    }
    copy(t) {
      return (
        super.copy(t),
        (this.parameters = Object.assign({}, t.parameters)),
        this
      );
    }
    static fromJSON(t) {
      return new Xs(t.vertices, t.indices, t.radius, t.details);
    }
  }
  class he extends Ds {
    constructor(t) {
      (super(t), (this.uuid = de()), (this.type = "Shape"), (this.holes = []));
    }
    getPointsHoles(t) {
      const e = [];
      for (let s = 0, n = this.holes.length; s < n; s++)
        e[s] = this.holes[s].getPoints(t);
      return e;
    }
    extractPoints(t) {
      return { shape: this.getPoints(t), holes: this.getPointsHoles(t) };
    }
    copy(t) {
      (super.copy(t), (this.holes = []));
      for (let e = 0, s = t.holes.length; e < s; e++) {
        const n = t.holes[e];
        this.holes.push(n.clone());
      }
      return this;
    }
    toJSON() {
      const t = super.toJSON();
      ((t.uuid = this.uuid), (t.holes = []));
      for (let e = 0, s = this.holes.length; e < s; e++) {
        const n = this.holes[e];
        t.holes.push(n.toJSON());
      }
      return t;
    }
    fromJSON(t) {
      (super.fromJSON(t), (this.uuid = t.uuid), (this.holes = []));
      for (let e = 0, s = t.holes.length; e < s; e++) {
        const n = t.holes[e];
        this.holes.push(new Ds().fromJSON(n));
      }
      return this;
    }
  }
  class _r {
    static triangulate(t, e, s = 2) {
      const n = e && e.length,
        i = n ? e[0] * s : t.length;
      let o = Ln(t, 0, i, s, !0);
      const a = [];
      if (!o || o.next === o.prev) return a;
      let h, l, c, u, p, f, d;
      if ((n && (o = kr(t, e, o, s)), t.length > 80 * s)) {
        ((h = c = t[0]), (l = u = t[1]));
        for (let m = s; m < i; m += s)
          ((p = t[m]),
            (f = t[m + 1]),
            p < h && (h = p),
            f < l && (l = f),
            p > c && (c = p),
            f > u && (u = f));
        ((d = Math.max(c - h, u - l)), (d = d !== 0 ? 32767 / d : 0));
      }
      return (Ve(o, a, s, h, l, d, 0), a);
    }
  }
  function Ln(r, t, e, s, n) {
    let i, o;
    if (n === Xr(r, t, e, s) > 0)
      for (i = t; i < e; i += s) o = Xn(i, r[i], r[i + 1], o);
    else for (i = e - s; i >= t; i -= s) o = Xn(i, r[i], r[i + 1], o);
    return (o && as(o, o.next) && (Ge(o), (o = o.next)), o);
  }
  function ce(r, t) {
    if (!r) return r;
    t || (t = r);
    let e = r,
      s;
    do
      if (
        ((s = !1), !e.steiner && (as(e, e.next) || Q(e.prev, e, e.next) === 0))
      ) {
        if ((Ge(e), (e = t = e.prev), e === e.next)) break;
        s = !0;
      } else e = e.next;
    while (s || e !== t);
    return t;
  }
  function Ve(r, t, e, s, n, i, o) {
    if (!r) return;
    !o && i && Rr(r, s, n, i);
    let a = r,
      h,
      l;
    for (; r.prev !== r.next;) {
      if (((h = r.prev), (l = r.next), i ? Cr(r, s, n, i) : Sr(r))) {
        (t.push((h.i / e) | 0),
          t.push((r.i / e) | 0),
          t.push((l.i / e) | 0),
          Ge(r),
          (r = l.next),
          (a = l.next));
        continue;
      }
      if (((r = l), r === a)) {
        o
          ? o === 1
            ? ((r = Er(ce(r), t, e)), Ve(r, t, e, s, n, i, 2))
            : o === 2 && Fr(r, t, e, s, n, i)
          : Ve(ce(r), t, e, s, n, i, 1);
        break;
      }
    }
  }
  function Sr(r) {
    const t = r.prev,
      e = r,
      s = r.next;
    if (Q(t, e, s) >= 0) return !1;
    const n = t.x,
      i = e.x,
      o = s.x,
      a = t.y,
      h = e.y,
      l = s.y,
      c = n < i ? (n < o ? n : o) : i < o ? i : o,
      u = a < h ? (a < l ? a : l) : h < l ? h : l,
      p = n > i ? (n > o ? n : o) : i > o ? i : o,
      f = a > h ? (a > l ? a : l) : h > l ? h : l;
    let d = s.next;
    for (; d !== t;) {
      if (
        d.x >= c &&
        d.x <= p &&
        d.y >= u &&
        d.y <= f &&
        Ce(n, a, i, h, o, l, d.x, d.y) &&
        Q(d.prev, d, d.next) >= 0
      )
        return !1;
      d = d.next;
    }
    return !0;
  }
  function Cr(r, t, e, s) {
    const n = r.prev,
      i = r,
      o = r.next;
    if (Q(n, i, o) >= 0) return !1;
    const a = n.x,
      h = i.x,
      l = o.x,
      c = n.y,
      u = i.y,
      p = o.y,
      f = a < h ? (a < l ? a : l) : h < l ? h : l,
      d = c < u ? (c < p ? c : p) : u < p ? u : p,
      m = a > h ? (a > l ? a : l) : h > l ? h : l,
      x = c > u ? (c > p ? c : p) : u > p ? u : p,
      b = Zs(f, d, t, e, s),
      g = Zs(m, x, t, e, s);
    let w = r.prevZ,
      M = r.nextZ;
    for (; w && w.z >= b && M && M.z <= g;) {
      if (
        (w.x >= f &&
          w.x <= m &&
          w.y >= d &&
          w.y <= x &&
          w !== n &&
          w !== o &&
          Ce(a, c, h, u, l, p, w.x, w.y) &&
          Q(w.prev, w, w.next) >= 0) ||
        ((w = w.prevZ),
        M.x >= f &&
          M.x <= m &&
          M.y >= d &&
          M.y <= x &&
          M !== n &&
          M !== o &&
          Ce(a, c, h, u, l, p, M.x, M.y) &&
          Q(M.prev, M, M.next) >= 0)
      )
        return !1;
      M = M.nextZ;
    }
    for (; w && w.z >= b;) {
      if (
        w.x >= f &&
        w.x <= m &&
        w.y >= d &&
        w.y <= x &&
        w !== n &&
        w !== o &&
        Ce(a, c, h, u, l, p, w.x, w.y) &&
        Q(w.prev, w, w.next) >= 0
      )
        return !1;
      w = w.prevZ;
    }
    for (; M && M.z <= g;) {
      if (
        M.x >= f &&
        M.x <= m &&
        M.y >= d &&
        M.y <= x &&
        M !== n &&
        M !== o &&
        Ce(a, c, h, u, l, p, M.x, M.y) &&
        Q(M.prev, M, M.next) >= 0
      )
        return !1;
      M = M.nextZ;
    }
    return !0;
  }
  function Er(r, t, e) {
    let s = r;
    do {
      const n = s.prev,
        i = s.next.next;
      (!as(n, i) &&
        Dn(n, s, s.next, i) &&
        Ye(n, i) &&
        Ye(i, n) &&
        (t.push((n.i / e) | 0),
        t.push((s.i / e) | 0),
        t.push((i.i / e) | 0),
        Ge(s),
        Ge(s.next),
        (s = r = i)),
        (s = s.next));
    } while (s !== r);
    return ce(s);
  }
  function Fr(r, t, e, s, n, i) {
    let o = r;
    do {
      let a = o.next.next;
      for (; a !== o.prev;) {
        if (o.i !== a.i && Lr(o, a)) {
          let h = Un(o, a);
          ((o = ce(o, o.next)),
            (h = ce(h, h.next)),
            Ve(o, t, e, s, n, i, 0),
            Ve(h, t, e, s, n, i, 0));
          return;
        }
        a = a.next;
      }
      o = o.next;
    } while (o !== r);
  }
  function kr(r, t, e, s) {
    const n = [];
    let i, o, a, h, l;
    for (i = 0, o = t.length; i < o; i++)
      ((a = t[i] * s),
        (h = i < o - 1 ? t[i + 1] * s : r.length),
        (l = Ln(r, a, h, s, !1)),
        l === l.next && (l.steiner = !0),
        n.push(Nr(l)));
    for (n.sort(Pr), i = 0; i < n.length; i++) e = Tr(n[i], e);
    return e;
  }
  function Pr(r, t) {
    return r.x - t.x;
  }
  function Tr(r, t) {
    const e = Br(r, t);
    if (!e) return t;
    const s = Un(e, r);
    return (ce(s, s.next), ce(e, e.next));
  }
  function Br(r, t) {
    let e = t,
      s = -1 / 0,
      n;
    const i = r.x,
      o = r.y;
    do {
      if (o <= e.y && o >= e.next.y && e.next.y !== e.y) {
        const p = e.x + ((o - e.y) * (e.next.x - e.x)) / (e.next.y - e.y);
        if (
          p <= i &&
          p > s &&
          ((s = p), (n = e.x < e.next.x ? e : e.next), p === i)
        )
          return n;
      }
      e = e.next;
    } while (e !== t);
    if (!n) return null;
    const a = n,
      h = n.x,
      l = n.y;
    let c = 1 / 0,
      u;
    e = n;
    do
      (i >= e.x &&
        e.x >= h &&
        i !== e.x &&
        Ce(o < l ? i : s, o, h, l, o < l ? s : i, o, e.x, e.y) &&
        ((u = Math.abs(o - e.y) / (i - e.x)),
        Ye(e, r) &&
          (u < c || (u === c && (e.x > n.x || (e.x === n.x && Or(n, e))))) &&
          ((n = e), (c = u))),
        (e = e.next));
    while (e !== a);
    return n;
  }
  function Or(r, t) {
    return Q(r.prev, r, t.prev) < 0 && Q(t.next, r, r.next) < 0;
  }
  function Rr(r, t, e, s) {
    let n = r;
    do
      (n.z === 0 && (n.z = Zs(n.x, n.y, t, e, s)),
        (n.prevZ = n.prev),
        (n.nextZ = n.next),
        (n = n.next));
    while (n !== r);
    ((n.prevZ.nextZ = null), (n.prevZ = null), Ir(n));
  }
  function Ir(r) {
    let t,
      e,
      s,
      n,
      i,
      o,
      a,
      h,
      l = 1;
    do {
      for (e = r, r = null, i = null, o = 0; e;) {
        for (o++, s = e, a = 0, t = 0; t < l && (a++, (s = s.nextZ), !!s); t++);
        for (h = l; a > 0 || (h > 0 && s);)
          (a !== 0 && (h === 0 || !s || e.z <= s.z)
            ? ((n = e), (e = e.nextZ), a--)
            : ((n = s), (s = s.nextZ), h--),
            i ? (i.nextZ = n) : (r = n),
            (n.prevZ = i),
            (i = n));
        e = s;
      }
      ((i.nextZ = null), (l *= 2));
    } while (o > 1);
    return r;
  }
  function Zs(r, t, e, s, n) {
    return (
      (r = ((r - e) * n) | 0),
      (t = ((t - s) * n) | 0),
      (r = (r | (r << 8)) & 16711935),
      (r = (r | (r << 4)) & 252645135),
      (r = (r | (r << 2)) & 858993459),
      (r = (r | (r << 1)) & 1431655765),
      (t = (t | (t << 8)) & 16711935),
      (t = (t | (t << 4)) & 252645135),
      (t = (t | (t << 2)) & 858993459),
      (t = (t | (t << 1)) & 1431655765),
      r | (t << 1)
    );
  }
  function Nr(r) {
    let t = r,
      e = r;
    do ((t.x < e.x || (t.x === e.x && t.y < e.y)) && (e = t), (t = t.next));
    while (t !== r);
    return e;
  }
  function Ce(r, t, e, s, n, i, o, a) {
    return (
      (n - o) * (t - a) >= (r - o) * (i - a) &&
      (r - o) * (s - a) >= (e - o) * (t - a) &&
      (e - o) * (i - a) >= (n - o) * (s - a)
    );
  }
  function Lr(r, t) {
    return (
      r.next.i !== t.i &&
      r.prev.i !== t.i &&
      !Dr(r, t) &&
      ((Ye(r, t) &&
        Ye(t, r) &&
        Ur(r, t) &&
        (Q(r.prev, r, t.prev) || Q(r, t.prev, t))) ||
        (as(r, t) && Q(r.prev, r, r.next) > 0 && Q(t.prev, t, t.next) > 0))
    );
  }
  function Q(r, t, e) {
    return (t.y - r.y) * (e.x - t.x) - (t.x - r.x) * (e.y - t.y);
  }
  function as(r, t) {
    return r.x === t.x && r.y === t.y;
  }
  function Dn(r, t, e, s) {
    const n = cs(Q(r, t, e)),
      i = cs(Q(r, t, s)),
      o = cs(Q(e, s, r)),
      a = cs(Q(e, s, t));
    return !!(
      (n !== i && o !== a) ||
      (n === 0 && hs(r, e, t)) ||
      (i === 0 && hs(r, s, t)) ||
      (o === 0 && hs(e, r, s)) ||
      (a === 0 && hs(e, t, s))
    );
  }
  function hs(r, t, e) {
    return (
      t.x <= Math.max(r.x, e.x) &&
      t.x >= Math.min(r.x, e.x) &&
      t.y <= Math.max(r.y, e.y) &&
      t.y >= Math.min(r.y, e.y)
    );
  }
  function cs(r) {
    return r > 0 ? 1 : r < 0 ? -1 : 0;
  }
  function Dr(r, t) {
    let e = r;
    do {
      if (
        e.i !== r.i &&
        e.next.i !== r.i &&
        e.i !== t.i &&
        e.next.i !== t.i &&
        Dn(e, e.next, r, t)
      )
        return !0;
      e = e.next;
    } while (e !== r);
    return !1;
  }
  function Ye(r, t) {
    return Q(r.prev, r, r.next) < 0
      ? Q(r, t, r.next) >= 0 && Q(r, r.prev, t) >= 0
      : Q(r, t, r.prev) < 0 || Q(r, r.next, t) < 0;
  }
  function Ur(r, t) {
    let e = r,
      s = !1;
    const n = (r.x + t.x) / 2,
      i = (r.y + t.y) / 2;
    do
      (e.y > i != e.next.y > i &&
        e.next.y !== e.y &&
        n < ((e.next.x - e.x) * (i - e.y)) / (e.next.y - e.y) + e.x &&
        (s = !s),
        (e = e.next));
    while (e !== r);
    return s;
  }
  function Un(r, t) {
    const e = new Vs(r.i, r.x, r.y),
      s = new Vs(t.i, t.x, t.y),
      n = r.next,
      i = t.prev;
    return (
      (r.next = t),
      (t.prev = r),
      (e.next = n),
      (n.prev = e),
      (s.next = e),
      (e.prev = s),
      (i.next = s),
      (s.prev = i),
      s
    );
  }
  function Xn(r, t, e, s) {
    const n = new Vs(r, t, e);
    return (
      s
        ? ((n.next = s.next), (n.prev = s), (s.next.prev = n), (s.next = n))
        : ((n.prev = n), (n.next = n)),
      n
    );
  }
  function Ge(r) {
    ((r.next.prev = r.prev),
      (r.prev.next = r.next),
      r.prevZ && (r.prevZ.nextZ = r.nextZ),
      r.nextZ && (r.nextZ.prevZ = r.prevZ));
  }
  function Vs(r, t, e) {
    ((this.i = r),
      (this.x = t),
      (this.y = e),
      (this.prev = null),
      (this.next = null),
      (this.z = 0),
      (this.prevZ = null),
      (this.nextZ = null),
      (this.steiner = !1));
  }
  function Xr(r, t, e, s) {
    let n = 0;
    for (let i = t, o = e - s; i < e; i += s)
      ((n += (r[o] - r[i]) * (r[i + 1] + r[o + 1])), (o = i));
    return n;
  }
  class te {
    static area(t) {
      const e = t.length;
      let s = 0;
      for (let n = e - 1, i = 0; i < e; n = i++)
        s += t[n].x * t[i].y - t[i].x * t[n].y;
      return s * 0.5;
    }
    static isClockWise(t) {
      return te.area(t) < 0;
    }
    static triangulateShape(t, e) {
      const s = [],
        n = [],
        i = [];
      (Zn(t), Vn(s, t));
      let o = t.length;
      e.forEach(Zn);
      for (let h = 0; h < e.length; h++)
        (n.push(o), (o += e[h].length), Vn(s, e[h]));
      const a = _r.triangulate(s, n);
      for (let h = 0; h < a.length; h += 3) i.push(a.slice(h, h + 3));
      return i;
    }
  }
  function Zn(r) {
    const t = r.length;
    t > 2 && r[t - 1].equals(r[0]) && r.pop();
  }
  function Vn(r, t) {
    for (let e = 0; e < t.length; e++) (r.push(t[e].x), r.push(t[e].y));
  }
  class Ee extends nt {
    constructor(
      t = new he([
        new E(0.5, 0.5),
        new E(-0.5, 0.5),
        new E(-0.5, -0.5),
        new E(0.5, -0.5),
      ]),
      e = {},
    ) {
      (super(),
        (this.type = "ExtrudeGeometry"),
        (this.parameters = { shapes: t, options: e }),
        (t = Array.isArray(t) ? t : [t]));
      const s = this,
        n = [],
        i = [];
      for (let a = 0, h = t.length; a < h; a++) {
        const l = t[a];
        o(l);
      }
      (this.setAttribute("position", new X(n, 3)),
        this.setAttribute("uv", new X(i, 2)),
        this.computeVertexNormals());
      function o(a) {
        const h = [],
          l = e.curveSegments !== void 0 ? e.curveSegments : 12,
          c = e.steps !== void 0 ? e.steps : 1,
          u = e.depth !== void 0 ? e.depth : 1;
        let p = e.bevelEnabled !== void 0 ? e.bevelEnabled : !0,
          f = e.bevelThickness !== void 0 ? e.bevelThickness : 0.2,
          d = e.bevelSize !== void 0 ? e.bevelSize : f - 0.1,
          m = e.bevelOffset !== void 0 ? e.bevelOffset : 0,
          x = e.bevelSegments !== void 0 ? e.bevelSegments : 3;
        const b = e.extrudePath,
          g = e.UVGenerator !== void 0 ? e.UVGenerator : Zr;
        let w,
          M = !1,
          z,
          v,
          _,
          A;
        (b &&
          ((w = b.getSpacedPoints(c)),
          (M = !0),
          (p = !1),
          (z = b.computeFrenetFrames(c, !1)),
          (v = new y()),
          (_ = new y()),
          (A = new y())),
          p || ((x = 0), (f = 0), (d = 0), (m = 0)));
        const C = a.extractPoints(l);
        let S = C.shape;
        const F = C.holes;
        if (!te.isClockWise(S)) {
          S = S.reverse();
          for (let k = 0, P = F.length; k < P; k++) {
            const T = F[k];
            te.isClockWise(T) && (F[k] = T.reverse());
          }
        }
        const R = te.triangulateShape(S, F),
          N = S;
        for (let k = 0, P = F.length; k < P; k++) {
          const T = F[k];
          S = S.concat(T);
        }
        function Z(k, P, T) {
          return (
            P || console.error("THREE.ExtrudeGeometry: vec does not exist"),
            k.clone().addScaledVector(P, T)
          );
        }
        const U = S.length,
          G = R.length;
        function ht(k, P, T) {
          let D, O, W;
          const j = k.x - P.x,
            K = k.y - P.y,
            gt = T.x - k.x,
            ut = T.y - k.y,
            qe = j * j + K * K,
            mn = j * ut - K * gt;
          if (Math.abs(mn) > Number.EPSILON) {
            const Ht = Math.sqrt(qe),
              Ei = Math.sqrt(gt * gt + ut * ut),
              Fi = P.x - K / Ht,
              ki = P.y + j / Ht,
              Ho = T.x - ut / Ei,
              Wo = T.y + gt / Ei,
              Pi = ((Ho - Fi) * ut - (Wo - ki) * gt) / (j * ut - K * gt);
            ((D = Fi + j * Pi - k.x), (O = ki + K * Pi - k.y));
            const Ti = D * D + O * O;
            if (Ti <= 2) return new E(D, O);
            W = Math.sqrt(Ti / 2);
          } else {
            let Ht = !1;
            (j > Number.EPSILON
              ? gt > Number.EPSILON && (Ht = !0)
              : j < -Number.EPSILON
                ? gt < -Number.EPSILON && (Ht = !0)
                : Math.sign(K) === Math.sign(ut) && (Ht = !0),
              Ht
                ? ((D = -K), (O = j), (W = Math.sqrt(qe)))
                : ((D = j), (O = K), (W = Math.sqrt(qe / 2))));
          }
          return new E(D / W, O / W);
        }
        const J = [];
        for (
          let k = 0, P = N.length, T = P - 1, D = k + 1;
          k < P;
          k++, T++, D++
        )
          (T === P && (T = 0),
            D === P && (D = 0),
            (J[k] = ht(N[k], N[T], N[D])));
        const q = [];
        let Y,
          bt = J.concat();
        for (let k = 0, P = F.length; k < P; k++) {
          const T = F[k];
          Y = [];
          for (
            let D = 0, O = T.length, W = O - 1, j = D + 1;
            D < O;
            D++, W++, j++
          )
            (W === O && (W = 0),
              j === O && (j = 0),
              (Y[D] = ht(T[D], T[W], T[j])));
          (q.push(Y), (bt = bt.concat(Y)));
        }
        for (let k = 0; k < x; k++) {
          const P = k / x,
            T = f * Math.cos((P * Math.PI) / 2),
            D = d * Math.sin((P * Math.PI) / 2) + m;
          for (let O = 0, W = N.length; O < W; O++) {
            const j = Z(N[O], J[O], D);
            Vt(j.x, j.y, -T);
          }
          for (let O = 0, W = F.length; O < W; O++) {
            const j = F[O];
            Y = q[O];
            for (let K = 0, gt = j.length; K < gt; K++) {
              const ut = Z(j[K], Y[K], D);
              Vt(ut.x, ut.y, -T);
            }
          }
        }
        const fe = d + m;
        for (let k = 0; k < U; k++) {
          const P = p ? Z(S[k], bt[k], fe) : S[k];
          M
            ? (_.copy(z.normals[0]).multiplyScalar(P.x),
              v.copy(z.binormals[0]).multiplyScalar(P.y),
              A.copy(w[0]).add(_).add(v),
              Vt(A.x, A.y, A.z))
            : Vt(P.x, P.y, 0);
        }
        for (let k = 1; k <= c; k++)
          for (let P = 0; P < U; P++) {
            const T = p ? Z(S[P], bt[P], fe) : S[P];
            M
              ? (_.copy(z.normals[k]).multiplyScalar(T.x),
                v.copy(z.binormals[k]).multiplyScalar(T.y),
                A.copy(w[k]).add(_).add(v),
                Vt(A.x, A.y, A.z))
              : Vt(T.x, T.y, (u / c) * k);
          }
        for (let k = x - 1; k >= 0; k--) {
          const P = k / x,
            T = f * Math.cos((P * Math.PI) / 2),
            D = d * Math.sin((P * Math.PI) / 2) + m;
          for (let O = 0, W = N.length; O < W; O++) {
            const j = Z(N[O], J[O], D);
            Vt(j.x, j.y, u + T);
          }
          for (let O = 0, W = F.length; O < W; O++) {
            const j = F[O];
            Y = q[O];
            for (let K = 0, gt = j.length; K < gt; K++) {
              const ut = Z(j[K], Y[K], D);
              M
                ? Vt(ut.x, ut.y + w[c - 1].y, w[c - 1].x + T)
                : Vt(ut.x, ut.y, u + T);
            }
          }
        }
        (dn(), Ms());
        function dn() {
          const k = n.length / 3;
          if (p) {
            let P = 0,
              T = U * P;
            for (let D = 0; D < G; D++) {
              const O = R[D];
              zs(O[2] + T, O[1] + T, O[0] + T);
            }
            ((P = c + x * 2), (T = U * P));
            for (let D = 0; D < G; D++) {
              const O = R[D];
              zs(O[0] + T, O[1] + T, O[2] + T);
            }
          } else {
            for (let P = 0; P < G; P++) {
              const T = R[P];
              zs(T[2], T[1], T[0]);
            }
            for (let P = 0; P < G; P++) {
              const T = R[P];
              zs(T[0] + U * c, T[1] + U * c, T[2] + U * c);
            }
          }
          s.addGroup(k, n.length / 3 - k, 0);
        }
        function Ms() {
          const k = n.length / 3;
          let P = 0;
          (Ci(N, P), (P += N.length));
          for (let T = 0, D = F.length; T < D; T++) {
            const O = F[T];
            (Ci(O, P), (P += O.length));
          }
          s.addGroup(k, n.length / 3 - k, 1);
        }
        function Ci(k, P) {
          let T = k.length;
          for (; --T >= 0;) {
            const D = T;
            let O = T - 1;
            O < 0 && (O = k.length - 1);
            for (let W = 0, j = c + x * 2; W < j; W++) {
              const K = U * W,
                gt = U * (W + 1),
                ut = P + D + K,
                qe = P + O + K,
                mn = P + O + gt,
                Ht = P + D + gt;
              Go(ut, qe, mn, Ht);
            }
          }
        }
        function Vt(k, P, T) {
          (h.push(k), h.push(P), h.push(T));
        }
        function zs(k, P, T) {
          (Yt(k), Yt(P), Yt(T));
          const D = n.length / 3,
            O = g.generateTopUV(s, n, D - 3, D - 2, D - 1);
          (Gt(O[0]), Gt(O[1]), Gt(O[2]));
        }
        function Go(k, P, T, D) {
          (Yt(k), Yt(P), Yt(D), Yt(P), Yt(T), Yt(D));
          const O = n.length / 3,
            W = g.generateSideWallUV(s, n, O - 6, O - 3, O - 2, O - 1);
          (Gt(W[0]), Gt(W[1]), Gt(W[3]), Gt(W[1]), Gt(W[2]), Gt(W[3]));
        }
        function Yt(k) {
          (n.push(h[k * 3 + 0]), n.push(h[k * 3 + 1]), n.push(h[k * 3 + 2]));
        }
        function Gt(k) {
          (i.push(k.x), i.push(k.y));
        }
      }
    }
    copy(t) {
      return (
        super.copy(t),
        (this.parameters = Object.assign({}, t.parameters)),
        this
      );
    }
    toJSON() {
      const t = super.toJSON(),
        e = this.parameters.shapes,
        s = this.parameters.options;
      return Vr(e, s, t);
    }
    static fromJSON(t, e) {
      const s = [];
      for (let i = 0, o = t.shapes.length; i < o; i++) {
        const a = e[t.shapes[i]];
        s.push(a);
      }
      const n = t.options.extrudePath;
      return (
        n !== void 0 && (t.options.extrudePath = new os[n.type]().fromJSON(n)),
        new Ee(s, t.options)
      );
    }
  }
  const Zr = {
    generateTopUV: function (r, t, e, s, n) {
      const i = t[e * 3],
        o = t[e * 3 + 1],
        a = t[s * 3],
        h = t[s * 3 + 1],
        l = t[n * 3],
        c = t[n * 3 + 1];
      return [new E(i, o), new E(a, h), new E(l, c)];
    },
    generateSideWallUV: function (r, t, e, s, n, i) {
      const o = t[e * 3],
        a = t[e * 3 + 1],
        h = t[e * 3 + 2],
        l = t[s * 3],
        c = t[s * 3 + 1],
        u = t[s * 3 + 2],
        p = t[n * 3],
        f = t[n * 3 + 1],
        d = t[n * 3 + 2],
        m = t[i * 3],
        x = t[i * 3 + 1],
        b = t[i * 3 + 2];
      return Math.abs(a - c) < Math.abs(o - l)
        ? [new E(o, 1 - h), new E(l, 1 - u), new E(p, 1 - d), new E(m, 1 - b)]
        : [new E(a, 1 - h), new E(c, 1 - u), new E(f, 1 - d), new E(x, 1 - b)];
    },
  };
  function Vr(r, t, e) {
    if (((e.shapes = []), Array.isArray(r)))
      for (let s = 0, n = r.length; s < n; s++) {
        const i = r[s];
        e.shapes.push(i.uuid);
      }
    else e.shapes.push(r.uuid);
    return (
      (e.options = Object.assign({}, t)),
      t.extrudePath !== void 0 &&
        (e.options.extrudePath = t.extrudePath.toJSON()),
      e
    );
  }
  class He extends Xs {
    constructor(t = 1, e = 0) {
      const s = (1 + Math.sqrt(5)) / 2,
        n = [
          -1,
          s,
          0,
          1,
          s,
          0,
          -1,
          -s,
          0,
          1,
          -s,
          0,
          0,
          -1,
          s,
          0,
          1,
          s,
          0,
          -1,
          -s,
          0,
          1,
          -s,
          s,
          0,
          -1,
          s,
          0,
          1,
          -s,
          0,
          -1,
          -s,
          0,
          1,
        ],
        i = [
          0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4,
          11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3,
          8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1,
        ];
      (super(n, i, t, e),
        (this.type = "IcosahedronGeometry"),
        (this.parameters = { radius: t, detail: e }));
    }
    static fromJSON(t) {
      return new He(t.radius, t.detail);
    }
  }
  class We extends nt {
    constructor(t = 1, e = 1, s = 1, n = 1) {
      (super(),
        (this.type = "PlaneGeometry"),
        (this.parameters = {
          width: t,
          height: e,
          widthSegments: s,
          heightSegments: n,
        }));
      const i = t / 2,
        o = e / 2,
        a = Math.floor(s),
        h = Math.floor(n),
        l = a + 1,
        c = h + 1,
        u = t / a,
        p = e / h,
        f = [],
        d = [],
        m = [],
        x = [];
      for (let b = 0; b < c; b++) {
        const g = b * p - o;
        for (let w = 0; w < l; w++) {
          const M = w * u - i;
          (d.push(M, -g, 0), m.push(0, 0, 1), x.push(w / a), x.push(1 - b / h));
        }
      }
      for (let b = 0; b < h; b++)
        for (let g = 0; g < a; g++) {
          const w = g + l * b,
            M = g + l * (b + 1),
            z = g + 1 + l * (b + 1),
            v = g + 1 + l * b;
          (f.push(w, M, v), f.push(M, z, v));
        }
      (this.setIndex(f),
        this.setAttribute("position", new X(d, 3)),
        this.setAttribute("normal", new X(m, 3)),
        this.setAttribute("uv", new X(x, 2)));
    }
    copy(t) {
      return (
        super.copy(t),
        (this.parameters = Object.assign({}, t.parameters)),
        this
      );
    }
    static fromJSON(t) {
      return new We(t.width, t.height, t.widthSegments, t.heightSegments);
    }
  }
  class Ys extends nt {
    constructor(
      t = new he([new E(0, 0.5), new E(-0.5, -0.5), new E(0.5, -0.5)]),
      e = 12,
    ) {
      (super(),
        (this.type = "ShapeGeometry"),
        (this.parameters = { shapes: t, curveSegments: e }));
      const s = [],
        n = [],
        i = [],
        o = [];
      let a = 0,
        h = 0;
      if (Array.isArray(t) === !1) l(t);
      else
        for (let c = 0; c < t.length; c++)
          (l(t[c]), this.addGroup(a, h, c), (a += h), (h = 0));
      (this.setIndex(s),
        this.setAttribute("position", new X(n, 3)),
        this.setAttribute("normal", new X(i, 3)),
        this.setAttribute("uv", new X(o, 2)));
      function l(c) {
        const u = n.length / 3,
          p = c.extractPoints(e);
        let f = p.shape;
        const d = p.holes;
        te.isClockWise(f) === !1 && (f = f.reverse());
        for (let x = 0, b = d.length; x < b; x++) {
          const g = d[x];
          te.isClockWise(g) === !0 && (d[x] = g.reverse());
        }
        const m = te.triangulateShape(f, d);
        for (let x = 0, b = d.length; x < b; x++) {
          const g = d[x];
          f = f.concat(g);
        }
        for (let x = 0, b = f.length; x < b; x++) {
          const g = f[x];
          (n.push(g.x, g.y, 0), i.push(0, 0, 1), o.push(g.x, g.y));
        }
        for (let x = 0, b = m.length; x < b; x++) {
          const g = m[x],
            w = g[0] + u,
            M = g[1] + u,
            z = g[2] + u;
          (s.push(w, M, z), (h += 3));
        }
      }
    }
    copy(t) {
      return (
        super.copy(t),
        (this.parameters = Object.assign({}, t.parameters)),
        this
      );
    }
    toJSON() {
      const t = super.toJSON(),
        e = this.parameters.shapes;
      return Yr(e, t);
    }
    static fromJSON(t, e) {
      const s = [];
      for (let n = 0, i = t.shapes.length; n < i; n++) {
        const o = e[t.shapes[n]];
        s.push(o);
      }
      return new Ys(s, t.curveSegments);
    }
  }
  function Yr(r, t) {
    if (((t.shapes = []), Array.isArray(r)))
      for (let e = 0, s = r.length; e < s; e++) {
        const n = r[e];
        t.shapes.push(n.uuid);
      }
    else t.shapes.push(r.uuid);
    return t;
  }
  class ct extends nt {
    constructor(
      t = 1,
      e = 32,
      s = 16,
      n = 0,
      i = Math.PI * 2,
      o = 0,
      a = Math.PI,
    ) {
      (super(),
        (this.type = "SphereGeometry"),
        (this.parameters = {
          radius: t,
          widthSegments: e,
          heightSegments: s,
          phiStart: n,
          phiLength: i,
          thetaStart: o,
          thetaLength: a,
        }),
        (e = Math.max(3, Math.floor(e))),
        (s = Math.max(2, Math.floor(s))));
      const h = Math.min(o + a, Math.PI);
      let l = 0;
      const c = [],
        u = new y(),
        p = new y(),
        f = [],
        d = [],
        m = [],
        x = [];
      for (let b = 0; b <= s; b++) {
        const g = [],
          w = b / s;
        let M = 0;
        b === 0 && o === 0
          ? (M = 0.5 / e)
          : b === s && h === Math.PI && (M = -0.5 / e);
        for (let z = 0; z <= e; z++) {
          const v = z / e;
          ((u.x = -t * Math.cos(n + v * i) * Math.sin(o + w * a)),
            (u.y = t * Math.cos(o + w * a)),
            (u.z = t * Math.sin(n + v * i) * Math.sin(o + w * a)),
            d.push(u.x, u.y, u.z),
            p.copy(u).normalize(),
            m.push(p.x, p.y, p.z),
            x.push(v + M, 1 - w),
            g.push(l++));
        }
        c.push(g);
      }
      for (let b = 0; b < s; b++)
        for (let g = 0; g < e; g++) {
          const w = c[b][g + 1],
            M = c[b][g],
            z = c[b + 1][g],
            v = c[b + 1][g + 1];
          ((b !== 0 || o > 0) && f.push(w, M, v),
            (b !== s - 1 || h < Math.PI) && f.push(M, z, v));
        }
      (this.setIndex(f),
        this.setAttribute("position", new X(d, 3)),
        this.setAttribute("normal", new X(m, 3)),
        this.setAttribute("uv", new X(x, 2)));
    }
    copy(t) {
      return (
        super.copy(t),
        (this.parameters = Object.assign({}, t.parameters)),
        this
      );
    }
    static fromJSON(t) {
      return new ct(
        t.radius,
        t.widthSegments,
        t.heightSegments,
        t.phiStart,
        t.phiLength,
        t.thetaStart,
        t.thetaLength,
      );
    }
  }
  class yt extends nt {
    constructor(t = 1, e = 0.4, s = 12, n = 48, i = Math.PI * 2) {
      (super(),
        (this.type = "TorusGeometry"),
        (this.parameters = {
          radius: t,
          tube: e,
          radialSegments: s,
          tubularSegments: n,
          arc: i,
        }),
        (s = Math.floor(s)),
        (n = Math.floor(n)));
      const o = [],
        a = [],
        h = [],
        l = [],
        c = new y(),
        u = new y(),
        p = new y();
      for (let f = 0; f <= s; f++)
        for (let d = 0; d <= n; d++) {
          const m = (d / n) * i,
            x = (f / s) * Math.PI * 2;
          ((u.x = (t + e * Math.cos(x)) * Math.cos(m)),
            (u.y = (t + e * Math.cos(x)) * Math.sin(m)),
            (u.z = e * Math.sin(x)),
            a.push(u.x, u.y, u.z),
            (c.x = t * Math.cos(m)),
            (c.y = t * Math.sin(m)),
            p.subVectors(u, c).normalize(),
            h.push(p.x, p.y, p.z),
            l.push(d / n),
            l.push(f / s));
        }
      for (let f = 1; f <= s; f++)
        for (let d = 1; d <= n; d++) {
          const m = (n + 1) * f + d - 1,
            x = (n + 1) * (f - 1) + d - 1,
            b = (n + 1) * (f - 1) + d,
            g = (n + 1) * f + d;
          (o.push(m, x, g), o.push(x, b, g));
        }
      (this.setIndex(o),
        this.setAttribute("position", new X(a, 3)),
        this.setAttribute("normal", new X(h, 3)),
        this.setAttribute("uv", new X(l, 2)));
    }
    copy(t) {
      return (
        super.copy(t),
        (this.parameters = Object.assign({}, t.parameters)),
        this
      );
    }
    static fromJSON(t) {
      return new yt(
        t.radius,
        t.tube,
        t.radialSegments,
        t.tubularSegments,
        t.arc,
      );
    }
  }
  class Dt extends nt {
    constructor(
      t = new Nn(new y(-1, -1, 0), new y(-1, 1, 0), new y(1, 1, 0)),
      e = 64,
      s = 1,
      n = 8,
      i = !1,
    ) {
      (super(),
        (this.type = "TubeGeometry"),
        (this.parameters = {
          path: t,
          tubularSegments: e,
          radius: s,
          radialSegments: n,
          closed: i,
        }));
      const o = t.computeFrenetFrames(e, i);
      ((this.tangents = o.tangents),
        (this.normals = o.normals),
        (this.binormals = o.binormals));
      const a = new y(),
        h = new y(),
        l = new E();
      let c = new y();
      const u = [],
        p = [],
        f = [],
        d = [];
      (m(),
        this.setIndex(d),
        this.setAttribute("position", new X(u, 3)),
        this.setAttribute("normal", new X(p, 3)),
        this.setAttribute("uv", new X(f, 2)));
      function m() {
        for (let w = 0; w < e; w++) x(w);
        (x(i === !1 ? e : 0), g(), b());
      }
      function x(w) {
        c = t.getPointAt(w / e, c);
        const M = o.normals[w],
          z = o.binormals[w];
        for (let v = 0; v <= n; v++) {
          const _ = (v / n) * Math.PI * 2,
            A = Math.sin(_),
            C = -Math.cos(_);
          ((h.x = C * M.x + A * z.x),
            (h.y = C * M.y + A * z.y),
            (h.z = C * M.z + A * z.z),
            h.normalize(),
            p.push(h.x, h.y, h.z),
            (a.x = c.x + s * h.x),
            (a.y = c.y + s * h.y),
            (a.z = c.z + s * h.z),
            u.push(a.x, a.y, a.z));
        }
      }
      function b() {
        for (let w = 1; w <= e; w++)
          for (let M = 1; M <= n; M++) {
            const z = (n + 1) * (w - 1) + (M - 1),
              v = (n + 1) * w + (M - 1),
              _ = (n + 1) * w + M,
              A = (n + 1) * (w - 1) + M;
            (d.push(z, v, A), d.push(v, _, A));
          }
      }
      function g() {
        for (let w = 0; w <= e; w++)
          for (let M = 0; M <= n; M++)
            ((l.x = w / e), (l.y = M / n), f.push(l.x, l.y));
      }
    }
    copy(t) {
      return (
        super.copy(t),
        (this.parameters = Object.assign({}, t.parameters)),
        this
      );
    }
    toJSON() {
      const t = super.toJSON();
      return ((t.path = this.parameters.path.toJSON()), t);
    }
    static fromJSON(t) {
      return new Dt(
        new os[t.path.type]().fromJSON(t.path),
        t.tubularSegments,
        t.radius,
        t.radialSegments,
        t.closed,
      );
    }
  }
  (typeof __THREE_DEVTOOLS__ < "u" &&
    __THREE_DEVTOOLS__.dispatchEvent(
      new CustomEvent("register", { detail: { revision: "174" } }),
    ),
    typeof window < "u" &&
      (window.__THREE__
        ? console.warn(
            "WARNING: Multiple instances of Three.js being imported.",
          )
        : (window.__THREE__ = "174")));
  function Gs(r, t = !1) {
    const e = r[0].index !== null,
      s = new Set(Object.keys(r[0].attributes)),
      n = new Set(Object.keys(r[0].morphAttributes)),
      i = {},
      o = {},
      a = r[0].morphTargetsRelative,
      h = new nt();
    let l = 0;
    for (let c = 0; c < r.length; ++c) {
      const u = r[c];
      let p = 0;
      if (e !== (u.index !== null))
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
              c +
              ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.",
          ),
          null
        );
      for (const f in u.attributes) {
        if (!s.has(f))
          return (
            console.error(
              "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
                c +
                '. All geometries must have compatible attributes; make sure "' +
                f +
                '" attribute exists among all geometries, or in none of them.',
            ),
            null
          );
        (i[f] === void 0 && (i[f] = []), i[f].push(u.attributes[f]), p++);
      }
      if (p !== s.size)
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
              c +
              ". Make sure all geometries have the same number of attributes.",
          ),
          null
        );
      if (a !== u.morphTargetsRelative)
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
              c +
              ". .morphTargetsRelative must be consistent throughout all geometries.",
          ),
          null
        );
      for (const f in u.morphAttributes) {
        if (!n.has(f))
          return (
            console.error(
              "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
                c +
                ".  .morphAttributes must be consistent throughout all geometries.",
            ),
            null
          );
        (o[f] === void 0 && (o[f] = []), o[f].push(u.morphAttributes[f]));
      }
      if (t) {
        let f;
        if (e) f = u.index.count;
        else if (u.attributes.position !== void 0)
          f = u.attributes.position.count;
        else
          return (
            console.error(
              "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
                c +
                ". The geometry must have either an index or a position attribute",
            ),
            null
          );
        (h.addGroup(l, f, c), (l += f));
      }
    }
    if (e) {
      let c = 0;
      const u = [];
      for (let p = 0; p < r.length; ++p) {
        const f = r[p].index;
        for (let d = 0; d < f.count; ++d) u.push(f.getX(d) + c);
        c += r[p].attributes.position.count;
      }
      h.setIndex(u);
    }
    for (const c in i) {
      const u = Yn(i[c]);
      if (!u)
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " +
              c +
              " attribute.",
          ),
          null
        );
      h.setAttribute(c, u);
    }
    for (const c in o) {
      const u = o[c][0].length;
      if (u === 0) break;
      ((h.morphAttributes = h.morphAttributes || {}),
        (h.morphAttributes[c] = []));
      for (let p = 0; p < u; ++p) {
        const f = [];
        for (let m = 0; m < o[c].length; ++m) f.push(o[c][m][p]);
        const d = Yn(f);
        if (!d)
          return (
            console.error(
              "THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " +
                c +
                " morphAttribute.",
            ),
            null
          );
        h.morphAttributes[c].push(d);
      }
    }
    return h;
  }
  function Yn(r) {
    let t,
      e,
      s,
      n = -1,
      i = 0;
    for (let l = 0; l < r.length; ++l) {
      const c = r[l];
      if (
        (t === void 0 && (t = c.array.constructor), t !== c.array.constructor)
      )
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.",
          ),
          null
        );
      if ((e === void 0 && (e = c.itemSize), e !== c.itemSize))
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.",
          ),
          null
        );
      if ((s === void 0 && (s = c.normalized), s !== c.normalized))
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.",
          ),
          null
        );
      if ((n === -1 && (n = c.gpuType), n !== c.gpuType))
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.",
          ),
          null
        );
      i += c.count * e;
    }
    const o = new t(i),
      a = new st(o, e, s);
    let h = 0;
    for (let l = 0; l < r.length; ++l) {
      const c = r[l];
      if (c.isInterleavedBufferAttribute) {
        const u = h / e;
        for (let p = 0, f = c.count; p < f; p++)
          for (let d = 0; d < e; d++) {
            const m = c.getComponent(p, d);
            a.setComponent(p + u, d, m);
          }
      } else o.set(c.array, h);
      h += c.count * e;
    }
    return (n !== void 0 && (a.gpuType = n), a);
  }
  function Gr(r, t = 1e-4) {
    t = Math.max(t, Number.EPSILON);
    const e = {},
      s = r.getIndex(),
      n = r.getAttribute("position"),
      i = s ? s.count : n.count;
    let o = 0;
    const a = Object.keys(r.attributes),
      h = {},
      l = {},
      c = [],
      u = ["getX", "getY", "getZ", "getW"],
      p = ["setX", "setY", "setZ", "setW"];
    for (let g = 0, w = a.length; g < w; g++) {
      const M = a[g],
        z = r.attributes[M];
      h[M] = new z.constructor(
        new z.array.constructor(z.count * z.itemSize),
        z.itemSize,
        z.normalized,
      );
      const v = r.morphAttributes[M];
      v &&
        (l[M] || (l[M] = []),
        v.forEach((_, A) => {
          const C = new _.array.constructor(_.count * _.itemSize);
          l[M][A] = new _.constructor(C, _.itemSize, _.normalized);
        }));
    }
    const f = t * 0.5,
      d = Math.log10(1 / t),
      m = Math.pow(10, d),
      x = f * m;
    for (let g = 0; g < i; g++) {
      const w = s ? s.getX(g) : g;
      let M = "";
      for (let z = 0, v = a.length; z < v; z++) {
        const _ = a[z],
          A = r.getAttribute(_),
          C = A.itemSize;
        for (let S = 0; S < C; S++) M += `${~~(A[u[S]](w) * m + x)},`;
      }
      if (M in e) c.push(e[M]);
      else {
        for (let z = 0, v = a.length; z < v; z++) {
          const _ = a[z],
            A = r.getAttribute(_),
            C = r.morphAttributes[_],
            S = A.itemSize,
            F = h[_],
            I = l[_];
          for (let R = 0; R < S; R++) {
            const N = u[R],
              Z = p[R];
            if ((F[Z](o, A[N](w)), C))
              for (let U = 0, G = C.length; U < G; U++) I[U][Z](o, C[U][N](w));
          }
        }
        ((e[M] = o), c.push(o), o++);
      }
    }
    const b = r.clone();
    for (const g in r.attributes) {
      const w = h[g];
      if (
        (b.setAttribute(
          g,
          new w.constructor(
            w.array.slice(0, o * w.itemSize),
            w.itemSize,
            w.normalized,
          ),
        ),
        g in l)
      )
        for (let M = 0; M < l[g].length; M++) {
          const z = l[g][M];
          b.morphAttributes[g][M] = new z.constructor(
            z.array.slice(0, o * z.itemSize),
            z.itemSize,
            z.normalized,
          );
        }
    }
    return (b.setIndex(c), b);
  }
  const Hr = [
      {
        name: "sparrow",
        count: 1,
        size: 0.94,
        tailLength: 0.9,
        back: "#8f6b44",
        streak: "#4a3320",
        wing: "#6b4a2e",
        covert: "#a07549",
        bar: "#efe7d4",
        belly: "#e2dccd",
        breast: "#c7b79c",
        tail: "#5a4028",
        crown: "#8b8e8f",
        nape: "#8e5a32",
        cheek: "#ebe6d9",
        bib: "#2a2521",
        beak: "#3a3430",
        legs: "#b58f78",
        beakLength: 0.021,
        beakRadius: 0.0095,
        nerve: 1,
        voice: 3300,
      },
      {
        name: "robin",
        count: 2,
        size: 1,
        tailLength: 0.78,
        back: "#7b6a4c",
        wing: "#6c5b41",
        covert: "#7f6e51",
        bar: null,
        belly: "#f0e9dc",
        breast: "#dc6c30",
        edge: "#9aa4a8",
        tail: "#665539",
        crown: "#7b6a4c",
        face: "#dc6c30",
        beak: "#2d2520",
        legs: "#8e725d",
        beakLength: 0.024,
        beakRadius: 0.0058,
        nerve: 0.8,
        voice: 2700,
      },
      {
        name: "tit",
        count: 2,
        size: 0.84,
        tailLength: 0.95,
        back: "#8b9b4e",
        wing: "#5d7383",
        covert: "#6f8795",
        bar: "#f1efe4",
        belly: "#e9cf43",
        breast: "#e9cf43",
        stripe: "#1d1b1a",
        tail: "#546a79",
        crown: "#1d1b1a",
        cheek: "#f6f4ed",
        nape: "#e9eddb",
        beak: "#252220",
        legs: "#7a8591",
        beakLength: 0.016,
        beakRadius: 0.0062,
        nerve: 1.25,
        voice: 3900,
      },
      {
        name: "goldfinch",
        count: 1,
        size: 0.8,
        tailLength: 0.86,
        back: "#b69558",
        wing: "#282d36",
        covert: "#f6c93c",
        bar: "#ffdf45",
        belly: "#f2e7ca",
        breast: "#d9bc7b",
        tail: "#303340",
        crown: "#252c36",
        cheek: "#fff0d5",
        face: "#de4739",
        beak: "#e4c29b",
        legs: "#b28b78",
        beakLength: 0.023,
        beakRadius: 0.008,
        nerve: 1.1,
        voice: 4200,
      },
      {
        name: "bluebird",
        count: 1,
        size: 1.16,
        tailLength: 1.08,
        back: "#368bce",
        wing: "#2467aa",
        covert: "#5fb9e9",
        bar: "#8fd4ee",
        belly: "#f3e5cf",
        breast: "#dc8750",
        tail: "#245c9a",
        crown: "#368bce",
        cheek: "#4b9ed2",
        face: "#dc8750",
        beak: "#293540",
        legs: "#7e8290",
        beakLength: 0.026,
        beakRadius: 0.006,
        nerve: 0.95,
        voice: 2900,
      },
      {
        name: "greenfinch",
        count: 1,
        size: 1.05,
        tailLength: 0.88,
        back: "#7eaa48",
        wing: "#4d7152",
        covert: "#a8c758",
        bar: "#efdc49",
        belly: "#dbe59a",
        breast: "#bad565",
        tail: "#527655",
        crown: "#90b853",
        cheek: "#b6cc73",
        beak: "#e9c5a0",
        legs: "#ae8976",
        beakLength: 0.024,
        beakRadius: 0.011,
        nerve: 1.05,
        voice: 3500,
      },
      {
        name: "cardinal",
        count: 1,
        size: 1.32,
        tailLength: 1.28,
        crest: !0,
        back: "#c94049",
        wing: "#923444",
        covert: "#de5860",
        bar: null,
        belly: "#e17669",
        breast: "#ec5751",
        tail: "#a33445",
        crown: "#df4a51",
        cheek: "#d95055",
        mask: "#382b37",
        beak: "#f3a05d",
        legs: "#aa7a75",
        beakLength: 0.029,
        beakRadius: 0.011,
        nerve: 1.15,
        voice: 2300,
      },
    ],
    Fe = { rx: 0.038, ry: 0.043, rz: 0.087 },
    Gn = -0.35,
    Hn = 0.056,
    Wr = new y(1, 0, 0),
    Wn = (r) => r.applyAxisAngle(Wr, Gn).add(new y(0, Hn, 0));
  (Wn(new y(0, 0.026, 0.055)), Wn(new y(0.031, 0.025, 0.016)));
  function $(r, t) {
    const e = r.index ? r.toNonIndexed() : r;
    e !== r && r.dispose();
    const s = e.attributes.position,
      n = new Float32Array(s.count * 3),
      i = new y(),
      o = new V();
    for (let a = 0; a < s.count; a += 1)
      (typeof t == "function" ? t(i.fromBufferAttribute(s, a), o) : t).toArray(
        n,
        a * 3,
      );
    return (
      e.setAttribute("color", new st(n, 3)),
      e.attributes.uv && e.deleteAttribute("uv"),
      e.attributes.normal || e.computeVertexNormals(),
      e
    );
  }
  function Bt(r) {
    const t = Gs(r);
    return (r.forEach((e) => e.dispose()), t);
  }
  function Jr(r, t, e, s, n = 0) {
    const i = t.clone().sub(r),
      o = new ct(1, 8, 6),
      a = o.attributes.position;
    for (let l = 0; l < a.count; l += 1) {
      const c = a.getY(l);
      a.setXYZ(
        l,
        a.getX(l) * e * (0.76 + c * 0.22),
        (c * i.length()) / 2,
        a.getZ(l) * 0.0022,
      );
    }
    o.computeVertexNormals();
    const h = $(o, (l, c) =>
      c
        .copy(s)
        .multiplyScalar(0.9 + 0.16 * (1 - Math.min(1, Math.abs(l.x) / e))),
    );
    return (
      h.rotateY(n),
      h.applyQuaternion(
        new _t().setFromUnitVectors(new y(0, 1, 0), i.normalize()),
      ),
      h.translate((r.x + t.x) / 2, (r.y + t.y) / 2, (r.z + t.z) / 2),
      h
    );
  }
  const L = rt.smoothstep,
    Hs = (r) => {
      const t = {};
      for (const e in r)
        typeof r[e] == "string" && r[e].startsWith("#") && (t[e] = new V(r[e]));
      return t;
    },
    Jn = (r) => 1 - 0.38 * L(-r, -0.1, 1);
  function jr(r, t, e, s, n, i) {
    const o = L(s, -0.1, 0.5);
    if (
      (i
        .copy(t.belly)
        .lerp(t.breast, L(n, 0.05, 0.7) * (1 - o))
        .lerp(t.back, o),
      r === "sparrow")
    ) {
      const a = Math.sin(e * 16 + n * 2.5) > 0.55 ? 0.65 : 0;
      (i.lerp(t.streak, a * L(s, 0.35, 0.7)),
        i.lerp(
          t.bib,
          L(n, 0.62, 0.78) *
            L(s, -0.35, -0.15) *
            (1 - L(Math.abs(e), 0.45, 0.65)) *
            (1 - o),
        ));
    } else if (r === "robin") {
      const a = L(n, 0.15, 0.45) * (1 - L(s, 0.25, 0.4)) * L(s, -0.55, -0.3),
        h = L(n, 0.1, 0.4) * Math.max(0, 1 - Math.abs(s - 0.34) / 0.12) * 0.8;
      i.lerp(t.breast, a).lerp(t.edge, h);
    } else
      r === "tit" &&
        i.lerp(
          t.stripe,
          (1 - L(Math.abs(e), 0.12, 0.2)) * (1 - o) * L(n, -0.6, -0.3),
        );
    return i;
  }
  function qr(r) {
    const t = Hs(r),
      e = r.name,
      s = [],
      n = new ct(1, 28, 20),
      i = n.attributes.position;
    for (let h = 0; h < i.count; h += 1) {
      const l = i.getX(h),
        c = i.getY(h),
        u = i.getZ(h),
        p = Jn(u);
      i.setXYZ(h, l * Fe.rx * p, c * Fe.ry * p * (c < 0 ? 0.92 : 1), u * Fe.rz);
    }
    (n.computeVertexNormals(),
      s.push(
        $(n, (h, l) => {
          const c = h.z / Fe.rz,
            u = Jn(c);
          return jr(e, t, h.x / (Fe.rx * u), h.y / (Fe.ry * u), c, l);
        }),
      ));
    const o = jn(r);
    for (const h of [-1, 1]) {
      const l = new ct(1, 24, 16),
        c = l.attributes.position;
      for (let u = 0; u < c.count; u += 1) {
        const p = (1 - c.getZ(u)) / 2,
          f = 0.039 - p * 0.147 * o.length,
          d = Math.sin(Math.PI * p),
          m = 0.028 + Math.sin(p * Math.PI * 1.4) * 0.014 - p * 0.016;
        c.setXYZ(
          u,
          h * (m + c.getX(u) * 0.006 * d),
          0.013 - p * 0.015 + c.getY(u) * 0.026 * (1 - p * 0.46),
          f,
        );
      }
      (l.computeVertexNormals(),
        s.push(
          $(l, (u, p) => {
            const f = (0.039 - u.z) / (0.147 * o.length);
            return (
              p.copy(t.covert).lerp(t.wing, L(f, 0.25, 0.68)),
              t.bar &&
                p.lerp(
                  t.bar,
                  (1 - L(Math.abs(f - 0.44 - u.y * 1.4), 0.022, 0.058)) * 0.9,
                ),
              p.multiplyScalar(1 - L(f, 0.7, 1) * 0.12)
            );
          }),
        ));
    }
    for (let h = -2; h <= 2; h += 1) {
      const l = (0.084 - Math.abs(h) * 0.004) * r.tailLength,
        c = t.tail.clone().multiplyScalar(1 + Math.abs(h) * 0.07);
      (e === "tit" && Math.abs(h) === 2 && c.lerp(t.bar, 0.75),
        s.push(
          Jr(
            new y(h * 0.004, 0.005, -0.059),
            new y(h * 0.0075, 0.012 + l * 0.12, -0.059 - l),
            0.0055,
            c,
          ),
        ));
    }
    const a = Bt(s);
    return (a.rotateX(Gn), a.translate(0, Hn, 0), a);
  }
  const Ws = new y(0, 0.026, 0.004);
  function Qr(r) {
    const t = [],
      e = new V(r.legs);
    function s(n, i, o, a) {
      const h = new y(...n),
        c = new y(...i).clone().sub(h),
        u = new Tt(a, o, c.length(), 6)
          .applyQuaternion(
            new _t().setFromUnitVectors(new y(0, 1, 0), c.normalize()),
          )
          .translate((n[0] + i[0]) / 2, (n[1] + i[1]) / 2, (n[2] + i[2]) / 2);
      t.push($(u, e));
    }
    for (const n of [-0.012, 0.012]) {
      (s([n, 0.034, -0.005], [n, 0.016, -0.009], 0.0026, 0.002),
        s([n, 0.016, -0.009], [n, 0.003, 0.005], 0.002, 0.0016));
      for (const i of [-1, 0, 1]) {
        const o = [n + i * 0.006, 0.001, 0.017 - Math.abs(i) * 0.003];
        s([n, 0.003, 0.005], o, 0.0014, 65e-5);
      }
      s([n, 0.003, 0.003], [n, 0.001, -0.008], 0.0013, 6e-4);
    }
    return Bt(t).translate(-Ws.x, -Ws.y, -Ws.z);
  }
  function $r(r) {
    const t = Hs(r),
      e = r.name,
      s = 0.03,
      n = new y(0, 0.013, 0.009),
      i = $(
        new ct(1, 28, 20)
          .scale(s * 0.87, s * 0.91, s * 1.09)
          .translate(n.x, n.y, n.z),
        (d, m) => {
          const x = Math.abs(d.x - n.x) / (s * 0.87),
            b = (d.y - n.y) / (s * 0.91),
            g = (d.z - n.z) / (s * 1.09);
          return (
            e === "sparrow"
              ? (m.copy(t.crown),
                m.lerp(
                  t.nape,
                  L(x, 0.4, 0.6) * L(b, -0.2, 0.05) * (1 - L(g, 0.1, 0.4)),
                ),
                m.lerp(
                  t.cheek,
                  L(x, 0.45, 0.65) * (1 - L(b, 0, 0.2)) * L(g, -0.2, 0.1),
                ),
                m.lerp(t.bib, L(g, 0.6, 0.75) * (1 - L(b, 0.2, 0.35))))
              : e === "robin"
                ? (m
                    .copy(t.crown)
                    .lerp(t.face, L(g, -0.25, 0.05) * (1 - L(b, 0.3, 0.5))),
                  m.lerp(
                    t.edge,
                    Math.max(0, 1 - Math.abs(b - 0.42) / 0.1) *
                      L(g, -0.1, 0.2) *
                      0.7,
                  ))
                : e === "tit" &&
                  (m.copy(t.crown),
                  m.lerp(
                    t.cheek,
                    L(x, 0.4, 0.6) *
                      L(b, -0.55, -0.35) *
                      (1 - L(b, 0.25, 0.4)) *
                      L(g, -0.55, -0.35) *
                      (1 - L(g, 0.55, 0.7)),
                  ),
                  m.lerp(
                    t.nape,
                    L(-g, 0.7, 0.85) * L(b, 0.2, 0.4) * (1 - L(x, 0.2, 0.35)),
                  )),
            ["sparrow", "robin", "tit"].includes(e) ||
              (m
                .copy(t.crown)
                .lerp(t.cheek, L(x, 0.35, 0.75) * (1 - L(b, 0.05, 0.4))),
              t.face && m.lerp(t.face, L(g, 0.25, 0.7) * (1 - L(b, 0.1, 0.45))),
              t.mask &&
                m.lerp(t.mask, L(g, 0.35, 0.65) * (1 - L(b, 0.25, 0.5)))),
            m
          );
        },
      ),
      o = r.beakLength,
      a = n.z + s * 0.87,
      h = r.beakRadius * 0.85,
      l = n.y - 0.003,
      c = new nt();
    (c.setAttribute(
      "position",
      new X(
        [
          -h,
          l,
          a,
          0,
          l + h * 0.65,
          a,
          0,
          l - 0.001,
          a + o,
          0,
          l + h * 0.65,
          a,
          h,
          l,
          a,
          0,
          l - 0.001,
          a + o,
          h,
          l,
          a,
          0,
          l - h * 0.45,
          a,
          0,
          l - 0.001,
          a + o,
          0,
          l - h * 0.45,
          a,
          -h,
          l,
          a,
          0,
          l - 0.001,
          a + o,
        ],
        3,
      ),
    ),
      c.computeVertexNormals());
    const u = $(c, t.beak),
      p = [];
    for (const d of [-1, 1]) {
      const m = new y(d * 0.023, 0.021, 0.023);
      (p.push(
        $(
          new ct(1, 12, 8)
            .scale(0.0016, 0.0038, 0.0038)
            .translate(m.x, m.y, m.z),
          new V("#110d0b"),
        ),
      ),
        p.push(
          $(
            new ct(75e-5, 6, 4).translate(
              m.x + d * 0.0017,
              m.y + 0.0012,
              m.z + 9e-4,
            ),
            new V("#fbf6ec"),
          ),
        ));
    }
    const f = [];
    if (r.crest) {
      const d = new he();
      (d.moveTo(-0.019, 0.027),
        d.quadraticCurveTo(-0.026, 0.045, -0.022, 0.062),
        d.lineTo(-0.012, 0.052),
        d.lineTo(-0.009, 0.053),
        d.quadraticCurveTo(0.006, 0.038, 0.018, 0.027),
        d.closePath());
      const m = new Ee(d, {
          depth: 0.008,
          bevelEnabled: !0,
          bevelThickness: 0.002,
          bevelSize: 0.002,
          bevelSegments: 2,
          curveSegments: 8,
        })
          .translate(0, 0, -0.004)
          .rotateY(-Math.PI / 2),
        x = m.attributes.position;
      for (let b = 0; b < x.count; b += 1)
        x.setX(b, x.getX(b) * (1 - L(x.getY(b), 0.03, 0.066) * 0.92));
      (m.computeVertexNormals(), f.push($(m, t.crown)));
    }
    return Bt([i, u, ...p, ...f]);
  }
  function jn(r) {
    switch (r.name) {
      case "goldfinch":
        return { length: 1.12, width: 0.87 };
      case "greenfinch":
        return { length: 1.04, width: 0.95 };
      case "bluebird":
        return { length: 1.13, width: 0.94 };
      case "robin":
        return { length: 0.92, width: 1.08 };
      case "cardinal":
        return { length: 0.98, width: 1.12 };
      default:
        return { length: 1, width: 1 };
    }
  }
  function Kr(r) {
    const t = Hs(r),
      e = jn(r),
      s = new Se(
        [
          [0, 0.023],
          [0.03, 0.031],
          [0.07, 0.019],
          [0.11, -0.01],
          [0.132, -0.038],
          [0.148, -0.055],
        ].map((d) => new E(...d)),
      ),
      n = new Se(
        [
          [0, -0.04],
          [0.03, -0.054],
          [0.07, -0.061],
          [0.11, -0.073],
          [0.132, -0.071],
          [0.148, -0.055],
        ].map((d) => new E(...d)),
      ),
      i = [],
      o = [],
      a = [],
      h = 32,
      l = 12,
      c = new V();
    for (let d = 0; d <= h; d += 1) {
      const m = d / h,
        x = s.getPoint(m),
        b = n.getPoint(m);
      for (let g = 0; g <= l; g += 1) {
        const w = g / l,
          M = rt.lerp(x.x, b.x, w),
          z = Math.pow(Math.sin(m * Math.PI * 9), 8) * 0.003 * L(m, 0.25, 0.65),
          v = rt.lerp(x.y, b.y + z, w),
          _ = Math.sin(w * Math.PI) * 0.005 * Math.sin(m * Math.PI);
        if (
          (i.push(M * e.length, _ - L(m, 0.65, 1) * 0.009, v * e.width),
          c
            .copy(t.covert)
            .lerp(t.wing, L(w, 0.25, 0.72))
            .multiplyScalar(1 - m * 0.12),
          t.bar &&
            c.lerp(
              t.bar,
              (1 - L(Math.abs(w - 0.49), 0.035, 0.09)) *
                (1 - L(m, 0.55, 0.8)) *
                0.9,
            ),
          c.toArray(o, o.length),
          d < h && g < l)
        ) {
          const A = d * (l + 1) + g;
          a.push(A, A + 1, A + l + 1, A + 1, A + l + 2, A + l + 1);
        }
      }
    }
    const u = new nt();
    (u.setAttribute("position", new X(i, 3)),
      u.setAttribute("color", new X(o, 3)),
      u.setIndex(a),
      u.computeVertexNormals());
    const p = u.toNonIndexed();
    u.dispose();
    const f = [p];
    for (let d = 0; d < 9; d += 1) {
      const m = 0.14 + d * 0.09,
        x = s.getPoint(m),
        b = n.getPoint(m),
        g = new y(
          (x.x - 0.006) * e.length,
          0.001,
          rt.lerp(x.y, b.y, 0.62) * e.width,
        ),
        M = new y(
          (b.x + 0.003) * e.length,
          -L(m, 0.65, 1) * 0.009,
          (b.y - 0.007) * e.width,
        )
          .clone()
          .sub(g),
        z = new y(-M.z, 0, M.x).normalize(),
        v = [],
        _ = [],
        A = [],
        C = new V();
      for (let F = 0; F <= 8; F += 1) {
        const I = F / 8,
          R = 0.008 * Math.pow(Math.sin(Math.PI * I), 0.42);
        for (let N = 0; N <= 4; N += 1) {
          const Z = N / 2 - 1,
            U = g
              .clone()
              .addScaledVector(M, I)
              .addScaledVector(z, Z * R);
          if (
            ((U.y += Math.sin(Math.PI * I) * (1 - Z * Z) * 0.0012),
            v.push(U.x, U.y, U.z),
            C.copy(t.wing).multiplyScalar(
              0.9 + (1 - Math.abs(Z)) * 0.1 - I * 0.06,
            ),
            C.toArray(A, A.length),
            F < 8 && N < 4)
          ) {
            const G = F * 5 + N;
            _.push(G, G + 1, G + 5, G + 1, G + 6, G + 5);
          }
        }
      }
      const S = new nt();
      (S.setAttribute("position", new X(v, 3)),
        S.setAttribute("color", new X(A, 3)),
        S.setIndex(_),
        S.computeVertexNormals(),
        f.push(S.toNonIndexed()),
        S.dispose());
    }
    return Bt(f);
  }
  const to = ["pouch", "flask", "gourd"],
    it = ["#ad8150", "#c99b62", "#8a6139", "#dcb378"].map((r) => new V(r)),
    qn = new V("#1a120b"),
    Js = 5,
    ls = 4;
  function Qn(r) {
    let t = r;
    return () => (t = (t * 16807) % 2147483647) / 2147483647;
  }
  function $n(r, t) {
    return new Se(r.map(([s, n]) => new E(s, n))).getSpacedPoints(t);
  }
  function js(r, t, e) {
    return (
      r.setAttribute(
        t,
        new st(new Float32Array(r.attributes.position.count).fill(e), 1),
      ),
      r
    );
  }
  function Ot(r, t, e = 1) {
    const s = [js(r.clone(), "aShell", 0)];
    for (let n = 1; n <= t; n += 1)
      s.push(js(r.clone(), "aShell", (e * n) / t));
    return (r.dispose(), Bt(s));
  }
  const Ft = (r) => js(r, "aShell", -1),
    Kn = (r, t) =>
      1 + Math.sin(r * 3 + t * 20) * 0.035 + Math.sin(r * 7 - t * 31) * 0.02;
  function qs(r, t) {
    const e = [];
    for (const s of [-1, 1])
      for (let n = 0; n < 12; n += 1) {
        let i = [];
        const o = () => {
          (i.length > 2 &&
            e.push(
              $(
                new Dt(new Kt(i), i.length, 0.0018, 4, !1),
                it[(n + (s === 1 ? 1 : 0)) % it.length],
              ),
            ),
            (i = []));
        };
        for (let a = 1; a < r.length - 1; a += 1) {
          const h = a / (r.length - 1),
            l = (n * Math.PI) / 6 + s * h * Math.PI * 2.2,
            c = r[a].y,
            u = r[a].x * Kn(l, c) + 0.0025 + 0.001 * Math.sin(h * 80 + n),
            p = new y(Math.sin(l) * u, c, Math.cos(l) * u);
          t && p.z > 0 && Math.hypot(p.x, p.y - t.y) < t.r + 0.012
            ? o()
            : i.push(p);
        }
        o();
      }
    return Ft(Bt(e));
  }
  function Qs(r, t, e) {
    const s = $n(r, 28),
      n = new ae(s.slice().reverse(), 36),
      i = n.attributes.position;
    for (let l = 0; l < i.count; l += 1) {
      const c = i.getX(l),
        u = i.getY(l),
        p = i.getZ(l),
        f = Math.atan2(c, p),
        d = Kn(f, u);
      (i.setX(l, c * d), i.setZ(l, p * d));
    }
    (n.deleteAttribute("uv"), n.computeVertexNormals());
    const o = s[0].y,
      a = s[s.length - 1].y;
    let h = $(n, (l, c) => {
      const u = Math.atan2(l.x, l.z),
        p = Math.sin(u * 26 + l.y * 60),
        f = Math.sin(u * 26 - l.y * 60),
        d = Math.max(p, f) * 0.5 + 0.5;
      return c
        .copy(it[2])
        .lerp(it[1], d * 0.8)
        .lerp(it[3], t() * 0.25)
        .multiplyScalar(0.9 + t() * 0.16);
    });
    if (e) {
      const l = h.attributes.position.array,
        c = h.attributes.color.array,
        u = h.attributes.normal.array,
        p = [];
      for (let b = 0; b < l.length / 9; b += 1) {
        const g = b * 9,
          w = (l[g] + l[g + 3] + l[g + 6]) / 3,
          M = (l[g + 1] + l[g + 4] + l[g + 7]) / 3;
        ((l[g + 2] + l[g + 5] + l[g + 8]) / 3 > 0 &&
          Math.hypot(w, M - e.y) < e.r) ||
          p.push(b);
      }
      const f = new Float32Array(p.length * 9),
        d = new Float32Array(p.length * 9),
        m = new Float32Array(p.length * 9);
      p.forEach((b, g) => {
        for (let w = 0; w < 9; w += 1)
          ((f[g * 9 + w] = l[b * 9 + w]),
            (d[g * 9 + w] = c[b * 9 + w]),
            (m[g * 9 + w] = u[b * 9 + w]));
      });
      const x = new nt();
      (x.setAttribute("position", new st(f, 3)),
        x.setAttribute("color", new st(d, 3)),
        x.setAttribute("normal", new st(m, 3)),
        h.dispose(),
        (h = x));
    }
    return { geometry: h, points: s, top: o, bottom: a };
  }
  function ke(
    r,
    t,
    e,
    {
      from: s = 0,
      to: n = 1,
      length: i = [0.05, 0.12],
      width: o = 0.0021,
      lift: a = 0.012,
      sway: h = 0.7,
      hole: l = null,
    } = {},
  ) {
    const c = [],
      u = [],
      p = [],
      f = r.length - 1,
      d = new y(),
      m = new y(),
      x = new y(),
      b = new y(),
      g = new y(),
      w = new V(),
      M = 4,
      z = (_, A, C, S) => {
        const F = _ / M;
        return S.copy(d)
          .addScaledVector(
            m,
            a * Math.sin(Math.min(1, F * 1.6) * Math.PI * 0.5),
          )
          .addScaledVector(x, C * A * F * F)
          .add(b.set(0, -A * F, 0));
      };
    for (let _ = 0; _ < t; _ += 1) {
      const C = (s + (n - s) * e()) * f,
        S = Math.min(f - 1, Math.floor(C)),
        F = rt.lerp(r[S].x, r[S + 1].x, C - S),
        I = rt.lerp(r[S].y, r[S + 1].y, C - S),
        R = e() * Math.PI * 2;
      (m.set(Math.sin(R), 0, Math.cos(R)),
        x.set(Math.cos(R), 0, -Math.sin(R)),
        d.set(m.x * F, I, m.z * F));
      const N = i[0] + e() * (i[1] - i[0]),
        Z = (e() - 0.5) * h;
      if (
        l &&
        d.z > 0 &&
        Math.abs(d.x) < l.r + Math.abs(Z * N) &&
        I > l.y - l.r &&
        I - N < l.y + l.r
      )
        continue;
      w.copy(it[1])
        .lerp(it[e() < 0.5 ? 0 : 3], e())
        .multiplyScalar(0.85 + e() * 0.15);
      const U = new y(),
        G = new y();
      for (let ht = 0; ht < M; ht += 1) {
        (z(ht, N, Z, U), z(ht + 1, N, Z, g), G.copy(g));
        const J = o * (1 - (ht / M) * 0.6),
          q = o * (1 - ((ht + 1) / M) * 0.6);
        for (const Y of [x, m]) {
          c.push(
            U.x - Y.x * J,
            U.y,
            U.z - Y.z * J,
            U.x + Y.x * J,
            U.y,
            U.z + Y.z * J,
            G.x + Y.x * q,
            G.y,
            G.z + Y.z * q,
            U.x - Y.x * J,
            U.y,
            U.z - Y.z * J,
            G.x + Y.x * q,
            G.y,
            G.z + Y.z * q,
            G.x - Y.x * q,
            G.y,
            G.z - Y.z * q,
          );
          for (let bt = 0; bt < 6; bt += 1)
            (u.push(m.x, 0, m.z), p.push(w.r, w.g, w.b));
        }
      }
    }
    const v = new nt();
    return (
      v.setAttribute("position", new X(c, 3)),
      v.setAttribute("normal", new X(u, 3)),
      v.setAttribute("color", new X(p, 3)),
      Ft(v)
    );
  }
  function eo(r, t, e, s) {
    const n = r.attributes.position,
      i = new Float32Array(n.count);
    for (let o = 0; o < n.count; o += 1)
      i[o] = rt.clamp((t - n.getY(o)) / (t - e), 0, 1);
    return (
      r.setAttribute("aBuild", new st(i, 1)),
      r.setAttribute("aEdge", new st(new Float32Array(n.count).fill(s), 1)),
      r
    );
  }
  function so(r, t, e) {
    const s = r.attributes.position,
      n = e() * 10;
    for (let i = 0; i < s.count; i += 1)
      (s.setX(i, s.getX(i) + Math.sin(s.getY(i) * 40 + n) * t),
        s.setZ(i, s.getZ(i) + Math.cos(s.getY(i) * 37 + n) * t));
    return (r.computeVertexNormals(), r);
  }
  function ti(r, t) {
    const e = $(new yt(0.03, 0.009, 5, 14).translate(0, -0.028, 0), it[2]),
      s = new Tt(0.018, 0.028, r, 7, 3, !0).translate(0, -0.05 - r / 2, 0);
    return (
      s.deleteAttribute("uv"),
      [e, $(so(s, 0.004, t), (n, i) => i.copy(it[2]).lerp(it[0], t() * 0.5))]
    );
  }
  function $s(r, t, e) {
    const s = new _t().setFromUnitVectors(new y(0, 0, 1), t),
      n = [];
    for (let c = 0; c < 2; c += 1) {
      const u = [];
      for (let p = 0; p <= 64; p += 1) {
        const f = (p / 64) * Math.PI * 2,
          d = f * 12 + c * Math.PI,
          m = e + Math.cos(d) * 0.003 + Math.sin(f * 3) * 0.0015;
        u.push(new y(Math.cos(f) * m, Math.sin(f) * m, Math.sin(d) * 0.003));
      }
      n.push($(new Dt(new Kt(u), 80, 0.005, 5, !1), it[c]));
    }
    const i = Bt(n).applyQuaternion(s).translate(r.x, r.y, r.z),
      o = new Tt(e * 0.94, e * 0.72, 0.042, 24, 3, !0)
        .rotateX(Math.PI / 2)
        .translate(0, 0, -0.021),
      a = $(o, (c, u) => u.copy(qn).lerp(it[2], L(c.z, -0.042, 0) * 0.5)),
      h = $(new Us(e * 0.74, 24).translate(0, 0, -0.043), qn),
      l = Bt([a, h]).applyQuaternion(s).translate(r.x, r.y, r.z);
    return { rim: i, hollow: l };
  }
  const Ut = {
      pouch: {
        at: new y(0, -0.34, 0.127),
        normal: new y(0, -0.12, 1).normalize(),
        radius: 0.045,
      },
      gourd: {
        at: new y(0, -0.2, 0.137),
        normal: new y(0, 0.05, 1).normalize(),
        radius: 0.045,
      },
      flask: {
        at: new y(0, -0.47, 0.085),
        normal: new y(0, -1, 0.15).normalize(),
        radius: 0.041,
      },
    },
    Pe = [
      [0.023, -0.09],
      [0.025, -0.14],
      [0.035, -0.19],
      [0.076, -0.24],
      [0.115, -0.29],
      [0.128, -0.35],
      [0.12, -0.41],
      [0.087, -0.46],
      [0.041, -0.485],
      [0.001, -0.49],
    ],
    no = [
      [0.027, -0.07],
      [0.047, -0.11],
      [0.11, -0.15],
      [0.139, -0.2],
      [0.146, -0.245],
      [0.127, -0.295],
      [0.081, -0.33],
      [0.031, -0.344],
      [0.001, -0.348],
    ],
    io = [
      [0.023, -0.06],
      [0.032, -0.095],
      [0.091, -0.13],
      [0.119, -0.18],
      [0.112, -0.23],
      [0.081, -0.27],
      [0.037, -0.29],
      [0.001, -0.3],
    ];
  function ro(r) {
    const t = [],
      e = [];
    for (let o = 0; o <= 4; o += 1) {
      const a = o / 4,
        h = 0.075 - a * 0.014;
      for (let l = 0; l <= 16; l += 1) {
        const c = (l / 16 - 0.5) * Math.PI;
        if (
          (t.push(
            Math.sin(c) * h,
            r.at.y + 0.004 + Math.cos(c) * h * 0.9,
            r.at.z - 0.027 + a * 0.064,
          ),
          o < 4 && l < 16)
        ) {
          const u = o * 17 + l;
          e.push(u, u + 1, u + 16 + 1, u + 1, u + 16 + 2, u + 16 + 1);
        }
      }
    }
    const i = new nt();
    return (
      i.setAttribute("position", new X(t, 3)),
      i.setIndex(e),
      i.computeVertexNormals(),
      $(i, (o, a) =>
        a
          .copy(it[0])
          .lerp(it[3], 0.25 + Math.sin(o.x * 210 + o.z * 100) * 0.12),
      )
    );
  }
  function oo(r, t = 1) {
    const e = Qn(7919 + t * 104729),
      s = [],
      [n, i] = ti(r === "flask" ? 0.02 : r === "gourd" ? 0.03 : 0.05, e);
    if ((s.push(Ft(n), Ot(i, ls, 0.55)), r === "pouch"))
      for (let o = 0; o < 3; o += 1)
        s.push(
          Ft(
            $(
              new yt(0.026 + o * 5e-4, 0.002, 4, 18)
                .rotateX(Math.PI / 2)
                .translate(0, -0.132 - o * 0.006, 0),
              it[o % 2],
            ),
          ),
        );
    if (r === "flask") {
      const o = Qs(io, e, null);
      (s.push(Ot(o.geometry, Js)),
        s.push(
          qs(
            o.points,
            r === "flask" ? null : { y: Ut[r].at.y, r: Ut[r].radius },
          ),
        ),
        s.push(
          ke(o.points, 8, e, { from: 0.3, to: 0.7, length: [0.04, 0.08] }),
        ));
      const a = new Kt([
          new y(0, -0.24, 0.045),
          new y(0, -0.33, 0.07),
          new y(0.005, -0.41, 0.08),
          new y(0, -0.47, 0.085),
        ]),
        h = new Dt(a, 16, 0.038, 14, !1),
        l = (x) => 0.026 + 0.015 * L(x, 0.55, 1) + 0.008 * (1 - L(x, 0, 0.25)),
        c = h.attributes.position;
      for (let x = 0; x <= 16; x += 1) {
        const b = x / 16,
          g = a.getPointAt(b),
          w = l(b);
        for (let M = 0; M <= 14; M += 1) {
          const z = x * 15 + M;
          c.setXYZ(
            z,
            g.x + ((c.getX(z) - g.x) * w) / 0.038,
            g.y + ((c.getY(z) - g.y) * w) / 0.038,
            g.z + ((c.getZ(z) - g.z) * w) / 0.038,
          );
        }
      }
      (h.computeVertexNormals(),
        h.deleteAttribute("uv"),
        s.push(
          Ot(
            $(h, (x, b) => b.copy(it[1]).lerp(it[0], e() * 0.6)),
            ls + 2,
            0.8,
          ),
        ));
      const u = a.computeFrenetFrames(32, !1);
      for (const x of [-1, 1])
        for (let b = 0; b < 4; b += 1) {
          const g = [];
          for (let w = 0; w <= 32; w += 1) {
            const M = w / 32,
              z = (b * Math.PI) / 2 + x * M * Math.PI * 3,
              v = l(M) + 0.002;
            g.push(
              a
                .getPointAt(M)
                .addScaledVector(u.normals[w], Math.cos(z) * v)
                .addScaledVector(u.binormals[w], Math.sin(z) * v),
            );
          }
          s.push(Ft($(new Dt(new Kt(g), 36, 0.0015, 4, !1), it[b])));
        }
      const { rim: p, hollow: f } = $s(
        Ut.flask.at,
        Ut.flask.normal,
        Ut.flask.radius,
      );
      s.push(Ot(p, 2, 0.35), Ft(f));
      const d = [
          [0.037, -0.45],
          [0.041, -0.47],
        ].map(([x, b]) => new E(x, b)),
        m = ke(d, 12, e, {
          length: [0.03, 0.07],
          width: 0.0024,
          lift: 0.006,
          sway: 0.4,
        });
      (m.translate(0, 0, 0.085), s.push(m));
    } else {
      const o = r === "gourd" ? no : Pe,
        a = Ut[r],
        h = Qs(o, e, { y: a.at.y, r: a.radius });
      (s.push(Ot(h.geometry, Js)),
        s.push(
          qs(
            h.points,
            r === "flask" ? null : { y: Ut[r].at.y, r: Ut[r].radius },
          ),
        ),
        s.push(
          ke(h.points, 6, e, {
            from: 0.2,
            to: 0.75,
            length: [0.04, 0.08],
            hole: { y: a.at.y, r: a.radius },
          }),
        ),
        s.push(
          ke(h.points, 11, e, {
            from: 0.86,
            to: 1,
            length: [0.06, 0.14],
            lift: 0.006,
          }),
        ));
      const { rim: l, hollow: c } = $s(a.at, a.normal, a.radius);
      if ((s.push(Ot(l, 2, 0.35), Ft(c)), r === "gourd")) {
        s.push(Ot(ro(a), ls, 0.5));
        const u = [];
        for (let p = 0; p <= 20; p += 1) {
          const f = (p / 20 - 0.5) * Math.PI;
          u.push(
            new y(
              Math.sin(f) * 0.061,
              a.at.y + 0.004 + Math.cos(f) * 0.055,
              a.at.z + 0.037,
            ),
          );
        }
        s.push(Ft($(new Dt(new Kt(u), 24, 0.0035, 5, !1), it[1])));
      }
    }
    return Bt(s);
  }
  function ao(r = 1) {
    const t = Qn(4409 + r * 7919),
      e = Ut.pouch,
      s = Pe[0][1],
      n = Pe[Pe.length - 1][1],
      i = (x, b = 0) => eo(x, s, n, b),
      o = [],
      [a, h] = ti(0.05, t);
    o.push(i(Ft(a)), Ot(i(h), ls, 0.55));
    for (let x = 0; x < 3; x += 1)
      o.push(
        i(
          Ft(
            $(
              new yt(0.026 + x * 5e-4, 0.002, 4, 18)
                .rotateX(Math.PI / 2)
                .translate(0, -0.132 - x * 0.006, 0),
              it[x % 2],
            ),
          ),
        ),
      );
    const l = Qs(Pe, t, { y: e.at.y, r: e.radius });
    (o.push(Ot(i(l.geometry), Js)),
      o.push(i(qs(l.points, { y: e.at.y, r: e.radius }))),
      o.push(
        i(
          ke(l.points, 10, t, {
            from: 0.2,
            to: 0.75,
            length: [0.04, 0.09],
            hole: { y: e.at.y, r: e.radius },
          }),
        ),
      ));
    const { rim: c, hollow: u } = $s(e.at, e.normal, e.radius);
    o.push(Ot(i(c), 2, 0.35), i(Ft(u)));
    const p = ke(l.points, 110, t, {
        length: [0.05, 0.12],
        lift: 0.008,
        sway: 0.9,
      }),
      f = p.attributes.position,
      d = new Float32Array(f.count),
      m = 48;
    for (let x = 0; x < f.count; x += m) {
      const b = rt.clamp((s - f.getY(x)) / (s - n), 0, 1);
      d.fill(b, x, x + m);
    }
    return (
      p.setAttribute("aBuild", new st(d, 1)),
      p.setAttribute("aEdge", new st(new Float32Array(f.count).fill(1), 1)),
      o.push(p),
      Bt(o)
    );
  }
  $n(Pe, 26);
  const Rt = -0.1,
    le = 0.42,
    at = -0.45,
    us = 0.19,
    ee = at - 0.002,
    ho = [
      { at: new y(-0.12, at, 0.06), yaw: 2, peck: !0, under: !0 },
      { at: new y(0.13, at, 0.05), yaw: -2, peck: !0, under: !0 },
      { at: new y(0, at, -0.09), yaw: 0, peck: !0, under: !0 },
      { at: new y(0.02, ee + 0.007, us), yaw: Math.PI, peck: !0, under: !0 },
      { at: new y(-0.14, ee + 0.007, -us), yaw: 0, peck: !0, under: !0 },
      { at: new y(0.16, Rt + 0.02, 0), yaw: Math.PI / 2, peck: !1, under: !1 },
    ],
    co = [
      { at: new y(-0.16, 0, 0.62), yaw: 0.6, peck: !0 },
      { at: new y(0.12, 0, 0.7), yaw: -0.9, peck: !0 },
      { at: new y(-0.02, 0, 0.86), yaw: 2.6, peck: !0 },
    ];
  function ei(r, t, e, s) {
    return {
      name: r,
      spots: t,
      appeal: e,
      boldness: s,
      present: !1,
      position: new y(),
      quaternion: new _t(),
      yaw: 0,
      taken: t.map(() => null),
    };
  }
  (ei("feeder", ho, 1, 1), ei("spill", co, 0.6, 0.7));
  function B(r, t) {
    const e = r.index ? r.toNonIndexed() : r;
    e !== r && r.dispose();
    const s = e.attributes.position,
      n = new Float32Array(s.count * 3),
      i = new y(),
      o = new V();
    for (let a = 0; a < s.count; a += 1)
      (typeof t == "function"
        ? t(i.fromBufferAttribute(s, a), o, a)
        : t
      ).toArray(n, a * 3);
    return (
      e.setAttribute("color", new st(n, 3)),
      e.attributes.uv && e.deleteAttribute("uv"),
      e.attributes.normal || e.computeVertexNormals(),
      e
    );
  }
  function ue(r) {
    const t = Gs(r);
    return (r.forEach((e) => e.dispose()), t);
  }
  function si(r) {
    let t = Math.max(1, Math.floor(r) % 2147483647);
    return () => (t = (t * 16807) % 2147483647) / 2147483647;
  }
  const Ks = new y(),
    lo = new y(0, 1, 0),
    ni = new _t();
  function lt(r, t, e, s = e, n = 6) {
    Ks.subVectors(t, r);
    const i = Ks.length(),
      o = new Tt(s, e, i, n, 1);
    return (
      o.translate(0, i / 2, 0),
      ni.setFromUnitVectors(lo, Ks.normalize()),
      o.applyQuaternion(ni),
      o.translate(r.x, r.y, r.z),
      o
    );
  }
  function ps(r, t, e, s = 7) {
    const n = r.attributes.position,
      i = [e() * 10, e() * 10, e() * 10];
    for (let o = 0; o < n.count; o += 1) {
      const a = n.getX(o),
        h = n.getY(o),
        l = n.getZ(o);
      n.setXYZ(
        o,
        a + Math.sin(h * s + i[0]) * Math.cos(l * s * 0.8) * t,
        h + Math.sin(l * s + i[1]) * Math.cos(a * s * 0.7) * t * 0.6,
        l + Math.sin(a * s + i[2]) * Math.cos(h * s * 0.9) * t,
      );
    }
    return (r.computeVertexNormals(), r);
  }
  const dt = ["#8a5e34", "#9a6a3d", "#7a5230", "#6f4a2b", "#5e3f24"].map(
      (r) => new V(r),
    ),
    uo = new V("#536f61"),
    ii = new V("#8f9c79"),
    fs = new V("#b99a59"),
    ri = new V("#3a2c21"),
    tn = ["#e3d3a4", "#c9ad73", "#e0b64a", "#3a2c1e", "#8a6a3a"].map(
      (r) => new V(r),
    );
  function Xt(r, t, e, s, n, i, o, a = [0, 0, 0]) {
    return B(
      new _e(r, t, e)
        .rotateX(a[0])
        .rotateY(a[1])
        .rotateZ(a[2])
        .translate(s, n, i),
      o,
    );
  }
  function po() {
    const r = si(4711),
      t = [],
      e = 0.25;
    for (const n of [1, -1]) {
      t.push(
        Xt(
          0.6,
          0.012,
          e,
          0,
          Rt - (e / 2) * Math.sin(le),
          ((n * e) / 2) * Math.cos(le),
          dt[3],
          [n * le, 0, 0],
        ),
      );
      for (let i = 2; i >= 0; i -= 1)
        for (let a = -4; a <= 3; a += 1) {
          const h = Math.max(-0.3, a * 0.086 + ((i % 2) * 0.086) / 2),
            l = Math.min(0.3, (a + 1) * 0.086 + ((i % 2) * 0.086) / 2 - 0.002);
          if (l - h < 0.012) continue;
          const c = l - h,
            u = 0.105 + r() * 0.004,
            p = Math.min(0.012, c / 4),
            f = new he();
          (f.moveTo(-c / 2, 0),
            f.lineTo(c / 2, 0),
            f.lineTo(c / 2, u - p),
            f.quadraticCurveTo(c / 2, u, c / 2 - p, u),
            f.lineTo(-c / 2 + p, u),
            f.quadraticCurveTo(-c / 2, u, -c / 2, u - p),
            f.closePath());
          const d = new Ee(f, {
              depth: 0.004,
              bevelEnabled: !0,
              bevelThickness: 0.001,
              bevelSize: 0.001,
              bevelSegments: 1,
              steps: 1,
              curveSegments: 3,
            })
              .translate(0, 0, -0.002)
              .rotateX(Math.PI / 2)
              .scale(1, 1, n)
              .translate((h + l) / 2, 0, n * (0.005 + i * 0.07))
              .rotateX(n * le)
              .translate(0, Rt + 0.009 + (2 - i) * 0.003, 0),
            m = uo.clone().lerp(ii, 0.12 + r() * 0.42);
          t.push(
            B(d, (x, b) =>
              b
                .copy(m)
                .multiplyScalar(0.94 + 0.06 * Math.sin(x.x * 260 + x.z * 18)),
            ),
          );
        }
      for (const i of [-0.3, 0.3])
        t.push(
          B(
            lt(
              new y(i, Rt, 0),
              new y(i, Rt - e * Math.sin(le), n * e * Math.cos(le)),
              0.009,
              0.009,
              5,
            ),
            dt[1],
          ),
        );
    }
    t.push(Xt(0.62, 0.022, 0.028, 0, Rt + 0.01, 0, dt[2]));
    for (const n of [-0.27, 0.27])
      t.push(
        B(new ct(0.004, 6, 4).scale(1, 0.4, 1).translate(n, Rt + 0.022, 0), fs),
      );
    for (const [n, i] of [
      [-0.2, 0.125],
      [0.2, 0.125],
      [-0.2, -0.125],
      [0.2, -0.125],
    ]) {
      const o = Rt - Math.abs(i) * Math.tan(le) - 0.006;
      (t.push(
        B(
          lt(new y(n, at - 0.01, i), new y(n * 0.99, o, i), 0.011, 0.01, 6),
          dt[0],
        ),
      ),
        t.push(
          B(
            lt(
              new y(n, o - 0.065, i),
              new y(n - Math.sign(n) * 0.055, o - 0.004, i),
              0.006,
              0.007,
              5,
            ),
            dt[1],
          ),
        ));
      for (const a of [at + 0.024, o - 0.024])
        t.push(
          B(
            new ct(0.0035, 6, 4)
              .scale(1, 1, 0.4)
              .translate(n, a, i + Math.sign(i) * 0.01),
            fs,
          ),
        );
    }
    ([-0.1, 0, 0.1].forEach((n, i) => {
      const o = new _e(0.46, 0.018, 0.096, 18, 1, 4).translate(
        0,
        at - 0.009,
        n,
      );
      t.push(
        B(o, (a, h) =>
          h
            .copy(dt[1 + (i % 2)])
            .multiplyScalar(
              0.93 + Math.sin(a.z * 340 + Math.sin(a.x * 19) * 1.4) * 0.07,
            ),
        ),
      );
    }),
      t.push(Xt(0.47, 0.03, 0.014, 0, at + 0.006, 0.152, dt[2])),
      t.push(Xt(0.47, 0.03, 0.014, 0, at + 0.006, -0.152, dt[2])),
      t.push(Xt(0.014, 0.03, 0.29, 0.228, at + 0.006, 0, dt[3])),
      t.push(Xt(0.014, 0.03, 0.29, -0.228, at + 0.006, 0, dt[3])));
    for (const n of [-0.228, 0.228])
      for (const i of [-0.152, 0.152])
        t.push(Xt(0.026, 0.036, 0.026, n, at + 0.004, i, dt[4]));
    for (const n of [-us, us]) {
      t.push(
        B(
          lt(new y(-0.265, ee, n), new y(0.265, ee, n), 0.0065, 0.0065, 8),
          dt[1],
        ),
      );
      for (const i of [-0.17, 0.17]) {
        t.push(
          B(
            lt(
              new y(i, at - 0.022, n * 0.74),
              new y(i, ee, n),
              0.005,
              0.005,
              5,
            ),
            dt[3],
          ),
        );
        for (let o = 0; o < 3; o += 1)
          t.push(
            B(
              new yt(0.0073, 0.0011, 4, 9)
                .rotateY(Math.PI / 2)
                .translate(i + (o - 1) * 0.003, ee, n),
              ri,
            ),
          );
      }
      for (const i of [-0.24, 0.23])
        t.push(
          B(
            lt(
              new y(i, ee, n),
              new y(i + 0.014, ee - 0.008, n + Math.sign(n) * 0.017),
              0.0035,
              0.0015,
              5,
            ),
            dt[2],
          ),
        );
    }
    for (const n of [-0.161, 0.161]) {
      t.push(Xt(0.14, 0.048, 0.01, 0, at - 0.015, n, dt[1]));
      const i = new he();
      (i.moveTo(0, -0.017),
        i.quadraticCurveTo(-0.027, 0.004, 0, 0.02),
        i.quadraticCurveTo(0.027, 0.004, 0, -0.017));
      const o = new Ys(i, 6)
        .rotateZ(-0.4)
        .translate(0, at - 0.011, n + Math.sign(n) * 0.0055);
      t.push(B(o, ii));
    }
    for (const n of [-0.15, 0.15])
      t.push(Xt(0.025, 0.021, 0.3, n, at - 0.028, 0, dt[3]));
    const s = new ct(0.075, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2)
      .scale(1.3, 0.35, 1)
      .translate(0, at, 0);
    t.push(
      B(ps(s, 0.004, r, 30), (n, i) =>
        i.copy(tn[Math.floor(r() * 3)]).multiplyScalar(0.9 + r() * 0.15),
      ),
    );
    for (let n = 0; n < 70; n += 1) {
      const i = Math.sqrt(r()) * 0.17,
        o = r() * Math.PI * 2,
        a = Math.cos(o) * i * 1.2,
        h = Math.sin(o) * i * 0.8,
        l = Math.max(0, 0.026 * (1 - (a / 0.1) ** 2 - (h / 0.075) ** 2)),
        c = r() < 0.15,
        u = c ? 0.009 : 0.005 + r() * 0.003,
        p = new He(1, 0)
          .scale(u, u * 0.6, u * (c ? 2 : 1.3))
          .rotateY(r() * 3)
          .translate(a, at + l + 0.003, h);
      t.push(B(p, c ? tn[3] : tn[Math.floor(r() * 3)]));
    }
    return (
      t.push(B(new yt(0.018, 0.003, 6, 16), fs)),
      t.push(
        B(lt(new y(0, -0.012, 0), new y(0, Rt + 0.03, 0), 0.003, 0.003, 4), ri),
      ),
      t.push(B(new yt(0.01, 0.003, 6, 12).translate(0, Rt + 0.03, 0), fs)),
      ue(t)
    );
  }
  const oi = Math.sqrt(3),
    fo = 0.5 * (oi - 1),
    Je = (3 - oi) / 6,
    ai = (r) => Math.floor(r) | 0,
    hi = new Float64Array([
      1, 1, -1, 1, 1, -1, -1, -1, 1, 0, -1, 0, 1, 0, -1, 0, 0, 1, 0, -1, 0, 1,
      0, -1,
    ]);
  function mo(r = Math.random) {
    const t = yo(r),
      e = new Float64Array(t).map((n) => hi[(n % 12) * 2]),
      s = new Float64Array(t).map((n) => hi[(n % 12) * 2 + 1]);
    return function (i, o) {
      let a = 0,
        h = 0,
        l = 0;
      const c = (i + o) * fo,
        u = ai(i + c),
        p = ai(o + c),
        f = (u + p) * Je,
        d = u - f,
        m = p - f,
        x = i - d,
        b = o - m;
      let g, w;
      x > b ? ((g = 1), (w = 0)) : ((g = 0), (w = 1));
      const M = x - g + Je,
        z = b - w + Je,
        v = x - 1 + 2 * Je,
        _ = b - 1 + 2 * Je,
        A = u & 255,
        C = p & 255;
      let S = 0.5 - x * x - b * b;
      if (S >= 0) {
        const R = A + t[C],
          N = e[R],
          Z = s[R];
        ((S *= S), (a = S * S * (N * x + Z * b)));
      }
      let F = 0.5 - M * M - z * z;
      if (F >= 0) {
        const R = A + g + t[C + w],
          N = e[R],
          Z = s[R];
        ((F *= F), (h = F * F * (N * M + Z * z)));
      }
      let I = 0.5 - v * v - _ * _;
      if (I >= 0) {
        const R = A + 1 + t[C + 1],
          N = e[R],
          Z = s[R];
        ((I *= I), (l = I * I * (N * v + Z * _)));
      }
      return 70 * (a + h + l);
    };
  }
  function yo(r) {
    const e = new Uint8Array(512);
    for (let s = 0; s < 512 / 2; s++) e[s] = s;
    for (let s = 0; s < 512 / 2 - 1; s++) {
      const n = s + ~~(r() * (256 - s)),
        i = e[s];
      ((e[s] = e[n]), (e[n] = i));
    }
    for (let s = 256; s < 512; s++) e[s] = e[s - 256];
    return e;
  }
  function en(r) {
    let t = r >>> 0;
    return () => {
      ((t |= 0), (t = (t + 1831565813) | 0));
      let e = Math.imul(t ^ (t >>> 15), 1 | t);
      return (
        (e = (e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ e),
        ((e ^ (e >>> 14)) >>> 0) / 4294967296
      );
    };
  }
  const ci = mo(en(1337)),
    li = (r, t) => Math.atan2(t.x - r.x, t.z - r.z),
    kt = Object.freeze({ x: 0, z: 0 }),
    ui = Object.freeze({ x: -7.25, z: -5.5, scale: 1.05, color: "#f3db72" }),
    sn = Object.freeze({ x: 2, z: -24 }),
    nn = Object.freeze({ x: -24, z: 6 }),
    Te = Object.freeze({ x: 22, z: -4 }),
    pi = Object.freeze({ x: -8.5, y: 6.1, z: 10.5 }),
    fi = Object.freeze({ x: 1.6, z: -3.1, facing: -1.1 }),
    ds = Object.freeze({ x: -9.5, z: -6.5 });
  li(Te, kt) + 0.1;
  const je = Object.freeze({ x: 2, z: 22 }),
    xo = li(je, kt),
    pe = Object.freeze({ ...je, rotation: xo }),
    tt = Object.freeze({
      "project-brickblaster": pe,
      "project-hologram": pe,
      "project-paper-boat": pe,
      "project-golden-hour": pe,
      "project-cosmic-bloom": pe,
      "project-aera": pe,
      "project-polify": pe,
    });
  ((({ ...kt }), { ...sn }), { ...nn }, { ...je }, { ...Te });
  const ms = [
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
      position: [tt["project-brickblaster"].x, tt["project-brickblaster"].z],
      rotation: tt["project-brickblaster"].rotation,
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
      position: [tt["project-hologram"].x, tt["project-hologram"].z],
      rotation: tt["project-hologram"].rotation,
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
      position: [tt["project-paper-boat"].x, tt["project-paper-boat"].z],
      rotation: tt["project-paper-boat"].rotation,
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
      position: [tt["project-golden-hour"].x, tt["project-golden-hour"].z],
      rotation: tt["project-golden-hour"].rotation,
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
      position: [tt["project-cosmic-bloom"].x, tt["project-cosmic-bloom"].z],
      rotation: tt["project-cosmic-bloom"].rotation,
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
      position: [tt["project-aera"].x, tt["project-aera"].z],
      rotation: tt["project-aera"].rotation,
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
      position: [tt["project-polify"].x, tt["project-polify"].z],
      rotation: tt["project-polify"].rotation,
      palette: ["#2b6cf6", "#f2c33c", "#111114"],
    },
  ];
  (Object.freeze([...ms].sort((r, t) => r.number.localeCompare(t.number))),
    ms.map((r) => r.section),
    Object.fromEntries(ms.map((r) => [r.section, r])));
  const go = 3.08 + 0.08,
    se = Object.freeze({ x: 1.2, z: 1.55 });
  function bo(r) {
    return (
      1 +
      Math.sin(r * 2 + 0.9) * 0.045 +
      Math.sin(r * 3 - 0.4) * 0.03 +
      Math.sin(r * 5 + 2.1) * 0.012
    );
  }
  function wo(r, t) {
    const e = r / se.x,
      s = t / se.z;
    return Math.hypot(e, s) / bo(Math.atan2(s, e));
  }
  const ys = -0.46,
    Be = 2.42,
    rn = 3.55,
    di = 3.75,
    on = 1.9;
  function Mo(r) {
    if (r >= rn) return 0;
    if (r >= Be) {
      const n = (r - Be) / (rn - Be);
      return ys * (1 - n) * (1 - n);
    }
    const t = (2 * -ys) / (rn - Be);
    if (r >= on) return ys - (Be - r) * t;
    const e = ys - (Be - on) * t,
      s = r / on;
    return e - 0.32 * (1 - s * s);
  }
  const mi = (r) => {
    const t = Math.min(1, Math.max(0, r));
    return t * t * (3 - 2 * t);
  };
  function zo(r) {
    const t = mi((r - 3.45) / (di - 3.45)),
      e = 1 - mi((r - 1.95) / 0.35),
      s = 0.06 * (1 - t) + 0.34 * e;
    return Mo(r) - s;
  }
  const Ao = {
      from: { x: -1.8, z: -4.2 },
      control: { x: -3.5, z: -14 },
      to: { x: 2.2, z: -22.2 },
      count: 22,
    },
    vo = {
      from: { x: -3.6, z: -1.6 },
      control: { x: -13.5, z: 1.2 },
      to: { x: -19.3, z: 5.05 },
      count: 22,
    },
    ne = {
      from: { x: 2.8, z: 2.6 },
      control: { x: 4.8, z: 12 },
      to: { x: 2, z: 19.8 },
      count: 20,
    },
    _o = {
      "project-brickblaster": ne,
      "project-hologram": ne,
      "project-paper-boat": ne,
      "project-golden-hour": ne,
      "project-cosmic-bloom": ne,
      "project-aera": ne,
      "project-polify": ne,
    };
  function xs(r, t, e, s) {
    const n = 1 - r;
    return n * n * t + 2 * n * r * e + r * r * s;
  }
  function an(r, t) {
    const e = en(t),
      s = [];
    for (let n = 0; n < r.count; n++) {
      const i = n / (r.count - 1),
        o = xs(i, r.from.x, r.control.x, r.to.x),
        a = xs(i, r.from.z, r.control.z, r.to.z),
        h =
          2 * (1 - i) * (r.control.x - r.from.x) +
          2 * i * (r.to.x - r.control.x),
        l =
          2 * (1 - i) * (r.control.z - r.from.z) +
          2 * i * (r.to.z - r.control.z),
        c = Math.max(0.001, Math.hypot(h, l)),
        u = h / c,
        p = l / c,
        f = (e() - 0.5) * 0.2,
        d = (e() - 0.5) * 0.08,
        m = o - p * f + u * d,
        x = a + u * f + p * d;
      s.push({
        x: m,
        z: x,
        rotation: -Math.atan2(p, u) + (e() - 0.5) * 0.26,
        radiusX: 0.33 + e() * 0.065,
        radiusZ: 0.27 + e() * 0.055,
      });
    }
    return s;
  }
  function So(r, t) {
    const e = [];
    for (let s = 0; s < r.count; s += 1) {
      const n = (s + 1) / (r.count + 1),
        i = xs(n, r.from.x, r.control.x, r.to.x),
        o = xs(n, r.from.z, r.control.z, r.to.z),
        a =
          2 * (1 - n) * (r.control.x - r.from.x) +
          2 * n * (r.to.x - r.control.x),
        h =
          2 * (1 - n) * (r.control.z - r.from.z) +
          2 * n * (r.to.z - r.control.z);
      e.push({
        x: i,
        z: o,
        rotation: -Math.atan2(h, a),
        color: t.palette[0],
        section: t.section,
      });
    }
    return e;
  }
  const Co = [an(Ao, 659918), an(vo, 48869), an(ne, 50222)].flat();
  ms.map((r) => {
    const t = _o[r.section];
    return {
      section: r.section,
      color: r.palette[0],
      from: t.from,
      to: t.to,
      markers: So(t, r),
    };
  });
  const Eo = [
    {
      x: ui.x,
      z: ui.z,
      radius: 0.55,
      treeRadius: 2,
      stoneRadius: 1.1,
      removeStones: !0,
    },
    {
      x: sn.x,
      z: sn.z,
      radius: 1.3,
      fringe: { radius: 2.3, grassHeight: 0.5, fadeWidth: 0.8 },
    },
    {
      x: fi.x,
      z: fi.z,
      radius: 1.1,
      removeStones: !0,
      stoneRadius: 1.6,
      fringe: { radius: 1.75, grassHeight: 0.42, fadeWidth: 0.8 },
    },
    {
      x: kt.x,
      z: kt.z,
      radius: 3.65,
      treeRadius: 7,
      removeStones: !0,
      flatten: { inner: 3.6, outer: 5.8 },
      fringe: { radius: 4.85, grassHeight: 0.5, fadeWidth: 1.1 },
    },
    {
      x: kt.x - 2.6,
      z: kt.z - 2.3,
      radius: 1.12,
      removeStones: !0,
      fringe: { radius: 2.05, grassHeight: 0.46, fadeWidth: 0.75 },
    },
    {
      x: Te.x,
      z: Te.z,
      radius: 0.55,
      treeRadius: 4.4,
      stoneRadius: 2.1,
      removeStones: !0,
      flatten: { inner: 1.75, outer: 2.65 },
      fringe: { radius: 2.3, grassHeight: 0.58, fadeWidth: 1.05 },
    },
    {
      x: nn.x,
      z: nn.z,
      radius: 2.95,
      stretchX: se.x,
      stretchZ: se.z,
      shape: wo,
      shapeReach: Math.max(se.x, se.z) * 1.1,
      obstacleRadius: go * (se.x + se.z) * 0.5,
      treeRadius: 5.2,
      stoneRadius: 4.1,
      flatten: { inner: di, outer: 5.6, profile: zo },
      fringe: { radius: 3.8, grassHeight: 0.46, fadeWidth: 1 },
    },
    {
      x: je.x,
      z: je.z,
      radius: 1.75,
      treeRadius: 5.4,
      removeStones: !0,
      flatten: { inner: 2.1, outer: 3.4 },
      fringe: { radius: 2.7, grassHeight: 0.72, fadeWidth: 1.15 },
    },
  ];
  (kt.x + ds.x,
    kt.z + ds.z,
    kt.x + ds.x * 0.74,
    kt.z + ds.z * 0.74,
    [0.34, 0.62, 0.9].map((r, t) => ({
      x: Te.x + pi.x * r,
      z: Te.z + pi.z * r,
      radius: t === 1 ? 3.25 : 2.85,
    })));
  const yi = Eo.filter((r) => r.flatten).map((r) => ({
      x: r.x,
      z: r.z,
      inner: r.flatten.inner,
      outer: r.flatten.outer,
      basin: r.flatten.basin ?? 0,
      basinFloor: r.flatten.basinFloor ?? 0,
      basinBowl: r.flatten.basinBowl ?? 0,
      profile: r.flatten.profile ?? null,
      shape: r.shape ?? null,
      reach: r.flatten.outer * (r.shapeReach ?? 1),
    })),
    xi = (r) => r * r * (3 - 2 * r);
  function hn(r, t, e, s) {
    let n = ci(r * e, t * e) * s;
    for (let i = 0; i < yi.length; i++) {
      const o = yi[i],
        a = r - o.x,
        h = t - o.z;
      if (Math.abs(a) > o.reach || Math.abs(h) > o.reach) continue;
      const l = o.shape ? o.shape(a, h) : Math.sqrt(a * a + h * h);
      if (l >= o.outer) continue;
      const c = ci(o.x * e, o.z * e) * s,
        u = xi(Math.min(1, Math.max(0, (l - o.inner) / (o.outer - o.inner))));
      if (((n = c + (n - c) * u), o.profile && l < o.inner)) n += o.profile(l);
      else if (o.basin > 0 && l < o.inner)
        if (l <= o.basinFloor) {
          const p = l / Math.max(o.basinFloor, 0.001);
          ((n -= o.basinBowl * Math.pow(1 - p * p, 2)), (n -= o.basin));
        } else {
          const p = (l - o.basinFloor) / (o.inner - o.basinFloor);
          n -= o.basin * (1 - xi(p));
        }
    }
    return n;
  }
  const xt = ["#8a6340", "#7b5636", "#94704a", "#6f4c2f"].map((r) => new V(r)),
    gi = new V("#5e4430"),
    bi = new V("#b39063"),
    wi = new V("#8e6f48"),
    Fo = new V("#ddcaa0"),
    ko = new V("#59584d"),
    Po = new V("#8a3b2b"),
    gs = ["#d9bf7a", "#c9a45c", "#e6d49a", "#b8914d"].map((r) => new V(r)),
    bs = ["#b8955a", "#9a7a44"].map((r) => new V(r)),
    Mi = new V("#e2b43c"),
    zi = new V("#d9c89a"),
    To = new V("#a5593a"),
    Zt = new V("#4a3a2a"),
    Bo = new V("#8a8474"),
    Oo = new V("#6f7447"),
    Oe = new V("#b56d45"),
    cn = new V("#7e4a31");
  (new V(cn.r / Oe.r, cn.g / Oe.g, cn.b / Oe.b),
    new V("#b56d45").multiplyScalar(0.16));
  const ws = 0.17,
    Ai = [
      [-0.5, -0.28],
      [0.52, -0.27],
      [-0.5, 0.28],
      [0.5, 0.29],
    ],
    ln = [
      [-0.66, -0.48, 1.5],
      [0.66, -0.47, 1.49],
      [-0.66, 0.3, 1.18],
      [0.66, 0.31, 1.17],
    ],
    Ro = [
      [-0.76, -1.25],
      [0.76, -1.25],
    ];
  function un({
    scale: r = 1,
    open: t = !1,
    stripe: e = !1,
    lean: s = 0,
    turn: n = 0,
    random: i,
  }) {
    const o = [],
      a = t
        ? [
            [0, 0],
            [0.16, 0.004],
            [0.205, 0.045],
            [0.222, 0.14],
            [0.214, 0.25],
            [0.2, 0.32],
            [0.19, 0.335],
          ]
        : [
            [0, 0],
            [0.16, 0.004],
            [0.205, 0.045],
            [0.218, 0.13],
            [0.2, 0.25],
            [0.15, 0.36],
            [0.07, 0.43],
            [0.046, 0.458],
            [0.06, 0.49],
            [0.078, 0.53],
            [0.06, 0.552],
            [0, 0.548],
          ],
      h = new Se(a.map(([u, p]) => new E(u, p)))
        .getPoints(44)
        .map((u) => new E(Math.max(0, u.x), Math.max(0, u.y))),
      l = new ae(h, 28);
    if ((l.scale(1, 1, 0.82), !t)) {
      const u = l.attributes.position;
      for (let p = 0; p < u.count; p += 1) {
        const f = u.getY(p),
          d = rt.smoothstep(f, 0.26, 0.42) * (1 - rt.smoothstep(f, 0.44, 0.47)),
          m = rt.smoothstep(f, 0.47, 0.53),
          x = Math.atan2(u.getZ(p), u.getX(p)),
          b =
            1 +
            Math.sin(x * 9 + f * 6) * 0.14 * d +
            Math.sin(x * 13) * 0.12 * m;
        (u.setX(p, u.getX(p) * b), u.setZ(p, u.getZ(p) * b));
      }
    }
    if (
      (ps(l, 0.014, i, 8),
      o.push(
        B(l, (u, p) => {
          const f = Math.atan2(u.z, u.x),
            d = Math.sin(f * 40) * Math.sin(u.y * 90) * 0.05,
            m =
              Math.max(0, Math.sin(f * 9 + u.y * 6)) *
              rt.smoothstep(u.y, 0.28, 0.42) *
              0.14;
          return (
            p
              .copy(bi)
              .lerp(wi, (1 - rt.smoothstep(u.y, 0, 0.08)) * 0.6 + m)
              .multiplyScalar(0.94 + d),
            e && u.y > 0.19 && u.y < 0.25 && p.lerp(Po, 0.75),
            p
          );
        }),
      ),
      t)
    ) {
      (o.push(
        B(
          new yt(0.195, 0.026, 6, 24)
            .rotateX(Math.PI / 2)
            .scale(1, 1, 0.82)
            .translate(0, 0.33, 0),
          (p, f) =>
            f
              .copy(wi)
              .lerp(bi, 0.5 + Math.sin(Math.atan2(p.z, p.x) * 14) * 0.3),
        ),
      ),
        o.push(vi(0.19, 0.05, i).scale(1, 1, 0.82).translate(0, 0.33, 0)));
      for (let p = 0; p < 16; p += 1) {
        const f = i() * Math.PI * 2,
          d = Math.sqrt(i()) * 0.15;
        o.push(
          pn(i).translate(
            Math.cos(f) * d,
            0.33 +
              0.05 * Math.pow(Math.max(0, 1 - (d / 0.19) ** 2), 0.85) +
              0.002,
            Math.sin(f) * d * 0.82,
          ),
        );
      }
      const u = new y(0.04, 0.35, 0.02);
      (o.push(B(lt(u, new y(0.12, 0.52, 0.1), 0.012, 0.01, 6), xt[2])),
        o.push(
          B(
            new ct(0.045, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2)
              .rotateX(Math.PI)
              .scale(1, 0.6, 1.2)
              .translate(0.03, 0.37, 0.01),
            xt[1],
          ),
        ));
    } else
      (o.push(
        B(
          new yt(0.05, 0.008, 5, 14)
            .rotateX(Math.PI / 2)
            .translate(0, 0.452, 0),
          Zt,
        ),
      ),
        o.push(
          B(
            new yt(0.048, 0.007, 5, 14)
              .rotateX(Math.PI / 2 + 0.12)
              .translate(0, 0.466, 0),
            Zt,
          ),
        ),
        o.push(B(new ct(0.012, 6, 4).translate(0.05, 0.46, 0.01), Zt)),
        o.push(
          B(
            lt(
              new y(0.052, 0.455, 0.012),
              new y(0.075, 0.39, 0.03),
              0.004,
              0.003,
              4,
            ),
            Zt,
          ),
        ));
    const c = ue(o);
    return (c.scale(r, r, r), c.rotateY(n), c.rotateZ(s), c);
  }
  function Io() {
    const r = [],
      t = (e, s, n, i, o, a, h) => {
        const l = new _e(e, s, n, 10, 2, 2).translate(i, o, a);
        return B(l, (c, u) =>
          u
            .copy(h)
            .multiplyScalar(
              0.96 + Math.sin(c.y * 370 + Math.sin(c.x * 26) * 1.3) * 0.045,
            ),
        );
      };
    r.push(
      t(
        0.298,
        0.112,
        0.265,
        0,
        0.058,
        -0.004,
        xt[3].clone().multiplyScalar(0.55),
      ),
    );
    for (const e of [-0.145, 0.145]) {
      r.push(t(0.32, 0.046, 0.014, 0, 0.027, e, xt[1]));
      const s = new he();
      (s.moveTo(-0.16, 0.053),
        s.lineTo(0.16, 0.053),
        s.lineTo(0.16, 0.115),
        s.lineTo(-0.16, 0.115),
        s.closePath());
      const n = new Ds();
      (n.moveTo(-0.037, 0.073),
        n.lineTo(0.037, 0.073),
        n.quadraticCurveTo(0.052, 0.073, 0.052, 0.085),
        n.quadraticCurveTo(0.052, 0.097, 0.037, 0.097),
        n.lineTo(-0.037, 0.097),
        n.quadraticCurveTo(-0.052, 0.097, -0.052, 0.085),
        n.quadraticCurveTo(-0.052, 0.073, -0.037, 0.073),
        s.holes.push(n),
        r.push(
          B(
            new Ee(s, {
              depth: 0.014,
              bevelEnabled: !1,
              curveSegments: 5,
            }).translate(0, 0, e - 0.007),
            xt[2],
          ),
        ));
    }
    for (const e of [-0.158, 0.158]) {
      for (const s of [0.029, 0.086])
        r.push(t(0.014, 0.052, 0.28, e, s, 0, xt[0]));
      for (const s of [-0.15, 0.15]) {
        r.push(t(0.022, 0.118, 0.02, e, 0.06, s, xt[3]));
        for (const n of [0.025, 0.101])
          r.push(
            B(
              new ct(0.0028, 6, 4)
                .scale(1, 1, 0.4)
                .translate(e, n, s + Math.sign(s) * 0.011),
              ko,
            ),
          );
      }
    }
    for (const e of [-0.101, 0, 0.101])
      r.push(t(0.335, 0.018, 0.098, 0, 0.125, e, xt[2]));
    return ue(r);
  }
  function No(r, t, e, s, n) {
    const i = s - e,
      o = new He(1, 1);
    o.scale(0.11 + n() * 0.03, i / 2, 0.09 + n() * 0.03);
    const a = o.attributes.position;
    for (let l = 0; l < a.count; l += 1)
      a.setY(l, Math.min(a.getY(l), i * 0.38));
    (o.translate(r, e + i / 2, t), ps(o, 0.012, n, 13));
    const h = 0.85 + n() * 0.2;
    return B(o, (l, c) =>
      c
        .copy(Bo)
        .multiplyScalar(h + (n() - 0.5) * 0.08)
        .lerp(Oo, (1 - rt.smoothstep(l.y, e, e + i * 0.35)) * 0.45),
    );
  }
  function vi(r, t, e, s = 6, n = 22) {
    const i = [];
    for (let h = 0; h <= s; h += 1) {
      const l = r * (1 - h / s);
      i.push(new E(Math.max(l, 5e-4), t * Math.pow(1 - (l / r) ** 2, 0.85)));
    }
    const o = new ae(i, n),
      a = o.attributes.position;
    for (let h = 0; h < a.count; h += 1) {
      const l = Math.atan2(a.getZ(h), a.getX(h)),
        c = 1 + Math.sin(l * 5 + 1.3) * 0.1 + Math.sin(l * 3) * 0.08;
      (a.setX(h, a.getX(h) * c), a.setZ(h, a.getZ(h) * c));
    }
    return (
      o.computeVertexNormals(),
      B(o, (h, l) =>
        l
          .copy(gs[Math.floor(e() * gs.length)])
          .multiplyScalar(0.9 + e() * 0.16),
      )
    );
  }
  function pn(r) {
    const t = 0.0065 + r() * 0.003;
    return B(
      new He(1, 0).scale(t, t * 0.62, t * 1.6).rotateY(r() * Math.PI),
      gs[Math.floor(r() * gs.length)],
    );
  }
  function Lo(r, t = 0.1, e = 0.03) {
    const s = [vi(t, e, r)];
    for (let n = 0; n < 30; n += 1) {
      const i = r() * Math.PI * 2,
        o = Math.sqrt(r()) * t * 0.9,
        a = e * Math.pow(Math.max(0, 1 - (o / t) ** 2), 0.85);
      s.push(
        pn(r)
          .rotateX((r() - 0.5) * 0.6)
          .translate(Math.cos(i) * o, a + 0.002, Math.sin(i) * o),
      );
    }
    return ue(s);
  }
  function _i(r, t) {
    const e = [],
      s = r.clone().add(new y(0, -0.12, 0));
    (e.push(B(lt(r, s, 0.004, 0.004, 4), Zt)),
      e.push(B(new ct(0.018, 6, 5).translate(s.x, s.y, s.z), zi)));
    for (let n = 0; n < 4; n += 1) {
      const i = (n / 4) * Math.PI * 2 + t() * 0.5,
        o = new y(Math.cos(i), 0, Math.sin(i)),
        a = s
          .clone()
          .addScaledVector(o, 0.02)
          .add(new y(0, -0.015, 0)),
        h = 0.12 + t() * 0.03,
        l = a
          .clone()
          .addScaledVector(o, 0.035 + t() * 0.02)
          .add(new y(0, -h, 0)),
        c = new Tt(0.019, 0.014, h, 10, 6),
        u = c.attributes.position;
      for (let p = 0; p < u.count; p += 1) {
        const f = Math.max(0, (u.getY(p) + h / 2) / h),
          d = f < 0.12 ? Math.sqrt(f / 0.12) : 1;
        (u.setX(p, u.getX(p) * d), u.setZ(p, u.getZ(p) * d));
      }
      (c.translate(0, -h / 2, 0),
        c.applyQuaternion(
          new _t().setFromUnitVectors(
            new y(0, -1, 0),
            l.clone().sub(a).normalize(),
          ),
        ),
        c.translate(a.x, a.y, a.z),
        e.push(
          B(c, (p, f) => {
            const d = Math.atan2(p.z - a.z, p.x - a.x),
              m = Math.abs(Math.sin(d * 5)) > 0.85 ? 0.62 : 1,
              x = Math.abs(Math.sin(p.y * 230)) > 0.9 ? 0.8 : 1;
            return f.copy(Mi).multiplyScalar(0.92 * m * x);
          }),
        ));
      for (let p = 0; p < 3; p += 1) {
        const f = (p - 1) * 0.9,
          d = new y(-o.z, 0, o.x)
            .applyAxisAngle(new y(0, 1, 0), f)
            .multiplyScalar(0.016),
          m = new We(0.02, 0.07, 1, 3),
          x = m.attributes.position;
        for (let b = 0; b < x.count; b += 1) {
          const g = x.getY(b) / 0.07 + 0.5;
          (x.setX(b, x.getX(b) * (1 - g * 0.7)),
            x.setZ(b, Math.sin(g * Math.PI) * 0.012));
        }
        (m.translate(0, 0.035, 0),
          m.lookAt(d),
          m.translate(a.x + d.x, a.y + 0.004, a.z + d.z),
          e.push(B(m, (b, g) => g.copy(zi).multiplyScalar(0.9 + t() * 0.12))));
      }
    }
    return ue(e);
  }
  function Do(r) {
    const t = si(90721),
      e = [],
      s = Math.max(...Ai.map(([c, u]) => r(c, u)));
    (Ai.forEach(([c, u]) => {
      e.push(No(c, u, r(c, u) - 0.03, s + 0.08, t));
    }),
      [-0.46, 0.47].forEach((c) => {
        e.push(
          B(
            lt(
              new y(c, s + 0.105, -0.42),
              new y(c + 0.01, s + 0.105, 0.42),
              0.034,
              0.031,
              7,
            ),
            (u, p) =>
              p.copy(gi).multiplyScalar(0.9 + Math.sin(u.z * 60) * 0.06),
          ),
        );
      }),
      [-0.3, -0.15, 0, 0.15, 0.3].forEach((c, u) => {
        const p = new _e(1.22 + (t() - 0.5) * 0.06, 0.028, 0.14, 3, 1, 1)
          .rotateY((t() - 0.5) * 0.025)
          .translate((t() - 0.5) * 0.03, s + ws - 0.014, c);
        (e.push(
          B(ps(p, 0.003, t, 5), (f, d) =>
            d
              .copy(xt[u % xt.length])
              .multiplyScalar(0.94 + Math.sin(f.x * 40 + u) * 0.04),
          ),
        ),
          [-0.46, 0.47].forEach((f) => {
            e.push(
              B(
                new Tt(0.006, 0.006, 0.004, 5).translate(f, s + ws + 0.001, c),
                Zt,
              ),
            );
          }));
      }));
    const n = (c, u, p) => c.translate(u, s + ws, p);
    (e.push(
      n(un({ scale: 1.08, stripe: !0, turn: 0.3, random: t }), -0.3, -0.13),
    ),
      e.push(
        n(un({ scale: 0.96, lean: -0.12, turn: -0.5, random: t }), 0.08, -0.16),
      ),
      e.push(
        n(un({ scale: 0.92, open: !0, turn: 0.2, random: t }), 0.02, 0.14),
      ));
    const i = [
        [0, 0],
        [0.12, 0],
        [0.14, 0.03],
        [0.152, 0.15],
        [0.162, 0.19],
      ].map(([c, u]) => new E(c, u)),
      o = new ae(i, 20);
    (e.push(
      n(
        B(o, (c, u) => {
          const p = (Math.atan2(c.z, c.x) + Math.PI) / (Math.PI * 2),
            f = (Math.floor(p * 22) + Math.floor(c.y * 40)) % 2;
          return u.copy(bs[f]);
        }),
        -0.42,
        0.18,
      ),
    ),
      e.push(
        n(
          B(
            new yt(0.162, 0.013, 5, 20)
              .rotateX(Math.PI / 2)
              .translate(0, 0.19, 0),
            bs[1],
          ),
          -0.42,
          0.18,
        ),
      ));
    for (let c = 0; c < 7; c += 1) {
      const u = 0.035 + c * 0.024,
        p = rt.lerp(0.142, 0.162, (u - 0.03) / 0.16);
      e.push(
        n(
          B(
            new yt(p, 0.0026, 4, 28).rotateX(Math.PI / 2).translate(0, u, 0),
            bs[c % 2],
          ),
          -0.42,
          0.18,
        ),
      );
    }
    for (const c of [-1, 1]) {
      const u = [];
      for (let p = 0; p <= 12; p += 1) {
        const f = p / 12;
        u.push(
          new y(
            c * (0.149 + Math.sin(f * Math.PI) * 0.015),
            0.173 + Math.sin(f * Math.PI) * 0.094,
            (f - 0.5) * 0.13,
          ),
        );
      }
      e.push(n(B(new Dt(new Kt(u), 16, 0.006, 5, !1), bs[1]), -0.42, 0.18));
    }
    for (let c = 0; c < 4; c += 1) {
      const u = B(new ct(0.03, 10, 8).scale(1, 1, 2.5), (p, f) => {
        const d =
            Math.abs(Math.sin(Math.atan2(p.y, p.x) * 5)) > 0.85 ? 0.62 : 1,
          m = Math.abs(Math.sin(p.z * 230)) > 0.9 ? 0.8 : 1;
        return f.copy(Mi).multiplyScalar(0.92 * d * m);
      })
        .rotateY(c * 0.8 + t() * 0.4)
        .rotateX(-0.25 + t() * 0.5)
        .translate((t() - 0.5) * 0.1, 0.19 + c * 0.012, (t() - 0.5) * 0.1);
      e.push(n(u, -0.42, 0.18));
    }
    e.push(n(Io(), 0.43, -0.005));
    const a = 0.134,
      h = (c) => n(c.translate(0, a, 0), 0.43, -0.005),
      l = [
        [0, 0],
        [0.075, 0],
        [0.115, 0.05],
        [0.135, 0.14],
        [0.125, 0.22],
        [0.082, 0.285],
        [0.068, 0.305],
        [0.082, 0.325],
        [0.078, 0.34],
        [0, 0.34],
      ].map(([c, u]) => new E(c, u));
    (e.push(
      h(
        B(
          new ae(l, 24),
          (c, u) => (
            u
              .copy(To)
              .multiplyScalar(0.92 + Math.sin(Math.atan2(c.z, c.x) * 3) * 0.04),
            c.y > 0.17 && c.y < 0.2 && u.multiplyScalar(0.72),
            u
          ),
        ),
      ),
    ),
      e.push(
        h(B(new Tt(0.088, 0.088, 0.022, 18).translate(0, 0.35, 0), xt[1])),
      ),
      e.push(h(B(new ct(0.018, 10, 6).translate(0, 0.37, 0), xt[3]))),
      e.push(Lo(t).translate(0.02, r(0.02, 0.5) + 0.002, 0.5)));
    for (let c = 0; c < 130; c += 1) {
      const u = c < 105,
        p = t() * Math.PI * 2,
        f = Math.sqrt(t()),
        d = u ? Math.cos(p) * f * 0.34 : (t() - 0.4) * 0.35,
        m = u ? 0.68 + Math.sin(p) * f * 0.28 : 0.26 + t() * 0.1,
        x = u ? r(d, m) + 0.003 : s + ws + 0.003;
      e.push(pn(t).translate(d, x, m));
    }
    return (
      ln.forEach(([c, u, p]) => {
        const f = new y(c, r(c, u) - 0.06, u),
          d = new y(c * 0.98, s + p, u),
          m = f
            .clone()
            .lerp(d, 0.55)
            .add(new y((t() - 0.5) * 0.03, 0, (t() - 0.5) * 0.03)),
          x = (b, g) =>
            g.copy(gi).multiplyScalar(0.92 + Math.sin(b.y * 30) * 0.05);
        (e.push(B(lt(f, m, 0.03, 0.026, 7), x)),
          e.push(B(lt(m, d, 0.026, 0.022, 7), x)));
        for (let b = 0; b < 3; b += 1)
          e.push(
            B(
              new yt(0.03, 0.006, 4, 9)
                .rotateX(Math.PI / 2 + (b - 1) * 0.35)
                .translate(d.x, d.y - 0.03 - b * 0.022, d.z),
              Zt,
            ),
          );
      }),
      e.push(
        B(
          lt(
            new y(-0.72, s + 1.47, -0.475),
            new y(0.72, s + 1.46, -0.47),
            0.021,
            0.018,
            7,
          ),
          xt[0],
        ),
      ),
      e.push(
        B(
          lt(
            new y(-0.72, s + 1.15, 0.305),
            new y(0.72, s + 1.14, 0.31),
            0.021,
            0.018,
            7,
          ),
          xt[0],
        ),
      ),
      Ro.forEach(([c, u], p) => {
        const f = new y(ln[p][0] * 0.98, s + 1.45, ln[p][1]),
          d = new y(c, r(c, u), u);
        (e.push(
          B(lt(f, d.clone().add(new y(0, 0.08, 0)), 0.005, 0.005, 4), Zt),
        ),
          e.push(
            B(
              new Tt(0.014, 0.02, 0.18, 5)
                .rotateX(0.3)
                .translate(d.x, d.y + 0.03, d.z),
              xt[3],
            ),
          ),
          e.push(
            B(
              new yt(0.02, 0.005, 4, 8)
                .rotateX(Math.PI / 2)
                .translate(d.x, d.y + 0.08, d.z - 0.01),
              Zt,
            ),
          ));
      }),
      e.push(_i(new y(0.3, s + 1.13, 0.305), t)),
      e.push(_i(new y(-0.22, s + 1.14, 0.305), t)),
      { geometry: ue(e), lift: s }
    );
  }
  function Uo(r) {
    const t = new We(1.52, 1, 14, 9),
      e = t.attributes.position;
    for (let h = 0; h < e.count; h += 1) {
      const l = e.getX(h) / 1.52 + 0.5,
        c = e.getY(h) + 0.5,
        u = rt.lerp(-0.53, 0.37, c),
        p =
          rt.lerp(1.5, 1.14, c) -
          Math.sin(l * Math.PI) * Math.sin(c * Math.PI) * 0.06 -
          Math.max(0, c - 0.92) * 0.3;
      e.setXYZ(h, e.getX(h) * (1 + Math.sin(c * 9) * 0.004), r + p + 0.012, u);
    }
    t.computeVertexNormals();
    const s = B(t, (h, l) => {
        const c =
            Math.sin(h.x * 7.3 + h.z * 3.1) * Math.sin(h.z * 5.7 - h.x * 2.2),
          u = Math.sin(h.x * 180) * Math.sin(h.z * 180) * 0.025;
        return l.copy(Oe).multiplyScalar(0.92 + c * 0.06 + u);
      }),
      n = new We(1.52, 0.08, 24, 1),
      i = n.attributes.position;
    for (let h = 0; h < i.count; h += 1) {
      const l = i.getX(h),
        c = i.getY(h) < 0,
        u = c ? Math.abs(Math.sin((l / 1.52 + 0.5) * Math.PI * 4)) * 0.025 : 0;
      i.setXYZ(h, l, r + (c ? 1.03 + u : 1.128), 0.37 + (c ? 0.02 : 0));
    }
    n.computeVertexNormals();
    const o = B(n, (h, l) =>
        l.copy(Oe).multiplyScalar(0.8 + Math.sin(h.x * 180) * 0.02),
      ),
      a = [];
    for (const h of [-0.5, 0.5]) {
      const l = [];
      for (let c = 0; c <= 20; c += 1) {
        const u = c / 20,
          p = h / 1.52 + 0.5,
          f =
            rt.lerp(1.5, 1.14, u) -
            Math.sin(p * Math.PI) * Math.sin(u * Math.PI) * 0.06 -
            Math.max(0, u - 0.92) * 0.3;
        l.push(
          new y(
            h * (1 + Math.sin(u * 9) * 0.004),
            r + f + 0.014,
            rt.lerp(-0.53, 0.37, u),
          ),
        );
      }
      a.push(
        B(
          new Dt(new Kt(l), 24, 0.0018, 4, !1),
          Oe.clone().multiplyScalar(0.72),
        ),
      );
    }
    for (let h = 0; h < 46; h += 1) {
      const l = -0.735 + h * 0.0325;
      a.push(
        B(
          lt(
            new y(l, r + 1.111, 0.375),
            new y(l + 0.011, r + 1.119, 0.374),
            0.0012,
            0.0012,
            4,
          ),
          Fo,
        ),
      );
    }
    return ue([s, o, ...a]);
  }
  function Xo({ position: r, facing: t, scale: e, amplitude: s }) {
    const [n, i, o] = r,
      a = Math.cos(t),
      h = Math.sin(t),
      c = Do((u, p) => hn(n + u * a + p * h, o - u * h + p * a, e, s) - i);
    return { store: c.geometry, lift: c.lift, canvas: Uo(c.lift) };
  }
  const Si = ["#aca590", "#a39e8e", "#b2aa96", "#9c998b", "#aaa18e"];
  function Zo(r) {
    const t = 8 + Math.floor(r() * 3),
      e = [];
    for (let a = 0; a < t; a++) e.push(0.84 + r() * 0.16);
    const s = e.map((a, h) => {
        const l = (h / t) * Math.PI * 2;
        return new E(Math.cos(l) * a, Math.sin(l) * a);
      }),
      n = new he(),
      i = s[0].clone().add(s.at(-1)).multiplyScalar(0.5);
    (n.moveTo(i.x, i.y),
      s.forEach((a, h) => {
        const l = s[(h + 1) % t];
        n.quadraticCurveTo(a.x, a.y, (a.x + l.x) / 2, (a.y + l.y) / 2);
      }),
      n.closePath());
    const o = new Ee(n, {
      depth: 0.07,
      bevelEnabled: !0,
      bevelThickness: 0.022,
      bevelSize: 0.045,
      bevelSegments: 2,
      steps: 1,
      curveSegments: 5,
    });
    return (o.rotateX(-Math.PI / 2), o);
  }
  function Vo({ terrainScale: r, terrainAmplitude: t }) {
    const e = en(15836759),
      s = Si.map(() => []);
    return (
      Co.forEach((n) => {
        const i = Math.floor(e() * Si.length),
          o = hn(n.x, n.z, r, t),
          a = Zo(e);
        (a.scale(n.radiusX, 0.7, n.radiusZ), a.rotateY(n.rotation));
        const h = a.attributes.position;
        for (let m = 0; m < h.count; m++) {
          const x = hn(n.x + h.getX(m), n.z + h.getZ(m), r, t);
          h.setY(m, h.getY(m) + x - o - 0.008);
        }
        (a.deleteAttribute("uv"), a.deleteAttribute("normal"));
        const l = Gr(a, 1e-4);
        (a.dispose(), l.computeVertexNormals());
        const c = l.toNonIndexed();
        l.dispose();
        const u = c.attributes.position.count;
        c.setAttribute("uv", new st(new Float32Array(u * 2), 2));
        const p = new Float32Array(u * 3),
          f = new Float32Array(u * 3),
          d = c.attributes.position;
        for (let m = 0; m < u; m++)
          ((p[m * 3] = d.getX(m)),
            (p[m * 3 + 1] = d.getY(m)),
            (p[m * 3 + 2] = d.getZ(m)),
            (f[m * 3] = n.x),
            (f[m * 3 + 1] = o),
            (f[m * 3 + 2] = n.z),
            d.setXYZ(m, d.getX(m) + n.x, d.getY(m) + o, d.getZ(m) + n.z));
        ((d.needsUpdate = !0),
          c.setAttribute("aStoneLocal", new st(p, 3)),
          c.setAttribute("aStoneCenter", new st(f, 3)),
          s[i].push(c));
      }),
      s.map((n) => {
        if (!n.length) return null;
        const i = n.length === 1 ? n[0] : Gs(n, !1);
        return (
          n.length > 1 && n.forEach((o) => o.dispose()),
          i.computeBoundingSphere(),
          (i.boundingSphere.radius += 0.3),
          i
        );
      })
    );
  }
  const Yo = {
    birds: () => {
      const r = {};
      return (
        to.forEach((t, e) => {
          r[t] = oo(t, e + 1);
        }),
        {
          species: Hr.map((t) => ({
            body: qr(t),
            head: $r(t),
            wing: Kr(t),
            feet: Qr(t),
          })),
          nests: r,
          building: ao(3),
        }
      );
    },
    pathStones: Vo,
    foodStore: Xo,
    feeder: () => po(),
  };
  function fn(r, t) {
    if (r != null && r.isBufferGeometry) {
      const e = {};
      for (const i in r.attributes) {
        const { array: o, itemSize: a, normalized: h } = r.attributes[i];
        ((e[i] = { array: o, itemSize: a, normalized: h }), t.add(o.buffer));
      }
      const s = r.index ? r.index.array : null;
      s && t.add(s.buffer);
      const n = r.boundingSphere;
      return {
        __geometry: !0,
        attributes: e,
        index: s,
        sphere: n ? [n.center.x, n.center.y, n.center.z, n.radius] : null,
      };
    }
    if (Array.isArray(r)) return r.map((e) => fn(e, t));
    if (r && typeof r == "object") {
      const e = {};
      for (const s in r) e[s] = fn(r[s], t);
      return e;
    }
    return r;
  }
  self.onmessage = ({ data: r }) => {
    try {
      const t = new Set(),
        e = fn(Yo[r.job](r.args), t);
      self.postMessage({ result: e }, [...t]);
    } catch (t) {
      self.postMessage({ error: String(t) });
    }
  };
})();
