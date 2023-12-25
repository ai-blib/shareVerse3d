import { Cancellable } from "@lincode/promiselikes";
type CbResult = (() => void) | void;
export default class Reresolvable<T> {
    done?: boolean;
    private value?;
    private callbacks;
    then(cb: (val: T) => CbResult): Cancellable;
    resolve(val: T): void;
}
export {};
