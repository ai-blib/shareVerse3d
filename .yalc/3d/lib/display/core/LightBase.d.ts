import { Reactive } from "@lincode/reactivity";
import { DirectionalLightHelper, Group, Light, PointLightHelper, SpotLightHelper } from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import ILightBase from "../../interface/ILightBase";
import { ShadowResolution } from "../../states/useShadowResolution";
import ObjectManager from "./ObjectManager";
export declare const mapShadowResolution: (val: ShadowResolution) => 256 | 512 | 1024;
export default abstract class LightBase<T extends typeof Light> extends ObjectManager<Group> implements ILightBase {
    protected lightState: Reactive<InstanceType<T> | undefined>;
    constructor(Light: T, Helper?: typeof DirectionalLightHelper | typeof SpotLightHelper | typeof PointLightHelper | typeof RectAreaLightHelper);
    protected helperState: Reactive<boolean>;
    get helper(): boolean;
    set helper(val: boolean);
    protected castShadowState: Reactive<boolean>;
    get castShadow(): boolean;
    set castShadow(val: boolean);
    protected shadowResolutionState: Reactive<ShadowResolution | undefined>;
    get shadowResolution(): ShadowResolution | undefined;
    set shadowResolution(val: ShadowResolution | undefined);
    get color(): string;
    set color(val: string);
    get intensity(): number;
    set intensity(val: number);
}
