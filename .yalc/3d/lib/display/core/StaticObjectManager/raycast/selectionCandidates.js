import { Cancellable } from "@lincode/promiselikes";
import { throttleTrailing } from "@lincode/utils";
import { appendableRoot } from "../../../../api/core/collections";
import { onSelectionTarget, emitSelectionTarget } from "../../../../events/onSelectionTarget";
import { getSelectionFrozen } from "../../../../states/useSelectionFrozen";
import callPrivateMethod from "../../../../utils/callPrivateMethod";
const selectionCandidates = new Set();
export default selectionCandidates;
export const unselectableSet = new WeakSet();
export const additionalSelectionCandidates = new Set();
export const overrideSelectionCandidates = new Set();
export const addSelectionHelper = (helper, manager) => {
    manager.outerObject3d.add(helper.outerObject3d);
    additionalSelectionCandidates.add(helper.nativeObject3d);
    // @ts-ignore
    const handle = onSelectionTarget(
    // @ts-ignore
    ({ target }) => target === helper && emitSelectionTarget(manager));
    return new Cancellable(() => {
        helper.dispose();
        additionalSelectionCandidates.delete(helper.nativeObject3d);
        handle.cancel();
    });
};
const traverse = (targets, frozenSet) => {
    for (const manager of targets) {
        if (frozenSet.has(manager))
            continue;
        if ("addToRaycastSet" in manager && !unselectableSet.has(manager))
            callPrivateMethod(manager, "addToRaycastSet", selectionCandidates);
        manager.children && traverse(manager.children, frozenSet);
    }
};
export const getSelectionCandidates = throttleTrailing((targets = appendableRoot) => {
    selectionCandidates.clear();
    if (overrideSelectionCandidates.size) {
        for (const candidate of overrideSelectionCandidates)
            selectionCandidates.add(candidate);
        return;
    }
    const [frozenSet] = getSelectionFrozen();
    traverse(targets, frozenSet);
    for (const candidate of additionalSelectionCandidates)
        selectionCandidates.add(candidate);
});
getSelectionFrozen(() => {
    getSelectionCandidates();
    emitSelectionTarget(undefined);
});
//# sourceMappingURL=selectionCandidates.js.map