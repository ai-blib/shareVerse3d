import NullableDefault from "./NullableDefault";
import Options from "./Options";
type Defaults<T> = {
    [key in keyof T]: T[key] | NullableDefault<T[key]>;
};
export default Defaults;
export declare const defaultsOptionsMap: WeakMap<Defaults<any>, Partial<{
    [x: string]: import("./Range").default | import("./Choices").default<any>;
}>>;
export declare const defaultsOwnKeysRecordMap: WeakMap<Defaults<any>, Partial<Record<string, true>>>;
export declare const extendDefaults: <T>(parentDefaults: Partial<Defaults<T>>[], ownDefaults: Partial<Defaults<T>>, options?: Partial<{ [key in keyof T]: import("./Range").default | import("./Choices").default<any>; }> | undefined, ownKeysRecord?: Partial<Record<keyof T, true>> | undefined) => Partial<Defaults<T>>;
