export default (target, keys) => {
    let objectWithKeys = {};
    for (const key of keys)
        if (key in target)
            objectWithKeys[key] = target[key];
    const keySet = new Set(keys);
    const objectRest = {};
    for (const [key, value] of Object.entries(target))
        if (!keySet.has(key))
            objectRest[key] = value;
    return [objectWithKeys, objectRest];
};
//# sourceMappingURL=splitObject.js.map