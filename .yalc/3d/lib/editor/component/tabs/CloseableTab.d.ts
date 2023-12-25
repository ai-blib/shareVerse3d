import { TabProps } from "./Tab";
type CloseableTabProps = TabProps & {
    onClose?: (selected: boolean) => void;
};
declare const CloseableTab: ({ onClose, children, selected, disabled, id }: CloseableTabProps) => import("preact").JSX.Element;
export default CloseableTab;
