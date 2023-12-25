import { lightBaseDefaults, lightBaseSchema } from "./ILightBase";
import { extendDefaults } from "./utils/Defaults";
export const spotLightSchema = {
    ...lightBaseSchema,
    angle: Number,
    penumbra: Number,
    decay: Number,
    distance: Number,
    targetX: Number,
    targetY: Number,
    targetZ: Number
};
export const spotLightDefaults = extendDefaults([lightBaseDefaults], {
    angle: 1,
    penumbra: 0,
    decay: 1,
    distance: 0,
    targetX: 0,
    targetY: 0,
    targetZ: 0
});
//# sourceMappingURL=ISpotLight.js.map