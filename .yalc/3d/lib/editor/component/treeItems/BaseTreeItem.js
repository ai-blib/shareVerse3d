import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { useState, useRef, useMemo, useContext, useEffect } from "preact/hooks";
import CollapseIcon from "../icons/CollapseIcon";
import ExpandIcon from "../icons/ExpandIcon";
import { TreeItemContext } from "./TreeItemContextProviter";
import useClick from "../../hooks/useClick";
import { setDragImage } from "../../utils/drag";
const BaseTreeItem = ({ label, children, selected, onCollapse, onExpand, onClick, onContextMenu, onDrop, myDraggingItem, draggable, expanded: expandedProp, expandable = !!children, outlined, IconComponent, height }) => {
    const expandIconStyle = {
        opacity: expandable ? 0.5 : 0.05,
        cursor: "pointer"
    };
    const [expanded, setExpanded] = useState(!!expandedProp);
    useEffect(() => {
        setExpanded(!!expandedProp);
    }, [expandedProp]);
    const startRef = useClick(onClick);
    const endRef = useRef(null);
    const highlightWidth = useMemo(() => {
        if (!selected || !startRef.current || !endRef.current)
            return;
        const boundsStart = startRef.current.getBoundingClientRect();
        const boundsEnd = endRef.current.getBoundingClientRect();
        return boundsEnd.right - boundsStart.left + 4;
    }, [selected, expanded]);
    const collapse = () => {
        setExpanded(false);
        onCollapse?.();
    };
    const expand = () => {
        setExpanded(true);
        onExpand?.();
    };
    const context = useContext(TreeItemContext);
    const canSetDragOver = () => draggable &&
        context.draggingItem &&
        context.draggingItem !== myDraggingItem;
    const [dragOver, setDragOver] = useState(false);
    return (_jsxs("div", { draggable: draggable, onDragStart: (e) => {
            e.stopPropagation();
            context.draggingItem = myDraggingItem;
            setDragImage(e);
        }, onDragEnd: (e) => {
            e.stopPropagation();
            context.draggingItem = undefined;
        }, onDragOver: (e) => {
            e.stopPropagation();
            e.preventDefault();
            canSetDragOver() && setDragOver(true);
        }, onDragEnter: (e) => {
            e.stopPropagation();
            e.preventDefault();
            canSetDragOver() && setDragOver(true);
        }, onDragLeave: (e) => {
            e.stopPropagation();
            canSetDragOver() && setDragOver(false);
        }, onDrop: (e) => {
            e.stopPropagation();
            if (!canSetDragOver())
                return;
            setDragOver(false);
            if (!context.draggingItem.traverseSome((child) => myDraggingItem === child))
                onDrop?.(context.draggingItem);
        }, style: {
            color: "rgba(255, 255, 255, 0.75)",
            marginLeft: 8,
            borderLeft: "1px solid rgba(255, 255, 255, 0.05)",
            background: dragOver ? "rgba(255, 255, 255, 0.5)" : "none"
        }, children: [_jsxs("div", { ref: startRef, onDblClick: (e) => {
                    e.stopPropagation();
                    expanded ? collapse() : expand();
                }, onContextMenu: (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onContextMenu?.();
                }, style: {
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: selected && !outlined
                        ? "rgba(255, 255, 255, 0.1)"
                        : undefined,
                    outline: selected && outlined
                        ? "1px solid rgba(255, 255, 255, 0.5)"
                        : undefined,
                    width: highlightWidth,
                    minWidth: "100%",
                    height
                }, children: [expanded ? (_jsx(CollapseIcon, { style: expandIconStyle, onClick: collapse })) : (_jsx(ExpandIcon, { style: expandIconStyle, onClick: expand })), IconComponent && _jsx(IconComponent, {}), _jsx("div", { ref: endRef, style: { whiteSpace: "nowrap" }, children: label })] }), expanded &&
                (typeof children === "function" ? children() : children)] }));
};
export default BaseTreeItem;
//# sourceMappingURL=BaseTreeItem.js.map