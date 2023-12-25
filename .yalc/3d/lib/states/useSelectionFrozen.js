import store, { createEffect } from "@lincode/reactivity";
import { onDispose } from "../events/onDispose";
export const [setSelectionFrozen, getSelectionFrozen] = store([
    new Set()
]);
export const addSelectionFrozen = (item) => {
    const [frozenSet] = getSelectionFrozen();
    frozenSet.add(item);
    setSelectionFrozen([frozenSet]);
};
export const removeSelectionFrozen = (item) => {
    const [frozenSet] = getSelectionFrozen();
    frozenSet.delete(item);
    setSelectionFrozen([frozenSet]);
};
export const clearSelectionFrozen = () => {
    const [frozenSet] = getSelectionFrozen();
    frozenSet.clear();
    setSelectionFrozen([frozenSet]);
};
createEffect(() => {
    const [frozenSet] = getSelectionFrozen();
    if (!frozenSet.size)
        return;
    // @ts-ignore
    const handle = onDispose((item) => {
        if (!frozenSet.has(item))
            return;
        frozenSet.delete(item);
        setSelectionFrozen([frozenSet]);
    });
    return () => {
        handle.cancel();
    };
}, [getSelectionFrozen]);
//# sourceMappingURL=useSelectionFrozen.js.map