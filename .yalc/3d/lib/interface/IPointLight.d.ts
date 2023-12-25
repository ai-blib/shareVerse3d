import ILightBase from "./ILightBase";
import { ExtractProps } from "./utils/extractProps";
export default interface IPointLight extends ILightBase {
    decay: number;
    distance: number;
}
export declare const pointLightSchema: Required<ExtractProps<IPointLight>>;
export declare const pointLightDefaults: Partial<import("./utils/Defaults").default<IPointLight>>;
