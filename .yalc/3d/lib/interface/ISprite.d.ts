import ITexturedBasic from "./ITexturedBasic";
import IVisibleObjectManager from "./IVisibleObjectManager";
import { ExtractProps } from "./utils/extractProps";
export default interface ISprite extends IVisibleObjectManager, ITexturedBasic {
}
export declare const spriteSchema: Required<ExtractProps<ISprite>>;
export declare const spriteDefaults: Partial<import("./utils/Defaults").default<ISprite>>;
