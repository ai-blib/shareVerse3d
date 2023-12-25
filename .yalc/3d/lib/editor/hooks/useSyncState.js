import { useCallback, useSyncExternalStore } from "preact/compat";
export default (getGlobalState) => useSyncExternalStore(useCallback((notify) => {
    const handle = getGlobalState(notify);
    return () => {
        handle.cancel();
    };
}, []), useCallback(() => getGlobalState(), []));
//# sourceMappingURL=useSyncState.js.map