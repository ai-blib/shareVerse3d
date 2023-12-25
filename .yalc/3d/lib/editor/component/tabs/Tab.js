import { jsx as _jsx } from "preact/jsx-runtime";
import useTab from "./useTab";
const Tab = ({ children, selected, disabled, half, id = children }) => {
    const { selectedSignal } = useTab(id, selected, disabled);
    return (_jsx("div", { className: "lingo3d-bg lingo3d-flexcenter", style: {
            width: half ? "50%" : undefined,
            opacity: disabled ? 0.1 : 1,
            height: 20,
            padding: half ? undefined : 12,
            background: selectedSignal.value === id
                ? "rgba(255, 255, 255, 0.1)"
                : undefined
        }, onClick: disabled ? undefined : () => (selectedSignal.value = id), children: _jsx("div", { style: { marginTop: -2 }, children: children }) }));
};
export default Tab;
//# sourceMappingURL=Tab.js.map