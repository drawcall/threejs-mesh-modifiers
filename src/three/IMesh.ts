import { IVector3 } from "./IVector3";
import { IBufferAttribute } from "./IBufferAttribute";

export interface IMesh {
  position: IVector3;
  geometry: IGeometry;
}

export interface IGeometry {
  getAttribute(attr: String): IBufferAttribute;
  getIndex(): IBufferAttribute;
  computeVertexNormals(): void;
  computeBoundingBox(): void;
  computeBoundingSphere(): void;
}
