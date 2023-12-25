import IKeyboard from "../interface/IKeyboard";
import Nullable from "../interface/utils/Nullable";
import Appendable from "./core/Appendable";
export declare const isPressed: Set<string>;
export declare class Keyboard extends Appendable implements IKeyboard {
    static componentName: string;
    static defaults: Partial<import("../interface/utils/Defaults").default<IKeyboard>>;
    static schema: Required<import("../interface/utils/extractProps").ExtractProps<IKeyboard>>;
    onKeyPress: Nullable<(key: string, keys: Set<string>) => void>;
    onKeyUp: Nullable<(key: string, keys: Set<string>) => void>;
    onKeyDown: Nullable<(key: string, keys: Set<string>) => void>;
    constructor();
}
declare const keyboard: Keyboard;
export default keyboard;
