import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import AppBar from "../component/bars/AppBar";
import Button from "../component/Button";
import useSyncState from "../hooks/useSyncState";
import { getTimeline } from "../../states/useTimeline";
import { setTimelineContextMenu } from "../../states/useTimelineContextMenu";
import AddIcon from "./icons/AddIcon";
const TimelineBar = () => {
    const timeline = useSyncState(getTimeline);
    return (_jsxs(AppBar, { children: [_jsxs(Button, { onClick: (e) => setTimelineContextMenu({
                    x: e.clientX,
                    y: e.clientY,
                    create: "timeline"
                }), children: [_jsx(AddIcon, {}), "New timeline"] }), _jsxs(Button, { disabled: !timeline, onClick: (e) => setTimelineContextMenu({
                    x: e.clientX,
                    y: e.clientY,
                    create: "audio"
                }), children: [_jsx(AddIcon, {}), "Audio"] })] }));
};
export default TimelineBar;
//# sourceMappingURL=TimelineBar.js.map