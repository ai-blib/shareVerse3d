import { objectManagerDefaults, objectManagerSchema } from "./IObjectManager";
import { extendDefaults } from "./utils/Defaults";
export const spawnPointSchema = {
    ...objectManagerSchema,
    helper: Boolean
};
export const spawnPointDefaults = extendDefaults([objectManagerDefaults], { helper: true });
//# sourceMappingURL=ISpawnPoint.js.map