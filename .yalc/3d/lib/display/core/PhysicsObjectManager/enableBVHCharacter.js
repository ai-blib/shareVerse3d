import { Vector3 } from "three";
import scene from "../../../engine/scene";
import getActualScale from "../../utils/getActualScale";
import ObjectManager from "../ObjectManager";
import { bvhCharacterSet } from "./bvh/bvhCharacterSet";
import "./bvh/bvhLoop";
import PhysicsUpdate from "./PhysicsUpdate";
export default function (handle) {
    if (handle.done)
        return;
    this.outerObject3d.parent !== scene && scene.attach(this.outerObject3d);
    if (this instanceof ObjectManager)
        this.width = this.depth = Math.min(this.width, this.depth);
    // this.outerObject3d.position.setZ(-100)
    this.rotationUpdate = new PhysicsUpdate();
    this.positionUpdate = new PhysicsUpdate();
    const actualScale = getActualScale(this).multiplyScalar(0.5);
    this.bvhHalfHeight = Math.max(actualScale.y, 0.5);
    this.bvhRadius = Math.max(actualScale.x, 0.5);
    this.bvhVelocity = new Vector3();
    bvhCharacterSet.add(this);
    handle.then(() => {
        bvhCharacterSet.delete(this);
        this.rotationUpdate = undefined;
        this.positionUpdate = undefined;
    });
}
//# sourceMappingURL=enableBVHCharacter.js.map