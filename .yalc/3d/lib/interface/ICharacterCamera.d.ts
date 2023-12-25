import IOrbitCameraBase from "./IOrbitCameraBase";
import { ExtractProps } from "./utils/extractProps";
export type LockTargetRotationValue = boolean | "lock" | "follow" | "dynamic-lock" | "dynamic-follow";
export default interface ICharacterCamera extends IOrbitCameraBase {
    lockTargetRotation: LockTargetRotationValue;
}
export declare const characterCameraSchema: Required<ExtractProps<ICharacterCamera>>;
export declare const characterCameraDefaults: Partial<import("./utils/Defaults").default<ICharacterCamera>>;
