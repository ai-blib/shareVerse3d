import setupStruct from "../engine/setupStruct";
import { setupSchema } from "../interface/ISetup";
import { getAutoMount, setAutoMount } from "../states/useAutoMount";
import { getFirstLoadBeforeRender, setFirstLoadBeforeRender } from "../states/useFirstLoadBeforeRender";
import { refreshSetupStack } from "../states/useSetupStack";
import unsafeGetValue from "../utils/unsafeGetValue";
const settings = {
    get autoMount() {
        return getAutoMount();
    },
    set autoMount(value) {
        setAutoMount(value);
    },
    get firstLoadBeforeRender() {
        return getFirstLoadBeforeRender();
    },
    set firstLoadBeforeRender(value) {
        setFirstLoadBeforeRender(value);
    }
};
export default settings;
export const finalSetup = {};
for (const key of Object.keys(setupSchema))
    Object.defineProperty(settings, key, {
        get() {
            return unsafeGetValue(setupStruct, key);
        },
        set(value) {
            finalSetup[key] = value;
            refreshSetupStack();
        },
        enumerable: true
    });
//# sourceMappingURL=settings.js.map