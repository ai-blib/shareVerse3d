import { cameraBaseDefaults, cameraBaseSchema } from "./ICameraBase";
import { extendDefaults } from "./utils/Defaults";
export const orbitCameraBaseSchema = {
    ...cameraBaseSchema,
    target: [String, Object]
};
export const orbitCameraBaseDefaults = extendDefaults([cameraBaseDefaults], { target: undefined });
//# sourceMappingURL=IOrbitCameraBase.js.map