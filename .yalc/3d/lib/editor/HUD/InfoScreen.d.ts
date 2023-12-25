import { ComponentChildren } from "preact";
import { CSSProperties } from "preact/compat";
interface InfoScreen {
    mounted?: boolean;
    style?: CSSProperties;
    children?: ComponentChildren;
    fadeIn?: boolean;
}
declare const _default: ({ mounted, style, children, fadeIn }: InfoScreen) => import("preact").JSX.Element;
export default _default;
