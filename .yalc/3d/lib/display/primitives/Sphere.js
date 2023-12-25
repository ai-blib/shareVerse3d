import { SphereGeometry } from "three";
import Primitive from "../core/Primitive";
import { radiusScaled } from "../../engine/constants";
export const sphereGeometry = new SphereGeometry(radiusScaled, 32, 32);
export default class Sphere extends Primitive {
    static componentName = "sphere";
    constructor() {
        super(sphereGeometry);
    }
}
//# sourceMappingURL=Sphere.js.map