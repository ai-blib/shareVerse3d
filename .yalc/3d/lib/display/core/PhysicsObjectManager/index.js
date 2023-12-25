import { Point3d } from "@lincode/math";
import SimpleObjectManager from "../SimpleObjectManager";
import bvhContactMap from "./bvh/bvhContactMap";
import characterCameraPlaced from "../CharacterCamera/characterCameraPlaced";
import { Reactive } from "@lincode/reactivity";
import scene from "../../../engine/scene";
import { Cancellable } from "@lincode/promiselikes";
export default class PhysicsObjectManager extends SimpleObjectManager {
    get velocity() {
        if (this.bvhVelocity)
            return this.bvhVelocity;
        return new Point3d(0, 0, 0);
    }
    set velocity(val) {
        if (this.bvhVelocity)
            Object.assign(this.bvhVelocity, val);
    }
    positionUpdate;
    rotationUpdate;
    refreshPhysicsState;
    refreshPhysics() {
        if (this.refreshPhysicsState) {
            this.refreshPhysicsState.set({});
            return;
        }
        this.createEffect(() => {
            const { _physics } = this;
            if (!_physics)
                return;
            this.outerObject3d.parent !== scene &&
                scene.attach(this.outerObject3d);
            const handle = new Cancellable();
            if (_physics === "map" || _physics === "map-debug")
                import("./enableBVHMap").then((module) => {
                    module.default.call(this, handle, _physics === "map-debug");
                });
            else if (_physics === "character")
                import("./enableBVHCharacter").then((module) => {
                    module.default.call(this, handle);
                });
            return () => {
                handle.cancel();
            };
        }, [(this.refreshPhysicsState = new Reactive({})).get]);
    }
    bvhVelocity;
    bvhOnGround;
    bvhRadius;
    bvhHalfHeight;
    bvhMap;
    bvhCharacter;
    _physics;
    get physics() {
        return this._physics ?? false;
    }
    set physics(val) {
        this._physics = val;
        this.refreshPhysics();
    }
    _gravity;
    get gravity() {
        return this._gravity ?? true;
    }
    set gravity(val) {
        this._gravity = val;
    }
    intersects(target) {
        if (this.done)
            return false;
        if (target.done)
            return false;
        if (this === target)
            return false;
        if (target instanceof PhysicsObjectManager) {
            if ((this.bvhMap && target.bvhCharacter) ||
                (this.bvhCharacter && target.bvhMap))
                return (bvhContactMap.get(this)?.has(target) ||
                    bvhContactMap.get(target)?.has(this) ||
                    false);
        }
        return super.intersects(target);
    }
    get x() {
        return super.x;
    }
    set x(val) {
        super.x = val;
        this.positionUpdate?.updateX();
    }
    get y() {
        return super.y;
    }
    set y(val) {
        super.y = val;
        this.positionUpdate?.updateY();
    }
    get z() {
        return super.z;
    }
    set z(val) {
        super.z = val;
        this.positionUpdate?.updateZ();
    }
    get rotationX() {
        return super.rotationX;
    }
    set rotationX(val) {
        super.rotationX = val;
        this.rotationUpdate?.updateX();
    }
    get rotationY() {
        return super.rotationY;
    }
    set rotationY(val) {
        super.rotationY = val;
        this.rotationUpdate?.updateY();
    }
    get rotationZ() {
        return super.rotationZ;
    }
    set rotationZ(val) {
        super.rotationZ = val;
        this.rotationUpdate?.updateZ();
    }
    lookAt(a0, a1, a2) {
        super.lookAt(a0, a1, a2);
        this.rotationUpdate?.updateXYZ();
    }
    placeAt(object) {
        super.placeAt(object);
        this.positionUpdate?.updateXYZ();
        this.rotationUpdate?.updateXYZ();
        characterCameraPlaced.add(this);
    }
    lerpTo(x, y, z, alpha) {
        super.lerpTo(x, y, z, alpha, () => this.positionUpdate?.updateXYZ());
    }
    stopMove() {
        super.stopMove();
    }
    stopKeyboardMove() {
        super.stopKeyboardMove();
    }
    moveTo(x, y, z, speed) {
        super.moveTo(x, y, z, speed, (y) => y === undefined
            ? this.positionUpdate?.updateXZ()
            : this.positionUpdate?.updateXYZ());
    }
}
//# sourceMappingURL=index.js.map