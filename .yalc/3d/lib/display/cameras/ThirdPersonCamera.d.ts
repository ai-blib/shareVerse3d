import IThirdPersonCamera from '../../interface/IThirdPersonCamera';
import CharacterCamera from '../core/CharacterCamera';
export default class ThirdPersonCamera extends CharacterCamera implements IThirdPersonCamera {
    static componentName: string;
    static defaults: Partial<import("../../interface/utils/Defaults").default<IThirdPersonCamera>>;
    static schema: Required<import("../../interface/utils/extractProps").ExtractProps<IThirdPersonCamera>>;
    constructor();
    private enableZoomState;
    get enableZoom(): boolean;
    set enableZoom(val: boolean);
}
