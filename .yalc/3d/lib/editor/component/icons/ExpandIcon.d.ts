import { CSSProperties } from "preact/compat";
type ExpandIconProps = {
    style?: CSSProperties;
    onClick?: () => void;
};
declare const ExpandIcon: ({ style, onClick }: ExpandIconProps) => import("preact/compat").JSX.Element;
export default ExpandIcon;
