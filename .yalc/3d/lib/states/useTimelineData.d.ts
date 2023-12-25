import { AnimationData } from "../interface/IAnimationManager";
declare const getTimelineData: import("@lincode/reactivity").GetGlobalState<[AnimationData | undefined]>;
export { getTimelineData };
export declare const processKeyframe: (cb: (timelineData: AnimationData, uuid: string, property: string, frame: string) => void, skipRefresh?: boolean) => void;
