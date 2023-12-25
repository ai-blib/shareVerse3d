import IBasicMaterialManager from "./IBasicMaterialManager";
import ITexturedStandard from "./ITexturedStandard";
import { ExtractProps } from "./utils/extractProps";
export default interface IStandardMaterialManager extends IBasicMaterialManager, ITexturedStandard {
}
export declare const standardMaterialManagerSchema: Required<ExtractProps<IStandardMaterialManager>>;
export declare const standardMaterialManagerDefaults: Partial<import("./utils/Defaults").default<IStandardMaterialManager>>;
