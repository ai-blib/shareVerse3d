import IPrimitive from "./IPrimitive";
import { ExtractProps } from "./utils/extractProps";
export default interface ICircle extends IPrimitive {
}
export declare const circleSchema: Required<ExtractProps<ICircle>>;
export declare const circleDefaults: Partial<import("./utils/Defaults").default<ICircle>>;
