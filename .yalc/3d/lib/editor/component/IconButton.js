import { jsx as _jsx } from "preact/jsx-runtime";
import { APPBAR_HEIGHT } from "../../globals";
const IconButton = ({ children, onClick, disabled, outline, fill }) => {
    return (_jsx("div", { onClick: disabled
            ? undefined
            : (e) => {
                e.stopPropagation();
                onClick?.();
            }, className: "lingo3d-flexcenter", style: {
            width: APPBAR_HEIGHT,
            height: APPBAR_HEIGHT - 4,
            marginRight: outline ? 8 : 2,
            opacity: disabled ? 0.1 : 0.5,
            cursor: disabled ? undefined : "pointer",
            background: outline || fill
                ? `rgba(255, 255, 255, ${fill ? 0.2 : 0.1})`
                : undefined,
            border: outline
                ? "1px solid rgba(255, 255, 255, 0.2)"
                : undefined
        }, children: children }));
};
export default IconButton;
//# sourceMappingURL=IconButton.js.map