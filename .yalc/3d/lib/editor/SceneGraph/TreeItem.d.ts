import { ComponentChildren } from "preact";
import Appendable from "../../api/core/Appendable";
export type TreeItemProps = {
    appendable: Appendable;
    children?: ComponentChildren;
    expandable?: boolean;
};
declare const TreeItem: ({ appendable, children, expandable }: TreeItemProps) => import("preact").JSX.Element;
export default TreeItem;
