import { createEffect } from "@lincode/reactivity"
import Appendable from "../api/core/Appendable"
import getChangedProperties, {
    ChangedProperties,
    saveProperties
} from "../display/utils/getChangedProperties"
import { getEditorMounted } from "../states/useEditorMounted"
import {
    multipleSelectionTargetsFlushingPtr,
    getMultipleSelectionTargets,
    flushMultipleSelectionTargets
} from "../states/useMultipleSelectionTargets"
import { getSelectionTarget } from "../states/useSelectionTarget"
import { onEditorEdit } from "./onEditorEdit"
import { onTransformControls } from "./onTransformControls"
import { event } from "@lincode/events"
import { throttleTrailing } from "@lincode/utils"

export type Changes = Array<readonly [Appendable, ChangedProperties]>

export const [emitEditorChanges, onEditorChanges] = event<Changes>() as any

createEffect(() => {
    if (!getEditorMounted()) return

    const instances = new Set<Appendable>()
    const getInstances = throttleTrailing(() => {
        if (multipleSelectionTargetsFlushingPtr[0]) return
        instances.clear()
        for (const target of getMultipleSelectionTargets())
            instances.add(target)

        if (instances.size) return
        const target = getSelectionTarget()
        target && instances.add(target)
    })
    const handle0 = getSelectionTarget(getInstances)
    const handle1 = getMultipleSelectionTargets(getInstances)

    const handleStart = () => {
        for (const instance of instances) saveProperties(instance)
    }
    const handleFinish = () =>
        flushMultipleSelectionTargets(() =>
            emitEditorChanges(
                //todo: optimize array spread in the future
                // @ts-ignore
                [...instances].map(
                    (instance) =>
                        <const>[instance, getChangedProperties(instance)]
                )
            )
        )
    // @ts-ignore
    const handle2 = onTransformControls((val) => {
        if (val === "start") handleStart()
        else if (val === "stop") handleFinish()
    })
    // @ts-ignore
    const handle3 = onEditorEdit((val) => {
        if (val === "start") handleStart()
        else if (val === "stop") handleFinish()
    })
    const handle4 = getMultipleSelectionTargets((targets) => {
        for (const target of targets) saveProperties(target)
    })
    return () => {
        handle0.cancel()
        handle1.cancel()
        handle2.cancel()
        handle3.cancel()
        handle4.cancel()
    }
}, [getEditorMounted])
