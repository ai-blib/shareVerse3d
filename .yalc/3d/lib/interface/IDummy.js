import { YBOT_URL } from "../globals";
import { modelDefaults, modelSchema } from "./IModel";
import { extendDefaults } from "./utils/Defaults";
import Range from "./utils/Range";
export const dummySchema = {
    ...modelSchema,
    spineName: String,
    preset: String,
    strideForward: Number,
    strideRight: Number,
    strideMove: Boolean,
    strideMode: String
};
export const dummyDefaults = extendDefaults([modelDefaults], {
    spineName: undefined,
    preset: "default",
    strideForward: 0,
    strideRight: 0,
    strideMove: false,
    strideMode: "aim",
    scale: 1.7,
    scaleX: 1.7,
    scaleY: 1.7,
    scaleZ: 1.7,
    width: 20,
    depth: 20,
    animation: "idle",
    src: YBOT_URL
}, {
    strideForward: new Range(-10, 10),
    strideRight: new Range(-10, 10)
});
//# sourceMappingURL=IDummy.js.map