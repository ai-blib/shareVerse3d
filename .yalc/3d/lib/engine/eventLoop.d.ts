import { Cancellable } from '@lincode/promiselikes';
export declare const timer: (time: number, repeat: number, cb: () => void) => Cancellable;
export declare const fpsRatio: number[];
export declare const dt: number[];
export declare const loop: (cb: () => void) => Cancellable;
export declare const loopAnimation: (cb: () => void) => Cancellable;
