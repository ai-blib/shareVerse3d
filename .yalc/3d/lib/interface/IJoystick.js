import { appendableDefaults, appendableSchema } from "./IAppendable";
import { extendDefaults } from "./utils/Defaults";
export const joystickSchema = {
    ...appendableSchema,
    onMove: Function,
    onMoveStart: Function,
    onMoveEnd: Function,
    onPress: Function
};
export const joystickDefaults = extendDefaults([appendableDefaults], {
    onMove: undefined,
    onMoveStart: undefined,
    onMoveEnd: undefined,
    onPress: undefined
});
//# sourceMappingURL=IJoystick.js.map