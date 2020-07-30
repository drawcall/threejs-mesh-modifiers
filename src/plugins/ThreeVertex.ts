import { IVector3 } from "./IVector3";
import { VertexProxy } from "../core/VertexProxy";

export class ThreeVertex extends VertexProxy {
  private vertor: IVector3;

  constructor() {
    super();
  }

  public setVertex(vertor: any): void {
    this.vertor = <IVector3>vertor;
    this.ox = this.vertor.x;
    this.oy = this.vertor.y;
    this.oz = this.vertor.z;
  }

  public get x(): number {
    return this.vertor.x;
  }

  public get y(): number {
    return this.vertor.y;
  }

  public get z(): number {
    return this.vertor.z;
  }

  public set x(v: number) {
    this.vertor.x = v;
  }

  public set y(v: number) {
    this.vertor.y = v;
  }

  public set z(v: number) {
    this.vertor.z = v;
  }
}
