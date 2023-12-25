import { loadedDefaults, loadedSchema } from "./ILoaded";
import { texturedBasicDefaults, texturedBasicSchema } from "./ITexturedBasic";
import { texturedStandardDefaults, texturedStandardSchema } from "./ITexturedStandard";
import { extendDefaults } from "./utils/Defaults";
export const svgMeshSchema = {
    ...loadedSchema,
    ...texturedBasicSchema,
    ...texturedStandardSchema,
    innerHTML: String
};
export const svgMeshDefaults = extendDefaults([loadedDefaults, texturedBasicDefaults, texturedStandardDefaults], { innerHTML: undefined });
//# sourceMappingURL=ISvgMesh.js.map