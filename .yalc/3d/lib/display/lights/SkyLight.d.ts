import { HemisphereLight } from "three";
import LightBase from "../core/LightBase";
import ISkyLight from "../../interface/ISkyLight";
import { ShadowDistance } from "../../states/useShadowDistance";
export default class Skylight extends LightBase<typeof HemisphereLight> implements ISkyLight {
    static componentName: string;
    static defaults: Partial<import("../../interface/utils/Defaults").default<ISkyLight>>;
    static schema: Required<import("../../interface/utils/extractProps").ExtractProps<ISkyLight>>;
    constructor();
    private shadowDistanceState;
    get shadowDistance(): ShadowDistance | undefined;
    set shadowDistance(val: ShadowDistance | undefined);
    get groundColor(): string;
    set groundColor(val: string);
}
