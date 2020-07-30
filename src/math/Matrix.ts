import { Vector2 } from "./Vector2";

export class Matrix {
  constructor(m11: number, m12: number, m21: number, m22: number) {
    this.m = [m11, m12, m21, m22];
  }

  m: number[];

  dispose() {
    this.m.length = 0;
    return this;
  }

  reset() {
    this.m[0] = 1;
    this.m[1] = 0;
    this.m[2] = 0;
    this.m[3] = 1;
    return this;
  }

  rotate(angle: number) {
    let c = Math.cos(angle);
    let s = Math.sin(angle);

    this.m[0] = c;
    this.m[1] = -s;
    this.m[2] = s;
    this.m[3] = c;
    return this;
  }

  scale(sx?: number, sy?: number) {
    this.m[0] = 1;
    this.m[1] = 0;
    this.m[2] = 0;
    this.m[3] = 1;

    if (sx !== undefined) {
      this.m[0] = sx;
      this.m[3] = sx;
    }
    if (sy !== undefined) {
      this.m[3] = sy;
    }
    return this;
  }

  multiply(b: Matrix) {
    return Matrix.mult(this, b);
  }

  transformPoint(p: Vector2) {
    let xy = Matrix.transform(this, [p.x, p.y]);
    return new Vector2(xy[0], xy[1]);
  }

  transformPointSelf(p: Vector2) {
    let xy = Matrix.transform(this, [p.x, p.y]);
    p.x = xy[0];
    p.y = xy[1];
    return p;
  }

  clone() {
    let m = this.m;
    return new Matrix(m[0], m[1], m[2], m[3]);
  }

  static transform(m2: Matrix, xy: any[]) {
    let m = m2.m,
      x = xy[0],
      y = xy[1];
    xy[0] = m[0] * x + m[1] * y;
    xy[1] = m[2] * x + m[3] * y;
    return xy;
  }

  static mult(m1: Matrix, m2: Matrix) {
    let a = m1.m,
      b = m2.m,
      a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];

    a[0] = a0 * b[0] + a1 * b[2];
    a[1] = a0 * b[1] + a1 * b[3];
    a[2] = a2 * b[0] + a3 * b[2];
    a[3] = a2 * b[1] + a3 * b[3];
    
    return m1;
  }
}
