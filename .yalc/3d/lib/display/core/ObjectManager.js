import { Object3D, PropertyBinding } from "three";
import { deg2Rad, rad2Deg } from "@lincode/math";
import scene from "../../engine/scene";
import { scaleDown, scaleUp } from "../../engine/constants";
import FoundManager from "./FoundManager";
import PhysicsObjectManager from "./PhysicsObjectManager";
import { setManager } from "../../api/utils/manager";
export default class ObjectManager extends PhysicsObjectManager {
    object3d;
    constructor(object3d = new Object3D(), unmounted) {
        super(object3d);
        this.object3d = object3d;
        this.nativeObject3d = object3d;
        const outerObject3d = (this.outerObject3d = new Object3D());
        setManager(outerObject3d, this);
        !unmounted && scene.add(outerObject3d);
        outerObject3d.add(object3d);
    }
    get innerRotationX() {
        return this.object3d.rotation.x * rad2Deg;
    }
    set innerRotationX(val) {
        this.object3d.rotation.x = val * deg2Rad;
    }
    get innerRotationY() {
        return this.object3d.rotation.y * rad2Deg;
    }
    set innerRotationY(val) {
        this.object3d.rotation.y = val * deg2Rad;
    }
    get innerRotationZ() {
        return this.object3d.rotation.z * rad2Deg;
    }
    set innerRotationZ(val) {
        this.object3d.rotation.z = val * deg2Rad;
    }
    get innerRotation() {
        return this.innerRotationZ;
    }
    set innerRotation(val) {
        this.innerRotationZ = val;
    }
    get innerX() {
        return this.object3d.position.x * scaleUp;
    }
    get playAllAnimation() {
        // @ts-ignore
        return this.object3d.playAllAnimation;
    }
    set playAllAnimation(val) {
        // @ts-ignore
        this.object3d.playAllAnimation = val;
    }
    set innerX(val) {
        this.object3d.position.x = val * scaleDown;
    }
    get innerY() {
        return this.object3d.position.y * scaleUp;
    }
    set innerY(val) {
        this.object3d.position.y = val * scaleDown;
    }
    get innerZ() {
        return this.object3d.position.z * scaleUp;
    }
    set innerZ(val) {
        this.object3d.position.z = val * scaleDown;
    }
    // @ts-ignore
    set firstInnerY(val) {
        // @ts-ignore
        this.object3d.firstInnerY = val;
    }
    // @ts-ignore
    set firstInnerZ(val) {
        // @ts-ignore
        this.object3d.firstInnerZ = val;
    }
    // @ts-ignore
    set firstInnerX(val) {
        // @ts-ignore
        this.object3d.firstInnerX = val;
    }
    get width() {
        return this.object3d.scale.x * scaleUp;
    }
    set width(val) {
        this.object3d.scale.x = val * scaleDown;
    }
    get height() {
        return this.object3d.scale.y * scaleUp;
    }
    set height(val) {
        this.object3d.scale.y = val * scaleDown;
    }
    get depth() {
        return this.object3d.scale.z * scaleUp;
    }
    set depth(val) {
        this.object3d.scale.z = val * scaleDown;
    }
    get innerVisible() {
        return this.object3d.visible;
    }
    set innerVisible(val) {
        this.object3d.visible = val;
    }
    find(name, hiddenFromSceneGraph) {
        const child = this.outerObject3d.getObjectByName(PropertyBinding.sanitizeNodeName(name));
        if (!child)
            return;
        // console.log(child, 'child');
        const result = setManager(child, new FoundManager(child));
        // console.log(result, 'result');
        !hiddenFromSceneGraph && this._append(result);
        return result;
    }
    findAll(name) {
        const result = [];
        if (name === undefined)
            this.outerObject3d.traverse((child) => {
                result.push(setManager(child, new FoundManager(child)));
            });
        else if (typeof name === "string")
            this.outerObject3d.traverse((child) => {
                child.name === name &&
                    result.push(setManager(child, new FoundManager(child)));
            });
        else if (typeof name === "function")
            this.outerObject3d.traverse((child) => {
                name(child.name) &&
                    result.push(setManager(child, new FoundManager(child)));
            });
        else
            this.outerObject3d.traverse((child) => {
                name.test(child.name) &&
                    result.push(setManager(child, new FoundManager(child)));
            });
        return result;
    }
}
//# sourceMappingURL=ObjectManager.js.map