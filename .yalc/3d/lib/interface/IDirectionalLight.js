import { lightBaseDefaults, lightBaseSchema } from "./ILightBase";
import Choices from "./utils/Choices";
import { extendDefaults } from "./utils/Defaults";
import NullableDefault from "./utils/NullableDefault";
export const directionalLightSchema = {
    ...lightBaseSchema,
    shadowDistance: String
};
export const shadowDistanceChoices = new Choices({
    near: "near",
    middle: "middle",
    far: "far"
});
export const directionalLightDefaults = extendDefaults([lightBaseDefaults], { shadowDistance: new NullableDefault("middle") }, { shadowDistance: shadowDistanceChoices });
//# sourceMappingURL=IDirectionalLight.js.map