import { primitiveDefaults, primitiveSchema } from "./IPrimitive";
import { extendDefaults } from "./utils/Defaults";
export const circleSchema = {
    ...primitiveSchema
};
export const circleDefaults = extendDefaults([primitiveDefaults], {
    scaleZ: 0,
    depth: 0
});
//# sourceMappingURL=ICircle.js.map