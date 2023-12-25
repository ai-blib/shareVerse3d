import { SelectiveBloomEffect } from "postprocessing";
import { Object3D } from "three";
export declare const addSelectiveBloom: (target: Object3D) => void;
export declare const deleteSelectiveBloom: (target: Object3D) => boolean;
declare const getSelectiveBloomEffect: import("@lincode/reactivity").GetGlobalState<SelectiveBloomEffect | undefined>;
export { getSelectiveBloomEffect };
