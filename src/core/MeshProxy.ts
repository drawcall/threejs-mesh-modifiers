import { Vector3 } from "../math/Vector3";
import { VertexProxy } from "./VertexProxy";
import { ModConstant } from "../util/ModConstant";

export class MeshProxy {
  protected vertices: any[];
  protected faces: any[];

  protected _maxX: number;
  protected _maxY: number;
  protected _maxZ: number;

  protected _minX: number;
  protected _minY: number;
  protected _minZ: number;

  protected _maxAxis: number;
  protected _midAxis: number;
  protected _minAxis: number;

  protected _width: number;
  protected _height: number;
  protected _depth: number;

  public boundUpdate: boolean = false;
  public indexUpdate: boolean = false;
  public uvsAndColorUpdate: boolean = false;

  constructor() {
    this.vertices = [];
    this.faces = [];
  }

  public setMesh(mesh: any): void {}

  public updateMeshPosition(p: Vector3): void {}

  public getVertices(): any[] {
    return this.vertices;
  }

  public getFaces(): any[] {
    return this.faces;
  }

  public analyzeGeometry(): void {
    let vertices: number = this.getVertices().length;
    let v: VertexProxy;

    for (let i = 0; i < vertices; i++) {
      v = <VertexProxy>this.getVertices()[i];

      if (i == 0) {
        this._minX = this._maxX = v.x;
        this._minY = this._maxY = v.y;
        this._minZ = this._maxZ = v.z;
      } else {
        this._minX = Math.min(this._minX, v.x);
        this._minY = Math.min(this._minY, v.y);
        this._minZ = Math.min(this._minZ, v.z);

        this._maxX = Math.max(this._maxX, v.x);
        this._maxY = Math.max(this._maxY, v.y);
        this._maxZ = Math.max(this._maxZ, v.z);
      }

      v.setOriginalPosition(v.x, v.y, v.z);
    }

    this._width = this._maxX - this._minX;
    this._height = this._maxY - this._minY;
    this._depth = this._maxZ - this._minZ;

    let maxe: number = Math.max(this._width, Math.max(this._height, this._depth));
    let mine: number = Math.min(this._width, Math.min(this._height, this._depth));

    if (maxe == this._width && mine == this._height) {
      this._minAxis = ModConstant.Y;
      this._midAxis = ModConstant.Z;
      this._maxAxis = ModConstant.X;
    } else if (maxe == this._width && mine == this._depth) {
      this._minAxis = ModConstant.Z;
      this._midAxis = ModConstant.Y;
      this._maxAxis = ModConstant.X;
    } else if (maxe == this._height && mine == this._width) {
      this._minAxis = ModConstant.X;
      this._midAxis = ModConstant.Z;
      this._maxAxis = ModConstant.Y;
    } else if (maxe == this._height && mine == this._depth) {
      this._minAxis = ModConstant.Z;
      this._midAxis = ModConstant.X;
      this._maxAxis = ModConstant.Y;
    } else if (maxe == this._depth && mine == this._width) {
      this._minAxis = ModConstant.X;
      this._midAxis = ModConstant.Y;
      this._maxAxis = ModConstant.Z;
    } else if (maxe == this._depth && mine == this._height) {
      this._minAxis = ModConstant.Y;
      this._midAxis = ModConstant.X;
      this._maxAxis = ModConstant.Z;
    }

    for (let i = 0; i < vertices; i++) {
      v = <VertexProxy>this.getVertices()[i];
      v.setRatios(
        (v.x - this._minX) / this._width,
        (v.y - this._minY) / this._height,
        (v.z - this._minZ) / this._depth
      );
    }
  }

  public resetGeometry(): void {
    let vertices: number = this.getVertices().length;
    for (let i: number = 0; i < vertices; i++) {
      let v: VertexProxy = <VertexProxy>this.getVertices()[i];
      v.reset();
    }
  }

  public collapseGeometry(): void {
    let vertices: number = this.getVertices().length;
    for (let i: number = 0; i < vertices; i++) {
      let v: VertexProxy = <VertexProxy>this.getVertices()[i];
      v.collapse();
    }
    this.analyzeGeometry();
  }

  public get minX(): number {
    return this._minX;
  }

  public get minY(): number {
    return this._minY;
  }

  public get minZ(): number {
    return this._minZ;
  }

  public getMin(axis: number): number {
    switch (axis) {
      case ModConstant.X:
        return this._minX;
      case ModConstant.Y:
        return this._minY;
      case ModConstant.Z:
        return this._minZ;
    }

    return -1;
  }

  public get maxX(): number {
    return this._maxX;
  }

  public get maxY(): number {
    return this._maxY;
  }

  public get maxZ(): number {
    return this._maxZ;
  }

  public getMax(axis: number): number {
    switch (axis) {
      case ModConstant.X:
        return this._maxX;
      case ModConstant.Y:
        return this._maxY;
      case ModConstant.Z:
        return this._maxZ;
    }
    return -1;
  }

  public get maxAxis(): number {
    return this._maxAxis;
  }

  public get midAxis(): number {
    return this._midAxis;
  }

  public get minAxis(): number {
    return this._minAxis;
  }

  public getSize(axis: number): number {
    switch (axis) {
      case ModConstant.X:
        return this._width;
      case ModConstant.Y:
        return this._height;
      case ModConstant.Z:
        return this._depth;
    }
    return -1;
  }

  public get width(): number {
    return this._width;
  }

  public get height(): number {
    return this._height;
  }

  public get depth(): number {
    return this._depth;
  }

  public postApply(): void {}

  public destroy(): void {
    this.vertices.length = 0;
    this.faces.length = 0;
  }
}
