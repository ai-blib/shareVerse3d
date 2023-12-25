import { Object3D } from "three"
// @ts-ignore
import { clone } from "three/examples/jsm/utils/SkeletonUtils"

export const skinnedMeshSet = new WeakSet<Object3D>()

export default <T extends Object3D>(
    target: T,
    noBone: boolean,
    animations = target.animations
) => {
    const result = noBone ? target.clone() : clone(target)
    !noBone && skinnedMeshSet.add(result as Object3D)
    result.animations = animations
    return result as T
}
