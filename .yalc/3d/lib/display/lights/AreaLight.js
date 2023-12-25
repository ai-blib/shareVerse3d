import { RectAreaLight } from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { areaLightDefaults, areaLightSchema } from "../../interface/IAreaLight";
import { lazy } from "@lincode/utils";
import ObjectManager from "../core/ObjectManager";
import mainCamera from "../../engine/mainCamera";
import scene from "../../engine/scene";
import { scaleDown } from "../../engine/constants";
import { onTransformControls } from "../../events/onTransformControls";
import { Reactive } from "@lincode/reactivity";
import { getSelectionTarget } from "../../states/useSelectionTarget";
import { getCameraRendered } from "../../states/useCameraRendered";
import { ssrExcludeSet } from "../../engine/renderLoop/effectComposer/ssrEffect/renderSetup";
import selectionCandidates, { additionalSelectionCandidates } from "../core/StaticObjectManager/raycast/selectionCandidates";
import { getEditorModeComputed } from "../../states/useEditorModeComputed";
import { setManager } from "../../api/utils/manager";
const lazyInit = lazy(async () => {
    const { RectAreaLightUniformsLib } = await import("three/examples/jsm/lights/RectAreaLightUniformsLib");
    RectAreaLightUniformsLib.init();
});
export default class AreaLight extends ObjectManager {
    static componentName = "areaLight";
    static defaults = areaLightDefaults;
    static schema = areaLightSchema;
    light;
    constructor() {
        super();
        lazyInit().then(() => {
            if (this.done)
                return;
            const light = (this.light = new RectAreaLight(this._color, this._intensity, this.width * this.scaleX * scaleDown, this.height * this.scaleY * scaleDown));
            this.object3d.add(light);
            this.then(() => light.dispose());
            this.createEffect(() => {
                if (getEditorModeComputed() !== "scale" ||
                    getSelectionTarget() !== this)
                    return;
                const handle = onTransformControls(() => {
                    const { x, y } = this.outerObject3d.scale;
                    this.scaleX = x;
                    this.scaleY = y;
                });
                return () => {
                    handle.cancel();
                };
            }, [getEditorModeComputed, getSelectionTarget]);
            this.createEffect(() => {
                if (getCameraRendered() !== mainCamera ||
                    !this.helperState.get())
                    return;
                const helper = new RectAreaLightHelper(light);
                scene.add(helper);
                ssrExcludeSet.add(helper);
                setManager(helper, this);
                selectionCandidates.add(helper);
                additionalSelectionCandidates.add(helper);
                return () => {
                    helper.dispose();
                    scene.remove(helper);
                    ssrExcludeSet.delete(helper);
                    selectionCandidates.delete(helper);
                    additionalSelectionCandidates.delete(helper);
                };
            }, [getCameraRendered, this.helperState.get]);
        });
    }
    shadowResolution;
    helperState = new Reactive(true);
    get helper() {
        return this.helperState.get();
    }
    set helper(val) {
        this.helperState.set(val);
    }
    _color;
    get color() {
        return this._color ?? "#ffffff";
    }
    set color(val) {
        this._color = val;
        this.light?.color.set(val);
    }
    _intensity;
    get intensity() {
        return this._intensity ?? 1;
    }
    set intensity(val) {
        this._intensity = val;
        this.light && (this.light.intensity = val);
    }
    _width;
    get width() {
        return this._width ?? 100;
    }
    set width(val) {
        this._width = val;
        this.light && (this.light.width = val * this.scaleX * scaleDown);
    }
    _height;
    get height() {
        return this._height ?? 100;
    }
    set height(val) {
        this._height = val;
        this.light && (this.light.height = val * this.scaleY * scaleDown);
    }
    _scaleX;
    get scaleX() {
        return this._scaleX ?? 1;
    }
    set scaleX(val) {
        this._scaleX = val;
        this.light && (this.light.width = val * this.width * scaleDown);
    }
    _scaleY;
    get scaleY() {
        return this._scaleY ?? 1;
    }
    set scaleY(val) {
        this._scaleY = val;
        this.light && (this.light.height = val * this.height * scaleDown);
    }
    get depth() {
        return 0;
    }
    set depth(_) { }
    get scaleZ() {
        return 0;
    }
    set scaleZ(_) { }
    _castShadow;
    get castShadow() {
        return !!this._castShadow;
    }
    set castShadow(val) {
        this._castShadow = val;
    }
}
//# sourceMappingURL=AreaLight.js.map