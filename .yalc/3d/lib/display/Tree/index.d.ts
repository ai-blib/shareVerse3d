import ITree from "../../interface/ITree";
import Model from "../Model";
export default class Tree extends Model implements ITree {
    static componentName: string;
    static defaults: Partial<import("../../interface/utils/Defaults").default<ITree>>;
    static schema: Required<import("../../interface/utils/extractProps").ExtractProps<ITree>>;
    constructor();
    private _preset;
    get preset(): string;
    set preset(val: string);
}
