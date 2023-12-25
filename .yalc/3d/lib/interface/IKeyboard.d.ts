import IAppendable from "./IAppendable";
import { ExtractProps } from "./utils/extractProps";
import Nullable from "./utils/Nullable";
export default interface IKeyboard extends IAppendable {
    onKeyPress: Nullable<(key: string, keys: Set<string>) => void>;
    onKeyUp: Nullable<(key: string, keys: Set<string>) => void>;
    onKeyDown: Nullable<(key: string, keys: Set<string>) => void>;
}
export declare const keyboardSchema: Required<ExtractProps<IKeyboard>>;
export declare const keyboardDefaults: Partial<import("./utils/Defaults").default<IKeyboard>>;
