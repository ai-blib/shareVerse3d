import { lightBaseDefaults, lightBaseSchema } from "./ILightBase";
import { extendDefaults } from "./utils/Defaults";
export const areaLightSchema = {
    ...lightBaseSchema
};
export const areaLightDefaults = extendDefaults([lightBaseDefaults], { depth: 0, scaleZ: 0 });
//# sourceMappingURL=IAreaLight.js.map