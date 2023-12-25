import { onAfterRender } from "../events/onAfterRender";
export const computeValuePerFrame = (cb) => {
    const cache = new Map();
    let blocked = false;
    const clearCacheDebounced = () => {
        if (blocked)
            return;
        blocked = true;
        onAfterRender(() => {
            blocked = false;
            cache.clear();
        }, true);
    };
    return (item) => {
        if (cache.has(item))
            return cache.get(item);
        const result = cb(item);
        cache.set(item, result);
        clearCacheDebounced();
        return result;
    };
};
export default (cb) => {
    const compute = computeValuePerFrame(cb);
    return (item) => compute(item).clone();
};
//# sourceMappingURL=computePerFrame.js.map