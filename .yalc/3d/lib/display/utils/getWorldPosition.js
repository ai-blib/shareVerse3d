import { Vector3 } from "three";
import scene from "../../engine/scene";
import computePerFrame from "../../utils/computePerFrame";
export default computePerFrame((target) => target.parent === scene
    ? target.position.clone()
    : target.getWorldPosition(new Vector3()));
//# sourceMappingURL=getWorldPosition.js.map