import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { memo } from "preact/compat";
import { FRAME_WIDTH, FRAME_HEIGHT } from "../../globals";
const FrameGrid = () => {
    return (_jsxs("svg", { className: "lingo3d-absfull", width: "100%", height: "100%", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("defs", { children: _jsx("pattern", { id: "smallGrid", width: FRAME_WIDTH, height: FRAME_HEIGHT, patternUnits: "userSpaceOnUse", children: _jsx("path", { d: `M ${FRAME_WIDTH} 0 L 0 0 0 ${FRAME_HEIGHT}`, fill: "none", stroke: "rgba(255, 255, 255, 0.2)", strokeWidth: "0.5" }) }) }), _jsx("rect", { width: "100%", height: "100%", fill: "url(#smallGrid)" })] }));
};
export default memo(FrameGrid, () => true);
//# sourceMappingURL=FrameGrid.js.map