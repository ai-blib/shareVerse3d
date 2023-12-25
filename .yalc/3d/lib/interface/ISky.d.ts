import { ExtractProps } from "./utils/extractProps";
import IAppendable from "./IAppendable";
export default interface ISky extends IAppendable {
}
export declare const skySchema: Required<ExtractProps<ISky>>;
export declare const skyDefaults: Partial<import("./utils/Defaults").default<ISky>>;
