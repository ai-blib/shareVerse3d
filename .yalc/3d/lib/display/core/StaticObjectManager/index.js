import { distance3d, Point3d } from "@lincode/math";
import { Matrix3, PropertyBinding } from "three";
import { frustum, matrix4, ray, vector3, vector3_1, vector3_half } from "../../utils/reusables";
import { forceGet, throttle } from "@lincode/utils";
import { OBB } from "three/examples/jsm/math/OBB";
import { scaleDown, scaleUp } from "../../../engine/constants";
import worldToClient from "../../utils/worldToClient";
import { Cancellable } from "@lincode/promiselikes";
import { point2Vec, vec2Point } from "../../utils/vec2Point";
import getCenter from "../../utils/getCenter";
import { getCameraRendered } from "../../../states/useCameraRendered";
import { onBeforeRender } from "../../../events/onBeforeRender";
import diffQuaternions from "../../utils/diffQuaternions";
import getWorldPosition from "../../utils/getWorldPosition";
import getWorldDirection from "../../utils/getWorldDirection";
import { clickSet, mouseDownSet, mouseUpSet, mouseOverSet, mouseOutSet, mouseMoveSet } from "./raycast/sets";
import "./raycast";
import fpsAlpha from "../../utils/fpsAlpha";
import { emitId } from "../../../events/onId";
import { emitName } from "../../../events/onName";
import Appendable from "../../../api/core/Appendable";
const thisOBB = new OBB();
const targetOBB = new OBB();
const updateFrustum = throttle(() => {
    const camera = getCameraRendered();
    frustum.setFromProjectionMatrix(matrix4.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));
}, 200, "leading");
export const idMap = new Map();
const makeSet = () => new Set();
const allocateSet = (id) => forceGet(idMap, id, makeSet);
export const getMeshItemSets = (id) => {
    const targetSets = [];
    if (Array.isArray(id))
        for (const target of id)
            targetSets.push(allocateSet(target));
    else if (typeof id === "string")
        targetSets.push(allocateSet(id));
    else
        targetSets.push(new Set([id]));
    return targetSets;
};
export default class StaticObjectManager extends Appendable {
    dispose() {
        if (this.done)
            return this;
        super.dispose();
        this._id !== undefined && idMap.get(this._id).delete(this);
        return this;
    }
    _id;
    get id() {
        return this._id;
    }
    set id(val) {
        this._id !== undefined && idMap.get(this._id).delete(this);
        this._id = val;
        if (val === undefined)
            return;
        allocateSet(val).add(this);
        emitId(val);
    }
    addToRaycastSet(set) {
        set.add(this.nativeObject3d);
        return new Cancellable(() => set.delete(this.nativeObject3d));
    }
    _onClick;
    get onClick() {
        return this._onClick;
    }
    set onClick(cb) {
        this._onClick = cb;
        this.cancelHandle("onClick", cb && (() => this.addToRaycastSet(clickSet)));
    }
    _onMouseDown;
    get onMouseDown() {
        return this._onMouseDown;
    }
    set onMouseDown(cb) {
        this._onMouseDown = cb;
        this.cancelHandle("onMouseDown", cb && (() => this.addToRaycastSet(mouseDownSet)));
    }
    _onMouseUp;
    get onMouseUp() {
        return this._onMouseUp;
    }
    set onMouseUp(cb) {
        this._onMouseUp = cb;
        this.cancelHandle("onMouseUp", cb && (() => this.addToRaycastSet(mouseUpSet)));
    }
    _onMouseOver;
    get onMouseOver() {
        return this._onMouseOver;
    }
    set onMouseOver(cb) {
        this._onMouseOver = cb;
        this.cancelHandle("onMouseOver", cb && (() => this.addToRaycastSet(mouseOverSet)));
    }
    _onMouseOut;
    get onMouseOut() {
        return this._onMouseOut;
    }
    set onMouseOut(cb) {
        this._onMouseOut = cb;
        this.cancelHandle("onMouseOut", cb && (() => this.addToRaycastSet(mouseOutSet)));
    }
    _onMouseMove;
    get onMouseMove() {
        return this._onMouseMove;
    }
    set onMouseMove(cb) {
        this._onMouseMove = cb;
        this.cancelHandle("onMouseMove", cb && (() => this.addToRaycastSet(mouseMoveSet)));
    }
    get name() {
        return this.outerObject3d.name;
    }
    set name(val) {
        this.outerObject3d.name = PropertyBinding.sanitizeNodeName(val);
        emitName(this);
    }
    getRay() {
        return ray.set(getWorldPosition(this.nativeObject3d), getWorldDirection(this.nativeObject3d));
    }
    pointAt(distance) {
        return vec2Point(this.getRay().at(distance * scaleDown, vector3));
    }
    rayIntersectsAt(target, maxDistance) {
        if (this.done)
            return undefined;
        if (target.done)
            return undefined;
        if (this === target)
            return undefined;
        targetOBB.set(getWorldPosition(target.nativeObject3d), vector3_half, new Matrix3().setFromMatrix4(target.nativeObject3d.matrixWorld));
        const vec = targetOBB.intersectRay(this.getRay(), vector3);
        if (!vec)
            return;
        if (maxDistance) {
            const { x, y, z } = getWorldPosition(this.nativeObject3d);
            if (distance3d(vec.x, vec.y, vec.z, x, y, z) * scaleUp >
                maxDistance)
                return;
        }
        return vec2Point(vec);
    }
    rayIntersects(target) {
        return !!this.rayIntersectsAt(target);
    }
    intersects(target) {
        if (this.done)
            return false;
        if (target.done)
            return false;
        if (this === target)
            return false;
        thisOBB.set(getWorldPosition(this.nativeObject3d), vector3_1.clone(), new Matrix3());
        thisOBB.applyMatrix4(this.nativeObject3d.matrixWorld);
        targetOBB.set(getWorldPosition(target.nativeObject3d), vector3_1.clone(), new Matrix3());
        targetOBB.applyMatrix4(target.nativeObject3d.matrixWorld);
        return thisOBB.intersectsOBB(targetOBB, 0);
    }
    get clientX() {
        return worldToClient(this.nativeObject3d).x;
    }
    get clientY() {
        return worldToClient(this.nativeObject3d).y;
    }
    get frustumVisible() {
        updateFrustum();
        return frustum.containsPoint(getCenter(this.nativeObject3d));
    }
    lookAt(a0, a1, a2) {
        if (typeof a0 === "number") {
            this.lookAt(new Point3d(a0, a1 === undefined
                ? this.outerObject3d.position.y * scaleUp
                : a1, a2));
            return;
        }
        if ("outerObject3d" in a0)
            this.outerObject3d.lookAt(getWorldPosition(a0.nativeObject3d));
        else
            this.outerObject3d.lookAt(point2Vec(a0));
    }
    onLookToEnd;
    lookTo(a0, a1, a2, a3, targetQuaternion) {
        if (typeof a0 === "number") {
            this.lookTo(new Point3d(a0, a1 === undefined
                ? this.outerObject3d.position.y * scaleUp
                : a1, a2), a3, undefined, targetQuaternion);
            return;
        }
        // console.log(a3,'target')
        const { quaternion } = this.outerObject3d;
        const quaternionOld = quaternion.clone();
        this.lookAt(a0);
        // @ts-ignore
        const quaternionNew = (quaternion).clone();
        // @ts-ignore
        quaternion.copy(quaternionOld);
        // @ts-ignore
        this.cancelHandle("lookTo", () => onBeforeRender(() => {
            quaternion.slerp(quaternionNew, fpsAlpha(a1));
            // const angle = euler.setFromQuaternion(this.outerObject3d.quaternion)
            // console.log(angle,'angle')
            // this.outerObject3d.setRotationFromEuler(angle)
            const { x, y, z } = diffQuaternions(quaternion, quaternionNew);
            if (Math.abs(x) + Math.abs(y) + Math.abs(z) < 0.001) {
                this.cancelHandle("lookTo", undefined);
                this.onLookToEnd?.();
                console.log(quaternionNew, 'quaternionNew1');
                quaternion.copy(quaternionNew);
            }
        }));
    }
    getWorldPosition() {
        return vec2Point(getWorldPosition(this.nativeObject3d));
    }
}
//# sourceMappingURL=index.js.map