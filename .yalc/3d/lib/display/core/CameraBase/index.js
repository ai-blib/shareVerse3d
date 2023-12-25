import { CameraHelper, Quaternion } from "three";
import ObjectManager from "../ObjectManager";
import { debounceInstance } from "@lincode/utils";
import { scaleDown } from "../../../engine/constants";
import { ray, euler, quaternion, quaternion_, halfPi } from "../../utils/reusables";
import { deg2Rad } from "@lincode/math";
import { MIN_POLAR_ANGLE, MAX_POLAR_ANGLE } from "../../../globals";
import { Reactive } from "@lincode/reactivity";
import { Cancellable } from "@lincode/promiselikes";
import mainCamera from "../../../engine/mainCamera";
import scene from "../../../engine/scene";
import { pushCameraList, pullCameraList } from "../../../states/useCameraList";
import { getCameraRendered } from "../../../states/useCameraRendered";
import { pullCameraStack, pushCameraStack } from "../../../states/useCameraStack";
import getWorldPosition from "../../utils/getWorldPosition";
import getWorldQuaternion from "../../utils/getWorldQuaternion";
import getWorldDirection from "../../utils/getWorldDirection";
import { addSelectionHelper } from "../StaticObjectManager/raycast/selectionCandidates";
import HelperSprite from "../utils/HelperSprite";
import { setManager } from "../../../api/utils/manager";
export default class CameraBase extends ObjectManager {
    camera;
    midObject3d = this.outerObject3d;
    constructor(camera) {
        super();
        this.camera = camera;
        this.object3d.add(camera);
        setManager(camera, this);
        pushCameraList(camera);
        this.then(() => {
            pullCameraStack(camera);
            pullCameraList(camera);
        });
        this.createEffect(() => {
            if (getCameraRendered() !== mainCamera ||
                getCameraRendered() === camera)
                return;
            const helper = new CameraHelper(camera);
            scene.add(helper);
            const sprite = new HelperSprite("camera");
            const handle = addSelectionHelper(sprite, this);
            helper.add(sprite.outerObject3d);
            return () => {
                helper.dispose();
                scene.remove(helper);
                handle.cancel();
            };
        }, [getCameraRendered]);
    }
    lookAt(a0, a1, a2) {
        super.lookAt(a0, a1, a2);
        const angle = euler.setFromQuaternion(this.outerObject3d.quaternion);
        angle.x += Math.PI;
        angle.z += Math.PI;
        this.outerObject3d.setRotationFromEuler(angle);
    }
    get fov() {
        return this.camera.fov;
    }
    set fov(val) {
        this.camera.fov = val;
        this.camera.updateProjectionMatrix?.();
    }
    get zoom() {
        return this.camera.zoom;
    }
    set zoom(val) {
        this.camera.zoom = val;
        this.camera.updateProjectionMatrix?.();
    }
    get near() {
        return this.camera.near;
    }
    set near(val) {
        this.camera.near = val;
        this.camera.updateProjectionMatrix?.();
    }
    get far() {
        return this.camera.far;
    }
    set far(val) {
        this.camera.far = val;
        this.camera.updateProjectionMatrix?.();
    }
    _active;
    get active() {
        return !!this._active;
    }
    set active(val) {
        this._active = val;
        pullCameraStack(this.camera);
        val && pushCameraStack(this.camera);
    }
    get transition() {
        return this.camera.userData.transition;
    }
    set transition(val) {
        this.camera.userData.transition = val;
    }
    getRay() {
        return ray.set(getWorldPosition(this.camera), getWorldDirection(this.camera));
    }
    append(object) {
        this._append(object);
        this.camera.add(object.outerObject3d);
    }
    attach(object) {
        this._append(object);
        this.camera.attach(object.outerObject3d);
    }
    get width() {
        return super.width;
    }
    set width(val) {
        const num = val * scaleDown;
        this.object3d.scale.x = num;
        this.camera.scale.x = 1 / num;
    }
    get height() {
        return super.height;
    }
    set height(val) {
        const num = val * scaleDown;
        this.object3d.scale.y = num;
        this.camera.scale.y = 1 / num;
    }
    get depth() {
        return super.depth;
    }
    set depth(val) {
        const num = val * scaleDown;
        this.object3d.scale.z = num;
        this.camera.scale.z = 1 / num;
    }
    orbitMode;
    _gyrate(movementX, movementY, inner) {
        const manager = inner ? this.object3d : this.midObject3d;
        euler.setFromQuaternion(manager.quaternion);
        euler.y -= movementX * 0.002;
        euler.y = Math.max(halfPi - this._maxAzimuthAngle * deg2Rad, Math.min(halfPi - this._minAzimuthAngle * deg2Rad, euler.y));
        euler.x -= movementY * 0.002;
        euler.x = Math.max(halfPi - this._maxPolarAngle * deg2Rad, Math.min(halfPi - this._minPolarAngle * deg2Rad, euler.x));
        manager.setRotationFromEuler(euler);
        !inner && this.rotationUpdate?.updateXYZ();
    }
    gyrateHandle;
    gyrate(movementX, movementY, noDamping) {
        if (this.enableDamping) {
            movementX *= 0.5;
            movementY *= 0.5;
        }
        if (this.orbitMode)
            this._gyrate(movementX, movementY);
        else {
            this._gyrate(movementX, 0);
            this._gyrate(0, movementY, true);
        }
        if (!this.enableDamping || noDamping || !(movementX || movementY))
            return;
        this.gyrateHandle?.cancel();
        let factor = 1;
        // @ts-ignore
        const handle = (this.gyrateHandle = this.beforeRender(() => {
            factor *= 0.95;
            this._gyrate(movementX * factor, movementY * factor);
            // @ts-ignore
            factor <= 0.001 && handle.cancel();
        }));
    }
    static updateAngle = debounceInstance((target) => target.gyrate(0, 0));
    updateAngle() {
        CameraBase.updateAngle(this, this);
    }
    _minPolarAngle = MIN_POLAR_ANGLE;
    get minPolarAngle() {
        return this._minPolarAngle;
    }
    set minPolarAngle(val) {
        this._minPolarAngle = val;
        this.updateAngle();
    }
    _maxPolarAngle = MAX_POLAR_ANGLE;
    get maxPolarAngle() {
        return this._maxPolarAngle;
    }
    set maxPolarAngle(val) {
        this._maxPolarAngle = val;
        this.updateAngle();
    }
    _minAzimuthAngle = -Infinity;
    get minAzimuthAngle() {
        return this._minAzimuthAngle;
    }
    set minAzimuthAngle(val) {
        this._minAzimuthAngle = val;
        this.updateAngle();
    }
    _maxAzimuthAngle = Infinity;
    get maxAzimuthAngle() {
        return this._maxAzimuthAngle;
    }
    set maxAzimuthAngle(val) {
        this._maxAzimuthAngle = val;
        this.updateAngle();
    }
    setPolarAngle(angle) {
        const { _minPolarAngle, _maxPolarAngle } = this;
        this.minPolarAngle = this.maxPolarAngle = angle;
        this.queueMicrotask(() => {
            this.minPolarAngle = _minPolarAngle;
            this.maxPolarAngle = _maxPolarAngle;
        });
    }
    setAzimuthAngle(angle) {
        const { _minAzimuthAngle, _maxAzimuthAngle } = this;
        this.minAzimuthAngle = this.maxAzimuthAngle = angle;
        this.queueMicrotask(() => {
            this.minAzimuthAngle = _minAzimuthAngle;
            this.maxAzimuthAngle = _maxAzimuthAngle;
        });
    }
    _polarAngle;
    get polarAngle() {
        return this._polarAngle;
    }
    set polarAngle(val) {
        this._polarAngle = val;
        val && this.setPolarAngle(val);
    }
    _azimuthAngle;
    get azimuthAngle() {
        return this._azimuthAngle;
    }
    set azimuthAngle(val) {
        this._azimuthAngle = val;
        val && this.setAzimuthAngle(val);
    }
    enableDamping = false;
    mouseControlState = new Reactive(false);
    mouseControlInit;
    get mouseControl() {
        return this.mouseControlState.get();
    }
    set mouseControl(val) {
        this.mouseControlState.set(val);
        if (!val || this.mouseControlInit)
            return;
        this.mouseControlInit = true;
        import("./enableMouseControl").then((module) => module.default.call(this));
    }
    _gyroControl;
    get gyroControl() {
        return !!this._gyroControl;
    }
    set gyroControl(val) {
        this._gyroControl = val;
        const deviceEuler = euler;
        const deviceQuaternion = quaternion;
        const screenTransform = quaternion_;
        const worldTransform = new Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5));
        const quat = getWorldQuaternion(this.object3d);
        const orient = 0;
        const cb = (e) => {
            this.object3d.quaternion.copy(quat);
            deviceEuler.set((e.beta ?? 0) * deg2Rad, (e.alpha ?? 0) * deg2Rad, -(e.gamma ?? 0) * deg2Rad, "YXZ");
            this.object3d.quaternion.multiply(deviceQuaternion.setFromEuler(deviceEuler));
            const minusHalfAngle = -orient * 0.5;
            screenTransform.set(0, Math.sin(minusHalfAngle), 0, Math.cos(minusHalfAngle));
            this.object3d.quaternion.multiply(screenTransform);
            this.object3d.quaternion.multiply(worldTransform);
        };
        val && window.addEventListener("deviceorientation", cb);
        this.cancelHandle("gyroControl", val &&
            (() => new Cancellable(() => window.removeEventListener("deviceorientation", cb))));
    }
}
//# sourceMappingURL=index.js.map