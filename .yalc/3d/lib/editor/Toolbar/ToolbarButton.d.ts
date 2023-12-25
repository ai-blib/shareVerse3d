import { ComponentChildren } from "preact";
export type ToolbarButtonProps = {
    children: ComponentChildren | any;
    onClick?: () => void;
    active?: boolean;
    disabled?: boolean;
};
declare const ToolbarButton: ({ children, onClick, active, disabled }: ToolbarButtonProps) => import("preact").JSX.Element;
export default ToolbarButton;
