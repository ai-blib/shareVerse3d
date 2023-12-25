import { Group } from 'three';
import Loaded from './core/Loaded';
import IModel from '../interface/IModel';
import FoundManager from './core/FoundManager';
import AdjustMaterialMixin from './core/mixins/AdjustMaterialMixin';
import AnimationManager from './core/AnimatedObjectManager/AnimationManager';
declare class Model extends Loaded<Group> implements IModel {
    private unmounted?;
    static componentName: string;
    static defaults: Partial<import("../interface/utils/Defaults").default<IModel>>;
    static schema: Required<import("../interface/utils/extractProps").ExtractProps<IModel>>;
    constructor(unmounted?: boolean | undefined);
    private loadingState;
    playAnimation(name?: string | number): void;
    stopAnimation(): void;
    protected serializeAnimations?: Record<string, string>;
    loadAnimation(url: string, name?: string): Promise<void>;
    get animations(): Record<string, AnimationManager>;
    set animations(val: Record<string, string | AnimationManager>);
    protected load(url: string): Promise<Group>;
    private _resize?;
    get resize(): boolean;
    set resize(val: boolean);
    protected resolveLoaded(loadedObject3d: Group, src: string): Group;
    find(name: string, hiddenFromSceneGraph?: boolean): FoundManager | undefined;
    findAll(name?: string | RegExp | ((name: string) => boolean)): Array<FoundManager>;
    protected refreshFactors(): void;
}
interface Model extends Loaded<Group>, AdjustMaterialMixin {
}
export default Model;
