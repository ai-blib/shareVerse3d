import { appendableDefaults, appendableSchema } from "./IAppendable";
import { extendDefaults } from "./utils/Defaults";
export class LingoMouseEvent {
    clientX;
    clientY;
    xNorm;
    yNorm;
    point;
    distance;
    target;
    constructor(clientX, clientY, xNorm, yNorm, point, distance, target) {
        this.clientX = clientX;
        this.clientY = clientY;
        this.xNorm = xNorm;
        this.yNorm = yNorm;
        this.point = point;
        this.distance = distance;
        this.target = target;
    }
}
export const mouseSchema = {
    ...appendableSchema,
    onClick: Function,
    onRightClick: Function,
    onMouseMove: Function,
    onMouseDown: Function,
    onMouseUp: Function,
    onMousePress: Function
};
export const mouseDefaults = extendDefaults([appendableDefaults], {
    onClick: undefined,
    onRightClick: undefined,
    onMouseMove: undefined,
    onMouseDown: undefined,
    onMouseUp: undefined,
    onMousePress: undefined
});
//# sourceMappingURL=IMouse.js.map