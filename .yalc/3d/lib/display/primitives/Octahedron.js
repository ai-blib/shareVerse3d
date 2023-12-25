import { OctahedronGeometry } from "three";
import { radiusScaled } from "../../engine/constants";
import Primitive from "../core/Primitive";
const geometry = new OctahedronGeometry(radiusScaled);
export default class Octahedron extends Primitive {
    static componentName = "octahedron";
    constructor() {
        super(geometry);
    }
}
//# sourceMappingURL=Octahedron.js.map