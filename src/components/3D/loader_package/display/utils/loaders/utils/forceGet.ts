type ForceGet = {
    <Key, Val>(map: Map<Key, Val>, obj: Key, factory: () => Val): Val
    <Key extends object, Val>(
        map: WeakMap<Key, Val>,
        obj: Key,
        factory: () => Val
    ): Val
};
export const forceGet: ForceGet = (
    map: Map<unknown, unknown> | WeakMap<any, unknown>,
    obj: unknown,
    factory: () => unknown
) => {
    if (!map.has(obj)) {
        const item = factory();
        map.set(obj, item);
        return item;
    }
    return map.get(obj);
};
