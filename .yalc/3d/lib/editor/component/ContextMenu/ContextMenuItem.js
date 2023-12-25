import { jsx as _jsx } from "preact/jsx-runtime";
// @ts-nocheck
import { useState } from "preact/hooks";
import { CONTEXT_MENU_ITEM_HEIGHT } from "../../../globals";
const ContextMenuItem = ({ disabled, onClick, children }) => {
    const [hover, setHover] = useState(false);
    return (_jsx("div", { className: "lingo3d-flexcenter", style: {
            padding: 6,
            whiteSpace: "nowrap",
            background: !disabled && hover ? "rgba(255, 255, 255, 0.1)" : undefined,
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? undefined : "pointer",
            height: CONTEXT_MENU_ITEM_HEIGHT
        }, onClick: disabled ? undefined : onClick, onMouseEnter: disabled ? undefined : () => setHover(true), onMouseLeave: disabled ? undefined : () => setHover(false), children: children }));
};
export default ContextMenuItem;
//# sourceMappingURL=ContextMenuItem.js.map