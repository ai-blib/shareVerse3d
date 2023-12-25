import StaticObjectManager from "../display/core/StaticObjectManager"
import IAnimatedObjectManager, {
    animatedObjectManagerDefaults,
    animatedObjectManagerSchema
} from "./IAnimatedObjectManager"
import IPositioned, {
    positionedDefaults,
    positionedSchema
} from "./IPositioned"
import { ExtractProps } from "./utils/extractProps"
import fn from "./utils/fn"
import { hideSchema } from "./utils/nonEditorSchemaSet"
import Nullable from "./utils/Nullable"
import { extendDefaults } from "./utils/Defaults"
import Range from "./utils/Range"

export type OnIntersectValue = (target: StaticObjectManager) => void

export default interface ISimpleObjectManager
    extends IAnimatedObjectManager,
        IPositioned {
    onIntersect: Nullable<OnIntersectValue>
    onIntersectOut: Nullable<OnIntersectValue>
    onMoveToEnd: Nullable<() => void>
    stopKeyboardMove:Function
    stopMove:Function
    moveTo: Function | Array<any>
    lerpTo: Function | Array<any>
    placeAt: Function | Array<any> |any

    translateX: Function | Array<any>
    translateY: Function | Array<any>
    translateZ: Function | Array<any>

    intersectIds: Nullable<Array<string>>

    scaleX: number
    scaleY: number
    scaleZ: number
    scale: number

    rotationX: number
    rotationY: number
    rotationZ: number
    rotation: number
}
hideSchema(["rotation"])

export const simpleObjectManagerSchema: Required<
    ExtractProps<ISimpleObjectManager>
> = {
    ...animatedObjectManagerSchema,
    ...positionedSchema,

    onIntersect: Function,
    onIntersectOut: Function,
    onMoveToEnd: Function,
    stopMove:Function,
    stopKeyboardMove:Function,
    
    moveTo: [Function, Array],
    lerpTo: [Function, Array],
    placeAt: [Function, Array],

    translateX: [Function, Array],
    translateY: [Function, Array],
    translateZ: [Function, Array],

    intersectIds: Array,

    scaleX: Number,
    scaleY: Number,
    scaleZ: Number,
    scale: Number,

    rotationX: Number,
    rotationY: Number,
    rotationZ: Number,
    rotation: Number
}
hideSchema(["intersectIds"])

export const simpleObjectManagerDefaults = extendDefaults<ISimpleObjectManager>(
    [animatedObjectManagerDefaults, positionedDefaults],
    {
        onIntersect: undefined,
        onIntersectOut: undefined,
        onMoveToEnd: undefined,

        moveTo: fn,
        lerpTo: fn,
        placeAt: fn,

        translateX: fn,
        translateY: fn,
        translateZ: fn,

        intersectIds: undefined,

        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        scale: 1,

        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        rotation: 0
    },
    {
        rotation: new Range(0, 360),
        rotationX: new Range(0, 360),
        rotationY: new Range(0, 360),
        rotationZ: new Range(0, 360),
        scale: new Range(0, 200),
        scaleX: new Range(0, 200),
        scaleY: new Range(0, 200),
        scaleZ: new Range(0, 200)
    }
)
