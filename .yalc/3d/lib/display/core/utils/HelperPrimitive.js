import { hiddenAppendables } from "../../../api/core/collections";
import { positionedDefaults, positionedSchema } from "../../../interface/IPositioned";
import Primitive from "../Primitive";
//@ts-ignore
export default class HelperPrimitive extends Primitive {
    static componentName = "helper";
    static defaults = positionedDefaults;
    static schema = positionedSchema;
    constructor(geometry) {
        super(geometry);
        hiddenAppendables.add(this);
        this.opacity = 0.5;
        this.castShadow = false;
        this.receiveShadow = false;
    }
}
//# sourceMappingURL=HelperPrimitive.js.map