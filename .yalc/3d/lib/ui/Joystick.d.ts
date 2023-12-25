import IJoystick from '../interface/IJoystick';
import { Point } from '@lincode/math';
import Nullable from '../interface/utils/Nullable';
import Appendable from '../api/core/Appendable';
export default class Joystick extends Appendable implements IJoystick {
    static componentName: string;
    static defaults: Partial<import("../interface/utils/Defaults").default<IJoystick>>;
    static schema: Required<import("../interface/utils/extractProps").ExtractProps<IJoystick>>;
    onMove: Nullable<(e: Point) => void>;
    onMoveStart: Nullable<(e: Point) => void>;
    onMoveEnd: Nullable<(e: Point) => void>;
    private onPressState;
    get onPress(): ((e: Point) => void) | undefined;
    set onPress(cb: ((e: Point) => void) | undefined);
    constructor();
}
