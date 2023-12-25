import { applyMixins } from "@lincode/utils";
import VisibleMixin from "./mixins/VisibleMixin";
import ObjectManager from "./ObjectManager";
class VisibleObjectManager extends ObjectManager {
}
applyMixins(VisibleObjectManager, [VisibleMixin]);
export default VisibleObjectManager;
//# sourceMappingURL=VisibleObjectManager.js.map