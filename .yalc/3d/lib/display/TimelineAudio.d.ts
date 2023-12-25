import Appendable from "../api/core/Appendable";
import ITimelineAudio from "../interface/ITimelineAudio";
export default class TimelineAudio extends Appendable implements ITimelineAudio {
    static componentName: string;
    static defaults: Partial<import("../interface/utils/Defaults").default<ITimelineAudio>>;
    static schema: Required<import("../interface/utils/extractProps").ExtractProps<ITimelineAudio>>;
    private audio;
    constructor();
    get name(): string;
    set name(val: string);
    private srcState;
    get src(): string | undefined;
    set src(value: string | undefined);
    private durationState;
    get duration(): number;
}
