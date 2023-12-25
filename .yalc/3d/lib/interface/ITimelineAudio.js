import { extendDefaults } from "./utils/Defaults";
import { appendableDefaults, appendableSchema } from "./IAppendable";
export const timelineAudioSchema = {
    ...appendableSchema,
    name: String,
    src: String
};
export const timelineAudioDefaults = extendDefaults([appendableDefaults], { name: "", src: undefined });
//# sourceMappingURL=ITimelineAudio.js.map