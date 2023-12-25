import { texturedBasicDefaults, texturedBasicSchema } from "./ITexturedBasic";
import { texturedStandardDefaults, texturedStandardSchema } from "./ITexturedStandard";
import { visibleObjectManagerDefaults, visibleObjectManagerSchema } from "./IVisibleObjectManager";
import { extendDefaults } from "./utils/Defaults";
export const primitiveSchema = {
    ...visibleObjectManagerSchema,
    ...texturedBasicSchema,
    ...texturedStandardSchema
};
export const primitiveDefaults = extendDefaults([
    visibleObjectManagerDefaults,
    texturedBasicDefaults,
    texturedStandardDefaults
], {});
//# sourceMappingURL=IPrimitive.js.map