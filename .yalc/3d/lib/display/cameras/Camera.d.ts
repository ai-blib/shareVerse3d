import ICamera from "../../interface/ICamera";
import CameraBase from "../core/CameraBase";
export default class Camera extends CameraBase implements ICamera {
    static componentName: string;
    static defaults: Partial<import("../../interface/utils/Defaults").default<ICamera>>;
    static schema: Required<import("../../interface/utils/extractProps").ExtractProps<ICamera>>;
    constructor();
}
