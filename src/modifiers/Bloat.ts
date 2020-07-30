import { IModifier } from "../IModifier";
import { Vector3 } from "../math/Vector3";
import { Modifier } from "../core/Modifier";
import { VertexProxy } from "../core/VertexProxy";

export class Bloat extends Modifier implements IModifier {
  /** CENTER **/
  private _center: Vector3 = Vector3.ZERO;

  public get center(): Vector3 {
    return this._center;
  }

  public set center(v: Vector3) {
    this._center = v;
  }

  /** RADIUS **/
  private _r: number = 0;

  public get radius(): number {
    return this._r;
  }

  public set radius(v: number) {
    this._r = Math.max(0, v);
  }

  /** A **/
  private _a: number = 0.01;
  public get a(): number {
    return this._a;
  }

  public set a(v: number) {
    this._a = Math.max(0, v);
  }

  private _u: Vector3 = Vector3.ZERO;

  public apply(): void {
    let vs: any[] = this.mod.getVertices();

    for (let vi of vs) {
      let v: VertexProxy = <VertexProxy>vi;

      this._u.x = v.x - this._center.x;
      this._u.y = v.y - this._center.y;
      this._u.z = v.z - this._center.z;

      // change norm to norm + r * exp (-a * norm)
      this._u.magnitude += this._r * Math.exp(-this._u.magnitude * this._a);

      // move vertex accordingly
      v.x = this._u.x + this._center.x;
      v.y = this._u.y + this._center.y;
      v.z = this._u.z + this._center.z;
    }
  }
}
