export class ReflectionsPass extends Pass {
    constructor(ssrEffect: any, options?: {});
    ssrEffect: any;
    cachedMaterials: WeakMap<object, any>;
    USE_MRT: boolean;
    webgl1DepthPass: null;
    visibleMeshes: any[];
    _scene: any;
    _camera: any;
    fullscreenMaterial: ReflectionsMaterial;
    renderTarget: WebGLRenderTarget;
    renderPass: RenderPass;
    gBuffersRenderTarget: WebGLRenderTarget | WebGLMultipleRenderTargets;
    normalTexture: import("three").Texture;
    depthTexture: any;
    setSize(width: any, height: any): void;
    velocityTexture: any;
    keepMaterialMapUpdated(mrtMaterial: any, originalMaterial: any, prop: any, define: any): void;
    setMRTMaterialInScene(): void;
    unsetMRTMaterialInScene(): void;
    render(renderer: any, inputBuffer: any): void;
}
import { Pass } from "postprocessing";
import { ReflectionsMaterial } from "../material/ReflectionsMaterial";
import { WebGLRenderTarget } from "three/src/renderers/WebGLRenderTarget";
import { RenderPass } from "postprocessing";
import { WebGLMultipleRenderTargets } from "three/src/renderers/WebGLMultipleRenderTargets";
