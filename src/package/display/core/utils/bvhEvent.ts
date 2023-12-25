import { Cancellable } from "@lincode/promiselikes"

export const initCallBacks = new Set<(e?: any) => void>([])
export const callBacks = new Set<(e?: any) => void>([])

export const listenerFallEvent = (cb) => {
    callBacks.add(cb)
    return new Cancellable(() => callBacks.delete(cb))
}

export const emitFallEvent = (val) => {
    for (const cb of callBacks) cb && cb(val)
}

export const listenerInitEvent = (cb) => {
    initCallBacks.add(cb)
    return new Cancellable(() => initCallBacks.delete(cb))
}

export const emitInitEvent = (val) => {
    for (const cb of initCallBacks) cb && cb(val)
}
export const removeAll = () => {
    initCallBacks.clear()
    callBacks.clear()
}
