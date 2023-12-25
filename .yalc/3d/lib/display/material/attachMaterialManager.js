import { forceGet } from "@lincode/utils";
import unsafeGetValue from "../../utils/unsafeGetValue";
import unsafeSetValue from "../../utils/unsafeSetValue";
import BasicMaterialManager from "./BasicMaterialManager";
import StandardMaterialManager from "./StandardMaterialManager";
const materialManagerMap = new WeakMap();
export const attachStandardMaterialManager = (target, manager, recursive, result = [], recursiveClonedMap, material = unsafeGetValue(target, "material")) => forceGet(materialManagerMap, target, () => {
    if (recursive) {
        const recursiveCache = new WeakMap();
        target.traverse((child) => attachStandardMaterialManager(child, manager, false, result, recursiveCache));
        return result;
    }
    if (!material)
        return result;
    if (Array.isArray(material))
        material = material[0];
    if (recursiveClonedMap?.has(material)) {
        unsafeSetValue(target, "material", recursiveClonedMap.get(material));
        return result;
    }
    const clone = material.clone();
    if (material === unsafeGetValue(target, "material"))
        unsafeSetValue(target, "material", clone);
    recursiveClonedMap?.set(material, clone);
    const materialManager = new StandardMaterialManager(clone);
    material.dispose();
    manager.append(materialManager);
    result.push(materialManager);
    return result;
});
export const attachBasicMaterialManager = (target, manager) => forceGet(materialManagerMap, target, () => {
    const material = unsafeGetValue(target, "material");
    if (!material)
        return [];
    const materialManager = new BasicMaterialManager(unsafeSetValue(target, "material", material.clone()));
    material.dispose();
    manager.append(materialManager);
    return [materialManager];
});
//# sourceMappingURL=attachMaterialManager.js.map