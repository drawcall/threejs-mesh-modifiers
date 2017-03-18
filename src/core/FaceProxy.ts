import { VertexProxy } from './VertexProxy';

export class FaceProxy {
    private _vertices: any[];

    constructor() {
        this._vertices = [];
    }

    public addVertex(v: VertexProxy): void {
        this._vertices.push(v);
    }

    public get vertices(): any[] {
        return this._vertices;
    }
}
