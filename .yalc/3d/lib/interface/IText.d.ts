import { ExtractProps } from "./utils/extractProps";
import IAppendable from "./IAppendable";
export default interface IText extends IAppendable {
    value: string;
    opacity: number;
}
export declare const textSchema: Required<ExtractProps<IText>>;
export declare const textDefaults: Partial<import("./utils/Defaults").default<IText>>;
