import store from "@lincode/reactivity";
import { highlightFrame } from "../editor/TimelineEditor/FrameIndicator";
import { emitTimelineSeekScrollLeft } from "../events/onTimelineSeekScrollLeft";
import { getTimeline } from "./useTimeline";
export const [setTimelineFrame, getTimelineFrame] = store(-1);
export const userSetTimelineFrame = (frame) => {
    const timeline = getTimeline();
    if (!timeline)
        return;
    setTimelineFrame((timeline.frame = typeof frame === "function" ? frame(timeline) : frame));
    highlightFrame();
    timeline.paused = true;
    emitTimelineSeekScrollLeft();
};
export const increaseTimelineFrame = () => userSetTimelineFrame(getTimelineFrame() + 1);
export const decreaseTimelineFrame = () => userSetTimelineFrame(Math.max(getTimelineFrame() - 1, 0));
export const firstTimelineFrame = () => userSetTimelineFrame(0);
export const lastTimelineFrame = () => userSetTimelineFrame((timeline) => timeline.clipTotalFrames);
getTimeline((timeline) => userSetTimelineFrame(timeline ? 0 : -1));
//# sourceMappingURL=useTimelineFrame.js.map