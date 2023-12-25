import { extendDefaults } from "./utils/Defaults";
import { appendableDefaults, appendableSchema } from "./IAppendable";
import Range from "./utils/Range";
export const splashScreenSchema = {
    ...appendableSchema,
    opacity: Number,
    textCenter: Boolean
};
export const splashScreenDefaults = extendDefaults([appendableDefaults], { opacity: 1, textCenter: false }, { opacity: new Range(0, 1) });
//# sourceMappingURL=ISplashScreen.js.map