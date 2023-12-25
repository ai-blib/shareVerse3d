import { Cancellable } from "@lincode/promiselikes";
export declare const initCallBacks: Set<(e?: any) => void>;
export declare const callBacks: Set<(e?: any) => void>;
export declare const listenerFallEvent: (cb: any) => Cancellable;
export declare const emitFallEvent: (val: any) => void;
export declare const listenerInitEvent: (cb: any) => Cancellable;
export declare const emitInitEvent: (val: any) => void;
export declare const removeAll: () => void;
