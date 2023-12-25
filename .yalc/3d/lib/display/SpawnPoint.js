import { Reactive } from "@lincode/reactivity";
import mainCamera from "../engine/mainCamera";
import { getCameraRendered } from "../states/useCameraRendered";
import { spawnPointDefaults, spawnPointSchema } from "../interface/ISpawnPoint";
import ObjectManager from "./core/ObjectManager";
import scene from "../engine/scene";
import { addSelectionHelper } from "./core/StaticObjectManager/raycast/selectionCandidates";
import HelperCylinder from "./core/utils/HelperCylinder";
export default class SpawnPoint extends ObjectManager {
    static componentName = "spawnPoint";
    static defaults = spawnPointDefaults;
    static schema = spawnPointSchema;
    helperState = new Reactive(true);
    get helper() {
        return this.helperState.get();
    }
    set helper(val) {
        this.helperState.set(val);
    }
    isSpawnPoint = true;
    constructor() {
        super();
        this.createEffect(() => {
            if (!this.helperState.get() || getCameraRendered() !== mainCamera)
                return;
            const helper = new HelperCylinder();
            const handle = addSelectionHelper(helper, this);
            helper.height = 10;
            return () => {
                handle.cancel();
            };
        }, [this.helperState.get, getCameraRendered]);
    }
    append(child) {
        this._append(child);
        scene.add(child.outerObject3d);
        child.placeAt(this);
    }
}
//# sourceMappingURL=SpawnPoint.js.map