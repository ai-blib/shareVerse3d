import { Object3D } from "three";
export declare const skinnedMeshSet: WeakSet<Object3D<import("three").Event>>;
declare const _default: <T extends Object3D<import("three").Event>>(target: T, noBone: boolean, animations?: import("three").AnimationClip[]) => T;
export default _default;
