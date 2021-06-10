import { MeshProxy } from "./MeshProxy";

export interface IModifier {
  setModifiable(mod: MeshProxy): void;
  apply(): void;
  destroy(): void;
}

export let IModifier: new (..._: any[]) => IModifier;
