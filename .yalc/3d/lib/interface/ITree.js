import { modelDefaults, modelSchema } from "./IModel";
import { extendDefaults } from "./utils/Defaults";
export const treeSchema = {
    ...modelSchema,
    preset: String
};
export const treeDefaults = extendDefaults([modelDefaults], {
    preset: "tree1",
    scale: 4
});
//# sourceMappingURL=ITree.js.map