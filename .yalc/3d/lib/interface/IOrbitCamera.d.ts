import { ExtractProps } from "./utils/extractProps";
import IOrbitCameraBase from "./IOrbitCameraBase";
export default interface IOrbitCamera extends IOrbitCameraBase {
    enableZoom: boolean;
    enableFly: boolean;
    autoRotate: boolean | number;
}
export declare const orbitCameraSchema: Required<ExtractProps<IOrbitCamera>>;
export declare const orbitCameraDefaults: Partial<import("./utils/Defaults").default<IOrbitCamera>>;
