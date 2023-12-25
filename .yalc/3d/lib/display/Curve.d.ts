import { Point3d } from '@lincode/math';
import ICurve from '../interface/ICurve';
import Appendable from '../api/core/Appendable';
export default class Curve extends Appendable implements ICurve {
    static componentName: string;
    static defaults: Partial<import("../interface/utils/Defaults").default<ICurve>>;
    static schema: Required<import("../interface/utils/extractProps").ExtractProps<ICurve>>;
    constructor();
    private refreshState;
    private helperState;
    get helper(): boolean;
    set helper(val: boolean);
    private _subdivide;
    get subdivide(): number;
    set subdivide(val: number);
    private _points;
    get points(): Point3d[];
    set points(val: Point3d[]);
    addPoint(pt: Point3d): void;
}
