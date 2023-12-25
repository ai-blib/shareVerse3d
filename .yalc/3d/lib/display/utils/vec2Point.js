import { Point3d } from "@lincode/math";
import { Vector3 } from "three";
import { scaleDown, scaleUp } from "../../engine/constants";
export const vec2Point = (vec) => new Point3d(vec.x * scaleUp, vec.y * scaleUp, vec.z * scaleUp);
export const point2Vec = (point) => new Vector3(point.x * scaleDown, point.y * scaleDown, point.z * scaleDown);
//# sourceMappingURL=vec2Point.js.map