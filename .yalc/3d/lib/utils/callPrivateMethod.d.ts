type Access<T, Key> = T[Key];
declare const _default: <T extends object, Key extends string>(target: T, property: Key, arg?: any) => Access<T, Key> extends () => any ? ReturnType<Access<T, Key>> : never;
export default _default;
