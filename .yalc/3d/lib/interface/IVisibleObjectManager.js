import { objectManagerDefaults, objectManagerSchema } from "./IObjectManager";
import { visibleDefaults, visibleSchema } from "./IVisible";
import { extendDefaults } from "./utils/Defaults";
export const visibleObjectManagerSchema = {
    ...objectManagerSchema,
    ...visibleSchema
};
export const visibleObjectManagerDefaults = extendDefaults([objectManagerDefaults, visibleDefaults], {});
//# sourceMappingURL=IVisibleObjectManager.js.map