import ISetup from '../interface/ISetup';
export declare const setSetupStack: import("@lincode/reactivity").SetGlobalState<Partial<ISetup>[]>, getSetupStack: import("@lincode/reactivity").GetGlobalState<Partial<ISetup>[]>;
export declare const pushSetupStack: (val: Partial<ISetup>) => void;
export declare const pullSetupStack: (val: Partial<ISetup>) => void;
export declare const refreshSetupStack: () => void;
