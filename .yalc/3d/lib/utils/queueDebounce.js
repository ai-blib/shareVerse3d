import { throttleTrailing } from '@lincode/utils';
export default () => {
    const map = new Map();
    const run = throttleTrailing(() => {
        for (const cb of map.values())
            cb();
        map.clear();
    });
    return (item, cb) => {
        map.set(item, cb);
        run();
    };
};
//# sourceMappingURL=queueDebounce.js.map