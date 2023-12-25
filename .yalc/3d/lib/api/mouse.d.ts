import Events from "@lincode/events";
import IMouse, { LingoMouseEvent, SimpleMouseEvent } from "../interface/IMouse";
import Nullable from "../interface/utils/Nullable";
import Appendable from "./core/Appendable";
export type MouseEventName = "click" | "rightClick" | "move" | "down" | "up";
export declare const mouseEvents: Events<LingoMouseEvent, MouseEventName>;
export declare class Mouse extends Appendable implements IMouse {
    static componentName: string;
    static defaults: Partial<import("../interface/utils/Defaults").default<IMouse>>;
    static schema: Required<import("../interface/utils/extractProps").ExtractProps<IMouse>>;
    onClick: Nullable<(e: SimpleMouseEvent) => void>;
    onRightClick: Nullable<(e: SimpleMouseEvent) => void>;
    onMouseMove: Nullable<(e: SimpleMouseEvent) => void>;
    onMouseDown: Nullable<(e: SimpleMouseEvent) => void>;
    onMouseUp: Nullable<(e: SimpleMouseEvent) => void>;
    onMousePress: Nullable<(e: SimpleMouseEvent) => void>;
    constructor();
}
declare const mouse: Mouse;
export default mouse;
