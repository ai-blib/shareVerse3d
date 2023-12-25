import fit from './utils/fit';
import Loaded from './core/Loaded';
import { modelDefaults, modelSchema } from '../interface/IModel';
import { Resolvable } from '@lincode/promiselikes';
import { Reactive } from '@lincode/reactivity';
import measure from './utils/measure';
import { dt, loop } from '../engine/eventLoop';
import { getExtensionIncludingObjectURL } from './core/utils/objectURL';
import { decreaseLoadingCount, increaseLoadingCount } from '../states/useLoadingCount';
import AdjustMaterialMixin from './core/mixins/AdjustMaterialMixin';
import { attachStandardMaterialManager } from './material/attachMaterialManager';
import { applyMixins } from '@lincode/utils';
import AnimationManager from './core/AnimatedObjectManager/AnimationManager';
import { AnimationMixer, LoopRepeat } from 'three';
class Model extends Loaded {
    unmounted;
    static componentName = 'model';
    static defaults = modelDefaults;
    static schema = modelSchema;
    constructor(unmounted) {
        super(unmounted);
        this.unmounted = unmounted;
    }
    loadingState = new Reactive(0);
    playAnimation(name) {
        this.cancelHandle('modelPlayAnimation', () => this.loadingState.get((count, handle) => {
            if (count)
                return;
            handle.cancel();
            super.playAnimation(name);
        }));
    }
    stopAnimation() {
        this.cancelHandle('modelStopAnimation', () => this.loadingState.get((count, handle) => {
            if (count)
                return;
            handle.cancel();
            super.stopAnimation();
        }));
    }
    serializeAnimations;
    async loadAnimation(url, name = url) {
        (this.serializeAnimations ??= {})[name] = url;
        const clip = (await this.load(url)).animations[0];
        if (!clip)
            return;
        const { onFinishState, repeatState, finishEventState } = this.lazyStates();
        const animation = (this.animations[name] = this.watch(new AnimationManager(name, clip, await this.loaded, repeatState, onFinishState, finishEventState)));
        this.append(animation);
    }
    get animations() {
        return super.animations;
    }
    set animations(val) {
        for (const [key, value] of Object.entries(val))
            if (typeof value === 'string')
                this.loadAnimation(value, key);
            else
                this.animations[key] = value;
    }
    async load(url) {
        increaseLoadingCount();
        const resolvable = new Resolvable();
        this.loadingState.set(this.loadingState.get() + 1);
        const extension = getExtensionIncludingObjectURL(url);
        if (!url) {
            resolvable.resolve();
            setTimeout(() => this.loadingState.set(this.loadingState.get() - 1));
            decreaseLoadingCount();
            throw new Error('Unsupported file extension ' + extension);
        }
        const module = extension === 'fbx' ? await import('./utils/loaders/loadFBX') : await import('./utils/loaders/loadGLTF');
        let result;
        try {
            result = await module.default(url, !this.unmounted);
        }
        catch (e) {
            resolvable.resolve();
            setTimeout(() => this.loadingState.set(this.loadingState.get() - 1));
            decreaseLoadingCount();
            throw new Error('Failed to load model, check if src is correct');
        }
        resolvable.resolve();
        setTimeout(() => this.loadingState.set(this.loadingState.get() - 1));
        decreaseLoadingCount();
        return result;
    }
    _resize;
    get resize() {
        return this._resize ?? true;
    }
    set resize(val) {
        this._resize = val;
        this.loaded.done && (this.src = this._src);
    }
    resolveLoaded(loadedObject3d, src) {
        if (this.unmounted)
            return loadedObject3d;
        let mixer = null, canPlay = false;
        const { onFinishState, repeatState, finishEventState } = this.lazyStates();
        if (this.playAllAnimation) {
            mixer = new AnimationMixer(loadedObject3d);
        }
        for (const clip of loadedObject3d.animations) {
            canPlay = true;
            const animation = (this.animations[clip.name] = this.watch(new AnimationManager(clip.name, clip, loadedObject3d, repeatState, onFinishState, finishEventState)));
            if (this.playAllAnimation) {
                mixer?.clipAction(clip).play().setLoop(LoopRepeat, Infinity);
            }
            this.append(animation);
        }
        if (this.playAllAnimation && mixer && canPlay) {
            loop(() => {
                mixer && mixer.update(dt[0]);
            });
        }
        const measuredSize = this._resize === false ? measure(loadedObject3d, src) : fit(loadedObject3d, src);
        !this.widthSet && (this.object3d.scale.x = measuredSize.x);
        !this.heightSet && (this.object3d.scale.y = measuredSize.y);
        !this.depthSet && (this.object3d.scale.z = measuredSize.z);
        return loadedObject3d;
    }
    find(name, hiddenFromSceneGraph) {
        const child = super.find(name, hiddenFromSceneGraph);
        child && (child.model = this);
        return child;
    }
    findAll(name) {
        const children = super.findAll(name);
        for (const child of children)
            child.model = this;
        return children;
    }
    refreshFactors() {
        this.cancelHandle('refreshFactorsLoaded', () => {
            const handle = this.loaded.then(loaded => queueMicrotask(() => {
                if (handle.done)
                    return;
                this._refreshFactors(handle, attachStandardMaterialManager(loaded, this, true));
            }));
            return handle;
        });
    }
}
applyMixins(Model, [AdjustMaterialMixin]);
export default Model;
//# sourceMappingURL=Model.js.map