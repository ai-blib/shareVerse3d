import { Object3D } from "three";
import IFoundManager from "../../interface/IFoundManager";
import TexturedBasicMixin from "./mixins/TexturedBasicMixin";
import TexturedStandardMixin from "./mixins/TexturedStandardMixin";
import Model from "../Model";
import IVisible from "../../interface/IVisible";
import SimpleObjectManager from "./SimpleObjectManager";
declare class FoundManager extends SimpleObjectManager implements IFoundManager {
    static componentName: string;
    static defaults: Partial<import("../../interface/utils/Defaults").default<IFoundManager>>;
    static schema: Required<import("../../interface/utils/extractProps").ExtractProps<IFoundManager>>;
    constructor(mesh: Object3D);
    model?: Model;
    private retargetAnimations;
    get animation(): import("../../interface/IAnimatedObjectManager").Animation | undefined;
    set animation(val: import("../../interface/IAnimatedObjectManager").Animation | undefined);
    private managerSet?;
    protected addToRaycastSet(set: Set<Object3D>): import("@lincode/promiselikes").Cancellable;
}
interface FoundManager extends SimpleObjectManager, TexturedBasicMixin, TexturedStandardMixin, IVisible {
}
export default FoundManager;
