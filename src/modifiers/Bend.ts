import { IModifier } from "../core/IModifier";
import { ModConstant } from "../util/ModConstant";

import { Modifier } from "../core/Modifier";
import { MeshProxy } from "../core/MeshProxy";
import { VertexProxy } from "../core/VertexProxy";

import { Vector2 } from "../math/Vector2";
import { Matrix } from "../math/Matrix";

export class Bend extends Modifier implements IModifier {
  private _force: number;
  private _offset: number;
  private _angle: number;
  private _diagAngle: number;
  private _constraint: number = ModConstant.NONE;

  private max: number;
  private min: number;
  private mid: number;
  private width: number;
  private height: number;
  private origin: number;
  private m1: Matrix;
  private m2: Matrix;

  public switchAxes: boolean = false;

  constructor(f: number = 0, o: number = 0.5, a: number = 0) {
    super();
    this._force = f;
    this._offset = o;
    this.angle = a;
  }

  public setModifiable(mod: MeshProxy): void {
    super.setModifiable(mod);
    this.max = this.switchAxes ? mod.midAxis : mod.maxAxis;
    this.min = mod.minAxis;
    this.mid = this.switchAxes ? mod.maxAxis : mod.midAxis;

    this.width = mod.getSize(this.max);
    this.height = mod.getSize(this.mid);
    this.origin = mod.getMin(this.max);

    this._diagAngle = Math.atan(this.width / this.height);
  }

  public set force(f: number) {
    this._force = f;
  }
  public get force(): number {
    return this._force;
  }

  public set constraint(c: number) {
    this._constraint = c;
  }
  public get constraint(): number {
    return this._constraint;
  }

  public get offset(): number {
    return this._offset;
  }
  public set offset(offset: number) {
    this._offset = offset;
  }

  public get diagAngle(): number {
    return this._diagAngle;
  }

  public get angle(): number {
    return this._angle;
  }
  public set angle(a: number) {
    this._angle = a;
    this.m1 = new Matrix(1, 0, 0, 1);
    this.m1.rotate(this._angle);
    this.m2 = new Matrix(1, 0, 0, 1);
    this.m2.rotate(-this._angle);
  }

  public apply(): void {
    if (this.force == 0) return;

    let vs: any[] = this.mod.getVertices();
    let vc: number = vs.length;

    let distance: number = this.origin + this.width * this.offset;
    let radius: number = this.width / Math.PI / this.force;
    let bendAngle: number = Math.PI * 2 * (this.width / (radius * Math.PI * 2));

    for (let i: number = 0; i < vc; i++) {
      let v: VertexProxy = <VertexProxy>vs[i];

      let vmax: number = v.getValue(this.max);
      let vmid: number = v.getValue(this.mid);
      let vmin: number = v.getValue(this.min);

      let np: Vector2 = this.m1.transformPoint(new Vector2(vmax, vmid));
      vmax = np.x;
      vmid = np.y;

      let p: number = (vmax - this.origin) / this.width;

      if (
        (this.constraint == ModConstant.LEFT && p <= this.offset) ||
        (this.constraint == ModConstant.RIGHT && p >= this.offset)
      ) {
      } else {
        let fa: number = Math.PI / 2 - bendAngle * this.offset + bendAngle * p;
        let op: number = Math.sin(fa) * (radius + vmin);
        let ow: number = Math.cos(fa) * (radius + vmin);
        vmin = op - radius;
        vmax = distance - ow;
      }

      let np2: Vector2 = this.m2.transformPoint(new Vector2(vmax, vmid));
      vmax = np2.x;
      vmid = np2.y;

      v.setValue(this.max, vmax);
      v.setValue(this.mid, vmid);
      v.setValue(this.min, vmin);
    }
  }
}
