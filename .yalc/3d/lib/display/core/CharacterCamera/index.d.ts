import ICharacterCamera, { LockTargetRotationValue } from '../../../interface/ICharacterCamera';
import OrbitCameraBase from '../OrbitCameraBase';
export default class CharacterCamera extends OrbitCameraBase implements ICharacterCamera {
    static defaults: Partial<import("../../../interface/utils/Defaults").default<ICharacterCamera>>;
    static schema: Required<import("../../../interface/utils/extractProps").ExtractProps<ICharacterCamera>>;
    constructor();
    lockTargetRotation: LockTargetRotationValue;
}
