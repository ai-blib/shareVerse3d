import { useState, useLayoutEffect, useRef } from "preact/hooks";
export default () => {
    const ref = useRef(null);
    const [size, setSize] = useState({
        width: 0,
        height: 0
    });
    useLayoutEffect(() => {
        const div = ref.current;
        if (!div)
            return;
        const resizeObserver = new ResizeObserver(() => setSize({ width: div.clientWidth, height: div.clientHeight }));
        resizeObserver.observe(div);
        return () => {
            resizeObserver.disconnect();
        };
    }, []);
    return [ref, size];
};
//# sourceMappingURL=useResizeObserver.js.map