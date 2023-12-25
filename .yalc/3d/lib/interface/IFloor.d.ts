import IVisibleObjectManager from "./IVisibleObjectManager";
import { ExtractProps } from "./utils/extractProps";
export type FacadePreset = "city0" | "city1" | "ghetto0" | "ghetto1" | "ghetto2" | "industrial0" | "storefront0";
export default interface IFloor extends IVisibleObjectManager {
    preset: FacadePreset;
    repeatX: number;
    repeatZ: number;
}
export declare const floorSchema: Required<ExtractProps<IFloor>>;
export declare const floorDefaults: Partial<import("./utils/Defaults").default<IFloor>>;
