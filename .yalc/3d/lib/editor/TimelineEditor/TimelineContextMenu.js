import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { getExtensionType } from "@lincode/filetypes";
import { get, set } from "@lincode/utils";
import { useState } from "preact/hooks";
import { uuidMap } from "../../api/core/collections";
import Timeline from "../../display/Timeline";
import TimelineAudio from "../../display/TimelineAudio";
import { emitSelectionTarget } from "../../events/onSelectionTarget";
import { emitTimelineClearKeyframe } from "../../events/onTimelineClearKeyframe";
import unsafeGetValue from "../../utils/unsafeGetValue";
import ContextMenu from "../component/ContextMenu";
import ContextMenuItem from "../component/ContextMenu/ContextMenuItem";
import useSyncState from "../hooks/useSyncState";
import { setSceneGraphExpanded } from "../../states/useSceneGraphExpanded";
import { getTimeline, setTimeline } from "../../states/useTimeline";
import { getTimelineContextMenu, setTimelineContextMenu } from "../../states/useTimelineContextMenu";
import { processKeyframe } from "../../states/useTimelineData";
import { getTimelineFrame } from "../../states/useTimelineFrame";
const TimelineContextMenu = () => {
    const menu = useSyncState(getTimelineContextMenu);
    const [dataCopied, setDataCopied] = useState();
    const timeline = useSyncState(getTimeline);
    return (_jsxs(ContextMenu, { position: menu, setPosition: setTimelineContextMenu, input: menu?.create &&
            (menu.create === "audio" ? "Audio name" : "Timeline name"), onInput: (value) => {
            if (menu?.create === "audio") {
                const timeline = getTimeline();
                if (!timeline)
                    return;
                const audio = new TimelineAudio();
                audio.name = value;
                if (getExtensionType(value) === "audio")
                    audio.src = value;
                timeline.mergeData({ [audio.uuid]: {} });
                timeline.append(audio);
                setSceneGraphExpanded(new Set([timeline.outerObject3d]));
                emitSelectionTarget(audio);
                return;
            }
            const timeline = new Timeline();
            timeline.name = value;
            timeline.data = {};
            setTimeline(timeline);
            emitSelectionTarget(timeline);
        }, children: [_jsx(ContextMenuItem, { disabled: menu?.keyframe || !timeline, onClick: () => {
                    processKeyframe((timelineData, uuid, property, frame) => set(timelineData, [uuid, property, frame], unsafeGetValue(uuidMap.get(uuid), property)));
                    setTimelineContextMenu(undefined);
                }, children: "Add keyframe" }), _jsx(ContextMenuItem, { disabled: !menu?.keyframe, onClick: () => {
                    const data = {};
                    processKeyframe((timelineData, uuid, property, frame) => set(data, [uuid, property, "0"], get(timelineData, [uuid, property, frame])), true);
                    setDataCopied(data);
                    setTimelineContextMenu(undefined);
                }, children: "Copy keyframe" }), _jsx(ContextMenuItem, { disabled: !dataCopied, onClick: dataCopied
                    ? () => {
                        const data = {};
                        const frame = getTimelineFrame() + "";
                        for (const [uuid, properties] of Object.entries(dataCopied))
                            for (const [property, frames] of Object.entries(properties))
                                for (const value of Object.values(frames))
                                    set(data, [uuid, property, frame], value);
                        getTimeline()?.mergeData(data);
                        setTimelineContextMenu(undefined);
                    }
                    : undefined, children: "Paste keyframe" }), _jsx(ContextMenuItem, { disabled: !menu?.keyframe, onClick: () => {
                    emitTimelineClearKeyframe();
                    setTimelineContextMenu(undefined);
                }, children: "Clear keyframe" })] }));
};
export default TimelineContextMenu;
//# sourceMappingURL=TimelineContextMenu.js.map