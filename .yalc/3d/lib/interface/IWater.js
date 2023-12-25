import { WATERNORMALS_URL } from "../globals";
import { visibleObjectManagerDefaults, visibleObjectManagerSchema } from "./IVisibleObjectManager";
import { extendDefaults } from "./utils/Defaults";
import Range from "./utils/Range";
export const waterSchema = {
    ...visibleObjectManagerSchema,
    shape: String,
    normalMap: String,
    resolution: Number,
    speed: Number
};
export const waterDefaults = extendDefaults([visibleObjectManagerDefaults], {
    shape: "plane",
    normalMap: WATERNORMALS_URL,
    resolution: 512,
    speed: 1,
    rotationX: 270
}, {
    resolution: new Range(256, 2048, 256)
}, { normalMap: true });
//# sourceMappingURL=IWater.js.map