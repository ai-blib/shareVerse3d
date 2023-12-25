import { primitiveDefaults, primitiveSchema } from "./IPrimitive";
import { extendDefaults } from "./utils/Defaults";
export const planeSchema = {
    ...primitiveSchema
};
export const planeDefaults = extendDefaults([primitiveDefaults], {
    scaleZ: 0,
    depth: 0
});
//# sourceMappingURL=IPlane.js.map