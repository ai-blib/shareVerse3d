import Appendable from "../api/core/Appendable";
import { ExtractProps } from "./utils/extractProps";
import Nullable from "./utils/Nullable";
export default interface IAppendable {
    onLoop: Nullable<() => void>;
    proxy: Nullable<Appendable>;
    uuid: string;
}
export declare const appendableSchema: Required<ExtractProps<IAppendable>>;
export declare const appendableDefaults: Partial<import("./utils/Defaults").default<IAppendable>>;
