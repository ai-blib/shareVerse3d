import ISetup from "../interface/ISetup";
import { AutoMount } from "../states/useAutoMount";
declare const settings: Partial<ISetup> & {
    autoMount: AutoMount;
    firstLoadBeforeRender: boolean;
};
export default settings;
export declare const finalSetup: Record<string, any>;
