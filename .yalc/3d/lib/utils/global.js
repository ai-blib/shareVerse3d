// @ts-nocheck
class Global {
    _fallToGround = true;
    constructor() { }
    set hove_model_uuid(e) {
        window._hove_model_uuid = e;
    }
    get hove_model_uuid() {
        return window._hove_model_uuid;
    }
    set isEditorMode(e) {
        window._isEditorMode = e;
    }
    get isEditorMode() {
        return window._isEditorMode;
    }
    get bvhOnGround() {
        return window._bvhOnGround;
    }
    set bvhOnGround(value) {
        window._bvhOnGround = value;
    }
    set isClickModel(val) {
        window._clickMode = val;
    }
    get isClickModel() {
        return window._clickMode;
    }
    set isFirstLoad(value) {
        this._fallToGround = value;
    }
    get isFirstLoad() {
        return this._fallToGround;
    }
}
export const global = new Global();
//# sourceMappingURL=global.js.map