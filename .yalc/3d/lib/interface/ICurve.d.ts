import { Point3d } from "@lincode/math";
import IAppendable from "./IAppendable";
import { ExtractProps } from "./utils/extractProps";
export default interface ICurve extends IAppendable {
    points: Array<Point3d>;
    helper: boolean;
    subdivide: number;
}
export declare const curveSchema: Required<ExtractProps<ICurve>>;
export declare const curveDefaults: Partial<import("./utils/Defaults").default<ICurve>>;
