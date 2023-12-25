import { Reactive } from "@lincode/reactivity";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";
import { Line2 } from "three/examples/jsm/lines/Line2";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { scaleDown } from "../engine/constants";
import scene from "../engine/scene";
import { addSelectiveBloom, deleteSelectiveBloom } from "../engine/renderLoop/effectComposer/selectiveBloomEffect";
import Appendable from "../api/core/Appendable";
export default class Line extends Appendable {
    constructor() {
        super();
        this.createEffect(() => {
            const { from, to, bloom } = this;
            if (!from || !to)
                return;
            const geometry = new LineGeometry().setPositions([
                from.x * scaleDown,
                from.y * scaleDown,
                from.z * scaleDown,
                to.x * scaleDown,
                to.y * scaleDown,
                to.z * scaleDown
            ]);
            const material = new LineMaterial({
                linewidth: this._thickness * scaleDown
            });
            const line = new Line2(geometry, material);
            scene.add(line);
            bloom && addSelectiveBloom(line);
            return () => {
                scene.remove(line);
                geometry.dispose();
                material.dispose();
                bloom && deleteSelectiveBloom(line);
            };
        }, [this.refresh.get]);
    }
    refresh = new Reactive({});
    _bloom;
    get bloom() {
        return this._bloom;
    }
    set bloom(value) {
        this._bloom = value;
        this.refresh.set({});
    }
    _from;
    get from() {
        return this._from;
    }
    set from(value) {
        this._from = value;
        this.refresh.set({});
    }
    _to;
    get to() {
        return this._to;
    }
    set to(value) {
        this._to = value;
        this.refresh.set({});
    }
    _thickness = 1;
    get thickness() {
        return this._thickness;
    }
    set thickness(value) {
        this._thickness = value;
        this.refresh.set({});
    }
}
//# sourceMappingURL=Line.js.map