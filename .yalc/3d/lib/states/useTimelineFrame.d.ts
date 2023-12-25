import Timeline from "../display/Timeline";
export declare const setTimelineFrame: import("@lincode/reactivity").SetGlobalState<number>, getTimelineFrame: import("@lincode/reactivity").GetGlobalState<number>;
export declare const userSetTimelineFrame: (frame: number | ((timeline: Timeline) => number)) => void;
export declare const increaseTimelineFrame: () => void;
export declare const decreaseTimelineFrame: () => void;
export declare const firstTimelineFrame: () => void;
export declare const lastTimelineFrame: () => void;
