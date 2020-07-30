import { IModifier } from "../IModifier";

import { Matrix4 } from "../math/Matrix4";
import { Vector3 } from "../math/Vector3";

import { MeshProxy } from "../core/MeshProxy";
import { Modifier } from "../core/Modifier";
import { VertexProxy } from "../core/VertexProxy";
import { Log } from "../util/Log";

export class Taper extends Modifier implements IModifier {
  private frc: number;
  private pow: number;

  private start: number = 0;
  private end: number = 1;

  private _vector: Vector3 = new Vector3(1, 0, 1);
  private _vector2: Vector3 = new Vector3(0, 1, 0);

  constructor(f: number) {
    super();

    this.frc = f;
    this.pow = 1;
  }

  public setFalloff(start: number = 0, end: number = 1): void {
    this.start = start;
    this.end = end;
  }

  public set force(value: number) {
    this.frc = value;
  }

  public get force(): number {
    return this.frc;
  }

  public get power(): number {
    return this.pow;
  }

  public set power(value: number) {
    this.pow = value;
  }

  public apply(): void {
    let vertices: any[] = this.mod.getVertices();
    let verticesLength: number = vertices.length;

    for (let i: number = 0; i < verticesLength; i++) {
      let v: VertexProxy = <VertexProxy>vertices[i];

      let ar: Vector3 = v.ratioVector.multiply(this._vector2);
      let sc: number = this.frc * Math.pow(ar.magnitude, this.pow);

      let m: Matrix4 = Matrix4.scaleMatrix(1 + sc * this._vector.x, 1 + sc * this._vector.y, 1 + sc * this._vector.z);
      let n: Vector3 = v.vector;

      Matrix4.multiplyVector(m, n);
      v.vector = n;
    }
  }
}
