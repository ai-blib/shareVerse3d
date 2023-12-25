import { GetGlobalState, SetGlobalState } from "@lincode/reactivity";
declare const _default: <T>(val: T) => readonly [() => readonly [T, SetGlobalState<T>], SetGlobalState<T>, GetGlobalState<T>];
export default _default;
