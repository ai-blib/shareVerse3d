import { OutlineEffect } from "postprocessing";
import { Object3D } from "three";
declare const getOutlineEffect: import("@lincode/reactivity").GetGlobalState<OutlineEffect | undefined>;
export { getOutlineEffect };
export declare const addOutline: (target: Object3D) => void;
export declare const deleteOutline: (target: Object3D) => boolean;
