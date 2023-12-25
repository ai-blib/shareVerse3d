import store, { createEffect } from "@lincode/reactivity";
import { onDispose } from "../events/onDispose";
export const [setTimeline, getTimeline] = store(undefined);
createEffect(() => {
    const timeline = getTimeline();
    if (!timeline)
        return;
    const handle = onDispose(
    // @ts-ignore
    (item) => item === timeline && setTimeline(undefined));
    return () => {
        handle.cancel();
    };
}, [getTimeline]);
//# sourceMappingURL=useTimeline.js.map