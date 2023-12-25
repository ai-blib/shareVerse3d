import IAdjustMaterial from "./IAdjustMaterial";
import ILoaded from "./ILoaded";
import { ExtractProps } from "./utils/extractProps";
export default interface IModel extends ILoaded, IAdjustMaterial {
    resize: boolean;
}
export declare const modelSchema: Required<ExtractProps<IModel>>;
export declare const modelDefaults: Partial<import("./utils/Defaults").default<IModel>>;
