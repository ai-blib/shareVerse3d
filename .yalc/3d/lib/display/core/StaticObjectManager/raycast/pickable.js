import { Raycaster } from "three";
import { mouseEvents } from "../../../../api/mouse";
import { getManager } from "../../../../api/utils/manager";
import { scaleUp } from "../../../../engine/constants";
import { LingoMouseEvent } from "../../../../interface/IMouse";
import { getCameraRendered } from "../../../../states/useCameraRendered";
import { vec2Point } from "../../../utils/vec2Point";
const raycaster = new Raycaster();
raycaster.firstHitOnly = true;
const filterUnselectable = (item) => !item.object.userData.unselectable;
export const raycast = (x, y, candidates) => {
    raycaster.setFromCamera({ x, y }, getCameraRendered());
    return raycaster
        .intersectObjects([...candidates])
        .filter(filterUnselectable)[0];
};
// @ts-ignore
export default (name, candidates, then) => mouseEvents.on(name, (e) => {
    if (!candidates.size)
        return;
    const result = raycast(e.xNorm, e.yNorm, candidates);
    if (!result)
        return;
    const point = vec2Point(result.point);
    const distance = result.distance * scaleUp;
    const manager = getManager(result.object);
    then(manager, new LingoMouseEvent(e.clientX, e.clientY, e.xNorm, e.yNorm, point, distance, manager));
});
//# sourceMappingURL=pickable.js.map