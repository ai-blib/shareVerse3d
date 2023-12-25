import { appendableDefaults, appendableSchema } from "./IAppendable";
import { extendDefaults } from "./utils/Defaults";
import { hideSchema } from "./utils/nonEditorSchemaSet";
import Range from "./utils/Range";
export const curveSchema = {
    ...appendableSchema,
    points: Array,
    helper: Boolean,
    subdivide: Number
};
hideSchema(["points"]);
export const curveDefaults = extendDefaults([appendableDefaults], {
    points: [],
    helper: false,
    subdivide: 3
}, {
    subdivide: new Range(1, 10, 1)
});
//# sourceMappingURL=ICurve.js.map