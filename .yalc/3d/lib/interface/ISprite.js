import { texturedBasicDefaults, texturedBasicSchema } from "./ITexturedBasic";
import { visibleObjectManagerDefaults, visibleObjectManagerSchema } from "./IVisibleObjectManager";
import { extendDefaults } from "./utils/Defaults";
export const spriteSchema = {
    ...visibleObjectManagerSchema,
    ...texturedBasicSchema
};
export const spriteDefaults = extendDefaults([visibleObjectManagerDefaults, texturedBasicDefaults], { scaleZ: 0, depth: 0 });
//# sourceMappingURL=ISprite.js.map