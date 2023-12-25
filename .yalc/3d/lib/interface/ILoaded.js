import { visibleObjectManagerDefaults, visibleObjectManagerSchema } from "./IVisibleObjectManager";
import { extendDefaults } from "./utils/Defaults";
export const loadedSchema = {
    ...visibleObjectManagerSchema,
    src: String,
    onLoad: Function,
    boxVisible: Boolean
};
export const loadedDefaults = extendDefaults([visibleObjectManagerDefaults], {
    src: undefined,
    onLoad: undefined,
    boxVisible: false
});
//# sourceMappingURL=ILoaded.js.map