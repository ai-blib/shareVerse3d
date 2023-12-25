import { OrthographicCamera as ThreeOrthographicCamera } from "three";
import { FAR, ORTHOGRAPHIC_FRUSTUM } from "../../globals";
import { getResolution } from "../../states/useResolution";
import CameraBase from "../core/CameraBase";
export default class OrthographicCamera
//@ts-ignore
 extends CameraBase {
    componentName = "orthographicCamera";
    static defaults = {};
    static schema = {};
    constructor(cam) {
        const [w, h] = getResolution();
        const aspect = w / h;
        super(cam ??
            new ThreeOrthographicCamera(aspect * ORTHOGRAPHIC_FRUSTUM * -0.5, aspect * ORTHOGRAPHIC_FRUSTUM * 0.5, ORTHOGRAPHIC_FRUSTUM * 0.5, ORTHOGRAPHIC_FRUSTUM * -0.5, -1, FAR));
    }
}
//# sourceMappingURL=OrthographicCamera.js.map