import { ExtractProps } from "./utils/extractProps";
import IAppendable from "./IAppendable";
export default interface IReticle extends IAppendable {
    variant: 1 | 2 | 3 | 4;
}
export declare const reticleSchema: Required<ExtractProps<IReticle>>;
export declare const reticleDefaults: Partial<import("./utils/Defaults").default<IReticle>>;
