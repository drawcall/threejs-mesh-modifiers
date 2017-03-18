import { IModifier } from '../IModifier';
import { ModConstant } from '../util/ModConstant';

import { XMath } from '../math/XMath';

import { MeshProxy } from '../core/MeshProxy';
import { Modifier } from '../core/Modifier';
import { VertexProxy } from '../core/VertexProxy';

export class Skew extends Modifier implements IModifier {
	
	private _force: number;
	private _skewAxis: number;
	private _offset: number = .5;
	private _constraint: number = ModConstant.NONE;
	private _power: number = 1;
	private _falloff: number = 1;
	private _inverseFalloff: boolean = false;
	private _oneSide: boolean = false;
	private _swapAxes: boolean = false;


	constructor(f: number = 0) {
		super();
		this._force = f;
	}

	public setModifiable(mod: MeshProxy): void {
		super.setModifiable(mod);
		this._skewAxis = this._skewAxis || mod.maxAxis;
	}

	public apply(): void {
		let vertices: any[] = this.mod.getVertices();
		let verticesLength: number = vertices.length;

		for (let i: number = 0; i < verticesLength; i++) {
			let v: VertexProxy = <VertexProxy>vertices[i];

			if (this._constraint == ModConstant.LEFT && v.getRatio(this._skewAxis) <= this._offset) continue;
			if (this._constraint == ModConstant.RIGHT && v.getRatio(this._skewAxis) > this._offset) continue;

			let r: number = v.getRatio(this._skewAxis) - this._offset;
			if (this._oneSide) r = Math.abs(r);

			let dr: number = v.getRatio(this.displaceAxis);
			if (this._inverseFalloff) dr = 1 - dr;

			let f: number = this._falloff + dr * (1 - this._falloff);

			let p: number = Math.pow(Math.abs(r), this._power) * XMath.sign(r, 1);
			let vl: number = v.getValue(this.displaceAxis) + this.force * p * f;
			
			v.setValue(this.displaceAxis, vl);
		}
	}

	private get displaceAxis(): number {
		switch (this._skewAxis) {
			case ModConstant.X:
				return (this._swapAxes) ? ModConstant.Z : ModConstant.Y;
			case ModConstant.Y:
				return (this._swapAxes) ? ModConstant.Z : ModConstant.X;
			case ModConstant.Z:
				return (this._swapAxes) ? ModConstant.Y : ModConstant.X;
			default:
				return 0;
		}
	}

	public set force(f: number) {
		this._force = f;
	}

	public get force(): number {
		return this._force;
	}

	public get constraint(): number {
		return this._constraint;
	}

	public set constraint(c: number) {
		this._constraint = c;
	}

	public get offset(): number {
		return this._offset;
	}

	public set offset(o: number) {
		this._offset = XMath.trim(0, 1, o);
	}

	public get power(): number {
		return this._power;
	}

	public set power(power: number) {
		this._power = Math.max(1, power);
	}

	public get falloff(): number {
		return this._falloff;
	}

	public set falloff(falloff: number) {
		this._falloff = XMath.trim(0, 1, falloff);
	}

	public get oneSide(): boolean {
		return this._oneSide;
	}

	public set oneSide(oneSide: boolean) {
		this._oneSide = oneSide;
	}

	public get skewAxis(): number {
		return this._skewAxis;
	}

	public set skewAxis(skewAxis: number) {
		this._skewAxis = skewAxis;
	}

	public get swapAxes(): boolean {
		return this._swapAxes;
	}

	public set swapAxes(spawAxes: boolean) {
		this._swapAxes = spawAxes;
	}

	public get inverseFalloff(): boolean {
		return this._inverseFalloff;
	}

	public set inverseFalloff(inverseFalloff: boolean) {
		this._inverseFalloff = inverseFalloff;
	}

}