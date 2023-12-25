import AnimationManager from './AnimationManager';
import StaticObjectManager from '../StaticObjectManager';
import { Reactive } from '@lincode/reactivity';
import { Cancellable } from '@lincode/promiselikes';
import { event } from '@lincode/events';
import { SEC2FRAME } from '../../../globals';
const animationValueToData = (val) => {
    const entries = Object.entries(val);
    let maxLength = 0;
    for (const [, { length }] of entries)
        length > maxLength && (maxLength = length);
    const duration = 1000;
    const timeStep = (duration * 0.001) / maxLength;
    const data = {};
    const result = (data[''] ??= {});
    for (const [name, values] of entries)
        result[name] = Object.fromEntries(values.map((v, i) => [Math.ceil(i * timeStep * SEC2FRAME), v]));
    return data;
};
export default class AnimatedObjectManager extends StaticObjectManager {
    states;
    lazyStates() {
        if (this.states)
            return this.states;
        const { managerState, pausedState } = (this.states = {
            managerRecordState: new Reactive({}),
            managerState: new Reactive(undefined),
            pausedState: new Reactive(false),
            repeatState: new Reactive(Infinity),
            onFinishState: new Reactive(undefined),
            finishEventState: new Reactive(undefined)
        });
        this.createEffect(() => {
            const manager = managerState.get();
            if (manager)
                manager.paused = pausedState.get();
        }, [managerState.get, pausedState.get]);
        return this.states;
    }
    get animations() {
        return this.lazyStates().managerRecordState.get();
    }
    set animations(val) {
        this.lazyStates().managerRecordState.set(val);
    }
    get animationPaused() {
        return this.lazyStates().pausedState.get();
    }
    set animationPaused(value) {
        this.lazyStates().pausedState.set(value);
    }
    get animationRepeat() {
        return this.lazyStates().repeatState.get();
    }
    set animationRepeat(value) {
        this.lazyStates().repeatState.set(value);
    }
    get onAnimationFinish() {
        return this.lazyStates().onFinishState.get();
    }
    set onAnimationFinish(value) {
        this.lazyStates().onFinishState.set(value);
    }
    playAnimation(name) {
        const { managerState, pausedState } = this.lazyStates();
        pausedState.set(false);
        managerState.set(typeof name === 'string' ? this.animations[name] : Object.values(this.animations)[name ?? 0]);
    }
    stopAnimation() {
        this.lazyStates().pausedState.set(true);
    }
    createAnimation(name) {
        let animation = this.animations[name];
        if (animation && typeof animation !== 'string')
            return animation;
        const { onFinishState, repeatState, finishEventState } = this.lazyStates();
        animation = this.watch(new AnimationManager(name, undefined, this, repeatState, onFinishState, finishEventState));
        this.append(animation);
        this.animations[name] = animation;
        return animation;
    }
    get serializeAnimation() {
        return typeof this._animation !== 'object' ? this._animation : undefined;
    }
    setAnimation(val) {
        this._animation = val;
        if (typeof val === 'string' || typeof val === 'number') {
            this.playAnimation(val);
            return;
        }
        if (typeof val === 'boolean') {
            val ? this.playAnimation(undefined) : this.stopAnimation();
            return;
        }
        if (!val) {
            this.stopAnimation();
            return;
        }
        const name = 'animation';
        const anim = this.createAnimation(name);
        anim.data = animationValueToData(val);
        this.playAnimation(name);
    }
    _animation;
    get animation() {
        return this._animation;
    }
    set animation(val) {
        this.cancelHandle('playAnimation', Array.isArray(val)
            ? () => {
                const { finishEventState, managerRecordState } = this.lazyStates();
                const finishEvent = event();
                finishEventState.set(finishEvent);
                let currentIndex = 0;
                const next = () => {
                    if (currentIndex === val.length) {
                        if (this.animationRepeat < 2) {
                            this.onAnimationFinish?.();
                            return;
                        }
                        currentIndex = 0;
                    }
                    this.setAnimation(val[currentIndex++]);
                };
                next();
                const [, onFinish] = finishEvent;
                const handle = onFinish(next);
                return new Cancellable(() => {
                    finishEventState.set(undefined);
                    handle.cancel();
                });
            }
            : void this.setAnimation(val));
    }
}
//# sourceMappingURL=index.js.map