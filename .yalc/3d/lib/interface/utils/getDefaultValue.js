import NullableDefault from "./NullableDefault";
export default (defaults, key, fillNullableDefault) => {
    const result = defaults[key];
    if (result instanceof NullableDefault)
        return fillNullableDefault ? result.value : undefined;
    if (fillNullableDefault)
        return result ?? "";
    return result;
};
export const equalsDefaultValue = (val, defaults, key) => {
    const result = defaults[key];
    if (result instanceof NullableDefault)
        return val === result.value || val === undefined;
    return val === result || val === "";
};
//# sourceMappingURL=getDefaultValue.js.map