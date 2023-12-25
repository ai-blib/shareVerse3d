import Appendable from "../api/core/Appendable";
import ISetup from "../interface/ISetup";
export declare const dataSetupMap: WeakMap<Partial<ISetup>, Setup>;
declare class Setup extends Appendable {
    protected noEffect?: boolean | undefined;
    static componentName: string;
    static defaults: Partial<import("../interface/utils/Defaults").default<ISetup>>;
    static schema: Required<import("../interface/utils/extractProps").ExtractProps<ISetup>>;
    protected data: Partial<ISetup>;
    constructor(noEffect?: boolean | undefined);
}
interface Setup extends Appendable, ISetup {
}
export default Setup;
