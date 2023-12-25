import IModel from "./IModel";
import { ExtractProps } from "./utils/extractProps";
import Nullable from "./utils/Nullable";
export type StrideMode = "aim" | "free";
export default interface IDummy extends IModel {
    spineName: Nullable<string>;
    preset: "default" | "rifle";
    strideForward: number;
    strideRight: number;
    strideMove: boolean;
    strideMode: StrideMode;
}
export declare const dummySchema: Required<ExtractProps<IDummy>>;
export declare const dummyDefaults: Partial<import("./utils/Defaults").default<IDummy>>;
