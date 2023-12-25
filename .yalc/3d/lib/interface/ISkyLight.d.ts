import ILightBase from "./ILightBase";
import { ExtractProps } from "./utils/extractProps";
import { ShadowDistance } from "../states/useShadowDistance";
import Nullable from "./utils/Nullable";
export default interface ISkyLight extends ILightBase {
    groundColor: string;
    shadowDistance: Nullable<ShadowDistance>;
}
export declare const skyLightSchema: Required<ExtractProps<ISkyLight>>;
export declare const skyLightDefaults: Partial<import("./utils/Defaults").default<ISkyLight>>;
