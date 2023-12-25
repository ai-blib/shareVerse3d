import { PerspectiveCamera } from "three";
export declare const setCameraList: import("@lincode/reactivity").SetGlobalState<PerspectiveCamera[]>, getCameraList: import("@lincode/reactivity").GetGlobalState<PerspectiveCamera[]>;
export declare const pushCameraList: (val: PerspectiveCamera) => void;
export declare const pullCameraList: (val: PerspectiveCamera) => void;
