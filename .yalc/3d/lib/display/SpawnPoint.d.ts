import ISpawnPoint from "../interface/ISpawnPoint";
import ObjectManager from "./core/ObjectManager";
import SimpleObjectManager from "./core/SimpleObjectManager";
export default class SpawnPoint extends ObjectManager implements ISpawnPoint {
    static componentName: string;
    static defaults: Partial<import("../interface/utils/Defaults").default<ISpawnPoint>>;
    static schema: Required<import("../interface/utils/extractProps").ExtractProps<ISpawnPoint>>;
    private helperState;
    get helper(): boolean;
    set helper(val: boolean);
    protected isSpawnPoint: boolean;
    constructor();
    append(child: SimpleObjectManager): void;
}
