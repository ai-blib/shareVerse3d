import { extendDefaults } from "./utils/Defaults";
import { appendableDefaults, appendableSchema } from "./IAppendable";
import Choices from "./utils/Choices";
export const reticleSchema = {
    ...appendableSchema,
    variant: Number
};
export const reticleDefaults = extendDefaults([appendableDefaults], { variant: 1 }, { variant: new Choices({ 1: 1, 2: 2, 3: 3, 4: 4 }) });
//# sourceMappingURL=IReticle.js.map