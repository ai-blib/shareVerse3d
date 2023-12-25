type MenuItemProps = {
    disabled?: boolean;
    onClick?: (e: MouseEvent) => void;
    children: string;
};
declare const ContextMenuItem: ({ disabled, onClick, children }: MenuItemProps) => import("preact").JSX.Element;
export default ContextMenuItem;
