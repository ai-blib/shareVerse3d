import { visibleObjectManagerDefaults, visibleObjectManagerSchema } from "./IVisibleObjectManager";
import { extendDefaults } from "./utils/Defaults";
import Range from "./utils/Range";
export const reflectorSchema = {
    ...visibleObjectManagerSchema,
    resolution: Number,
    blur: Number,
    contrast: Number,
    mirror: Number
};
export const reflectorDefaults = extendDefaults([visibleObjectManagerDefaults], {
    resolution: 256,
    blur: 512,
    contrast: 1.5,
    mirror: 1,
    rotationX: 270
}, {
    resolution: new Range(256, 2048, 256),
    blur: new Range(256, 2048, 128)
});
//# sourceMappingURL=IReflector.js.map