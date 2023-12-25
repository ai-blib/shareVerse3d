import { PerspectiveCamera } from "three";
export declare const setCameraStack: import("@lincode/reactivity").SetGlobalState<PerspectiveCamera[]>, getCameraStack: import("@lincode/reactivity").GetGlobalState<PerspectiveCamera[]>;
export declare const pushCameraStack: (val: PerspectiveCamera) => void;
export declare const pullCameraStack: (val: PerspectiveCamera) => void;
