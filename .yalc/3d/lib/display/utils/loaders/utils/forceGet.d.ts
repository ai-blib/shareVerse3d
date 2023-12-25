type ForceGet = {
    <Key, Val>(map: Map<Key, Val>, obj: Key, factory: () => Val): Val;
    <Key extends object, Val>(map: WeakMap<Key, Val>, obj: Key, factory: () => Val): Val;
};
export declare const forceGet: ForceGet;
export {};
