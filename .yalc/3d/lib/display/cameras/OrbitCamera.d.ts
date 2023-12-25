import IOrbitCamera from "../../interface/IOrbitCamera";
import { PerspectiveCamera } from "three";
import OrbitCameraBase from "../core/OrbitCameraBase";
export default class OrbitCamera extends OrbitCameraBase implements IOrbitCamera {
    static componentName: string;
    static defaults: Partial<import("../../interface/utils/Defaults").default<IOrbitCamera>>;
    static schema: Required<import("../../interface/utils/extractProps").ExtractProps<IOrbitCamera>>;
    constructor(camera?: PerspectiveCamera);
    private enableZoomState;
    get enableZoom(): boolean;
    set enableZoom(val: boolean);
    private enableFlyState;
    get enableFly(): boolean;
    set enableFly(val: boolean);
    private autoRotateState;
    get autoRotate(): number | boolean;
    set autoRotate(val: number | boolean);
}
