import ITimeline from "../interface/ITimeline";
import AnimationManager from "./core/AnimatedObjectManager/AnimationManager";
export default class Timeline extends AnimationManager implements ITimeline {
    static componentName: string;
    static defaults: Partial<import("../interface/utils/Defaults").default<ITimeline>>;
    static schema: Required<import("../interface/utils/extractProps").ExtractProps<ITimeline>>;
    constructor();
}
