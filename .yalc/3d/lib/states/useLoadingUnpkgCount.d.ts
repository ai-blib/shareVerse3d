/// <reference types="node" />
export declare const setLoadingUnpkgCount: import("@lincode/reactivity").SetGlobalState<number>, getLoadingUnpkgCount: import("@lincode/reactivity").GetGlobalState<number>;
export declare const increaseLoadingUnpkgCount: () => void;
export declare const decreaseLoadingUnpkgCount: () => NodeJS.Timeout;
