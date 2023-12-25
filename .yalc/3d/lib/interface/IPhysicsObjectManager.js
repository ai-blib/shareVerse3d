import { simpleObjectManagerDefaults, simpleObjectManagerSchema } from "./ISimpleObjectManager";
import { hideSchema } from "./utils/nonEditorSchemaSet";
import { extendDefaults } from "./utils/Defaults";
export const physicsObjectManagerSchema = {
    ...simpleObjectManagerSchema,
    velocity: Object,
    gravity: Boolean,
    physics: [String, Boolean]
};
hideSchema(["velocity"]);
export const physicsObjectManagerDefaults = extendDefaults([simpleObjectManagerDefaults], {
    velocity: { x: 0, y: 0, z: 0 },
    gravity: true,
    physics: false
});
//# sourceMappingURL=IPhysicsObjectManager.js.map