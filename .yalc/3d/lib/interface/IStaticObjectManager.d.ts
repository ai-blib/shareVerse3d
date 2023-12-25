import { LingoMouseEvent } from "./IMouse";
import { ExtractProps } from "./utils/extractProps";
import Nullable from "./utils/Nullable";
import IAppendable from "./IAppendable";
export default interface IStaticObjectManager extends IAppendable {
    onClick: Nullable<(e: LingoMouseEvent) => void>;
    onMouseDown: Nullable<(e: LingoMouseEvent) => void>;
    onMouseUp: Nullable<(e: LingoMouseEvent) => void>;
    onMouseOver: Nullable<(e: LingoMouseEvent) => void>;
    onMouseOut: Nullable<(e: LingoMouseEvent) => void>;
    onMouseMove: Nullable<(e: LingoMouseEvent) => void>;
    onLookToEnd: Nullable<() => void>;
    lookAt: Function | Array<any>;
    lookTo: Function | Array<any> | any;
    name: string;
    id: Nullable<string>;
}
export declare const staticObjectManagerSchema: Required<ExtractProps<IStaticObjectManager>>;
export declare const staticObjectManagerDefaults: Partial<import("./utils/Defaults").default<IStaticObjectManager>>;
