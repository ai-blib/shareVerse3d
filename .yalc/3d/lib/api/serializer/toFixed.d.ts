import { Point, Point3d } from "@lincode/math";
declare const toFixed: (key: string, v: number) => number;
export default toFixed;
export declare const toFixedPoint: (value: Point | Point3d) => {
    x: number;
    y: number;
    z: number;
} | {
    x: number;
    y: number;
    z?: undefined;
};
