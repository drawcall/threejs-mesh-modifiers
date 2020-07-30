import { IModifier } from "../IModifier";
import { ModConstant } from "../util/ModConstant";

import { Vector3 } from "../math/Vector3";

import { MeshProxy } from "../core/MeshProxy";
import { Modifier } from "../core/Modifier";
import { VertexProxy } from "../core/VertexProxy";

export class Noise extends Modifier implements IModifier {
  private frc: number;
  private axc: number = ModConstant.NONE;

  private start: number = 0;
  private end: number = 0;

  constructor(f: number = 0) {
    super();
    this.frc = f;
  }

  public set force(f: number) {
    this.frc = f;
  }

  public get force(): number {
    return this.frc;
  }

  public constraintAxes(c: number): void {
    this.axc = c;
  }

  public setFalloff(start: number = 0, end: number = 1): void {
    this.start = start;
    this.end = end;
  }

  public apply(): void {
    let vs: any[] = this.mod.getVertices();
    let vc: number = vs.length;

    for (let i: number = 0; i < vc; i++) {
      let v: VertexProxy = <VertexProxy>vs[i];
      let r: number = Math.random() * this.force - this.force / 2;

      let p: number = v.getRatio(this.mod.maxAxis);
      if (this.start < this.end) {
        if (p < this.start) p = 0;
        if (p > this.end) p = 1;
      } else if (this.start > this.end) {
        p = 1 - p;
        if (p > this.start) p = 0;
        if (p < this.end) p = 1;
      } else {
        p = 1;
      }

      if (!(this.axc & 1)) v.x += r * p;
      if (!((this.axc >> 1) & 1)) v.y += r * p;
      if (!((this.axc >> 2) & 1)) v.z += r * p;
    }
  }
}
