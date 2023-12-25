import { ComponentChildren, JSX } from "preact";
type CustomEditorProps = {
    style?: React.CSSProperties;
    className?: string;
    children?: ComponentChildren;
};
declare const CustomEditor: ({ children, style, className }: CustomEditorProps) => JSX.Element;
export default CustomEditor;
