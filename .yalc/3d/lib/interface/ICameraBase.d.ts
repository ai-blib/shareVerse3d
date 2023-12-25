import IObjectManager from "./IObjectManager";
import { ExtractProps } from "./utils/extractProps";
import Nullable from "./utils/Nullable";
export type MouseControl = boolean | "drag";
export default interface ICameraBase extends IObjectManager {
    mouseControl: MouseControl;
    fov: number;
    zoom: number;
    near: number;
    far: number;
    active: boolean;
    transition: Nullable<boolean | number>;
    minPolarAngle: number;
    maxPolarAngle: number;
    minAzimuthAngle: number;
    maxAzimuthAngle: number;
    polarAngle: Nullable<number>;
    azimuthAngle: Nullable<number>;
    enableDamping: boolean;
}
export declare const cameraBaseSchema: Required<ExtractProps<ICameraBase>>;
export declare const cameraBaseDefaults: Partial<import("./utils/Defaults").default<ICameraBase>>;
