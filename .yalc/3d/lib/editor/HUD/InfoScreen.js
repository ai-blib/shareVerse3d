import { jsx as _jsx } from "preact/jsx-runtime";
import Transition from "../component/Transition";
export default ({ mounted, style, children, fadeIn }) => {
    return (_jsx(Transition, { mounted: mounted, children: (enter) => (
        // @ts-ignore
        _jsx("div", { className: "lingo3d-absfull lingo3d-flexcenter", 
            // @ts-ignore
            style: { flexDirection: "column", transition: "opacity 1s", opacity: fadeIn && enter ? 0 : mounted ? 1 : 0, ...style }, children: _jsx("div", { className: "lingo3d-flexcenter", style: {
                    gap: 10,
                    background: "rgba(0, 0, 0, 0.5)",
                    padding: 2
                }, children: children }) })) }));
};
//# sourceMappingURL=InfoScreen.js.map