import IPrimitive from "./IPrimitive";
import { ExtractProps } from "./utils/extractProps";
export default interface IPlane extends IPrimitive {
}
export declare const planeSchema: Required<ExtractProps<IPlane>>;
export declare const planeDefaults: Partial<import("./utils/Defaults").default<IPlane>>;
