import { extendDefaults } from "./utils/Defaults";
import { appendableDefaults, appendableSchema } from "./IAppendable";
export const positionedSchema = {
    ...appendableSchema,
    x: Number,
    y: Number,
    z: Number,
    onMove: Function
};
export const positionedDefaults = extendDefaults([appendableDefaults], { x: 0, y: 0, z: 0, onMove: undefined });
//# sourceMappingURL=IPositioned.js.map