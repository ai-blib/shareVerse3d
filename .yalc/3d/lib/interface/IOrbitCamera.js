import { extendDefaults } from "./utils/Defaults";
import { orbitCameraBaseDefaults, orbitCameraBaseSchema } from "./IOrbitCameraBase";
export const orbitCameraSchema = {
    ...orbitCameraBaseSchema,
    enableZoom: Boolean,
    enableFly: Boolean,
    autoRotate: [Boolean, Number]
};
export const orbitCameraDefaults = extendDefaults([orbitCameraBaseDefaults], {
    innerZ: 500,
    mouseControl: "drag",
    enableZoom: false,
    enableFly: false,
    autoRotate: false
});
//# sourceMappingURL=IOrbitCamera.js.map