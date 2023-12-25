import { extendDefaults } from "./utils/Defaults";
import NullableDefault from "./utils/NullableDefault";
import Range from "./utils/Range";
export const adjustMaterialSchema = {
    metalnessFactor: Number,
    roughnessFactor: Number,
    opacityFactor: Number,
    envFactor: Number,
    reflection: Boolean
};
export const adjustMaterialDefaults = extendDefaults([], {
    metalnessFactor: new NullableDefault(0),
    roughnessFactor: new NullableDefault(1),
    opacityFactor: new NullableDefault(1),
    envFactor: new NullableDefault(1),
    reflection: false
}, {
    metalnessFactor: new Range(-2, 2),
    roughnessFactor: new Range(0, 4),
    opacityFactor: new Range(0, 4),
    envFactor: new Range(0, 4)
});
//# sourceMappingURL=IAdjustMaterial.js.map