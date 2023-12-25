import IVisibleObjectManager from "./IVisibleObjectManager";
import { ExtractProps } from "./utils/extractProps";
export default interface IWater extends IVisibleObjectManager {
    shape: "plane" | "sphere";
    normalMap: string;
    resolution: number;
    speed: number;
}
export declare const waterSchema: Required<ExtractProps<IWater>>;
export declare const waterDefaults: Partial<import("./utils/Defaults").default<IWater>>;
