import { CatmullRomCurve3 } from "three";
const curve = new CatmullRomCurve3([], undefined, "catmullrom", 0.5);
export default (vecs, t) => {
    curve.points = vecs;
    return curve.getPoint(t);
};
//# sourceMappingURL=getVecOnCurve.js.map