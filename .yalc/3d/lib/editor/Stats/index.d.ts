type StatsProps = {
    mode?: "fps" | "time" | "memory";
};
declare const Stats: ({ mode }: StatsProps) => import("preact").VNode<any>;
export default Stats;
