import { lightBaseDefaults, lightBaseSchema } from "./ILightBase";
import { extendDefaults } from "./utils/Defaults";
export const ambientLightSchema = {
    ...lightBaseSchema
};
export const ambientLightDefaults = extendDefaults([lightBaseDefaults], {});
//# sourceMappingURL=IAmbientLight.js.map