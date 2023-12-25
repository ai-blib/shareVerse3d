import ICameraBase from "./ICameraBase";
import { ExtractProps } from "./utils/extractProps";
export default interface ICamera extends ICameraBase {
}
export declare const cameraSchema: Required<ExtractProps<ICamera>>;
export declare const cameraDefaults: Partial<import("./utils/Defaults").default<ICamera>>;
