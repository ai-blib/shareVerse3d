import { OrthographicCamera as ThreeOrthographicCamera } from "three";
import ICamera from "../../interface/ICamera";
import CameraBase from "../core/CameraBase";
export default class OrthographicCamera extends CameraBase<ThreeOrthographicCamera> implements ICamera {
    componentName: string;
    static defaults: {};
    static schema: {};
    constructor(cam?: ThreeOrthographicCamera);
}
