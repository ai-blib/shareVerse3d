import IVisibleObjectManager from "./IVisibleObjectManager";
import { ExtractProps } from "./utils/extractProps";
export default interface IGroup extends IVisibleObjectManager {
}
export declare const groupSchema: Required<ExtractProps<IGroup>>;
export declare const groupDefaults: Partial<import("./utils/Defaults").default<IGroup>>;
