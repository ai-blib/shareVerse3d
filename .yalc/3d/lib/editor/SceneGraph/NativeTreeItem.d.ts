import { Bone, Object3D } from "three";
import { TreeItemProps } from "./TreeItem";
type NativeTreeItemProps = TreeItemProps & {
    object3d: Object3D | Bone;
};
declare const NativeTreeItem: ({ appendable, object3d }: NativeTreeItemProps) => import("preact").JSX.Element;
export default NativeTreeItem;
