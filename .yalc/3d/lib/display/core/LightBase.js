import { Reactive } from "@lincode/reactivity";
import { assertExhaustive } from "@lincode/utils";
import mainCamera from "../../engine/mainCamera";
import scene from "../../engine/scene";
import { onBeforeRender } from "../../events/onBeforeRender";
import { SHADOW_BIAS } from "../../globals";
import { getCameraRendered } from "../../states/useCameraRendered";
import { getShadowResolution } from "../../states/useShadowResolution";
import ObjectManager from "./ObjectManager";
import { addSelectionHelper } from "./StaticObjectManager/raycast/selectionCandidates";
import HelperSprite from "./utils/HelperSprite";
export const mapShadowResolution = (val) => {
    switch (val) {
        case "low":
            return 256;
        case "medium":
            return 512;
        case "high":
            return 1024;
        default:
            assertExhaustive(val);
    }
};
export default class LightBase extends ObjectManager {
    lightState = new Reactive(undefined);
    constructor(Light, Helper) {
        super();
        this.createEffect(() => {
            const light = new Light();
            this.lightState.set(light);
            this.object3d.add(light);
            if (light.shadow && this.castShadowState.get()) {
                light.castShadow = true;
                light.shadow.bias = SHADOW_BIAS;
                light.shadow.mapSize.setScalar(mapShadowResolution(this.shadowResolutionState.get() ??
                    getShadowResolution()));
            }
            return () => {
                this.object3d.remove(light);
                light.dispose();
            };
        }, [
            this.castShadowState.get,
            this.shadowResolutionState.get,
            getShadowResolution
        ]);
        this.createEffect(() => {
            const light = this.lightState.get();
            if (getCameraRendered() !== mainCamera ||
                !this.helperState.get() ||
                !light)
                return;
            const sprite = new HelperSprite("light");
            const handle = addSelectionHelper(sprite, this);
            if (Helper) {
                const helper = new Helper(light);
                scene.add(helper);
                helper.add(sprite.outerObject3d);
                if ("update" in helper)
                    // @ts-ignore
                    handle.watch(onBeforeRender(() => helper.update()));
                handle.then(() => {
                    helper.dispose();
                    scene.remove(helper);
                });
            }
            return () => {
                handle.cancel();
            };
        }, [getCameraRendered, this.helperState.get, this.lightState.get]);
    }
    helperState = new Reactive(true);
    get helper() {
        return this.helperState.get();
    }
    set helper(val) {
        this.helperState.set(val);
    }
    castShadowState = new Reactive(false);
    get castShadow() {
        return this.castShadowState.get();
    }
    set castShadow(val) {
        this.castShadowState.set(val);
    }
    shadowResolutionState = new Reactive(undefined);
    get shadowResolution() {
        return this.shadowResolutionState.get();
    }
    set shadowResolution(val) {
        this.shadowResolutionState.set(val);
    }
    get color() {
        const light = this.lightState.get();
        if (!light)
            return "#ffffff";
        return "#" + light.color.getHexString();
    }
    set color(val) {
        // @ts-ignore
        this.cancelHandle("color", () => this.lightState.get((light) => light?.color.set(val)));
    }
    get intensity() {
        const light = this.lightState.get();
        if (!light)
            return 1;
        return light.intensity;
    }
    set intensity(val) {
        // @ts-ignore
        this.cancelHandle("intensity", () => this.lightState.get((light) => light && (light.intensity = val)));
    }
}
//# sourceMappingURL=LightBase.js.map