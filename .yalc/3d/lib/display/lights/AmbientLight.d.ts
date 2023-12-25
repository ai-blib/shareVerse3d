import { AmbientLight as ThreeAmbientLight } from "three";
import LightBase from "../core/LightBase";
import IAmbientLight from "../../interface/IAmbientLight";
export default class AmbientLight extends LightBase<typeof ThreeAmbientLight> implements IAmbientLight {
    static componentName: string;
    static defaults: Partial<import("../../interface/utils/Defaults").default<IAmbientLight>>;
    static schema: Required<import("../../interface/utils/extractProps").ExtractProps<IAmbientLight>>;
    constructor();
}
