import { DirectionalLight as ThreeDirectionalLight } from "three";
import IDirectionalLight from "../../interface/IDirectionalLight";
import { ShadowDistance } from "../../states/useShadowDistance";
import LightBase from "../core/LightBase";
export default class DirectionalLight extends LightBase<typeof ThreeDirectionalLight> implements IDirectionalLight {
    static componentName: string;
    static defaults: Partial<import("../../interface/utils/Defaults").default<IDirectionalLight>>;
    static schema: Required<import("../../interface/utils/extractProps").ExtractProps<IDirectionalLight>>;
    constructor();
    getWorldPosition(): import("@lincode/math").Point3d;
    private shadowDistanceState;
    get shadowDistance(): ShadowDistance | undefined;
    set shadowDistance(val: ShadowDistance | undefined);
}
