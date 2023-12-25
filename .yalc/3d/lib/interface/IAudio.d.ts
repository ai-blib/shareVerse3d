import IPositioned from "./IPositioned";
import { ExtractProps } from "./utils/extractProps";
import Nullable from "./utils/Nullable";
export default interface IAudio extends IPositioned {
    src: Nullable<string>;
    autoplay: boolean;
    paused: boolean;
    stopped: boolean;
    loop: boolean;
    volume: number;
    playbackRate: number;
    distance: number;
    distanceModel: string;
    maxDistance: number;
    rolloffFactor: number;
}
export declare const audioSchema: Required<ExtractProps<IAudio>>;
export declare const audioDefaults: Partial<import("./utils/Defaults").default<IAudio>>;
