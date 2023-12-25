import { forceGet } from "@lincode/utils";
export const defaultsOptionsMap = new WeakMap();
export const defaultsOwnKeysRecordMap = new WeakMap();
const makeRecord = () => ({});
const inheritOptions = (defaults, parentDefaults) => {
    Object.assign(forceGet(defaultsOptionsMap, defaults, makeRecord), defaultsOptionsMap.get(parentDefaults));
    Object.assign(forceGet(defaultsOwnKeysRecordMap, defaults, makeRecord), defaultsOwnKeysRecordMap.get(parentDefaults));
};
export const extendDefaults = (parentDefaults, ownDefaults, options, ownKeysRecord) => {
    const result = {};
    options && defaultsOptionsMap.set(result, options);
    ownKeysRecord && defaultsOwnKeysRecordMap.set(result, ownKeysRecord);
    for (const defaults of parentDefaults) {
        Object.assign(result, defaults);
        inheritOptions(result, defaults);
    }
    Object.assign(result, ownDefaults);
    inheritOptions(result, ownDefaults);
    return result;
};
//# sourceMappingURL=Defaults.js.map