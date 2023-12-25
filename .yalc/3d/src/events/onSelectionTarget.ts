import { event } from "@lincode/events"
import { createEffect } from "@lincode/reactivity"
import { throttleTrailing } from "@lincode/utils"
import Appendable from "../api/core/Appendable"
import {
    getSelectionTarget,
    setSelectionTarget
} from "../states/useSelectionTarget"
import { onDispose } from "./onDispose"

type Event = {
    target?: Appendable
    rightClick?: boolean
    noDeselect?: boolean
}
const [_emitSelectionTarget, onSelectionTarget] = event<Event>() as any
export { onSelectionTarget }

export const emitSelectionTarget = throttleTrailing(
    (
        target: Appendable | undefined,
        rightClick?: boolean,
        noDeselect?: boolean
    ) => _emitSelectionTarget({ target, rightClick, noDeselect })
)

createEffect(() => {
    const target = getSelectionTarget()
    if (!target) return
    // @ts-ignore
    const handle = onDispose(
        // @ts-ignore
        (item) => item === target && setSelectionTarget(undefined)
    )
    return () => {
        handle.cancel()
    }
}, [getSelectionTarget])
