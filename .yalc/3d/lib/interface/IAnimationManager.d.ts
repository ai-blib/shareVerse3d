import { ExtractProps } from "./utils/extractProps";
import IAppendable from "./IAppendable";
import Nullable from "./utils/Nullable";
export type FrameValue = number | boolean;
export type FrameData = Record<number, //frame number
FrameValue>;
export type AnimationData = Record<string, //uuid
Record<string, //property name
FrameData>>;
export default interface IAimationManager extends IAppendable {
    paused: boolean;
    data: Nullable<AnimationData>;
    name: string;
}
export declare const animationManagerSchema: Required<ExtractProps<IAimationManager>>;
export declare const animationManagerDefaults: Partial<import("./utils/Defaults").default<IAimationManager>>;
