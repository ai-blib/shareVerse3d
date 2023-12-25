import { PlaneGeometry } from "three";
import IPlane from "../../interface/IPlane";
import Primitive from "../core/Primitive";
export declare const planeGeometry: PlaneGeometry;
export default class Plane extends Primitive implements IPlane {
    static componentName: string;
    static defaults: Partial<import("../../interface/utils/Defaults").default<IPlane>>;
    static schema: Required<import("../../interface/utils/extractProps").ExtractProps<IPlane>>;
    constructor();
    get depth(): number;
    set depth(_: number);
    get scaleZ(): number;
    set scaleZ(_: number);
}
