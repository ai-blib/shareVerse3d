import { Point3d } from "@lincode/math";
import ISimpleObjectManager from "./ISimpleObjectManager";
import { ExtractProps } from "./utils/extractProps";
export type PhysicsOptions = boolean | "map" | "map-debug" | "character";
export default interface IPhysicsObjectManager extends ISimpleObjectManager {
    velocity: Point3d;
    gravity: boolean;
    physics: PhysicsOptions;
}
export declare const physicsObjectManagerSchema: Required<ExtractProps<IPhysicsObjectManager>>;
export declare const physicsObjectManagerDefaults: Partial<import("./utils/Defaults").default<IPhysicsObjectManager>>;
