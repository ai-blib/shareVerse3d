import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import AppBar from "../component/bars/AppBar";
import IconButton from "../component/IconButton";
import useSyncState from "../hooks/useSyncState";
import { getTimeline } from "../../states/useTimeline";
import { decreaseTimelineFrame, firstTimelineFrame, increaseTimelineFrame, lastTimelineFrame } from "../../states/useTimelineFrame";
import { getTimelinePaused } from "../../states/useTimelinePaused";
import FirstFrameIcon from "./icons/FirstFrameIcon";
import LastFrameIcon from "./icons/LastFrameIcon";
import NextFrameIcon from "./icons/NextFrameIcon";
import PauseIcon from "../component/icons/PauseIcon";
import PlayIcon from "../component/icons/PlayIcon";
import PrevFrameIcon from "./icons/PrevFrameIcon";
import { getTimelineRecord, setTimelineRecord } from "../../states/useTimelineRecord";
import AudioIcon from "./icons/AudioIcon";
import { getTimelineMute, setTimelineMute } from "../../states/useTimelineMute";
import MuteIcon from "./icons/MuteIcon";
import { highlightFrame } from "./FrameIndicator";
const Controls = () => {
    const timeline = useSyncState(getTimeline);
    const paused = useSyncState(getTimelinePaused);
    const record = useSyncState(getTimelineRecord);
    const mute = useSyncState(getTimelineMute);
    return (_jsxs(AppBar, { noPadding: true, children: [paused ? (_jsx(IconButton, { outline: true, disabled: !timeline, onClick: timeline
                    ? () => {
                        if (timeline.frame >= timeline.totalFrames)
                            timeline.frame = 0;
                        highlightFrame();
                        timeline.paused = false;
                    }
                    : undefined, children: _jsx(PlayIcon, {}) })) : (_jsx(IconButton, { outline: true, disabled: !timeline, onClick: timeline
                    ? () => {
                        highlightFrame();
                        timeline.paused = true;
                    }
                    : undefined, children: _jsx(PauseIcon, {}) })), _jsx(IconButton, { outline: true, disabled: !timeline, onClick: decreaseTimelineFrame, children: _jsx(PrevFrameIcon, {}) }), _jsx(IconButton, { outline: true, disabled: !timeline, onClick: increaseTimelineFrame, children: _jsx(NextFrameIcon, {}) }), _jsx(IconButton, { outline: true, disabled: !timeline, onClick: firstTimelineFrame, children: _jsx(FirstFrameIcon, {}) }), _jsx(IconButton, { outline: true, disabled: !timeline, onClick: lastTimelineFrame, children: _jsx(LastFrameIcon, {}) }), _jsx(IconButton, { outline: true, disabled: !timeline, onClick: timeline
                    ? () => {
                        setTimelineRecord(!record);
                        highlightFrame();
                        timeline.paused = true;
                    }
                    : undefined, children: _jsx("div", { style: {
                        width: 10,
                        height: 10,
                        borderRadius: 10,
                        background: record ? "red" : "white"
                    } }) }), _jsx(IconButton, { outline: true, disabled: !timeline, onClick: () => setTimelineMute(!mute), children: mute ? _jsx(MuteIcon, {}) : _jsx(AudioIcon, {}) })] }));
};
export default Controls;
//# sourceMappingURL=Controls.js.map