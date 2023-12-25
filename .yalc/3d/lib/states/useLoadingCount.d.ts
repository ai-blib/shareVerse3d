/// <reference types="node" />
export declare const setLoadingCount: import("@lincode/reactivity").SetGlobalState<number>, getLoadingCount: import("@lincode/reactivity").GetGlobalState<number>;
export declare const increaseLoadingCount: () => void;
export declare const decreaseLoadingCount: () => NodeJS.Timeout;
