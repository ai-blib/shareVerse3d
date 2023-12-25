import { jsx as _jsx } from "preact/jsx-runtime";
import { useEffect, useMemo, useState } from "preact/hooks";
import ComponentIcon from "./icons/ComponentIcon";
import BaseTreeItem from "../component/treeItems/BaseTreeItem";
import BoneIcon from "./icons/BoneIcon";
import useSyncState from "../hooks/useSyncState";
import { getSelectionNativeTarget } from "../../states/useSelectionNativeTarget";
import { getSceneGraphExpanded, setSceneGraphExpanded } from "../../states/useSceneGraphExpanded";
import handleTreeItemClick from "../utils/handleTreeItemClick";
const NativeTreeItem = ({ appendable, object3d }) => {
    const [expanded, setExpanded] = useState(false);
    const nativeTarget = useSyncState(getSelectionNativeTarget);
    const sceneGraphExpanded = useSyncState(getSceneGraphExpanded);
    useEffect(() => {
        sceneGraphExpanded?.has(object3d) && setExpanded(true);
    }, [sceneGraphExpanded]);
    const selected = nativeTarget === object3d;
    const IconComponent = useMemo(() => {
        if ("isBone" in object3d)
            return BoneIcon;
        return ComponentIcon;
    }, [object3d]);
    return (_jsx(BaseTreeItem, { label: object3d.name, selected: selected, onCollapse: () => setSceneGraphExpanded(undefined), onClick: () => handleTreeItemClick(object3d, false, appendable), onContextMenu: () => handleTreeItemClick(object3d, true, appendable), expanded: expanded, expandable: !!object3d.children.length, outlined: true, IconComponent: IconComponent, children: () => object3d.children.map((child) => (_jsx(NativeTreeItem, { object3d: child, appendable: appendable }, child.uuid))) }));
};
export default NativeTreeItem;
//# sourceMappingURL=NativeTreeItem.js.map