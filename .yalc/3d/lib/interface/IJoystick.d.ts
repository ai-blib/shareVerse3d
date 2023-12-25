import { Point } from "@lincode/math";
import IAppendable from "./IAppendable";
import { ExtractProps } from "./utils/extractProps";
import Nullable from "./utils/Nullable";
export default interface IJoystick extends IAppendable {
    onMove: Nullable<(e: Point) => void>;
    onMoveStart: Nullable<(e: Point) => void>;
    onMoveEnd: Nullable<(e: Point) => void>;
    onPress: Nullable<(e: Point) => void>;
}
export declare const joystickSchema: Required<ExtractProps<IJoystick>>;
export declare const joystickDefaults: Partial<import("./utils/Defaults").default<IJoystick>>;
