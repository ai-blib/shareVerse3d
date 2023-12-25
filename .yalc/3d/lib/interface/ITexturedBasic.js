import { extendDefaults } from "./utils/Defaults";
import NullableDefault from "./utils/NullableDefault";
import Range from "./utils/Range";
export const texturedBasicSchema = {
    color: String,
    opacity: Number,
    texture: [String, Object],
    videoTexture: [String, Object],
    alphaMap: String,
    textureRepeat: [Object, Number],
    textureFlipY: Boolean,
    textureRotation: Number
};
export const texturedBasicDefaults = extendDefaults([], {
    color: new NullableDefault("#ffffff"),
    opacity: new NullableDefault(1),
    texture: undefined,
    videoTexture: undefined,
    alphaMap: undefined,
    textureRepeat: new NullableDefault({ x: 1, y: 1 }),
    textureFlipY: new NullableDefault(false),
    textureRotation: new NullableDefault(0)
}, {
    opacity: new Range(0, 1),
    textureRotation: new Range(0, 360)
});
//# sourceMappingURL=ITexturedBasic.js.map