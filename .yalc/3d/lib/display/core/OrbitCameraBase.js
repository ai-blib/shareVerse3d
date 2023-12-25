import { Reactive } from "@lincode/reactivity";
import CameraBase from "./CameraBase";
import { isMeshItem } from "./MeshItem";
import { getMeshItemSets } from "../core/StaticObjectManager";
import { onId } from "../../events/onId";
import { onSceneGraphChange } from "../../events/onSceneGraphChange";
export default class OrbitCameraBase extends CameraBase {
    getChild() {
        if (!this.children)
            return;
        const [firstChild] = this.children;
        return isMeshItem(firstChild) ? firstChild : undefined;
    }
    constructor(camera) {
        super(camera);
        this.createEffect(() => {
            const target = this.getChild() ?? this.targetState.get();
            if (!target)
                return;
            const [[targetItem]] = getMeshItemSets(target);
            if (targetItem) {
                this.foundState.set(targetItem);
                const handle = onSceneGraphChange(() => targetItem.parent !== this && this.refresh.set({}));
                return () => {
                    handle.cancel();
                };
            }
            if (typeof target !== "string")
                return;
            // @ts-ignore
            const handle = onId((id) => id === target && this.refresh.set({}));
            return () => {
                handle.cancel();
            };
        }, [this.targetState.get, this.refresh.get]);
    }
    targetState = new Reactive(undefined);
    get target() {
        return this.targetState.get();
    }
    set target(value) {
        this.targetState.set(value);
    }
    foundState = new Reactive(undefined);
    refresh = new Reactive({});
    append(object) {
        this._append(object);
        this.parent?.outerObject3d.add(object.outerObject3d);
        this.refresh.set({});
    }
    attach(object) {
        this._append(object);
        this.parent?.outerObject3d.attach(object.outerObject3d);
        this.refresh.set({});
    }
}
//# sourceMappingURL=OrbitCameraBase.js.map