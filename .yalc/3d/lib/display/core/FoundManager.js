import { applyMixins } from "@lincode/utils";
import { foundManagerDefaults, foundManagerSchema } from "../../interface/IFoundManager";
import TexturedBasicMixin from "./mixins/TexturedBasicMixin";
import TexturedStandardMixin from "./mixins/TexturedStandardMixin";
import VisibleMixin from "./mixins/VisibleMixin";
import SimpleObjectManager from "./SimpleObjectManager";
import { appendableRoot } from "../../api/core/collections";
import callPrivateMethod from "../../utils/callPrivateMethod";
import { setManager } from "../../api/utils/manager";
class FoundManager extends SimpleObjectManager {
    static componentName = "find";
    static defaults = foundManagerDefaults;
    static schema = foundManagerSchema;
    constructor(mesh) {
        super(mesh);
        appendableRoot.delete(this);
        const { materialManager } = mesh.userData;
        materialManager && this.append(materialManager);
    }
    model;
    retargetAnimations() {
        const state = this.model && callPrivateMethod(this.model, "lazyStates");
        if (!state)
            return;
        const { onFinishState, repeatState, managerRecordState, finishEventState } = state;
        for (const animationManager of Object.values(managerRecordState.get()))
            this.animations[animationManager.name] = this.watch(animationManager.retarget(this, repeatState, onFinishState, finishEventState));
        this.model = undefined;
    }
    get animation() {
        return super.animation;
    }
    set animation(val) {
        this.retargetAnimations();
        super.animation = val;
    }
    managerSet;
    addToRaycastSet(set) {
        if (!this.managerSet) {
            this.managerSet = true;
            this.nativeObject3d.traverse((child) => setManager(child, this));
        }
        return super.addToRaycastSet(set);
    }
}
applyMixins(FoundManager, [
    VisibleMixin,
    TexturedStandardMixin,
    TexturedBasicMixin
]);
export default FoundManager;
//# sourceMappingURL=FoundManager.js.map