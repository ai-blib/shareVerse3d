import Appendable from "../api/core/Appendable";
import { setupDefaults, setupSchema } from "../interface/ISetup";
import { pullSetupStack, pushSetupStack, refreshSetupStack } from "../states/useSetupStack";
export const dataSetupMap = new WeakMap();
class Setup extends Appendable {
    noEffect;
    static componentName = "setup";
    static defaults = setupDefaults;
    static schema = setupSchema;
    data = {};
    constructor(noEffect) {
        super();
        this.noEffect = noEffect;
        if (noEffect)
            return;
        pushSetupStack(this.data);
        this.then(() => pullSetupStack(this.data));
        dataSetupMap.set(this.data, this);
    }
}
for (const key of Object.keys(setupSchema))
    Object.defineProperty(Setup.prototype, key, {
        get() {
            return this.data[key];
        },
        set(value) {
            this.data[key] = value;
            !this.noEffect && refreshSetupStack();
        }
    });
export default Setup;
//# sourceMappingURL=Setup.js.map