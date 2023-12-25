import IVisibleObjectManager from "./IVisibleObjectManager";
import { ExtractProps } from "./utils/extractProps";
import Nullable from "./utils/Nullable";
export default interface ILoaded extends IVisibleObjectManager {
    src: Nullable<string>;
    onLoad: Nullable<() => void>;
    boxVisible: boolean;
}
export declare const loadedSchema: Required<ExtractProps<ILoaded>>;
export declare const loadedDefaults: Partial<import("./utils/Defaults").default<ILoaded>>;
