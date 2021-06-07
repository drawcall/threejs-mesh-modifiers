export interface IBufferAttribute {
  array: any[];
  count: number;
  itemSize: number;
  needsUpdate: boolean;
  
  getX(index: number): number;
  getY(index: number): number;
  getZ(index: number): number;
  setX(index: number, x: number): IBufferAttribute;
  setY(index: number, x: number): IBufferAttribute;
  setZ(index: number, x: number): IBufferAttribute;
}
