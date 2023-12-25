import { jsx as _jsx } from "preact/jsx-runtime";
import { APPBAR_HEIGHT, FRAME_WIDTH, PANELS_HEIGHT } from "../../globals";
import { getTimelineFrame } from "../../states/useTimelineFrame";
import { useEffect, useRef } from "preact/hooks";
import store, { createEffect } from "@lincode/reactivity";
import { timelineScrollLeftSignal } from "../../states/useTimelineScrollLeft";
const Needle = () => {
    const ref = useRef(null);
    useEffect(() => {
        const div = ref.current;
        if (!div)
            return;
        const [setTimelineScrollLeft, getTimelineScrollLeft] = store(timelineScrollLeftSignal.value);
        const unsubscribe = timelineScrollLeftSignal.subscribe(setTimelineScrollLeft);
        const handle = createEffect(() => {
            const frame = getTimelineFrame();
            const scrollLeft = getTimelineScrollLeft();
            div.style.left = `${-scrollLeft + frame * FRAME_WIDTH}px`;
        }, [getTimelineFrame, getTimelineScrollLeft]);
        return () => {
            handle.cancel();
            unsubscribe();
        };
    }, []);
    return (_jsx("div", { className: "lingo3d-absfull", style: {
            height: PANELS_HEIGHT,
            zIndex: 1,
            overflow: "hidden",
            pointerEvents: "none"
        }, children: _jsx("div", { ref: ref, style: {
                position: "absolute",
                top: 0,
                width: FRAME_WIDTH,
                height: APPBAR_HEIGHT,
                background: "white",
                opacity: 0.3
            }, children: _jsx("div", { style: {
                    width: 1,
                    height: PANELS_HEIGHT,
                    background: "white",
                    position: "absolute",
                    left: FRAME_WIDTH * 0.5
                } }) }) }));
};
export default Needle;
//# sourceMappingURL=Needle.js.map