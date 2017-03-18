import { IModifier } from '../IModifier';

import { Matrix4 } from '../math/Matrix4';
import { Vector3 } from '../math/Vector3';

import { MeshProxy } from '../core/MeshProxy';
import { Modifier } from '../core/Modifier';
import { VertexProxy } from '../core/VertexProxy';


export class Pivot extends Modifier implements IModifier {

	public pivot: Vector3;

	constructor(x: number = 0, y: number = 0, z: number = 0) {
		super();
		this.pivot = new Vector3(x, y, z);
	}

	public setMeshCenter(): void {
		let vx: number = -(this.mod.minX + this.mod.width / 2);
		let vy: number = -(this.mod.minY + this.mod.height / 2);
		let vz: number = -(this.mod.minZ + this.mod.depth / 2);
		this.pivot = new Vector3(vx, vy, vz);
	}

	public apply(): void {
		let vs: any[] = this.mod.getVertices();
		let vc: number = vs.length;

		for (let i: number = 0; i < vc; i++) {
			let v: VertexProxy = <VertexProxy>vs[i];
			v.vector = v.vector.add(this.pivot);
		}

		let npivot: Vector3 = this.pivot.clone();
		this.mod.updateMeshPosition(npivot.negate());
	}
}