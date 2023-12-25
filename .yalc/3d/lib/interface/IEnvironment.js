import { positionedDefaults, positionedSchema } from "./IPositioned";
import { extendDefaults } from "./utils/Defaults";
export const environmentPreset = {
    studio: "studio.jpg",
    day: "day.hdr",
    night: "night.hdr"
};
export const environmentSchema = {
    ...positionedSchema,
    texture: String,
    helper: Boolean
};
export const environmentDefaults = extendDefaults([positionedDefaults], { texture: "studio", helper: true });
//# sourceMappingURL=IEnvironment.js.map