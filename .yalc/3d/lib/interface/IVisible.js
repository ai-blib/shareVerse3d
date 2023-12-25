import { extendDefaults } from "./utils/Defaults";
export const visibleSchema = {
    bloom: Boolean,
    outline: Boolean,
    visible: Boolean,
    frustumCulled: Boolean,
    castShadow: Boolean,
    receiveShadow: Boolean
};
export const visibleDefaults = extendDefaults([], {
    bloom: false,
    outline: false,
    visible: true,
    frustumCulled: true,
    castShadow: true,
    receiveShadow: true
});
//# sourceMappingURL=IVisible.js.map