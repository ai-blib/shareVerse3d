export type TabProps = {
    children?: string;
    selected?: boolean;
    disabled?: boolean;
    half?: boolean;
    id?: string;
};
declare const Tab: ({ children, selected, disabled, half, id }: TabProps) => import("preact").JSX.Element;
export default Tab;
