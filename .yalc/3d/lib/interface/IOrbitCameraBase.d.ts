import ICameraBase from "./ICameraBase";
import { ExtractProps } from "./utils/extractProps";
import Nullable from "./utils/Nullable";
import MeshItem from "../display/core/MeshItem";
export default interface IOrbitCameraBase extends ICameraBase {
    target: Nullable<string | MeshItem>;
}
export declare const orbitCameraBaseSchema: Required<ExtractProps<IOrbitCameraBase>>;
export declare const orbitCameraBaseDefaults: Partial<import("./utils/Defaults").default<IOrbitCameraBase>>;
