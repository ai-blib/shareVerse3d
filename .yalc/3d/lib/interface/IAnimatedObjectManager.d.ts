import AnimationManager from "../display/core/AnimatedObjectManager/AnimationManager";
import { ExtractProps } from "./utils/extractProps";
import Nullable from "./utils/Nullable";
import IStaticObjectManager from "./IStaticObjectManager";
export type AnimationValue = Record<string, Array<number>>;
export type Animation = string | number | Array<string | number> | boolean | AnimationValue;
export default interface IAnimatedObjectManager extends IStaticObjectManager {
    animations: Record<string, string | AnimationManager>;
    animation: Nullable<Animation>;
    animationPaused: Nullable<boolean>;
    animationRepeat: Nullable<number>;
    onAnimationFinish: Nullable<() => void>;
}
export declare const animatedObjectManagerSchema: Required<ExtractProps<IAnimatedObjectManager>>;
export declare const animatedObjectManagerDefaults: Partial<import("./utils/Defaults").default<IAnimatedObjectManager>>;
