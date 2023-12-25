import { adjustMaterialDefaults, adjustMaterialSchema } from "./IAdjustMaterial";
import { loadedDefaults, loadedSchema } from "./ILoaded";
import { extendDefaults } from "./utils/Defaults";
export const modelSchema = {
    ...loadedSchema,
    ...adjustMaterialSchema,
    resize: Boolean
};
export const modelDefaults = extendDefaults([loadedDefaults, adjustMaterialDefaults], { resize: true });
//# sourceMappingURL=IModel.js.map