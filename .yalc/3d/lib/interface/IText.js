import { extendDefaults } from "./utils/Defaults";
import { appendableDefaults, appendableSchema } from "./IAppendable";
import Range from "./utils/Range";
export const textSchema = {
    ...appendableSchema,
    value: String,
    opacity: Number
};
export const textDefaults = extendDefaults([appendableDefaults], { value: "text", opacity: 1 }, { opacity: new Range(0, 1) });
//# sourceMappingURL=IText.js.map