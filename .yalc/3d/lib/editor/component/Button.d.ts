import { ComponentChildren } from "preact";
export type ButtonProps = {
    children?: ComponentChildren;
    disabled?: boolean;
    onClick?: (e: MouseEvent) => void;
};
declare const Button: ({ children, disabled, onClick }: ButtonProps) => import("preact").JSX.Element;
export default Button;
