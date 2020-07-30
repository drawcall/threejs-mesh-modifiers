import { IVector3 } from "./IVector3";

export interface IMesh {
  position: IVector3;

  geometry: IGeometry;
}

export interface IGeometry {
  vertices: any[];
  faces: any[];
  verticesNeedUpdate: boolean;
  elementsNeedUpdate: boolean;
  uvsNeedUpdate: boolean;
  normalsNeedUpdate: boolean;
  colorsNeedUpdate: boolean;
  lineDistancesNeedUpdate: boolean;
  groupsNeedUpdate: boolean;
  buffersNeedUpdate: boolean;
}
