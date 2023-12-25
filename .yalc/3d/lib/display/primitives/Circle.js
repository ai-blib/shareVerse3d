import { CircleGeometry } from "three";
import Primitive from "../core/Primitive";
import { flatGeomScaleZ, radiusScaled } from "../../engine/constants";
import { circleDefaults, circleSchema } from "../../interface/ICircle";
const circleGeometry = new CircleGeometry(radiusScaled, 32);
export default class Circle extends Primitive {
    static componentName = "circle";
    static defaults = circleDefaults;
    static schema = circleSchema;
    constructor() {
        super(circleGeometry);
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
//# sourceMappingURL=Circle.js.map