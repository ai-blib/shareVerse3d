import { extendDefaults } from "./utils/Defaults";
import { animationManagerDefaults, animationManagerSchema } from "./IAnimationManager";
export const timelineSchema = {
    ...animationManagerSchema
};
export const timelineDefaults = extendDefaults([animationManagerDefaults], {});
//# sourceMappingURL=ITimeline.js.map