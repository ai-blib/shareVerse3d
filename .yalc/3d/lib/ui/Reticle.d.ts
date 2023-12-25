import Appendable from "../api/core/Appendable";
import IReticle from "../interface/IReticle";
export default class Reticle extends Appendable implements IReticle {
    static componentName: string;
    static defaults: Partial<import("../interface/utils/Defaults").default<IReticle>>;
    static schema: Required<import("../interface/utils/extractProps").ExtractProps<IReticle>>;
    constructor();
    private variantState;
    get variant(): 1 | 2 | 4 | 3;
    set variant(value: 1 | 2 | 4 | 3);
}
