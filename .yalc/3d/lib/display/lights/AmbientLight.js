import { AmbientLight as ThreeAmbientLight } from "three";
import LightBase from "../core/LightBase";
import { ambientLightDefaults, ambientLightSchema } from "../../interface/IAmbientLight";
export default class AmbientLight extends LightBase {
    static componentName = "ambientLight";
    static defaults = ambientLightDefaults;
    static schema = ambientLightSchema;
    constructor() {
        super(ThreeAmbientLight);
    }
}
//# sourceMappingURL=AmbientLight.js.map