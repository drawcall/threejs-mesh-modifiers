import { IModifier } from "../core/IModifier";

import { ModConstant } from "../util/ModConstant";
import { Dictionary } from "../util/Dictionary";
import { Matrix4 } from "../math/Matrix4";

import { FaceProxy } from "../core/FaceProxy";
import { MeshProxy } from "../core/MeshProxy";
import { Modifier } from "../core/Modifier";
import { VerletConnection } from "../core/verlet/VerletConnection";
import { VerletVertex } from "../core/verlet/VerletVertex";
import { VertexProxy } from "../core/VertexProxy";

export class Cloth extends Modifier implements IModifier {
  private _vertices: any[];
  private _connections: any[];

  private _forceX: number = 0;
  private _forceY: number = 0;
  private _forceZ: number = 0;

  private _rigidity: number;
  private _friction: number;

  private _dic: Dictionary;

  private _useBounds: boolean;
  private _boundsMinX: number;
  private _boundsMaxX: number;
  private _boundsMinY: number;
  private _boundsMaxY: number;
  private _boundsMinZ: number;
  private _boundsMaxZ: number;

  constructor(rigidity: number = 1, friction: number = 0) {
    super();

    this._dic = new Dictionary();
    this._rigidity = rigidity;
    this.friction = friction;
  }

  public setBounds(
    minX: number = Number.NEGATIVE_INFINITY,
    maxX: number = Number.POSITIVE_INFINITY,
    minY: number = Number.NEGATIVE_INFINITY,
    maxY: number = Number.POSITIVE_INFINITY,
    minZ: number = Number.NEGATIVE_INFINITY,
    maxZ: number = Number.POSITIVE_INFINITY
  ): void {
    this._useBounds = true;
    this._boundsMinX = minX;
    this._boundsMaxX = maxX;
    this._boundsMinY = minY;
    this._boundsMaxY = maxY;
    this._boundsMinZ = minZ;
    this._boundsMaxZ = maxZ;
  }

  public clearBounds(): void {
    this._useBounds = false;
  }

  public get verletVertices(): any[] {
    return this._vertices;
  }

  public get friction(): number {
    return (this._friction - 1) * 100;
  }

  public set friction(value: number) {
    if (value < 0) value = 0;

    this._friction = value / 100 + 1;
  }

  public get rigidity(): number {
    return this._rigidity;
  }

  public set rigidity(value: number) {
    let half: number;
    let i: number = this._connections.length;
    let c: VerletConnection;

    if (value > 1) value = 1;
    else if (value < 0) value = 0;

    this._rigidity = value;
    half = value * 0.5;

    while ((c = <VerletConnection>this._connections[--i])) {
      c.rigidity = half;
    }
  }

  public setForce(x: number, y: number, z: number): void {
    this._forceX = x;
    this._forceY = y;
    this._forceZ = z;
  }

  public get forceX(): number {
    return this._forceX;
  }

  public set forceX(value: number) {
    this._forceX = value;
  }

  public get forceY(): number {
    return this._forceY;
  }

  public set forceY(value: number) {
    this._forceY = value;
  }

  public get forceZ(): number {
    return this._forceZ;
  }

  public set forceZ(value: number) {
    this._forceZ = value;
  }

  public unlockAll(): void {
    let v: VerletVertex;
    let i: number = this._vertices.length;

    while ((v = <VerletVertex>this._vertices[--i])) {
      v.mobileX = true;
      v.mobileY = true;
      v.mobileZ = true;
    }
  }

  public lockXMin(tolerance: number = 0, axes: number = 7): void {
    this.lockSet(this.mod.minX, "x", tolerance, axes);
  }

  public lockXMax(tolerance: number = 0, axes: number = 7): void {
    this.lockSet(this.mod.maxX, "x", tolerance, axes);
  }

  public lockYMin(tolerance: number = 0, axes: number = 7): void {
    this.lockSet(this.mod.minY, "y", tolerance, axes);
  }

  public lockYMax(tolerance: number = 0, axes: number = 7): void {
    this.lockSet(this.mod.maxY, "y", tolerance, axes);
  }

  public lockZMin(tolerance: number = 0, axes: number = 7): void {
    this.lockSet(this.mod.minZ, "z", tolerance, axes);
  }

  public lockZMax(tolerance: number = 0, axes: number = 7): void {
    this.lockSet(this.mod.maxZ, "z", tolerance, axes);
  }

  private lockSet(reference: number, property: string, tolerance: number = 0, axes: number = 7): void {
    let v: VerletVertex;
    let i: number = this._vertices.length;

    while ((v = <VerletVertex>this._vertices[--i])) {
      if (Math.abs((<any>v)[property] - reference) <= tolerance) {
        if (axes & ModConstant.X) v.mobileX = false;
        if (axes & ModConstant.Y) v.mobileY = false;
        if (axes & ModConstant.Z) v.mobileZ = false;
      }
    }
  }

  public setModifiable(mod: MeshProxy): void {
    super.setModifiable(mod);

    this.initVerletVertices();
    this.initVerletConnections();
    this.rigidity = this._rigidity;
  }

  public apply(): void {
    let i: number;
    let c: VerletConnection;
    let v: VerletVertex;

    i = this._connections.length;

    while ((c = <VerletConnection>this._connections[--i])) {
      c.update();
    }

    i = this._vertices.length;

    while ((v = <VerletVertex>this._vertices[--i])) {
      if (v.mobileX) v.x += this._forceX;
      if (v.mobileY) v.y += this._forceY;
      if (v.mobileZ) v.z += this._forceZ;

      v.velocityX /= this._friction;
      v.velocityY /= this._friction;
      v.velocityZ /= this._friction;

      if (this._useBounds) {
        if (v.x < this._boundsMinX) v.x = this._boundsMinX;
        else if (v.x > this._boundsMaxX) v.x = this._boundsMaxX;
        if (v.y < this._boundsMinY) v.y = this._boundsMinY;
        else if (v.y > this._boundsMaxY) v.y = this._boundsMaxY;
        if (v.z < this._boundsMinZ) v.z = this._boundsMinZ;
        else if (v.z > this._boundsMaxZ) v.z = this._boundsMaxZ;
      }

      v.update();
    }
  }

  private initVerletVertices(): void {
    let vertices: any[] = this.mod.getVertices();
    let length: number = vertices.length;
    let verlet: VertexProxy;

    this._vertices = [];

    while ((verlet = <VertexProxy>vertices[--length])) {
      let verletVertex = new VerletVertex(verlet);
      this._vertices.push(verletVertex);
      this._dic.setVal(verlet, verletVertex);
    }
  }

  private initVerletConnections(): void {
    let faces: any[] = this.mod.getFaces();
    let face: FaceProxy;
    let length: number = faces.length;
    let faceVertices: any[];
    let numVertices: number;
    this._connections = [];

    for (let i: number = 0; i < length; i++) {
      face = <FaceProxy>faces[i];
      faceVertices = face.vertices;
      numVertices = faceVertices.length;

      for (let j: number = 0; j < numVertices - 1; j++) {
        this.createConnection(this._dic.getVal(faceVertices[j]), this._dic.getVal(faceVertices[j + 1]));
        if (j > 1) this.createConnection(this._dic.getVal(faceVertices[0]), this._dic.getVal(faceVertices[j]));
      }

      this.createConnection(this._dic.getVal(faceVertices[numVertices - 1]), this._dic.getVal(faceVertices[0]));
    }
  }

  private createConnection(v1: VerletVertex, v2: VerletVertex): void {
    if (!v1 || !v2) {
      return;
    }
    let dist: number = v1.distanceTo(v2);
    let connection: VerletConnection = new VerletConnection(v1, v2, dist, this._rigidity);

    this._connections.push(connection);
  }
}
