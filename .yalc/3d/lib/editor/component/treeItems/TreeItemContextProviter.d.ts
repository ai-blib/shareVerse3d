import { ComponentChildren } from "preact";
export declare const TreeItemContext: import("preact").Context<{
    draggingItem?: any;
}>;
interface Props {
    children?: ComponentChildren;
}
declare const TreeItemContextProvider: ({ children }: Props) => import("preact").JSX.Element;
export default TreeItemContextProvider;
