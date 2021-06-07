export class XMath {
  public static PI: number = 3.1415;

  public static normalize(start: number, end: number, val: number): number {
    let range: number = end - start;
    let normal: number;

    if (range == 0) {
      normal = 1;
    } else {
      normal = XMath.trim(0, 1, (val - start) / end);
    }

    return normal;
  }

  public static toRange(start: number, end: number, normalized: number): number {
    let range: number = end - start;
    let val: number;

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
    else return val > 0 ? 1 : -1;
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
    return (deg / 180) * Math.PI;
  }

  public static radToDeg(rad: number): number {
    return (rad / Math.PI) * 180;
  }

  public static presicion(number: number, precision: number): number {
    let r: number = Math.pow(10, precision);
    return Math.round(number * r) / r;
  }

  public static uceil(val: number): number {
    return val < 0 ? Math.floor(val) : Math.ceil(val);
  }

  public static mappedKey(v: { x: number; y: number; z: number }): string {
    let precisionPoints = 4; // number of decimal points, e.g. 4 for epsilon of 0.0001
    let precision = Math.pow(10, precisionPoints);
    let key = Math.round(v.x * precision) + "_" + Math.round(v.y * precision) + "_" + Math.round(v.z * precision);
    return key;
  }
}
