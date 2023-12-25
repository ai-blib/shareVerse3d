import { ExtractProps } from "./utils/extractProps";
import IAnimationManager from "./IAnimationManager";
export default interface ITimeline extends IAnimationManager {
}
export declare const timelineSchema: Required<ExtractProps<ITimeline>>;
export declare const timelineDefaults: Partial<import("./utils/Defaults").default<ITimeline>>;
