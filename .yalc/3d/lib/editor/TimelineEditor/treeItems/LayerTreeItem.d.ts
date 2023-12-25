import { ComponentChildren } from "preact";
type LayerTreeItemProps = {
    children: ComponentChildren;
    uuid: string;
};
declare const LayerTreeItem: ({ children, uuid }: LayerTreeItemProps) => import("preact").JSX.Element;
export default LayerTreeItem;
