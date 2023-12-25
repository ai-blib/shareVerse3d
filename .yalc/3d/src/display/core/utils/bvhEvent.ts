import { Cancellable } from "@lincode/promiselikes"

export const initCallBacks = new Set<(e?: any) => void>([])
export const callBacks = new Set<(e?: any) => void>([])
// @ts-ignore
export const listenerFallEvent = (cb) => {
    callBacks.add(cb)
    return new Cancellable(() => callBacks.delete(cb))
}
// @ts-ignore
export const emitFallEvent = (val) => {
    for (const cb of callBacks) cb && cb(val)
}
// @ts-ignore
export const listenerInitEvent = (cb) => {
    initCallBacks.add(cb)
    return new Cancellable(() => initCallBacks.delete(cb))
}
// @ts-ignore
export const emitInitEvent = (val) => {
    for (const cb of initCallBacks) cb && cb(val)
}
// @ts-ignore
export const removeAll = () => {
    initCallBacks.clear()
    callBacks.clear()
}
