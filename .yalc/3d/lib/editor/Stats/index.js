import { jsx as _jsx } from "preact/jsx-runtime";
import { createPortal, useLayoutEffect, useRef } from "preact/compat";
import { uiContainer } from "../../engine/renderLoop/renderSetup";
import { onAfterRender } from "../../events/onAfterRender";
import { onBeforeRender } from "../../events/onBeforeRender";
import StatsJS from "stats.js";
const Stats = ({ mode = "fps" }) => {
    const divRef = useRef(null);
    useLayoutEffect(() => {
        const div = divRef.current;
        if (!div)
            return;
        const stats = new StatsJS();
        stats.showPanel(mode === "fps" ? 0 : mode === "time" ? 1 : 2);
        div.appendChild(stats.dom);
        Object.assign(stats.dom.style, {
            position: "absolute",
            right: "0px",
            left: "auto"
        });
        const beforeHandle = onBeforeRender(() => stats.begin());
        const afterHandle = onAfterRender(() => stats.end());
        return () => {
            beforeHandle.cancel();
            afterHandle.cancel();
        };
    }, []);
    return createPortal(_jsx("div", { ref: divRef }), uiContainer);
};
export default Stats;
//# sourceMappingURL=index.js.map