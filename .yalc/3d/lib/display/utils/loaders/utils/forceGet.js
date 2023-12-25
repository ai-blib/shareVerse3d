export const forceGet = (map, obj, factory) => {
    if (!map.has(obj)) {
        const item = factory();
        map.set(obj, item);
        return item;
    }
    return map.get(obj);
};
//# sourceMappingURL=forceGet.js.map