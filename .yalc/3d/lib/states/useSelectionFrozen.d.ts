import Appendable from "../api/core/Appendable";
export declare const setSelectionFrozen: import("@lincode/reactivity").SetGlobalState<Set<Appendable<import("three").Object3D<import("three").Event>>>[]>, getSelectionFrozen: import("@lincode/reactivity").GetGlobalState<Set<Appendable<import("three").Object3D<import("three").Event>>>[]>;
export declare const addSelectionFrozen: (item: Appendable) => void;
export declare const removeSelectionFrozen: (item: Appendable) => void;
export declare const clearSelectionFrozen: () => void;
