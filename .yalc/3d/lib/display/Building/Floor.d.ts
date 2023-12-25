import Building from ".";
import IFloor, { FacadePreset } from "../../interface/IFloor";
import VisibleObjectManager from "../core/VisibleObjectManager";
export default class Floor extends VisibleObjectManager implements IFloor {
    constructor(parent: Building);
    private presetState;
    get preset(): FacadePreset;
    set preset(val: FacadePreset);
    private repeatXState;
    get repeatX(): number;
    set repeatX(val: number);
    private repeatZState;
    get repeatZ(): number;
    set repeatZ(val: number);
}
