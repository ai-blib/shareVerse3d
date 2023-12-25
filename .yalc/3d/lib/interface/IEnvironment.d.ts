import IPositioned from "./IPositioned";
import { ExtractProps } from "./utils/extractProps";
import Nullable from "./utils/Nullable";
export declare const environmentPreset: {
    studio: string;
    day: string;
    night: string;
};
export type EnvironmentPreset = keyof typeof environmentPreset;
export default interface IEnvironment extends IPositioned {
    texture: Nullable<string | EnvironmentPreset | "dynamic">;
    helper: boolean;
}
export declare const environmentSchema: Required<ExtractProps<IEnvironment>>;
export declare const environmentDefaults: Partial<import("./utils/Defaults").default<IEnvironment>>;
