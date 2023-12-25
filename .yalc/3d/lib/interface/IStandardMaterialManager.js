import { basicMaterialManagerDefaults, basicMaterialManagerSchema } from "./IBasicMaterialManager";
import { texturedStandardDefaults, texturedStandardSchema } from "./ITexturedStandard";
import { extendDefaults } from "./utils/Defaults";
export const standardMaterialManagerSchema = {
    ...basicMaterialManagerSchema,
    ...texturedStandardSchema
};
export const standardMaterialManagerDefaults = extendDefaults([basicMaterialManagerDefaults, texturedStandardDefaults], {});
//# sourceMappingURL=IStandardMaterialManager.js.map