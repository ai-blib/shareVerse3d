import ILoaded from "./ILoaded";
import ITexturedBasic from "./ITexturedBasic";
import ITexturedStandard from "./ITexturedStandard";
import { ExtractProps } from "./utils/extractProps";
import Nullable from "./utils/Nullable";
export default interface ISvgMesh extends ILoaded, ITexturedBasic, ITexturedStandard {
    innerHTML: Nullable<string>;
}
export declare const svgMeshSchema: Required<ExtractProps<ISvgMesh>>;
export declare const svgMeshDefaults: Partial<import("./utils/Defaults").default<ISvgMesh>>;
