type Access<T, Key> = Key extends "constructor" ? any : T[Key];
type UnknownToAny<T> = T extends string | number | boolean | object | Function | undefined | null ? T : any;
declare const _default: <T extends object, Key extends string>(target: T, property: Key) => UnknownToAny<Access<T, Key>>;
export default _default;
