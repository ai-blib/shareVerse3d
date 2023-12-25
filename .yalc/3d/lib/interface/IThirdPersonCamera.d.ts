import ICharacterCamera from "./ICharacterCamera";
import { ExtractProps } from "./utils/extractProps";
export default interface IThirdPersonCamera extends ICharacterCamera {
}
export declare const thirdPersonCameraSchema: Required<ExtractProps<IThirdPersonCamera>>;
export declare const thirdPersonCameraDefaults: Partial<import("./utils/Defaults").default<IThirdPersonCamera>>;
