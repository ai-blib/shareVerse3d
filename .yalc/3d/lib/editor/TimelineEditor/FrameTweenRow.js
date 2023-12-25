import { jsx as _jsx } from "preact/jsx-runtime";
import { memo } from "preact/compat";
import { useMemo } from "preact/hooks";
import { uuidMap } from "../../api/core/collections";
import TimelineAudio from "../../display/TimelineAudio";
import { FRAME_HEIGHT } from "../../globals";
import diffProps from "../utils/diffProps";
import AudioRow from "./AudioRow";
import FrameTween from "./FrameTween";
const FrameTweenRow = ({ frames, uuid }) => {
    const frameNums = useMemo(() => Object.keys(frames).map(Number), [frames]);
    const instance = useMemo(() => uuidMap.get(uuid.split(" ")[0]), [uuid]);
    if (!instance)
        return null;
    if (instance instanceof TimelineAudio)
        return _jsx(AudioRow, { instance: instance, frames: frames });
    return (_jsx("div", { style: { height: FRAME_HEIGHT }, children: frameNums.map((frameNum, index) => (_jsx(FrameTween, { frameNum: frameNum, frameNums: frameNums, index: index }, frameNum))) }));
};
export default memo(FrameTweenRow, diffProps);
//# sourceMappingURL=FrameTweenRow.js.map