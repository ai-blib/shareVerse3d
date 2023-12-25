import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "preact/jsx-runtime";
import useInitCSS from "../hooks/useInitCSS";
import RulerBar from "./RulerBar";
import Scroller from "./Scroller";
import TimelineBar from "./TimelineBar";
import TimelineContextMenu from "./TimelineContextMenu";
import TimelineGraph from "./TimelineGraph";
const TimelineEditor = () => {
    useInitCSS();
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "lingo3d-ui lingo3d-bg lingo3d-panels", style: {
                    height: "100%",
                    width: "100%",
                    display: "flex"
                }, children: [_jsxs("div", { style: {
                            width: 200,
                            display: "flex",
                            flexDirection: "column"
                        }, children: [_jsx(TimelineBar, {}), _jsx("div", { style: { flexGrow: 1 }, children: _jsx(TimelineGraph, {}) })] }), _jsxs("div", { style: {
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column"
                        }, children: [_jsx(RulerBar, {}), _jsx("div", { style: { flexGrow: 1 }, children: _jsx(Scroller, {}) })] })] }), _jsx(TimelineContextMenu, {})] }));
};
export default TimelineEditor;
//# sourceMappingURL=index.js.map