import setupStruct from "../engine/setupStruct";
import { ExtractProps } from "./utils/extractProps";
type Type = typeof setupStruct;
export default interface ISetup extends Type {
}
export declare const setupSchema: Required<ExtractProps<ISetup>>;
export declare const setupDefaults: Partial<import("./utils/Defaults").default<ISetup>>;
export {};
