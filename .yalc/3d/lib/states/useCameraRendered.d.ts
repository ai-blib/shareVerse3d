import { Camera, PerspectiveCamera } from "three";
export declare const setCameraRendered: import("@lincode/reactivity").SetGlobalState<PerspectiveCamera>, getCameraRendered: import("@lincode/reactivity").GetGlobalState<PerspectiveCamera>;
export declare const updateCameraAspect: (camera: Camera) => number[];
