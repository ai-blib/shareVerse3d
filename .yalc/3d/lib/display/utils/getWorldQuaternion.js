import { Quaternion } from "three";
import scene from "../../engine/scene";
import computePerFrame from "../../utils/computePerFrame";
export default computePerFrame((target) => target.parent === scene
    ? target.quaternion.clone()
    : target.getWorldQuaternion(new Quaternion()));
//# sourceMappingURL=getWorldQuaternion.js.map