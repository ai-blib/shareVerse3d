import IPhysicsObjectManager from './IPhysicsObjectManager';
import { ExtractProps } from './utils/extractProps';
export default interface IObjectManager extends IPhysicsObjectManager {
    innerRotationX: number;
    innerRotationY: number;
    innerRotationZ: number;
    innerRotation: number;
    innerX: number;
    innerY: number;
    innerZ: number;
    firstInnerY: number;
    firstInnerX: number;
    firstInnerZ: number;
    playAllAnimation: boolean;
    width: number;
    height: number;
    depth: number;
    innerVisible: boolean;
}
export declare const objectManagerSchema: Required<ExtractProps<IObjectManager>>;
export declare const objectManagerDefaults: Partial<import("./utils/Defaults").default<IObjectManager>>;
