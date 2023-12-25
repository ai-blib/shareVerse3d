import { ExtractProps } from "./utils/extractProps";
import Nullable from "./utils/Nullable";
import { EnvironmentPreset } from "./IEnvironment";
import IAppendable from "./IAppendable";
export default interface ISkybox extends IAppendable {
    texture: Nullable<string | EnvironmentPreset | Array<string>>;
}
export declare const skyboxSchema: Required<ExtractProps<ISkybox>>;
export declare const skyboxDefaults: Partial<import("./utils/Defaults").default<ISkybox>>;
