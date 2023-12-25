import unsafeGetValue from "../../../../utils/unsafeGetValue";
import unsafeSetValue from "../../../../utils/unsafeSetValue";
import copyMaterial from "./copyMaterial";
const properties = [
    "map",
    "gradientMap",
    "lightMap",
    "lightMapIntensity",
    "aoMap",
    "aoMapIntensity",
    "emissiveMap",
    "emissiveIntensity",
    "bumpMap",
    "bumpScale",
    "normalMap",
    "normalMapType",
    "displacementMap",
    "displacementScale",
    "displacementBias",
    "alphaMap",
    "wireframe",
    "wireframeLinewidth",
    "wireframeLinecap",
    "wireframeLinejoin",
    "fog"
];
export default (source, target) => {
    copyMaterial(source, target);
    for (const prop of properties) {
        const value = unsafeGetValue(source, prop);
        value != null && unsafeSetValue(target, prop, value);
    }
    "color" in source && target.color.copy(source.color);
    "emissive" in source && target.emissive.copy(source.emissive);
    "normalScale" in source && target.normalScale.copy(source.normalScale);
};
//# sourceMappingURL=copyToon.js.map