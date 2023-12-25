import { ExtractProps } from "./utils/extractProps";
import Nullable from "./utils/Nullable";
export default interface ITexturedStandard {
    wireframe: Nullable<boolean>;
    envMap: Nullable<string>;
    envMapIntensity: Nullable<number>;
    aoMap: Nullable<string>;
    aoMapIntensity: Nullable<number>;
    bumpMap: Nullable<string>;
    bumpScale: Nullable<number>;
    displacementMap: Nullable<string>;
    displacementScale: Nullable<number>;
    displacementBias: Nullable<number>;
    emissive: Nullable<boolean>;
    emissiveIntensity: Nullable<number>;
    lightMap: Nullable<string>;
    lightMapIntensity: Nullable<number>;
    metalnessMap: Nullable<string>;
    metalness: Nullable<number>;
    roughnessMap: Nullable<string>;
    roughness: Nullable<number>;
    normalMap: Nullable<string>;
    normalScale: Nullable<number>;
}
export declare const texturedStandardSchema: Required<ExtractProps<ITexturedStandard>>;
export declare const texturedStandardDefaults: Partial<import("./utils/Defaults").default<ITexturedStandard>>;
