import Appendable from '../../../api/core/Appendable';
import { addOutline, deleteOutline } from '../../../engine/renderLoop/effectComposer/outlineEffect';
import { addSelectiveBloom, deleteSelectiveBloom } from '../../../engine/renderLoop/effectComposer/selectiveBloomEffect';
export default class VisibleMixin extends Appendable {
    _bloom;
    get bloom() {
        return !!this._bloom;
    }
    set bloom(val) {
        this._bloom = val;
        val ? addSelectiveBloom(this.nativeObject3d) : deleteSelectiveBloom(this.nativeObject3d);
    }
    _outline;
    get outline() {
        return !!this._outline;
    }
    set outline(val) {
        this._outline = val;
        val ? addOutline(this.nativeObject3d) : deleteOutline(this.nativeObject3d);
    }
    _visible;
    get visible() {
        return this._visible !== false;
    }
    set visible(val) {
        this._visible = val;
        this.outerObject3d.visible = val;
    }
    get frustumCulled() {
        return this.outerObject3d.frustumCulled;
    }
    set frustumCulled(val) {
        this.outerObject3d.traverse(child => (child.frustumCulled = true));
    }
    _castShadow;
    get castShadow() {
        return this._castShadow ?? true;
    }
    _firstInnerY;
    get firstInnerY() {
        return this._firstInnerY;
    }
    set firstInnerY(val) {
        this._firstInnerY = val;
    }
    _firstInnerZ;
    get firstInnerZ() {
        return this._firstInnerZ;
    }
    set firstInnerZ(val) {
        this._firstInnerZ = val;
    }
    _firstInnerX;
    get firstInnerX() {
        return this._firstInnerX;
    }
    set firstInnerX(val) {
        this._firstInnerX = val;
    }
    set castShadow(val) {
        this._castShadow = val;
        this.outerObject3d.traverse(child => (child.castShadow = val));
    }
    _receiveShadow;
    get receiveShadow() {
        return this._receiveShadow ?? true;
    }
    set receiveShadow(val) {
        this._receiveShadow = val;
        this.outerObject3d.traverse(child => (child.receiveShadow = val));
    }
}
//# sourceMappingURL=VisibleMixin.js.map