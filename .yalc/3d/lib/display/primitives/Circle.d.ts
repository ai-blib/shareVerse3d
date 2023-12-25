import Primitive from "../core/Primitive";
import ICircle from "../../interface/ICircle";
export default class Circle extends Primitive implements ICircle {
    static componentName: string;
    static defaults: Partial<import("../../interface/utils/Defaults").default<ICircle>>;
    static schema: Required<import("../../interface/utils/extractProps").ExtractProps<ICircle>>;
    constructor();
    get depth(): number;
    set depth(_: number);
    get scaleZ(): number;
    set scaleZ(_: number);
}
