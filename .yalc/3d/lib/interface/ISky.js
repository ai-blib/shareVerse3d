import { extendDefaults } from "./utils/Defaults";
import { appendableDefaults, appendableSchema } from "./IAppendable";
export const skySchema = {
    ...appendableSchema
};
export const skyDefaults = extendDefaults([appendableDefaults], {});
//# sourceMappingURL=ISky.js.map