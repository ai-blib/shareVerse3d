import ILightBase from "./ILightBase";
import { ExtractProps } from "./utils/extractProps";
export default interface IAreaLight extends ILightBase {
}
export declare const areaLightSchema: Required<ExtractProps<IAreaLight>>;
export declare const areaLightDefaults: Partial<import("./utils/Defaults").default<IAreaLight>>;
