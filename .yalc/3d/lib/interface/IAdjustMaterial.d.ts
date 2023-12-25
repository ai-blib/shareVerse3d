import { ExtractProps } from "./utils/extractProps";
import Nullable from "./utils/Nullable";
export default interface IAdjustMaterial {
    metalnessFactor: Nullable<number>;
    roughnessFactor: Nullable<number>;
    opacityFactor: Nullable<number>;
    envFactor: Nullable<number>;
    reflection: boolean;
}
export declare const adjustMaterialSchema: Required<ExtractProps<IAdjustMaterial>>;
export declare const adjustMaterialDefaults: Partial<import("./utils/Defaults").default<IAdjustMaterial>>;
