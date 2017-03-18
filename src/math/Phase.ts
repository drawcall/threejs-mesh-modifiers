export class Phase {

	private v: number;

	constructor(v: number = 0) {
		this.v = v;
	}

	public get value(): number {
		return this.v;
	}

	public set value(v: number) {
		this.v = v;
	}

	public get phasedValue(): number {
		return Math.sin(this.v);
	}

	public get absPhasedValue(): number {
		return Math.abs(this.phasedValue);
	}

	public get normValue(): number {
		return (this.phasedValue + 1) / 2;
	}

}