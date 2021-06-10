import { IModifier } from "../core/IModifier";
import { ModConstant } from "../util/ModConstant";

import { Range } from "../math/Range";
import { TMath } from "../math/TMath";
import { Vector3 } from "../math/Vector3";
import { Matrix4 } from "../math/Matrix4";
import { Modifier } from "../core/Modifier";
import { VertexProxy } from "../core/VertexProxy";

export class Break extends Modifier implements IModifier {
  private bv: Vector3 = new Vector3(0, 1, 0);
  public _offset: number;
  public angle: number;

  public range: Range = new Range(0, 1);

  constructor(o: number = 0, a: number = 0) {
    super();
    this.angle = a;
    this._offset = o;
  }

  public apply(): void {
    let vs: any[] = this.mod.getVertices();
    let vc: number = vs.length;

    let pv: Vector3 = new Vector3(0, 0, -(this.mod.minZ + this.mod.depth * this.offset));

    for (let i: number = 0; i < vc; i++) {
      let v: VertexProxy = <VertexProxy>vs[i];
      let c: Vector3 = v.vector;
      c = c.add(pv);

      if (c.z >= 0 && this.range.isIn(v.ratioY)) {
        let ta: number = this.angle;

        let rm: Matrix4 = Matrix4.rotationMatrix(this.bv.x, this.bv.y, this.bv.z, ta);
        Matrix4.multiplyVector(rm, c);
      }

      let npv: Vector3 = pv.negate();
      c = c.add(npv);

      v.x = c.x;
      v.y = c.y;
      v.z = c.z;
    }
  }

  public get offset(): number {
    return this._offset;
  }

  public set offset(offset: number) {
    this._offset = offset;
  }
}
