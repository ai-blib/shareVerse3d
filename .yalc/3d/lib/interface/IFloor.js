import { visibleObjectManagerDefaults, visibleObjectManagerSchema } from "./IVisibleObjectManager";
import { extendDefaults } from "./utils/Defaults";
export const floorSchema = {
    ...visibleObjectManagerSchema,
    preset: String,
    repeatX: Number,
    repeatZ: Number
};
export const floorDefaults = extendDefaults([visibleObjectManagerDefaults], {
    preset: "industrial0",
    repeatX: 1,
    repeatZ: 1
});
//# sourceMappingURL=IFloor.js.map