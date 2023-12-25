import { extendDefaults } from "./utils/Defaults";
import { appendableDefaults, appendableSchema } from "./IAppendable";
export const skyboxSchema = {
    ...appendableSchema,
    texture: [String, Array]
};
export const skyboxDefaults = extendDefaults([appendableDefaults], {
    texture: undefined
});
//# sourceMappingURL=ISkybox.js.map