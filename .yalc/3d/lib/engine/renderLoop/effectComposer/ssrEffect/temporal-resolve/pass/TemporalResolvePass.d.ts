export class TemporalResolvePass extends Pass {
    constructor(scene: any, camera: any, customComposeShader: any, options?: {});
    velocityPass: null;
    velocityResolutionScale: number;
    samples: number;
    _scene: any;
    _camera: any;
    renderTarget: WebGLRenderTarget;
    fullscreenMaterial: TemporalResolveMaterial;
    setSize(width: any, height: any): void;
    setupFramebuffers(width: any, height: any): void;
    accumulatedTexture: FramebufferTexture | undefined;
    lastVelocityTexture: FramebufferTexture | undefined;
    checkCanUseSharedVelocityTexture(): boolean;
    checkNeedsResample(): void;
    render(renderer: any): void;
}
import { Pass } from "postprocessing";
import { WebGLRenderTarget } from "three/src/renderers/WebGLRenderTarget";
import { TemporalResolveMaterial } from "../material/TemporalResolveMaterial";
import { FramebufferTexture } from "three/src/textures/FramebufferTexture";
