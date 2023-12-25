import { SpotLight as ThreeSpotLight, SpotLightHelper } from "three";
import LightBase from "../core/LightBase";
import { spotLightDefaults, spotLightSchema } from "../../interface/ISpotLight";
import { SHADOW_BIAS } from "../../globals";
import mainCamera from "../../engine/mainCamera";
import { getCameraRendered } from "../../states/useCameraRendered";
import HelperSprite from "../core/utils/HelperSprite";
export default class SpotLight extends LightBase {
    static componentName = "spotLight";
    static defaults = spotLightDefaults;
    static schema = spotLightSchema;
    targetSprite = new HelperSprite("target");
    constructor() {
        super(ThreeSpotLight, SpotLightHelper);
        this.createEffect(() => {
            const light = this.lightState.get();
            if (!light)
                return;
            light.shadow.bias = SHADOW_BIAS * 1.5;
            light.position.y = -0.01;
            this.targetSprite.outerObject3d.add(light.target);
            return () => {
                this.targetSprite.outerObject3d.remove(light.target);
            };
        }, [this.lightState.get]);
        this.targetSprite.scale = 0.25;
        this.watch(
        // @ts-ignore
        getCameraRendered((cam) => (this.targetSprite.visible = cam === mainCamera)));
        this.then(() => this.targetSprite.dispose());
    }
    get angle() {
        const light = this.lightState.get();
        if (!light)
            return 1;
        return light.angle;
    }
    set angle(val) {
        // @ts-ignore
        this.cancelHandle("angle", () => this.lightState.get((light) => light && (light.angle = val)));
    }
    get penumbra() {
        const light = this.lightState.get();
        if (!light)
            return 0;
        return light.penumbra;
    }
    set penumbra(val) {
        // @ts-ignore
        this.cancelHandle("penumbra", () => this.lightState.get((light) => light && (light.penumbra = val)));
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
    get targetX() {
        return this.targetSprite.x;
    }
    set targetX(val) {
        this.targetSprite.x = val;
    }
    get targetY() {
        return this.targetSprite.y;
    }
    set targetY(val) {
        this.targetSprite.y = val;
    }
    get targetZ() {
        return this.targetSprite.z;
    }
    set targetZ(val) {
        this.targetSprite.z = val;
    }
}
//# sourceMappingURL=SpotLight.js.map