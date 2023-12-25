import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "preact/jsx-runtime";
import { useLayoutEffect, useMemo, useState } from "preact/hooks";
import Model from "../../display/Model";
import ModelTreeItem from "./ModelTreeItem";
import { getSelectionTarget } from "../../states/useSelectionTarget";
import getComponentName from "../utils/getComponentName";
import BaseTreeItem from "../component/treeItems/BaseTreeItem";
import CubeIcon from "./icons/CubeIcon";
import { hiddenAppendables } from "../../api/core/collections";
import AnimationManager from "../../display/core/AnimatedObjectManager/AnimationManager";
import PlayIcon from "./icons/PlayIcon";
import BasicMaterialManager from "../../display/material/BasicMaterialManager";
import ImageIcon from "./icons/ImageIcon";
import { onName } from "../../events/onName";
import useSyncState from "../hooks/useSyncState";
import { getMultipleSelectionTargets } from "../../states/useMultipleSelectionTargets";
import { getSceneGraphExpanded, setSceneGraphExpanded } from "../../states/useSceneGraphExpanded";
import handleTreeItemClick from "../utils/handleTreeItemClick";
const TreeItem = ({ appendable, children, expandable }) => {
    const appendableChildren = useMemo(() => {
        return appendable.children
            ? [...appendable.children].filter((item) => !hiddenAppendables.has(item))
            : undefined;
    }, [appendable.children?.size]);
    const selectionTarget = useSyncState(getSelectionTarget);
    const multipleSelectionTargets = useSyncState(getMultipleSelectionTargets);
    const selected = selectionTarget === appendable ||
        multipleSelectionTargets.includes(appendable);
    const sceneGraphExpanded = useSyncState(getSceneGraphExpanded);
    const IconComponent = useMemo(() => {
        if (appendable instanceof AnimationManager)
            return PlayIcon;
        if (appendable instanceof BasicMaterialManager)
            return ImageIcon;
        return CubeIcon;
    }, [appendable]);
    const [name, setName] = useState("");
    useLayoutEffect(() => {
        setName(getComponentName(appendable));
        const handle = onName(
        // @ts-ignore
        (item) => item === appendable && setName(getComponentName(appendable)));
        return () => {
            handle.cancel();
        };
    }, [appendable]);
    return (_jsx(BaseTreeItem, { label: name, selected: selected, draggable: true, myDraggingItem: appendable, onDrop: (draggingItem) => appendable.attach(draggingItem), expanded: sceneGraphExpanded?.has(appendable.outerObject3d), onCollapse: () => setSceneGraphExpanded(undefined), expandable: expandable ?? !!appendableChildren?.length, onClick: () => handleTreeItemClick(appendable), onContextMenu: () => handleTreeItemClick(appendable, true), IconComponent: IconComponent, children: () => (_jsxs(_Fragment, { children: [appendableChildren?.map((childAppendable) => childAppendable instanceof Model ? (_jsx(ModelTreeItem, { appendable: childAppendable }, childAppendable.uuid)) : (_jsx(TreeItem, { appendable: childAppendable }, childAppendable.uuid))), children] })) }));
};
export default TreeItem;
//# sourceMappingURL=TreeItem.js.map