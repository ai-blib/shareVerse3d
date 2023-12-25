import { SpotLight as ThreeSpotLight } from "three";
import LightBase from "../core/LightBase";
import ISpotLight from "../../interface/ISpotLight";
export default class SpotLight extends LightBase<typeof ThreeSpotLight> implements ISpotLight {
    static componentName: string;
    static defaults: Partial<import("../../interface/utils/Defaults").default<ISpotLight>>;
    static schema: Required<import("../../interface/utils/extractProps").ExtractProps<ISpotLight>>;
    private targetSprite;
    constructor();
    get angle(): number;
    set angle(val: number);
    get penumbra(): number;
    set penumbra(val: number);
    get decay(): number;
    set decay(val: number);
    get distance(): number;
    set distance(val: number);
    get targetX(): number;
    set targetX(val: number);
    get targetY(): number;
    set targetY(val: number);
    get targetZ(): number;
    set targetZ(val: number);
}
