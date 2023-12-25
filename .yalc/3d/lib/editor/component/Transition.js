import { useEffect, useState } from "preact/hooks";
const Transition = ({ children, mounted, delay = 1000 }) => {
    const [mountDelayed, setMountDelayed] = useState(mounted);
    const [enter, setEnter] = useState(true);
    useEffect(() => {
        if (mounted) {
            setMountDelayed(true);
            return;
        }
        const timeout = setTimeout(() => setMountDelayed(false), delay);
        return () => {
            clearTimeout(timeout);
        };
    }, [mounted, delay]);
    useEffect(() => {
        if (!mountDelayed) {
            setEnter(true);
            return;
        }
        const timeout = setTimeout(() => setEnter(false), 100);
        return () => {
            clearTimeout(timeout);
        };
    }, [mountDelayed]);
    if (!mountDelayed)
        return null;
    return children?.(enter);
};
export default Transition;
//# sourceMappingURL=Transition.js.map