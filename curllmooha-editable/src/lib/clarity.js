/**
 * Clarity 统计封装 —— 由线上 bundle（index-ghQi_28l.js）反编译整理
 * Microsoft Clarity 的最小封装（init/setTag/identify/event）。
 * 说明：变量/函数名仍是压缩后的短名；三方库请从 ../vendor/*.js 引入。
 */
function s(t) {
  try {
    (function (e, r, n, c, o, i, a) {
      r.getElementById("clarity-script") ||
        ((e[n] =
          e[n] ||
          function () {
            (e[n].q = e[n].q || []).push(arguments);
          }),
        (i = r.createElement(c)),
        (i.async = 1),
        (i.src = "https://www.clarity.ms/tag/" + o + "?ref=npm"),
        (i.id = "clarity-script"),
        (a = r.getElementsByTagName(c)[0]),
        a.parentNode.insertBefore(i, a));
    })(window, document, "clarity", "script", t);
    return;
  } catch {
    return;
  }
}
const d = {
  init(t) {
    s(t);
  },
  setTag(t, e) {
    window.clarity("set", t, e);
  },
  identify(t, e, r, n) {
    window.clarity("identify", t, e, r, n);
  },
  consent(t = !0) {
    window.clarity("consent", t);
  },
  consentV2(
    t = {
      ad_Storage: "granted",
      analytics_Storage: "granted",
    },
  ) {
    window.clarity("consentv2", t);
  },
  upgrade(t) {
    window.clarity("upgrade", t);
  },
  event(t) {
    window.clarity("event", t);
  },
};
export { d as default };
