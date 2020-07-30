import { IModifier } from "../IModifier";

import { Matrix4 } from "../math/Matrix4";
import { Vector3 } from "../math/Vector3";

import { MeshProxy } from "../core/MeshProxy";
import { Modifier } from "../core/Modifier";
import { VertexProxy } from "../core/VertexProxy";

export class Wheel extends Modifier implements IModifier {
  public speed: number;
  public turn: number;

  private roll: number;
  private _radius: number;

  public steerVector: Vector3 = new Vector3(0, 1, 0);
  public rollVector: Vector3 = new Vector3(0, 0, 1);

  constructor() {
    super();

    this.speed = 0;
    this.turn = 0;
    this.roll = 0;
  }

  public setModifiable(mod: MeshProxy): void {
    super.setModifiable(mod);
    this._radius = mod.width / 2;
  }

  public apply(): void {
    this.roll += this.speed;

    let vs: any[] = this.mod.getVertices();
    let vc: number = vs.length;

    let ms: Matrix4;
    let mt: Matrix4;
    if (this.turn != 0) {
      mt = Matrix4.rotationMatrix(this.steerVector.x, this.steerVector.y, this.steerVector.z, this.turn);
      let rv: Vector3 = this.rollVector.clone();
      Matrix4.multiplyVector(mt, rv);
      ms = Matrix4.rotationMatrix(rv.x, rv.y, rv.z, this.roll);
    } else {
      ms = Matrix4.rotationMatrix(this.rollVector.x, this.rollVector.y, this.rollVector.z, this.roll);
    }

    for (let i: number = 0; i < vc; i++) {
      let v: VertexProxy = <VertexProxy>vs[i];
      let c: Vector3 = v.vector.clone();
      if (this.turn != 0) Matrix4.multiplyVector(mt, c);
      Matrix4.multiplyVector(ms, c);
      v.x = c.x;
      v.y = c.y;
      v.z = c.z;
    }
  }

  public get step(): number {
    return (this._radius * this.speed) / Math.PI;
  }

  public get perimeter(): number {
    return this._radius * 2 * Math.PI;
  }

  public get radius(): number {
    return this._radius;
  }
}
