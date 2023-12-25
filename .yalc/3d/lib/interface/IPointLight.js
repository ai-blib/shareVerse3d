import { lightBaseDefaults, lightBaseSchema } from "./ILightBase";
import { extendDefaults } from "./utils/Defaults";
export const pointLightSchema = {
    ...lightBaseSchema,
    decay: Number,
    distance: Number
};
export const pointLightDefaults = extendDefaults([lightBaseDefaults], { decay: 1, distance: 0 });
//# sourceMappingURL=IPointLight.js.map