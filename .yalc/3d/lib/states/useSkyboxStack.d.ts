import Skybox from "../display/Skybox";
export declare const setSkyboxStack: import("@lincode/reactivity").SetGlobalState<Skybox[]>, getSkyboxStack: import("@lincode/reactivity").GetGlobalState<Skybox[]>;
export declare const pushSkyboxStack: (val: Skybox) => void;
export declare const pullSkyboxStack: (val: Skybox) => void;
