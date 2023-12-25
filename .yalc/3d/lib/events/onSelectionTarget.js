import { event } from "@lincode/events";
import { createEffect } from "@lincode/reactivity";
import { throttleTrailing } from "@lincode/utils";
import { getSelectionTarget, setSelectionTarget } from "../states/useSelectionTarget";
import { onDispose } from "./onDispose";
const [_emitSelectionTarget, onSelectionTarget] = event();
export { onSelectionTarget };
export const emitSelectionTarget = throttleTrailing((target, rightClick, noDeselect) => _emitSelectionTarget({ target, rightClick, noDeselect }));
createEffect(() => {
    const target = getSelectionTarget();
    if (!target)
        return;
    // @ts-ignore
    const handle = onDispose(
    // @ts-ignore
    (item) => item === target && setSelectionTarget(undefined));
    return () => {
        handle.cancel();
    };
}, [getSelectionTarget]);
//# sourceMappingURL=onSelectionTarget.js.map