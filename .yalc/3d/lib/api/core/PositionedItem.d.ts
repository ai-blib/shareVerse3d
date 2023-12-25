import { Point3d } from "@lincode/math";
import { Cancellable } from "@lincode/promiselikes";
import { Object3D } from "three";
import IPositioned from "../../interface/IPositioned";
import Appendable from "./Appendable";
export declare const onObjectMove: (item: Object3D, cb: () => void) => Cancellable;
export default abstract class PositionedItem<T extends Object3D = Object3D> extends Appendable<T> implements IPositioned {
    constructor(outerObject3d?: T);
    get x(): number;
    set x(val: number);
    get y(): number;
    set y(val: number);
    get z(): number;
    set z(val: number);
    getWorldPosition(): Point3d;
    private _onMove?;
    get onMove(): (() => void) | undefined;
    set onMove(cb: (() => void) | undefined);
}
export declare const isPositionedItem: (item: any) => item is PositionedItem<Object3D<import("three").Event>>;
