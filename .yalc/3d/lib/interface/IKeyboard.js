import { appendableDefaults, appendableSchema } from "./IAppendable";
import { extendDefaults } from "./utils/Defaults";
export const keyboardSchema = {
    ...appendableSchema,
    onKeyPress: Function,
    onKeyUp: Function,
    onKeyDown: Function
};
export const keyboardDefaults = extendDefaults([appendableDefaults], {
    onKeyPress: undefined,
    onKeyUp: undefined,
    onKeyDown: undefined
});
//# sourceMappingURL=IKeyboard.js.map