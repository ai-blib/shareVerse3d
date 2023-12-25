import { PlaneGeometry } from "three";
import { diameterScaled, flatGeomScaleZ } from "../../engine/constants";
import { planeDefaults, planeSchema } from "../../interface/IPlane";
import Primitive from "../core/Primitive";
export const planeGeometry = new PlaneGeometry(diameterScaled, diameterScaled, 1, 1);
export default class Plane extends Primitive {
    static componentName = "plane";
    static defaults = planeDefaults;
    static schema = planeSchema;
    constructor() {
        super(planeGeometry);
        this.object3d.scale.z = flatGeomScaleZ;
    }
    get depth() {
        return 0;
    }
    set depth(_) { }
    get scaleZ() {
        return 0;
    }
    set scaleZ(_) { }
}
//# sourceMappingURL=Plane.js.map