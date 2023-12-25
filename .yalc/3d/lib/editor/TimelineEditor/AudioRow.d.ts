import TimelineAudio from "../../display/TimelineAudio";
type AudioRowProps = {
    instance: TimelineAudio;
    frames: Record<number, true>;
};
declare const _default: ({ instance, frames }: AudioRowProps) => import("preact/compat").JSX.Element;
export default _default;
