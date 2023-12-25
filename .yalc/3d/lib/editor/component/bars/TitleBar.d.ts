import { ComponentChildren } from "preact";
type TitleBarProps = {
    title?: string;
    children?: ComponentChildren;
};
declare const TitleBar: ({ title, children }: TitleBarProps) => import("preact").JSX.Element;
export default TitleBar;
