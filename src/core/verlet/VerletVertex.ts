import { VertexProxy } from '../VertexProxy';

export class VerletVertex {
	
	private _v: VertexProxy;
	private _x: number;
	private _y: number;
	private _z: number;
	private _oldX: number;
	private _oldY: number;
	private _oldZ: number;

	public mobileX: boolean = true;
	public mobileY: boolean = true;
	public mobileZ: boolean = true;

	constructor(vertexProxy: VertexProxy) {
		this._v = vertexProxy;
		this.setPosition(this._v.x, this._v.y, this._v.z);
	}

	public setPosition(x: number, y: number, z: number): void {
		this._x = this._oldX = x;
		this._y = this._oldY = y;
		this._z = this._oldZ = z;

		this._v.x = x;
		this._v.y = y;
		this._v.z = z;
	}

	public update(): void {
		var oldX: number,
			oldY: number,
			oldZ: number;

		if (this.mobileX) {
			oldX = this.x;
			this.x += this.velocityX;
			this._oldX = oldX;
		}
		if (this.mobileY) {
			oldY = this.y;
			this.y += this.velocityY;
			this._oldY = oldY;
		}
		if (this.mobileZ) {
			oldZ = this.z;
			this.z += this.velocityZ;
			this._oldZ = oldZ;
		}
	}

	public get x(): number {
		return this._x;
	}

	public set x(value: number) {
		this._x = value;
		if (!this.mobileX) this._oldX = value;
		this._v.x = value;
	}

	public get y(): number {
		return this._y;
	}

	public set y(value: number) {
		this._y = value;
		if (!this.mobileY) this._oldY = value;
		this._v.y = value;
	}

	public get z(): number {
		return this._z;
	}

	public set z(value: number) {
		this._z = value;
		if (!this.mobileZ) this._oldZ = value;
		this._v.z = value;
	}

	public get velocityX(): number {
		return this._x - this._oldX;
	}

	public set velocityX(value: number) {
		this._oldX = this._x - value;
	}

	public get velocityY(): number {
		return this._y - this._oldY;
	}

	public set velocityY(value: number) {
		this._oldY = this._y - value;
	}

	public get velocityZ(): number {
		return this._z - this._oldZ;
	}

	public set velocityZ(value: number) {
		this._oldZ = this._z - value;
	}

	public distanceTo(v: VerletVertex): number {
		return Math.sqrt((this.x - v.x) * (this.x - v.x) + (this.y - v.y) * (this.y - v.y) + (this.z - v.z) * (this.z - v.z));
	}

}