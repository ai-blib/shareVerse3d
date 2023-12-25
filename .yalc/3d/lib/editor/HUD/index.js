import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import HotKey from "./HotKey";
import mainCamera from "../../engine/mainCamera";
import { createPortal } from "preact/compat";
import { uiContainer } from "../../engine/renderLoop/renderSetup";
import useInitCSS from "../hooks/useInitCSS";
import Spinner from "../component/Spinner";
import InfoScreen from "./InfoScreen";
import useSyncState from "../hooks/useSyncState";
import { getCameraRendered } from "../../states/useCameraRendered";
import { getLoadingUnpkgCount } from "../../states/useLoadingUnpkgCount";
import { getPaused } from "../../states/usePaused";
const HUD = () => {
    useInitCSS();
    const cameraRendered = useSyncState(getCameraRendered);
    const loadingUnpkgCount = useSyncState(getLoadingUnpkgCount);
    const paused = useSyncState(getPaused);
    return createPortal(_jsxs("div", { className: "lingo3d-ui lingo3d-absfull", style: { pointerEvents: "none", padding: 10 }, children: [_jsxs(InfoScreen, { mounted: !!loadingUnpkgCount, children: [_jsx(Spinner, { size: 14 }), "loading data from unpkg"] }), _jsx(InfoScreen, { mounted: paused, style: { background: "rgba(18, 19, 22, 0.75)" }, fadeIn: true, children: "paused" }), cameraRendered === mainCamera && (_jsxs("div", { style: { opacity: 0.5 }, children: [_jsx(HotKey, { hotkey: "\u21E7", description: "accelerate" }), _jsx(HotKey, { hotkey: "W", description: "move forward" }), _jsx(HotKey, { hotkey: "S", description: "move backwards" }), _jsx(HotKey, { hotkey: "A", description: "move left" }), _jsx(HotKey, { hotkey: "D", description: "move right" }), _jsx(HotKey, { hotkey: "\u2191", description: "move up" }), _jsx(HotKey, { hotkey: "\u2193", description: "move down" }), _jsx(HotKey, { hotkey: "C", description: "center selected" }), _jsx(HotKey, { hotkey: "\u232B", description: "delete selected" }), _jsxs("div", { style: { display: "flex", gap: 4 }, children: [_jsx(HotKey, { hotkey: "\u2318" }), _jsx(HotKey, { hotkey: "C", description: "copy selected" })] }), _jsxs("div", { style: { display: "flex", gap: 4 }, children: [_jsx(HotKey, { hotkey: "\u2318" }), _jsx(HotKey, { hotkey: "O", description: "open folder" })] }), _jsxs("div", { style: { display: "flex", gap: 4 }, children: [_jsx(HotKey, { hotkey: "\u2318" }), _jsx(HotKey, { hotkey: "S", description: "save scene" })] }), _jsx(HotKey, { hotkey: "G", description: "toggle grid" })] }))] }), uiContainer);
};
export default HUD;
//# sourceMappingURL=index.js.map