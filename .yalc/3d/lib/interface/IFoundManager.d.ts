import ISimpleObjectManager from "./ISimpleObjectManager";
import ITexturedBasic from "./ITexturedBasic";
import ITexturedStandard from "./ITexturedStandard";
import IVisible from "./IVisible";
import { ExtractProps } from "./utils/extractProps";
export default interface IFoundManager extends ISimpleObjectManager, ITexturedBasic, ITexturedStandard, IVisible {
}
export declare const foundManagerSchema: Required<ExtractProps<IFoundManager>>;
export declare const foundManagerDefaults: Partial<import("./utils/Defaults").default<IFoundManager>>;
