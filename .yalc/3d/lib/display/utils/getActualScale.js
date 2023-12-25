import computePerFrame from "../../utils/computePerFrame";
export default computePerFrame((target) => target.nativeObject3d.scale.clone().multiply(target.outerObject3d.scale));
//# sourceMappingURL=getActualScale.js.map