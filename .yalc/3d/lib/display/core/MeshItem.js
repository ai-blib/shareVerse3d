import { isPositionedItem } from "../../api/core/PositionedItem";
import StaticObjectManager from "./StaticObjectManager";
export const isMeshItem = (item) => !!item && (isPositionedItem(item) || item instanceof StaticObjectManager);
//# sourceMappingURL=MeshItem.js.map