import { Cancellable } from "@lincode/promiselikes";
import { pull } from "@lincode/utils";
const cleanupMap = new WeakMap();
const runCleanup = (cb) => {
    if (cleanupMap.has(cb)) {
        cleanupMap.get(cb)();
        cleanupMap.delete(cb);
    }
};
const run = (cb, val) => {
    runCleanup(cb);
    const cleanup = cb(val);
    cleanup && cleanupMap.set(cb, cleanup);
};
export default class Reresolvable {
    done = undefined;
    value = undefined;
    callbacks = [];
    then(cb) {
        this.callbacks.push(cb);
        this.done && run(cb, this.value);
        return new Cancellable(() => {
            pull(this.callbacks, cb);
            runCleanup(cb);
        });
    }
    resolve(val) {
        for (const cb of this.callbacks)
            run(cb, val);
        this.done = true;
        this.value = val;
    }
}
//# sourceMappingURL=Reresolvable.js.map