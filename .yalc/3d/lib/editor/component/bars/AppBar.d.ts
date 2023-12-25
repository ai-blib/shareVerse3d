import { ComponentChildren } from "preact";
import { CSSProperties } from "preact/compat";
import { Signal } from "@preact/signals";
type AppBarProps = {
    className?: string;
    children?: ComponentChildren;
    style?: CSSProperties;
    selectedSignal?: Signal<string | undefined>;
    noPadding?: boolean;
};
declare const AppBar: ({ className, style, children, selectedSignal, noPadding }: AppBarProps) => import("preact").JSX.Element;
export default AppBar;
