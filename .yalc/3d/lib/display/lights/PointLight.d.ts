import { PointLight as ThreePointLight } from "three";
import IPointLight from "../../interface/IPointLight";
import LightBase from "../core/LightBase";
export default class PointLight extends LightBase<typeof ThreePointLight> implements IPointLight {
    static componentName: string;
    static defaults: Partial<import("../../interface/utils/Defaults").default<IPointLight>>;
    static schema: Required<import("../../interface/utils/extractProps").ExtractProps<IPointLight>>;
    constructor();
    get decay(): number;
    set decay(val: number);
    get distance(): number;
    set distance(val: number);
}
