import { simpleObjectManagerDefaults, simpleObjectManagerSchema } from "./ISimpleObjectManager";
import { texturedBasicDefaults, texturedBasicSchema } from "./ITexturedBasic";
import { texturedStandardDefaults, texturedStandardSchema } from "./ITexturedStandard";
import { visibleDefaults, visibleSchema } from "./IVisible";
import { extendDefaults } from "./utils/Defaults";
export const foundManagerSchema = {
    ...simpleObjectManagerSchema,
    ...texturedBasicSchema,
    ...texturedStandardSchema,
    ...visibleSchema
};
export const foundManagerDefaults = extendDefaults([
    simpleObjectManagerDefaults,
    texturedBasicDefaults,
    texturedStandardDefaults,
    visibleDefaults
], {});
//# sourceMappingURL=IFoundManager.js.map