import ITexturedBasic from "./ITexturedBasic";
import ITexturedStandard from "./ITexturedStandard";
import IVisibleObjectManager from "./IVisibleObjectManager";
import { ExtractProps } from "./utils/extractProps";
export default interface IPrimitive extends IVisibleObjectManager, ITexturedBasic, ITexturedStandard {
}
export declare const primitiveSchema: Required<ExtractProps<IPrimitive>>;
export declare const primitiveDefaults: Partial<import("./utils/Defaults").default<IPrimitive>>;
