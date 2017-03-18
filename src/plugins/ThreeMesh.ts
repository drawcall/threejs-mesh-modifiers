import { IMesh, IGeometry } from './IMesh';
import { IVector3 } from './IVector3';
import { ThreeVertex } from './ThreeVertex';

import { MeshProxy } from '../core/MeshProxy';
import { FaceProxy } from '../core/FaceProxy';

import { Vector3 } from '../math/Vector3';
import { Dictionary } from '../util/Dictionary';

export class ThreeMesh extends MeshProxy {

	private mesh: IMesh;

	public setMesh(mesh: any): void {
		this.mesh = <IMesh>mesh;

		let geometry: IGeometry = this.mesh.geometry;
		let lookUp: Dictionary = new Dictionary();
		let vertices: any[] = geometry.vertices;
		let verticesLength: number = vertices.length;
		let faces: any[] = geometry.faces;
		let facesLength: number = faces.length;

		for (let i: number = 0; i < verticesLength; i++) {
			let vector: ThreeVertex = new ThreeVertex();
			vector.setVertex(<IVector3>vertices[i]);
			this.vertices.push(vector);
			lookUp.setVal(vertices[i], vector);
		}

		for (let i: number = 0; i < facesLength; i++) {
			let face: FaceProxy = new FaceProxy();
			let v0: IVector3 = vertices[faces[i].a];
			let v1: IVector3 = vertices[faces[i].b];
			let v2: IVector3 = vertices[faces[i].c];

			face.addVertex(lookUp.getVal(v0));
			face.addVertex(lookUp.getVal(v1));
			face.addVertex(lookUp.getVal(v2));
			this.faces.push(face);
		}
	}

	public postApply(): void {
		let geometry: IGeometry = this.mesh.geometry;
		geometry.verticesNeedUpdate = true;
		geometry.normalsNeedUpdate = true;
		//geometry.colorsNeedUpdate = true;
		//geometry.groupsNeedUpdate = true;
		//geometry.uvsNeedUpdate = true;
	}


	public updateMeshPosition(p: Vector3): void {
		this.mesh.position.x += p.x;
		this.mesh.position.y += p.y;
		this.mesh.position.z += p.z;
	}
}