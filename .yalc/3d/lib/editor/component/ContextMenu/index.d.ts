import { Point } from "@lincode/math";
import { ComponentChildren } from "preact";
interface ContextMenuProps {
    position?: Point;
    setPosition: (val: Point | undefined) => void;
    children?: ComponentChildren;
    input?: string | false;
    onInput?: (val: string) => void;
}
declare const ContextMenu: ({ position, setPosition, children, input, onInput }: ContextMenuProps) => import("preact").VNode<any> | null;
export default ContextMenu;
