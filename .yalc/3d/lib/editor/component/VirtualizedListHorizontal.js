import { jsx as _jsx } from "preact/jsx-runtime";
import { signal } from "@preact/signals";
import { useLayoutEffect, useRef } from "preact/compat";
const VirtualizedListHorizontal = ({ data, itemNum = data?.length ?? 0, itemWidth, containerWidth, containerHeight, RenderComponent, scrollSignal = signal(0), style }) => {
    const ref = useRef(null);
    useLayoutEffect(() => {
        const div = ref.current;
        if (div)
            return scrollSignal.subscribe((val) => (div.scrollLeft = val));
    }, []);
    const innerWidth = itemNum * itemWidth;
    const startIndex = Math.floor(scrollSignal.value / itemWidth);
    const endIndex = Math.min(itemNum - 1, Math.floor((scrollSignal.value + containerWidth) / itemWidth));
    const items = [];
    for (let i = startIndex; i <= endIndex; ++i)
        items.push(_jsx(RenderComponent, { index: i, style: { position: "absolute", left: i * itemWidth }, data: data?.[i] }, i));
    return (_jsx("div", { ref: ref, style: {
            overflowX: "scroll",
            overflowY: "hidden",
            width: containerWidth,
            height: containerHeight + 4,
            ...style
        }, onScroll: (e) => (scrollSignal.value = e.currentTarget.scrollLeft), children: _jsx("div", { style: { position: "relative", width: innerWidth }, children: items }) }));
};
export default VirtualizedListHorizontal;
//# sourceMappingURL=VirtualizedListHorizontal.js.map