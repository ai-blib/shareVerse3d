import { extendDefaults } from "./utils/Defaults";
import { staticObjectManagerDefaults, staticObjectManagerSchema } from "./IStaticObjectManager";
import NullableDefault from "./utils/NullableDefault";
import { hideSchema } from "./utils/nonEditorSchemaSet";
export const animatedObjectManagerSchema = {
    ...staticObjectManagerSchema,
    animations: Object,
    animation: [String, Number, Array, Boolean, Object],
    animationPaused: Boolean,
    animationRepeat: Number,
    onAnimationFinish: Function
};
hideSchema(["animationRepeat"]);
export const animatedObjectManagerDefaults = extendDefaults([staticObjectManagerDefaults], {
    animations: {},
    animation: undefined,
    animationPaused: new NullableDefault(false),
    animationRepeat: new NullableDefault(Infinity),
    onAnimationFinish: undefined
});
//# sourceMappingURL=IAnimatedObjectManager.js.map