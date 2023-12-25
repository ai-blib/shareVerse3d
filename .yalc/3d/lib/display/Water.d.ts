import IWater from "../interface/IWater";
import VisibleObjectManager from "./core/VisibleObjectManager";
export default class Water extends VisibleObjectManager implements IWater {
    static componentName: string;
    static defaults: Partial<import("../interface/utils/Defaults").default<IWater>>;
    static schema: Required<import("../interface/utils/extractProps").ExtractProps<IWater>>;
    private shapeState;
    get shape(): "plane" | "sphere";
    set shape(val: "plane" | "sphere");
    private normalMapState;
    get normalMap(): string;
    set normalMap(val: string);
    private resolutionState;
    get resolution(): number;
    set resolution(val: number);
    private speedState;
    get speed(): number;
    set speed(val: number);
    constructor();
}
