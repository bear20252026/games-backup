/**
 * 常春藤叶片 —— 由线上 bundle（ivyLeaf-CE3lyIS1.js）反编译整理
 * 叶片几何、材质与摆动。
 * 说明：变量/函数名仍是压缩后的短名；三方库请从 ../vendor/*.js 引入。
 */
import {
  Color,
  ShapeGeometry,
  Shape,
  BufferAttribute,
} from "../vendor/three.js";
const y = "#5a4a2c",
  u = ["#3b6427", "#4a772e", "#5a8a35", "#6c9b3d"].map((t) => new Color(t)),
  S = 0.78,
  n = new Shape();
n.moveTo(0, 0.1);
n.bezierCurveTo(-0.22, -0.1, -0.64, 0.02, -0.56, 0.38);
n.bezierCurveTo(-0.48, 0.68, -0.18, 0.86, 0, 1);
n.bezierCurveTo(0.18, 0.86, 0.48, 0.68, 0.56, 0.38);
n.bezierCurveTo(0.64, 0.02, 0.22, -0.1, 0, 0.1);
function h(t = new Color(1, 1, 1)) {
  const o = new ShapeGeometry(n, 4),
    e = o.attributes.position,
    a = new Float32Array(e.count * 3),
    s = new Color();
  for (let r = 0; r < e.count; r++) {
    const m = e.getX(r),
      c = e.getY(r);
    (e.setZ(r, Math.abs(m) * 0.24 - c * c * 0.16),
      s.copy(t).multiplyScalar(0.78 + Math.min(1, c) * 0.26),
      s.toArray(a, r * 3));
  }
  return (
    o.setAttribute("color", new BufferAttribute(a, 3)),
    o.computeVertexNormals(),
    o
  );
}
function v(t, o) {
  const e = (s) => (t() - 0.5) * s,
    a = Math.min(u.length - 1, Math.floor(t() * 2.2 + o * 2));
  return u[a].clone().offsetHSL(e(0.02), e(0.08), e(0.05));
}
export { S as I, y as a, h as m, v as p };
