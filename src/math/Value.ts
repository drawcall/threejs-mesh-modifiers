import { TMath } from "./TMath";
import { Range } from "./Range";

export class Value {
  private _value: number;
  private _range: Range;

  constructor(i: number = 0, r: Range = null) {
    this._value = i;
    this._range = r != null ? r : new Range();
  }

  public get isOdd(): boolean {
    return this._value % 2 == 1;
  }

  public get isEven(): boolean {
    return this._value % 2 == 0;
  }

  public get normalized(): number {
    return TMath.normalize(this._range.start, this._range.end, this._value);
  }

  public get range(): Range {
    return this._range;
  }

  public get value(): number {
    return this._value;
  }

  public valueOf(): number {
    return this._value;
  }

  public toString(): string {
    return this._value + " " + this._range.toString();
  }

  public setRange(nr: Range, interpolateValue: boolean = false): void {
    if (interpolateValue) this._value = TMath.toRange(nr.start, nr.end, this.normalized);
    this._range = nr;
  }

  public trim(): void {
    this._value = TMath.trim(this._range.start, this._range.end, this._value);
  }

  public inRange(r: Range = null): boolean {
    if (r == null) r = this._range;
    return this._range.isIn(this._value);
  }

  public isFirst(): boolean {
    return this._value == this._range.start;
  }

  public isLast(): boolean {
    return this._value == this._range.end;
  }

  public isPolar(): boolean {
    return this.isFirst() || this.isLast();
  }

  public set value(value: number) {
    this._value = value;
  }

  public set range(range: Range) {
    this._range = range;
  }
}
