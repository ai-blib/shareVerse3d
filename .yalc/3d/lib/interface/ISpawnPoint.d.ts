import IObjectManager from "./IObjectManager";
import { ExtractProps } from "./utils/extractProps";
export default interface ISpawnPoint extends IObjectManager {
    helper: boolean;
}
export declare const spawnPointSchema: Required<ExtractProps<ISpawnPoint>>;
export declare const spawnPointDefaults: Partial<import("./utils/Defaults").default<ISpawnPoint>>;
