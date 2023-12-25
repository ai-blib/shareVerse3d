import { Point3d } from "@lincode/math";
import Appendable from "../api/core/Appendable";
export default class Line extends Appendable {
    constructor();
    private refresh;
    private _bloom?;
    get bloom(): boolean | undefined;
    set bloom(value: boolean | undefined);
    private _from?;
    get from(): Point3d | undefined;
    set from(value: Point3d | undefined);
    private _to?;
    get to(): Point3d | undefined;
    set to(value: Point3d | undefined);
    private _thickness;
    get thickness(): number;
    set thickness(value: number);
}
