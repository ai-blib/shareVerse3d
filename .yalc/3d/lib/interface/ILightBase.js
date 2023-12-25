import { objectManagerDefaults, objectManagerSchema } from "./IObjectManager";
import { extendDefaults } from "./utils/Defaults";
import Range from "./utils/Range";
import Choices from "./utils/Choices";
import NullableDefault from "./utils/NullableDefault";
export const lightBaseSchema = {
    ...objectManagerSchema,
    helper: Boolean,
    color: String,
    intensity: Number,
    castShadow: Boolean,
    shadowResolution: String
};
export const shadowResolutionChoices = new Choices({
    low: "low",
    medium: "medium",
    high: "high"
});
export const lightBaseDefaults = extendDefaults([objectManagerDefaults], {
    color: "#ffffff",
    intensity: 1,
    castShadow: false,
    shadowResolution: new NullableDefault("medium"),
    helper: true
}, {
    intensity: new Range(0, 2),
    shadowResolution: shadowResolutionChoices
}, { color: true, castShadow: true });
//# sourceMappingURL=ILightBase.js.map