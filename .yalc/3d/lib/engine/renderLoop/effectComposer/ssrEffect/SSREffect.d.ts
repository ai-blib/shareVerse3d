export class SSREffect extends Effect {
    /**
     * @param {THREE.Scene} scene The scene of the SSR effect
     * @param {THREE.Camera} camera The camera with which SSR is being rendered
     * @param {SSROptions} [options] The optional options for the SSR effect
     */
    constructor(scene: THREE.Scene, camera: THREE.Camera, options?: any);
    haltonSequence: number[][];
    haltonIndex: number;
    selection: Selection;
    lastSize: {
        width: any;
        height: any;
        resolutionScale: any;
        velocityResolutionScale: any;
    };
    _scene: import("three").Scene;
    _camera: import("three").Camera;
    temporalResolvePass: TemporalResolvePass;
    reflectionsPass: ReflectionsPass;
    makeOptionsReactive(options: any): void;
    setSize(width: any, height: any, force?: boolean): void;
    setIBLRadiance(iblRadiance: any, renderer: any): void;
    update(renderer: any, inputBuffer: any): void;
}
import { Effect } from "postprocessing";
import { Selection } from "postprocessing";
import { TemporalResolvePass } from "./temporal-resolve/pass/TemporalResolvePass";
import { ReflectionsPass } from "./pass/ReflectionsPass";
