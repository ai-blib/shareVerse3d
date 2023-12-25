import { Cancellable } from "@lincode/promiselikes";
import { forceGet, lazy } from "@lincode/utils";
import { Object3D } from "three";
import getWorldPosition from "../../display/utils/getWorldPosition";
import { positionChanged } from "../../display/utils/trackObject";
import { vec2Point } from "../../display/utils/vec2Point";
import { scaleUp, scaleDown } from "../../engine/constants";
import scene from "../../engine/scene";
import { onBeforeRender } from "../../events/onBeforeRender";
import Appendable from "./Appendable";
const lazyObjectLoop = lazy(() => onBeforeRender(() => {
    for (const [item, cbs] of onMoveMap)
        if (positionChanged(item))
            for (const cb of cbs)
                cb();
}));
const onMoveMap = new Map();
export const onObjectMove = (item, cb) => {
    lazyObjectLoop();
    const set = forceGet(onMoveMap, item, makeSet);
    set.add(cb);
    return new Cancellable(() => {
        set.delete(cb);
        !set.size && onMoveMap.delete(item);
    });
};
const makeSet = () => new Set();
export default class PositionedItem extends Appendable {
    constructor(outerObject3d = new Object3D()) {
        super(outerObject3d);
        scene.add(outerObject3d);
    }
    get x() {
        return this.outerObject3d.position.x * scaleUp;
    }
    set x(val) {
        this.outerObject3d.position.x = val * scaleDown;
    }
    get y() {
        return this.outerObject3d.position.y * scaleUp;
    }
    set y(val) {
        this.outerObject3d.position.y = val * scaleDown;
    }
    get z() {
        return this.outerObject3d.position.z * scaleUp;
    }
    set z(val) {
        this.outerObject3d.position.z = val * scaleDown;
    }
    getWorldPosition() {
        return vec2Point(getWorldPosition(this.nativeObject3d));
    }
    _onMove;
    get onMove() {
        return this._onMove;
    }
    set onMove(cb) {
        this._onMove = cb;
        this.cancelHandle("onMove", cb && (() => onObjectMove(this.outerObject3d, cb)));
    }
}
export const isPositionedItem = (item) => item instanceof Appendable && "x" in item;
//# sourceMappingURL=PositionedItem.js.map