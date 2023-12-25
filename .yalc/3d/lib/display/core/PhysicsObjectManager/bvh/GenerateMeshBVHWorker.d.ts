import { BufferGeometry } from "three";
import { MeshBVH } from "three-mesh-bvh";
export declare const geometryMeshMap: WeakMap<object, any>;
type Options = {
    onProgress?: (progress: number) => void;
};
export declare class GenerateMeshBVHWorker {
    private worker;
    constructor();
    generate(geom: BufferGeometry, options?: Options): Promise<MeshBVH>;
    dispose(): void;
    terminate(): void;
}
export {};
