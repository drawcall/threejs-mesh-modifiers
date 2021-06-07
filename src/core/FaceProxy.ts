import { VertexProxy } from "./VertexProxy";

export class FaceProxy {
  private _vertices: any[];

  constructor() {
    this._vertices = [];
  }

  public get a(): any {
    return this._vertices[0];
  }

  public get b(): any {
    return this._vertices[1];
  }

  public get c(): any {
    return this._vertices[2];
  }

  public set a(val: any) {
    this._vertices[0] = val;
  }

  public set b(val: any) {
    this._vertices[1] = val;
  }

  public set c(val: any) {
    this._vertices[2] = val;
  }

  public addVertex(v: VertexProxy): void {
    this._vertices.push(v);
  }

  public addVertices(...rest: VertexProxy[]): void {
    for (let i = 0; i < rest.length; i++) {
      this.addVertex(rest[i]);
    }
  }

  public addABC(...rest: VertexProxy[]): void {
    for (let i = 0; i < rest.length; i++) {
      this.addVertex(rest[i]);
    }
  }

  public get vertices(): any[] {
    return this._vertices;
  }

  public toString(): string {
    let str = "";
    for (let i = 0; i < this._vertices.length; i++) {
      str += i + ":" + this._vertices[i] + " ";
    }
    return str;
  }
}
