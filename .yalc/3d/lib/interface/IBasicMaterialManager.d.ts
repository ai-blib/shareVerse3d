import IAppendable from "./IAppendable";
import ITexturedBasic from "./ITexturedBasic";
import { ExtractProps } from "./utils/extractProps";
export default interface IBasicMaterialManager extends IAppendable, ITexturedBasic {
}
export declare const basicMaterialManagerSchema: Required<ExtractProps<IBasicMaterialManager>>;
export declare const basicMaterialManagerDefaults: Partial<import("./utils/Defaults").default<IBasicMaterialManager>>;
