import IPositioned from "./IPositioned";
import { ExtractProps } from "./utils/extractProps";
import Nullable from "./utils/Nullable";
import MeshItem from "../display/core/MeshItem";
export default interface ITrigger extends IPositioned {
    onEnter: Nullable<(target: MeshItem) => void>;
    onExit: Nullable<() => void>;
    target: Nullable<string | Array<string> | MeshItem>;
    pad: boolean;
    radius: number;
    interval: number;
    helper: boolean;
}
export declare const triggerSchema: Required<ExtractProps<ITrigger>>;
export declare const triggerDefaults: Partial<import("./utils/Defaults").default<ITrigger>>;
