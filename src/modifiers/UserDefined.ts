import { IModifier } from "../core/IModifier";
import { Modifier } from "../core/Modifier";
import { VertexProxy } from "../core/VertexProxy";
import { EventEmitter } from "../util/EventEmitter";

export class UserDefined extends Modifier implements IModifier {
  private eventEmitter: EventEmitter;
  public renderVector: (_: VertexProxy, i: number, l: number) => void;

  constructor() {
    super();
    this.eventEmitter = new EventEmitter();
  }

  public apply(): void {
    let vertices: any[] = this.mod.getVertices();
    let verticesLength: number = vertices.length;

    for (let i: number = 0; i < verticesLength; i++) {
      let v: VertexProxy = <VertexProxy>vertices[i];
      this.renderVector && this.renderVector(v, i, verticesLength);
    }

    this.dispatchEvent("CHANGE");
  }

  public addEventListener(type: string, listener: any): void {
    this.eventEmitter.on(type, listener);
  }

  public dispatchEvent(eventName: string): boolean {
    return this.eventEmitter.emit(eventName);
  }

  public hasEventListener(type: string): boolean {
    return this.eventEmitter.has(type);
  }

  public removeEventListener(type: string, listener: any): void {
    this.eventEmitter.off(type, listener);
  }
}
