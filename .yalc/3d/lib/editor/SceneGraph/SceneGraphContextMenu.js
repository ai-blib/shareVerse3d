import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "preact/jsx-runtime";
import { useEffect, useState } from "preact/hooks";
import Loaded from "../../display/core/Loaded";
import { onSelectionTarget } from "../../events/onSelectionTarget";
import { setSelectionNativeTarget } from "../../states/useSelectionNativeTarget";
import { addSelectionFrozen, clearSelectionFrozen, getSelectionFrozen, removeSelectionFrozen } from "../../states/useSelectionFrozen";
import ContextMenu from "../component/ContextMenu";
import ContextMenuItem from "../component/ContextMenu/ContextMenuItem";
import Timeline from "../../display/Timeline";
import { setSceneGraphExpanded } from "../../states/useSceneGraphExpanded";
import mousePosition from "../utils/mousePosition";
import { getTimeline, setTimeline } from "../../states/useTimeline";
import useSyncState from "../hooks/useSyncState";
import { getSelectionTarget } from "../../states/useSelectionTarget";
import { getTimelineData } from "../../states/useTimelineData";
import { getManager } from "../../api/utils/manager";
const traverseUp = (obj, expandedSet) => {
    expandedSet.add(obj);
    const nextParent = getManager(obj)?.parent?.outerObject3d ?? obj.parent;
    nextParent && traverseUp(nextParent, expandedSet);
};
const search = (n, target) => {
    const name = n.toLowerCase();
    let found;
    if (target instanceof Loaded)
        target.loadedGroup.traverse((item) => {
            if (found)
                return;
            item.name.toLowerCase().includes(name) && (found = item);
        });
    else
        target.outerObject3d.traverse((item) => {
            if (found)
                return;
            item.name.toLowerCase().includes(name) && (found = item);
        });
    if (!found)
        return;
    const expandedSet = new Set();
    traverseUp(found, expandedSet);
    setSceneGraphExpanded(expandedSet);
    setSelectionNativeTarget(found);
};
const SceneGraphContextMenu = () => {
    const [position, setPosition] = useState();
    const selectionTarget = useSyncState(getSelectionTarget);
    const [selectionFrozen] = useSyncState(getSelectionFrozen);
    const [timelineData] = useSyncState(getTimelineData);
    const timeline = useSyncState(getTimeline);
    useEffect(() => {
        const handle = onSelectionTarget(
        // @ts-ignore
        ({ rightClick }) => rightClick && setPosition(mousePosition));
        return () => {
            handle.cancel();
        };
    }, []);
    if (!position)
        return null;
    return (_jsxs(ContextMenu, { position: position, setPosition: setPosition, input: position.search && "Search child", onInput: (value) => selectionTarget && search(value, selectionTarget), children: [selectionTarget && !(selectionTarget instanceof Timeline) && (_jsxs(_Fragment, { children: [_jsx(ContextMenuItem, { onClick: (e) => setPosition({
                            x: e.clientX,
                            y: e.clientY,
                            search: true
                        }), children: "Search children" }), _jsx(ContextMenuItem, { disabled: !timelineData ||
                            selectionTarget.uuid in timelineData, onClick: () => {
                            timeline?.mergeData({ [selectionTarget.uuid]: {} });
                            setPosition(undefined);
                        }, children: timelineData && selectionTarget.uuid in timelineData
                            ? "Already in timeline"
                            : "Add to timeline" }), _jsx(ContextMenuItem, { onClick: () => {
                            selectionFrozen.has(selectionTarget)
                                ? removeSelectionFrozen(selectionTarget)
                                : addSelectionFrozen(selectionTarget);
                            setPosition(undefined);
                        }, children: selectionFrozen.has(selectionTarget)
                            ? "Unfreeze selection"
                            : "Freeze selection" })] })), selectionTarget instanceof Timeline && (_jsx(ContextMenuItem, { disabled: selectionTarget === timeline, onClick: () => {
                    setTimeline(selectionTarget);
                    setPosition(undefined);
                }, children: selectionTarget === timeline
                    ? "Already editing"
                    : "Edit timeline" })), _jsx(ContextMenuItem, { disabled: !selectionFrozen.size, onClick: () => {
                    clearSelectionFrozen();
                    setPosition(undefined);
                }, children: "Unfreeze all" })] }));
};
export default SceneGraphContextMenu;
//# sourceMappingURL=SceneGraphContextMenu.js.map