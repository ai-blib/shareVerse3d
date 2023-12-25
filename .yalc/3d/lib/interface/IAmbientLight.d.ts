import ILightBase from "./ILightBase";
import { ExtractProps } from "./utils/extractProps";
export default interface IAmbientLight extends ILightBase {
}
export declare const ambientLightSchema: Required<ExtractProps<IAmbientLight>>;
export declare const ambientLightDefaults: Partial<import("./utils/Defaults").default<IAmbientLight>>;
