import Environment from "../display/Environment";
declare const getEnvironmentStack: import("@lincode/reactivity").GetGlobalState<Environment[]>;
export { getEnvironmentStack };
export declare const pushEnvironmentStack: (val: Environment) => void;
export declare const pullEnvironmentStack: (val: Environment) => void;
export declare const refreshEnvironmentStack: () => void;
