import { PerspectiveCamera } from "three";
import { FAR, NEAR } from "../../globals";
import { cameraDefaults, cameraSchema } from "../../interface/ICamera";
import CameraBase from "../core/CameraBase";
export default class Camera extends CameraBase {
    static componentName = "camera";
    static defaults = cameraDefaults;
    static schema = cameraSchema;
    constructor() {
        super(new PerspectiveCamera(75, 1, NEAR, FAR));
    }
}
//# sourceMappingURL=Camera.js.map