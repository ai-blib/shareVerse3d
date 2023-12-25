import { BufferGeometry } from "three";
import Primitive from "../Primitive";
export default abstract class HelperPrimitive extends Primitive {
    static componentName: string;
    static defaults: Partial<import("../../../interface/utils/Defaults").default<import("../../../interface/IPositioned").default>>;
    static schema: Required<import("../../../interface/utils/extractProps").ExtractProps<import("../../../interface/IPositioned").default>>;
    constructor(geometry: BufferGeometry);
}
