import { characterCameraDefaults, characterCameraSchema } from "./ICharacterCamera";
import { extendDefaults } from "./utils/Defaults";
export const thirdPersonCameraSchema = {
    ...characterCameraSchema
};
export const thirdPersonCameraDefaults = extendDefaults([characterCameraDefaults], { innerZ: 300 });
//# sourceMappingURL=IThirdPersonCamera.js.map