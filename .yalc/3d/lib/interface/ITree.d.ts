import IModel from "./IModel";
import { ExtractProps } from "./utils/extractProps";
export default interface ITree extends IModel {
    preset: string;
}
export declare const treeSchema: Required<ExtractProps<ITree>>;
export declare const treeDefaults: Partial<import("./utils/Defaults").default<ITree>>;
