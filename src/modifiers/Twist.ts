import { IModifier } from "../IModifier";

import { Matrix4 } from "../math/Matrix4";
import { Vector3 } from "../math/Vector3";

import { MeshProxy } from "../core/MeshProxy";
import { Modifier } from "../core/Modifier";
import { VertexProxy } from "../core/VertexProxy";

export class Twist extends Modifier implements IModifier {
  private _vector: Vector3 = new Vector3(0, 1, 0);
  private _angle: number;
  public center: Vector3 = Vector3.ZERO;

  constructor(a: number = 0) {
    super();
    this._angle = a;
  }

  public get angle(): number {
    return this._angle;
  }

  public set angle(value: number) {
    this._angle = value;
  }

  public get vector(): Vector3 {
    return this._vector;
  }

  public set vector(value: Vector3) {
    this._vector = value;
  }

  public apply(): void {
    this._vector.normalize();

    let dv: Vector3 = new Vector3(this.mod.maxX / 2, this.mod.maxY / 2, this.mod.maxZ / 2);
    let d: number = -Vector3.dot(this._vector, this.center);

    for (let i: number = 0; i < this.mod.getVertices().length; i++) {
      let vertex: VertexProxy = this.mod.getVertices()[i];
      let dd: number = Vector3.dot(new Vector3(vertex.x, vertex.y, vertex.z), this._vector) + d;
      this.twistPoint(vertex, (dd / dv.magnitude) * this._angle);
    }
  }

  private twistPoint(v: VertexProxy, a: number): void {
    let mat: Matrix4 = Matrix4.translationMatrix(v.x, v.y, v.z);
    mat = Matrix4.multiply(Matrix4.rotationMatrix(this._vector.x, this._vector.y, this._vector.z, a), mat);
    v.x = mat.n14;
    v.y = mat.n24;
    v.z = mat.n34;
  }
}
