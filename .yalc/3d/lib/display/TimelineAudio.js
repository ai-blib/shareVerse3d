import { Reactive } from "@lincode/reactivity";
import Appendable from "../api/core/Appendable";
import { emitName } from "../events/onName";
import { timelineAudioDefaults, timelineAudioSchema } from "../interface/ITimelineAudio";
export default class TimelineAudio extends Appendable {
    static componentName = "timelineAudio";
    static defaults = timelineAudioDefaults;
    static schema = timelineAudioSchema;
    audio = new Audio();
    constructor() {
        super();
        this.audio.ondurationchange = () => this.durationState.set(this.audio.duration);
    }
    get name() {
        return this.outerObject3d.name;
    }
    set name(val) {
        this.outerObject3d.name = val;
        emitName(this);
    }
    srcState = new Reactive(undefined);
    get src() {
        return this.srcState.get();
    }
    set src(value) {
        this.srcState.set(value);
        this.audio.src = value ?? "";
        this.durationState.set(0);
    }
    durationState = new Reactive(0);
    get duration() {
        return this.durationState.get();
    }
}
//# sourceMappingURL=TimelineAudio.js.map