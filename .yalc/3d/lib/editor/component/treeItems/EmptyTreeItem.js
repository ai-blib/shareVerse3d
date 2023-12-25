import { jsx as _jsx } from "preact/jsx-runtime";
import { useContext, useState } from "preact/hooks";
import { TreeItemContext } from "./TreeItemContextProviter";
const EmptyTreeItem = ({ onDrop }) => {
    const [dragOver, setDragOver] = useState(false);
    const context = useContext(TreeItemContext);
    return (_jsx("div", { onDragOver: (e) => {
            e.stopPropagation();
            e.preventDefault();
            context.draggingItem && setDragOver(true);
        }, onDragEnter: (e) => {
            e.stopPropagation();
            e.preventDefault();
            context.draggingItem && setDragOver(true);
        }, onDragLeave: (e) => {
            e.stopPropagation();
            setDragOver(false);
        }, onDrop: (e) => {
            e.stopPropagation();
            setDragOver(false);
            context.draggingItem && onDrop?.(context.draggingItem);
        }, style: {
            background: dragOver ? "rgba(255, 255, 255, 0.5)" : "none",
            width: "100%",
            height: 18
        } }));
};
export default EmptyTreeItem;
//# sourceMappingURL=EmptyTreeItem.js.map