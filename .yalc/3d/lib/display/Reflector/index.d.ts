import IReflector from "../../interface/IReflector";
import VisibleObjectManager from "../core/VisibleObjectManager";
export default class Reflector extends VisibleObjectManager implements IReflector {
    static componentName: string;
    static defaults: Partial<import("../../interface/utils/Defaults").default<IReflector>>;
    static schema: Required<import("../../interface/utils/extractProps").ExtractProps<IReflector>>;
    constructor();
    private resolutionState;
    get resolution(): number;
    set resolution(val: number);
    private blurState;
    get blur(): number;
    set blur(val: number);
    private contrastState;
    get contrast(): number;
    set contrast(val: number);
    private mirrorState;
    get mirror(): number;
    set mirror(val: number);
}
