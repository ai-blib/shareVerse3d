import { extendDefaults } from "./utils/Defaults";
import NullableDefault from "./utils/NullableDefault";
import Range from "./utils/Range";
export const texturedStandardSchema = {
    wireframe: Boolean,
    envMap: String,
    envMapIntensity: Number,
    aoMap: String,
    aoMapIntensity: Number,
    bumpMap: String,
    bumpScale: Number,
    displacementMap: String,
    displacementScale: Number,
    displacementBias: Number,
    emissive: Boolean,
    emissiveIntensity: Number,
    lightMap: String,
    lightMapIntensity: Number,
    metalnessMap: String,
    metalness: Number,
    roughnessMap: String,
    roughness: Number,
    normalMap: String,
    normalScale: Number
};
export const texturedStandardDefaults = extendDefaults([], {
    wireframe: new NullableDefault(false),
    envMap: undefined,
    envMapIntensity: new NullableDefault(1),
    aoMap: undefined,
    aoMapIntensity: new NullableDefault(1),
    bumpMap: undefined,
    bumpScale: new NullableDefault(1),
    displacementMap: undefined,
    displacementScale: new NullableDefault(1),
    displacementBias: new NullableDefault(0),
    emissive: new NullableDefault(false),
    emissiveIntensity: new NullableDefault(1),
    lightMap: undefined,
    lightMapIntensity: new NullableDefault(1),
    metalnessMap: undefined,
    metalness: new NullableDefault(0),
    roughnessMap: undefined,
    roughness: new NullableDefault(1),
    normalMap: undefined,
    normalScale: new NullableDefault(1)
}, {
    envMapIntensity: new Range(0, 4),
    aoMapIntensity: new Range(0, 4),
    bumpScale: new Range(0, 4),
    displacementScale: new Range(0, 4),
    displacementBias: new Range(0, 4),
    emissiveIntensity: new Range(0, 4),
    lightMapIntensity: new Range(0, 4),
    metalness: new Range(-2, 2),
    roughness: new Range(0, 4),
    normalScale: new Range(0, 4)
});
//# sourceMappingURL=ITexturedStandard.js.map