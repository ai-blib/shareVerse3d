import { ShadowDistance } from "../states/useShadowDistance";
import ILightBase from "./ILightBase";
import Choices from "./utils/Choices";
import { ExtractProps } from "./utils/extractProps";
import Nullable from "./utils/Nullable";
export default interface IDirectionalLight extends ILightBase {
    shadowDistance: Nullable<ShadowDistance>;
}
export declare const directionalLightSchema: Required<ExtractProps<IDirectionalLight>>;
export declare const shadowDistanceChoices: Choices<string>;
export declare const directionalLightDefaults: Partial<import("./utils/Defaults").default<IDirectionalLight>>;
