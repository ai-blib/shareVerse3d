import { cameraBaseDefaults, cameraBaseSchema } from "./ICameraBase";
import { extendDefaults } from "./utils/Defaults";
export const cameraSchema = {
    ...cameraBaseSchema
};
export const cameraDefaults = extendDefaults([cameraBaseDefaults], {});
//# sourceMappingURL=ICamera.js.map