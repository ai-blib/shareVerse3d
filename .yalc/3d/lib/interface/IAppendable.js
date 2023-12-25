import { extendDefaults } from "./utils/Defaults";
import { hideSchema } from "./utils/nonEditorSchemaSet";
export const appendableSchema = {
    onLoop: Function,
    proxy: Object,
    uuid: String
};
hideSchema(["proxy", "uuid"]);
export const appendableDefaults = extendDefaults([], {
    onLoop: undefined,
    proxy: undefined,
    uuid: ""
});
//# sourceMappingURL=IAppendable.js.map