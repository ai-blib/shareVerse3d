import Appendable from "../api/core/Appendable";
import IText from "../interface/IText";
export default class Text extends Appendable implements IText {
    static componentName: string;
    static defaults: Partial<import("../interface/utils/Defaults").default<IText>>;
    static schema: Required<import("../interface/utils/extractProps").ExtractProps<IText>>;
    private el;
    constructor();
    get opacity(): number;
    set opacity(value: number);
    get value(): string;
    set value(value: string);
}
