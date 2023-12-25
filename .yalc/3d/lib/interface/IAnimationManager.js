import { extendDefaults } from "./utils/Defaults";
import { appendableDefaults, appendableSchema } from "./IAppendable";
export const animationManagerSchema = {
    ...appendableSchema,
    paused: Boolean,
    data: Object,
    name: String
};
export const animationManagerDefaults = extendDefaults([appendableDefaults], { paused: true, data: undefined, name: "" });
//# sourceMappingURL=IAnimationManager.js.map