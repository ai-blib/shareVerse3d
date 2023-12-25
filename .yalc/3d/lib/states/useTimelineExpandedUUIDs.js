import store from "@lincode/reactivity";
const [setTimelineExpandedUUIDs, getTimelineExpandedUUIDs] = store([
    new Set()
]);
export { getTimelineExpandedUUIDs };
export const addTimelineExpandedUUID = (uuid) => {
    const [expandedUUIDs] = getTimelineExpandedUUIDs();
    expandedUUIDs.add(uuid);
    setTimelineExpandedUUIDs([expandedUUIDs]);
};
export const deleteTimelineExpandedUUID = (uuid) => {
    const [expandedUUIDs] = getTimelineExpandedUUIDs();
    expandedUUIDs.delete(uuid);
    setTimelineExpandedUUIDs([expandedUUIDs]);
};
//# sourceMappingURL=useTimelineExpandedUUIDs.js.map