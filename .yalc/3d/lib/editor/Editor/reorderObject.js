export default (target, keyOrder) => {
    const result = {};
    for (const key of keyOrder)
        result[key] = target[key];
    const keySet = new Set(keyOrder);
    for (const [key, value] of Object.entries(target))
        !keySet.has(key) && (result[key] = value);
    return result;
};
//# sourceMappingURL=reorderObject.js.map