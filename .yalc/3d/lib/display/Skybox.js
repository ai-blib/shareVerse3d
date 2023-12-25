import { getSkyboxStack, pullSkyboxStack, pushSkyboxStack, setSkyboxStack } from "../states/useSkyboxStack";
import { skyboxDefaults, skyboxSchema } from "../interface/ISkybox";
import Appendable from "../api/core/Appendable";
export default class Skybox extends Appendable {
    static componentName = "skybox";
    static defaults = skyboxDefaults;
    static schema = skyboxSchema;
    constructor() {
        super();
        pushSkyboxStack(this);
    }
    dispose() {
        if (this.done)
            return this;
        super.dispose();
        pullSkyboxStack(this);
        return this;
    }
    _texture;
    get texture() {
        return this._texture;
    }
    set texture(value) {
        this._texture = value;
        setSkyboxStack([...getSkyboxStack()]);
    }
}
//# sourceMappingURL=Skybox.js.map