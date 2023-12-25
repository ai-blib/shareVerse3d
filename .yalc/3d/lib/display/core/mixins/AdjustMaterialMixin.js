import { Cancellable } from "@lincode/promiselikes";
import { WebGLCubeRenderTarget, CubeCamera } from "three";
import Appendable from "../../../api/core/Appendable";
import { NEAR } from "../../../globals";
import { pushReflectionPairs, pullReflectionPairs } from "../../../states/useReflectionPairs";
import unsafeGetValue from "../../../utils/unsafeGetValue";
import unsafeSetValue from "../../../utils/unsafeSetValue";
import { attachStandardMaterialManager } from "../../material/attachMaterialManager";
const setNumber = (material, property, factor) => {
    const defaultValue = (material.userData[property] ??=
        unsafeGetValue(material, property));
    unsafeSetValue(material, property, factor === undefined
        ? defaultValue
        : Math.max(defaultValue || 0, 0.25) * factor);
};
const setProperty = (material, property, value) => {
    const defaultValue = (material.userData[property] ??= unsafeGetValue(material, property));
    unsafeSetValue(material, property, value === undefined ? defaultValue : value);
};
export default class AdjustMaterialMixin extends Appendable {
    _refreshFactors(handle, materialManagers) {
        const { _metalnessFactor, _roughnessFactor, _opacityFactor, _envFactor, _reflection } = this;
        let reflectionTexture;
        if (_reflection) {
            const cubeRenderTarget = new WebGLCubeRenderTarget(256);
            reflectionTexture = cubeRenderTarget.texture;
            const cubeCamera = new CubeCamera(NEAR, 10, cubeRenderTarget);
            const pair = [this, cubeCamera];
            pushReflectionPairs(pair);
            handle.then(() => {
                cubeRenderTarget.dispose();
                reflectionTexture = undefined;
                pullReflectionPairs(pair);
            });
        }
        for (const materialManager of materialManagers) {
            const material = materialManager.nativeMaterial;
            if (material.wireframe)
                return;
            if (_metalnessFactor !== undefined)
                setNumber(material, "metalness", _metalnessFactor !== 0 ? _metalnessFactor : undefined);
            if (_roughnessFactor !== undefined)
                setNumber(material, "roughness", _roughnessFactor !== 1 ? _roughnessFactor : undefined);
            if (_opacityFactor !== undefined) {
                setNumber(material, "opacity", _opacityFactor);
                setProperty(material, "transparent", _opacityFactor <= 1 ? true : undefined);
            }
            if (_envFactor !== undefined)
                setNumber(material, "envMapIntensity", _envFactor !== 1 ? _envFactor : undefined);
            if (_reflection !== undefined)
                setProperty(material, "envMap", reflectionTexture);
        }
    }
    refreshFactors() {
        this.cancelHandle("refreshFactors", () => {
            const handle = new Cancellable();
            queueMicrotask(() => {
                if (handle.done)
                    return;
                this._refreshFactors(handle, attachStandardMaterialManager(this.nativeObject3d, this));
            });
            return handle;
        });
    }
    _metalnessFactor;
    get metalnessFactor() {
        return this._metalnessFactor;
    }
    set metalnessFactor(val) {
        this._metalnessFactor = val;
        this.refreshFactors();
    }
    _roughnessFactor;
    get roughnessFactor() {
        return this._roughnessFactor;
    }
    set roughnessFactor(val) {
        this._roughnessFactor = val;
        this.refreshFactors();
    }
    _opacityFactor;
    get opacityFactor() {
        return this._opacityFactor;
    }
    set opacityFactor(val) {
        this._opacityFactor = val;
        this.refreshFactors();
    }
    _envFactor;
    get envFactor() {
        return this._envFactor;
    }
    set envFactor(val) {
        this._envFactor = val;
        this.refreshFactors();
    }
    _reflection;
    get reflection() {
        return this._reflection ?? false;
    }
    set reflection(val) {
        this._reflection = val;
        this.refreshFactors();
    }
}
//# sourceMappingURL=AdjustMaterialMixin.js.map