import IVisibleObjectManager from "./IVisibleObjectManager";
import { ExtractProps } from "./utils/extractProps";
export default interface IReflector extends IVisibleObjectManager {
    resolution: number;
    blur: number;
    contrast: number;
    mirror: number;
}
export declare const reflectorSchema: Required<ExtractProps<IReflector>>;
export declare const reflectorDefaults: Partial<import("./utils/Defaults").default<IReflector>>;
