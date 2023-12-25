import { orbitCameraBaseDefaults, orbitCameraBaseSchema } from "./IOrbitCameraBase";
import { extendDefaults } from "./utils/Defaults";
export const characterCameraSchema = {
    ...orbitCameraBaseSchema,
    lockTargetRotation: [Boolean, String]
};
export const characterCameraDefaults = extendDefaults([orbitCameraBaseDefaults], { lockTargetRotation: true });
//# sourceMappingURL=ICharacterCamera.js.map