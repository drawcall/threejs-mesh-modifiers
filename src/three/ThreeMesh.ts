import { IMesh, IGeometry } from "./IMesh";
import { ThreeVertex } from "./ThreeVertex";
import { IBufferAttribute } from "./IBufferAttribute";

import { MeshProxy } from "../core/MeshProxy";
import { FaceProxy } from "../core/FaceProxy";
import { XMath } from "../math/XMath";
import { Vector3 } from "../math/Vector3";
import { TMap } from "../util/TMap";

export class ThreeMesh extends MeshProxy {
  private mesh: IMesh;
  private verticesMap: TMap = new TMap();
  public uvsAndColorUpdate: boolean = false;

  public setMesh(mesh: any): void {
    this.mesh = <IMesh>mesh;
    this.setPosition();
    this.setFaces();
    this.mergeVertices();
    this.mergeFaces();
  }

  private setPosition(): void {
    let position = this.getAttr("position");
    for (let i: number = 0; i < position.count; i++) {
      let vector: ThreeVertex = new ThreeVertex();
      let vec = new Vector3().fromBufferAttribute(position, i);
      vector.setVertex(vec);
      this.vertices.push(vector);
    }
  }

  private setFaces(): void {
    let index = this.getAttr("index");
    let position = this.getAttr("position");
    if (index !== null) {
      for (let i: number = 0; i < index.count; i += 3) {
        let face: FaceProxy = new FaceProxy();
        let a = index.getX(i);
        let b = index.getX(i + 1);
        let c = index.getX(i + 2);

        let v0: ThreeVertex = this.vertices[a];
        let v1: ThreeVertex = this.vertices[b];
        let v2: ThreeVertex = this.vertices[c];
        face.addVertices(v0, v1, v2);
        this.faces.push(face);
      }
    } else {
      for (let i = 0; i < position.count; i += 3) {
        let face: FaceProxy = new FaceProxy();
        let a = i;
        let b = i + 1;
        let c = i + 2;

        let v0: ThreeVertex = this.vertices[a];
        let v1: ThreeVertex = this.vertices[b];
        let v2: ThreeVertex = this.vertices[c];
        face.addVertices(v0, v1, v2);
        this.faces.push(face);
      }
    }
  }

  private mergeVertices(): void {
    let unique: number[] = [];
    let tmap = this.verticesMap;

    for (let i = 0; i < this.vertices.length; i++) {
      let v = this.vertices[i];
      let xyz = XMath.mappedKey(v);

      if (!tmap.includeByValue(xyz)) {
        let index = unique.length;
        v.only = true;
        unique.push(v);
        tmap.add(index, i, xyz);
      } else {
        let index = tmap.getToByValue(xyz);
        tmap.add(index, i, xyz);
      }
    }

    this.vertices = unique;
  }

  private mergeFaces(): void {
    let faceIndicesToRemove = [];

    for (let i = 0, il = this.faces.length; i < il; i++) {
      let face = this.faces[i];
      let a = XMath.mappedKey(face.a);
      let b = XMath.mappedKey(face.b);
      let c = XMath.mappedKey(face.c);
      let index1 = this.verticesMap.getToByValue(a);
      let index2 = this.verticesMap.getToByValue(b);
      let index3 = this.verticesMap.getToByValue(c);
      face.a = this.vertices[index1];
      face.b = this.vertices[index2];
      face.c = this.vertices[index3];
      let indices = [index1, index2, index3];

      for (let n = 0; n < 3; n++) {
        if (indices[n] === indices[(n + 1) % 3]) {
          faceIndicesToRemove.push(i);
          break;
        }
      }
    }

    for (let i = faceIndicesToRemove.length - 1; i >= 0; i--) {
      let idx = faceIndicesToRemove[i];
      this.faces.splice(idx, 1);
    }
  }

  public postApply(): void {
    this.updatePosition();
    this.updateIndex();
    this.computeBounding();
    this.updateUvsAndColor();
  }

  private updateUvsAndColor(): void {
    if (this.uvsAndColorUpdate) {
      let color = this.getAttr("color");
      if (color) color.needsUpdate = true;
      let uv = this.getAttr("uv");
      if (uv) uv.needsUpdate = true;
    }
  }

  private computeBounding(): void {
    if (this.boundUpdate) {
      let geometry = this.mesh.geometry;
      geometry.computeBoundingBox();
      geometry.computeBoundingSphere();
    }
  }

  private updatePosition(): void {
    let position = this.getAttr("position");
    let length = this.vertices.length;
    let fromIds;
    let v: ThreeVertex;
    let i, j, index;

    for (i = 0; i < length; i++) {
      v = this.vertices[i];
      fromIds = this.verticesMap.getFromByTo(i);
      
      for (j = 0; j < fromIds.length; j++) {
        index = fromIds[j];
        position.setX(index, v.x);
        position.setY(index, v.y);
        position.setZ(index, v.z);
      }
    }
    position.needsUpdate = true;
  }

  private updateIndex(): void {
    if (this.indexUpdate) {
      let index = this.getAttr("index");
      if (index) index.needsUpdate = true;
    }
  }

  private getAttr(attr: string): IBufferAttribute {
    let geometry: IGeometry = this.mesh.geometry;
    if (attr === "index") return geometry.getIndex();
    return geometry.getAttribute(attr);
  }

  public updateMeshPosition(p: Vector3): void {
    this.mesh.position.x += p.x;
    this.mesh.position.y += p.y;
    this.mesh.position.z += p.z;
  }

  public destroy(): void {
    super.destroy();
    this.verticesMap.destroy();
    this.verticesMap = null;
    this.mesh = null;
  }
}
