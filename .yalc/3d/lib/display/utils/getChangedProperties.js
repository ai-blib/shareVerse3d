import { forceGet } from "@lincode/utils";
import unsafeGetValue from "../../utils/unsafeGetValue";
const propertiesMap = new WeakMap();
const getProperties = (instance) => forceGet(propertiesMap, unsafeGetValue(instance, "constructor"), () => {
    const result = [];
    for (const [property, type] of Object.entries(unsafeGetValue(instance.constructor, "schema")))
        if (type === Boolean ||
            (type === Number &&
                property !== "rotation" &&
                property !== "scale"))
            result.push(property);
    return result;
});
const saveMap = new WeakMap();
export const saveProperties = (instance) => {
    const saved = {};
    for (const property of getProperties(instance))
        saved[property] = unsafeGetValue(instance, property);
    saveMap.set(instance, saved);
};
export default (instance) => {
    const changed = [];
    const saved = saveMap.get(instance);
    if (!saved)
        return changed;
    for (const property of getProperties(instance)) {
        const value = unsafeGetValue(instance, property);
        saved[property] !== value &&
            changed.push([property, saved[property], value]);
    }
    return changed;
};
//# sourceMappingURL=getChangedProperties.js.map