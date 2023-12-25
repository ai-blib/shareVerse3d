import { positionedDefaults, positionedSchema } from "./IPositioned";
import { extendDefaults } from "./utils/Defaults";
export const audioSchema = {
    ...positionedSchema,
    src: String,
    autoplay: Boolean,
    paused: Boolean,
    stopped: Boolean,
    loop: Boolean,
    volume: Number,
    playbackRate: Number,
    distance: Number,
    distanceModel: String,
    maxDistance: Number,
    rolloffFactor: Number
};
export const audioDefaults = extendDefaults([positionedDefaults], {
    src: undefined,
    autoplay: false,
    paused: false,
    stopped: false,
    loop: false,
    volume: 1,
    playbackRate: 1,
    distance: 1,
    maxDistance: 10000,
    distanceModel: "inverse",
    rolloffFactor: 1
});
//# sourceMappingURL=IAudio.js.map