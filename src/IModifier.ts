import { MeshProxy } from './core/MeshProxy';

export interface IModifier {

	setModifiable(mod: MeshProxy): void;

	apply(): void;
}

export var IModifier: new (..._: any[]) => IModifier;