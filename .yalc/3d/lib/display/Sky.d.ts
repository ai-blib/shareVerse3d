import Appendable from "../api/core/Appendable";
import ISky from "../interface/ISky";
export default class Sky extends Appendable implements ISky {
    static componentName: string;
    static defaults: Partial<import("../interface/utils/Defaults").default<ISky>>;
    static schema: Required<import("../interface/utils/extractProps").ExtractProps<ISky>>;
    constructor();
}
