import { floorDefaults, floorSchema } from "./IFloor";
import { extendDefaults } from "./utils/Defaults";
export const buildingSchema = {
    ...floorSchema,
    repeatY: Number
};
export const buildingDefaults = extendDefaults([floorDefaults], {
    repeatY: 1
});
//# sourceMappingURL=IBuilding.js.map