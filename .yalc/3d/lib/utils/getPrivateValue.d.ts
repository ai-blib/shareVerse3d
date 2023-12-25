type Access<T, Key> = T[Key];
declare const _default: <T extends object, Key extends string>(target: T, property: Key) => Access<T, Key>;
export default _default;
