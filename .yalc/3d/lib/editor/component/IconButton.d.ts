import { ComponentChildren } from "preact";
type IconButtonProps = {
    children?: ComponentChildren;
    onClick?: () => void;
    disabled?: boolean;
    outline?: boolean;
    fill?: boolean;
};
declare const IconButton: ({ children, onClick, disabled, outline, fill }: IconButtonProps) => import("preact").JSX.Element;
export default IconButton;
