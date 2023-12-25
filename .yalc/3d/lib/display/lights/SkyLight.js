import { Color, HemisphereLight } from "three";
import LightBase, { mapShadowResolution } from "../core/LightBase";
import { skyLightDefaults, skyLightSchema } from "../../interface/ISkyLight";
import { Reactive } from "@lincode/reactivity";
import { CSM } from "three/examples/jsm/csm/CSM";
import scene from "../../engine/scene";
import { getCameraRendered } from "../../states/useCameraRendered";
import { onBeforeRender } from "../../events/onBeforeRender";
import { getShadowDistance } from "../../states/useShadowDistance";
import { assertExhaustive } from "@lincode/utils";
import { getShadowResolution } from "../../states/useShadowResolution";
import DirectionalLight from "./DirectionalLight";
import { hiddenAppendables } from "../../api/core/collections";
const mapCSMOptions = (val, shadowResolution) => {
    switch (val) {
        case "near":
            return {
                maxFar: 10,
                shadowMapSize: mapShadowResolution(shadowResolution) * 2,
                shadowBias: -0.000025
            };
        case "middle":
            return {
                maxFar: 30,
                shadowMapSize: mapShadowResolution(shadowResolution) * 2,
                shadowBias: -0.000055
            };
        case "far":
            return {
                maxFar: 100,
                shadowMapSize: mapShadowResolution(shadowResolution) * 4,
                shadowBias: -0.0001
            };
        default:
            assertExhaustive(val);
    }
};
export default class Skylight extends LightBase {
    static componentName = "skyLight";
    static defaults = skyLightDefaults;
    static schema = skyLightSchema;
    constructor() {
        super(HemisphereLight);
        this.createEffect(() => {
            if (!this.castShadowState.get()) {
                const directionalLight = new DirectionalLight();
                directionalLight.intensity = 0.5;
                this.append(directionalLight);
                hiddenAppendables.add(directionalLight);
                const handle = this.helperState.get((val) => (directionalLight.helper = val));
                return () => {
                    directionalLight.dispose();
                    handle.cancel();
                };
            }
            const csm = new CSM({
                ...mapCSMOptions(this.shadowDistanceState.get() ?? getShadowDistance(), this.shadowResolutionState.get() ?? getShadowResolution()),
                cascades: 1,
                parent: scene,
                camera: getCameraRendered(),
                lightIntensity: 0.5
            });
            const handle0 = onBeforeRender(() => {
                const lightDirection = this.outerObject3d.position
                    .clone()
                    .normalize()
                    .multiplyScalar(-1);
                csm.lightDirection = lightDirection;
                csm.update();
            });
            const handle1 = getCameraRendered((val) => {
                csm.camera = val;
            });
            return () => {
                handle0.cancel();
                handle1.cancel();
                csm.dispose();
                for (const light of csm.lights) {
                    light.dispose();
                    scene.remove(light);
                }
            };
        }, [
            this.castShadowState.get,
            this.shadowDistanceState.get,
            getShadowDistance,
            getShadowResolution
        ]);
    }
    shadowDistanceState = new Reactive(undefined);
    get shadowDistance() {
        return this.shadowDistanceState.get();
    }
    set shadowDistance(val) {
        this.shadowDistanceState.set(val);
    }
    get groundColor() {
        const light = this.lightState.get();
        if (!light)
            return "#ffffff";
        return "#" + light.groundColor.getHexString();
    }
    set groundColor(val) {
        // @ts-ignore
        this.cancelHandle("groundColor", () => this.lightState.get((light) => light && (light.groundColor = new Color(val))));
    }
}
//# sourceMappingURL=SkyLight.js.map