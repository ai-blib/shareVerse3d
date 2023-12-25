import { ComponentChildren } from "preact";
export type BaseTreeItemProps = {
    label?: string;
    selected?: boolean;
    children?: ComponentChildren;
    onCollapse?: () => void;
    onExpand?: () => void;
    onClick?: () => void;
    onContextMenu?: () => void;
    onDrop?: (draggingItem?: any) => void;
    myDraggingItem?: any;
    draggable?: boolean;
    expanded?: boolean;
    expandable?: boolean;
    outlined?: boolean;
    IconComponent?: any;
    height?: number;
};
declare const BaseTreeItem: ({ label, children, selected, onCollapse, onExpand, onClick, onContextMenu, onDrop, myDraggingItem, draggable, expanded: expandedProp, expandable, outlined, IconComponent, height }: BaseTreeItemProps) => import("preact").JSX.Element;
export default BaseTreeItem;