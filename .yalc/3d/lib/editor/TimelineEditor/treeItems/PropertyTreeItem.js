import { jsx as _jsx } from "preact/jsx-runtime";
import { uuidMap } from "../../../api/core/collections";
import { FRAME_HEIGHT } from "../../../globals";
import BaseTreeItem from "../../component/treeItems/BaseTreeItem";
import useSyncState from "../../hooks/useSyncState";
import { getTimelineLayer, setTimelineLayer } from "../../../states/useTimelineLayer";
import handleTreeItemClick from "../../utils/handleTreeItemClick";
const PropertyTreeItem = ({ property, uuid }) => {
    const layer = useSyncState(getTimelineLayer);
    const myLayer = uuid + " " + property;
    const selected = layer === myLayer;
    return (_jsx(BaseTreeItem, { height: FRAME_HEIGHT, label: property, selected: selected, onClick: () => {
            setTimelineLayer(myLayer);
            handleTreeItemClick(uuidMap.get(uuid));
        } }));
};
export default PropertyTreeItem;
//# sourceMappingURL=PropertyTreeItem.js.map