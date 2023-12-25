import { computeValuePerFrame } from "../../utils/computePerFrame";
import getWorldPosition from "./getWorldPosition";
import getWorldQuaternion from "./getWorldQuaternion";
export const positionChanged = computeValuePerFrame((target) => {
    const { userData } = target;
    const position = getWorldPosition(target);
    const result = userData.positionOld
        ? !position.equals(userData.positionOld)
        : false;
    userData.positionOld = position;
    return result;
});
export const quaternionChanged = computeValuePerFrame((target) => {
    const { userData } = target;
    const quaternion = getWorldQuaternion(target);
    const result = userData.quaternionOld
        ? !quaternion.equals(userData.quaternionOld)
        : false;
    userData.quaternionOld = quaternion;
    return result;
});
//# sourceMappingURL=trackObject.js.map