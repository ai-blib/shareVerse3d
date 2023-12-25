import { rad2Deg, deg2Rad, distance3d, vertexAngle, Point, rotatePoint, quadrant } from "@lincode/math";
import { Vector3 } from "three";
import { vector3 } from "../../utils/reusables";
import { scaleDown, scaleUp } from "../../../engine/constants";
import { point2Vec } from "../../utils/vec2Point";
import getCenter from "../../utils/getCenter";
import PositionedItem from "../../../api/core/PositionedItem";
import { idMap } from "../StaticObjectManager";
import { applyMixins } from "@lincode/utils";
import { Reactive } from "@lincode/reactivity";
import { onBeforeRender } from "../../../events/onBeforeRender";
import getWorldPosition from "../../utils/getWorldPosition";
import getWorldQuaternion from "../../utils/getWorldQuaternion";
import { getCentripetal } from "../../../states/useCentripetal";
import AnimatedObjectManager from "../AnimatedObjectManager";
import getActualScale from "../../utils/getActualScale";
import { fpsRatio } from "../../../engine/eventLoop";
import fpsAlpha from "../../utils/fpsAlpha";
const maxDistance = 2000;
const ptDistCache = new WeakMap();
const distance3dCached = (pt, vecSelf) => {
    const cached = ptDistCache.get(pt);
    if (cached)
        return cached;
    const result = distance3d(pt.x, pt.y, pt.z, vecSelf.x * scaleUp, vecSelf.y * scaleUp, vecSelf.z * scaleUp);
    ptDistCache.set(pt, result);
    return result;
};
class SimpleObjectManager extends AnimatedObjectManager {
    getRayIntersectionsAt(id, maxDistance) {
        const result = [];
        for (const target of idMap.get(id) ?? []) {
            if (target === this)
                continue;
            const pt = this.rayIntersectsAt(target, maxDistance);
            pt && result.push([target, pt]);
        }
        const vec = getWorldPosition(this.nativeObject3d);
        return result.sort((a, b) => {
            return distance3dCached(a[1], vec) - distance3dCached(b[1], vec);
        });
    }
    getRayIntersections(id, maxDistance) {
        return this.getRayIntersectionsAt(id, maxDistance).map((result) => result[0]);
    }
    listenToRayIntersection(id, cb, maxDistance) {
        return this.beforeRender(() => {
            for (const [target, pt] of this.getRayIntersectionsAt(id, maxDistance))
                cb(target, pt);
        });
    }
    getIntersections(id) {
        const result = new Set();
        for (const target of idMap.get(id) ?? [])
            target !== this && this.intersects(target) && result.add(target);
        return result;
    }
    listenToIntersection(id, cb, cbOut) {
        let intersectionsOld = new Set();
        return this.beforeRender(() => {
            const intersections = this.getIntersections(id);
            if (cb)
                for (const target of intersections)
                    !intersectionsOld.has(target) && cb(target);
            if (cbOut)
                for (const target of intersectionsOld)
                    !intersections.has(target) && cbOut(target);
            intersectionsOld = intersections;
        });
    }
    onIntersectState;
    onIntersectOutState;
    intersectIdsState;
    initIntersect() {
        if (this.onIntersectState)
            return;
        this.onIntersectState = new Reactive(undefined);
        this.onIntersectOutState = new Reactive(undefined);
        this.intersectIdsState = new Reactive(undefined);
        this.createEffect(() => {
            const { onIntersect, onIntersectOut, intersectIds } = this;
            if (!intersectIds || (!onIntersect && !onIntersectOut))
                return;
            const handles = [];
            for (const id of intersectIds)
                // @ts-ignore
                handles.push(
                // @ts-ignore
                this.listenToIntersection(id, onIntersect, onIntersectOut));
            return () => {
                for (const handle of handles)
                    handle.cancel();
            };
        }, [
            this.onIntersectState.get,
            this.onIntersectOutState.get,
            this.intersectIdsState.get
        ]);
    }
    get onIntersect() {
        return this.onIntersectState?.get();
    }
    set onIntersect(val) {
        this.initIntersect();
        this.onIntersectState?.set(val);
    }
    get onIntersectOut() {
        return this.onIntersectOutState?.get();
    }
    set onIntersectOut(val) {
        this.initIntersect();
        this.onIntersectOutState?.set(val);
    }
    get intersectIds() {
        return this.intersectIdsState?.get();
    }
    set intersectIds(val) {
        this.initIntersect();
        this.intersectIdsState?.set(val);
    }
    get scaleX() {
        return this.outerObject3d.scale.x;
    }
    set scaleX(val) {
        this.outerObject3d.scale.x = val;
    }
    get scaleY() {
        return this.outerObject3d.scale.y;
    }
    set scaleY(val) {
        this.outerObject3d.scale.y = val;
    }
    get scaleZ() {
        return this.outerObject3d.scale.z;
    }
    set scaleZ(val) {
        this.outerObject3d.scale.z = val;
    }
    get scale() {
        return this.scaleX;
    }
    set scale(val) {
        this.scaleX = val;
        this.scaleY = val;
        this.scaleZ = val;
    }
    get rotationX() {
        return this.outerObject3d.rotation.x * rad2Deg;
    }
    set rotationX(val) {
        this.outerObject3d.rotation.x = val * deg2Rad;
    }
    get rotationY() {
        return this.outerObject3d.rotation.y * rad2Deg;
    }
    set rotationY(val) {
        this.outerObject3d.rotation.y = val * deg2Rad;
    }
    get rotationZ() {
        return this.outerObject3d.rotation.z * rad2Deg;
    }
    set rotationZ(val) {
        this.outerObject3d.rotation.z = val * deg2Rad;
    }
    get rotation() {
        return this.rotationZ;
    }
    set rotation(val) {
        this.rotationZ = val;
    }
    translateX(val) {
        this.outerObject3d.translateX(val * scaleDown * fpsRatio[0]);
    }
    translateY(val) {
        this.outerObject3d.translateY(val * scaleDown * fpsRatio[0]);
    }
    translateZ(val) {
        this.outerObject3d.translateZ(val * scaleDown * fpsRatio[0]);
    }
    placeAt(object) {
        if (typeof object === "string") {
            const [found] = idMap.get(object) ?? [undefined];
            if (!found)
                return;
            object = found;
        }
        if ("outerObject3d" in object) {
            if ("isSpawnPoint" in object)
                object.object3d.position.y = getActualScale(this).y * 0.5;
            this.outerObject3d.position.copy(getCenter(object.nativeObject3d));
            this.outerObject3d.quaternion.copy(getWorldQuaternion(object.outerObject3d));
            return;
        }
        this.outerObject3d.position.copy(point2Vec(object));
    }
    moveForward(distance) {
        if (getCentripetal())
            this.translateZ(-distance);
        else {
            vector3.setFromMatrixColumn(this.outerObject3d.matrix, 0);
            vector3.crossVectors(this.outerObject3d.up, vector3);
            this.outerObject3d.position.addScaledVector(vector3, distance * scaleDown * fpsRatio[0]);
        }
    }
    stopKeyboardMove() {
        const distance = 0.1;
        if (getCentripetal())
            this.translateX(distance);
        else {
            vector3.setFromMatrixColumn(this.outerObject3d.matrix, 0);
            this.outerObject3d.position.set(0, 0, 0);
        }
    }
    moveRight(distance) {
        if (getCentripetal())
            this.translateX(distance);
        else {
            vector3.setFromMatrixColumn(this.outerObject3d.matrix, 0);
            this.outerObject3d.position.addScaledVector(vector3, distance * scaleDown * fpsRatio[0]);
        }
    }
    onMoveToEnd;
    lerpTo(x, y, z, alpha, onFrame) {
        const from = new Vector3(this.x, this.y, this.z);
        const to = new Vector3(x, y, z);
        // @ts-ignore
        this.cancelHandle("lerpTo", () => onBeforeRender(() => {
            const { x, y, z } = from.lerp(to, fpsAlpha(alpha));
            if (Math.abs(this.x - x) < 0.1 &&
                Math.abs(this.y - y) < 0.1 &&
                Math.abs(this.z - z) < 0.1) {
                this.cancelHandle("lerpTo", undefined);
                this.onMoveToEnd?.();
            }
            this.x = x;
            this.y = y;
            this.z = z;
            onFrame?.();
        }));
    }
    //     public moveTo(
    //         x: number,
    //         y: number | undefined,
    //         z: number,
    //         speed: number,
    //         onFrame?: (y?: number) => void
    //     ) {
    //
    //         if (x === this.x) x += 0.01;
    //         if (z === this.z) z += 0.01;
    //
    //         const {
    //             x: rx,
    //             y: ry,
    //             z: rz
    //         } = new Vector3(
    //             x - this.x,
    //             y === undefined ? 0 : y - this.y,
    //             z - this.z
    //         ).normalize();
    //         const sx = speed * rx;
    //         const sy = speed * ry;
    //         const sz = speed * rz;
    //
    //         const quad = quadrant(x, z, this.x, this.z);
    //
    //         this.cancelHandle("lerpTo", () =>
    //             onBeforeRender(() => {
    //                 this.x += sx * fpsRatio[0];
    //                 y !== undefined && (this.y += sy * fpsRatio[0]);
    //                 this.z += sz * fpsRatio[0];
    //
    //                 const angle = vertexAngle(
    //                     new Point(this.x, this.z),
    //                     new Point(x, z),
    //                     new Point(this.x, z)
    //                 );
    //                 const rotated = rotatePoint(
    //                     new Point(x, z),
    //                     new Point(this.x, this.z),
    //                     quad === 1 || quad === 4 ? angle : -angle
    //                 );
    //
    //                 const pos1 = new THREE.Vector3(this.x, 1, this.z);
    //
    //                 const pos2 = new THREE.Vector3(x, 1, z);
    //                 const distance = pos1.distanceTo(pos2);
    //                 if (distance > maxDistance) {
    //                     this.z = z;
    //                     this.x = x;
    //                     // @ts-ignore
    //                     // this.y = y?y+100:this.y+100;
    //                     this.cancelHandle("lerpTo", undefined);
    //                     this.onMoveToEnd?.();
    //                 }
    //                 if (z > rotated.y) {
    //                     this.cancelHandle("lerpTo", undefined);
    //                     this.onMoveToEnd?.();
    //                 }
    //                 onFrame?.(y);
    //             })
    //         );
    //     }
    // }
    stopMove() {
        this.cancelHandle("lerpTo", undefined);
        this.onMoveToEnd?.();
    }
    moveTo(x, y, z, speed, onFrame) {
        if (x === this.x)
            x += 0.01;
        if (z === this.z)
            z += 0.01;
        const { x: rx, y: ry, z: rz } = new Vector3(x - this.x, y === undefined ? 0 : y - this.y, z - this.z).normalize();
        const sx = speed * rx;
        const sy = speed * ry;
        const sz = speed * rz;
        const quad = quadrant(x, z, this.x, this.z);
        // @ts-ignore
        this.cancelHandle("lerpTo", () => onBeforeRender(() => {
            this.x += sx * fpsRatio[0];
            y !== undefined && (this.y += sy * fpsRatio[0]);
            this.z += sz * fpsRatio[0];
            const angle = vertexAngle(new Point(this.x, this.z), new Point(x, z), new Point(this.x, z));
            const rotated = rotatePoint(new Point(x, z), new Point(this.x, this.z), quad === 1 || quad === 4 ? angle : -angle);
            if (z > rotated.y) {
                this.cancelHandle("lerpTo", undefined);
                this.onMoveToEnd?.();
            }
            onFrame?.(y);
        }));
    }
}
applyMixins(SimpleObjectManager, [PositionedItem]);
export default SimpleObjectManager;
//# sourceMappingURL=index.js.map