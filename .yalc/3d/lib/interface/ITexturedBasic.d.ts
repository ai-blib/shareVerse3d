import { Point } from "@lincode/math";
import { ExtractProps } from "./utils/extractProps";
import Nullable from "./utils/Nullable";
export default interface ITexturedBasic {
    color: Nullable<string>;
    opacity: Nullable<number>;
    texture: Nullable<string | HTMLVideoElement>;
    videoTexture: Nullable<string | HTMLVideoElement>;
    alphaMap: Nullable<string>;
    textureRepeat: Nullable<Point | number>;
    textureFlipY: Nullable<boolean>;
    textureRotation: Nullable<number>;
}
export declare const texturedBasicSchema: Required<ExtractProps<ITexturedBasic>>;
export declare const texturedBasicDefaults: Partial<import("./utils/Defaults").default<ITexturedBasic>>;
