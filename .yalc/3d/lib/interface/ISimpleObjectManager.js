import { animatedObjectManagerDefaults, animatedObjectManagerSchema } from "./IAnimatedObjectManager";
import { positionedDefaults, positionedSchema } from "./IPositioned";
import fn from "./utils/fn";
import { hideSchema } from "./utils/nonEditorSchemaSet";
import { extendDefaults } from "./utils/Defaults";
import Range from "./utils/Range";
hideSchema(["rotation"]);
export const simpleObjectManagerSchema = {
    ...animatedObjectManagerSchema,
    ...positionedSchema,
    onIntersect: Function,
    onIntersectOut: Function,
    onMoveToEnd: Function,
    stopMove: Function,
    stopKeyboardMove: Function,
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
};
hideSchema(["intersectIds"]);
export const simpleObjectManagerDefaults = extendDefaults([animatedObjectManagerDefaults, positionedDefaults], {
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
}, {
    rotation: new Range(0, 360),
    rotationX: new Range(0, 360),
    rotationY: new Range(0, 360),
    rotationZ: new Range(0, 360),
    scale: new Range(0, 200),
    scaleX: new Range(0, 200),
    scaleY: new Range(0, 200),
    scaleZ: new Range(0, 200)
});
//# sourceMappingURL=ISimpleObjectManager.js.map