import PositionedItem from "../api/core/PositionedItem";
export declare const setMultipleSelectionTargets: import("@lincode/reactivity").SetGlobalState<PositionedItem<import("three").Object3D<import("three").Event>>[]>, getMultipleSelectionTargets: import("@lincode/reactivity").GetGlobalState<PositionedItem<import("three").Object3D<import("three").Event>>[]>;
export declare const pushMultipleSelectionTargets: (val: PositionedItem<import("three").Object3D<import("three").Event>>) => void;
export declare const pullMultipleSelectionTargets: (val: PositionedItem<import("three").Object3D<import("three").Event>>) => void;
export declare const resetMultipleSelectionTargets: () => void;
export declare const multipleSelectionTargetsFlushingPtr: boolean[];
export declare const flushMultipleSelectionTargets: (onFlush: () => void) => Promise<void>;
