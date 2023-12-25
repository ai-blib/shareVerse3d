import Model from "../../display/Model";
import { TreeItemProps } from "./TreeItem";
type ModelTreeItemProps = TreeItemProps & {
    appendable: Model;
};
declare const ModelTreeItem: ({ appendable }: ModelTreeItemProps) => import("preact").JSX.Element;
export default ModelTreeItem;
