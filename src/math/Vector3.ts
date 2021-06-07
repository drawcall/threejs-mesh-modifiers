export class Vector3 {
  public x: number;
  public y: number;
  public z: number;

  public static ZERO: Vector3 = new Vector3(0, 0, 0);

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   *  Member functions
   */
  public clone(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  public equals(v: Vector3): boolean {
    return this.x == v.x && this.y == v.y && this.z == v.z;
  }

  public zero(): void {
    this.x = this.y = this.z = 0;
  }

  public negate(): Vector3 {
    return new Vector3(-this.x, -this.y, -this.z);
  }

  public add(v: Vector3): Vector3 {
    return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  public subtract(v: Vector3): Vector3 {
    return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  public multiplyScalar(s: number): Vector3 {
    return new Vector3(this.x * s, this.y * s, this.z * s);
  }

  public multiply(v: Vector3): Vector3 {
    return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z);
  }

  public divide(s: number): Vector3 {
    let os: number = 1 / s;
    return new Vector3(this.x * os, this.y * os, this.z * os);
  }

  public normalize(): void {
    let m: number = this.x * this.x + this.y * this.y + this.z * this.z;
    if (m > 0) {
      let n: number = 1 / Math.sqrt(m);
      this.x *= n;
      this.y *= n;
      this.z *= n;
    }
  }

  public get magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  public set magnitude(m: number) {
    this.normalize();
    this.x *= m;
    this.y *= m;
    this.z *= m;
  }

  public fromBufferAttribute(attribute: any, index: number): Vector3 {
    this.x = attribute.getX(index);
    this.y = attribute.getY(index);
    this.z = attribute.getZ(index);
    return this;
  }

  public toString(): string {
    return "[" + this.x + " , " + this.y + " , " + this.z + "]";
  }

  /**
   *  Static functions
   */
  public static sum(a: Vector3, b: Vector3): Vector3 {
    return a.add(b);
  }

  public static dot(a: Vector3, b: Vector3): number {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }

  public static cross(a: Vector3, b: Vector3): Vector3 {
    return new Vector3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
  }

  public static distance(a: Vector3, b: Vector3): number {
    let dx: number = a.x - b.x;
    let dy: number = a.y - b.y;
    let dz: number = a.z - b.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }
}
