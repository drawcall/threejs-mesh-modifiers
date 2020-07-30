import { VerletVertex } from "./VerletVertex";

export class VerletConnection {
  private _v1: VerletVertex;
  private _v2: VerletVertex;
  private _strictDistance: number;

  private _rigidity: number = 0.5;

  constructor(v1: VerletVertex, v2: VerletVertex, distance: number, rigidity: number = 0.5) {
    this._v1 = v1;
    this._v2 = v2;
    this._strictDistance = distance;
    this._rigidity = rigidity;
  }

  public get rigidity(): number {
    return this._rigidity;
  }

  public set rigidity(value: number) {
    this._rigidity = value;
  }

  public update(): void {
    let x1: number = this._v1.x,
      x2: number = this._v2.x,
      y1: number = this._v1.y,
      y2: number = this._v2.y,
      z1: number = this._v1.z,
      z2: number = this._v2.z,
      dirX: number = x2 - x1,
      dirY: number = y2 - y1,
      dirZ: number = z2 - z1;

    let dist: number = Math.sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ);
    let ratio: number, diffX: number, diffY: number, diffZ: number;

    if (dist == this._strictDistance) return;

    ratio = ((this._strictDistance - dist) / dist) * this._rigidity;

    diffX = ratio * dirX;
    diffY = ratio * dirY;
    diffZ = ratio * dirZ;

    if (!this._v1.mobileX || !this._v2.mobileX) diffX *= 2;
    if (!this._v1.mobileY || !this._v2.mobileY) diffY *= 2;
    if (!this._v1.mobileZ || !this._v2.mobileZ) diffZ *= 2;

    if (this._v1.mobileX) this._v1.x -= diffX;
    if (this._v1.mobileY) this._v1.y -= diffY;
    if (this._v1.mobileZ) this._v1.z -= diffZ;
    if (this._v2.mobileX) this._v2.x += diffX;
    if (this._v2.mobileY) this._v2.y += diffY;
    if (this._v2.mobileZ) this._v2.z += diffZ;
  }
}
