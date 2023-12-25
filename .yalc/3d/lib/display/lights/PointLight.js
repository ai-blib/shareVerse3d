import { PointLight as ThreePointLight } from "three";
import { SHADOW_BIAS } from "../../globals";
import { pointLightDefaults, pointLightSchema } from "../../interface/IPointLight";
import LightBase from "../core/LightBase";
export default class PointLight extends LightBase {
    static componentName = "pointLight";
    static defaults = pointLightDefaults;
    static schema = pointLightSchema;
    constructor() {
        super(ThreePointLight);
        this.createEffect(() => {
            const light = this.lightState.get();
            if (!light)
                return;
            light.shadow.bias = SHADOW_BIAS * 0.15;
        }, [this.lightState.get]);
    }
    get decay() {
        const light = this.lightState.get();
        if (!light)
            return 1;
        return light.decay;
    }
    set decay(val) {
        // @ts-ignore
        this.cancelHandle("decay", () => this.lightState.get((light) => light && (light.decay = val)));
    }
    get distance() {
        const light = this.lightState.get();
        if (!light)
            return 0;
        return light.distance;
    }
    set distance(val) {
        // @ts-ignore
        this.cancelHandle("distance", () => this.lightState.get((light) => light && (light.distance = val)));
    }
}
//# sourceMappingURL=PointLight.js.map