import IObjectManager from "./IObjectManager";
import { ExtractProps } from "./utils/extractProps";
import Choices from "./utils/Choices";
import { ShadowResolution } from "../states/useShadowResolution";
import Nullable from "./utils/Nullable";
export default interface ILightBase extends IObjectManager {
    color: string;
    intensity: number;
    castShadow: boolean;
    shadowResolution: Nullable<ShadowResolution>;
    helper: boolean;
}
export declare const lightBaseSchema: Required<ExtractProps<ILightBase>>;
export declare const shadowResolutionChoices: Choices<string>;
export declare const lightBaseDefaults: Partial<import("./utils/Defaults").default<ILightBase>>;
