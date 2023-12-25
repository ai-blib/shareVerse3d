import IBuilding from "../../interface/IBuilding";
import { FacadePreset } from "../../interface/IFloor";
import VisibleObjectManager from "../core/VisibleObjectManager";
export default class Building extends VisibleObjectManager implements IBuilding {
    static componentName: string;
    static defaults: Partial<import("../../interface/utils/Defaults").default<IBuilding>>;
    static schema: Required<import("../../interface/utils/extractProps").ExtractProps<IBuilding>>;
    constructor();
    private presetState;
    get preset(): FacadePreset;
    set preset(val: FacadePreset);
    private repeatXState;
    get repeatX(): number;
    set repeatX(val: number);
    private repeatZState;
    get repeatZ(): number;
    set repeatZ(val: number);
    private repeatYState;
    get repeatY(): number;
    set repeatY(val: number);
}
