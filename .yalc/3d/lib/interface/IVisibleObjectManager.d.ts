import IObjectManager from "./IObjectManager";
import IVisible from "./IVisible";
import { ExtractProps } from "./utils/extractProps";
export default interface IVisibleObjectManager extends IObjectManager, IVisible {
}
export declare const visibleObjectManagerSchema: Required<ExtractProps<IVisibleObjectManager>>;
export declare const visibleObjectManagerDefaults: Partial<import("./utils/Defaults").default<IVisibleObjectManager>>;
