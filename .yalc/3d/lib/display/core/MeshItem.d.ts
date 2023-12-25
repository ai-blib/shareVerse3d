import PositionedItem from "../../api/core/PositionedItem";
import ObjectManager from "./ObjectManager";
import StaticObjectManager from "./StaticObjectManager";
import VisibleObjectManager from "./VisibleObjectManager";
type MeshItem = PositionedItem | StaticObjectManager | ObjectManager | VisibleObjectManager;
export default MeshItem;
export declare const isMeshItem: (item: any) => item is MeshItem;
