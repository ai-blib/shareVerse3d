import { appendableDefaults, appendableSchema } from "./IAppendable";
import { texturedBasicDefaults, texturedBasicSchema } from "./ITexturedBasic";
import { extendDefaults } from "./utils/Defaults";
export const basicMaterialManagerSchema = {
    ...appendableSchema,
    ...texturedBasicSchema
};
export const basicMaterialManagerDefaults = extendDefaults([appendableDefaults, texturedBasicDefaults], {});
//# sourceMappingURL=IBasicMaterialManager.js.map