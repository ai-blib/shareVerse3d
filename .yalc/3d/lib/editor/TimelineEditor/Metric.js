import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
// @ts-nocheck
import { memo } from "preact/compat";
import { FRAME2SEC, FRAME_WIDTH } from "../../globals";
const round = (num) => Math.round((num + Number.EPSILON) * 100) / 100;
const Metric = ({ index, style }) => {
    const rounded = round(index * 5 * FRAME2SEC);
    const showSeconds = (rounded * 100) % 5 === 0;
    return (_jsx("div", { style: style, children: _jsxs("div", { style: {
                opacity: showSeconds ? 0.75 : 0.65,
                marginLeft: FRAME_WIDTH * 0.5
            }, children: [_jsxs("div", { style: { display: "flex", fontSize: 10 }, children: [_jsx("div", { style: {
                                width: 1,
                                marginRight: 2,
                                height: showSeconds ? 16 : 12,
                                background: "white"
                            } }), index * 5] }), showSeconds && (_jsxs("div", { style: { fontSize: 9, opacity: 0.5 }, children: [rounded, "s"] }))] }) }));
};
export default memo(Metric, () => true);
//# sourceMappingURL=Metric.js.map