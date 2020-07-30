import { Vector3 } from "../math/Vector3";
import { ModConstant } from "../util/ModConstant";

export class VertexProxy {
  private _ratioX: number;
  private _ratioY: number;
  private _ratioZ: number;

  protected ox: number;
  protected oy: number;
  protected oz: number;

  constructor() {}

  public setVertex(vertex: any): void {}

  public setRatios(rx: number, ry: number, rz: number): void {
    this._ratioX = rx;
    this._ratioY = ry;
    this._ratioZ = rz;
  }

  public setOriginalPosition(ox: number, oy: number, oz: number): void {
    this.ox = ox;
    this.oy = oy;
    this.oz = oz;
  }

  public get x(): number {
    return 0;
  }

  public get y(): number {
    return 0;
  }

  public get z(): number {
    return 0;
  }

  public set x(v: number) {}

  public set y(v: number) {}

  public set z(v: number) {}

  public getValue(axis: number): number {
    switch (axis) {
      case ModConstant.X:
        return this.x;
      case ModConstant.Y:
        return this.y;
      case ModConstant.Z:
        return this.z;
    }

    return 0;
  }

  public setValue(axis: number, v: number): void {
    switch (axis) {
      case ModConstant.X:
        this.x = v;
        break;

      case ModConstant.Y:
        this.y = v;
        break;

      case ModConstant.Z:
        this.z = v;
        break;
    }
  }

  public get ratioX(): number {
    return this._ratioX;
  }

  public get ratioY(): number {
    return this._ratioY;
  }

  public get ratioZ(): number {
    return this._ratioZ;
  }

  public getRatio(axis: number): number {
    switch (axis) {
      case ModConstant.X:
        return this._ratioX;
      case ModConstant.Y:
        return this._ratioY;
      case ModConstant.Z:
        return this._ratioZ;
    }
    return -1;
  }

  public get originalX(): number {
    return this.ox;
  }

  public get originalY(): number {
    return this.oy;
  }

  public get originalZ(): number {
    return this.oz;
  }

  public getOriginalValue(axis: number): number {
    switch (axis) {
      case ModConstant.X:
        return this.ox;
      case ModConstant.Y:
        return this.oy;
      case ModConstant.Z:
        return this.oz;
    }
    return 0;
  }

  public reset(): void {
    this.x = this.ox;
    this.y = this.oy;
    this.z = this.oz;
  }

  public collapse(): void {
    this.ox = this.x;
    this.oy = this.y;
    this.oz = this.z;
  }

  public get vector(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  public set vector(v: Vector3) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
  }

  public get ratioVector(): Vector3 {
    return new Vector3(this.ratioX, this.ratioY, this.ratioZ);
  }
}
