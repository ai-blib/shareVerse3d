import { Point3d } from "@lincode/math";
import StaticObjectManager from "../display/core/StaticObjectManager";
import IAppendable from "./IAppendable";
import { ExtractProps } from "./utils/extractProps";
import Nullable from "./utils/Nullable";
export declare class LingoMouseEvent {
    clientX: number;
    clientY: number;
    xNorm: number;
    yNorm: number;
    point: Point3d;
    distance: number;
    target: StaticObjectManager | undefined;
    constructor(clientX: number, clientY: number, xNorm: number, yNorm: number, point: Point3d, distance: number, target: StaticObjectManager | undefined);
}
export type SimpleMouseEvent = {
    clientX: number;
    clientY: number;
};
export default interface IMouse extends IAppendable {
    onClick: Nullable<(e: SimpleMouseEvent) => void>;
    onRightClick: Nullable<(e: SimpleMouseEvent) => void>;
    onMouseMove: Nullable<(e: SimpleMouseEvent) => void>;
    onMouseDown: Nullable<(e: SimpleMouseEvent) => void>;
    onMouseUp: Nullable<(e: SimpleMouseEvent) => void>;
    onMousePress: Nullable<(e: SimpleMouseEvent) => void>;
}
export declare const mouseSchema: Required<ExtractProps<IMouse>>;
export declare const mouseDefaults: Partial<import("./utils/Defaults").default<IMouse>>;
