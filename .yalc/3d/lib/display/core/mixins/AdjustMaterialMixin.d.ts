import { Cancellable } from "@lincode/promiselikes";
import Appendable from "../../../api/core/Appendable";
import IAdjustMaterial from "../../../interface/IAdjustMaterial";
import StandardMaterialManager from "../../material/StandardMaterialManager";
export default abstract class AdjustMaterialMixin extends Appendable implements IAdjustMaterial {
    protected _refreshFactors(handle: Cancellable, materialManagers: Array<StandardMaterialManager>): void;
    protected refreshFactors(): void;
    private _metalnessFactor?;
    get metalnessFactor(): number | undefined;
    set metalnessFactor(val: number | undefined);
    private _roughnessFactor?;
    get roughnessFactor(): number | undefined;
    set roughnessFactor(val: number | undefined);
    private _opacityFactor?;
    get opacityFactor(): number | undefined;
    set opacityFactor(val: number | undefined);
    private _envFactor?;
    get envFactor(): number | undefined;
    set envFactor(val: number | undefined);
    private _reflection?;
    get reflection(): boolean;
    set reflection(val: boolean);
}
