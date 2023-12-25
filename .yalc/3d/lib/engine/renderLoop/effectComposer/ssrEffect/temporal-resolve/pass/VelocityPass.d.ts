export class VelocityPass extends Pass {
    constructor(scene: any, camera: any);
    cachedMaterials: WeakMap<object, any>;
    lastCameraTransform: {
        position: Vector3;
        quaternion: Quaternion;
    };
    visibleMeshes: any[];
    renderedMeshesThisFrame: number;
    renderedMeshesLastFrame: number;
    _scene: any;
    _camera: any;
    renderTarget: WebGLRenderTarget;
    setVelocityMaterialInScene(): void;
    saveBoneTexture(object: any): void;
    unsetVelocityMaterialInScene(): void;
    setSize(width: any, height: any): void;
    renderVelocity(renderer: any): void;
    render(renderer: any): void;
}
import { Pass } from "postprocessing";
import { Vector3 } from "three/src/math/Vector3";
import { Quaternion } from "three/src/math/Quaternion";
import { WebGLRenderTarget } from "three/src/renderers/WebGLRenderTarget";
