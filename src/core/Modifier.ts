import { MeshProxy } from './MeshProxy';

export class Modifier {

	protected mod: MeshProxy;

	public setModifiable(mod: MeshProxy): void {
		this.mod = mod;
	}

	public getVertices(): any[] {
		return this.mod.getVertices();
	}
}