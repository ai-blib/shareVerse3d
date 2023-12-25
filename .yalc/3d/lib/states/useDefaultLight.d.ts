import { EnvironmentPreset } from "../interface/IEnvironment";
type DefaultLight = boolean | EnvironmentPreset | string;
export declare const setDefaultLight: import("@lincode/reactivity").SetGlobalState<DefaultLight>, getDefaultLight: import("@lincode/reactivity").GetGlobalState<DefaultLight>;
export {};
