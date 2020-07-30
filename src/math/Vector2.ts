export class Vector2 {
  public x: number;
  public y: number;

  public static ZERO: Vector2 = new Vector2(0, 0);

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  public equals(v: Vector2): boolean {
    return this.x == v.x && this.y == v.y;
  }

  public zero(): void {
    this.x = this.y;
  }

  public negate(): Vector2 {
    return new Vector2(-this.x, -this.y);
  }

  public add(v: Vector2): Vector2 {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  public subtract(v: Vector2): Vector2 {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

  public multiplyScalar(s: number): Vector2 {
    return new Vector2(this.x * s, this.y * s);
  }

  public multiply(v: Vector2): Vector2 {
    return new Vector2(this.x * v.x, this.y * v.y);
  }

  public divide(s: number): Vector2 {
    let os: number = 1 / s;
    return new Vector2(this.x * os, this.y * os);
  }

  public normalize(): void {
    let m: number = this.x * this.x + this.y * this.y;
    if (m > 0) {
      let n: number = 1 / Math.sqrt(m);
      this.x *= n;
      this.y *= n;
    }
  }

  public get magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public set magnitude(m: number) {
    this.normalize();
    this.x *= m;
    this.y *= m;
  }

  public toString(): string {
    return "[" + this.x + " , " + this.y + "]";
  }

  public static sum(a: Vector2, b: Vector2): Vector2 {
    return a.add(b);
  }

  public static dot(a: Vector2, b: Vector2): number {
    return a.x * b.x + a.y * b.y;
  }

  public static distance(a: Vector2, b: Vector2): number {
    let dx: number = a.x - b.x;
    let dy: number = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
