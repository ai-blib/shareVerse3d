import Appendable from "../api/core/Appendable";
import { skyDefaults, skySchema } from "../interface/ISky";
import { setSkyShader } from "../states/useSkyShader";
export default class Sky extends Appendable {
    static componentName = "sky";
    static defaults = skyDefaults;
    static schema = skySchema;
    constructor() {
        super();
        setSkyShader(true);
    }
}
//# sourceMappingURL=Sky.js.map