import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import IconButton from "../component/IconButton";
import PlayIcon from "../component/icons/PlayIcon";
import PauseIcon from "../component/icons/PauseIcon";
import useSyncState from "../hooks/useSyncState";
import { getEditorModeComputed } from "../../states/useEditorModeComputed";
import { setEditorMode } from "../../states/useEditorMode";
const Controls = () => {
    const mode = useSyncState(getEditorModeComputed);
    return (_jsx("div", { style: { display: "flex", gap: 10 }, children: _jsxs("div", { style: { display: "flex" }, children: [_jsx(IconButton, { fill: true, disabled: mode === "play", onClick: () => setEditorMode("play"), children: _jsx(PlayIcon, {}) }), _jsx(IconButton, { fill: true, disabled: mode !== "play", onClick: () => setEditorMode("translate"), children: _jsx(PauseIcon, {}) })] }) }));
};
export default Controls;
//# sourceMappingURL=Controls.js.map