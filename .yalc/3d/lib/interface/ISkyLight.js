import { lightBaseDefaults, lightBaseSchema } from "./ILightBase";
import { extendDefaults } from "./utils/Defaults";
import NullableDefault from "./utils/NullableDefault";
import { shadowDistanceChoices } from "./IDirectionalLight";
export const skyLightSchema = {
    ...lightBaseSchema,
    shadowDistance: String,
    groundColor: String
};
export const skyLightDefaults = extendDefaults([lightBaseDefaults], {
    groundColor: "#ffffff",
    shadowDistance: new NullableDefault("middle")
}, {
    shadowDistance: shadowDistanceChoices
});
//# sourceMappingURL=ISkyLight.js.map