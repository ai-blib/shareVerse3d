import { jsx as _jsx } from "preact/jsx-runtime";
import useSyncState from "../hooks/useSyncState";
import { getTimelineData } from "../../states/useTimelineData";
import LayerTreeItem from "./treeItems/LayerTreeItem";
import PropertyTreeItem from "./treeItems/PropertyTreeItem";
import { timelineScrollHeightSignal } from "../../states/useTimelineScrollHeight";
import useResizeObserver from "../hooks/useResizeObserver";
import useSyncScrollTop from "./useSyncScrollTop";
const TimelineGraph = () => {
    const [timelineData] = useSyncState(getTimelineData);
    const scrollRef = useSyncScrollTop();
    const [ref, { height }] = useResizeObserver();
    timelineScrollHeightSignal.value = height;
    return (_jsx("div", { className: "lingo3d-absfull", style: { overflow: "scroll" }, ref: scrollRef, children: _jsx("div", { ref: ref, children: timelineData &&
                Object.entries(timelineData).map(([uuid, data]) => (_jsx(LayerTreeItem, { uuid: uuid, children: Object.keys(data).map((property) => (_jsx(PropertyTreeItem, { property: property, uuid: uuid }, uuid + " " + property))) }, uuid))) }) }));
};
export default TimelineGraph;
//# sourceMappingURL=TimelineGraph.js.map