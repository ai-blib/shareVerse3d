import ILightBase from "./ILightBase";
import { ExtractProps } from "./utils/extractProps";
export default interface ISpotLight extends ILightBase {
    angle: number;
    penumbra: number;
    decay: number;
    distance: number;
    targetX: number;
    targetY: number;
    targetZ: number;
}
export declare const spotLightSchema: Required<ExtractProps<ISpotLight>>;
export declare const spotLightDefaults: Partial<import("./utils/Defaults").default<ISpotLight>>;
