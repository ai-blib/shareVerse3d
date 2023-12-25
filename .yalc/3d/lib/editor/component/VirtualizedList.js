import { jsx as _jsx } from "preact/jsx-runtime";
import { signal } from "@preact/signals";
import { useLayoutEffect, useRef } from "preact/compat";
const VirtualizedList = ({ data, itemNum = data?.length ?? 0, itemHeight, containerWidth, containerHeight, RenderComponent, scrollSignal = signal(0), style }) => {
    const ref = useRef(null);
    useLayoutEffect(() => {
        const div = ref.current;
        if (div)
            return scrollSignal.subscribe((val) => (div.scrollTop = val));
    }, []);
    const innerHeight = itemNum * itemHeight;
    const startIndex = Math.floor(scrollSignal.value / itemHeight);
    const endIndex = Math.min(itemNum - 1, Math.floor((scrollSignal.value + containerHeight) / itemHeight));
    const items = [];
    for (let i = startIndex; i <= endIndex; ++i)
        items.push(_jsx(RenderComponent, { index: i, style: { position: "absolute", top: i * itemHeight }, data: data?.[i] }, i));
    return (_jsx("div", { ref: ref, style: {
            overflowY: "scroll",
            overflowX: "hidden",
            width: containerWidth,
            height: containerHeight,
            ...style
        }, onScroll: (e) => (scrollSignal.value = e.currentTarget.scrollTop), children: _jsx("div", { style: { position: "relative", height: innerHeight }, children: items }) }));
};
export default VirtualizedList;
//# sourceMappingURL=VirtualizedList.js.map