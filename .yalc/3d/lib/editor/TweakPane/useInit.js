import { useRef, useEffect } from "preact/hooks";
export default () => {
    const elRef = useRef(null);
    useEffect(() => {
        const el = elRef.current;
        if (!el)
            return;
        const stop = (e) => e.stopPropagation();
        el.addEventListener("mousedown", stop);
        el.addEventListener("pointerdown", stop);
        el.addEventListener("touchstart", stop);
        el.addEventListener("keydown", stop);
        return () => {
            el.removeEventListener("mousedown", stop);
            el.removeEventListener("pointerdown", stop);
            el.removeEventListener("touchstart", stop);
            el.removeEventListener("keydown", stop);
        };
    }, []);
    return elRef;
};
//# sourceMappingURL=useInit.js.map