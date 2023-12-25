import { AnimationMixer, AnimationClip, NumberKeyframeTrack, BooleanKeyframeTrack } from 'three';
import { throttleTrailing, filterBoolean, forceGetInstance, merge } from '@lincode/utils';
import { onBeforeRender } from '../../../events/onBeforeRender';
import { dt } from '../../../engine/eventLoop';
import { Reactive } from '@lincode/reactivity';
import { nonSerializedAppendables, uuidMap } from '../../../api/core/collections';
import { animationManagerDefaults, animationManagerSchema } from '../../../interface/IAnimationManager';
import Appendable from '../../../api/core/Appendable';
import { FRAME2SEC, SEC2FRAME } from '../../../globals';
import TimelineAudio from '../../TimelineAudio';
import { Cancellable } from '@lincode/promiselikes';
import getPrivateValue from '../../../utils/getPrivateValue';
const targetMixerMap = new WeakMap();
const mixerActionMap = new WeakMap();
const mixerManagerMap = new WeakMap();
const isBooleanFrameData = (values) => typeof values[0] === 'boolean';
const isNumberFrameData = (values) => typeof values[0] === 'number';
const framesToKeyframeTrack = (targetName, property, frames) => {
    const keys = Object.keys(frames);
    if (!keys.length)
        return;
    const values = Object.values(frames);
    const name = targetName + '.' + property;
    const frameNums = keys.map(frameNum => Number(frameNum) * FRAME2SEC);
    if (isBooleanFrameData(values))
        return new BooleanKeyframeTrack(name, frameNums, values);
    if (isNumberFrameData(values))
        return new NumberKeyframeTrack(name, frameNums, values);
};
export default class AnimationManager extends Appendable {
    name;
    static componentName = 'animation';
    static defaults = animationManagerDefaults;
    static schema = animationManagerSchema;
    actionState = new Reactive(undefined);
    clipState = new Reactive(undefined);
    dataState = new Reactive([undefined]);
    gotoFrameState = new Reactive(undefined);
    awaitState = new Reactive(0);
    get await() {
        return this.awaitState.get();
    }
    set await(val) {
        this.awaitState.set(val);
    }
    pausedState = new Reactive(true);
    get paused() {
        return this.pausedState.get();
    }
    set paused(val) {
        this.pausedState.set(val);
    }
    mixer;
    clip;
    clipTotalFrames = 0;
    audioTotalFrames = 0;
    get totalFrames() {
        return Math.max(this.clipTotalFrames, this.audioTotalFrames);
    }
    constructor(name, clip, target, repeatState, onFinishState, finishEventState, serialized) {
        super();
        this.name = name;
        !serialized && nonSerializedAppendables.add(this);
        const mixer = (this.mixer = forceGetInstance(targetMixerMap, target ?? this, AnimationMixer, [target]));
        // new add
        this.clip = clip;
        this.createEffect(() => {
            if (this.pausedState.get())
                return;
            const finishEvent = finishEventState?.get();
            if (finishEvent) {
                const [emitFinish] = finishEvent;
                const onFinish = () => emitFinish();
                mixer.addEventListener('finished', onFinish);
                return () => {
                    mixer.removeEventListener('finished', onFinish);
                };
            }
            const onFinish = onFinishState.get();
            if (!onFinish)
                return;
            mixer.addEventListener('finished', onFinish);
            return () => {
                mixer.removeEventListener('finished', onFinish);
            };
        }, [onFinishState.get, this.pausedState.get, finishEventState?.get]);
        this.createEffect(() => {
            const [data] = this.dataState.get();
            if (!data) {
                this.clipState.set(clip);
                this.audioTotalFrames = 0;
                return;
            }
            const audioDurationGetters = [];
            const newClip = new AnimationClip(undefined, undefined, Object.entries(data)
                .map(([targetName, targetTracks]) => {
                const instance = uuidMap.get(targetName);
                if (!instance)
                    return [];
                if (instance instanceof TimelineAudio) {
                    audioDurationGetters.push(getPrivateValue(instance, 'durationState').get);
                    return [];
                }
                return Object.entries(targetTracks)
                    .map(([property, frames]) => framesToKeyframeTrack(targetName, property, frames))
                    .filter(filterBoolean);
            })
                .flat());
            this.clipState.set(newClip);
            const handle = new Cancellable();
            const computeAudioDuration = throttleTrailing(() => {
                if (handle.done)
                    return;
                const maxDuration = Math.max(...audioDurationGetters.map(getter => getter()));
                this.audioTotalFrames = Math.ceil(maxDuration * SEC2FRAME);
            });
            // @ts-ignore
            for (const getAudioDuration of audioDurationGetters)
                handle.watch(getAudioDuration(computeAudioDuration));
            return () => {
                handle.cancel();
            };
        }, [this.dataState.get]);
        let frame;
        this.createEffect(() => {
            const clip = this.clipState.get();
            if (!clip) {
                this.clipTotalFrames = 0;
                return;
            }
            this.clipTotalFrames = Math.ceil(clip.duration * SEC2FRAME);
            const action = mixer.clipAction(clip);
            this.actionState.set(action);
            if (frame !== undefined) {
                this.frame = frame;
                frame = undefined;
            }
            return () => {
                frame = this.frame;
                action.stop();
                action.enabled = false;
                mixer.uncacheClip(clip);
            };
        }, [this.clipState.get]);
        this.createEffect(() => {
            const action = this.actionState.get();
            if (action)
                action.repetitions = finishEventState?.get() ? 0 : repeatState.get();
        }, [this.actionState.get, repeatState.get, finishEventState?.get]);
        this.createEffect(() => {
            const action = this.actionState.get();
            if (!action)
                return;
            // debugger;
            const gotoFrame = this.gotoFrameState.get();
            action.paused = (this.pausedState.get() || !!this.awaitState.get()) && gotoFrame === undefined;
            if (action.paused)
                return;
            const prevManager = mixerManagerMap.get(mixer);
            mixerManagerMap.set(mixer, this);
            if (prevManager && prevManager !== this)
                prevManager.pausedState.set(true);
            const prevAction = mixerActionMap.get(mixer);
            mixerActionMap.set(mixer, action);
            if (prevAction?.enabled && action !== prevAction) {
                prevAction.stop();
                // action.crossFadeFrom(prevAction, 0, true);
            }
            action.clampWhenFinished = true;
            action.enabled = true;
            action.play();
            if (gotoFrame !== undefined) {
                mixer.setTime(gotoFrame * FRAME2SEC);
                this.gotoFrameState.set(undefined);
                return;
            }
            const handle = onBeforeRender(() => mixer.update(dt[0]));
            return () => {
                handle.cancel();
            };
        }, [this.actionState.get, this.pausedState.get, this.awaitState.get, this.gotoFrameState.get]);
    }
    retarget(target, repeatState, onFinishState, finishEventState) {
        const newClip = this.clipState.get().clone();
        const targetName = target.name + '.';
        newClip.tracks = newClip.tracks.filter(track => track.name.startsWith(targetName));
        const animation = new AnimationManager(this.name, newClip, target, repeatState, onFinishState, finishEventState);
        target.append(animation);
        return animation;
    }
    get data() {
        return this.dataState.get()[0];
    }
    set data(val) {
        this.dataState.set([val]);
    }
    mergeData(data) {
        const [prevData] = this.dataState.get();
        if (!prevData) {
            this.dataState.set([data]);
            return;
        }
        merge(prevData, data);
        this.dataState.set([prevData]);
    }
    get frame() {
        return Math.ceil(this.mixer.time * SEC2FRAME);
    }
    set frame(val) {
        this.gotoFrameState.set(val);
    }
}
//# sourceMappingURL=AnimationManager.js.map