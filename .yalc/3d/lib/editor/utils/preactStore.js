import store from "@lincode/reactivity";
import useSyncState from "../hooks/useSyncState";
const hook = (setGlobalState, getGlobalState) => () => [useSyncState(getGlobalState), setGlobalState];
export default (val) => {
    const [setter, getter] = store(val);
    return [hook(setter, getter), setter, getter];
};
//# sourceMappingURL=preactStore.js.map