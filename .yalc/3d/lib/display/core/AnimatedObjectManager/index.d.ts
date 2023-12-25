import { Object3D } from 'three';
import IAnimatedObjectManager, { Animation } from '../../../interface/IAnimatedObjectManager';
import AnimationManager from './AnimationManager';
import StaticObjectManager from '../StaticObjectManager';
import { Reactive } from '@lincode/reactivity';
import { EventFunctions } from '@lincode/events';
type States = {
    managerRecordState: Reactive<Record<string, AnimationManager>>;
    managerState: Reactive<AnimationManager | undefined>;
    pausedState: Reactive<boolean>;
    repeatState: Reactive<number>;
    onFinishState: Reactive<(() => void) | undefined>;
    finishEventState: Reactive<EventFunctions | undefined>;
};
export default class AnimatedObjectManager<T extends Object3D = Object3D> extends StaticObjectManager<T> implements IAnimatedObjectManager {
    private states?;
    lazyStates(): States;
    get animations(): Record<string, AnimationManager>;
    set animations(val: Record<string, AnimationManager>);
    get animationPaused(): boolean;
    set animationPaused(value: boolean);
    get animationRepeat(): number;
    set animationRepeat(value: number);
    get onAnimationFinish(): (() => void) | undefined;
    set onAnimationFinish(value: (() => void) | undefined);
    protected playAnimation(name?: string | number): void;
    stopAnimation(): void;
    private createAnimation;
    protected get serializeAnimation(): string | number | boolean | undefined;
    private setAnimation;
    private _animation?;
    get animation(): Animation | undefined;
    set animation(val: Animation | undefined);
}
export {};
