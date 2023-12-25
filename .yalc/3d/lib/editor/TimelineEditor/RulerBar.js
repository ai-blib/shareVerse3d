import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import AppBar from "../component/bars/AppBar";
import useResizeObserver from "../hooks/useResizeObserver";
import useSyncState from "../hooks/useSyncState";
import { getTimeline } from "../../states/useTimeline";
import Needle from "./Needle";
import Ruler from "./Ruler";
const RulerBar = () => {
    const [ref, { width }] = useResizeObserver();
    const timeline = useSyncState(getTimeline);
    return (_jsx(AppBar, { children: _jsxs("div", { ref: ref, className: "lingo3d-absfull", style: { opacity: timeline ? 1 : 0.2 }, children: [_jsx(Ruler, { width: width }), _jsx(Needle, {})] }) }));
};
export default RulerBar;
//# sourceMappingURL=RulerBar.js.map