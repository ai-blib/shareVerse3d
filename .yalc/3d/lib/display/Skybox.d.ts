import ISkybox from "../interface/ISkybox";
import Appendable from "../api/core/Appendable";
export default class Skybox extends Appendable implements ISkybox {
    static componentName: string;
    static defaults: Partial<import("../interface/utils/Defaults").default<ISkybox>>;
    static schema: Required<import("../interface/utils/extractProps").ExtractProps<ISkybox>>;
    constructor();
    dispose(): this;
    private _texture?;
    get texture(): string | string[] | undefined;
    set texture(value: string | string[] | undefined);
}
