import { ExtractProps } from "./utils/extractProps";
import Nullable from "./utils/Nullable";
import IAppendable from "./IAppendable";
export default interface IPositioned extends IAppendable {
    x: number;
    y: number;
    z: number;
    onMove: Nullable<() => void>;
}
export declare const positionedSchema: Required<ExtractProps<IPositioned>>;
export declare const positionedDefaults: Partial<import("./utils/Defaults").default<IPositioned>>;
