import store, { pull, push, reset } from "@lincode/reactivity";
export const [setMultipleSelectionTargets, getMultipleSelectionTargets] = store([]);
export const pushMultipleSelectionTargets = push(setMultipleSelectionTargets, getMultipleSelectionTargets);
export const pullMultipleSelectionTargets = pull(setMultipleSelectionTargets, getMultipleSelectionTargets);
export const resetMultipleSelectionTargets = reset(setMultipleSelectionTargets, getMultipleSelectionTargets);
export const multipleSelectionTargetsFlushingPtr = [false];
export const flushMultipleSelectionTargets = async (onFlush) => {
    multipleSelectionTargetsFlushingPtr[0] = true;
    const targets = getMultipleSelectionTargets();
    setMultipleSelectionTargets([]);
    await Promise.resolve();
    onFlush();
    await Promise.resolve();
    await Promise.resolve();
    setMultipleSelectionTargets(targets);
    multipleSelectionTargetsFlushingPtr[0] = false;
};
//# sourceMappingURL=useMultipleSelectionTargets.js.map