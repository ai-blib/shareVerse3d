import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import CloseIcon from "../icons/CloseIcon";
import useTab from "./useTab";
import IconButton from "../IconButton";
const CloseableTab = ({ onClose, children, selected, disabled, id = children }) => {
    const { selectedSignal } = useTab(id, selected, disabled);
    return (_jsxs("div", { className: "lingo3d-bg lingo3d-flexcenter", style: {
            opacity: disabled ? 0.1 : 1,
            pointerEvents: disabled ? "none" : "auto",
            marginLeft: 4,
            marginRight: 4,
            height: 20,
            paddingLeft: 12,
            background: selectedSignal.value === id
                ? "rgba(255, 255, 255, 0.1)"
                : undefined
        }, onClick: disabled ? undefined : () => (selectedSignal.value = id), children: [_jsx("div", { style: {
                    marginTop: -2,
                    minWidth: 30,
                    maxWidth: 100,
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden"
                }, children: children }), _jsx("div", { style: { width: 4 } }), _jsx(IconButton, { disabled: !onClose, onClick: () => onClose?.(selectedSignal.value === id), children: _jsx(CloseIcon, {}) })] }));
};
export default CloseableTab;
//# sourceMappingURL=CloseableTab.js.map