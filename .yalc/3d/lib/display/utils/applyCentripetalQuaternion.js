import { Object3D } from "three/src/Three";
import getWorldPosition from "./getWorldPosition";
import { halfPi } from "./reusables";
const dirObj = new Object3D();
export default (target) => {
    const dir = getWorldPosition(target.outerObject3d).normalize();
    dirObj.lookAt(dir);
    dirObj.rotateX(halfPi);
    return target.outerObject3d.quaternion.copy(dirObj.quaternion);
};
//# sourceMappingURL=applyCentripetalQuaternion.js.map