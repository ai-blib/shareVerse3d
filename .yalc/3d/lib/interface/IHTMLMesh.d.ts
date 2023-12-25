import IVisibleObjectManager from "./IVisibleObjectManager";
import Defaults from "./utils/Defaults";
import { ExtractProps } from "./utils/extractProps";
import Nullable from "./utils/Nullable";
export default interface IHTMLMesh extends IVisibleObjectManager {
    element: Nullable<Element>;
    innerHTML: Nullable<string>;
    cssColor: string;
    sprite: boolean;
}
export declare const htmlMeshSchema: Required<ExtractProps<IHTMLMesh>>;
export declare const htmlMeshDefaults: Partial<Defaults<IHTMLMesh>>;
