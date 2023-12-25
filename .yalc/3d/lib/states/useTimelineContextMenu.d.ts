import { Point } from "@lincode/math";
export declare const setTimelineContextMenu: import("@lincode/reactivity").SetGlobalState<(Point & {
    keyframe?: boolean | undefined;
    create?: "audio" | "timeline" | undefined;
}) | undefined>, getTimelineContextMenu: import("@lincode/reactivity").GetGlobalState<(Point & {
    keyframe?: boolean | undefined;
    create?: "audio" | "timeline" | undefined;
}) | undefined>;
