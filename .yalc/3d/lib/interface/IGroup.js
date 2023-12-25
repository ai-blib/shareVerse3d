import { visibleObjectManagerDefaults, visibleObjectManagerSchema } from "./IVisibleObjectManager";
import { extendDefaults } from "./utils/Defaults";
export const groupSchema = {
    ...visibleObjectManagerSchema
};
export const groupDefaults = extendDefaults([visibleObjectManagerDefaults], {});
//# sourceMappingURL=IGroup.js.map