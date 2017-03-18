import { XMath } from './XMath';

export class Range {

	private _start: number;
	private _end: number;

	constructor(s: number = 0, e: number = 1) {
		this._start = s;
		this._end = e;
	}

	public get start(): number {
		return this._start;
	}

	public get end(): number {
		return this._end;
	}

	public get size(): number {
		return this._end - this._start;
	}

	public move(amount: number): void {
		this._start += amount;
		this._end += amount;
	}

	public isIn(n: number): boolean {
		return n >= this._start && n <= this._end;
	}

	public normalize(n: number): number {
		return XMath.normalize(this._start, this._end, n);
	}

	public toRange(n: number): number {
		return XMath.toRange(this._start, this._end, n);
	}

	public trim(n: number): number {
		return XMath.trim(this._start, this._end, n);
	}

	public interpolate(n: number, r: Range): number {
		return this.toRange(r.normalize(n));
	}

	public toString(): string {
		return "[" + this.start + " - " + this.end + "]";
	}
}