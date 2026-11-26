/**
 * 图片解码缓存 —— 由线上 bundle（decodedImages-C_X7Q7ja.js）反编译整理
 * 把贴图预解码为 ImageBitmap，避免运行期卡顿。
 * 说明：变量/函数名仍是压缩后的短名；三方库请从 ../vendor/*.js 引入。
 */
import { Y as u, Z as m } from "../main.js";
import {
  ab as o,
  Texture,
  ImageBitmapLoader,
  bv as f,
} from "../vendor/three.js";
class d extends f {
  load(n, t, a, s) {
    return super.load(
      n,
      (e) => {
        const l = () => (t == null ? void 0 : t(e));
        typeof e.decode == "function" ? e.decode().then(l, l) : l();
      },
      a,
      s,
    );
  }
}
class I extends o {
  load(n, t, a, s) {
    if (typeof createImageBitmap != "function")
      return new d(this.manager).load(n, t, a, s);
    const e = new ImageBitmapLoader(this.manager);
    return (
      e.setOptions({
        imageOrientation: "none",
        premultiplyAlpha: "none",
      }),
      e.setCrossOrigin(this.crossOrigin),
      e.setPath(this.path),
      e.load(n, t, a, s)
    );
  }
}
class b extends o {
  load(n, t, a, s) {
    const e = new Texture(),
      l = new d(this.manager);
    return (
      l.setCrossOrigin(this.crossOrigin),
      l.setPath(this.path),
      l.load(
        n,
        (c) => {
          ((e.image = c), (e.needsUpdate = !0), t == null || t(e));
        },
        a,
        s,
      ),
      e
    );
  }
}
const r = (i) =>
    globalThis.requestIdleCallback
      ? globalThis.requestIdleCallback(i, {
          timeout: 1e3,
        })
      : window.setTimeout(
          () =>
            i({
              timeRemaining: () => 8,
              didTimeout: !0,
            }),
          32,
        ),
  p = (i) =>
    globalThis.cancelIdleCallback
      ? globalThis.cancelIdleCallback(i)
      : window.clearTimeout(i);
function w(i, n) {
  const t = n.filter(Boolean);
  let a = 0,
    s = !1;
  const e = (l) => {
    if (!s) {
      if (u()) {
        m().then(() => {
          s || (a = r(e));
        });
        return;
      }
      (t.length &&
        (l.didTimeout || l.timeRemaining() > 6) &&
        i.initTexture(t.shift()),
        t.length && (a = r(e)));
    }
  };
  return (
    (a = r(e)),
    () => {
      ((s = !0), p(a));
    }
  );
}
export { I as D, b as a, w as u };
