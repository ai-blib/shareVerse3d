// @ts-ignore
import { clone } from "three/examples/jsm/utils/SkeletonUtils";
export const skinnedMeshSet = new WeakSet();
export default (target, noBone, animations = target.animations) => {
    const result = noBone ? target.clone() : clone(target);
    !noBone && skinnedMeshSet.add(result);
    result.animations = animations;
    return result;
};
//# sourceMappingURL=cloneSkinnedMesh.js.map