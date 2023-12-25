import IFloor from "./IFloor";
import { ExtractProps } from "./utils/extractProps";
export default interface IBuilding extends IFloor {
    repeatY: number;
}
export declare const buildingSchema: Required<ExtractProps<IBuilding>>;
export declare const buildingDefaults: Partial<import("./utils/Defaults").default<IBuilding>>;
