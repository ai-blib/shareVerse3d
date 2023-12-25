type TransitionProps = {
    children?: (enter: boolean) => any;
    mounted?: boolean;
    delay?: number;
};
declare const Transition: ({ children, mounted, delay }: TransitionProps) => any;
export default Transition;
