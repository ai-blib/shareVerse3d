import fn from "./utils/fn";
import { extendDefaults } from "./utils/Defaults";
import { appendableDefaults, appendableSchema } from "./IAppendable";
export const staticObjectManagerSchema = {
    ...appendableSchema,
    onClick: Function,
    onMouseDown: Function,
    onMouseUp: Function,
    onMouseOver: Function,
    onMouseOut: Function,
    onMouseMove: Function,
    onLookToEnd: Function,
    lookAt: [Function, Array],
    lookTo: [Function, Array],
    name: String,
    id: String
};
export const staticObjectManagerDefaults = extendDefaults([appendableDefaults], {
    onClick: undefined,
    onMouseDown: undefined,
    onMouseUp: undefined,
    onMouseOver: undefined,
    onMouseOut: undefined,
    onMouseMove: undefined,
    onLookToEnd: undefined,
    lookAt: fn,
    lookTo: fn,
    name: "",
    id: undefined
});
//# sourceMappingURL=IStaticObjectManager.js.map