export class XMath {

	public static PI: number = 3.1415;

	public static normalize(start: number, end: number, val: number): number {
		var range: number = end - start;
		var normal: number;

		if (range == 0) {
			normal = 1;
		} else {
			normal = XMath.trim(0, 1, (val - start) / end);
		}

		return normal;
	}

	public static toRange(start: number, end: number, normalized: number): number {
		var range: number = end - start;
		var val: number;

		if (range == 0) {
			val = 0;
		} else {
			val = start + (end - start) * normalized;
		}

		return val;
	}

	public static inInRange(start: number, end: number, value: number, excluding: boolean = false): boolean {
		if (excluding) return value >= start && value <= end;
		else return value > start && value < end;
	}

	public static sign(val: number, ifZero: number = 0): number {
		if (val == 0) return ifZero;
		else return (val > 0) ? 1 : -1;
	}

	public static trim(start: number, end: number, value: number): number {
		return Math.min(end, Math.max(start, value));
	}

	public static wrap(start: number, end: number, value: number): number {
		if (value < start) return value + (end - start);
		else if (value >= end) return value - (end - start);
		else return value;
	}

	public static degToRad(deg: number): number {
		return deg / 180 * Math.PI;
	}

	public static radToDeg(rad: number): number {
		return rad / Math.PI * 180;
	}

	public static presicion(number: number, precision: number): number {
		var r: number = Math.pow(10, precision);
		return Math.round(number * r) / r;
	}

	public static uceil(val: number): number {
		return (val < 0) ? Math.floor(val) : Math.ceil(val);
	}
}