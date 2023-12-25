import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import CloseableTab from "../component/tabs/CloseableTab";
import AppBar from "../component/bars/AppBar";
import useInitCSS from "../hooks/useInitCSS";
import FileBrowser from "../FileBrowser";
import { useEffect } from "preact/hooks";
import TimelineEditor from "../TimelineEditor";
import { PANELS_HEIGHT } from "../../globals";
import { getTimeline, setTimeline } from "../../states/useTimeline";
import { useSignal } from "@preact/signals";
import Controls from "../TimelineEditor/Controls";
import useSyncState from "../hooks/useSyncState";
import { getFileBrowser, setFileBrowser } from "../../states/useFileBrowser";
const Panels = () => {
    useInitCSS();
    const fileBrowser = useSyncState(getFileBrowser);
    const timeline = useSyncState(getTimeline);
    const selectedSignal = useSignal(undefined);
    useEffect(() => {
        if (fileBrowser)
            selectedSignal.value = "files";
    }, [fileBrowser]);
    useEffect(() => {
        if (timeline)
            selectedSignal.value = "timeline";
    }, [timeline]);
    // if (!fileBrowser && !timeline) return null
    return (_jsxs("div", { className: "lingo3d-ui lingo3d-bg lingo3d-panels", style: {
            height: PANELS_HEIGHT,
            width: "100%",
            display: "flex",
            flexDirection: "column"
        }, children: [_jsxs("div", { style: { display: "flex" }, children: [_jsxs(AppBar, { selectedSignal: selectedSignal, style: { width: 200 }, children: [_jsx(CloseableTab, { onClose: timeline ? () => setTimeline(undefined) : undefined, children: "timeline" }), _jsx(CloseableTab, { disabled: !fileBrowser, onClose: () => setFileBrowser(false), children: "files" })] }), _jsx("div", { style: { flexGrow: 1 }, children: selectedSignal.value !== "files" && _jsx(Controls, {}) })] }), _jsx("div", { style: { flexGrow: 1 }, children: selectedSignal.value === "files" ? (_jsx(FileBrowser, {})) : (_jsx(TimelineEditor, {})) })] }));
};
export default Panels;
//# sourceMappingURL=index.js.map