import { IModifier } from "./IModifier";
import { MeshProxy } from "./core/MeshProxy";
import { ThreeMesh } from "./plugins/ThreeMesh";

export class ModifierStack {
  private baseMesh: MeshProxy;
  private stack: any[];

  constructor(mesh: any) {
    this.baseMesh = new ThreeMesh();
    this.baseMesh.setMesh(mesh);
    this.baseMesh.analyzeGeometry();
    this.stack = new Array();
  }

  public set uvsAndColorUpdate(update: boolean) {
    this.baseMesh.uvsAndColorUpdate = update;
  }

  public addModifier(mod: IModifier): void {
    mod.setModifiable(this.baseMesh);
    this.stack.push(mod);
  }

  public removeModifier(mod: IModifier): void {
    let index = this.stack.indexOf(mod);
    if (index > -1) {
      this.stack.splice(index, 1);
    }
  }

  public apply(): void {
    this.baseMesh.resetGeometry();

    for (let i: number = 0; i < this.stack.length; i++) {
      (<IModifier>this.stack[i]).apply();
    }

    this.baseMesh.postApply();
  }

  public collapse(): void {
    this.apply();
    this.baseMesh.collapseGeometry();
    this.stack.length = 0;
  }

  public reset() {
    this.baseMesh.resetGeometry();
  }

  public clear(): void {
    this.stack.length = 0;
  }
}
