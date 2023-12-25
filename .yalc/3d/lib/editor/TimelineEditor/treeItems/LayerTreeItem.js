import { jsx as _jsx } from "preact/jsx-runtime";
import { useLayoutEffect, useMemo, useState } from "preact/hooks";
import { uuidMap } from "../../../api/core/collections";
import { onName } from "../../../events/onName";
import { FRAME_HEIGHT } from "../../../globals";
import BaseTreeItem from "../../component/treeItems/BaseTreeItem";
import useSyncState from "../../hooks/useSyncState";
import { deleteTimelineExpandedUUID, addTimelineExpandedUUID } from "../../../states/useTimelineExpandedUUIDs";
import { getTimelineLayer, setTimelineLayer } from "../../../states/useTimelineLayer";
import getComponentName from "../../utils/getComponentName";
import handleTreeItemClick from "../../utils/handleTreeItemClick";
const LayerTreeItem = ({ children, uuid }) => {
    const layer = useSyncState(getTimelineLayer);
    const [name, setName] = useState("");
    const instance = useMemo(() => uuidMap.get(uuid), [uuid]);
    const selected = layer === uuid;
    useLayoutEffect(() => {
        return () => {
            deleteTimelineExpandedUUID(uuid);
        };
    }, []);
    useLayoutEffect(() => {
        if (!instance)
            return;
        setName(getComponentName(instance));
        const handle = onName(
        // @ts-ignore
        (item) => item === instance && setName(getComponentName(instance)));
        return () => {
            handle.cancel();
        };
    }, [instance]);
    return (_jsx(BaseTreeItem, { height: FRAME_HEIGHT, label: name, onExpand: () => addTimelineExpandedUUID(uuid), onCollapse: () => deleteTimelineExpandedUUID(uuid), selected: selected, onClick: () => {
            setTimelineLayer(uuid);
            handleTreeItemClick(instance);
        }, children: children }));
};
export default LayerTreeItem;
//# sourceMappingURL=LayerTreeItem.js.map