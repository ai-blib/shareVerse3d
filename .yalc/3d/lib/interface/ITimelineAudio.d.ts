import { ExtractProps } from "./utils/extractProps";
import IAppendable from "./IAppendable";
import Nullable from "./utils/Nullable";
export default interface ITimelineAudio extends IAppendable {
    name: string;
    src: Nullable<string>;
}
export declare const timelineAudioSchema: Required<ExtractProps<ITimelineAudio>>;
export declare const timelineAudioDefaults: Partial<import("./utils/Defaults").default<ITimelineAudio>>;
