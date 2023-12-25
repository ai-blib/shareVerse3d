import { positionedDefaults, positionedSchema } from "./IPositioned";
import { extendDefaults } from "./utils/Defaults";
import Range from "./utils/Range";
export const triggerSchema = {
    ...positionedSchema,
    onEnter: Function,
    onExit: Function,
    target: [String, Array, Object],
    pad: Boolean,
    radius: Number,
    interval: Number,
    helper: Boolean
};
export const triggerDefaults = extendDefaults([positionedDefaults], {
    onEnter: undefined,
    onExit: undefined,
    target: undefined,
    pad: false,
    radius: 50,
    interval: 300,
    helper: true
}, {
    radius: new Range(0, 1000),
    interval: new Range(100, 1000, 100)
});
//# sourceMappingURL=ITrigger.js.map