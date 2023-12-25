import { Color } from "three";
import { standardMaterialManagerDefaults, standardMaterialManagerSchema } from "../../interface/IStandardMaterialManager";
import loadTexture from "../utils/loaders/loadTexture";
import BasicMaterialManager from "./BasicMaterialManager";
const mapNames = [
    "map",
    "alphaMap",
    "envMap",
    "aoMap",
    "bumpMap",
    "displacementMap",
    "lightMap",
    "metalnessMap",
    "roughnessMap",
    "normalMap"
];
export default class StandardMaterialManager extends BasicMaterialManager {
    static componentName = "standardMaterial";
    static defaults = standardMaterialManagerDefaults;
    static schema = standardMaterialManagerSchema;
    get wireframe() {
        return this.nativeMaterial.wireframe;
    }
    set wireframe(val) {
        this.nativeMaterial.wireframe = val;
    }
    _envMap;
    get envMap() {
        return this._envMap;
    }
    set envMap(val) {
        this._envMap = val;
        this.nativeMaterial.envMap = val ? loadTexture(val) : null;
        this.applyTexture(mapNames);
    }
    get envMapIntensity() {
        return this.nativeMaterial.envMapIntensity;
    }
    set envMapIntensity(val) {
        this.nativeMaterial.envMapIntensity = val;
    }
    _aoMap;
    get aoMap() {
        return this._aoMap;
    }
    set aoMap(val) {
        this._aoMap = val;
        this.nativeMaterial.aoMap = val ? loadTexture(val) : null;
        this.applyTexture(mapNames);
    }
    get aoMapIntensity() {
        return this.nativeMaterial.aoMapIntensity;
    }
    set aoMapIntensity(val) {
        this.nativeMaterial.aoMapIntensity = val;
    }
    _bumpMap;
    get bumpMap() {
        return this._bumpMap;
    }
    set bumpMap(val) {
        this._bumpMap = val;
        this.nativeMaterial.bumpMap = val ? loadTexture(val) : null;
        this.applyTexture(mapNames);
    }
    get bumpScale() {
        return this.nativeMaterial.bumpScale;
    }
    set bumpScale(val) {
        this.nativeMaterial.bumpScale = val;
    }
    _displacementMap;
    get displacementMap() {
        return this._displacementMap;
    }
    set displacementMap(val) {
        this._displacementMap = val;
        this.nativeMaterial.displacementMap = val ? loadTexture(val) : null;
        this.applyTexture(mapNames);
    }
    get displacementScale() {
        return this.nativeMaterial.displacementScale;
    }
    set displacementScale(val) {
        this.nativeMaterial.displacementScale = val;
    }
    get displacementBias() {
        return this.nativeMaterial.displacementBias;
    }
    set displacementBias(val) {
        this.nativeMaterial.displacementBias = val;
    }
    get emissiveIntensity() {
        return this.nativeMaterial.emissiveIntensity;
    }
    set emissiveIntensity(val) {
        this.nativeMaterial.emissiveIntensity = val;
    }
    get emissive() {
        return this.nativeMaterial.emissive.getHexString() !== "000000";
    }
    set emissive(val) {
        this.nativeMaterial.emissive = val
            ? this.nativeMaterial.color
            : new Color(0);
    }
    _lightMap;
    get lightMap() {
        return this._lightMap;
    }
    set lightMap(val) {
        this._lightMap = val;
        this.nativeMaterial.lightMap = val ? loadTexture(val) : null;
        this.applyTexture(mapNames);
    }
    get lightMapIntensity() {
        return this.nativeMaterial.lightMapIntensity;
    }
    set lightMapIntensity(val) {
        this.nativeMaterial.lightMapIntensity = val;
    }
    _metalnessMap;
    get metalnessMap() {
        return this._metalnessMap;
    }
    set metalnessMap(val) {
        this._metalnessMap = val;
        this.nativeMaterial.metalnessMap = val ? loadTexture(val) : null;
        this.applyTexture(mapNames);
    }
    get metalness() {
        return this.nativeMaterial.metalness;
    }
    set metalness(val) {
        this.nativeMaterial.metalness = val;
    }
    _roughnessMap;
    get roughnessMap() {
        return this._roughnessMap;
    }
    set roughnessMap(val) {
        this._roughnessMap = val;
        this.nativeMaterial.roughnessMap = val ? loadTexture(val) : null;
        this.applyTexture(mapNames);
    }
    get roughness() {
        return this.nativeMaterial.roughness;
    }
    set roughness(val) {
        this.nativeMaterial.roughness = val;
    }
    _normalMap;
    get normalMap() {
        return this._normalMap;
    }
    set normalMap(val) {
        this._normalMap = val;
        this.nativeMaterial.normalMap = val ? loadTexture(val) : null;
        this.applyTexture(mapNames);
    }
    get normalScale() {
        return this.nativeMaterial.normalScale.x;
    }
    set normalScale(val) {
        this.nativeMaterial.normalScale.set(val, val);
    }
}
//# sourceMappingURL=StandardMaterialManager.js.map