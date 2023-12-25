import { visibleObjectManagerDefaults, visibleObjectManagerSchema } from "./IVisibleObjectManager";
import { extendDefaults } from "./utils/Defaults";
import { hideSchema } from "./utils/nonEditorSchemaSet";
export const htmlMeshSchema = {
    ...visibleObjectManagerSchema,
    element: Object,
    innerHTML: String,
    cssColor: String,
    sprite: Boolean
};
hideSchema(["element"]);
export const htmlMeshDefaults = extendDefaults([visibleObjectManagerDefaults], {
    element: undefined,
    innerHTML: undefined,
    cssColor: "#ffffff",
    sprite: false
});
//# sourceMappingURL=IHTMLMesh.js.map